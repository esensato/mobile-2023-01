import 'dart:convert';

import 'package:aula/jogador.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Adversario extends StatefulWidget {
  @override
  State<Adversario> createState() => AdversarioState();

}

class AdversarioState extends State<Adversario> {

  final List<String> _usuarios = List<String>.empty(growable: true);
  var jogador = Jogador();

  @override
  initState() {
    super.initState();
    var url = Uri.https('vinteum.glitch.me', 'usuarios');
    final Map<String, String> header = {'Content-Type' : 'application/json',
                                        'Accept' : 'application/json'};

    http.get(url, headers: header).then((resp) {
      // converter o body de String para JSON
      jsonDecode(resp.body)["usuarios"].forEach((item) {
        setState(() {
          _usuarios.add(item);
        });
      });
    });

  }

  ListTile montarLinha(jogador) {
    return ListTile(leading: const Icon(Icons.play_arrow),
            title: Text(jogador),
            onTap: (){
              var url = Uri.https('vinteum.glitch.me', 'jogo/$jogador');
              final Map<String, String> header = {'Content-Type' : 'application/json',
                'Accept' : 'application/json'};
              http.get(url).then((resp) {
                final pontos_remoto = int.parse(jsonDecode(resp.body)["pontos"]);
                final pontos_local = int.parse(this.jogador.pontos);
                final total = pontos_remoto + pontos_local;
                // avalia o resultado
                final resultado = (total % 2) == 0 ? "PAR" : "IMPAR";
                print(resultado);
                Navigator.of(context).pushNamed('/resultado', arguments: resultado);

              });

            },);
  }
  ListView montarLista() {
    return ListView.builder(
        padding: const EdgeInsets.all(8),
        itemCount: _usuarios.length,
        itemBuilder: (context, index) {
      return montarLinha(_usuarios[index]);
    });
  }

  @override
  Widget build(BuildContext context) {

    // le os parametros passados pela tela anterior Aposta
    // efetua um cast para o objeto do tipo Jogador (as Jogador)
    jogador = ModalRoute.of(context)?.settings.arguments as Jogador;

    return Scaffold(
      appBar: AppBar(title: const Text("Adversário")),
      body: montarLista(),
    );
  }

}