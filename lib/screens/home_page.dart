import 'package:flutter/material.dart';
import 'package:my_website/core/responsive/device_type.dart';
import 'package:my_website/responsive_widgets/drawer_widget.dart';
import 'package:my_website/screens/landing_page.dart';
import 'package:my_website/screens/second_page.dart';
import 'package:my_website/services/responsive/responsive_device.dart';

class Homepage extends StatefulWidget {
  const Homepage({super.key});

  @override
  State<Homepage> createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);
    print(size.width);
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: Text(getDeviceType(context).name),
      ),
      // appBar: ResponsiveDevice.isMobile(context)
      //     ? AppBar(

      //         elevation: 0,
      //         iconTheme: Theme.of(context).iconTheme,
      //       )
      //     : null,
      // drawer: ResponsiveDevice.isMobile(context) ? const DrawerWidget() : null,
      // body: ColoredBox(
      //   color: Colors.white,
      //   child: Column(
      //     children: const [
      //       ResponsiveDevice(
      //         desktopUI: SecondPage(),
      //         mobileUi: LandingPage(),
      //       ),
      //     ],
      //   ),
      // ),
    );
  }
}
