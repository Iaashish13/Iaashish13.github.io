import 'package:flutter/material.dart';
import 'package:my_website/responsive_widgets/title_widget.dart';

class SecondPage extends StatelessWidget {
  const SecondPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const TitleWidget(),
          Center(
            child: Text(
              'Responsive design',
              style: Theme.of(context).textTheme.bodyMedium
            ),
          ),
        ],
      ),
    );
  }
}
