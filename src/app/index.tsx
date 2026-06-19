import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import "../global.css";

export default function HomeScreen() {
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
          placeholder='Type your idea...'
          // value={seed}
          // onChangeText={setSeed}
          // editable-{!loading}
          style={styles.input}
          />
        </View>
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
    rowGap:5,
    flexDirection:'row'
  },
  c7:{
    flex:1,
    backgroundColor:'white',
  //  borderCurve:'circular',
    borderWidth:2,
    borderColor:'#F2F2F2',
    padding:5,
    borderRadius:30,
    
  },
  input:{
    paddingHorizontal:6,
    fontSize:15
  }

  
});
