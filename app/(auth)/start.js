import { View, Text, Keyboard, Image } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import RegForm from '../../components/Auth/Molecule/RegForm'
import { TouchableWithoutFeedback } from 'react-native'
import LogInForm from '../../components/Auth/Molecule/LogInForm'
import Logo from '../../assets/svg/logo'
import Colors from '../../constants/Colors'

const start = () => {
  const [authMode, setAuthMode] = useState('register')
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex:1, justifyContent:'', alignItems:'center', backgroundColor:'white', padding:24}}>

            <View style={{ backgroundColor:'', width:'100%', alignItems:'center', margin:30}}>

             <Logo />

              <View style={{height:50, width:'100%' }}>
                <Text style={{color:'lightgray', fontFamily:'regular', fontSize:16, textAlign:'center'}}>Join the fashion fam — sign up to unlock exclusive styles, deals, and more!</Text>

              </View>

            </View>
      
<View style={{flexDirection:'row', gap:18, marginBottom:18}}>
  
  <Button
    labelStyle={{fontFamily:'bold', fontSize:18}}
      rippleColor={Colors.REDSTROCK}
  textColor={Colors.RED}
  
  
  onPress={()=> setAuthMode('register')}>Register</Button>

    <Button
    
    labelStyle={{fontFamily:'bold', fontSize:18}}
      rippleColor={Colors.PINKSTROCK}
  textColor={Colors.PINK}
    
    onPress={()=> setAuthMode('login')}>Login</Button>
</View>

{authMode === 'register' ? (
  <RegForm />
) :(
<LogInForm />
)}
    </View>

    </TouchableWithoutFeedback>

  )
}

export default start