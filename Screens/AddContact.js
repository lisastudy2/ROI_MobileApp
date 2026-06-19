import { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
 
export default function ViewScreen({ route, navigation }) {

// Adjusts text size.
const [textSize, setTextSize] = useState(16);
useEffect(() => {
  const loadSettings = async () => {
    const savedSize = await AsyncStorage.getItem('textSize');
    if (savedSize) {
      setTextSize(parseFloat(savedSize)); } }; loadSettings();}, []);

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
const handleAddContact = async () => { const newContact = {id, name, department, phone, addressStreet, addressCity, addressState, addressZIP, addressCountry};

  try { 
    const existing = await AsyncStorage.getItem('contacts');
    const contacts = existing ? JSON.parse(existing) : [];
    contacts.push(newContact);
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    Alert.alert("Success", "Contact has been saved", [ 
      { text: "OK", onPress: () => navigation.navigate('Home')}], {cancelable: false });

  } catch (error) {
    console.log('Error saving:', error);

  }
};

  return (
// Keyboard pop-up does not cover text on screen.
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      
      <View style={styles.topBarContainer}> 

        <View style={[styles.topBarCell, {alignItems: 'flex-start'}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/backButton.png')} style={styles.backButton}/>
          </TouchableOpacity>
        </View>
      
        <View style={{ flex: 1 }} />
        
        <View style={styles.topBarCell}> 
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/images/roiLogo.jpg')} style={styles.logo}/>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} keyboardShouldPersistTaps="handled">

      <Text style={styles.heading}>ADD NEW CONTACT</Text>
      <Text style={styles.instruction}>Please fill in details of new contact and save.</Text>
      <Text style={styles.space}> </Text>
      <View style={styles.divider} />
{/* End of header section - */}

{/* New contact form. - */}
      <View style={styles.card}>
        <AntDesign name="user-add" size={60} color="black" style={{ alignSelf: 'center'}}/>

        <Text style={styles.space}> </Text> 
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize }]}>1. What is their ID number? </Text>
        <TextInput style={[styles.input, { fontSize: textSize }]} placeholder="ID number" value={id} onChangeText={setID} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize }]}>2. What is their name? </Text>
        <TextInput style={[styles.input, { fontSize: textSize }]} placeholder="First and last name" value={name} onChangeText={setName} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
         <Text style={[styles.formFields, { fontSize: textSize }]}>3. Which department are they in? </Text>
         <TextInput style={[styles.input, { fontSize: textSize }]} placeholder="Department" value={department} onChangeText={setDepartment} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize }]}>4. What is their phone number? </Text>
        <TextInput style={[styles.input, { fontSize: textSize }]} placeholder="Phone number" value={phone} onChangeText={setPhone} />
        
        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize }]}>5. What is their address? </Text>
        <TextInput style={[styles.input, { fontSize: textSize }]} placeholder="Street address" value={addressStreet} onChangeText={setAddressStreet} />
        <TextInput style={[styles.input, { fontSize: textSize }]} placeholder="City" value={addressCity} onChangeText={setAddressCity} />
        <TextInput style={[styles.input, { fontSize: textSize }]} placeholder="State" value={addressState} onChangeText={setAddressState} />
        <TextInput style={[styles.input, { fontSize: textSize }]} placeholder="ZIP" value={addressZIP} onChangeText={setAddressZIP} />
        <TextInput style={[styles.input, { fontSize: textSize }]} placeholder="Country" value={addressCountry} onChangeText={setAddressCountry} />
      </View>

        <TouchableOpacity style={styles.buttonStyle} onPress={handleAddContact}>
          <Text style={styles.buttonText}> SAVE CONTACT </Text>
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
  heading:        { fontSize: 20, color: '#FFFFFF', marginBottom: 16 },
  instruction:    { fontSize: 20, color: '#FFFFFF', lineHeight: 26 },
  formFields:     { fontSize: 16, color: '#262626' },
  buttonStyle:    { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12, marginRight: 16 },
  buttonText:     { color: '#262626', fontSize: 16 },
  card:           { backgroundColor: "#FFFFFF",paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, marginRight: 16 },
  cardContent:    { flex:1, flexDirection: 'row', alignItems: 'center' },
  cardContainer:  { marginLeft: 1, flex: 1 },
  space:          { fontSize: 8, color: "#FFFFFF" }, 
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
});


