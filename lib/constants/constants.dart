// title constants

import 'package:flutter/material.dart';
import 'package:my_website/model/drawer_item_model.dart';

const titles = [
  'Home',
  'Posts',
  'Categories',
  'About Me',
];
final listofDrawer = [
  DrawerItemsClass(
    icon: Icons.home,
    title: 'Home',
    onTap: () {},
  ),
  DrawerItemsClass(icon: Icons.post_add, title: 'Posts', onTap: () {}),
  DrawerItemsClass(icon: Icons.category, title: 'Categories', onTap: () {}),
  DrawerItemsClass(icon: Icons.info, title: 'About me', onTap: () {}),
];
