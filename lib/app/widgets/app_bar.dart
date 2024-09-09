import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_website/core/responsive/device_type.dart';
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
  const AppMenuBar({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          margin: const EdgeInsets.symmetric(vertical: 10),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Flexible(
                child: InkWell(
                  hoverColor: Colors.transparent,
                  highlightColor: Colors.transparent,
                  splashColor: Colors.transparent,
                  onTap: () {},
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
                    onPressed: () {},
                  ),
                )
              ] else
                Flexible(
                  child: Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      TextButton(
                        onPressed: () {},
                        child: Text(
                          "Home",
                          style: theme.textTheme.bodyLarge,
                        ),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: Text(
                          "Posts",
                          style: theme.textTheme.bodyLarge,
                        ),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: Text(
                          "Categories",
                          style: theme.textTheme.bodyLarge,
                        ),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: Text("About", style: theme.textTheme.bodyLarge),
                      ),
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
