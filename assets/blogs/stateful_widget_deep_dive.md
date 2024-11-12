 
As the title implies that `StatefulWidget` has `State`. 
 I am only using useful parts of the code here. Let's look straight into code and see what framework tell us about:
 
```dart
abstract class StatefulWidget extends Widget{
 
  const StatefulWidget({ super.key });
 @override
  StatefulElement createElement() => StatefulElement(this);
 @protected
  @factory
  State createState();
}
```

From above we see that , `createElement()` method . It creates the Stateful element in the widget tree. And  `createState()` method creates the mutable  state of widget in the widget tree and this helps on modifying ours state later. 

While starting Flutter whenever i create  `StatefulWidget` and use same widget  in different parts of code. I used to think it will give me same state which I was wrong. **If we insert widget into  tree in multiple locations, there will be separate state object location in multiple locations too.** 

So I have used state word a lot. So lets talk about that:

#### What is State?
Before going to `State` we need to know about its lifecycle. Oops, I did not know that **Sates
have lifecycle too**.

```dart
enum _StateLifeCycle{
created, initialized, ready, defunct
}
```


1. Created: This is when State Object is created and `initState` is called at this time.
2. Initialized: Here `initState` has been called but State Object is not ready to build. `didChangeDependencies` is called at this time
3. Ready: The State Object is ready to build and `dispose` is not called yet
4. Defunct: The dispose method has been called and State Object is no longer able to build.

Lets go through in detail: 

- The framework creates `State` object by calling `createState`.
- Then the new created state object is associated with BuildContext.
     This association of BuildContext will never change but build context can move along the widget tree. In this point` state object` is called `mounted`.
     
- Then framework calls `initState` method.
     `initState` is called after the `State` object is created but before the widget is rendered on the screen for the first time. It’s called **before** `build()`.
     
- The Flutter framework automatically calls `didChangeDependencies` after the first `initState()` and **before** the first `build()` method is called.
     If a dependency provided by an `InheritedWidget` (that your widget relies on) changes during the lifetime of the widget, `didChangeDependencies` is called again. This happens when the widget’s position in the widget tree changes, or when the `InheritedWidget` itself changes.
     
- After this `State Object` is fully initialized and we are ready to call build method any number of times to obtain a  description of the user interface for this subtree.
     Now,  State objects can  spontaneously request to rebuild their subtree by calling their   setState method, which indicates that some of their internal state has changed in a way that might impact the user interface in this  subtree.

So now, let look at what is `State`? 
`State` is information which is read when the widget is built  and it might change during lifecycle of widget. So when we are changing the state, its our responsibility to notify  that state is changed which is done by using `setState`. 

Let look into the code 

```dart
abstract class State<T extends StatefulWidget> with Diagonsticable {
 T get widget => _widget!;
  T? _widget;
  
  _StateLifecycle _debugLifecycleState = _StateLifecycle.created;
   bool _debugTypesAreRight(Widget widget) => widget is T;
    BuildContext get context {
    assert(() {
      if (_element == null) {
        throw FlutterError(
        'This widget has been unmounted, so the State no longer has a context (and should be considered defunct). \n'
	    'Consider canceling any active work during "dispose" or using the"mounted" getter to determine if the State is still active.',
        );
      }
      return true;
    }());
    return _element!;
  }
  
    StatefulElement? _element;
     bool get mounted => _element != null;
}
```

-   `_StateLifeCycele` : When the `State` objects are moving through their life cycle i.e from `_StatefulLifecyle.created` to `_StatefulLife.defunct` this field is used by framework to keep consider that they are moving through lifecycle.

- `_debugTypesAreRight`: verifies the  `State` that  was created  is one that expects to be for that particular `Widget`.

- `BuildContext`: is the location in the widget tree. `State Objects` are associated with the `BuildContext` after creating them with `StatefulWidget.createState()` method and which is done before calling an in `initState`.  
		I have mentioned above too ***Once State Object is associated with BuildContext . It is permanent but BuildContext can be moved around the tree***.

