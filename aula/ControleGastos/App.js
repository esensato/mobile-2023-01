import { FlatList, StyleSheet, Text, View, Button, TextInput, Pressable, Image } from 'react-native';
import { useState } from 'react';

import { RenderItem } from './components/RenderItem'
import { EntradaGasto } from './components/EntradaGasto'

export default function App() {

  const [numero, atualizarNumero] = useState(0);

  const incrementar = () => {
    contador++;
    let novoNumero = numero;
    novoNumero++;
    atualizarNumero(novoNumero);
    console.log('onPress!!!', novoNumero);
  }

  const novoValor = () => {
    atualizarNumero(parseInt(texto));
    atualizaTexto("");
  }

  const [gastos, addGasto] = useState(["Pizza", "Compra de Livro", "Sapato", "Coca-Cola", "Calça Jeans"]);

  const incluir = (texto) => {
    var novoGasto = [...gastos, texto];
    addGasto(novoGasto);
  }

  const remover = (idx) => {
    console.log("Remover: ", idx);
    let novaLista = [...gastos];
    novaLista.splice(idx, 1);
    addGasto(novaLista);
  }

  const Mensagem = (props) => {
    console.log(props);
    return <Text style={styles.item}>{props.texto}</Text>
  }

  return (
    <View style={styles.container}>
      <EntradaGasto callBackIncluir={incluir}/>
      <FlatList
          data={gastos} 
          renderItem={({item, index}) => <RenderItem 
                                              item={item} 
                                              indice={index}
                                              callBackRemover={remover}/>}
          keyExtractor={idx => idx} />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#ffff'
  },
  texto: {
    backgroundColor: 'yellow',
    fontSize: 32
  }
});
