// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';

import 'package:my_website/core/responsive/device_type.dart';

class ResponsiveSizedBox extends StatelessWidget {
  final double? desktopHeight;
  final double? tabletHeight;
  final double? mobileHeight;
  const ResponsiveSizedBox({
    super.key,
    this.desktopHeight,
    this.tabletHeight,
    this.mobileHeight,
  });
  double _getResponsiveSizedBox(BuildContext context) {
    if (DeviceType.isDesktop(context)) {
      return desktopHeight ?? 40;
    } else if (DeviceType.isTablet(context)) {
      return tabletHeight ?? 30;
    }
    return mobileHeight ?? 10;
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: _getResponsiveSizedBox(context),
    );
  }
}
