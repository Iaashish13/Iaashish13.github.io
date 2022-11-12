import 'package:flutter/material.dart';

class DrawerItemsClass {
  final IconData icon;
  final String title;
  final Function? onTap;
  DrawerItemsClass({
    required this.icon,
    required this.title,
    this.onTap,
  });
}
