part of 'fetch_recent_blogs_cubit.dart';

@freezed
class FetchRecentBlogsState with _$FetchRecentBlogsState {
  const factory FetchRecentBlogsState.initial() = _Initial;
  const factory FetchRecentBlogsState.loading() = _Loading;
  const factory FetchRecentBlogsState.loaded({required List<BlogModel> blogs}) = _Loaded;
  const factory FetchRecentBlogsState.failed({FailureModel? failure}) =_Failed;

 
}
