---
title: "How Flutter Builds an APK — A Deep Dive"
date: "2026-03-20"
category: "frontend"
subCategory: "flutter"
tags: ["flutter", "android", "dart", "apk", "compilation", "shorebird", "aot", "jit", "dart-vm"]
readingTime: "12 min read"
description: "How Flutter compiles Dart into an APK — covering AOT vs JIT, libapp.so, libflutter.so, the embedding layer, and how Shorebird enables OTA updates."
---

I knew about Shorebird, which lets you ship app updates without going through the app store (with some limitations). Isn't that cool? But **how** does it work? To answer that, I first had to ask: **how does a Flutter app get bundled at all?**

I used to think Flutter compiled to Kotlin for Android and Swift for iOS. Turns out, it's a lot more interesting than that.

---

## 🧩 PART 1 — What Happens in Native Android & iOS

### 🟢 Native Android (Kotlin/Java)

#### Step 1 — Kotlin/Java → JVM Bytecode

Kotlin/Java code compiles into `.class` files — **JVM bytecode**.

Bytecode is an intermediate language. Not human-readable like Kotlin, but not pure machine code either. Think of it as halfway. It's designed for the **JVM** — a program that can run the same bytecode on Windows, Mac, Linux, etc.

#### Step 2 — JVM Bytecode → DEX

The problem: **Android doesn't use the JVM**. It uses the **Android Runtime (ART)**, or on very old devices, Dalvik.

So Android build tools convert `.class` files into `.dex` (Dalvik Executable) using the `d8` compiler.

| | JVM Bytecode | DEX |
|---|---|---|
| Architecture | Stack-based (like stacking plates, last in first out) | Register-based (like numbered boxes) |
| Performance | Slower | Faster — register access beats stack operations |
| Designed for | Desktop JVM | Android's ART/Dalvik |

#### Step 3 — DEX → Machine Code (at install time)

| Era | How | Speed |
|---|---|---|
| Old (Dalvik) | Interpreted line-by-line at runtime | Slow |
| New (ART) | AOT-compiled to machine code at **install time** | Fast |

ART converts your `.dex` → actual ARM/x86 machine code when the user installs the app. After that, it runs as native code.

#### APK Structure (Native Android)

```
MyApp.apk
├── classes.dex          ← your compiled Kotlin/Java code
├── res/                 ← layout XML compiled to binary XML, drawables
├── assets/
├── AndroidManifest.xml
├── META-INF/            ← signing info
└── lib/                 ← native .so files (if any JNI code)
```

#### The Complete Pipeline

```
┌─────────────────┐
│  Kotlin/Java    │  ← You write this
│     Code        │
└────────┬────────┘
         │  kotlinc / javac
         ▼
┌─────────────────┐
│  JVM Bytecode   │  ← .class files (stack-based)
└────────┬────────┘
         │  d8 compiler
         ▼
┌─────────────────┐
│  DEX Bytecode   │  ← .dex file (register-based)
└────────┬────────┘
         │  ART at install time
         ▼
┌─────────────────┐
│  Machine Code   │  ← Your CPU runs this
│  (ARM / x86)    │
└─────────────────┘
```

---

### 🔵 Native iOS (Swift / Objective-C)

Swift code is compiled **directly** to native ARM64 machine code via **LLVM**. No intermediate bytecode, no VM.

#### IPA Structure (Native iOS)

```
MyApp.ipa
└── Payload/
    └── MyApp.app/
        ├── MyApp          ← compiled ARM64 binary
        ├── Assets.car     ← compiled asset catalog
        ├── Info.plist
        └── Frameworks/
```

#### The Complete Pipeline

```
┌─────────────────┐
│   Swift Code    │  ← You write this
└────────┬────────┘
         │  swiftc compiler
         ▼
┌─────────────────┐
│    LLVM IR      │  ← optional intermediate step
└────────┬────────┘
         │  LLVM backend
         ▼
┌─────────────────┐
│  Machine Code   │  ← ARM64 binary (directly!)
│   (ARM64)       │
└─────────────────┘
```

No VM. No bytecode. iOS launches the binary directly.

---

### 🤔 Why Can iOS Compile Directly But Android Can't?

**Apple controls the entire stack:**
- Hardware (Apple Silicon chips)
- OS (iOS / macOS)
- Compiler (Swift / LLVM)
- App Store

