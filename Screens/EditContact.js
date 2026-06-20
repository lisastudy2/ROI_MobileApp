import { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAudioPlayer} from 'expo-audio';
import { useFonts } from 'expo-font';
 
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


// Saves contact details. 
  const handleUpdateContact = async () => {

  if ( !id || !name || !department || !phone ) {
    playErrorSound();
    Alert.alert(
      "Missing details",
      "Please make sure all questions have answers."
    );
    return;
  }
  
    try { 
      const existing = await AsyncStorage.getItem('contacts');
      const contacts = existing ? JSON.parse(existing) : [];

      const updatedContacts = contacts.map(contact =>
        contact.id === entry.id
        ? {id, name, department, phone, addressStreet, addressCity, addressState, addressZIP, addressCountry}: contact);

      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      playSuccessSound();
      Alert.alert(
        "Success!",
        "Contact details have been updated.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate('Home')
        }
      ]
      );
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

        playDeleteSound();

        setTimeout(() => {
          Alert.alert(
            "Deleted!",
            "Contact was successfully deleted.", 
            [
              {
                text: "OK",
                onPress: () => navigation.navigate('Home')
              }
            ]
          );
        }, 100);

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
      <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={[styles.topBarCell, { alignItems: 'flex-start' }]}>
          <TouchableOpacity onPress={() => {playClickSound(); 
          setTimeout(() => {
            navigation.goBack();
            }, 300);}}>
          <Ionicons name="arrow-back" size={35} color="#FFFFFF"/>
          </TouchableOpacity>
        </View>
        
    <View style={[styles.topBarCell, { marginLeft: 10}]}> 
      <TouchableOpacity onPress={() => {playClickSound();navigation.navigate('Home')}}>
        <AntDesign name="home" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>

        <View style={{ flex: 1 }} />

        <View style={styles.topBarCell}>
          <TouchableOpacity onPress={() => {playClickSound();navigation.navigate('Home')}}>
            <Image
              source={require('../assets/images/roiLogo.jpg')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </View>

<ScrollView>
  <Text style={[styles.heading, { fontSize: textSize, lineHeight: textSize + 6 }]}>EDIT CONTACT DETAILS</Text>
  <Text style={[styles.instruction, { fontSize: textSize, lineHeight: textSize + 6 }]}>Please update details then save.</Text>
  <Text style={styles.space}> </Text>
  <View style={styles.divider} />
{/* End of header section - */}
      <View style={styles.card}>
        <Image source={require('../assets/images/editIcon.png')} style={styles.icon} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>1. What is their ID number? </Text>
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="ID number" value={id} onChangeText={setID} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>2. What is their name? </Text>
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="First and last name" value={name} onChangeText={setName} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
         <Text style={[styles.formFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>3. Which department are they in? </Text>
         <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="Department" value={department} onChangeText={setDepartment} />

        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>4. What is their phone number? </Text>
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="Phone number" value={phone} onChangeText={setPhone} />
        
        <Text style={styles.space}> </Text>
        <Text style={styles.space}> </Text>
        <Text style={[styles.formFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>5. What is their address? </Text>
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="Street address" value={addressStreet} onChangeText={setAddressStreet} />
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="City" value={addressCity} onChangeText={setAddressCity} />
        <TextInput style={[styles.input, { fontSize: textSize }]} placeholder="State" value={addressState} onChangeText={setAddressState} />
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="ZIP" value={addressZIP} onChangeText={setAddressZIP} />
        <TextInput style={[styles.input, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="Country" value={addressCountry} onChangeText={setAddressCountry} />
      </View>

        <TouchableOpacity style={styles.buttonStyle} onPress={handleUpdateContact}>
          <Text style={[styles.buttonText, { fontSize: textSize, lineHeight: textSize + 6 }]}> SAVE UPDATES </Text>
        </TouchableOpacity> 
        
        <Text style={styles.space}> </Text>

        <TouchableOpacity style={styles.buttonStyle} onPress={handleDeleteContact}>
        <Text style={[styles.buttonText, { fontSize: textSize, lineHeight: textSize + 6 }]}> DELETE CONTACT </Text>
        </TouchableOpacity>
        <Text style={styles.space}> </Text> 
        <Text style={styles.space}> </Text>

        </ScrollView>
    </SafeAreaView> 
  );
}
 

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#262626', padding: 16 }, 
  heading:        { fontFamily: 'trebuchet-bold', fontSize: 20, color: '#FFFFFF', marginBottom: 16 },
  instruction:    { fontFamily: 'trebuchet', fontSize: 20, color: '#FFFFFF', lineHeight: 26 },
  formFields:     { fontFamily: 'trebuchet-bold', fontSize: 16, color: '#262626' },
  buttonStyle:    { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12, marginRight: 16 },
  buttonText:     { fontFamily: 'trebuchet-bold', color: '#262626', fontSize: 16 },
  card:           { backgroundColor: "#FFFFFF",paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, marginRight: 16 },
  cardContent:    { flex:1, flexDirection: 'row', alignItems: 'center' },
  cardContainer:  { marginLeft: 1, flex: 1 },
  space:          { fontSize: 8, color: "black" }, 
  divider:        { height: 5, backgroundColor: '#CB6D4f', marginVertical: 15 },
  icon:           { width: 60, height: 75, resizeMode: 'contain', alignSelf: 'center', marginLeft: 1 },
  name:           { fontFamily: 'trebuchet', color: '#262626', lineHeight: 26 },
  department:     { fontFamily: 'trebuchet', color: '#262626', lineHeight: 26 },
  phone:          { fontFamily: 'trebuchet', color: '#262626', lineHeight: 26 },
  address:        { fontFamily: 'trebuchet',  color: '#262626', lineHeight: 26 },
  input:          { fontFamily: 'trebuchet', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#262626', borderRadius: 10, padding: 10, marginVertical:5},
  logo:           { width: 110, height: 50, resizeMode: 'contain', alignSelf: 'flex-end', marginBottom: 10, marginRight: 16 },
  topBarContainer:{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  backButton:     { width: 80, height: 40, resizeMode: 'contain', marginHorizontal: -16 },
});