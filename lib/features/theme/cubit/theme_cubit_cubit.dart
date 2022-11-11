import 'package:flutter_bloc/flutter_bloc.dart';

class ChangeThemeCubit extends Cubit<bool> {
  ChangeThemeCubit() : super(false);

  Future<void> switchTheme({required bool isDark}) async {
    emit(isDark);
  }
}
