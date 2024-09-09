import 'package:flutter/material.dart';

class UserInfoWidget extends StatelessWidget {
  const UserInfoWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      children: [
        const CircleAvatar(
          backgroundColor: Colors.red,
          radius: 60,
        ),
        const SizedBox(
          height: 10,
        ),
        Text(
          'Aashish Regmi',
          style: theme.textTheme.bodyLarge,
        ),
        const SizedBox(
          height: 5,
        ),
        Text(
          'Flutter Developer',
          style: theme.textTheme.bodyMedium,
        )
      ],
    );
  }
}
