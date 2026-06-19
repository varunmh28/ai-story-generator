import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import "../global.css";

export default function HomeScreen() {
  const [seed, setSeed] = useState("");
  const [loading , setLoading] = useState(false);


  const onGenerate = async () => {
      if(!seed.trim()){
        Alert.alert("Please enter a sentence");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch('/api/story', {
          method: 'POST',
          headers:{"Content-type": "application/json"},
          body: JSON.stringify({seed})
        })

        if(!res.ok) throw new Error('Failed to generate the story');

        const data = await res.json();

        router.push({
          pathname: '/story',
          params: {story: JSON.stringify(data.story)}
        })


      } catch (e) {
        Alert.alert("Error" , (e as Error).message);
      }

      finally{
        setLoading(false);
      }
  }




  return (
    // <View style={styles.container}>
   
      <ImageBackground
        source={require('../../assets/images/bg.jpg')}
        resizeMode="cover" // Controls how the image crops/stretches
        
        style={styles.background}
       
      >
        <View style={styles.c1}>
          <View style={styles.c4}>
            <View>
            <Text style={styles.c3}>AI That Writes</Text>
            <Text style={styles.c3}>for you</Text>
          </View>
          <Text style={styles.c5}>Stories made from your ideas</Text>
         
        </View>

       <View style={styles.c6}>
        <View style={styles.c7}>
          <TextInput 
          placeholder="What story is waiting inside you?"
          value={seed}
          onChangeText={setSeed}
          // editable-{!loading}
          // style={styles.input}
          style={[styles.input, seed.length === 0 ? styles.italicPlaceholder : styles.normalInput]}
          />
        </View>
        <TouchableOpacity 
        disabled={loading}
        onPress={onGenerate}
        style={styles.c9}
        >
          <Text style={styles.c10}>
            {loading ? "Generating...":"Generate Story"}
            </Text>
        </TouchableOpacity>
       </View>



        </View>
       
      </ImageBackground>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the outer view fills the screen
  },
  background: {
    width: '100%',   // Full width
    height: '100%',  // Full height
    flex: 1,         // Allows children inside to use flexbox alignment
    justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  c1:{flex:1,
     padding:6, 
     justifyContent:'center',
      rowGap:20,

  },
  c2:{
    flex: 1,
    rowGap: 8,                  // gap-y-2 = 2 * 4px = 8px
  },
  c3: {
    fontSize: 38,               // text-5xl is typically 48px
    fontWeight: '600',          // font-semibold = 600
    textAlign: 'center',
    
  },
  c4:{
    rowGap:2
  },
  c5:{
    fontSize:18,
    textAlign:'center',
     color:'#737373'
  },
  c6:{
    rowGap:16,  //gap btwn input and generate
    
  },
  c7:{
 
    backgroundColor:'white',
  //  borderCurve:'circular',
    borderWidth:2,
    borderColor:'#F2F2F2',
    padding:5,
    borderRadius:30,
    
    
    
  },
  input:{
    paddingHorizontal:18,
    fontSize:15,
    fontStyle:'italic'
    
    
  },
  c9:{
    
    backgroundColor:'#3350D6',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
    padding:16,
    
  },
  c10:{
    color:'white',
    fontStyle:'normal',
    fontWeight:600
  },
  italicPlaceholder: {
    fontStyle: 'italic',
  },
  // 🌟 Make sure this exact key name matches your component code
  normalInput: {
    fontStyle: 'normal',
  },
  
});
