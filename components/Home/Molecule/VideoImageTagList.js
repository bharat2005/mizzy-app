import { View, Text } from 'react-native'
import React from 'react'
import Dim from '../../../constants/Dim'
import { FlatList } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const VideoImageTagList = ({data}) => {



    const renderItem = ({item, index}) => (
        <View style={{height:32, backgroundColor:index === 0 ? '#5f42f4' : '#e5308d', borderRadius:18, paddingHorizontal:6, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
{index === 1 ? (
<MaterialCommunityIcons name="flower-tulip" size={18} color="white" />
) : (
      <Ionicons name="flower" size={18} color="white" /> 
)}
       
  <Text style={{fontFamily:'bold', color:'white', marginHorizontal:8}}>{item.text}</Text>
     
      
        </View>
    )



  return (
    <View style={{ width:'100%'}}>
        <FlatList 
        data={data}
        contentContainerStyle={{paddingHorizontal:18, gap:12, paddingVertical:8}}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}

        />
    
    </View>
  )
}

export default VideoImageTagList