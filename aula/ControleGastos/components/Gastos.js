import { StyleSheet, View, Modal, Text, Button } from 'react-native';
import { useState, useEffect } from 'react';

import { EntradaGasto } from './EntradaGasto'
import { RenderLista } from './RenderLista'
import { BancoDados, inserir, listar } from "./BancoDados";
import axios from 'axios';

import * as Notifications from 'expo-notifications';

export default function Gastos(props) {

  const [gastos, addGasto] = useState([]);
  const [totalGasto, atualizaTotalGasto] = useState("0.0");
  const [exibirModal, setExibirModal] = useState(false);
  const [visivel, setVisivel] = useState(false);

  useEffect (() => {
    
    console.log("--> Carregando gastos do backend...");
    axios.get('https://controle-gastos.glitch.me/').then((resultado) => {
      if (resultado.status === 200) {
        addGasto(resultado.data)
        setVisivel(true);
      }
    });
    console.log("--> Fim requisicao")
    
    //gastosBD()
  
  }, [])

  const gastosBD = () => {
    BancoDados()
    .then((_) =>listar()
                  .then((ok) => addGasto(ok))
                  .catch((err) => console.log(err)))
    .catch((err) => console.log(err))

  }


  const enviarNotificacao = async () => {

    const perm = await Notifications.getPermissionsAsync();
  
    console.log(perm.status);
  
    if (perm.status === 'denied') {
      Notifications.requestPermissionsAsync()
      .then((ok) => console.log(ok))
      .catch((err) => console.log(err));
      
    }
  
  }

  const incluir = (texto, novoValor) => {
    const novoItem = {descricao: texto, valor: novoValor}
    let novoGasto = [...gastos, novoItem];
    let novoTotal = parseFloat(totalGasto) + parseFloat(novoValor);
    atualizaTotalGasto(novoTotal);
    addGasto(novoGasto);
    if (novoTotal > 1000) {
      setExibirModal(true);
      enviarNotificacao();
    }

    BancoDados()
    .then((_) => inserir(texto, novoValor)
                      .then((ok) => console.log(ok))
                      .catch((err) => console.log(err)))
    .catch((err) => console.log(err))

    axios.post('https://controle-gastos.glitch.me/', {descricao: texto, valor: novoValor}).then((resposta) => {
      if (resposta.status === 200) {
        console.log('Enviado ao backend com sucesso!!!');
      } else {
        console.log('Erro ao enviar ao backend: ', resposta.status);
      }
    })
  
  }

  const remover = (idx) => {
    console.log("Remover: ", idx);
    let valorRemovido = gastos[idx].valor;
    atualizaTotalGasto(parseFloat(totalGasto) - parseFloat(valorRemovido))
    let novaLista = [...gastos];
    novaLista.splice(idx, 1);
    addGasto(novaLista);
  }

  if (visivel) {

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
        <View>
          <EntradaGasto callBackIncluir={incluir} total={totalGasto}/>
          <RenderLista gastos={gastos} callBackRemover={remover} nav={props.navigation}/>    
        </View>
      </View>
    );
  } else {
    return <Text>Aguarde...</Text>
  }
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
