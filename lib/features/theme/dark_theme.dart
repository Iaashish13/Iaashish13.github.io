import 'package:flutter/material.dart';

final darkTheme = ThemeData(
  backgroundColor: Colors.black,
  fontFamily: 'Poppins',
  iconTheme: const IconThemeData(color: Colors.white, size: 18),
  appBarTheme:
      const AppBarTheme(backgroundColor: Color(0xff121212), elevation: 1),
  primaryColor: Colors.blueAccent,
  scaffoldBackgroundColor: Colors.black,
  textTheme: const TextTheme(
    bodyText1: TextStyle(
      fontWeight: FontWeight.w500,
      fontSize: 14,
      color: Colors.white,
    ),
    headline5: TextStyle(
      fontWeight: FontWeight.w600,
      fontSize: 20,
      color: Colors.white,
    ),
    bodyText2: TextStyle(
      fontWeight: FontWeight.w300,
      fontSize: 11,
      color: Colors.grey,
    ),
  ),
);
