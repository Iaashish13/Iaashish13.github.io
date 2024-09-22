import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:my_website/core/route/route_paths.dart';
import 'package:my_website/features/about/presentation/about_screen.dart';
import 'package:my_website/features/categories/categories_screen.dart';
import 'package:my_website/features/home/presentation/home_screen.dart';
import 'package:my_website/features/home/presentation/root_page.dart';
import 'package:my_website/features/posts/post_screen.dart';
import 'package:my_website/screens/blog_screen.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'root');
final GlobalKey<NavigatorState> _sectionANavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'sectionANav');

MultipleScreenRoute get _blogScreenRoute => MultipleScreenRoute(
    path: blogRoute,
    name: blogRoute,
    builder: (context, state) {
      final data = state.extra as Map<String, dynamic>;
      final content = data['content'] as String?;
      return BlogScreen(
        content: content,
      );
    });

// GoRouter configuration
final router = GoRouter(
  debugLogDiagnostics: true,
  navigatorKey: _rootNavigatorKey,
  initialLocation: homeRoute,
  routes: [
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) => RootPage(
        statefulNavigationShell: navigationShell,
      ),
      branches: [
        StatefulShellBranch(
          navigatorKey: _sectionANavigatorKey,
          routes: [
            GoRoute(
                path: homeRoute,
                name: homeRoute,
                builder: (context, state) => const HomeScreenProvider(),
                routes: [_blogScreenRoute]),
          ],
        ),
        StatefulShellBranch(routes: [
          GoRoute(
            path: postRoute,
            name: postRoute,
            builder: (context, state) => const PostScreen(),
          )
        ]),
        StatefulShellBranch(routes: [
          GoRoute(
            path: categoriesRoute,
            name: categoriesRoute,
            builder: (context, state) => const CategoriesScreen(),
          ),
        ]),
        StatefulShellBranch(routes: [
          GoRoute(
              path: aboutRoute,
              name: aboutRoute,
              builder: (context, state) => const AboutScreen()),
        ]),
      ],
    ),
  ],
);

class MultipleScreenRoute extends GoRoute {
  MultipleScreenRoute({required super.path, super.builder, super.name});
}