So Apple always knows the target CPU. Every iPhone and iPad runs ARM64. They compile once for a known target.

**Google controls none of the hardware:**
- Samsung, Pixel, OnePlus — all use different ARM chip variants
- Some tablets use Intel x86
- Chromebooks use various processors
- Emulators can be x86 or ARM

Google can't compile to a specific machine code at build time because they don't know what CPU the user has. That's why they invented DEX — a portable bytecode that ART can translate to native code on the device.

---

## 🧩 PART 2 — How Flutter Builds an APK

Flutter is written in **Dart**. Dart is not Kotlin, not Java. So how does it end up inside an Android APK?

Flutter APKs have **three layers**:

| Layer | What | File |
|-------|------|------|
| 1 | Your Dart code (compiled) | `libapp.so` |
| 2 | Flutter engine (C++) | `libflutter.so` |
| 3 | Flutter embedding (Java/Kotlin) | `classes.dex` |

### 🎯 Layer 1 — Dart Compilation

Flutter compiles Dart differently based on build mode:

| Mode | How Dart compiles | Why |
|------|-------------------|-----|
| **Debug** | JIT — Dart VM runs on device | Enables hot reload & hot restart |
| **Profile** | AOT — like release, with profiling hooks | For performance measurement |
| **Release** | AOT — compiled to native machine code | Fast, ships to users |

> **Hot reload vs Hot restart**
> - **Hot reload**: JIT injects new code into running VM — state is preserved, fast (~300ms)
> - **Hot restart**: Restarts the Dart VM from scratch — state is lost, slower (~2s)
> Both only work in Debug (JIT) mode. Release builds have no Dart VM.

In **release mode**, Dart code is AOT-compiled directly to native ARM machine code.
Output: `libapp.so` — a native shared library. No Dart VM at runtime. Zero.

Also happens at compile time: **tree shaking** — the Dart compiler removes all code that isn't reachable from `main()`. Unused widgets, unused packages, dead code — all stripped out. This keeps `libapp.so` lean.

### 🎯 Layer 2 — Flutter Engine (`libflutter.so`)

Flutter has an engine written in **C++** that handles everything below the widget layer:

- **Rendering** — via Skia (older) or Impeller (newer, default on iOS, rolling out on Android)
- Text layout
- Animations
- Platform channels (Dart ↔ native bridge)
- Dart runtime bootstrap

The Flutter team compiles this engine once. It ships pre-built. You don't recompile it every time you run `flutter build apk`.

Output: `libflutter.so`

### 🎯 Layer 3 — Flutter Embedding (`classes.dex`)

Android can only start an app via an `Activity`. Flutter itself knows nothing about Android Activities. So Flutter ships a thin **Java/Kotlin embedding layer** that:

- Creates a `FlutterEngine`
- Sets up a `FlutterView` (a raw `Surface` for Flutter to draw on)
- Manages Activity/Fragment lifecycle
- Routes platform channel calls between Dart and native code

This gets compiled to `classes.dex` — the **only** DEX file in a Flutter APK.

### 🎯 The Flutter APK Structure

```
MyFlutterApp.apk
├── classes.dex                   ← Flutter embedding (tiny Kotlin/Java layer)
├── lib/
│   ├── arm64-v8a/                ← 64-bit ARM (most modern phones)
│   │   ├── libflutter.so         ← Flutter C++ engine
│   │   └── libapp.so             ← YOUR compiled Dart code (AOT)
│   ├── armeabi-v7a/              ← 32-bit ARM (older phones)
│   │   ├── libflutter.so
│   │   └── libapp.so
│   └── x86_64/                   ← Emulators
│       ├── libflutter.so
│       └── libapp.so
├── assets/
│   └── flutter_assets/
│       ├── AssetManifest.json
│       ├── FontManifest.json
│       ├── fonts/
│       └── shaders/              ← Impeller precompiled shaders
├── res/
└── AndroidManifest.xml
```

Multiple ABIs exist because Android runs on different CPU architectures. Android picks the right `.so` at install time.

> **APK vs AAB (Android App Bundle)**
> When you ship to the Play Store you use `flutter build appbundle` (`.aab`), not `.apk`.
> The Play Store then generates a per-device APK that includes **only** the ABI the user's device needs.
> This makes the download smaller. The `.apk` file (for sideloading) contains all ABIs.

