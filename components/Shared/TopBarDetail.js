import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated from 'react-native-reanimated';
import Dim from '../../constants/Dim';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CartBadge from './CartBadge';

const TopBar = ({animatedTopBar, animatedTitle, data}) => {
    const insets = useSafeAreaInsets()
    const router = useRouter()

  return (
    <Animated.View style={[{flexDirection:'row', height:50, alignItems:'center', paddingHorizontal:12, position:'absolute', width:Dim.width, top:insets.top, zIndex:10}, animatedTopBar]}>

<Animated.View style={[{paddingHorizontal:12}, animatedTitle]}>
<Text style={{fontSize:18, fontFamily:'bold'}}>{data?.title}</Text>
</Animated.View>


<View style={{flexDirection:'row',  marginLeft:'auto'}}>

        <Pressable onPress={() => router.push('/(main)/likes')} style={{marginHorizontal:12}}>
         <Feather name="heart" size={24} color="black" />
</Pressable>

    <Pressable onPress={() => router.push('/(main)/cart')} style={{marginHorizontal:12}}>
<CartBadge />
</Pressable>


<Pressable onPress={() => router.back()} style={{marginHorizontal:12}}>
<AntDesign name="close" size={24} color="black" />
</Pressable>


</View>

    </Animated.View>
  )
}

export default TopBar