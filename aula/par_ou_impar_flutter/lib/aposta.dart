import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Aposta extends StatefulWidget {
  @override
  State<Aposta> createState() => _ApostaState();
}

// _ indica private
class _ApostaState extends State<Aposta> {

  Form criarFormulario() {
    return Form(child: Column(children: [
      const Text("Insira o seu username"),
      TextFormField(),
      const Text("Informe seu número"),
      TextFormField(),
      const Spacer(),
      ElevatedButton(onPressed: null, child: Text("Escolher Adversário"))
    ],
    )
    );
  }

  @override
  Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(title: const Text("Aposta"),),
        body: Container(child: criarFormulario(),),
      );
  }

}