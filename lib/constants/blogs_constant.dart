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
      createdAt: DateTime(2022, 2, 20)),
  BlogModel(
      id: 3,
      title: 'Widgets-Stateless Widget',
      path: Assets.blogs.widgetsStatelessWidget,
      shortDescription:
          'Deep dive into Widgets, how they get updated and peformance optimization.',
      createdAt: DateTime(2023, 1, 15)),
  BlogModel(
      id: 4,
      title: 'Why is build method on State on Stateful?',
      path: Assets.blogs.buildMethodState,
      shortDescription:
          'Let understand about why build method is on State rather than Stateful Widget',
      createdAt: DateTime(2024, 11, 1)),
  BlogModel(
      id: 5,
      title: 'Stateful Widget - Deep Dive (Advanced)',
      path: Assets.blogs.statefulWidgetDeepDive,
      shortDescription:
          'Deep dive into StatefulWidgets, their lifecycle and method inside it works',
      createdAt: DateTime(2023, 11, 11)),
];
