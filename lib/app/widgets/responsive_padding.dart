// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';

import 'package:my_website/core/responsive/device_type.dart';

class ResponsivePadding extends StatelessWidget {
  final Widget child;
  const ResponsivePadding({
    super.key,
    required this.child,
  });

  double _getResponsivePadding(BuildContext context) {
    if (DeviceType.isDesktop(context)) {
      return 60;
    } else if (DeviceType.isTablet(context)) {
      return 30;
    }
    return 15;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: _getResponsivePadding(context)),
      child: child,
    );
  }
}