- `bool get mounted => _element != null;`
	As long as `mounted` is `true`, the `State` object is **alive**  in the widget tree, meaning you can call `setState()` to trigger updates, which will result in the widget being rebuilt as needed.
	Here, `mounted` returns `true` if `_element` is not null, which means the `State` is associated with a `BuildContext` in the widget tree. When `_element` becomes `null` (after `dispose()`), `mounted` returns `false`. 

Then, now lets look at `initState` and `didUpdateWidget`.

```dart
abstract class State<T extends StatefulWidget> with Diagnosticable {
// Above part conde continues
  @protected
  @mustCallSuper
  void initState() {
    assert(_debugLifecycleState == _StateLifecycle.created);
    if (kFlutterMemoryAllocationsEnabled) {
      FlutterMemoryAllocations.instance.dispatchObjectCreated(
        library: _flutterWidgetsLibrary,
        className: '$State',
        object: this,
      );
    }
  }
 @mustCallSuper
 @protected
  void didUpdateWidget(covariant T oldWidget) { }
}
```

### initState :
  This method is called `exactly once` for each state object that it creates. This one- time call allows you to initialize resources that your widget might use during its lifecycle. 
- `initState` can depend on the widget instance that created it or its `BuildContext`, allowing you to set up things like event listeners or initial data loading, often based on the widget's properties.
	 **Example**: If you’re displaying data based on an ID passed in the widget, you could initiate loading that data here.
	 
- Always call `super.initState()` at the start of the method, as this initializes the parent `State` class, which is crucial for proper functioning and helps set up the necessary internal lifecycle properties.

- If your `build` method depends on data that changes over time, such as data from a `Stream` or `ChangeNotifier`, you need to subscribe to these sources in `initState`.

  Additionally, when the widget configuration changes (for example, if the widget rebuilds with a different `Stream` or notifier), you may need to update these subscriptions. This is done in three steps:
    - **Subscribe in `initState`**: Initialize the subscription or listener.
    - **Unsubscribe and Resubscribe in `didUpdateWidget`**: Called whenever the widget is reconfigured with new properties, `didUpdateWidget` lets you replace the old subscription if the new configuration requires it.
    - **Unsubscribe in `dispose`**: This method is called when the widget is removed from the tree, allowing you to clean up subscriptions and resources.
Please see the code for reference: 

```dart
class MyStatefulWidget extends StatefulWidget {
  final Stream<int> numberStream;

  const MyStatefulWidget({required this.numberStream});

  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  StreamSubscription<int>? _subscription;
  int _currentNumber = 0;
  @override
  void initState() {
    super.initState();
    // Subscribe to the stream
    _subscription = widget.numberStream.listen((number) {
      setState(() {
        _currentNumber = number;
      });
    });
  }
  @override
  void didUpdateWidget(MyStatefulWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Unsubscribe from the old stream and subscribe to the new one if the widget's stream changes
    if (oldWidget.numberStream != widget.numberStream) {
      _subscription?.cancel();
      _subscription = widget.numberStream.listen((number) {
        setState(() {
          _currentNumber = number;
        });
      });
    }
  }
  @override
  void dispose() {
    // Clean up by canceling the subscription
    _subscription?.cancel();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return Text('Current number: $_currentNumber');
  }
}

```

- **Avoid `dependOnInheritedWidgetOfExactType` in `initState`**:
	 You can’t call `BuildContext.dependOnInheritedWidgetOfExactType` directly within `initState` since it’s called before the widget is fully inserted into the tree. This dependency injection requires the widget to be fully “mounted.” Instead, if you need to rely on inherited widgets, you should do so in `didChangeDependencies`, which is called immediately after `initState` and after the widget is mounted, allowing access to inherited dependencies.
	

