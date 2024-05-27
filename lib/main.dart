import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_website/features/theme/cubit/theme_cubit_cubit.dart';
import 'package:my_website/features/theme/dark_theme.dart';
import 'package:my_website/features/theme/light_theme.dart';
import 'package:my_website/injector.dart';
import 'package:my_website/screens/home_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await setupLocator();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<ChangeThemeCubit>(
            create: (context) => ChangeThemeCubit()..getTheme())
      ],
      child: BlocBuilder<ChangeThemeCubit, bool>(
        builder: (context, state) {
          return MaterialApp(
            home: const Homepage(),
            debugShowCheckedModeBanner: false,
            title: 'My website',
            theme: state ? darkTheme : lightTheme,
          );
        },
      ),
    );
  }
}
