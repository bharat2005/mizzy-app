import { View, Text, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import Dim from '../../../../constants/Dim'
import { FlatList } from 'react-native'
import { Image } from 'expo-image'
import Entypo from '@expo/vector-icons/Entypo';

const ImageList = ({data}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
const flatListRef = useRef(null)

const scrollToIndex = (index) => {

    flatListRef?.current?.scrollToIndex({
        index, 
        animation:true
    })
    
    

    
}
    


    const renderItem = ({item, index}) => {
        return (
            <View style={{width:Dim.width, height:Dim.height * 0.55}}>

                <Image source={{uri:item}} style={{height:'100%', width:'100%', backgroundColor:'black'}} />

            </View>
        )
    }


    const onScroll = (event) => {
        setCurrentImageIndex(Math.round(event.nativeEvent.contentOffset.x / Dim.width))
    }


  return (
<View style={{width:Dim.width, height:Dim.height * 0.55}}>

    <FlatList 
    ref={flatListRef}
    onScroll={onScroll}
    horizontal
    pagingEnabled
    data={data?.specialArray ? data?.specialArray : data?.images}
    keyExtractor={(item,index)=> index.toString()}
    renderItem={renderItem}
    />
    

    {currentImageIndex === 0 ||                    <Pressable onPress={()=> scrollToIndex(currentImageIndex - 1)} style={{position:'absolute', left:12, bottom:'50%' }}>
<Entypo name="chevron-thin-left" size={28} color="white" />
                </Pressable> }

{currentImageIndex === (data?.images.length -1) ||                             <Pressable onPress={()=> scrollToIndex(currentImageIndex + 1)}  style={{position:'absolute', right:12, bottom:'50%' }}>
<Entypo name="chevron-thin-right" size={28} color="white" />
                </Pressable> }



</View>
  )
}

export default ImageList