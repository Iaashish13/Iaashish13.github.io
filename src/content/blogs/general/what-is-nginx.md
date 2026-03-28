---
title: "What is Nginx?"
date: "2026-03-28"
category: "other"
subCategory: "backend"
tags: ["nginx", "backend", "web-server", "reverse-proxy", "devops", "ssl"]
readingTime: "14 min read"
description: "Nginx is the traffic controller sitting at the front of your server — handling HTTP/HTTPS requests, serving static files, proxying to your backend, load balancing, and SSL. Here's how it works and how I use it for propubg.com."
---

# What is Nginx?

Heyy, how you doing?

Since I primarily do mobile apps but handle everything for propubg.com myself, Nginx becomes a pretty central thing for me. Every time someone types propubg.com and hits enter — Nginx is the first thing that receives that request. So let's get into it.

> **Quick answer if you're in a hurry** — Nginx sits at the front of your server and acts as a traffic controller for all incoming HTTP/HTTPS requests. It can serve static files, forward requests to your backend, distribute load, and handle SSL — all from one config file.

---

## What is Nginx?

For me in simpler terms — Nginx sits at the front of our server and acts as a **traffic controller** for all incoming HTTP and HTTPS requests. It decides what to do with each one: serve a file directly from disk, or forward the request to a backend like Django or a Flutter web app.

So yeah, it is a web server. But it's also widely used as a **reverse proxy**, **load balancer**, and **static file server**. It wears a lot of hats.

---

## How does Nginx work? — Master & Worker Architecture

Nginx works on a **Master and Worker process** architecture. Let me show you the config first so the architecture makes more sense:

```nginx
server {
    listen 80;
    server_name yoursite.com;
    return 301 https://$host$request_uri;   # force HTTPS
}

server {
    listen 443 ssl;
    server_name yoursite.com;
}
```

Nginx listens on port 80 and 443. To claim those ports, Nginx needs root access — so the **Master process starts as root** and grabs them. After that, any incoming web traffic goes to Nginx first.

![Nginx master and worker architecture](/images/blogs/what-is-nginx/nginx-architecture.png)

### Master Process = Head Chef (manager)

- Comes in first, sets up the kitchen (reads `nginx.conf`, binds port 80/443)
- Hires the cooks (forks worker processes)
- **Never handles a single HTTP request itself**
- If you say "change the menu" (`nginx -s reload`), it replaces workers one by one — the restaurant never closes
- If a worker crashes, it immediately hires a new one

### Worker Processes = Cooks

- These are the ones actually doing the work — handling your HTTP requests
- There's one worker per CPU core (set via `worker_processes auto;`)
- Each worker can handle **thousands of connections simultaneously** using an event loop (non-blocking I/O)
- They run as a low-privilege user (`www-data` or `nginx`) — they can cook but can't change the restaurant's rules

### Why not just one process doing everything?

Two reasons:

**Stability** — if one worker crashes (bad request, memory bug), the master just spawns a new one. The other workers keep running. Your site never goes down.

**Performance** — one process = one CPU core. With 4 workers on a 4-core server, all 4 cores are working in parallel. Full use of your hardware.

### Seeing it in real life

Run this on your server and you'll actually see it:

```bash
ps aux | grep nginx
```

```
root      1234  nginx: master process
www-data  1235  nginx: worker process
www-data  1236  nginx: worker process
www-data  1237  nginx: worker process
www-data  1238  nginx: worker process
```

Master runs as `root` (needs it to bind ports 80/443), workers run as `www-data`. That's the master doing its job — taking the dangerous responsibility so the workers don't have to.

### Why Nginx starts as root then drops privileges

Ports below **1024** are "privileged" ports in Linux. Only root (or a process with special capability) can bind them. So Nginx:

1. Starts as **root**
2. Binds to **80** (HTTP) and **443** (HTTPS)
3. Loads config
4. Spawns worker processes as `www-data`
5. Master stays as root — but only to manage workers, nothing else

If a worker ever gets compromised, the attacker doesn't instantly get full root access — they're stuck as `www-data`. That's the security win here.

---

## Core Use Cases

### 1. Serving Static Files

