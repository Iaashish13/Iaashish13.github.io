import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';

import 'package:my_website/core/route/route.dart';
import 'package:my_website/core/theme/cubit/theme_cubit_cubit.dart';
import 'package:my_website/core/theme/dark_theme.dart';
import 'package:my_website/core/theme/light_theme.dart';
import 'package:my_website/injector.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  // log('${Firebase.apps.length}', name: 'main.dart');
  // FlutterError.onError = (FlutterErrorDetails details) {
  //   FlutterError.dumpErrorToConsole(details);
  // };
  setUrlStrategy(PathUrlStrategy());
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
