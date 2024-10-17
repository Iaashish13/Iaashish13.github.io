import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:my_website/app/widgets/widget.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ResponsivePadding(
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'About Aashish',
              style: theme.textTheme.displayMedium,
            ),
            const SizedBox(
              height: 10,
            ),
            Text(
              'I kindda belive in this quote:',
              style: theme.textTheme.bodyMedium,
            ),
            const SizedBox(
              height: 2,
            ),
            Text(
              r'ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।',
              style: theme.textTheme.bodyMedium
                  ?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(
              height: 30,
            ),
            Text(
              'Namaste!! I am Aashish Regmi.\nSometimes I want to learn the teaching from the holy books like Geta and Vedas.\nAlso I am quite fond of upcoming gadgets like foldable phones, new devices from Apple and Samsung compare them and review them.\nBefore I use to play with custom roms with Android, experimenting them rooting, using xposed and trying to do things what hardware is capable.\nThat got interest in me development.\nAlso slowly leaning toward Sprituality. 😁',
              style: theme.textTheme.bodyMedium?.copyWith(
                fontFamily: GoogleFonts.merriweather().fontFamily,
              ),
            ),
            const SizedBox(
              height: 30,
            ),
            const Text(
                r'Here, I am gonna post about the flutter projects that I have done. If you want to collaborate with me and want to build app or want to hire me for work kindly email me . Thank you so much for visiting my site.')
          ],
        ),
      ),
    );
  }
}
