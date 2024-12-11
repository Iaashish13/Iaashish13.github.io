## Prevent Screenshot and recording using Method Channel
While doing Flutter, I have heard of  method channels and had some overview that through this channel we will be communicating with native side. I have known it but never implemented it cause there are so many great packages and in my journey the using case didn't appear too.

Okay, then lets learn together and in this article using `MethodChannel` we will be blocking the screen capture for both android and iOS. So then 

## What is Method Channel?

From the name, we can know that channel is used for communication purpose. Flutter documentation describes its as `A named channel for communicating with platform plugins using asynchronous method calls`.  
In simple words `Method Channel` acts a bridge :
- Invoking platform-specific methods from Flutter (Dart) 
- Sending results back to Flutter from the native code.

 Method calls are encoded into binary before being sent, and binary results received are decoded into Dart values. Method channels use `MethodCodec` for communication between Flutter and platform plugins. 

So, lets create a method channel for our preventing screenshots.
```dart
static const screenGuardChannel = MethodChannel('screenGuardChannel')
```

After creating method channel, for this example we will have functions like `enableScreenGuard` and `disableScreenGuard`. **Our goal is to call our dart function to native side.**  So first lets create these functions at app side.  

```dart
@override
  void initState() {
    _enableScreenGuard();
    super.initState();
    
  }

  @override
  void dispose() {
    _disableScreenGuard();
    super.dispose();
  }

  Future<void> _enableScreenGuard() async {
    try {
      final result = screenGuardChannel.invokeMethod('enableScreenGuard');
    } on PlatformException catch (e) {
      print('Faiiled to enable screen guard: $e');
    }
  }

  Future<void> _disableScreenGuard() async {
    try {
      final result = screenGuardChannel.invokeMethod('disableScreenGuard');
    } on PlatformException catch (e) {
      print('Faiiled to disable screen guard: $e');
    }
  }

```

What I am trying to do is `enable screen guard` for only specific screen on dispose of that screen i am `disabling` it. That's why I am calling the  `_enableScreenGuard()` method in `initState` and `_disableScreenGuard` in `dispose`  method. 

#### invoke Method

```dart
screenGuardChannel.invokeMethod('enableScreenGuard');
```

Using this invoke method flutter sends a message to the host platform. Invoke method takes string as method name and same method name we will use in different platform to call specific method. It can also sends argument if required. The values supported by the default codec and their platform-specific counterparts are documented with [StandardMessageCodec](https://api.flutter.dev/flutter/services/StandardMessageCodec-class.html).

With this code we are done in app side. Let look at native side. First we will look into `iOS`.

## Setting up in iOS

At first open your`iOS` folder in Xcode. Then in `Runner` you will see file `AppDelegate.Swift`. Open that file and we are good to go. You can modify `AppDelegate.Swift` in whatever IDE you are using but if you use Xcode it will provide suggestions and shows error if we are missing something .

```Swift
@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
private var secureTextField = UITextField?
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        let controller: FlutterViewController = window?.rootViewController as! FlutterViewController
        let methodChannel = FlutterMethodChannel(name: "screenGuardChannel",
                                                 binaryMessenger: controller.binaryMessenger)
        methodChannel.setMethodCallHandler { (call: FlutterMethodCall, result: @escaping FlutterResult) in
            if call.method == "enableScreenGuard" {
            self.enableScreenGuard()
                result("Secure mode enabled")
            } else if(call.method == "disableScreenGuard){
            self.disableScreenGuard()
            }
            else {
                result(FlutterMethodNotImplemented)
            }
        }
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
}
```


First we declare secureTextField i.e `UITextField`, using its `secureTextEntry` we will be handling screen capture.

- **FlutterViewController Setup**:   The main Flutter view is obtained as FlutterViewController. This acts a bridge between flutter and native code.

- **Method Channel Setup**: A flutter method channel is created with name `screenGuardChannel`. The `binaryMessenger` connects Flutter and iOS for bidirectional communication.

- **Setting Up Method Call Handler**: Listens for method calls from Flutter and processes each call based on the method name provided by Flutter and returns value if required.

After that based on method name as we have declared in our app side. We will create these two functions. 

```Swift
 @objc func enableScreenGuard() {
          DispatchQueue.main.async {
              let field = UITextField()
                         self.secureTextField = field 
                         let view = UIView(frame: CGRect(x: 0, y: 0, width: field.frame.width, height: field.frame.height))
                         let image = UIImageView(image: UIImage())
                         image.frame = CGRect(x: 0, y: 0, width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
                         field.isSecureTextEntry = true
                         self.window?.addSubview(field)
                         view.addSubview(image)
                         self.window?.layer.superlayer?.addSublayer(field.layer)
                         field.layer.sublayers?.last?.addSublayer(self.window?.layer ?? CALayer())
                         field.leftView = view
                         field.leftViewMode = .always
          }
      }
 @objc func disableScreenGuard() {
          DispatchQueue.main.async {
              let field = UITextField()
              self.secureTextField = field
              field.isSecureTextEntry = false
             
              field.removeFromSuperview()
                    if let window = self.window {
                        let rootViewController = window.rootViewController
                        window.rootViewController = nil
                        window.rootViewController = rootViewController
                        window.makeKeyAndVisible()
                    }
          }
      }
```


With this you are good to go for guarding screen in iOS.  Now let's do it for android.

## Setting up for android 

 Navigate to the directory holding your Flutter app, and select the **android** folder inside it. Click **OK** and Open the file `MainActivity.kt` located in the **kotlin** folder in the Project view. 

```Kotlin
import android.view.WindowManager
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel


class MainActivity: FlutterActivity() {
    private val screenGuardChannel = "screenguardChannel"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(
            flutterEngine.dartExecutor.binaryMessenger, screenGuardChannel).setMethodCallHandler{
                call, result ->
            when (call.method){
                "enableScreenGuard"-> {
                  enableScreenGuard()
                    result.success("Secure mode enabled")
                }
                "disableScreenGuard" ->{
                   disableScreenGuard()
                    result.success("Secure mode disabled")
                }
                else -> {
                    result.notImplemented()
                }
            }
        }

    }

    private fun enableScreenGuard() {
        window.setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        )
    }

    private fun disableScreenGuard() {
        window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
    }

}
```

The concept of` method channel setup `,`binary messenger` and` method call handler` is same for android too. Flutter sends method calls (`enableScreenGuard` or `disableScreenGuard`) to the Android code via the `MethodChannel`. Based on the method name, Android enables or disables the `FLAG_SECURE` flag. After executing the action, the Android code sends a success response (or an error if not implemented) to Flutter.

This is how we prevent screen shot and screen recording in Flutter app using Method Channel. I am writing because I need to understand about method channels too. Hope you got some insight too. Thank you for reading and Happy Coding !!