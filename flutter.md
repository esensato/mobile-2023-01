## Flutter - Jogo Par ou Ímpar

- Criar uma classe para representar os jogadores contendo:
    - nome jogador local
    - nome jogador remoto
    - número escolhido pelo jogador local

- Criar uma tela para que o usuário informe seu username e o número desejado
- Exemplo:
```dart
final username = TextEditingController();

Form(
      child: Column(children: [
        const Text("Informe seu username"),
        TextFormField( controller: username),
        const Spacer(),
        ElevatedButton(child: const Text('Submit'), onPressed: () => print(username.text))
      ],
      ),
    );
```
- Ao clicar no botão **Jogar** uma requisição *POST* deve ser realizada no *endpoint*

`https://vinteum.glitch.me/jogo`


- Importar pacote `http` alterando o arquivo `pubspec.yaml` e clicando em `Pub get`

```yaml
dependencies:
  flutter:
    sdk: flutter
  http:
```

- Passar no corpo da requisição `username` e `numero`
- Exemplo:
    ```dart
    import 'package:http/http.dart' as http;

    var url = Uri.https('vinteum.glitch.me', 'jogo');
    var response = await http.post(url,
        headers: <String, String> {'Content-Type' : 'application/json', 'Accept' : 'application/json'},
        body: '{"username": "${username.text}", "usernamelocal": "${numero.text}"}');

    ```

- Direcionar a aplicação para uma segunda tela onde a lista de usuários que já postaram seus números deve ser exibida

- Criar as rotas dentro de `main.dart`
```dart
     routes: {'/jogo': (context) => Jogo(),
               '/adversario': (context) => Adversario()},
```

- Direcionar

```dart
var jogador = Jogador();
jogador.jogador_local = username.text;
jogador.jogador_local_numero = numero.text;
Navigator.of(context).pushNamed('/adversario', arguments: jogador);
```

- Requisitar a lista de todos os adversários por meio de um *GET*

```dart
  final List<String> _itens = List<String>.empty(growable: true);

  @override
  void initState() {
    super.initState();

    var url = Uri.https('vinteum.glitch.me', 'usuarios');
    http.get(url,
        headers: <String, String> {'Content-Type' : 'application/json', 'Accept' : 'application/json'}).then((value) {
          setState(() {
            jsonDecode(value.body)['usuarios'].forEach((item) {
              _itens.add(item);
            });
          });
    });

  }
```

- Exibir a lista de usuários em um **ListView**
    ```dart
    ListView.builder(
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            padding: const EdgeInsets.all(8),
            itemCount: _itens.length,
            itemBuilder: (context, index) {
            return ListTile(
                title: Text(_itens[index]),
                onTap: () {
                    jogador.jogador_remoto = _itens[index];
                    Navigator.of(context).pushNamed('/jogo', arguments: jogador);
                }
            );
    }
        );
    ```
- Para obter os parâmetros passdos de uma tela para outra

    ```dart
    jogador = ModalRoute.of(context)?.settings.arguments as Jogador;
    ```
- Finalmente, obter os pontos que o usuário selecionado na lista enviou utilizando o *endpoint* onde **username** deve ser o nome do adversário escolhido na lista

`https://vinteum.glitch.me/jogo/:username`

- O endpoint irá retornar um *JSON* contendo os pontos do adversário

`{ pontos: 5 }`

- Implementar a lógica de negócio para determinar o vencedor do par ou ímpar...