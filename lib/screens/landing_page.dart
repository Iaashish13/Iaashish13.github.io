import 'package:flutter/material.dart';
import 'package:my_website/responsive_widgets/title_widget.dart';

class LandingPage extends StatefulWidget {
  const LandingPage({Key? key}) : super(key: key);

  @override
  State<LandingPage> createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: const [
          TitleWidget(),
          Center(
            child: Text('Successfully configured app router'),
          ),
        ],
      ),
    );
  }
}
