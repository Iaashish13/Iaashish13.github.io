import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_website/constants/string_constants.dart';
import 'package:my_website/injector.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ChangeThemeCubit extends Cubit<bool> {
  ChangeThemeCubit() : super(false);

  void getTheme() async {
    bool? isTheme =
        locator<SharedPreferences>().getBool(StringConstants.themeConst);
    if (isTheme == true) {
      emit(true);
    } else if (isTheme == false) {
      emit(false);
    } else {
      emit(true);
    }
  }

  Future<void> switchTheme({required bool isDark}) async {
    locator<SharedPreferences>().setBool(StringConstants.themeConst, isDark);

    emit(isDark);
  }
}
