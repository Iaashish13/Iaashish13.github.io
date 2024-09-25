import 'package:flutter/material.dart';
import 'package:my_website/app/widgets/widget.dart';
import 'package:my_website/model/model.dart';

class BlogListWidget extends StatelessWidget {
  final List<BlogModel> bloglist;
  final void Function(int? id)? onTap;
  const BlogListWidget({
    super.key,
    required this.bloglist,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListView.separated(
      padding: const EdgeInsets.all(10),
      separatorBuilder: (context, index) => const Padding(
        padding: EdgeInsets.only(bottom: 20),
        child: Divider(),
      ),
      itemCount: bloglist.length,
      itemBuilder: (context, index) {
        final recentBlogs = bloglist;
        return GestureDetector(
          onTap: () {
            onTap!(recentBlogs[index].id);
          },
          // onTap: () {
          //   context.go(
          //     '/home/blogs/${recentBlogs?[index].id}',

          //   );
          // },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              HoverTextWithUnderlineWidget(
                  toIncreasFontSizeAndWeight: true,
                  hoverText: recentBlogs[index].title ?? ''),
              const SizedBox(
                height: 4,
              ),
              if (recentBlogs[index].shortDescription != null)
                Text(
                  recentBlogs[index].shortDescription ?? '',
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: theme.textTheme.bodySmall,
                ),
              if (recentBlogs[index].updatedAt != null)
                Text(
                  recentBlogs[index]
                          .updatedAt
                          ?.toIso8601String()
                          .split('T')[0] ??
                      '',
                  style: theme.textTheme.labelSmall,
                ),
              const SizedBox(
                height: 5,
              ),
            ],
          ),
        );
      },
    );
  }
}
