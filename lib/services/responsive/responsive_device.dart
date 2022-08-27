import 'package:flutter/material.dart';
// In this widget we are using layout builder which will make us
// differnce about in which  is current deviccedevice and will
// render UI as parameters.

class ResponsiveDevice extends StatelessWidget {
  final Widget mobileUi;
  final Widget desktopUI;
  final bool? bothareSame;
  const ResponsiveDevice(
      {Key? key,
      required this.mobileUi,
      required this.desktopUI,
      this.bothareSame})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      if (constraints.maxWidth < 600) {
        return mobileUi;
      } else {
        return desktopUI;
      }
    });
  }
}
