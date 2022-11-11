import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_website/constants/constants.dart';
import 'package:my_website/features/theme/cubit/theme_cubit_cubit.dart';

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
                      style: Theme.of(context).textTheme.headline5,
                    )),
              ))
          .toList()
        ..add(InkWell(
            onTap: () {},
            child: BlocBuilder<ChangeThemeCubit, bool>(
              builder: (context, state) {
                return Switch(
                    value: state,
                    onChanged: (value) {
                      BlocProvider.of<ChangeThemeCubit>(context)
                          .switchTheme(isDark: value);
                    });
              },
            ))),
    );
  }
}
