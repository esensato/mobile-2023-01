import { FlatList } from 'react-native';
import { RenderItem } from './RenderItem';

const RenderLista = (props) => {
    return  <FlatList
    data={props.gastos} 
    renderItem={({item, index}) => <RenderItem 
                                        item={item.descricao}
                                        valor={item.valor} 
                                        indice={index}
                                        nav={props.nav}
                                        callBackRemover={props.callBackRemover}/>}
    keyExtractor={idx => Math.random()} />;
}
module.exports.RenderLista = RenderLista;