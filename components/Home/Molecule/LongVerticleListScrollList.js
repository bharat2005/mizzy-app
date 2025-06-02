import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native'

const LongVerticleListScrollList = ({data, currentIndex, setCurrentIndex}) => {



    const renderItem = ({item, index}) => (
        <TouchableOpacity activeOpacity={1} onPress={()=> setCurrentIndex(index)} style={{height:'100%', backgroundColor:currentIndex === index ? "black" : 'white', borderRadius:24, paddingHorizontal:12, justifyContent:'center', alignItems:'center'}}>
            <Text style={{color: currentIndex === index ? 'white' : 'black', fontFamily:currentIndex === index ? 'bold' : 'light'}}>{item}</Text>
        </TouchableOpacity>
    )
  
  return (
    <View style={{height: 44, width:'100%'}}>
    
    <FlatList 
    contentContainerStyle={{paddingHorizontal:12, gap:18}}
    horizontal
    showsHorizontalScrollIndicator={false}
    data={data}
    keyExtractor={(item, index)=> index.toString()}
    renderItem={renderItem}
    />

    </View>
  )
}

export default LongVerticleListScrollList