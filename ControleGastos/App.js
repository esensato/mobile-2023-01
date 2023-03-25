import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [numero, atualizarNumero] = useState(0);
  const [texto, atualizarTexto] = useState('0');

  const incrementar = () => {
    let novoNumero = numero;
    novoNumero++;
    atualizarNumero(novoNumero);
    console.log('onPress!!!', novoNumero);
  }

  const atualizaTexto = (txt) => {
    console.log(txt);
    atualizarTexto(txt);
  }

  const novoValor = () => {
    atualizarNumero(parseInt(texto));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{numero}</Text>
      <TextInput style={styles.input} 
                 placeholder='Novo Número'
                 onChangeText={atualizaTexto}
                 value={texto}/>
      <Button title='Incrementar' onPress={incrementar}/>
      <Button title='Novo Valor' onPress={novoValor}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10
  },
  input: {
    height: 40,
    margin: 12,
    width: 300,
    borderWidth: 1,
    padding: 10,
  },
  texto: {
    backgroundColor: 'yellow',
    fontSize: 32
  }
});
