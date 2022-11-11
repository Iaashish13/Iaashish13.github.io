import 'package:flutter/material.dart';

class DrawerWidget extends StatelessWidget {
  const DrawerWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Material(
        child: ListView(children: [
          ListTile(
            leading: const Icon(
              Icons.home,
              color: Colors.amber,
            ),
            onTap: () {
              Navigator.pop(context);
            },
          ),
        ]),
      ),
    );
  }
}