### didUpdateWidget:
 It’s called when a widget’s configuration changes, specifically when a widget of the same `runtimeType` and `Widget.key` is rebuilt in the same position in the widget tree.

After this let's look into `reassemble()` and `setState` inside:
I have used shortest version of code of `setState` function Click [here](https://github.com/flutter/flutter/blob/5879a5cba13741a170c18a91f9583f6483c8dd60/packages/flutter/lib/src/widgets/framework.dart#L1165) to see full code.

```dart
abstract class State<T extends StatefulWidget> with Diagnosticable {
//Previous code continues and error descriptions are shortened. 
  @protected
  @mustCallSuper
  void reassemble() { }
  @protected

void setState(VoidCallback fn) {
  assert(mounted, "Cannot call setState after dispose.");
  final Object? result = fn() as dynamic;
  assert(result is! Future, "The callback in setState cannot be async.");
  _element!.markNeedsBuild();
}

}
```


- ### reassemble:
   The `reassemble` method is called on the root of the widget tree (and propagated down the tree) whenever Flutter performs a hot reload. It allows each widget to reinitialize or reset any internal state necessary to reflect updated code while keeping existing app state where possible.
   When you initiate a hot reload, Flutter sends a reassemble signal to the root `Element` of the widget tree. The `reassemble` method is called on every widget in the tree. For most widgets, the default implementation is sufficient, so no custom `reassemble` logic is required. However, certain widgets, particularly those dependent on external resources (like `Image` widgets), may override `reassemble` to handle resource reloading or reinitialization.


### setState:

When the internal state of a widget changes, `setState` is used to wrap that change. This notifies Flutter that it needs to call `build()` to reflect the new state in the UI.
`setState` callback is immediately called synchronously. It must not return a future 
(the  callback cannot be `async`), since then it would be unclear when the state was actually being set.
    
###### What happens to state when you change state without calling setState?
If you just change the state directly without calling setState, the framework might not schedule a build and the user interface for this subtree might not be updated to reflect the new state.

After `setState` is called, Flutter flags the widget to be rebuilt in the next frame by calling `Element.markNeedsBuild()`. Generally it is recommended that the setState method only be used to wrap the actual changes to the state, not any computation that might be associated with the change.

```dart
Future<void> _incrementCounter() async {
	setState(() {
    _counter++;
  });
  Directory directory = await getApplicationDocumentsDirectory(); 
  final String dirName = directory.path;
  await File('$dirName/counter.txt').writeAsString('$_counter');
```


 Note: ***Avoid calling `setState` after a widget is removed from the widget tree. Use `mounted` to check if the widget is still present.*** 

Now, what about looking at `deactivate`, `activate`, `dispose`.

```dart
abstract class State<T extends StatefulWidget> with Diagnosticable {
  @protected
  @mustCallSuper
  void deactivate() { }   
   @protected
  @mustCallSuper
  void activate() { }
   @protected
  @mustCallSuper
  void dispose() {
    assert(_debugLifecycleState == _StateLifecycle.ready);
    assert(() {
      _debugLifecycleState = _StateLifecycle.defunct;
      return true;
    }());
    if (kFlutterMemoryAllocationsEnabled) {
      FlutterMemoryAllocations.instance.dispatchObjectDisposed(object: this);
    }
  }
}
```

### deactivate:
   This method is called whenever `State Object` is removed from the tree.  The `State` object may be temporarily removed and reinserted into the tree. This can happen, for example, when a widget subtree is moved within the widget tree, such as when using a `GlobalKey` to move widgets. If the `State` object is permanently removed, the `dispose` method will be called after `deactivate` for final cleanup.
  If the framework reinserts the `State` object into the tree, it will call the `activate` method. The `activate` method gives the `State` object an opportunity to reacquire any resources that it released in `deactivate`.

### activate:
  This method is called when  object is reinserted into the tree after having been
  removed via `deactivate`.Since `activate` is called only when a deactivated `State` object is reinserted, it allows you to reacquire resources that were previously released.It will then
  also call `build`to give the object a chance to adapt to its new location in the tree. 

### dispose:
  The framework calls `dispose` when the `State` object will no longer be needed or rebuilt. This makes `dispose` the final point in the lifecycle of the `State` object.
  When a `State` object is first created, it is "mounted" to the widget tree, and the `mounted` property is `true`. Once `dispose` is called, the `mounted` property is set to `false`, indicating that the `State` object has been unmounted. At this point, using `setState` would throw an error.
  The `dispose` method is designed to clean up and release resources held by the `State` object, such as:
- Cancelling active animations or streams.
- Releasing file handles.
- Disposing of controllers (like `ScrollController` or `TextEditingController`).

Now its time of knowing the about the method that we have been using all the time whenever we create any `Widget`. This method is none other than:

### build:
  Lets look at code
  
```dart
 abstract class State<T extends StatefulWidget> with Diagnosticable {
  //Above code continues...
    @protected
 Widget build(BuildContext context);
  }
```
This method is responsible for returning a widget tree that represents the UI configuration of the current `State` object.
#### When is `build` Called?
The `build` method is invoked in several situations, such as:
1. **After `initState`**: When the `State` object is initialized for the first time.
2. **After `didUpdateWidget`**: When the widget is rebuilt with new properties.
3. **After `setState`**: When you call `setState`, indicating that the state has changed and the UI needs to be updated.
4. **After a dependency changes**: For instance, when an `InheritedWidget` that the `State` object depends on changes.
5. **After `deactivate` and re-insertion**: If the `State` object is temporarily removed and then reinserted into the widget tree (e.g., when using a `GlobalKey`).

***This method can potentially be called in every frame and should not have any side effects beyond building a widget.***
Note:  **It should only construct the UI and must not trigger side effects like making network requests or changing the state.It can be called frequently, even multiple times per frame, so it should be efficient and straightforward** 

**What is `BuildContext`?**: 
The `BuildContext` parameter provides context about the widget's position in the widget tree(location). It gives access to the widget’s ancestors and allows interaction with inherited widgets. For `BuildContext` and its common questions, I will try to write another article cause this article is already long enough😅.

And while seeing the code we have noticed that `build method` is actually on state rather than `StatefulWidget`.  As this article is already long, If you are curious please see this article.


Okay without further delay, lets move into remaining two topics and lets get started from code:

```dart
 abstract class State<T extends StatefulWidget> with Diagnosticable {
 //Above code continues...
 @protected
  @mustCallSuper
  void didChangeDependencies() { }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    assert(() {
      properties.add(EnumProperty<_StateLifecycle>('lifecycle state', _debugLifecycleState, defaultValue: _StateLifecycle.ready));
      return true;
    }());
    properties.add(ObjectFlagProperty<T>('_widget', _widget, ifNull: 'no widget'));
    properties.add(ObjectFlagProperty<StatefulElement>('_element', _element, ifNull: 'not mounted'));
  }
  }
```

### didChangeDependencies:
This method is triggered whenever a dependency of the `State` object changes. A common scenario is when the widget’s `build` method relies on an `InheritedWidget` (e.g., a `Theme` or `MediaQuery`). When that `InheritedWidget` changes, `didChangeDependencies` is called to notify the `State` that a dependency has been updated, so it can react accordingly.

This method is also called immediately after `initState`. It is safe to call `BuildContext.dependOnInheritedWidgetOfExactType` from this method. Generally, you don’t need to override this method because any dependency change will automatically trigger a call to `build`.  ***Some subclasses do override this method because they need to do some expensive work (e.g., network fetches) when their dependencies change, and that work would be too expensive to do for every build.***

### debugFillProperties:
`debugFillProperties` is used to add diagnostic information about a widget, which can help track down issues by displaying the current values of properties and internal states

Here comes the end, Thank you for reading.. If you haven't read article related to `StatelessWidget` then here it is.