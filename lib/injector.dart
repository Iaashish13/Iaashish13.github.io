import 'package:get_it/get_it.dart';
import 'package:my_website/core/theme/cubit/theme_cubit_cubit.dart';
import 'package:my_website/features/home/presentation/cubit/fetch_recent_blogs_cubit.dart';
import 'package:my_website/features/home/repo/home_repository.dart';
import 'package:my_website/features/home/service/home_service.dart';
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
