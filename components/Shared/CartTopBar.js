import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

const TopBar = () => {
    const router = useRouter()

  return (
    <View style={{flexDirection:'row', height:50, alignItems:'center', paddingHorizontal:12}}>

<Pressable onPress={()=> router.back()} style={{marginRight:12}}>
<Entypo name="chevron-thin-left" size={24} color="black"  />
</Pressable>

<Text style={{fontSize:18}}>My CArt</Text>

<View style={{flexDirection:'row',  marginLeft:'auto'}}>

<Pressable onPress={{}} style={{marginHorizontal:12}}>
<Feather name="heart" size={24} color="black" />
</Pressable>


</View>

    </View>
  )
}

export default TopBar