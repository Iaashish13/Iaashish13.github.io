// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

import 'package:my_website/app/widgets/app_bar.dart';
import 'package:my_website/app/widgets/responsive_padding.dart';
import 'package:my_website/core/responsive/device_type.dart';
import 'package:my_website/features/home/presentation/widget/user_info_widget.dart';
import 'package:my_website/responsive_widgets/drawer_widget.dart';
import 'package:my_website/services/responsive/responsive_device.dart';

class RootPage extends StatelessWidget {
  final StatefulNavigationShell statefulNavigationShell;
  const RootPage({
    Key? key,
    required this.statefulNavigationShell,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      endDrawer: DeviceType.isMobile(context)
          ? DrawerWidget(
              onTap: (index) => statefulNavigationShell.goBranch(index),
            )
          : null,
      body: SafeArea(
        child: ResponsivePadding(
          child: Column(
            children: [
              Builder(builder: (context) {
                return AppMenuBar(
                  onTap: (index) {
                    statefulNavigationShell.goBranch(index);
                  },
                  onDrawerTap: () {
                    Scaffold.of(context).openEndDrawer();
                  },
                );
              }),
              const SizedBox(height: 20),
              Expanded(
                child: Row(
                  children: [
                    !DeviceType.isMobile(context)
                        ? const UserInfoWidget()
                        : const SizedBox.shrink(),
                    Expanded(child: statefulNavigationShell),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
