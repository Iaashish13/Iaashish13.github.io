import 'package:flutter/material.dart';
import 'package:my_website/constants/constants.dart';

class TitleWidget extends StatelessWidget {
  const TitleWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: titles
          .map((e) => InkWell(
                child: Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                    margin:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(
                          20,
                        ),
                        color: Colors.transparent),
                    child: Text(
                      e,
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: Colors.black),
                    )),
              ))
          .toList()
        ..add(const InkWell(child: Icon(Icons.dark_mode))),
    );
  }
}
