import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {

const [textSize, setTextSize] = useState(16);

useEffect(() => {
  const loadSettings = async () => {
    const savedSize = await AsyncStorage.getItem('textSize');
    if (savedSize) {
      setTextSize(parseFloat(savedSize)); } }; loadSettings();}, []);
      
return (
  <SafeAreaView style={styles.container}>

    <Image source={require('../assets/images/roiLogo.jpg')} style={styles.logo}/>
    <Text style={styles.welcomeText}>Welcome to the ROI </Text>
    <Text style={styles.welcomeText}>Staff Contacts App</Text>
    <Text style={styles.instruction}>Press a button to get started: </Text>
    
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => navigation.navigate('ContactsList')}
      >
      <Text style={styles.buttonText}>VIEW CONTACTS</Text> 
    </TouchableOpacity>

    <TouchableOpacity 
      style={styles.buttonStyle}
      onPress={() => navigation.navigate('AddContact')}
      >
      <Text style={[styles.buttonText, { fontSize: textSize }]}>ADD CONTACT</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => navigation.navigate('EditSelectContact')}
      >
      <Text style={styles.buttonText}>EDIT CONTACTS</Text>
    </TouchableOpacity> 

    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => navigation.navigate('Settings')}
      >
      <Text style={styles.buttonText}>SETTINGS</Text>
    </TouchableOpacity> 

  </SafeAreaView> 
); 
    
}

const styles = StyleSheet.create({ 
  container:    { flex: 1, backgroundColor: '#262626', padding: 16 },
  welcomeText:  { fontSize: 30, color: '#FFFFFF', marginBottom: 1, marginTop: 1, alignSelf: 'center' },
  instruction:  { fontSize: 20, color: '#FFFFFF', lineHeight: 26, alignSelf: 'center', marginTop: 15, marginBottom: 15 },
  buttonStyle:  { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, alignItems: 'center', marginTop: 18, width:'70%', alignSelf:'center' },
  buttonText:   { color: '#262626' },
  logo:         { width: 200, height: 150, resizeMode: 'contain', alignSelf: 'center', marginBottom: 10 },
});