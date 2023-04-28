import { FlatList, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import { RenderItem } from './components/RenderItem'
import { EntradaGasto } from './components/EntradaGasto'

export default function App() {

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
