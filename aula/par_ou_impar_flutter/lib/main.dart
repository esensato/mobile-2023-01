import 'package:aula/adversario.dart';
import 'package:aula/aposta.dart';
import 'package:aula/resultado.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {"/adversario": (context) => Adversario(),
               "/resultado": (context) => Resultado()},
      title: 'Par ou Ímpar',
      home: Aposta()
    );
  }
}
