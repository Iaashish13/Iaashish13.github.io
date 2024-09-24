import 'package:flutter/material.dart';
import 'package:my_website/app/widgets/widget.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ResponsivePadding(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'About Aashish',
            style: theme.textTheme.displayMedium,
          ),
          const SizedBox(
            height: 30,
          ),
          const Text(
              r'Namaste!! I am Aashish Regmi. I am kind of tech enthusiastic who loves to explore the recent or upcoming tech gadgets or devices. More than that, I love to play FPS games and want to stream games which I will play :).'),
          const SizedBox(
            height: 30,
          ),
          const Text(
              r'Here, I am gonna post about the flutter projects that I have done. If you want to collaborate with me and want to build app or want to hire me for work kindly email me . Thank you so much for visiting my site')
        ],
      ),
    );
  }
}
