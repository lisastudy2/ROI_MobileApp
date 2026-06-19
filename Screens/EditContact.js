import { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
 
 // Contact details which need to pre-fill the form.
export default function ViewScreen({ route, navigation }) {
  const { entry } = route.params;
  const [id, setID] = useState(entry.id);
  const [name, setName] = useState(entry.name);
  const [department, setDepartment] = useState(entry.department);
  const [phone, setPhone] = useState(entry.phone);
  const [addressStreet, setAddressStreet] = useState(entry.addressStreet);
  const [addressCity, setAddressCity] = useState(entry.addressCity);
  const [addressState, setAddressState] = useState(entry.addressState);
  const [addressZIP, setAddressZIP] = useState(entry.addressZIP);
  const [addressCountry, setAddressCountry] = useState(entry.addressCountry);
  const handleUpdateContact = async () => {
    try { 
      const existing = await AsyncStorage.getItem('contacts');
      const contacts = existing ? JSON.parse(existing) : [];

      const updatedContacts = contacts.map(contact =>
        contact.id === entry.id
        ? {id, name, department, phone, addressStreet, addressCity, addressState, addressZIP, addressCountry}: contact);

      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));

      navigation.navigate('ContactsList');

    } catch (error) {
      console.log('Error saving:', error);

    }
    
  };

// Deleting contact details. 
    const handleDeleteContact = async () => {
      Alert.alert(
        "Delete Contact",
        "Wait! Are you sure you want to delete this contact?",
        [ { text: "No, lets cancel", style: "cancel" },
          { text: "Yes, I am sure", style: "destructive", 
          onPress: async () => {
      try { 
        const existing = await AsyncStorage.getItem('contacts');
        const contacts = existing ? JSON.parse(existing) : [];

        const updatedContacts = contacts.filter( contact => String(contact.id) !== String(entry.id ));

        await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));

        navigation.navigate('ContactsList'); 

      } catch (error) {
        console.log('Error deleting:', error);
      }}}
    ]);};

// Display saved text settings.
const [textSize, setTextSize] = useState(16);
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', async () => {
    const savedSize = await AsyncStorage.getItem('textSize');
    if (savedSize) {
      setTextSize(parseFloat(savedSize)); 
      }}); 
      return unsubscribe;}, [navigation]);


  return (
      <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={[styles.topBarCell, { alignItems: 'flex-start' }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={35} color="#FFFFFF"/>
            
          </TouchableOpacity>
        </View>

{/*} Home button is on screens where the user is more than 1 screen away from the Home (so this way we do not have 3 buttons [back, home and the logo] which all go Home on the same screen - the logo has also been setup to take users Home too on every screen).*/}
    <View style={[styles.topBarCell, { marginLeft: 10}]}> 
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <AntDesign name="home" size={30} color="#FFFFFF" />
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

      <View style={styles.card}>
        <Image source={require('../assets/images/editIcon.png')} style={styles.icon} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={styles.formFields}>1. What is their ID number? </Text>
        <TextInput style={styles.input} placeholder="ID number" value={id} onChangeText={setID} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={styles.formFields}>2. What is their name? </Text>
        <TextInput style={styles.input} placeholder="First and last name" value={name} onChangeText={setName} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
         <Text style={styles.formFields}>3. Which department are they in? </Text>
         <TextInput style={styles.input} placeholder="Department" value={department} onChangeText={setDepartment} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={styles.formFields}>4. What is their phone number? </Text>
        <TextInput style={styles.input} placeholder="Phone number" value={phone} onChangeText={setPhone} />
        
        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={styles.formFields}>5. What is their address? </Text>
        <TextInput style={styles.input} placeholder="Street address" value={addressStreet} onChangeText={setAddressStreet} />
        <TextInput style={styles.input} placeholder="City" value={addressCity} onChangeText={setAddressCity} />
        <TextInput style={styles.input} placeholder="State" value={addressState} onChangeText={setAddressState} />
        <TextInput style={styles.input} placeholder="ZIP" value={addressZIP} onChangeText={setAddressZIP} />
        <TextInput style={styles.input} placeholder="Country" value={addressCountry} onChangeText={setAddressCountry} />
      </View>

        <TouchableOpacity style={styles.buttonStyle} onPress={handleUpdateContact}>
          <Text style={styles.buttonText}> SAVE UPDATES </Text>
        </TouchableOpacity> 
        
        <Text style={styles.space}> </Text>

        <TouchableOpacity style={styles.buttonStyle} onPress={handleDeleteContact}>
        <Text style={[styles.buttonText, { fontSize: textSize }]}> DELETE CONTACT </Text>
        </TouchableOpacity>
        <Text style={styles.space}> </Text> 
        <Text style={styles.space}> </Text>

        </ScrollView>
    </SafeAreaView> 
  );
}
 

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
});