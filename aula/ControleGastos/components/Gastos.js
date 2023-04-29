import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import { EntradaGasto } from './EntradaGasto'
import { RenderLista } from './RenderLista'

export default function Gastos() {

  const [gastos, addGasto] = useState([]);

  const incluir = (texto, novoValor) => {
    const novoItem = {descricao: texto, valor: novoValor}
    var novoGasto = [...gastos, novoItem];
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
      <RenderLista gastos={gastos} callBackRemover={remover}/>    
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
