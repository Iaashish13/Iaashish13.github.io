import 'dart:developer';

import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_website/core/route/route.dart';
import 'package:my_website/core/theme/cubit/theme_cubit_cubit.dart';
import 'package:my_website/core/theme/dark_theme.dart';
import 'package:my_website/core/theme/light_theme.dart';
import 'package:my_website/firebase_options.dart';
import 'package:my_website/injector.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  log('${Firebase.apps.length}', name: 'main.dart');
  FlutterError.onError = (FlutterErrorDetails details) {
    FlutterError.dumpErrorToConsole(details);
  };
  await setupLocator();

  runApp(
    const MyApp(),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<ChangeThemeCubit>(
            create: (context) => ChangeThemeCubit()..getTheme())
      ],
      child: BlocBuilder<ChangeThemeCubit, bool>(
        builder: (context, state) {
          return MaterialApp.router(
            routerConfig: router,
            debugShowCheckedModeBanner: false,
            title: 'My website',
            theme: state ? darkTheme : lightTheme,
          );
        },
      ),
    );
  }
}
