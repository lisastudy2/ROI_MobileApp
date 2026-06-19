import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Brightness from 'expo-brightness';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

export default function Settings({ navigation }) { 

// Saving text size adjustments.
const [textSize, setTextSize] = useState(16);
const saveSettings = async () => { 
  try { await AsyncStorage.setItem('textSize', textSize.toString());
        await AsyncStorage.setItem('brightness', brightness.toString());
 } catch (e) { console.log('Error with text size'); }};

useEffect(() => { 
  const loadSettings = async () => {  
    try {
      const savedSize = await AsyncStorage.getItem('textSize'); 
      if (savedSize) { 
        setTextSize(parseFloat(savedSize));} 
  
  // Saving brightness adjustments. 
  const savedBrightness = await AsyncStorage.getItem('brightness');
  if (savedBrightness) { 
    const value = parseFloat(savedBrightness); 
    setBrightness(value);

    await Brightness.setSystemBrightnessAsync(value);}

    } catch (e) {
      console.log('Error loading settings');}};
    
  loadSettings();},[]);
 
 const [brightness, setBrightness] = useState(0.5);

  const changeBrightness = async (value) => {
  try {
    await Brightness.requestPermissionsAsync();
    await Brightness.setSystemBrightnessAsync(value);
    setBrightness(value);
  } catch (e) {
    console.log('Brightness error', e);
  }
  };


// Header section - includes elements which appear on each page + instructions for this page.
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={[styles.topBarCell, { alignItems: 'flex-start' }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={35} color="#FFFFFF"/>
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
      <ScrollView>
      <Text style={[styles.heading, { fontSize: textSize }]}>CHANGE SETTINGS</Text>
      <Text style={[styles.instruction, { fontSize: textSize }]}>
        Update settings below and press Save.{' '}
      </Text>
      <Text style={styles.space}> </Text>
      <View style={styles.divider} />
{/* End of header section - */}
<Text style={[styles.generalText, { fontSize: textSize }]}>
  Text size: {textSize}
</Text>


<View style={styles.card}> 
    <Ionicons name="settings-outline" size={60} color="black" style={{ alignSelf: 'center'}}/>
    <Text style={styles.space}> </Text>
    <Text style={[styles.generalText, { fontSize: textSize }]}>
    Remember to press Save below.
    </Text>
    <Text style={styles.space}> </Text>
    <View style={styles.divider2} />

{/* I tried using a slider originally (@react-native-community/slider), however it would only work in the Web preview, then I tried another which also did not want to work, so I switched to a text-based button method for adjusting these settings. */} 

{/* Because my solution is so text heavy - I thought adding icons might help to help users at a quick glance know what these settings are for. */} 

{/* Text size adjuster. */} 
    <FontAwesome5 name="text-height" size={30} color="black" style={{ alignSelf: 'center'}}/>
    <Text style={styles.space}> </Text>
    <Text style={[styles.generalText, { fontSize: textSize, fontWeight: 'bold' }]}> Text size </Text>
    <Text style={styles.space}> </Text>
    <Text style={[styles.generalText, { fontSize: textSize }]}>
      Press - and + symbols to adjust text size. 
    </Text>
    <Text style={styles.space}> </Text>
    <View style={styles.levelAdjuster}>
     <TouchableOpacity style={styles.levelButton} onPress={() => setTextSize(prev => Math.max (12, prev - 1))}>
    <Text style={[styles.levelText, { fontSize: textSize }]}>[-]   </Text> 
    </TouchableOpacity>

    <Text style={[styles.levelValue, { fontSize: textSize }]}>or</Text>
 
    <TouchableOpacity style={styles.levelButton} onPress={() => setTextSize(prev => Math.min(30, prev + 1))} >
    <Text style={[styles.levelText, { fontSize: textSize }]}>   [+]</Text>
    </TouchableOpacity>
    </View>
    <Text style={styles.space}> </Text>

    <Text style={[styles.generalText, { fontSize: textSize }]}>
    Then press Save below. 
    </Text>
        <View style={styles.divider2} />

{/* Brightness adjuster. */}
    <AntDesign name="sun" size={50} color="black" style={{ alignSelf: 'center'}}/>
    <Text style={styles.space}> </Text>
    <Text style={[styles.generalText, { fontSize: textSize, fontWeight: 'bold'  }]}>Brightness: </Text>
    <Text style={styles.space}> </Text>
    <Text style={[styles.generalText, { fontSize: textSize }]}>
      Press - and + symbols to adjust screen brightness. 
    </Text>
    <Text style={styles.space}> </Text>
    <View style={styles.levelAdjuster}>
    <TouchableOpacity onPress={() => changeBrightness(Math.max(0, brightness - 0.1 ))}>
    <Text style={[styles.levelText, { fontSize : textSize }]}>[-]   </Text> </TouchableOpacity>

    <Text style={styles.space}> </Text>
    <Text style={[styles.generalText, { fontSize: textSize }]}> or </Text>

    <TouchableOpacity onPress={() => changeBrightness(Math.min(1, brightness + 0.1))}>
    <Text style={[styles.levelText, { fontSize: textSize }]}>   [+]</Text> </TouchableOpacity>
    </View>  
  
    <Text style={styles.space}> </Text>
    <Text style={[styles.generalText, { fontSize: textSize }]}>
    Then press Save below. 
    </Text>
    <View style={styles.divider2} />
    <Text style={styles.space}> </Text>


{/*  Sound effects adjuster. */}
    <Text style={styles.space}> </Text> 
    <Text style={[styles.generalText, { fontSize: textSize, fontWeight: 'bold'  }]}>Sound effects: </Text>
    <Text style={styles.space}> </Text>
    <Text style={[styles.generalText, { fontSize: textSize }]}>
      Would you like sound effects turned on? 
    </Text>
    <Text style={styles.space}> </Text>
          

</View>

{/* Save settings. */}
        <TouchableOpacity style={styles.buttonStyle} onPress={saveSettings}>
          <Text style={[styles.buttonText, { fontSize: textSize }]}> SAVE </Text>
        </TouchableOpacity>  

      </ScrollView>
    </SafeAreaView>
  );
}

// Customisation of display. 
const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#262626', padding: 16 }, 
  heading:        { color: '#FFFFFF', marginBottom: 16 },
  instruction:    { color: '#FFFFFF', lineHeight: 26 },
  buttonStyle:    { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12, marginRight: 16 },
  buttonText:     { color: '#262626', fontSize: 16 },
  card:           { backgroundColor: "#FFFFFF",paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, marginRight: 16 },
  cardContent:    { flex: 1, flexDirection: 'row', alignItems: 'center' },
  cardContainer:  { marginLeft: 1, flex: 1 },
  space:          { fontSize: 8, color: "black" }, 
  divider:        { height: 5, backgroundColor: '#CB6D4f', marginVertical: 15 },
  divider2:       { height: 1, backgroundColor: '#c64c38', marginVertical: 15 },
  icon:           { width: 60, height: 75, resizeMode: 'contain', alignSelf: 'center', marginLeft: 1 },
  input:          { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#262626', borderRadius: 10, padding: 10, marginVertical:5},
  logo:           { width: 110, height: 50, resizeMode: 'contain', alignSelf: 'flex-end', marginBottom: 10, marginRight: 16 },
  topBarContainer:{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  generalText:    { color: "#262626", textAlign: 'center'},
  levelAdjuster:  { color: "#262626", textAlign: 'center', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent:' center', marginVertical: 0 },
  levelButton:    { color: "#262626", textAlign: 'center' },
  levelText:      { color: "#262626", textAlign: 'center' },
  levelValue:     { color: "#262626", textAlign: 'center' }
})