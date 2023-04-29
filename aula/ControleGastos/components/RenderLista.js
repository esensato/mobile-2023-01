import { FlatList } from 'react-native';
import { RenderItem } from './RenderItem';

const RenderLista = (props) => {
    return  <FlatList
    data={props.gastos} 
    renderItem={({item, index}) => <RenderItem 
                                        item={item.descricao}
                                        valor={item.valor} 
                                        indice={index}
                                        callBackRemover={props.callBackRemover}/>}
    keyExtractor={idx => idx.descricao} />;
}
module.exports.RenderLista = RenderLista;