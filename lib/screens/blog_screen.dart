// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:my_website/app/widgets/responsive_padding.dart';

class BlogScreen extends StatelessWidget {
  final String? content;
  const BlogScreen({
    Key? key,
    this.content,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return content != null
        ? ResponsivePadding(
            child: Column(
              children: [
                Text('Title'),
                Expanded(child: Markdown(data: content!)),
              ],
            ),
          )
        : Text('No content');
  }
}
