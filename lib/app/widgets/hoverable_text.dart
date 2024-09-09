// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';

class HoverTextWithUnderlineWidget extends StatefulWidget {
  final String hoverText;
  final void Function()? onTap;
  const HoverTextWithUnderlineWidget({
    super.key,
    required this.hoverText,
    this.onTap,
  });

  @override
  State<HoverTextWithUnderlineWidget> createState() =>
      _HoverTextWithUnderlineWidgetState();
}

class _HoverTextWithUnderlineWidgetState
    extends State<HoverTextWithUnderlineWidget> {
  final ValueNotifier<bool> _isHovered = ValueNotifier(false);
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return MouseRegion(
      onEnter: (_) => _isHovered.value = true,
      onExit: (_) => _isHovered.value = false,
      child: GestureDetector(
        onTap: widget.onTap,
        child: ValueListenableBuilder<bool>(
          valueListenable: _isHovered,
          builder: (context, isHovered, child) {
            return Text(
              widget.hoverText,
              style: theme.textTheme.bodySmall?.copyWith(
                  decoration: isHovered
                      ? TextDecoration.underline
                      : TextDecoration.none),
            );
          },
        ),
      ),
    );
  }
}
