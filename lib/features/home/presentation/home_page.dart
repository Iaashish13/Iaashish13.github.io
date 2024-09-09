import 'package:flutter/material.dart';
import 'package:my_website/app/widgets/app_bar.dart';
import 'package:my_website/app/widgets/responsive_padding.dart';
import 'package:my_website/features/home/presentation/widget/widget.dart';

class Homepage extends StatefulWidget {
  const Homepage({super.key});

  @override
  State<Homepage> createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      // drawer: ResponsiveDevice.isMobile(context) ? const DrawerWidget() : null,
      body: SafeArea(
        child: ResponsivePadding(
          child: CustomScrollView(
            slivers: [
              SliverList.list(
                children: [
                  const AppMenuBar(),
                  const SizedBox(
                    height: 20,
                  ),
                  Row(
                    children: [UserInfoWidget()],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
