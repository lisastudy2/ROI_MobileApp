import { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayer} from 'expo-audio';
import { useFonts } from 'expo-font';
 
export default function ViewScreen({ route, navigation }) {

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
  const successPlayer = useAudioPlayer(
    require('../assets/sounds/success.mp3')
  );
    const errorPlayer = useAudioPlayer(
    require('../assets/sounds/error.mp3')
  );

  const playClickSound = () => {
    if (!soundEnabled) return;
    clickPlayer.play();
  };
    const playSuccessSound = () => {
    if (!soundEnabled) return;
    successPlayer.play();
  }; 

    const playErrorSound = () => {
    if (!soundEnabled) return;
    errorPlayer.play();
  }; 

// Variables for the form. 
const [id, setID] = useState('');
const [name, setName] = useState('');
const [department, setDepartment] = useState('');
const [phone, setPhone] = useState('');
const [addressStreet, setAddressStreet] = useState('');
const [addressCity, setAddressCity] = useState('');
const [addressState, setAddressState] = useState('');
const [addressZIP, setAddressZIP] = useState('');
const [addressCountry, setAddressCountry] = useState('');

// Saves new contact details - note alert only appears in app view not web view.
const handleAddContact = async () => {
  if ( 
  !id?.trim() ||
  !name?.trim() ||
  !department?.trim() ||
  !phone?.trim() ||
  !addressStreet?.trim() ||
  !addressCity?.trim() ||
  !addressState?.trim() ||
  !addressZIP?.trim() ||
  !addressCountry?.trim()
   ) {
    playErrorSound();
    Alert.alert(
      "Missing details",
      "Please make sure all questions have answers."
    );
    return;
  } 

    const newContact = {id, name, department, phone, addressStreet, addressCity, addressState, addressZIP, addressCountry};
 
  try { 
    const existing = await AsyncStorage.getItem('contacts');
    const contacts = existing ? JSON.parse(existing) : [];
    contacts.push(newContact);
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    playSuccessSound();
    Alert.alert("Success!", "New contact has been saved.", [ 
      { text: "OK", onPress: () => navigation.navigate('Home')}], {cancelable: false });

  } catch (error) {
    console.log('Error saving:', error);

  }
}; 

// Loading approved font.
  const [fontsLoaded] = useFonts({
    'trebuchet': require('../assets/fonts/trebuchet-reg.ttf'), 
    'trebuchet-bold': require('../assets/fonts/trebuchet-bold.ttf'),
  });
  if (!fontsLoaded) {
    return null; 
  } 
  
// Header.
  return (
// Keyboard pop-up does not cover text on screen.
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

{/* Start of header section - */}
      <View style={styles.topBarContainer}> 

        <View style={[styles.topBarCell, {alignItems: 'flex-start'}]}>
          <TouchableOpacity onPress={() => {playClickSound(); 
          setTimeout(() => {
            navigation.goBack();
            }, 300);}}>
          <Ionicons name="arrow-back" size={35} color="#FFFFFF"/> 
          </TouchableOpacity>
        </View>

        <View style={[styles.topBarCell, { marginLeft: 10}]}> 
          <TouchableOpacity onPress={() => {playClickSound(); navigation.navigate('Home')}}>
            <AntDesign name="home" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      
        <View style={{ flex: 1 }} />
        
        <View style={styles.topBarCell}> 
          <TouchableOpacity onPress={() => {playClickSound(); navigation.navigate('Home')}}>
            <Image source={require('../assets/images/roiLogo.jpg')} style={styles.logo}/>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} keyboardShouldPersistTaps="handled">

      <Text style={[styles.heading, { fontSize: textSize, lineHeight: textSize + 6 }]}>ADD NEW CONTACT</Text>
      <Text style={[styles.instruction, { fontSize: textSize, lineHeight: textSize + 6 }]}>Please fill in details of new contact and save.</Text>
      <Text style={styles.space}> </Text>
      <View style={styles.divider} />
{/* End of header section - */}

{/* New contact form. - */}
      <View style={styles.card}>
        <AntDesign name="user-add" size={60} color="black" style={{ alignSelf: 'center'}}/>

        <Text style={styles.space}> </Text> 
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>1. What is their ID number? </Text>
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="ID number" value={id} onChangeText={setID} onFocus={playClickSound} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>2. What is their name? </Text>
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="First and last name" value={name} onChangeText={setName} onFocus={playClickSound} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
         <Text style={[styles.formFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>3. Which department are they in? </Text>
         <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="Department" value={department} onChangeText={setDepartment} onFocus={playClickSound} />
        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>4. What is their phone number? </Text>
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="Phone number" value={phone} onChangeText={setPhone} onFocus={playClickSound} />
        
        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>5. What is their address? </Text>
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="Street address" value={addressStreet} onChangeText={setAddressStreet} onFocus={playClickSound} />
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="City" value={addressCity} onChangeText={setAddressCity} onFocus={playClickSound} />
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="State" value={addressState} onChangeText={setAddressState} onFocus={playClickSound} />
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="ZIP" value={addressZIP} onChangeText={setAddressZIP} onFocus={playClickSound} />
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="Country" value={addressCountry} onChangeText={setAddressCountry} onFocus={playClickSound} />
      </View>

        <TouchableOpacity style={styles.buttonStyle} onPress={handleAddContact}>
          <Text style={[styles.buttonText, { fontSize: textSize, lineHeight: textSize + 6 }]}> SAVE CONTACT </Text>
        </TouchableOpacity> 
        
        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
      
        </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
// End of form.

// Customisation of display. 
const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#262626', padding: 16 }, 
  heading:        { fontFamily: 'trebuchet-bold', color: '#FFFFFF', marginBottom: 16 },
  instruction:    { fontFamily: 'trebuchet', color: '#FFFFFF', lineHeight: 26 },
  formFields:     { fontFamily: 'trebuchet-bold', color: '#262626' },
  buttonStyle:    { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12, marginRight: 16 },
  buttonText:     { fontFamily: 'trebuchet-bold', color: '#262626' },
  card:           { backgroundColor: "#FFFFFF",paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, marginRight: 16 },
  space:          { fontSize: 8, color: "#FFFFFF" }, 
  divider:        { height: 5, backgroundColor: '#CB6D4f', marginVertical: 15 },
  input:          { fontFamily: 'trebuchet', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#262626', borderRadius: 10, padding: 10, marginVertical:5},
  logo:           { width: 110, height: 50, resizeMode: 'contain', alignSelf: 'flex-end', marginBottom: 10, marginRight: 16 },
  topBarContainer:{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
});


