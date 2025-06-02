import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Colors  from '../../../constants/Colors'


const ScrollableList = ({data, currrentIndex,setCurrentIndex}) => {
    const flatListRef = useRef(null)



    useEffect(()=> {
        if (!(flatListRef.current)) return;
        flatListRef.current.scrollToIndex({
            index:currrentIndex,
            viewPosition:0.5,
            animation:true
        })

    },[currrentIndex])


    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={()=> setCurrentIndex(index)} style={{backgroundColor:currrentIndex === index ? 'black' : 'white', justifyContent:'center',  borderRadius:34, alignItems:'center'}}>
                <Text style={{fontFamily: currrentIndex === index ?'bold' : 'light', margin:12, color: currrentIndex === index ? 'white' :'black' , fontSize:14}}>{item}</Text>
            </TouchableOpacity>
        )
    }
  return (
    <View >
        <FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap:12, paddingHorizontal:12}}
horizontal
data={data}
keyExtractor={(item, index) => index.toString()}
style={{backgroundColor:'white'}}
renderItem={renderItem}
/>

    </View>

  )
}

export default ScrollableList