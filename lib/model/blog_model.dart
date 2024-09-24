import 'package:freezed_annotation/freezed_annotation.dart';
part 'blog_model.freezed.dart';
part 'blog_model.g.dart';

@freezed
class BlogModel with _$BlogModel {
  const factory BlogModel({
    required int id,
    String? title,
    String? content,
    int? categoryId,
    int? subcategoryId,
    String? shortDescription,
    DateTime? createdAt,
  DateTime? updatedAt,
  }) = _BlogModel;
  factory BlogModel.fromJson(Map<String, dynamic> json) =>
      _$BlogModelFromJson(json);
}