This is honestly the most common thing Nginx does and it's really good at it. Instead of your Django backend serving images, HTML, CSS, JS — Nginx just grabs them directly from disk and sends them. Much faster.

For propubg.com which is a Flutter web app, this is basically the whole frontend setup:

```nginx
server {
    listen 443 ssl;
    server_name propubg.com;

    root /var/www/propubg/build/web;   # Flutter web build output
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

That `try_files $uri $uri/ /index.html` line is important for Flutter/React/Next.js SPAs. It says: "try to find the exact file, then try it as a folder, and if nothing exists — just serve `index.html`." Without this, if someone directly visits `propubg.com/matches`, Nginx would return a 404 because there's no actual `matches` file on disk. With this, it always returns `index.html` and lets Flutter's router handle it.

---

### 2. Reverse Proxy

The client has no idea your backend (Django, Node, etc.) even exists. The client only ever talks to Nginx. Nginx takes the request, forwards it to your backend, gets the response, and sends it back to the user. The backend is completely hidden.

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8000;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

`proxy_pass http://127.0.0.1:8000` — this is the actual forwarding. Django is running quietly on port 8000 on the same machine, not exposed to the internet at all. Only Nginx can reach it.

The `proxy_set_header` lines are fixing an information problem. When Nginx forwards the request, Django thinks the request came from Nginx — not the real user. So Django would see the wrong IP, wrong protocol, wrong host. These headers tell Django the truth:

| Header | What it tells Django | Without it |
|---|---|---|
| `Host` | User typed `propubg.com` | Django sees `127.0.0.1:8000` |
| `X-Real-IP` | User's actual IP address | Django always sees `127.0.0.1` |
| `X-Forwarded-For` | Full IP chain if multiple proxies | Django can't trace where request came from |
| `X-Forwarded-Proto` | User used `https` | Django thinks everything is `http`, breaks redirects |

---

### 3. Load Balancer

When you have multiple instances of your app running, Nginx can distribute traffic across all of them so no single one gets overwhelmed. You use the `upstream` block for this:

```nginx
upstream django_app {
    least_conn;              # send to the server with fewest active connections

    server 127.0.0.1:8001;
    server 127.0.0.1:8002;
    server 127.0.0.1:8003;

    keepalive 32;            # keep 32 connections warm to upstreams
}

server {
    listen 443 ssl;

    location /api/ {
        proxy_pass http://django_app;
    }
}
```

**The algorithms you can pick from:**
- `round_robin` — default, just rotates evenly through each server
- `least_conn` — sends to whichever server has the fewest active connections right now
- `ip_hash` — same user always hits the same server (useful if you store sessions)

---

## SSL/TLS Setup

### Forcing everyone to use HTTPS

Nobody should be hitting your site over plain HTTP. This config catches any HTTP request and permanently redirects it to HTTPS:

```nginx
server {
    listen 80;
    server_name propubg.com www.propubg.com;
    return 301 https://$host$request_uri;
}
```

### The actual HTTPS server block

```nginx
server {
    listen 443 ssl;
    server_name propubg.com;

    # These cert files are created by Certbot automatically
    ssl_certificate     /etc/letsencrypt/live/propubg.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/propubg.com/privkey.pem;

    # Only allow modern, secure TLS versions
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # ... rest of your config goes here
}
```

### Getting free SSL certificates with Certbot

You don't need to pay for SSL. Let's Encrypt gives them for free and Certbot automates everything:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d propubg.com -d www.propubg.com
```

Certbot will automatically edit your nginx config, drop in the cert paths, and set up auto-renewal so you never have to think about it expiring.

---

## location Block Matching — Priority Order

This trips people up a lot. When a request comes in, Nginx doesn't just pick the first `location` block that matches — it follows a specific priority order:

| Priority | Syntax | Example | What it does |
|----------|--------|---------|-------------|
| 1st | `= /path` | `location = /health` | Exact match only — stops looking immediately |
| 2nd | `^~ /path` | `location ^~ /static/` | Prefix match — skips regex checks |
| 3rd | `~ regex` | `location ~ \.php$` | Case-sensitive regex |
| 4th | `~* regex` | `location ~* \.(jpg\|png)$` | Case-insensitive regex |
| 5th | `/path` | `location /api/` | Plain prefix match (longest match wins) |

In practice for propubg.com it looks like this:

```nginx
location = /health {
    return 200 "ok";           # only matches the exact path /health
}

