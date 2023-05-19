import { StyleSheet, View, Modal, Text, Button } from 'react-native';
import { useState, useEffect } from 'react';

import { EntradaGasto } from './EntradaGasto'
import { RenderLista } from './RenderLista'
import { BancoDados, inserir, listar } from "./BancoDados";

export default function Gastos(props) {

  const [gastos, addGasto] = useState([]);
  const [totalGasto, atualizaTotalGasto] = useState("0.0");
  const [exibirModal, setExibirModal] = useState(false);

  useEffect(()=> {
    BancoDados()
    .then((_) =>listar()
                  .then((ok) => addGasto(ok))
                  .catch((err) => console.log(err)))
    .catch((err) => console.log(err))
  
  }, [])

  const incluir = (texto, novoValor) => {
    const novoItem = {descricao: texto, valor: novoValor}
    let novoGasto = [...gastos, novoItem];
    let novoTotal = parseFloat(totalGasto) + parseFloat(novoValor);
    atualizaTotalGasto(novoTotal);
    addGasto(novoGasto);
    if (novoTotal > 1000) {
      setExibirModal(true);
    }

    BancoDados()
    .then((_) => inserir(texto, novoValor)
                      .then((ok) => console.log(ok))
                      .catch((err) => console.log(err)))
    .catch((err) => console.log(err))
  
  }

  const remover = (idx) => {
    console.log("Remover: ", idx);
    let valorRemovido = gastos[idx].valor;
    atualizaTotalGasto(parseFloat(totalGasto) - parseFloat(valorRemovido))
    let novaLista = [...gastos];
    novaLista.splice(idx, 1);
    addGasto(novaLista);
  }

  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={exibirModal}>
        <View style={styles.centeredView}>
          <View style={{ borderColor: 'black', 
                         borderWidth: 3, 
                         padding: 30,
                         borderRadius: 6, 
                         backgroundColor: 'blue'}}>
            <Text style={{color: 'white', 
                          textDecorationColor: 'white'}}>Seu Gasto Passou de R$ 1.000,00!!!</Text>
            <Button title='Fechar' onPress={() => setExibirModal(false)} />
            
          </View>
        </View>
      </Modal>
      <EntradaGasto callBackIncluir={incluir} total={totalGasto}/>
      <RenderLista gastos={gastos} callBackRemover={remover} nav={props.navigation}/>    
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    borderColor: 'red'
  },
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
