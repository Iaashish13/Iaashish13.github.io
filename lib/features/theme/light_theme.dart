import 'package:flutter/material.dart';

final lightTheme = ThemeData(
  appBarTheme:
      const AppBarTheme(backgroundColor: Colors.blueAccent, elevation: 1),
  primaryColor: Colors.blueAccent,
  fontFamily: 'Poppins',
  scaffoldBackgroundColor: Colors.white,
  textTheme: const TextTheme(
      headline5: TextStyle(
          fontWeight: FontWeight.w600, fontSize: 20, color: Colors.black),
      bodyText1: TextStyle(
        fontWeight: FontWeight.w500,
        fontSize: 14,
        color: Colors.black,
      ),
      bodyText2: TextStyle(
        fontWeight: FontWeight.w300,
        fontSize: 13,
        color: Colors.grey,
      )),
);
