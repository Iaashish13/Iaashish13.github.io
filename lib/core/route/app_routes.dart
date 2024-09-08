import 'package:go_router/go_router.dart';
import 'package:my_website/core/route/route_paths.dart';
import 'package:my_website/screens/home_page.dart';

// GoRouter configuration
final router = GoRouter(
  routes: [
    GoRoute(
        path: homeRoute,
        name: homeRoute,
        builder: (context, state) => const Homepage()),
  ],
);
