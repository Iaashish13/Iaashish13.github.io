// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

import 'package:my_website/model/blog_model.dart';
import 'package:my_website/model/failure_model.dart';

part 'fetch_recent_blogs_cubit.freezed.dart';
part 'fetch_recent_blogs_state.dart';

class FetchRecentBlogsCubit extends Cubit<FetchRecentBlogsState> {

  FetchRecentBlogsCubit(
  
  ) : super(const FetchRecentBlogsState.initial());

  Future<void> fetchRecentBlogs() async {
    emit(const FetchRecentBlogsState.loading());
    // final response = await homeService.fetchRecentBlogs();
    // response.fold(
    //   (l) => emit(FetchRecentBlogsState.failed(failure: l)),
    //   (r) => emit(
    //     FetchRecentBlogsState.loaded(blogs: r.isNotEmpty ? r : []),
    //   ),
    // );
  }
}
