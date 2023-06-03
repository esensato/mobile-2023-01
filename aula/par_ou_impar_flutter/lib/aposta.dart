import 'package:aula/jogador.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Aposta extends StatefulWidget {
  @override
  State<Aposta> createState() => _ApostaState();
}

// _ indica private
class _ApostaState extends State<Aposta> {

  final username = TextEditingController();
  final numero = TextEditingController();

  void enviarDados() {

    final url = Uri.https('vinteum.glitch.me', 'jogo');
    final Map<String, String> header = {'Content-Type' : 'application/json',
                                        'Accept' : 'application/json'};
    final body = '{"username":"${username.text}", "numero":"${numero.text}"}';
    // requisição http é assíncrona
    http.post(url, headers: header, body: body).then((resp) {
      final jogador = Jogador();
      jogador.jogador_local = username.text;
      jogador.pontos = numero.text;
      // abre a tela Adversario
      Navigator.of(context).pushNamed('/adversario', arguments: jogador);

    });

  }

  Form criarFormulario() {
    return Form(child: Column(children: [
      const Text("Insira o seu username"),
      TextFormField(controller: username,),
      const Text("Informe seu número"),
      TextFormField(controller: numero,),
      const Spacer(),
      ElevatedButton(onPressed: () => enviarDados()
      , child: const Text("Escolher Adversário"))
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