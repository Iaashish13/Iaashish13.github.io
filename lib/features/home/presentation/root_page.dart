// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'package:my_website/app/widgets/app_bar.dart';
import 'package:my_website/app/widgets/responsive_padding.dart';
import 'package:my_website/core/responsive/device_type.dart';
import 'package:my_website/features/home/presentation/widget/user_info_widget.dart';
import 'package:my_website/responsive_widgets/drawer_widget.dart';

class RootPage extends StatefulWidget {
  final StatefulNavigationShell statefulNavigationShell;
  const RootPage({
    super.key,
    required this.statefulNavigationShell,
  });

  @override
  State<RootPage> createState() => _RootPageState();
}

class _RootPageState extends State<RootPage> {
  final _selectedIndexNotifier = ValueNotifier<int>(0);
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      endDrawer: DeviceType.isMobile(context)
          ? DrawerWidget(
              onTap: (index) {
                _selectedIndexNotifier.value = index;
                widget.statefulNavigationShell.goBranch(index);
              },
            )
          : null,
      body: SafeArea(
        child: ResponsivePadding(
          child: Column(
            children: [
              Builder(builder: (context) {
                return ValueListenableBuilder<int>(
                    valueListenable: _selectedIndexNotifier,
                    builder: (context, index, child) {
                      return AppMenuBar(
                        tabIndex: index,
                        onTap: (index) {
                          _selectedIndexNotifier.value = index;
                          widget.statefulNavigationShell.goBranch(index);
                        },
                        onDrawerTap: () {
                          Scaffold.of(context).openEndDrawer();
                        },
                      );
                    });
              }),
              const SizedBox(height: 20),
              Expanded(
                child: Row(
                  children: [
                    !DeviceType.isMobile(context)
                        ? const UserInfoWidget()
                        : const SizedBox.shrink(),
                    Expanded(child: widget.statefulNavigationShell),
                  ],
                ),
              ),
              const Padding(
                padding: EdgeInsets.only(bottom: 20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('Made in 💙 with'),
                    SizedBox(
                      width: 5,
                    ),
                    FlutterLogo(),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
