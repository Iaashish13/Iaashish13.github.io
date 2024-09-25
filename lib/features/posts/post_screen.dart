import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:my_website/app/widgets/widget.dart';
import 'package:my_website/constants/blogs_constant.dart';

class PostScreen extends StatelessWidget {
  const PostScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ResponsivePadding(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'All Posts',
            style: theme.textTheme.displayMedium,
          ),
          const SizedBox(
            height: 30,
          ),
          Expanded(
            child: BlogListWidget(
              bloglist: bloglist,
              onTap: (id) {
                if (id != null) {
                  context.go(
                    '/posts/blogs/$id',
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}
