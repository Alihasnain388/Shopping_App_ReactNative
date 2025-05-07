import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from './screens/ThirdScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={FirstScreen} />
        <Stack.Screen name="ItemList" component={SecondScreen} />
        <Stack.Screen name="Basket" component={ThirdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
         





         
  
