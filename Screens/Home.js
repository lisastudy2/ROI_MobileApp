import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAudioPlayer} from 'expo-audio';
import { useFonts } from 'expo-font';

export default function Home({ navigation }) {

// Display saved text settings.
const [textSize, setTextSize] = useState(16);
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', async () => {
    const savedSize = await AsyncStorage.getItem('textSize');
    if (savedSize) {
      setTextSize(parseFloat(savedSize)); 
      }}); 
      return unsubscribe;}, [navigation]);

// Play sounds if enabled.
const [soundEnabled, setSoundEnabled] = useState(true);

useEffect(() => {
  const loadSound = async () => {
    const savedSound = await AsyncStorage.getItem('soundEnabled');
    if (savedSound !== null) {
      setSoundEnabled(JSON.parse(savedSound));
    }
  };

  loadSound();
}, []);

  const clickPlayer = useAudioPlayer(
    require('../assets/sounds/click.mp3')
  );

  const playClickSound = () => {
    if (!soundEnabled) return;
    clickPlayer.play();
  }; 

  // Loading approved font.
  const [fontsLoaded] = useFonts({
    'trebuchet': require('../assets/fonts/trebuchet-reg.ttf'), 
  });
  if (!fontsLoaded) {
    return null; 
  } 
  
// Header section - includes elements which appear on each page + instructions for this page.
return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
    <Image source={require('../assets/images/roiLogo.jpg')} style={styles.logo}/>
    <Text style={styles.welcomeText}>Welcome to the ROI </Text>
    <Text style={styles.welcomeText}>Staff Contacts App</Text>
    <Text style={styles.instruction}>Press a button to get started: </Text>

{/* Menu options */}  
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => {playClickSound(); navigation.navigate('ContactsList')}}
      >
      <Text style={[styles.buttonText, { fontSize: textSize }]}>VIEW CONTACTS</Text>  
    </TouchableOpacity> 

    <TouchableOpacity 
      style={styles.buttonStyle}
      onPress={() => {playClickSound(); navigation.navigate('AddContact')}}
      >
      <Text style={[styles.buttonText, { fontSize: textSize }]}>ADD CONTACT</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => {playClickSound(); navigation.navigate('EditSelectContact')}}
      >
      <Text style={[styles.buttonText, { fontSize: textSize }]}>EDIT CONTACTS</Text>
    </TouchableOpacity> 

    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => {playClickSound(); navigation.navigate('Settings')}}
      >
      <Text style={[styles.buttonText, { fontSize: textSize }]}>SETTINGS</Text>
    </TouchableOpacity> 
  </ScrollView>
  </SafeAreaView> 
); 
    
}

// Customisation of display. 
const styles = StyleSheet.create({ 
  container:    { flex: 1, backgroundColor: '#262626', padding: 16 },
  welcomeText:  { fontFamily: 'trebuchet', fontSize: 30, color: '#FFFFFF', marginBottom: 1, marginTop: 1, alignSelf: 'center' },
  instruction:  { fontFamily: 'trebuchet', fontSize: 20, color: '#FFFFFF', lineHeight: 26, alignSelf: 'center', marginTop: 15, marginBottom: 15 },
  buttonStyle:  { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, alignItems: 'center', marginTop: 18, width:'70%', alignSelf:'center' },
  buttonText:   { fontFamily: 'trebuchet', color: '#262626' },
  logo:         { width: 200, height: 150, resizeMode: 'contain', alignSelf: 'center', marginBottom: 10 },
});