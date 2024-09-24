// import 'package:dartz/dartz.dart';
// import 'package:my_website/features/home/repo/home_repository.dart';
// import 'package:my_website/model/model.dart';

// abstract class HomeService {
//   Future<Either<FailureModel, List<BlogModel>>> fetchRecentBlogs();
// }

// class HomeServiceImpl implements HomeService {
//   final HomeRepository homeRepository;
//   const HomeServiceImpl({required this.homeRepository});

//   @override
//   Future<Either<FailureModel, List<BlogModel>>> fetchRecentBlogs() async {
//     try {
//       final response = await homeRepository.fetchRecentBlogs();
//       return Right(response);
//     } catch (e) {
//       return Left(FailureModel(message: e.toString()));
//     }
//   }
// }
