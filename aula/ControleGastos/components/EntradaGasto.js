import { StyleSheet, View, Button, TextInput } from 'react-native';
import { useState } from 'react';

const EntradaGasto = (props) => {

    const [texto, atualizarTexto] = useState('');

    const atualizaTexto = (txt) => {
        console.log(txt);
        atualizarTexto(txt);
    }

    return <View style={{flexDirection: "row", alignItems: "center", }}>
                <TextInput style={styles.input} 
                        placeholder='Novo Gasto'
                        onChangeText={atualizaTexto}
                        value={texto}/>
                <Button title='Incluir' onPress={() => props.callBackIncluir(texto)}/>
            </View>
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        width: 300,
        borderWidth: 1,
        padding: 10,
      },
})

module.exports.EntradaGasto = EntradaGasto;
