import Entypo from '@expo/vector-icons/Entypo';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Button, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
type StoryLine ={text: string , prompt: string};

export default function StoryReaderScreen() {

    const router = useRouter();
    const {story} = useLocalSearchParams();
    const [index, setIndex] = useState(0);
    const [imageUrls , setImageUrls] = useState<string[]>([]);
    const [loading , setLoading] = useState(true);

    const onPrev = () => setIndex((i) => Math.max(0, i - 1));
    const onNext = () => setIndex((i) => Math.min(lines.length - 1, i + 1));
  



    const lines: StoryLine[] =  useMemo(() => {
        try {
            const raw = Array.isArray(story) ? story[0] : story;
            return JSON.parse(raw ?? "[]");
        } catch {
            return []
        }
    }, [story])

    const current = lines[index];

    useEffect(() => {
       
      if(!lines.length) return;  
        
     
      async function loadImages(){
        
        try {
            const results = await Promise.all(   // here promise.all returns an array of all image urls and by dynamically results is declared an array
                lines.map(async (line) => {
                    try{
                        const res = await fetch("/api/image", {
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body: JSON.stringify({prompt: line.prompt}),
                        })
                        if(!res.ok) return "";
                        const data = await res.json();
                        return data.imageUrl as string;
                        
                    } catch{
                        return "";
                    }
                })
            )

            setImageUrls(results);
        } finally{
            setLoading(false);
        }
      }
      loadImages()
    },[story])


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
                {
                  loading? (
                    <View style={styles.s7} >
                        <ActivityIndicator size="large" />
                        <Text style={styles.s6}>Preparing Visuals...</Text>
                    </View>
                  ) : 
                  
                  imageUrls[index]?(       // if imageUrls have a value at current index
                    <Image
                    source={{uri: imageUrls[index]}}
                    resizeMode="cover" 
                    style={styles.img}
                    />
                  ): null
                }
               

                <Text style={styles.s4}>
                    {current?.text ?? "No story available"}
                </Text>
            </ScrollView>

            <View style={styles.s5} >
                <Button title='Previous' onPress={onPrev} disabled={index===0}/>
                <Text style={styles.s6}> {lines.length ? index+1 : 0}/{lines.length} </Text>
                <Button title='Next' onPress={onNext} disabled={index==lines.length-1} />
            </View>
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
  },
  s5:{
    flexDirection: 'row',     // flex-row
    justifyContent: 'space-between', // justify-between
    alignItems: 'center',     // items-center
    marginTop: 24,
  },
  s6:{
    fontSize: 16,             // text-base (1rem = 16px)
    lineHeight: 24,           // Tailwind automatically pairs text-base with a 24px line height
    color: '#374151',         // text-gray-700
  },
  s7:{
    alignItems: 'center',        // items-center
    justifyContent: 'center',    // justify-center
    paddingVertical: 32,         // py-8 = 8 * 4px = 32px
    gap: 8,                      // gap-2 = 2 * 4px = 8px
  }
});