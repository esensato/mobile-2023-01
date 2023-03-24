## React Native - Aula 01

- [React Native](https://reactnative.dev/)
- [VS Code](https://code.visualstudio.com/download)
- [Android Studio / SDK](https://developer.android.com/studio)

- Componentes visuais do React Native são compilados nativamente para as respectivas plataformas (iOS, Android, etc...)
- Lógica de negócio permanece em *JavaScript*

### Configuração do Ambiente

- [Instalação CLI - Expo](https://reactnative.dev/docs/environment-setup):
  - `npm install --location=global --loglevel=error expo-cli`
  - Caso não dê certo, tentar com `npm install -g expo-cli`
  - Obs **Mac**:
    - `sudo npm install --location=global --loglevel=error expo-cli`
### Criação do Projeto
- Criar o projeto utilizando o CLI [Expo](https://expo.dev/)
- `expo init ControleGastos`
- Escolher blank como modelo
    ```
    cd ControleGastos
    npm run android
    ```
- Pasta `assets` pode ser utilizada para armazenar imagens utilizadas pelo app
- Arquivo `App.js` contém o código fonte
- Principais blocos: 
    - import
    - código
    - estilos
- Função `App()`indica o ponto de entrada do app
- O retorno desta função deve representar o desenho da interface de usuário que será convertida para eleentos nativos na plataforma específica (ios, android, web, etc...)
    ```
    export default function App() {
        return null;
    }
    ```
- [Lista dos Componentes Visuais e APIs](https://reactnative.dev/docs/components-and-apis)

### `<Text>`
- Importar `import { Text } from 'react-native';`
- Exibe um texto estático
- Podem ser utlizadas expressões dentro do texto
- Para processar expressões é necessário utilizar os símbolos `{` e `}`
- Por exemplo:
    ```
    export default function App() {
    var variavel = 'Ok!'
    return <Text>Tudo certo = {variavel}, 2 + 2 = {2 + 2}</Text>
    }
    ```
- Estilos podem ser aplicados localmente `style={{margin: 100}}`
    ```
    export default function App() {
        var variavel = 'Ok!'
        return <Text style={{margin: 100}}>Tudo certo = {variavel}, 2 + 2 = {2 + 2}</Text>
    }
    ```
#### `<View>`
- Importar `import { View } from 'react-native';`
- Representa um container para demais componentes React onde estilos podem ser aplicados globalmente
    ```
    export default function App() {
    var variavel = 'Ok!'
    const texto = () => {
        return "Boa noite!";
    }
    return <View style={{margin: 100, borderWidth: 5}}>
                <Text>Tudo certo = {variavel}</Text>
                <Text>2 + 2 = {2 + 2}</Text>
                <Text>{texto()}</Text>
            </View>
    }
    ```
#### Estilos
- Importar `import { StyleSheet } from 'react-native';`
- Utilizar o método utilitário `StyleSheet.create` para criar objetos de estilo
- São "semelhantes" ao **css** mas não são iguais!!!!
    ```
    const styles = StyleSheet.create({
    container: {
        flex: 1, // ocupa toda a dimensão vertical
        marginTop: '10%',
        borderWidth: 5,
        borderColor: 'red'
    }});
    ```
- Referenciar com a propriedade `style={objeto_estilo.nome_estilo}`
    ```
    export default function App() {
    var variavel = 'Ok!'
    return <View style={styles.container}>
                <Text>Tudo certo = {variavel}</Text>
                <Text>2 + 2 = {2 + 2}</Text>
            </View>
    }
    ```
#### Controle de Estado em React

- Controle de estado é um conceito fundamental em **React**
- Estado representa o valor das variáveis em um determinado momento
- Caso o estado de uma variável seja alterado internamente pode-se desejar que esta alteração seja refletida na interface de usuário

    ```
    export default function App() {

    let contador = 0;
    const contar = () => {
        contador++;
    }

    return <View style={styles.container}>
            <Text style={{textAlign: 'center'}}>{contador}</Text>
            <Button title='Contar' onPress={contar}/>
            </View>
    }
    ```
- O exemplo acima não funciona, o contador não é atualizado na interface
- Para que isso seja feito é necessário o uso do `useState`

```
  import { useState } from 'react';
  // variável contador somente leitura
  // para alterar seu valor utilizar a função incContador
  const [contador, incContador] = useState(0);

  const contar = () => {
    // atribuir o valor atual de contador a outra variável
    let newContador = contador;
    // atualizar o novo valor utilizando o incContador
    incContador(++newContador);
  }
```

#### `<TextInput>`
- Importar `import { TextInput } from 'react-native';`
- Permite a entrada de um texto
- Deve ser associado a uma variável de estado `useState`
- Principais propriedades:
  - `style` - define o estilo
  - `onChangeText` - associado à função de controle de estado (`useState`)
  - `value` - valor digitado e associado à variável de estado (`useState`)
 #### Exemplo `<TextInput>`
- Importar controle de estado do React: `import { useState } from 'react';`
- Criar uma variável de estado chamada `descricaoGasto`
  ```
  const [descricaoGasto, onChangeDescricaoGasto] = useState('');
  ```
- Criar um manipulador para o texto inserido:
  ```
  const descricaoGastoHandler = (texto) => {
    console.log(texto);
    onChangeDescricaoGasto(texto);
  }
  ```
- Definir o `<TextInput>`:
  ```
  <TextInput style={styles.input} 
             value={descricaoGasto} 
             onChangeText={descricaoGastoHandler}
             placeholder="Descrição do Gasto"/>
  ```
- Definir o estilo:
  ```
  input: {
    height: 40,
    margin: 12,
    width: 300,
    borderWidth: 1,
    padding: 10,
  },
  ```
#### Exibindo o Texto Digitado
- Criar o `<Text>`:
  ```
  <Text>{descricaoGasto}</Text>
  ```
#### `<Button>`
- Importar `import { Button } from 'react-native';`
- Botão que pode ser pressionado
- Principais propriedades:
  - `style` - define o estilo
  - `onPress` - função acionada quando o botão é pressionado
  - `title` - rótulo do botão

#### Exemplo `<Button>`
- Criar um `<Button>`
  ```
  <Button title="Adicionar" onPress={addDescricaoGastoHandler}/>
  ```
- Criar um manipulador a ser acionado quando o botão for pressionado:
  ```
  const addDescricaoGastoHandler = () => {
    console.log(descricaoGasto);
  }
  ```
#### Armazenar Gastos em Uma Lista
- **Nota:** como concatenar *arrays* em *Javascript* utilizando **spread** (`...`)
    ```
    const letras = ["A", "B", "C"];
    const maisLetras = [letras, "D"];
    console.log(maisLetras);
    ```
- Resultado: `[["A", "B", "C"], "D"]` - um *array* dentro de outro
    ```
    console.log(...letras)
    ```
- Concatenação com o **spread** (`...`):
    ```
    const maisLetras = [...letras, "D"];
    console.log(maisLetras)
    ```
- **Nota:** utilizando `map` para percorrer elementos de um *array*
    ```
    maisLetras.map((item) => console.log(item))
    ```
- Criar uma variável de estado para armazenar a lista de gastos:
    ```
    const [listaGastos, setListaGastos] = useState([]);
    ```
- Alterar a função acionada quando o botão é pressionado:
  ```
  const addDescricaoGastoHandler  = () => {

    setListaGastos((gastosAtuais) => {
      console.log([...gastosAtuais, descricaoGasto]);
      return [...gastosAtuais, descricaoGasto];
    });
  }
  ```
- Os itens devem ser exibidos em uma lista contento `<Text>` para cada elemento
- Utilizar a função `map` do javascript para percorrer os elementos da lista
```
{listaGastos.map((gasto) => <Text key={gasto}>{gasto}</Text>)}
```
### FlexBox
- Permite distribuir os componentes visuais proporcionalmente na área de visualização
- A propriedade `flexDirecion` define como os componentes dentro da `<View>` serão distribuídos
  - `row`: alinhados lado a lado (linha)
  - `column`: alinhados um abaixo do outro (coluna) - *Default*
- Cada componente dentro da `<View>` tem uma propriedade `flex` para indicar o quanto de espaço irá ocupar
- No exemplo baixo, 1 + 4 = 5, então **Item 1** irá ocupar 1/5 do espaço horizontal
- Já o **Item 2** irá ocupar 4/5
```
<View style={{marginTop: 50, flexDirection:'row'}}>
    <Text style={{flex: 1, borderColor: 'red', borderWidth: 1}}>Item 1</Text>
    <Text style={{flex: 4, borderColor: 'red', borderWidth: 1}}>Item 2</Text>
</View>
```
#### Ajustando o Layout Atual
- Efetuar a refatoração dos elementos adicionando os estilos e aplicando o **flex**
    ```
    return <View style={styles.container}>
                <TextInput style={styles.input} 
                value={descricaoGasto} 
                onChangeText={descricaoGastoHandler}
                placeholder="Descrição do Gasto"/>
                <Button style={styles.button} title="Adicionar" 
                onPress={addDescricaoGastoHandler}/>
                <View style={styles.lista}>
                {listaGastos.map((gasto) => <Text key={gasto}>{gasto}</Text>)}
                </View>
            </View>
    }
    ```
- Estilos:
    ```
    const styles = StyleSheet.create({
    container: {
        flex: 1, // ocupa toda a dimensão vertical
        marginTop: '10%',
        borderWidth: 5,
        borderColor: 'red'
    },
    input: {
        margin: 12,
        flex: 1,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        flex: 1
    },
    lista: {
        flex: 20,
        margin: 10
    }
    ```
- Colocar o `<Button>` ao lado do `<TextInput>`
- Utilizar `<View>` para criar agrupamento dos componentes visuais do app
    ```
    <View style={{marginRight: 10, flexDirection: 'row', alignItems: 'center'}}>
    <TextInput style={styles.input} 
    value={descricaoGasto} 
    onChangeText={descricaoGastoHandler}
    placeholder="Descrição do Gasto"/>
    <Button style={styles.button} title="Adicionar" onPress={addDescricaoGastoHandler}/>
    </View>
    ```
#### `<FlatList>`
- Exibe uma lista de itens de forma otimizada:
  - `data`: lista contendo os valores a serem exibidos
  - `renderItem`: como os itens da lista serão exibidos visualmente - recebe como parâmetro um objeto JSON com os atributos `item` (texto) e `index` (índice do item no *array* mapeado para `data`)
  - `keyExtractor`: chaves únicas para cada item da lista - recebe como parâmetro o índice do elemento no *array* indicado em `data`

#### Exibir Gastos na FlatList
- Para organizar o código, criar uma função que retorna o item a ser exibido em cada linha da lista
    ```
  const renderGasto = (item, index) => {
    return <Text style={styles.item}>{item}</Text>;
  }
    ```
- Referenciar a função `renderGasto` para exibir o item de gasto adicionado
    ```
    <FlatList
        data={listaGastos} 
        renderItem={({item, index}) => renderGasto(item, index)}
        keyExtractor={idx => idx} />
    ```
- Definir o estilo para cada item:
    ```
    item: {
        height: 40,
        marginLeft: 10,
        textAlignVertical: 'center'
    }
    ```
- Obtendo o item selecionado com `onPress`
    ```
    const removerGasto = idx => {
        let removerGasto = [...listaGastos];
        removerGasto.splice(idx,1);
        addListaGastos(removerGasto);
    };

    const renderGasto = (item, index) => {
        return <Text onPress={()=>removerGasto(index)} 
                    style={styles.item}>{item}</Text>;
    }
    ```
#### Funções como Componentes React

- A função `renderGasto` deve ter o nome trocado para `RenderGasto`
- Os parâmetros devem ser encapsulados em um único parâmetro `props`
- As propriedades são obtidas de `props` como `props.index` e `props.item`
  ```
    const RenderGasto = (props) => {
      return <Text onPress={()=>removerGasto(props.index)} 
                  style={styles.item}>{props.item}</Text>;
    }
  ```
- Para acionar a função agora encapsulada em um componente:
  ```
  <FlatList
    data={listaGastos} 
    renderItem={({item, index}) => <RenderGasto index={index} item={item}/>}
    keyExtractor={idx => idx} />
  ```
 #### Melhorando o componente `RenderGasto`
 - Incluindo uma `View` e estilo

 ```
   itemgasto: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#88ff'
  },
 ```

 ```
   const RenderGasto = (props) => {
    return <View style={styles.itemgasto}>
      <Text onPress={()=>removerGasto(props.index)} 
                 style={styles.item}>{props.item}</Text>
      </View>;
  }
  ```

  ```
    const RenderGasto = (props) => {
    return <Pressable onPress={()=>removerGasto(props.index)}>
      <View style={styles.itemgasto}>
      <Text style={styles.item}>{props.item}</Text>
      </View>
      </Pressable>;
  }
  ```
