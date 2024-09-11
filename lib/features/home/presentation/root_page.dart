// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

import 'package:my_website/app/widgets/app_bar.dart';
import 'package:my_website/app/widgets/responsive_padding.dart';
import 'package:my_website/features/home/presentation/widget/user_info_widget.dart';

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
      // drawer: ResponsiveDevice.isMobile(context) ? const DrawerWidget() : null,
      body: SafeArea(
        child: ResponsivePadding(
          child: Column(
            children: [
              AppMenuBar(
                onTap: (index) {
                  statefulNavigationShell.goBranch(index);
                },
              ),
              // Wrap(
              //     children: _tabList
              //         .mapIndexed((index, e) => GestureDetector(
              //             onTap: () {
              //               widget.statefulNavigationShell.goBranch(index);
              //             },
              //             child: Text(e)))
              //         .toList()),
              // TabBar(
              //     isScrollable: false,

              //     onTap: (value) =>
              //         widget.statefulNavigationShell.goBranch(value),
              //     controller: _tabController,
              //     tabs: _tabList.map((e) => Text(e)).toList()),
              // const AppMenuBar(),
              const SizedBox(height: 20),
              Expanded(
                child: Row(
                  children: [
                    const UserInfoWidget(),
                    Expanded(child: statefulNavigationShell),
                  ],
                ),
              ),
            ],
          ),
          // child: Column(
          //   children: [
          //     const AppMenuBar(),
          //     const SizedBox(height: 20),
          //     // Row(
          //     //   children: [
          //     //     const UserInfoWidget(),
          //     //     Expanded(
          //     //       child: Container(
          //     //         color: Colors.red,
          //     //         child: statefulNavigationShell,
          //     //       ),
          //     //     ),
          //     //   ],
          //     // ),
          //   ],
          // ),
        ),
      ),
    );
  }
}
