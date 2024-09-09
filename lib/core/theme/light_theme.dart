import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:flutter/material.dart';

// final lightTheme = ThemeData(
//   iconTheme: const IconThemeData(color: Colors.black, size: 18),
//   appBarTheme:
//       const AppBarTheme(backgroundColor: Colors.blueAccent, elevation: 1),
//   primaryColor: Colors.blueAccent,
//   fontFamily: 'Poppins',
//   scaffoldBackgroundColor: Colors.white,
//   textTheme: const TextTheme(
//     displayMedium: TextStyle(
//         fontWeight: FontWeight.w600, fontSize: 20, color: Colors.black),
//     bodyMedium: TextStyle(
//       fontWeight: FontWeight.w500,
//       fontSize: 14,
//       color: Colors.black,
//     ),
//     bodySmall: TextStyle(
//       fontWeight: FontWeight.w300,
//       fontSize: 13,
//       color: Colors.grey,
//     ),
//   ),
// );

final lightTheme = FlexThemeData.light(
  fontFamily: 'Poppins',
  useMaterial3: true,
  scheme: FlexScheme.blueM3,
  textTheme: const TextTheme(
    bodyMedium: TextStyle(
      fontWeight: FontWeight.w500,
      fontSize: 16,
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
