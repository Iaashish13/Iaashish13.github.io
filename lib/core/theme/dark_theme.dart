import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:flutter/material.dart';

// final darkTheme = ThemeData(
//   fontFamily: 'Poppins',
//   iconTheme: const IconThemeData(color: Colors.white, size: 18),
//   appBarTheme:
//       const AppBarTheme(backgroundColor: Color(0xff121212), elevation: 1),
//   scaffoldBackgroundColor: Colors.black,
//   textTheme: const TextTheme(
//     bodyMedium: TextStyle(
//       fontWeight: FontWeight.w500,
//       fontSize: 14,
//       color: Colors.white,
//     ),
//     displayMedium: TextStyle(
//       fontWeight: FontWeight.w600,
//       fontSize: 20,
//       color: Colors.white,
//     ),
//     bodySmall: TextStyle(
//       fontWeight: FontWeight.w300,
//       fontSize: 11,
//       color: Colors.grey,
//     ),
//   ),
// );

final darkTheme = FlexThemeData.dark(
  fontFamily: 'Poppins',
  useMaterial3: true,
  scheme: FlexScheme.blueM3,
  textTheme: const TextTheme(
    bodyMedium: TextStyle(
      fontWeight: FontWeight.w500,
      fontSize: 14,
    ),
    bodyLarge: TextStyle(fontWeight: FontWeight.w500, fontSize: 18),
    displayMedium: TextStyle(
      fontWeight: FontWeight.w600,
      fontSize: 20,
    ),
    bodySmall: TextStyle(
      fontWeight: FontWeight.w300,
      fontSize: 11,
      color: Colors.grey,
    ),
  ),
);
