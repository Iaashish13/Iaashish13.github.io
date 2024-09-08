import 'package:flutter/material.dart';

enum ScreenType {
  mobile,
  tablet,
  desktop,
}

class FormFactor {
  static double desktop = 900;
  static double tablet = 600;
  static double handset = 300;
}

ScreenType getDeviceType(BuildContext context) {
  double deviceWidth = MediaQuery.sizeOf(context).width;
  if (deviceWidth > FormFactor.desktop) return ScreenType.desktop;
  if (deviceWidth > FormFactor.tablet) return ScreenType.tablet;
  if (deviceWidth > FormFactor.handset) return ScreenType.mobile;
  return ScreenType.mobile;
}
