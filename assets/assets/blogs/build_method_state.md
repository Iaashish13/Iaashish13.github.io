## Why is build method on State on Stateful?

The placement of the `build` method on `State` rather than `StatefulWidget` is an intentional design choice in Flutter that gives developers more flexibility and avoids common bugs related to closures capturing immutable properties.

### The Problem with `build` on `StatefulWidget`

Imagine if the `build` method were defined on `StatefulWidget` and not on `State`. Here's a hypothetical example to illustrate the potential issues:

```dart
// This is NOT valid Flutter code
class MyButton extends StatefulWidget {
  final Color color;

  MyButton({super.key, required this.color});

  @override
  Widget build(BuildContext context, State state) {
    return ElevatedButton(
      onPressed: () {
        // This closure captures the widget instance
        print('Button color: $color');
      },
      child: Text('Press me'),
    );
  }
}

```

### The Problem

In the above example, the closure for `onPressed` captures `this`, which refers to the `MyButton` widget instance. The `MyButton` class is immutable, meaning that when the parent rebuilds `MyButton` with a new `color` (say, changing from blue to green), the closure still refers to the old `MyButton` instance with the outdated `color` property.

As a result, if the closure outlives its initial widget instance, it would still print the old color, even though the widget has been updated. This behavior can lead to stale references and bugs that are difficult to debug.

### The Solution: `build` on `State`

To solve this, Flutter places the `build` method on `State` instead of `StatefulWidget`. Here's how this works in the correct design:

```dart
class MyButton extends StatefulWidget {
  final Color color;

  const MyButton({super.key, required this.color});

  @override
  State<MyButton> createState() => _MyButtonState();
}

class _MyButtonState extends State<MyButton> {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        // The closure now captures 'this', referring to the State instance
        print('Button color: ${widget.color}');
      },
      child: Text('Press me'),
    );
  }
}

```

### Why This Design Works

- In this implementation, the closure inside `onPressed` captures `this`, which refers to the `State` object, not the immutable `MyButton` widget instance.
- When the parent widget rebuilds `MyButton` with a new `color`, the framework updates the `State` object to point to the new `MyButton` instance. As a result, `widget.color` reflects the latest value.
- This approach ensures that closures refer to the `State` instance, which is persistent and updates its `widget` property as needed, preventing stale references.

### Summary of Benefits

1. **Avoids Stale References**: The `build` method being on `State` ensures that closures capture the `State` object, which updates dynamically, preventing outdated information.
2. **Encapsulation**: By placing `build` on `State`, `StatefulWidget` can encapsulate its `State` logic, making the framework's API more flexible and allowing for subclassing without exposing internal details.
3. **Flexibility for Custom Widgets**: Widgets like `AnimatedWidget` can introduce their own abstractions without needing to work around a `State` object in the `StatefulWidget`'s API.

### Conclusion

Putting `build` on `State` instead of `StatefulWidget` provides more flexibility and prevents bugs related to closures capturing immutable data. It ensures that the UI is always built with the correct, updated state, making your Flutter apps more reliable and efficient.
