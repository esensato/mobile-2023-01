import Gastos from "./components/Gastos";
import { Detalhe } from "./components/Detalhe";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();
  return <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Gastos" component={Gastos}/>
              <Stack.Screen name="Detalhe" component={Detalhe}/>
            </Stack.Navigator>
         </NavigationContainer>;
}
