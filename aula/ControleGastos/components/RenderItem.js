
import { StyleSheet, Text, Pressable, Image, View } from 'react-native';

const RenderItem = (props) => {

    return <Pressable onPress={()=>props.callBackRemover(props.indice)}>
                <View style={ styles.item }>
                <Image source={require('../assets/coin.png')} style={{width: 32, height: 32}}/>
                <Text style={{ marginLeft: 10 }}>{props.item} - {props.valor}</Text>
              </View>
           </Pressable>
  }

  const styles = StyleSheet.create({
    item: {
        flexDirection: "row", 
        alignItems: "center",
        flex: 1,
        borderRadius:8, 
        borderColor: "black",
        borderWidth: 1,
        color:"white", 
        margin: 10, 
        padding: 10, 
        backgroundColor: "yellow"
      },
  })

  module.exports.RenderItem = RenderItem;
