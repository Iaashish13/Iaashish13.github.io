import 'package:flutter/material.dart';

import 'package:my_website/constants/assets.gen.dart';
import 'package:my_website/features/home/presentation/widget/widget.dart';
import 'package:my_website/utils/utils.dart';

class UserInfoWidget extends StatelessWidget {
  const UserInfoWidget({super.key});

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
          onTap: () async {
            await openUrlInNewTab(url: 'https://github.com/Iaashish13');
          },
        ),
        const SizedBox(
          height: 10,
        ),
        UserSocialWidget(
          assetName: Assets.svgs.linkdeinIcon,
          socialName: 'Linkdein',
          onTap: () async {
            await openUrlInNewTab(
                url: 'https://www.linkedin.com/in/aashish-regmi/');
          },
        ),
        const SizedBox(
          height: 10,
        ),
        UserSocialWidget(
          assetName: Assets.svgs.twitterIcon,
          socialName: 'Twitter',
          onTap: () async {
            await openUrlInNewTab(url: 'https://x.com/whois_aashish_');
          },
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
