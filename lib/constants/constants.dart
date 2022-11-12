// title constants

import 'package:flutter/material.dart';
import 'package:my_website/model/drawer_item_model.dart';

const titles = [
  'Home',
  'About Me',
  'Posts',
  'Projects',
];
final listofDrawer = [
  DrawerItemsClass(icon: Icons.home, title: 'Home', onTap: () {}),
  DrawerItemsClass(icon: Icons.info, title: 'About me', onTap: () {}),
  DrawerItemsClass(icon: Icons.post_add, title: 'Posts', onTap: () {}),
];
