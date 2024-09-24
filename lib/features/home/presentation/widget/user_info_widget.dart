import 'package:flutter/material.dart';

import 'package:my_website/constants/assets.gen.dart';
import 'package:my_website/features/home/presentation/widget/widget.dart';

class UserInfoWidget extends StatefulWidget {
  const UserInfoWidget({super.key});

  @override
  State<UserInfoWidget> createState() => _UserInfoWidgetState();
}

class _UserInfoWidgetState extends State<UserInfoWidget> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const CircleAvatar(
          radius: 60,
          child: FlutterLogo(
            size: 80,
          ),
        ),
        const SizedBox(
          height: 20,
        ),
        Text(
          'Aashish Regmi',
          style: theme.textTheme.displaySmall,
        ),
        const SizedBox(
          height: 5,
        ),
        Text(
          'Flutter Developer',
          style: theme.textTheme.bodySmall,
        ),
        const SizedBox(
          height: 10,
        ),
        UserSocialWidget(
          assetName: Assets.svgs.githubIcon,
          socialName: 'Github',
          toChangeSvgColor: true,
        ),
        const SizedBox(
          height: 10,
        ),
        UserSocialWidget(
          assetName: Assets.svgs.linkdeinIcon,
          socialName: 'Linkdein',
        ),
        const SizedBox(
          height: 10,
        ),
        UserSocialWidget(
          assetName: Assets.svgs.twitterIcon,
          socialName: 'Twitter',
        ),
        const SizedBox(
          height: 30,
        ),
        // const Row(
        //   mainAxisAlignment: MainAxisAlignment.center,
        //   children: [
        //     Text('Made in 💙 with'),
        //     SizedBox(
        //       width: 5,
        //     ),
        //     FlutterLogo(),
        //   ],
        // )
      ],
    );
  }
}
