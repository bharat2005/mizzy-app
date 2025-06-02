import { View, Text, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';


const Search = () => {
    const router = useRouter()
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
      <View style={{width:'100%', flexDirection:'row', paddingHorizontal:18, alignItems:'center'}}>

<Pressable onPress={()=> router.back()}>
<Entypo name="chevron-thin-left" size={24} color="black" style={{marginRight:18}} />
</Pressable>

    <TextInput style={{
                 height: 44,
                 flex:1,
                 backgroundColor: "white",
                 paddingHorizontal: 12,
                 borderRadius: 8,
                 borderWidth: 1,
                 borderColor: "balck",
        }}  />

      </View>
    </SafeAreaView>

    </TouchableWithoutFeedback>

  )
}

export default Search