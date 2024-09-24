// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:markdown_widget/markdown_widget.dart';

import 'package:my_website/app/widgets/responsive_padding.dart';

class BlogScreen extends StatefulWidget {
  final String? content;
  const BlogScreen({
    Key? key,
    this.content,
  }) : super(key: key);

  @override
  State<BlogScreen> createState() => _BlogScreenState();
}

class _BlogScreenState extends State<BlogScreen> {
  String? blogData;

  @override
  void initState() {
    _loadBlogAsset();
    super.initState();
  }

  /// Loads the markdown data from a file in the assets, and updates [blogData]
  /// with the result.
  void _loadBlogAsset() {
    rootBundle.loadString('assets/blogs/test.md').then((value) {
      setState(() {
        blogData = value;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final config =
        isDark ? MarkdownConfig.darkConfig : MarkdownConfig.defaultConfig;
    return widget.content != null
        ? ResponsivePadding(
            child: MarkdownWidget(
            data: blogData ?? '',
            config: config,
          ))
        : Text('No content');
  }
}
