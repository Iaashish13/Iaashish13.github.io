// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'package:my_website/app/widgets/app_bar.dart';
import 'package:my_website/app/widgets/responsive_padding.dart';
import 'package:my_website/core/responsive/device_type.dart';
import 'package:my_website/core/route/route.dart';
import 'package:my_website/features/about/presentation/about_screen.dart';
import 'package:my_website/features/categories/categories_screen.dart';
import 'package:my_website/features/home/presentation/home_screen.dart';
import 'package:my_website/features/home/presentation/widget/user_info_widget.dart';
import 'package:my_website/features/posts/post_screen.dart';
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
  void initState() {
    final path = router.routeInformationProvider.value.uri.path;
    _selectedIndexNotifier.value = _getTabIndexFromUrl(path) ?? 0;
    router.routeInformationProvider.addListener(() {
      final currentIndex =
          _getTabIndexFromUrl(router.routeInformationProvider.value.uri.path);
      print("Current Index : $currentIndex");
      if (currentIndex != null &&
          _selectedIndexNotifier.value != currentIndex) {
        _selectedIndexNotifier.value = currentIndex;
      }
    });
    super.initState();
  }

  int? _getTabIndexFromUrl(String location) {
    if (location.contains(homeRoute)) return 0;
    if (location.contains(postRoute)) return 1;
    if (location.contains(categoriesRoute)) return 2;
    if (location.contains(aboutRoute)) return 3;
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.sizeOf(context);
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
            ],
          ),
        ),
      ),
    );
  }
}