location /api/ {
    proxy_pass http://127.0.0.1:8000;   # anything starting with /api/
}

location / {
    try_files $uri $uri/ /index.html;   # everything else → Flutter app
}
```

---

## Gzip Compression

One of those small things that makes a noticeable difference. Nginx compresses responses before sending them — your JS, CSS, JSON files get significantly smaller over the wire.

```nginx
http {
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;       # don't bother compressing tiny files
    gzip_types
        text/plain
        text/css
        application/javascript
        application/json
        image/svg+xml;
}
```

This goes inside the `http {}` block in `/etc/nginx/nginx.conf` — not inside a `server` block.

---

## Rate Limiting

If your API is public, people will hammer it. Rate limiting lets you say "max 10 requests per second per IP" — anyone going faster gets a 429 response.

```nginx
http {
    # Create a zone called api_limit, track by IP, 10MB memory, 10 req/sec limit
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
}

server {
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass http://127.0.0.1:8000;
    }
}
```

- `burst=20` — allows a quick burst of 20 requests before the limit kicks in (for legitimate users who occasionally spike)
- `nodelay` — process those burst requests immediately rather than queuing them up slowly

---

## Essential Commands

These are the ones I actually use:

```bash
# ALWAYS run this before reloading — catches syntax errors
sudo nginx -t

# Reload config gracefully (zero downtime)
sudo nginx -s reload

# Full restart (brief downtime, use when -s reload isn't enough)
sudo systemctl restart nginx

# Start / stop / check status
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl status nginx

# Watch live requests coming in
sudo tail -f /var/log/nginx/access.log

# Watch errors in real time (first place to look when something breaks)
sudo tail -f /var/log/nginx/error.log
```

Seriously, always run `sudo nginx -t` before reloading. If your config has a syntax error and you reload anyway, Nginx keeps the old config running — but if it's a fresh start, your site goes down.

---

## File Locations

Good to know these by heart:

```
/etc/nginx/nginx.conf              # main config — gzip, rate limits, worker settings
/etc/nginx/sites-available/        # your site configs live here (inactive until linked)
/etc/nginx/sites-enabled/          # symlinks to active configs
/var/log/nginx/access.log          # every single request gets logged here
/var/log/nginx/error.log           # errors — first place to check when things break
/var/www/                          # convention for where your web files live
/etc/letsencrypt/live/             # SSL certs managed by Certbot
```

The `sites-available` vs `sites-enabled` pattern is just a way to keep configs organized. You write your config in `sites-available`, then "activate" it by creating a symlink in `sites-enabled`:

```bash
# Write your config
sudo nano /etc/nginx/sites-available/propubg.com

# Activate it
sudo ln -s /etc/nginx/sites-available/propubg.com /etc/nginx/sites-enabled/

# Test and apply
sudo nginx -t && sudo nginx -s reload
```

To deactivate a site you just remove the symlink — the config file stays safe in `sites-available`.

---

## Full Config — propubg.com (Flutter Web + Django API)

This is basically what my setup looks like:

```nginx
# Catch all HTTP and redirect to HTTPS
server {
    listen 80;
    server_name propubg.com www.propubg.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name propubg.com;

    # SSL certs from Certbot
    ssl_certificate     /etc/letsencrypt/live/propubg.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/propubg.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Flutter web build files
    root /var/www/propubg/build/web;
    index index.html;

    # Compress responses
    gzip on;
    gzip_types text/plain application/javascript text/css application/json;

    # API requests go to Django
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Everything else → Flutter app (SPA fallback)
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Quick Mental Model

When someone hits propubg.com, here's what actually happens:

```
Browser
  └── :443 → Nginx (traffic controller)
               ├── /api/*    → forwards to Django on :8000
               ├── /static/* → grabs file from disk
               └── /*        → serves index.html (Flutter router takes over)
```

That's Nginx in a nutshell. One process sitting at the door, routing everything to the right place.
