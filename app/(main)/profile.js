import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useAuth } from '../../contexts/AuthContextProvider'

const Profile = () => {
  const {logout} = useAuth()
  return (
    <View style={{justifyContent:"center", alignItems:'center', flex:1}}>
     <Button  mode='contained' onPress={async()=> await logout()}>Logout</Button>
    </View>
  )
}

export default Profile