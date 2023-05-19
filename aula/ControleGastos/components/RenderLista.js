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
    keyExtractor={idx => idx.id} />;
}
module.exports.RenderLista = RenderLista;