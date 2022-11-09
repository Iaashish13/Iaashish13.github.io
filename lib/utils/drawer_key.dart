import 'package:flutter/material.dart';

class DrawerProvider  {
  final scafoldKey = GlobalKey<ScaffoldState>();

  GlobalKey<ScaffoldState> get key => scafoldKey;
}
