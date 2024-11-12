import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

final lightTheme = FlexThemeData.light(
  fontFamily: GoogleFonts.lato().fontFamily,
  useMaterial3: true,
  scheme: FlexScheme.blueM3,
  textTheme: const TextTheme(
    displaySmall: TextStyle(fontSize: 22, fontWeight: FontWeight.w500),
    bodyMedium: TextStyle(
      fontWeight: FontWeight.w400,
      fontSize: 18,
    ),
    bodyLarge: TextStyle(fontWeight: FontWeight.w500, fontSize: 20),
    displayMedium: TextStyle(
      fontWeight: FontWeight.w600,
      fontSize: 20,
    ),
    labelMedium: TextStyle(fontWeight: FontWeight.w400, fontSize: 15),
    bodySmall: TextStyle(
      fontWeight: FontWeight.w400,
      fontSize: 16,
    ),
    labelSmall: TextStyle(
      fontWeight: FontWeight.w400,
      fontSize: 10,
    ),
  ),
);
