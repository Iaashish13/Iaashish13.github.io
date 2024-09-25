// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

import 'package:my_website/app/widgets/widget.dart';

class UserSocialWidget extends StatelessWidget {
  final String? assetName;
  final String socialName;
  final void Function()? onTap;
  final bool? toChangeSvgColor;
  const UserSocialWidget({
    super.key,
    this.assetName,
    required this.socialName,
    this.onTap,
    this.toChangeSvgColor,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      children: [
        assetName != null
            ? SvgPicture.asset(
                assetName!,
                height: 25,
                width: 25,
                colorFilter: toChangeSvgColor == true
                    ? ColorFilter.mode(
                        theme.brightness == Brightness.dark
                            ? Colors.white
                            : Colors.black,
                        BlendMode.srcIn)
                    : null,
              )
            : const SizedBox.shrink(),
        const SizedBox(
          width: 10,
        ),
        HoverTextWithUnderlineWidget(
          hoverText: socialName,
          onTap: onTap,
        )
      ],
    );
  }
}
