import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import TopBarDetail from '../../components/Shared/TopBarDetail'
import Animated, { Extrapolate, Extrapolation, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import Dim from '../../constants/Dim'
import DetailScrollView from '../../components/Detail/Organism/DetailScrollView'
import { productData } from '../../mockData'
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams } from 'expo-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import fetchProductData from '../../features/mainList/queries/fetchProductData'
import { useAuth } from '../../contexts/AuthContextProvider'
import { mutateLike, onMutateLike, useLike } from '../../features/mainList/mutate/mutateLike'
import AntDesign from '@expo/vector-icons/AntDesign';
import LikeButton from '../../components/Shared/LikeButton'
import AddtoCartButton from '../../components/Shared/AddtoCartButton'




const Detail = () => {
    const {productId} = useLocalSearchParams()
 const {data, isLoading} = useQuery({
  queryKey:['productData', productId],
  queryFn:() => fetchProductData(productId)
 })

  const insets = useSafeAreaInsets()
  const scrollY = useSharedValue(0)





  const scrollHandler = useAnimatedScrollHandler((event)=> {
    scrollY.value = event.contentOffset.y
  })

  const animatedTopBar = useAnimatedStyle(()=> {
    const style = interpolate(
      scrollY.value,
      [0,240],
      [0,1],Extrapolate.CLAMP
    )
    return{
      backgroundColor:`rgba(255, 255, 255, ${style})`

    }
  })

  const animatedTitle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0,240],
      [0,1],
      Extrapolate.CLAMP
    ) 
    return {opacity}
  })



    
  return (
    <SafeAreaView  style={{flex:1, backgroundColor:'white'}}>
      <TopBarDetail animatedTopBar={animatedTopBar} animatedTitle={animatedTitle} data={data} />

<DetailScrollView scrollHandler={scrollHandler} data={data}/>

<View style={{width:Dim.width, height:70, backgroundColor:'white', position:'absolute', bottom:insets.bottom, left:0, right:0, flexDirection:'row', paddingHorizontal:12, alignItems:'center'}}>

<View  style={{borderRadius:18, justifyContent:'center', height:55, marginHorizontal:8, width:55, borderWidth:0.5, borderColor:'gray', alignItems:'center'}}>
<LikeButton productId={productId} />

</View>

<AddtoCartButton productId={productId} />

</View>











<TouchableOpacity style={{position:'absolute', left:12, bottom:insets.bottom + 85, height:44, width:44, backgroundColor:'white', borderRadius:30, justifyContent:'center', alignItems:'center'}}>

<Feather name="arrow-left" size={28} color="gray" />
</TouchableOpacity>

<View style={{position:'absolute', right:12, bottom:insets.bottom + 85, gap:18}} >

  <TouchableOpacity style={{height:44, width:44, backgroundColor:'pink', borderRadius:30, justifyContent:'center', alignItems:'center'}}  >

  </TouchableOpacity>

</View>
    </SafeAreaView>
  )
}

export default Detail