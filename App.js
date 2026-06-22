import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import ContactsList from './Screens/ContactsList';
import ContactDetails from './Screens/ContactDetails';
import AddContact from './Screens/AddContact';
import EditSelectContact from './Screens/EditSelectContact';
import EditContact from './Screens/EditContact';
import Settings from './Screens/Settings';

// Navigation setup. 
const Stack = createNativeStackNavigator();

export default function App() {  
  return ( 
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} /> 
        <Stack.Screen name="ContactsList" component={ContactsList} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
        <Stack.Screen name="AddContact" component={AddContact} />
        <Stack.Screen name="EditSelectContact" component={EditSelectContact} />
        <Stack.Screen name="EditContact" component={EditContact} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
