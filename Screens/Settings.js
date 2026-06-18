import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ navigation }) { 

// Saving text size adjustments.
const [textSize, setTextSize] = useState(16);
const saveSettings = async () => { 
  try { await AsyncStorage.setItem('textSize', textSize.toString());} 
  catch (e) { console.log('Error with text size'); }};

useEffect(() => { const loadSettings = async () => { 
  const savedSize = await AsyncStorage.getItem('textSize'); 
  if (savedSize) { setTextSize(parseFloat(savedSize));}}; loadSettings();},[]);
 

// Save brightness settings.
 const [brightness, setBrightness] = useState(5);

// Header section - includes elements which appear on each page + instructions for this page.
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={[styles.topBarCell, { alignItems: 'flex-start' }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/backButton.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.topBarCell}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/images/roiLogo.jpg')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.heading}>CHANGE SETTINGS</Text>
      <Text style={styles.instruction}>
        Update settings below and press Save.{' '}
      </Text>
      <Text style={styles.space}> </Text>
      <View style={styles.divider} />
{/* End of header section - */}

      <ScrollView>
        <View style={styles.card}>
          <Ionicons name="settings-outline" size={60} color="black" style={{ alignSelf: 'center'}}/>

{/* Slider for adjusting and setting text size. */} 
          <Text style={[styles.generalText, { fontSize: textSize }]}>Text size: </Text>
          <Slider style={{width: 200, height: 40, alignSelf: 'center' }} value={textSize} onValueChange={(value) => setTextSize(value)} minimumValue={12} maximumValue={30} minimumTrackTintColor="#C64C38" maximumTrackTintColor="#262626" thumbSize={20} thumbTintColor="#941A1D" />

{/* Slider for adjusting and setting brightness. */}
          <Text style={[styles.generalText, { fontSize: textSize }]}>Brightness: </Text>
          <Slider style={{width: 200, height: 40, alignSelf: 'center' }} value={brightness} onValueChange={(value) => setBrightness(value)} minimumValue={0} maximumValue={10} minimumTrackTintColor="#C64C38" maximumTrackTintColor="#262626" thumbSize={20} thumbTintColor="#941A1D" />
 
{/*  Slider for turning sound effects on and off. */}
          <Text style={[styles.generalText, { fontSize: textSize }]}>
            <Text style={{ }}>Sound effects: </Text>
          </Text>

        </View>

{/* Save settings. */}
        <TouchableOpacity style={styles.buttonStyle} onPress={saveSettings}>
          <Text style={styles.buttonText}> SAVE </Text>
        </TouchableOpacity>  

      </ScrollView>
    </SafeAreaView>
  );
}

// Customisation of display. 
const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#262626', padding: 16 }, 
  heading:        { fontSize: 20, color: '#FFFFFF', marginBottom: 16 },
  instruction:    { fontSize: 20, color: '#FFFFFF', lineHeight: 26 },
  formFields:     { fontSize: 16, color: '#262626' },
  buttonStyle:    { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12, marginRight: 16 },
  buttonText:     { color: '#262626', fontSize: 16 },
  card:           { backgroundColor: "#FFFFFF",paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, marginRight: 16 },
  cardContent:    { flex: 1, flexDirection: 'row', alignItems: 'center' },
  cardContainer:  { marginLeft: 1, flex: 1 },
  space:          { fontSize: 8, color: "black" }, 
  divider:        { height: 5, backgroundColor: '#CB6D4f', marginVertical: 15 },
  icon:           { width: 60, height: 75, resizeMode: 'contain', alignSelf: 'center', marginLeft: 1 },
  name:           { fontSize: 16, color: '#262626', lineHeight: 26 },
  department:     { fontSize: 16, color: '#262626', lineHeight: 26 },
  phone:          { fontSize: 16, color: '#262626', lineHeight: 26 },
  address:        { fontSize: 16, color: '#262626', lineHeight: 26 },
  input:          { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#262626', borderRadius: 10, padding: 10, marginVertical:5},
  logo:           { width: 110, height: 50, resizeMode: 'contain', alignSelf: 'flex-end', marginBottom: 10, marginRight: 16 },
  topBarContainer:{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  backButton:     { width: 80, height: 40, resizeMode: 'contain', marginHorizontal: -16 },
  generalText:    { color: "#262626", alignSelf: 'center' }
});
