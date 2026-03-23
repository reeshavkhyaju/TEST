import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: FormPage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class FormPage extends StatefulWidget {
  @override
  _FormPageState createState() => _FormPageState();
}

class _FormPageState extends State<FormPage> {
  final nameController = TextEditingController();
  final phoneController = TextEditingController();
  final emailController = TextEditingController();

  Future<void> submitData() async {
    final url = Uri.parse("http://10.0.2.2:5000/api/user"); 
    // IMPORTANT for Android emulator

    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "name": nameController.text,
        "phone": phoneController.text,
        "email": emailController.text,
      }),
    );

    print(response.body);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text("Submitted successfully ✅")),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Good Morning 🌞")),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(controller: nameController, decoration: InputDecoration(labelText: "Name")),
            TextField(controller: phoneController, decoration: InputDecoration(labelText: "Phone")),
            TextField(controller: emailController, decoration: InputDecoration(labelText: "Email")),

            SizedBox(height: 20),

            ElevatedButton(
              onPressed: submitData,
              child: Text("Submit"),
            ),
          ],
        ),
      ),
    );
  }
}