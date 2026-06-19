import { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, FlatList, StyleSheet, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactsData from '../Data/ContactsData.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayer} from 'expo-audio';
 
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
  
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
    );
  const loadContacts = async () => {
    try { const data = await AsyncStorage.getItem('contacts');
    if (data !== null) {
      const storedContacts = JSON.parse(data);

    if (storedContacts.length < ContactsData.contacts.length) {
      const merged = [...ContactsData.contacts, ...storedContacts];

    await AsyncStorage.setItem('contacts', JSON.stringify(merged));
    setContacts(merged); 
    } else { 
      setContacts(storedContacts);
  } 

  } else { 
    await AsyncStorage.setItem( 
      'contacts', 
      JSON.stringify(ContactsData.contacts)
      );
      setContacts(ContactsData.contacts);
  } 
  }catch (error) {
    console.log('Error loading: ', error);
  }
  };
 
  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => { 
    const stop = navigation.addListener('focus', loadContacts);
    return stop;
  }, [navigation]);

// Header section - includes elements which appear on each page + instructions for this page.
return (
  <SafeAreaView style={styles.container}>
  
    <View style={styles.topBarContainer}> 

      <View style={[styles.topBarCell, {alignItems: 'flex-start'}]}>
          <TouchableOpacity onPress={() => {playClickSound(); navigation.goBack()}}>
          <Ionicons name="arrow-back" size={35} color="#FFFFFF"/>
          </TouchableOpacity>
      </View>
     
    <View style={{ flex: 1 }} />
    
    <View style={styles.topBarCell}> 
      <TouchableOpacity onPress={() => {playClickSound();navigation.navigate('Home')}}>
        <Image source={require('../assets/images/roiLogo.jpg')} style={styles.logo}/>
      </TouchableOpacity>
    </View>
    </View>

  <FlatList
    style={{ flex: 1 }}
    data={filteredContacts}
    keyExtractor={(item) => item.id}

    ListHeaderComponent={
      <>
      <Text style={[styles.heading, { fontSize: textSize }]}>VIEW CONTACTS</Text>
      <Text style={[styles.instruction, { fontSize: textSize }]}>Select a name to see contact details. </Text>
      <Text style={styles.space}> </Text>
      <TextInput style={[styles.searchInput, { fontSize: textSize }]} placeholder="Search" value={searchText} onChangeText={setSearchText} onFocus={playClickSound}/>
      <View style={styles.divider} />
      </> 
    }
// End of header section 

// Display of contacts list. 
    renderItem={({ item }) => (
      <View style={styles.card}>
        <TouchableOpacity style={styles.cardContent} onPress={() => {playClickSound(); navigation.navigate('ContactDetails', { entry: item })}}>
        <Image source={require('../assets/images/personIcon.png')} style={styles.icon}/>
        <View style={styles.cardContainer}>
        <Text style={[styles.cardName, { fontSize: textSize }]}>{item.name}</Text>
        <Text style={[styles.cardDepartment, { fontSize: textSize - 3 }]}>{item.department}</Text>
        </View>
      </TouchableOpacity>
      </View>
    )}
    />
  </SafeAreaView>
);
}
// End of contacts list. 

// Customisation of display. 
const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#262626', padding: 16 }, 
  heading:        { color: '#FFFFFF', marginBottom: 16 },
  instruction:    { color: '#FFFFFF', lineHeight: 26 },
  card:           { backgroundColor: "#FFFFFF",paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, marginRight: 16},
  cardContent:    { flex:1, flexDirection: 'row', alignItems: 'center' },
  cardName:       { marginLeft: 2 },
  cardDepartment: { color: "black", marginLeft: 2 },
  cardContainer:  { marginLeft: 1, flex: 1 },
  space:          { fontSize: 8, color: "#262626" },
  searchInput:    { height: 60, borderColor: '#ccc', backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom:1, marginRight: 16 },
  divider:        { height: 5, backgroundColor: '#CB6D4f', marginVertical: 15 },
  logo:           { width: 100, height: 50, resizeMode: 'contain', alignSelf: 'flex-end', marginBottom: 10, marginRight: 16 },
  icon:           { width: 60, height: 75, resizeMode: 'contain', alignSelf: 'flex-start', marginLeft: 1 },
  topBarContainer:{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }
});