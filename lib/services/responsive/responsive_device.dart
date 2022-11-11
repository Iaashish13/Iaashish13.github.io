import 'package:flutter/material.dart';
// In this widget we are using layout builder which will make us
// differnce about in which  is current deviccedevice and will
// render UI as parameters.

class ResponsiveDevice extends StatelessWidget {
  final Widget? mobileUi;
  final Widget? desktopUI;
  final bool bothareSame;
  final Widget? sameWidget;
  const ResponsiveDevice(
      {Key? key,
      required this.mobileUi,
      required this.desktopUI,
      this.sameWidget,
      this.bothareSame = false})
      : super(key: key);
static bool isMobile(BuildContext context) =>
      MediaQuery.of(context).size.width < 600;
  @override
  Widget build(BuildContext context) {
    return bothareSame == false
        ? Expanded(
            child: LayoutBuilder(builder: (context, constraints) {
              if (constraints.maxWidth < 600) {
                return mobileUi!;
              } else {
                return desktopUI!;
              }
            }),
          )
        : sameWidget!;
  }
}


