### What is Widget? 
Widget are the things that developers(we) use to describe user interface while developing applications right and we know that there are two types of widget in flutter which are:
1. Stateless Widget
2. Stateful Widget

Before going to type of widget, let know about what actually is  `Widget` ?
If we see the code inside framework it looks like this 
```dart
@immutable
abstract class Widget extends DiagnosticableTree {
}
```

As per flutter doc ***A widget is an immutable description of part of a user interface***.
Here comes the question, doc and code both says it is immutable right. But we are updating our widget in flutter right?

Before answering that question let look at this first:
 Lets dig down what happens when we create Widget. The code looks like: 

```dart
abstract class Widget extends DiagnosticableTree {
  @protected
  @factory
  Element createElement();
}
```



Okay.. In the above code we see a protected factory method `Element createElement()` . What it does is Each time a widget is placed in the tree, it is inflated into an `Element`, which means a
widget that is incorporated into the tree multiple times will be inflated multiple times. *We got our element tree here 

#### How widget get updated or replaced ?
Okay now answering above question. For that lets look at more code inside `Widget` 😁
```dart
abstract class Widget extends DiagnosticableTree {
 const Widget({ this.key });
  final Key? key;
  @protected
  @factory
  Element createElement();

static bool canUpdate(Widget oldWidget, Widget newWidget) {
    return oldWidget.runtimeType == newWidget.runtimeType
        && oldWidget.key == newWidget.key;
  }
}
```

The `Key` property controls how one widget replaces another widget in the tree. From the above `canUpdate` method we can see that  widget can update only `if its key and runtime properties of previous and new widget are equal` . If they are not equal `new widget replaces the old widget` 

If the `Widget is updated` then  as  mentioned earlier it has its element too right?  So if updates it calls `Elements.update` method and element is also updated. Then if `Widget is replaced` then new widget is created. And we know that whenever widget is created it creates it element because it has method called `Element createElement()` and it is inserted into tree.

This is how widget is either  `Widget is updated or replaced `.

### Stateless Widget 

As the name implies, we can say that  `Stateless Widget`  is the description of user interface without state. Lets look from the code perspective so that we can understand better:

```dart
abstract class StatelessWidget extends Widget{
const StatelessWidget({ super.key });
  @override
  StatelessElement createElement() => StatelessElement(this);
    @protected
  Widget build(BuildContext context);
}
```

From the above code we can say that  there is being creation of `StatelessElement` by overriding it  to keep  on widget tree same as above in `Widget`. Also we should note that
**While using `StatelessWidget` we might have noticed that it depends on the `configurations`  that we have provided and `BuildContext`.**

If you wonder about what are configurations then configurations are those property which we pass to widget. Below if you see the code inside Text then it is `Stateless Widget`.
```dart
Text(
  'Hello, Flutter!',   // This string is part of the widget's configuration
  style: TextStyle(fontSize: 20),   // This is also part of the widget's configuration
)

```


Now lets know about when the build method of `StatelessWidget` is triggered
1. When the widget is placed at widget tree for the first time
2. When the widget parent change its configuration
3. When `InheritedWidget` that is used changes

For performance considerations:
If a widget's parent will regularly change the widget's configuration, or if it depends on inherited widgets that frequently change, then it is important to optimize the performance of the build method to maintain a fluid.

 There are several techniques one can use to minimize the impact of rebuilding a stateless widget:

- **Minimize the number of nodes transitively created by the `build` method and any widgets it creates.**  
    For example, instead of using an elaborate arrangement of `Row`s, `Column`s, `Padding`s, and `SizedBox`es to position a single child in a specific manner, consider using just an `Align` or a `CustomSingleChildLayout`. Instead of an intricate layering of multiple `Container`s with `Decoration`s to achieve a particular graphical effect, consider using a single `CustomPaint` widget.
    
- **Use `const` widgets where possible, and provide a `const` constructor for the widget so that users of the widget can also do so.**
    
- **Consider refactoring the stateless widget into a stateful widget** so that it can use some of the techniques described in `StatefulWidget`, such as caching common parts of subtrees or using `GlobalKey`s when changing the tree structure.
    
- **If the widget is likely to get rebuilt frequently due to the use of `InheritedWidget`s**, consider refactoring the stateless widget into multiple widgets, with the parts of the tree that change being pushed to the leaves. For example, instead of building a tree with four widgets where the inner-most widget depends on the `Theme`, factor out the part of the `build` function that constructs the inner-most widget into its own widget. This way, only the inner-most widget needs to be rebuilt when the theme changes.
    
- **Prefer using a widget over a helper method when creating reusable UI components.**  
    For example, if a function is used to build a widget, a `State.setState` call would require Flutter to rebuild the entire returned widget. However, if a `Widget` is used instead, Flutter can efficiently re-render only the necessary parts. Even better, if the created widget is `const`, Flutter will skip most of the rebuild work.


This much for `Stateless Widget`. I will write seprate article for `StatefulWidget` 

