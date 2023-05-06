import { Text, View } from 'react-native';

const Detalhe = (props) => {

    return <View style={{flex: 1, 
                         alignContent: 'center', 
                         justifyContent:'center'}}>
            <Text>{props.route.params.item}</Text>
    </View>
}
module.exports.Detalhe = Detalhe;

