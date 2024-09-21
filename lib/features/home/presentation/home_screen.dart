import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_website/features/home/presentation/cubit/fetch_recent_blogs_cubit.dart';
import 'package:my_website/injector.dart';

class HomeScreenProvider extends StatelessWidget {
  const HomeScreenProvider({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => getIt<FetchRecentBlogsCubit>(),
      child: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    context.read<FetchRecentBlogsCubit>().fetchRecentBlogs();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<FetchRecentBlogsCubit, FetchRecentBlogsState>(
      builder: (context, state) {
        return state.maybeWhen(
          orElse: () => const SizedBox.shrink(),
          loading: () => const Center(child: CircularProgressIndicator()),
          failed: (error) => Center(child: Text(error?.message ?? '')),
          loaded: (recentBlogs) => ListView.builder(
              itemCount: recentBlogs.length,
              itemBuilder: (context, index) {
                return Text(recentBlogs[index].title ?? '');
              }),
        );
      },
    );
  }
}
