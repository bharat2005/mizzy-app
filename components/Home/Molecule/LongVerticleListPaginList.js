import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Dim from '../../../constants/Dim'
import { Image } from 'expo-image'
import Feather from '@expo/vector-icons/Feather';
import { useRef } from 'react';

const LongVerticleListPaginList = ({data, chunckArray, currentIndex}) => {
  const [currrentChunckedArray, setCurrentChunckedArray] = useState([])
  const flatListRef = useRef(null); 
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    if (data?.length) {
      setCurrentChunckedArray(chunckArray(data, 5));

      requestAnimationFrame(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      });
    } else {
      setCurrentChunckedArray([]);
    }
  }, [data]);



  const renderItem = ({item, index}) => {
    return (
      <View style={{height:'100%', width:Dim.width , justifyContent:'center', alignItems:'center'}}>

      <View style={{height:'100%', width:"85%", borderRadius:12,gap:6 }}>

        {item?.map((item, index) => (
          <View key={index} style={{height:120, width:'100%',  flexDirection:'row', alignItems:'center'}}>

            <View style={{height:120, width:120}}>
              <Image source={{uri:item?.image}} style={{height:'100%', width:'100%', backgroundColor:'black', borderRadius:8}} />
              </View>


              <View style={{height:'80%', width:Dim.width * 0.4, justifyContent:'space-between', padding:8}}>
                <Text numberOfLines={1} style={{fontSize:20, fontFamily:'bold'}}>{item.title}</Text>

              <View style={{flexDirection:'row',alignItems:'center', gap:6}}>
                                <Text numberOfLines={1} style={{fontSize:18, fontFamily:'bold'}}>₹{item.price}</Text>
                                                <Text numberOfLines={1} style={{fontSize:12, fontFamily:'light', textDecorationLine:'line-through', color:'gray'}}>{item.price}</Text>

                                                    <Text numberOfLines={1} style={{fontSize:14, fontFamily:'regular',color:'orange'}}>{item.discount}%off</Text>
                </View>


                <Text numberOfLines={2} style={{fontFamily:"medium", color:'gray'}}>{item.des }</Text>
                </View>


            <Pressable style={{marginLeft:'auto', height:'100%', padding:12, justifyContent:'center'}}>
              
                    <Feather name="heart" size={24} color="gray" />
            </Pressable>

            </View>
        ))}

      </View>
      </View>
    )
  }


  const onScroll = (event) => {
    setCurrentPage(Math.round(event.nativeEvent.contentOffset.x / Dim.width))

  }




  return (<View style={{paddingVertical:18, borderRadius:12}}>
 
    <View style={{width:Dim.width, height:630,  justifyContent:'center', alignItems:'center'}}>


        <FlatList 
        ref={flatListRef}
        onScroll={onScroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index)=> index.toString()}
        data={currrentChunckedArray}
        renderItem={renderItem}


        />

    </View>

    <View style={{height:30, marginTop:8, width:Dim.width, flexDirection:'row', justifyContent:"center", alignItems:'flex-end'}} >

      {currrentChunckedArray.map((item,index)=> (
        <View key={index} style={{height:8, width:8, borderRadius:4, marginHorizontal:8, backgroundColor:currentPage === index ? 'black' : 'lightgray'}}>
          </View>
      ))}

    </View>
    </View>
  )
}

export default LongVerticleListPaginList