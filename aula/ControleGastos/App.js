import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';
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
    atualizaTexto("");
  }

  const [gastos, addGasto] = useState(["Pizza", "Compra de Livro", "Sapato", "Coca-Cola"]);

  const incluir = () => {
    var novoGasto = [...gastos, texto];
    addGasto(novoGasto);
  }

  const remover = (idx) => {
    console.log("Remover: ", idx);
    let novaLista = [...gastos];
    novaLista.splice(idx, 1);
    addGasto(novaLista);
  }

  const renderItem = (item, idx) => {
    return <Pressable key={idx} onPress={()=>remover(idx)}>
            <Text style={styles.item}>{item}</Text>
           </Pressable>
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", alignItems: "center", }}>
        <TextInput style={styles.input} 
                  placeholder='Novo Número'
                  onChangeText={atualizaTexto}
                  value={texto}/>
        <Button title='Incluir' onPress={incluir}/>
      </View>
      {   gastos.map((item, idx) => renderItem(item, idx))   }
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius:6, 
    color:"white", 
    margin: 10, 
    padding: 10, 
    backgroundColor: "#33f"
  },
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#ffff'
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
