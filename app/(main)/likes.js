import { View, Text, FlatList, Dimensions, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LikesTopBar from '../../components/Shared/LikesTopBar'
import { useAuth } from '../../contexts/AuthContextProvider'
import { useQueries, useQuery } from '@tanstack/react-query'
import { collection, doc, getDoc, getDocs, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import LikeButton from '../../components/Shared/LikeButton'
import FavButton from '../../components/Shared/FavButton'
import Colors  from '../../constants/Colors'

const Likes = () => {
  const {user} = useAuth()
const {data:likesLength} = useQuery({
  queryKey:['likedProducts'],
  queryFn:async() => {
    const res = await getDocs(doc(db, 'users', user?.uid, 'likes'))
    const data = res.docs.map(item => item.id)
    return data
  },
  enabled: !!user?.uid
})
const {data, isLoading} = useQuery({
  queryKey:['favrouitProducts'],
  queryFn:async() => {
    const res = await Promise.all(likesLength.map(item => {
     return getDoc(doc(db, 'Tops', item))
    }))
    const data = res.map(item => ({...item.data(), docId: item.id}))
   return data
  },

})




const renderItem = ({item, index}) => {
  return (
    <View style={{width:Dimensions.get('screen').width/ 3, alignItems:'center', marginVertical:12}}>

      <View style={{height:(Dimensions.get('screen').width /3) * 0.9, width: (Dimensions.get('screen').width /3) * 0.9}}>

      <Image source={{uri:item?.image}} style={{height:'100%', width:'100%', backgroundColor:'black', borderRadius:6}} />

      </View>

<View style={{height:38, width:'90%', justifyContent:'space-between', paddingHorizontal:12, flexDirection:'row', alignItems:'center'}}>

  <Text style={{fontFamily:'bold', color:Colors.PINK}}>₹ {item?.price}</Text>

<FavButton productId={item?.docId}/>

</View>

    </View>
  )
}

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
     <LikesTopBar />

     <View style={{flex:1}}>

      <FlatList 
      data={data}
      numColumns={3}
      keyExtractor={(item, index)=> index.toString()}
      renderItem={renderItem}
      />

     </View>
    </SafeAreaView>
  )
}

export default Likes