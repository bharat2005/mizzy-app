import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Menu } from 'react-native-paper'
import Colors from '../../constants/Colors'

const MyMenu = ({productId, item, cartLength, mutate}) => {
      const [isMenuOpen, setIsMenuOpen] = useState(false)

    
const check = (productId) => {
  return cartLength.find(item => item.docId === productId)
}


  return (
<Menu onDismiss={()=> setIsMenuOpen(false)} anchor={
  <Button buttonColor={Colors.LIGHTPINK} labelStyle={{fontFamily:'bold'}} style={{width:59}} onPress={()=> setIsMenuOpen(true)}>
  
  Qty: {check(item?.docId)?.quantity} 
  </Button>
} visible={isMenuOpen}>
<Menu.Item title={1} onPress={()=> {mutate({productId: item?.docId, quantity: 1}); setIsMenuOpen(false)}}  />
<Menu.Item title={2} onPress={()=> {mutate({productId: item?.docId, quantity: 2}); setIsMenuOpen(false)}}  />
<Menu.Item title={3} onPress={()=> {mutate({productId: item?.docId, quantity: 3}); setIsMenuOpen(false)}}  />
  <Menu.Item title={4} onPress={()=> {mutate({productId: item?.docId, quantity: 4}); setIsMenuOpen(false)}}  />
<Menu.Item title={5} onPress={()=> {mutate({productId: item?.docId, quantity: 5}); setIsMenuOpen(false)}}  />
<Menu.Item title={6} onPress={()=> {mutate({productId: item?.docId, quantity: 6}); setIsMenuOpen(false)}}  />

</Menu>
  )
}

export default MyMenu