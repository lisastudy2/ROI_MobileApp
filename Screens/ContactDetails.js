import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAudioPlayer} from 'expo-audio';

export default function ViewScreen({ route, navigation }) {
  const { entry } = route.params;

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
  
// Header section.
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={[styles.topBarCell, { alignItems: 'flex-start' }]}>
          <TouchableOpacity onPress={() => {playClickSound(); navigation.goBack()}}>
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
          <TouchableOpacity onPress={() => {playClickSound();navigation.navigate('Home')}}>
            <Image
              source={require('../assets/images/roiLogo.jpg')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </View>

<ScrollView>

      <Text style={[styles.heading, { fontSize: textSize }]}>VIEW CONTACT DETAILS</Text>
      <Text style={[styles.instruction, { fontSize: textSize }]}>
        Select a name to see contact details:{' '}
      </Text>
      <Text style={styles.space}> </Text>
      <View style={styles.divider} />
{/* End of header section - */}

{/* Display of contact details. */}
        <View style={styles.card}> 
          <Image source={require('../assets/images/personIcon.png')} style={styles.icon} />
          <Text style={[styles.nameField, { fontSize: textSize + 5 }]}>{entry.name}</Text>
          <Text style={styles.space}> </Text>
          <Text style={[styles.text, { fontSize: textSize }]}>
            <Text style={[styles.otherFields, { fontSize: textSize }]}>DEPARTMENT: </Text> {entry.department}</Text>
          <Text style={[styles.text, { fontSize: textSize }]}> 
            <Text style={[styles.otherFields, { fontSize: textSize }]}>PHONE: </Text>{entry.phone} </Text>
            <Text style={[styles.otherFields, { fontSize: textSize }]}>ADDRESS: </Text>
          <Text style={[styles.text, { fontSize: textSize }]}>{entry.addressStreet}</Text>
          <Text style={[styles.text, { fontSize: textSize }]}>{entry.addressCity}</Text>
          <Text style={[styles.text, { fontSize: textSize }]}>{entry.addressState}</Text>
          <Text style={[styles.text, { fontSize: textSize }]}>{entry.addressZIP}</Text>
          <Text style={[styles.text, { fontSize: textSize }]}>{entry.addressCountry}</Text> 
        </View>

{/* Edit contact details  */}
        <TouchableOpacity style={styles.buttonStyle} onPress={() => {playClickSound(); navigation.navigate('EditContact', { entry })}}>
          <Text style={[styles.buttonText, { fontSize: textSize }]}> EDIT </Text>
        </TouchableOpacity>  

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#262626', padding: 16 },
  heading:        { color: '#FFFFFF', marginBottom: 16 },
  instruction:    { color: '#FFFFFF', lineHeight: 26 }, 
  buttonStyle:    { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12, marginRight: 16 }, 
  buttonText:     { color: '#262626' },
  card:           { backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, marginRight: 16, alignItems: 'center' },
  cardContent:    { flex: 1, flexDirection: 'row', alignItems: 'center' },
  cardName:       { marginLeft: 2 },
  cardContainer:  { marginLeft: 1, flex: 1 },
  text:           { color: '#262626', alignSelf: 'center' },
  space:          { fontSize: 8, color: 'black' },
  divider:        { height: 5, backgroundColor: '#CB6D4f', marginVertical: 15 },
  icon:           { width: 60, height: 75, resizeMode: 'contain', alignSelf: 'center', marginLeft: 1 },
  nameField:      { color: '#262626', lineHeight: 26, fontWeight: 'bold' },
  otherFields:    {color: '#262626', lineHeight: 26, fontWeight: 'bold' },
  logo:           { width: 100, height: 50, resizeMode: 'contain', alignSelf: 'flex-end', marginBottom: 10, marginRight: 16 },
  topBarContainer:{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }
});