### 🎯 What Happens at Runtime

```
┌────────────────────────────────────────┐
│              Android OS                │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  FlutterActivity (classes.dex)   │  │
│  │                                  │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │  FlutterEngine             │  │  │
│  │  │  (libflutter.so — C++)     │  │  │
│  │  │                            │  │  │
│  │  │  ┌──────────────────────┐  │  │  │
│  │  │  │  libapp.so           │  │  │  │
│  │  │  │  (Your Dart, AOT)    │  │  │  │
│  │  │  └──────────────────────┘  │  │  │
│  │  │                            │  │  │
│  │  │  Skia / Impeller           │  │  │
│  │  │  paints pixels to Surface  │  │  │
│  │  └────────────────────────────┘  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

1. Android launches `FlutterActivity` (from `classes.dex`)
2. `FlutterActivity` creates a `FlutterEngine`
3. `FlutterEngine` loads `libflutter.so`
4. `libflutter.so` bootstraps the Dart runtime and loads `libapp.so`
5. Flutter takes over a raw `Surface` and **draws everything itself** using Skia/Impeller

**Key insight:** Flutter does not use Android's View system at all. There are no `TextView`s, no `LinearLayout`s on screen. Flutter paints every single pixel itself on a canvas. That's why Flutter apps look and behave identically on Android and iOS.

---

## 🧩 PART 3 — So How Does Shorebird Work?

Now we can finally answer the original question.

### The Problem with Pure AOT

In a normal Flutter release build, your Dart code is baked into `libapp.so` — pure machine code inside the APK.

To change any Dart code, you must:
1. Recompile `libapp.so`
2. Repackage the APK / AAB
3. Submit to the app store
4. Wait for review (hours to days)
5. User manually updates

That's painfully slow for hotfixes.

### What Shorebird Does Differently

Shorebird replaces the standard Dart AOT runtime with a **modified runtime** that bundles a **Dart interpreter** alongside the AOT engine.

| | Normal Flutter | Shorebird Flutter |
|---|---|---|
| First install | Pure AOT (`libapp.so`) | AOT + Dart interpreter |
| OTA patch | ❌ Not possible | ✅ Downloads Dart bytecode |
| Performance | Fastest | Near-identical (AOT runs normally unless a patch exists) |

**How a patch works:**
1. You fix a bug and push to Shorebird's servers
2. Shorebird compiles **only the changed Dart code** to Dart bytecode (smaller than machine code)
3. The app downloads the patch silently in the background
4. On next launch, the interpreter runs the patched bytecode instead of the old AOT sections

```
Normal Flutter:
  libapp.so (machine code) → baked in → can't change without a new APK

Shorebird Flutter:
  libapp.so + Shorebird runtime
                    │
         OTA patch available?
        /                    \
      YES                     NO
       │                       │
  Download bytecode        Run libapp.so
  Run via interpreter      (full AOT speed)
```

### The Limitations (why it's not magic)

- **Dart code only** — can't patch the Flutter engine, native plugins, or `AndroidManifest.xml`
- **No new native code** — if your fix requires adding a new plugin, you need a full store release
- **Patch size limits** — not suited for large rewrites
- **iOS grey area** — Apple's rules technically prohibit downloading executable code. Shorebird argues bytecode ≠ executable, but it's legally ambiguous.
- **Tiny overhead** — the modified runtime adds ~1-2ms to cold start

---

## 🗺️ The Full Picture

```
YOUR DART CODE
      │
      │ flutter build apk --release
      │
      ├─→ dart2native (AOT)
      │         └─→ libapp.so        (your compiled Dart)
      │
      ├─→ Flutter Engine (pre-built)
      │         └─→ libflutter.so    (C++ rendering engine)
      │
      ├─→ Flutter Embedding (Java/Kotlin)
      │         └─→ classes.dex      (Activity, FlutterEngine bootstrap)
      │
      └─→ flutter_assets/            (fonts, images, shaders)

All packaged into → MyApp.apk
```

**One-line summary:**

> Flutter = Dart AOT (`libapp.so`) + C++ Engine (`libflutter.so`) + Thin Java wrapper (`classes.dex`) — and Flutter paints its own pixels, bypassing Android's View system entirely.

> Shorebird = Flutter + a modified runtime that can swap out Dart bytecode over the air, without a new app store release.
