
import { StyleSheet, Text, Pressable } from 'react-native';

const RenderItem = (props) => {
    console.log(props.item, props.indice);
    return <Pressable key={props.indice} onPress={()=>props.callBackRemover(props.indice)}>
              <Text style={styles.item}>{props.item}</Text>
           </Pressable>
  }

  const styles = StyleSheet.create({
    item: {
        borderRadius:6, 
        color:"white", 
        margin: 10, 
        padding: 10, 
        backgroundColor: "#33f"
      },
  })

  module.exports.RenderItem = RenderItem;
