import 'package:go_router/go_router.dart';
import 'package:my_website/core/route/route_paths.dart';
import 'package:my_website/features/home/presentation/home_page.dart';

// GoRouter configuration
final router = GoRouter(
  debugLogDiagnostics: true,
  routes: [
    GoRoute(
      path: homeRoute,
      name: homeRoute,
      builder: (context, state) => const Homepage(),
    ),
  ],
);
