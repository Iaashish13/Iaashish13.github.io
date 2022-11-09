import 'package:flutter/material.dart';
import 'package:my_website/screens/landing_page.dart';
import 'package:my_website/screens/second_page.dart';
import 'package:my_website/services/responsive/responsive_device.dart';

class Homepage extends StatelessWidget {
  const Homepage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: const [
          ResponsiveDevice(
            desktopUI: SecondPage(),
            mobileUi: LandingPage(),
          ),
        ],
      ),
    );
  }
}
