import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContextProvider';
import { Badge } from 'react-native-paper';
import Colors from '../../constants/Colors';

const TopBar = () => {
    const router = useRouter()
          const {likesLength, cartLength=[]} = useAuth()

  return (
    <View style={{flexDirection:'row', height:50, alignItems:'center', paddingHorizontal:12}}>

<Pressable onPress={()=> router.back()} style={{marginRight:12}}>
<Entypo name="chevron-thin-left" size={24} color="black"  />
</Pressable>

<Text style={{fontSize:18}}>Favourites</Text>

<View style={{flexDirection:'row',  marginLeft:'auto'}}>

<Pressable onPress={{}} style={{marginHorizontal:12}}>
<Feather name="shopping-cart" size={24} color="black" />
            <Badge visible={cartLength.length > 0}  size={18}  style={{position:'absolute', top:-6, right:-6, backgroundColor:Colors.RED}} >
            <Text style={{fontSize:14}}>{cartLength.length}</Text>
            </Badge>

</Pressable>


</View>

    </View>
  )
}

export default TopBar