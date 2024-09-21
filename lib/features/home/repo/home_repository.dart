// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:cloud_firestore/cloud_firestore.dart';

import 'package:my_website/model/model.dart';

abstract class HomeRepository {
  Future<List<BlogModel>> fetchRecentBlogs();
}

class HomeRepositoryImpl implements HomeRepository {
  final FirebaseFirestore firebaseFirestore;
  HomeRepositoryImpl({
    required this.firebaseFirestore,
  });
  @override
  Future<List<BlogModel>> fetchRecentBlogs() async {
    final querySnapshot = await firebaseFirestore
        .collection('blogs')
        .orderBy('createdAt')
        .limit(6)
        .get();
    return querySnapshot.docs
        .map((doc) => BlogModel.fromJson(doc.data()))
        .toList();
  }
}
