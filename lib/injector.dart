import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

final getIt = GetIt.instance;

Future<void> setupLocator() async {
  final sp = await SharedPreferences.getInstance();
  // final firebaseInstance = FirebaseFirestore.instance;
  getIt.registerLazySingleton<SharedPreferences>(() => sp);
  // getIt.registerLazySingleton<FirebaseFirestore>(() => firebaseInstance);
  // getIt.registerLazySingleton<HomeRepository>(
  //   () => HomeRepositoryImpl(firebaseFirestore: getIt<FirebaseFirestore>()),
  // );
  // getIt.registerLazySingleton<HomeService>(
  //   () => HomeServiceImpl(homeRepository: getIt<HomeRepository>()),
  // );
  // getIt.registerFactory<FetchRecentBlogsCubit>(
  //     () => FetchRecentBlogsCubit(getIt<HomeService>()));

}
