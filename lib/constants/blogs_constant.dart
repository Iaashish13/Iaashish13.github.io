import 'package:my_website/constants/assets.gen.dart';
import 'package:my_website/model/blog_model.dart';

final bloglist = [
  BlogModel(
      id: 1,
      title: 'Flutter',
      path: Assets.blogs.test,
      shortDescription: 'Starting to write blogs',
      createdAt: DateTime(2021, 2, 4)),
  BlogModel(
      id: 2,
      title: 'Run Background tasks in Flutter',
      path: Assets.blogs.workManagerFlutter,
      shortDescription: 'How to run background tasks in Flutter',
      createdAt: DateTime(2021, 2, 20)),
];
