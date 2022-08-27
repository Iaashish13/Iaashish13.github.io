import 'package:auto_route/auto_route.dart';
import 'package:my_website/screens/home_page.dart';
import 'package:my_website/screens/landing_page.dart';
import 'package:my_website/screens/second_page.dart';

@MaterialAutoRouter(
  replaceInRouteName: 'Pages,Routes',
  routes: <AutoRoute>[
    AutoRoute(page: Homepage, initial: true),
    AutoRoute(
      page: LandingPage,
    ),
    AutoRoute(
      page: SecondPage,
    ),
  ],
)
// extend the generated private router
class $AppRouter {}
