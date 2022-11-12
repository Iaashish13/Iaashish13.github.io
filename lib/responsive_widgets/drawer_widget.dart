import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_website/constants/constants.dart';
import 'package:my_website/features/theme/cubit/theme_cubit_cubit.dart';

class DrawerWidget extends StatelessWidget {
  const DrawerWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Theme.of(context).backgroundColor,
      child: ListView(
          children: listofDrawer
              .map(
                (e) => Padding(
                  padding: const EdgeInsets.only(top: 20),
                  child: ListTile(
                    dense: true,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 10),
                    minLeadingWidth: 20,
                    leading: Icon(
                      e.icon,
                      color: Theme.of(context).iconTheme.color,
                    ),
                    title: Text(
                      e.title,
                      style: Theme.of(context).textTheme.bodyText1,
                    ),
                    onTap: () {},
                  ),
                ),
              )
              .toList()
            ..add(Padding(
              padding: const EdgeInsets.only(top: 20),
              child: BlocBuilder<ChangeThemeCubit, bool>(
                builder: (context, state) {
                  return ListTile(
                    dense: true,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 10),
                    minLeadingWidth: 20,
                    leading: Icon(
                      Icons.dark_mode,
                      color: Theme.of(context).iconTheme.color,
                    ),
                    title: Text(
                      'Change Theme',
                      style: Theme.of(context).textTheme.bodyText1,
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
