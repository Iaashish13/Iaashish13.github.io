// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

import 'package:my_website/constants/constants.dart';
import 'package:my_website/core/theme/cubit/theme_cubit_cubit.dart';

class DrawerWidget extends StatelessWidget {
  final int selectedIndex;
  final void Function(int index)? onTap;

  const DrawerWidget({
    Key? key,
    required this.selectedIndex,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
          children: listofDrawer
              .mapIndexed(
                (index, e) => Padding(
                  padding: const EdgeInsets.only(top: 20, left: 20, right: 20),
                  child: ListTile(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    selected: index == selectedIndex,
                    selectedTileColor:
                        Theme.of(context).brightness == Brightness.dark
                            ? Colors.white12
                            : Colors.black12,
                    dense: true,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 10),
                    minLeadingWidth: 20,
                    // leading: Icon(
                    //   e.icon,
                    //   color: Theme.of(context).iconTheme.color,
                    // ),
                    title: Text(
                      e.title,
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                    onTap: () {
                      context.pop();
                      onTap!(index);
                    },
                  ),
                ),
              )
              .toList()
            ..add(Padding(
              padding: const EdgeInsets.only(top: 20, left: 20),
              child: BlocBuilder<ChangeThemeCubit, bool>(
                builder: (context, state) {
                  return ListTile(
                    dense: true,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 10),
                    minLeadingWidth: 20,
                    trailing: Icon(
                      Icons.dark_mode,
                      color: Theme.of(context).iconTheme.color,
                    ),
                    title: Text(
                      'Change Theme',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    onTap: () {
                      BlocProvider.of<ChangeThemeCubit>(context)
                          .switchTheme(isDark: !state);
                    },
                  );
                },
              ),
            ))),
    );
  }
}
