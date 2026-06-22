import { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, FlatList, StyleSheet, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactsData from '../Data/ContactsData.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayer} from 'expo-audio';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';

// Enable navigation. 
export default function Home({ navigation }) {

// Contacts data.
const [contacts, setContacts] = useState([]);

// Search input.
const [searchText, setSearchText] = useState('');

// Search filtering. 
const filteredContacts = Array.isArray(contacts)
  ? contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())) : [];

// Loading contacts from AsyncStorage or default data. 
const loadContacts = async () => {
  const data = await AsyncStorage.getItem('contacts');
    if (data) {
      setContacts(JSON.parse(data));
    } else {
      setContacts(ContactsData.contacts);
    }
  }; 

// Reload contacts when screen comes into focus. 
  useEffect(() => { 
    const stop = navigation.addListener('focus', loadContacts);
    return stop;
  }, [navigation]);

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
    'trebuchet-bold': require('../assets/fonts/trebuchet-bold.ttf'),
  });
  if (!fontsLoaded) {
    return null; 
  } 
  
// Header section
return (
  <SafeAreaView style={styles.container}>

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
      <TouchableOpacity onPress={() => {playClickSound();navigation.navigate('Home')}}>
        <AntDesign name="home" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
        
    <View style={{ flex: 1 }} />
    
    <View style={styles.topBarCell}> 
      <TouchableOpacity onPress={() => {playSuccessSound();navigation.navigate('Home')}}>
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
    <Text style={[styles.heading, { fontSize: textSize, lineHeight: textSize + 6 }]}>EDIT CONTACTS</Text>
    <Text style={[styles.instruction, { fontSize: textSize, lineHeight: textSize + 6 }]}>Select a name to edit contact details. </Text>
    <Text style={styles.space}> </Text>
    <TextInput style={[styles.searchInput, { fontSize: textSize, lineHeight: textSize + 6 }]} placeholder="Search" value={searchText} onChangeText={setSearchText} onFocus={playClickSound} />
    <View style={styles.divider} />
      </> 
    }

  ListEmptyComponent={ searchText !== '' ? (
      <Text style={{ color: '#FFFFFF', textAlign: 'center', marginTop: 20, marginRight: 16, fontSize: textSize }}>
        No results found - Check spelling and try again. 
      </Text>
    ) : null
  }
// End of header section 

// Display list of contacts for editing selection.  
    renderItem={({ item }) => (
      <View style={styles.card}>
        <TouchableOpacity style={styles.cardContent} onPress={() => {playClickSound(); navigation.navigate('EditContact', { entry: item })}}>
        <Image source={require('../assets/images/editIcon.png')} style={styles.icon}/>
        <View style={styles.cardContainer}>
        <Text style={[styles.cardName, { fontSize: textSize, lineHeight: textSize + 6 }]}>{item.name}</Text>
        <Text style={[styles.cardDepartment, { fontSize: textSize - 3, lineHeight: textSize + 6 }]}>{item.department}</Text>
        </View>
      </TouchableOpacity>
      </View>
    )}
    />
  </SafeAreaView>

);
}

// Style customisations. 
const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#262626', padding: 16 }, 
  heading:        { fontFamily: 'trebuchet-bold', color: '#FFFFFF', marginBottom: 16 },
  instruction:    { fontFamily: 'trebuchet', color: '#FFFFFF', lineHeight: 26 },
  card:           { backgroundColor: "#FFFFFF",paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, marginRight: 16},
  cardContent:    { flex:1, flexDirection: 'row', alignItems: 'center' },
  cardName:       { fontFamily: 'trebuchet-bold', marginLeft: 2},
  cardDepartment: { fontFamily: 'trebuchet', color: "black", marginLeft: 2 },
  cardContainer:  { marginLeft: 1, flex: 1 },
  space:          { fontSize: 8, color: "black" },
  searchInput:    { fontFamily: 'trebuchet', height: 60, borderColor: '#ccc', backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom:1, marginRight: 16 },
  divider:        { height: 5, backgroundColor: '#CB6D4f', marginVertical: 15 },
  icon:           { width: 60, height: 75, resizeMode: 'contain', alignSelf: 'flex-start', marginLeft: 1 },
  logo:           { width: 100, height: 50, resizeMode: 'contain', alignSelf: 'flex-end', marginBottom: 10, marginRight: 16 },
  topBarContainer:{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }
});