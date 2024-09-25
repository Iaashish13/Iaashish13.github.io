// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:my_website/constants/constants.dart';

import 'package:my_website/core/responsive/device_type.dart';
import 'package:my_website/core/route/route.dart';
import 'package:my_website/core/theme/cubit/theme_cubit_cubit.dart';

// ignore: slash_for_doc_comments
/**
 * Menu/Navigation Bar
 *
 * A top menu bar with a text or image logo and
 * navigation links. Navigation links collapse into
 * a hamburger menu on screens smaller than 400px.
 */
class AppMenuBar extends StatelessWidget {
  final int tabIndex;
  final void Function(int index)? onTap;
  final void Function()? onDrawerTap;

  const AppMenuBar({
    super.key,
    required this.tabIndex,
    this.onTap,
    this.onDrawerTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          margin: const EdgeInsets.symmetric(vertical: 15),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Flexible(
                child: InkWell(
                  hoverColor: Colors.transparent,
                  highlightColor: Colors.transparent,
                  splashColor: Colors.transparent,
                  onTap: () {
                    context.go(homeRoute);
                  },
                  child: Text("Aashish's Blogs",
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.displayMedium),
                ),
              ),
              if (DeviceType.isMobile(context)) ...[
                Transform.translate(
                  offset: const Offset(16, 0),
                  child: IconButton(
                    icon: const Icon(
                      Icons.menu,
                      size: 28,
                    ),
                    onPressed: onDrawerTap,
                  ),
                )
              ] else
                Flexible(
                  child: Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      ...titles.mapIndexed((index, e) => TextButton(
                            onPressed: () {
                              onTap!(index);
                            },
                            child: Padding(
                              padding: const EdgeInsets.only(top: 8),
                              child: Text(
                                e,
                                style: theme.textTheme.bodyLarge?.copyWith(
                                  height: 1.5,
                                  decoration: tabIndex == index
                                      ? TextDecoration.underline
                                      : TextDecoration.none,
                                  decorationThickness: 1,
                                  color: Colors.transparent,
                                  shadows: [
                                    Shadow(
                                        color:
                                            theme.brightness == Brightness.light
                                                ? Colors.black
                                                : Colors.white,
                                        offset: const Offset(0, -5))
                                  ],
                                ),
                              ),
                            ),
                          )),
                      BlocBuilder<ChangeThemeCubit, bool>(
                        builder: (context, state) {
                          return IconButton(
                            icon: state == false
                                ? Icon(
                                    Icons.dark_mode,
                                    color: Theme.of(context).iconTheme.color,
                                  )
                                : const Icon(Icons.light_mode),
                            onPressed: () {
                              BlocProvider.of<ChangeThemeCubit>(context)
                                  .switchTheme(isDark: !state);
                            },
                          );
                        },
                      ),
                    ],
                  ),
                ),
            ],
          ),
        ),
        !DeviceType.isMobile(context)
            ? const Divider()
            : const SizedBox.shrink()
      ],
    );
  }
}
