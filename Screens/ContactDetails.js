import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewScreen({ route, navigation }) {
  const { entry } = route.params;

// Adjusts text size.
const [textSize, setTextSize] = useState(16);
useEffect(() => {
  const loadSettings = async () => {
    const savedSize = await AsyncStorage.getItem('textSize');
    if (savedSize) {
      setTextSize(parseFloat(savedSize)); } }; loadSettings();}, []);

// Header section - includes elements which appear on each page + instructions for this page.
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={[styles.topBarCell, { alignItems: 'flex-start' }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/backButton.png')}
              style={styles.backButton}
            />
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

      <Text style={styles.heading}>VIEW CONTACT DETAILS</Text>
      <Text style={styles.instruction}>
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
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('EditContact', { entry: item })}>
          <Text style={[styles.buttonText, { fontSize: textSize }]}> EDIT </Text>
        </TouchableOpacity>  

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#262626', padding: 16 },
  heading: { fontSize: 20, color: '#FFFFFF', marginBottom: 16 },
  instruction: { fontSize: 20, color: '#FFFFFF', lineHeight: 26 }, 
  buttonStyle: {backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12 }, 
  buttonText: { color: '#262626', fontSize: 16 },
  card: { backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10, marginRight: 16, alignItems: 'center' },
  cardContent: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  cardName: { marginLeft: 2 },
  cardContainer: { marginLeft: 1, flex: 1 },
  text:    { color: '#262626', alignSelf: 'center' },
  space: { fontSize: 8, color: 'black' },
  divider: { height: 5, backgroundColor: '#CB6D4f', marginVertical: 15 },
  icon: { width: 60, height: 75, resizeMode: 'contain', alignSelf: 'center', marginLeft: 1 },
  nameField: { color: '#262626', lineHeight: 26, fontWeight: 'bold' },
  otherFields: {color: '#262626', lineHeight: 26, fontWeight: 'bold' },
  logo: { width: 100, height: 50, resizeMode: 'contain', alignSelf: 'flex-end', marginBottom: 10, marginRight: 16 },
  topBarContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  backButton: { width: 80, height: 40, resizeMode: 'contain', marginHorizontal: -16 },
});
