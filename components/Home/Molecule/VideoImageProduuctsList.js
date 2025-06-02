import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { Image } from 'expo-image'
import Feather from '@expo/vector-icons/Feather';
import Colors from '../../../constants/Colors';

const VideoImageProduuctsList = ({data}) => {

    const renderItem = ({item, index}) => {
return (
    <View style={{height:80, width:280, borderWidth:1, borderColor:'lightgray', borderRadius:12, flexDirection:'row', alignItems:'center', paddingHorizontal:12, justifyContent:'space-around'}}>

        <View style={{height:60, width:60}}>
            <Image source={{uri:item?.image}} style={{backgroundColor:'black', height:'100%', width:'100%', borderRadius:8}}/>
        </View>

        <View style={{height:60, width:160, justifyContent:'space-between', paddingHorizontal:8}}>
            <Text numberOfLines={1} style={{fontSize:18, fontFamily:'bold', color:'black'}}>
                {item?.title}
            </Text>

                        <Text numberOfLines={2} style={{fontFamily:'medium', color:'gray', fontSize:12}}>
                {item?.des}
            </Text>

        </View>

        <Pressable  >
<Feather name="heart" size={24} color="lightgray" />
        </Pressable>

    </View>
)
    }
  
  return (
    <View style={{width:'100%'}}>
    
    <FlatList
    showsHorizontalScrollIndicator={false}
    horizontal
    data={data}
    contentContainerStyle={{gap:18, paddingHorizontal:18, paddingVertical:12,}}
    keyExtractor={(item, index)=> index.toString()}
    renderItem={renderItem}
    />
    </View>
  )
}

export default VideoImageProduuctsList