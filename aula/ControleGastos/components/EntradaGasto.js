import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { useState } from 'react';

const EntradaGasto = (props) => {

    let real = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumSignificantDigits: 2,
    });
    
    //console.log(`Pounds: ${pounds.format(price)}`);

    const [texto, atualizarTexto] = useState('');
    const [valor, atualizaValor] = useState("0.0");
    const [totalGasto, atualizaTotalGasto] = useState("0.0");

    const atualizaTexto = (txt) => {
        console.log(txt);
        atualizarTexto(txt);
    }

    const incluirGasto = () => {
        var totalAtual = parseFloat(totalGasto);
        totalAtual = totalAtual + parseFloat(valor);
        atualizaTotalGasto(totalAtual);
        props.callBackIncluir(texto, valor);
    }
    
    return <View style={{alignItems: "center", }}>
                <TextInput style={styles.input} 
                        placeholder='Novo Gasto'
                        onChangeText={atualizaTexto}
                        value={texto}/>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput  style={styles.input2} 
                                placeholder='Valor do Gasto'
                                onChangeText={atualizaValor}
                                value={valor}/>
                    <Button title='Incluir' onPress={() => incluirGasto()}/>
                </View>
                <Text style={styles.total}>Total do Gasto: R$ {totalGasto}</Text>
            </View>
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        width: "90%",
        borderWidth: 1,
        padding: 10,
      },
      input2: {
        height: 40,
        margin: 12,
        width: "75%",
        borderWidth: 1,
        padding: 10,
      },
      total: {
        backgroundColor: "yellow",
        height: 40,
        margin: 12,
        width: "90%",
        borderWidth: 1,
        padding: 10,     
      }
})

module.exports.EntradaGasto = EntradaGasto;
