// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';

import 'package:my_website/core/responsive/device_type.dart';

class ResponsivePadding extends StatelessWidget {
  final Widget child;
  const ResponsivePadding({
    Key? key,
    required this.child,
  }) : super(key: key);

  double _getResponsivePadding(BuildContext context) {
    if (DeviceType.isDesktop(context)) {
      return 100;
    } else if (DeviceType.isTablet(context)) {
      return 40;
    }
    return 20;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: _getResponsivePadding(context)),
      child: child,
    );
  }
}
