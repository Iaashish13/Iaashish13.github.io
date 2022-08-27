// **************************************************************************
// AutoRouteGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouteGenerator
// **************************************************************************
//
// ignore_for_file: type=lint

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:auto_route/auto_route.dart' as _i4;
import 'package:flutter/material.dart' as _i5;

import '../../screens/home_page.dart' as _i1;
import '../../screens/landing_page.dart' as _i2;
import '../../screens/second_page.dart' as _i3;

class AppRouter extends _i4.RootStackRouter {
  AppRouter([_i5.GlobalKey<_i5.NavigatorState>? navigatorKey])
      : super(navigatorKey);

  @override
  final Map<String, _i4.PageFactory> pagesMap = {
    Homepage.name: (routeData) {
      return _i4.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i1.Homepage());
    },
    LandingPage.name: (routeData) {
      return _i4.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i2.LandingPage());
    },
    SecondPage.name: (routeData) {
      return _i4.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i3.SecondPage());
    }
  };

  @override
  List<_i4.RouteConfig> get routes => [
        _i4.RouteConfig(Homepage.name, path: '/'),
        _i4.RouteConfig(LandingPage.name, path: '/landing-page'),
        _i4.RouteConfig(SecondPage.name, path: '/second-page')
      ];
}

/// generated route for
/// [_i1.Homepage]
class Homepage extends _i4.PageRouteInfo<void> {
  const Homepage() : super(Homepage.name, path: '/');

  static const String name = 'Homepage';
}

/// generated route for
/// [_i2.LandingPage]
class LandingPage extends _i4.PageRouteInfo<void> {
  const LandingPage() : super(LandingPage.name, path: '/landing-page');

  static const String name = 'LandingPage';
}

/// generated route for
/// [_i3.SecondPage]
class SecondPage extends _i4.PageRouteInfo<void> {
  const SecondPage() : super(SecondPage.name, path: '/second-page');

  static const String name = 'SecondPage';
}
