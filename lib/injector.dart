import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

final locator = GetIt.instance;

Future<void> setupLocator() async {
  final sp = await SharedPreferences.getInstance();
  locator.registerSingleton<SharedPreferences>(sp);
}
