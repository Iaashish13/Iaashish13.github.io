import 'package:flutter/material.dart';

enum ScreenType {
  mobile,
  tablet,
  desktop,
}

class DeviceType {
  static bool isMobile(BuildContext context) =>
      MediaQuery.of(context).size.width < 600;
  static bool isTablet(BuildContext context) {
    return MediaQuery.sizeOf(context).width >= 600 &&
        MediaQuery.sizeOf(context).width < 840;
  }

  static bool isDesktop(BuildContext context) {
    return MediaQuery.sizeOf(context).width >= 840;
  }
}

ScreenType getScreenType(BuildContext context) {
  double deviceWidth = MediaQuery.sizeOf(context).width;
  if (deviceWidth >= 840) return ScreenType.desktop;
  if (deviceWidth > 600) return ScreenType.tablet;
  if (deviceWidth > 300) return ScreenType.mobile;
  return ScreenType.mobile;
}
