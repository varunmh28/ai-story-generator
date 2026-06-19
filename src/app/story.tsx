import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoryReaderScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/bg.jpg')}
      resizeMode="cover" 
      imageStyle={{ opacity: 0.6 }}
      style={styles.background}
    > 
      <SafeAreaView style={styles.container}>
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          style={styles.s1}
        >
          {/* 🌟 Fixed: Changed name to 'chevron-thin-left' so Entypo loads it */}
          <Entypo name='chevron-thin-left' size={22} color="#000000" />
        </Pressable>
        <View style={styles.s2}>
            <ScrollView contentContainerStyle={styles.s3}>
                <Image
                source={require('../../assets/images/read.jpg')}
                resizeMode="cover" 
                style={styles.img}
                />

                <Text style={styles.s4}>
                    {" "}
                    Lorem ipsum dolor sit amet, conse adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </Text>
            </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    rowGap:30
  },
  background: {
    width: '100%',   
    height: '100%',  
    flex: 1,         
  },
  s1: {
    marginLeft: 24,           // ml-6
    marginTop: 30,             // mt-2
    backgroundColor: 'white', 
    width: 44,                // Sized to a perfect circle size
    height: 44,               
    borderRadius: 22,         // Exactly half of width/height for a perfect circle
    justifyContent: 'center', 
    alignItems: 'center',     
    
    // 🌟 Adds that soft drop shadow from the design mockup
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3, 
  },
  s2:{
    flex:1,
    padding:6
  },
  s3:{
    gap:5
  },
  img:{
    width: '100%',            // w-full
    height: 400,              // h-[450px]
    borderRadius: 16,         // rounded-2xl = 1rem = 16px
    backgroundColor: '#E5E7EB', // bg-gray-200
    
 
    // 🌟 shadow (Tailwind's base shadow translation for cross-platform)
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  s4:{
    fontSize:15,
    fontStyle:'normal',
    fontWeight:500,
    padding:6
  }
});