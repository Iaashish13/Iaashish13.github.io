import 'package:url_launcher/url_launcher.dart';

Future<void> openUrlInNewTab({required String url}) async {
  if (await canLaunchUrl(Uri.parse(url))) {
    await launchUrl(
      Uri.parse(url),
      mode: LaunchMode.externalApplication, // This opens the URL in a new tab
    );
  } else {
    throw 'Could not launch $url';
  }
}
