import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Feather } from '@expo/vector-icons'
import { getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useAuth } from '../../contexts/AuthContextProvider'

const CartBadge = () => {
  const {cartLength} = useAuth()



  return (
<View>
  <Feather name="shopping-cart" size={24} color="black" />
  <View style={{width:18, height:18, borderRadius:9, backgroundColor:'red', position:'absolute', top:-6, right:-6, justifyContent:'center', alignItems:'center'}}>
   <Text style={{color:'white'}}>{cartLength.length}</Text>
  </View>
</View>
  )
}

export default CartBadge