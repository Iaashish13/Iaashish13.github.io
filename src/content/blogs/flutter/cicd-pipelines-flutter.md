---
title: "CI/CD Pipelines for Flutter — From Local to Cloud"
date: "2026-02-21"
category: "frontend"
subCategory: "flutter"
tags: ["flutter", "fastlane", "cicd", "github-actions", "codemagic", "devops"]
readingTime: "15 min read"
description: "Automate your Flutter app releases with Fastlane, GitHub Actions, and Codemagic — from local builds to a fully automated cloud pipeline."
---

Shipping an app manually gets old fast. Building, signing, uploading — it's the same set of clicks every single time. This guide walks you through automating all of that, starting simple and building up to a fully automated cloud pipeline.

We'll do it in three phases:

- **Phase 1** → Fastlane on your local Mac
- **Phase 2** → GitHub Actions
- **Phase 3** → Codemagic

Let's start with Phase 1.

---

## What is Fastlane?

Fastlane is an open-source Ruby toolkit that automates iOS and Android release tasks. Instead of clicking through Xcode or Play Console every time you want to ship a build, you write a script once and run a single command forever after.

### What is a Lane?

A **lane** is a named sequence of steps (called **actions**) in your `Fastfile`. Think of it like a function — it has a name, and when you call it, it runs each action in order.

```ruby
lane :beta do
  build_app(...)           # action 1: build
  upload_to_testflight(...)  # action 2: upload
end
```

---

## Step 1 — Install Ruby

Fastlane runs on Ruby, and macOS ships with an outdated system Ruby that causes all kinds of headaches. The fix is to install a modern version via `rbenv` and use that instead.

