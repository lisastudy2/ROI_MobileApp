import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAudioPlayer} from 'expo-audio';
import { useFonts } from 'expo-font';

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

// Loading approved font.
  const [fontsLoaded] = useFonts({
    'trebuchet': require('../assets/fonts/trebuchet-reg.ttf'), 
    'trebuchet-bold': require('../assets/fonts/trebuchet-bold.ttf'),
  });
  if (!fontsLoaded) {
    return null; 
  } 

// Header section.
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

      <Text style={[styles.heading, { fontSize: textSize, lineHeight: textSize + 6 }]}>VIEW CONTACT DETAILS</Text>
      <Text style={[styles.instruction, { fontSize: textSize, lineHeight: textSize + 6 }]}>
        Press Edit to update details.
      </Text>
      <Text style={styles.space}> </Text>
      <View style={styles.divider} />
{/* End of header section - */} 

{/* Display of contact details. */}
        <View style={styles.card}> 
          <Image source={require('../assets/images/personIcon.png')} style={styles.icon} />
          <Text style={[styles.nameField, { fontSize: textSize + 5, lineHeight: textSize + 6 }]}>{entry.name}</Text>
          <Text style={styles.space}> </Text>
          <Text style={styles.space}> </Text>
          <Text style={[styles.text, { fontSize: textSize, lineHeight: textSize + 6 }]}>
            <Text style={[styles.otherFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>DEPARTMENT: </Text> {entry.department}</Text>
          <Text style={styles.space}> </Text>
          <Text style={styles.space}> </Text>
          <Text style={[styles.text, { fontSize: textSize, lineHeight: textSize + 6 }]}> 
          <Text style={[styles.otherFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>PHONE: </Text>{entry.phone} </Text>
          <Text style={styles.space}> </Text>
          <Text style={styles.space}> </Text>
          <Text style={[styles.otherFields, { fontSize: textSize, lineHeight: textSize + 6 }]}>ADDRESS: </Text>
          <Text style={[styles.text, { fontSize: textSize, lineHeight: textSize + 6 }]}>{entry.addressStreet}</Text>
          <Text style={[styles.text, { fontSize: textSize, lineHeight: textSize + 6 }]}>{entry.addressCity}</Text>
          <Text style={[styles.text, { fontSize: textSize, lineHeight: textSize + 6 }]}>{entry.addressState}</Text>
          <Text style={[styles.text, { fontSize: textSize, lineHeight: textSize + 6 }]}>{entry.addressZIP}</Text>
          <Text style={[styles.text, { fontSize: textSize, lineHeight: textSize + 6 }]}>{entry.addressCountry}</Text> 
          <Text style={styles.space}> </Text>
          <Text style={styles.space}> </Text>
        </View>

{/* Edit contact details  */}
        <TouchableOpacity style={styles.buttonStyle} onPress={() => {playClickSound(); navigation.navigate('EditContact', { entry })}}>
          <Text style={[styles.buttonText, { fontSize: textSize, lineHeight: textSize + 6 }]}> EDIT </Text>
        </TouchableOpacity>  

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#262626', padding: 16 },
  heading:        { fontFamily: 'trebuchet-bold', color: '#FFFFFF', marginBottom: 16 },
  instruction:    { fontFamily: 'trebuchet', color: '#FFFFFF', lineHeight: 26 }, 
  buttonStyle:    { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12, marginRight: 16 }, 
  buttonText:     { fontFamily: 'trebuchet-bold', color: '#262626' },
  card:           { backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, marginRight: 16, alignItems: 'center' },
  text:           { fontFamily: 'trebuchet', color: '#262626', alignSelf: 'center', textAlign: 'center' },
  space:          { fontSize: 8, color: 'black' },
  divider:        { height: 5, backgroundColor: '#CB6D4f', marginVertical: 15 },
  icon:           { width: 60, height: 75, resizeMode: 'contain', alignSelf: 'center', marginLeft: 1 },
  nameField:      { fontFamily: 'trebuchet-bold', color: '#262626', lineHeight: 26 },
  otherFields:    { fontFamily: 'trebuchet-bold', color: '#262626', lineHeight: 26 },
  logo:           { width: 100, height: 50, resizeMode: 'contain', alignSelf: 'flex-end', marginBottom: 10, marginRight: 16 },
  topBarContainer:{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }
});
