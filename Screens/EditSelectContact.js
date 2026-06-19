import { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, FlatList, StyleSheet, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactsData from '../Data/ContactsData.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home({ navigation }) {

const [contacts, setContacts] = useState([]);

// Search functionality.
const [searchText, setSearchText] = useState('');
const filteredContacts = Array.isArray(contacts)
  ? contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

// Loading contacts list. 
const loadContacts = async () => {
  const data = await AsyncStorage.getItem('contacts');
    if (data) {
      setContacts(JSON.parse(data));
    } else {
      setContacts(ContactsData.contacts);
    }
  }; 

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
  
// Header section
return (
  <SafeAreaView style={styles.container}>

    <View style={styles.topBarContainer}> 

      <View style={[styles.topBarCell, {alignItems: 'flex-start'}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={35} color="#FFFFFF"/>
        </TouchableOpacity>
      </View>
     
    <View style={{ flex: 1 }} />
    
    <View style={styles.topBarCell}> 
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
    <Text style={[styles.heading, { fontSize: textSize }]}>EDIT CONTACTS</Text>
    <Text style={[styles.instruction, { fontSize: textSize }]}>Select a name to edit contact details. </Text>
    <Text style={styles.space}> </Text>
    <TextInput style={[styles.searchInput, { fontSize: textSize }]} placeholder="Search" value={searchText} onChangeText={setSearchText}/>
    <View style={styles.divider} />
      </> 
    }
// End of header section 

    renderItem={({ item }) => (
      <View style={styles.card}>
        <TouchableOpacity style={styles.cardContent} onPress={() => navigation.navigate('EditContact', { entry: item })}>
        <Image source={require('../assets/images/editIcon.png')} style={styles.icon}/>
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

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#262626', padding: 16 }, 
  heading:        { color: '#FFFFFF', marginBottom: 16 },
  instruction:    { color: '#FFFFFF', lineHeight: 26 },
  buttonStyle:    { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16,alignItems: 'center', marginTop: 12 },
  buttonText:     { color: '#262626' },
  card:           { backgroundColor: "#FFFFFF",paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, marginRight: 16},
  cardContent:    { flex:1, flexDirection: 'row', alignItems: 'center' },
  cardName:       { marginLeft: 2},
  cardDepartment: { color: "black", marginLeft: 2 },
  cardContainer:  { marginLeft: 1, flex: 1 },
  space:          { fontSize: 8, color: "black" },
  searchInput:    { height: 60, borderColor: '#ccc', backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom:1, marginRight: 16 },
  divider:        { height: 5, backgroundColor: '#CB6D4f', marginVertical: 15 },
  icon:           { width: 60, height: 75, resizeMode: 'contain', alignSelf: 'flex-start', marginLeft: 1 },
  logo:           { width: 100, height: 50, resizeMode: 'contain', alignSelf: 'flex-end', marginBottom: 10, marginRight: 16 },
  topBarContainer:{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }
});