**1a. Install rbenv (if you haven't already):**
```bash
brew install rbenv ruby-build
```

**1b. Hook rbenv into your shell — add this to `~/.zshrc`:**
```bash
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc
```

**1c. Install Ruby 3.2 and set it as the global default:**
```bash
rbenv install 3.2.2
rbenv global 3.2.2
```

**1d. Verify everything is pointing at the right Ruby:**
```bash
ruby --version
# Should show: ruby 3.2.2

which ruby
# Should show: /Users/yourname/.rbenv/shims/ruby  (NOT /usr/bin/ruby)
```

If you still see the system Ruby path, try restarting your terminal — the shell needs to reload to pick up rbenv.

**1e. Install Bundler:**
```bash
gem install bundler
```

---

## Step 2 — Create the Play Console App

Before Fastlane can upload anything to Google Play, your app needs to exist there first. If you've already created it, skip ahead to Step 3.

**2a.** Go to [play.google.com/console](https://play.google.com/console) and click **"Create app"**.

**2b.** Fill in the details:
- App name: Your App Name
- Default language: English (US)
- App or game: whichever applies
- Free or paid: your choice
- Accept the declarations → **Create app**

**2c.** Note your package name (e.g., `com.example.app`) — you'll need it later.

> **Note:** Play Console will prompt you to complete a bunch of setup steps — store listing, content rating, target audience, and so on. You don't need all of those to upload to Internal Testing, but you will need them before going to Production. For now, just focus on getting that first internal build uploaded.

---

## Step 3 — Set Up the Google Play API Service Account

This is the part that trips most people up, so take it one step at a time. You're going to create a service account that Fastlane can use to authenticate with Google Play on your behalf.

There are three sub-steps:
1. Create a Google Cloud Project
2. Enable the Google Play Developer API
3. Create a service account and connect it to Play Console

### 3a. Create a Google Cloud Project

If you already have one you want to use, skip this. Otherwise, create a new project in the [Google Cloud Console](https://console.cloud.google.com/projectcreate).

### 3b. Enable the Google Play Developer API

Once your project is set up, navigate to the API library. Click the menu icon in the top left:

![Menu icon in Google Cloud Console](/images/blogs/cicd-pipelines/enable-apis.png)

Go to **APIs & Services**:

![APIs & Services menu](/images/blogs/cicd-pipelines/apis-and-services.png)

Click **Enable APIs and Services**, scroll down to find the **Google Play Android Developer API**, and enable it:

![Google Play Android Developer API](/images/blogs/cicd-pipelines/google-play-api.png)

After enabling, your API dashboard should look something like this:

![API dashboard after enabling](/images/blogs/cicd-pipelines/api-dashboard.png)

### 3c. Create a Service Account

Click **Create Credentials**. You'll be asked what type of credentials you need:

![Create Credentials screen](/images/blogs/cicd-pipelines/create-credentials.png)

Select **Application data**, then click **Done**. This opens the service account creation form:

- **Name:** `fastlane-upload` (or anything descriptive)
- Click **"Create and continue"**
- Skip the role assignment step — just click **"Continue"** then **"Done"**. You'll assign Play Console permissions separately.

Back on the service accounts list, click your new account → **Keys** tab → **Add key** → **Create new key** → **JSON** → **Create**.

Save the downloaded `.json` file as `fastlane/play-store-credentials.json` in your project root. Keep it safe — this is what gives Fastlane write access to your Play Console.

### 3d. Grant Play Console Permissions

Head over to the [Users & Permissions](https://play.google.com/console/users-and-permissions) page in Play Console:

1. Click **Invite new users**
2. Enter the email address of your service account (it looks like `fastlane-upload@your-project.iam.gserviceaccount.com`)
3. Grant **Release Manager** permissions (make sure publish permissions are checked)
4. Click **Invite user**

That's the Android side done.

---

## Step 3e — App Store Connect API Key (iOS)

For iOS, Fastlane authenticates with App Store Connect using an API key. This is the recommended approach — it sidesteps the 2FA headaches that come with username/password auth.

### Generating the API Key

1. Go to **App Store Connect → Users and Access → Integrations → App Store Connect API**
2. Click the **"+"** button to create a new key
3. Give it a name (e.g. `Fastlane`) and set the role to **App Manager**
4. Click **Generate**

You'll now see three things you need:

| Part | Where to find it |
|---|---|
| **Key ID** | Shown next to your key in the API keys list (e.g. `ABC123DEF4`) |
| **Issuer ID** | Shown at the top of the App Store Connect API page (UUID format) |
| **Key file** | The `.p8` file — click **Download API Key** next to your key |

> **Important:** Download the `.p8` file immediately — App Store Connect only lets you download it once. If you lose it, you'll need to revoke and regenerate the key.

### Extracting the Private Key

The `.p8` file Apple gives you contains the private key. Open it in any text editor — it looks like this:

```
-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXoAoGCCqGSM49AwEHoWQDYgAE
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
-----END PRIVATE KEY-----
```

To get it into a single line for the JSON file, run this in your terminal:

```bash
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' AuthKey_ABC123DEF4.p8
```

This prints the key with literal `\n` between each line — exactly what the JSON needs.

### Create `fastlane/api_key.json`

```json
{
  "key_id": "ABC123DEF4",
  "issuer_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "key": "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg...\n-----END PRIVATE KEY-----",
  "duration": 1200,
  "in_house": false
}
```

- **`key`** — the full private key content from the `.p8` file, with each line joined by `\n`
- **`duration`** — session length in seconds (`1200` = 20 minutes, which is the maximum)
- **`in_house`** — `true` only for Apple Enterprise accounts, otherwise `false`

Add it to `.gitignore` — this file contains your private key and must never be committed.

---

## Step 4 — Install Fastlane

Run all of these commands from your project root.

**4a. Create a `Gemfile` in the project root:**

```ruby
# frozen_string_literal: true
source "https://rubygems.org"
gem "fastlane"
```

**4b. Install Fastlane and lock the version:**
```bash
bundle install
```

This generates a `Gemfile.lock`. Commit both files to git — this ensures everyone on your team (and your CI runner later) uses the same Fastlane version.

**4c. Verify Fastlane installed correctly:**
```bash
bundle exec fastlane --version
# Should show: fastlane 2.x.x
```

**If you get an error**, your terminal session might be stale. Try reloading your shell config first:
```bash
source ~/.zshrc
```

Then check that `bundle` is resolving from rbenv, not the system:
```bash
which bundle
# Should show: /Users/yourname/.rbenv/shims/bundle
```

If it's still pointing somewhere else, run:
```bash
gem install bundler
rbenv rehash
rm Gemfile.lock
bundle install
bundle exec fastlane --version
```

---

## Step 5 — Initialise Fastlane

```bash
bundle exec fastlane init
```

This creates a `fastlane/` folder at your project root. Inside it, create two files: `Appfile` and `Fastfile`.

Your project structure should now look like this:

```
Gemfile                               ← pins Fastlane version (commit this)
Gemfile.lock                          ← generated by bundle install (commit this)
fastlane/
├── Appfile                           ← app identity (commit this)
├── Fastfile                          ← your lanes (commit this)
├── api_key.json                      ← App Store Connect API key (GITIGNORED — never commit)
└── play-store-credentials.json       ← Google Play service account key (GITIGNORED — never commit)
```

Move the credentials files you downloaded earlier into the `fastlane/` folder:
- `fastlane/play-store-credentials.json` (Android)
- `fastlane/api_key.json` (iOS)

Add these to your `.gitignore` — credentials should never end up in version control:

```
fastlane/play-store-credentials.json
fastlane/api_key.json
*.p8
*.p12
*.mobileprovision
```

### Configure the Appfile

The `Appfile` tells Fastlane your app's identity so you don't have to repeat it in every lane:

```ruby
# fastlane/Appfile
#
# Shared app identity used by all lanes.
# Fastlane reads these values automatically — no need to repeat them per lane.

# --- Android ------------------------------------------------------------------
json_key_file("fastlane/play-store-credentials.json")
package_name("com.example.app")
```

---

## Step 6 — Write Your Lanes

### iOS: ExportOptions.plist

Before writing the iOS lane, create an export options file that tells Xcode how to package the archive:

**`ios/ExportOptions.plist`:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store</string>
  <key>teamID</key>
  <string>YOUR_TEAM_ID</string>
  <key>uploadBitcode</key>
  <false/>
  <key>uploadSymbols</key>
  <true/>
  <key>signingStyle</key>
  <string>automatic</string>
</dict>
</plist>
```

Replace `YOUR_TEAM_ID` with your Apple Developer Team ID (found in Xcode under Signing & Capabilities, or at developer.apple.com/account).

### The Fastfile

Here's the full `Fastfile` with lanes for both platforms:

```ruby
# fastlane/Fastfile
#
# Usage (run from project root):
#   bundle exec fastlane android beta    → build + upload to Play Internal Testing
#   bundle exec fastlane android release → promote internal build to Production
#   bundle exec fastlane ios beta        → build + upload to TestFlight
#   bundle exec fastlane ios release     → upload to App Store (no auto-submit)

# --- Android ------------------------------------------------------------------

platform :android do

  # Builds the app and uploads to Google Play Internal Testing.
  lane :beta do
    # Step 1 — Build the production .aab
    sh(
      "cd .. && flutter build appbundle " \
      "--flavor production " \
      "--target lib/main_production.dart " \
      "--release"
    )

    # Step 2 — Upload to Google Play Internal Testing track
    upload_to_play_store(
      track: "internal",
      aab: "build/app/outputs/bundle/productionRelease/app-production-release.aab",
      json_key: "fastlane/play-store-credentials.json",
      skip_upload_apk: true,
      skip_upload_metadata: true,
      skip_upload_changelogs: true,
      skip_upload_images: true,
      skip_upload_screenshots: true,
      release_status: "completed"
    )
  end

  # Promotes the latest internal build to Production — no new build, just a promotion.
  lane :release do
    upload_to_play_store(
      track: "internal",
      track_promote_to: "production",
      json_key: "fastlane/play-store-credentials.json",
      skip_upload_aab: true,
      skip_upload_apk: true,
      skip_upload_metadata: true,
      skip_upload_changelogs: true,
      skip_upload_images: true,
      skip_upload_screenshots: true,
      release_status: "completed"
    )
  end

end

# --- iOS ----------------------------------------------------------------------

platform :ios do

  # Builds the app and uploads to TestFlight (internal testing — no Apple review needed).
  lane :beta do
    # Step 1 — Build the production .ipa
    # ExportOptions.plist tells Xcode: method=app-store, automatic signing, your team ID
    sh(
      "cd .. && flutter build ipa " \
      "--flavor production " \
      "--target lib/main_production.dart " \
      "--release " \
      "--export-options-plist ios/ExportOptions.plist"
    )

    # Step 2 — Upload to TestFlight
    # api_key.json contains your App Store Connect API key (key_id, issuer_id, .p8 path)
    upload_to_testflight(
      ipa: "build/ios/ipa/YourApp.ipa",
      api_key_path: "fastlane/api_key.json",
      skip_waiting_for_build_processing: true,
      distribute_external: false,
      notify_external_testers: false
    )
  end

  # Uploads to the App Store. Does NOT submit for review — trigger that manually in App Store Connect.
  lane :release do
    sh(
      "cd .. && flutter build ipa " \
      "--flavor production " \
      "--target lib/main_production.dart " \
      "--release " \
      "--export-options-plist ios/ExportOptions.plist"
    )

    upload_to_app_store(
      ipa: "build/ios/ipa/YourApp.ipa",
      api_key_path: "fastlane/api_key.json",
      submit_for_review: false,
      automatic_release: false,
      skip_screenshots: true,
      skip_metadata: true
    )
  end

end
```

> **Note:** Replace `YourApp.ipa` with the actual filename Flutter generates. After running `flutter build ipa`, check `build/ios/ipa/` to confirm the exact name.

---

## Running Your First Build

### Android

```bash
bundle exec fastlane android beta
```

This builds your app and uploads it directly to the Internal Testing track in Play Console. If everything is wired up correctly, you'll see a green success message and your build will appear in Play Console within a minute or two.

### iOS

Before running the iOS lane, make sure Xcode code signing is configured:

1. Open `ios/Runner.xcworkspace` in Xcode
2. Select the **Runner** target → **Signing & Capabilities**
3. Sign in to your Apple account: **Xcode → Settings → Accounts**
4. Set **Team** to your Apple Developer Team
5. Make sure **Automatically manage signing** is checked
6. Verify there are no signing errors shown

Once Xcode is happy, run:

```bash
bundle exec fastlane ios beta
```

Fastlane will build the `.ipa` and upload it to TestFlight. Internal testers can install it immediately — no App Store review required.

---

That wraps up Phase 1. You now have a local automation setup that can ship builds to both stores with a single command. In **Phase 2**, we'll move this into GitHub Actions so builds trigger automatically on every push to your release branch — no manual steps required.
