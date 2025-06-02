import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { useAuth } from '../..//contexts/AuthContextProvider'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import  Colors  from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import LoveLogo from '../../assets/svg/LoveLogo'
import { LinearGradient } from 'expo-linear-gradient'

const MainLayout = () => {
  const {likesLength, cartLength} = useAuth()
  return (
<Tabs screenOptions={{headerShown:false, tabBarActiveTintColor:Colors.RED}}>
    <Tabs.Screen name='home' 
    options={{
      tabBarIcon:({color, size})=> (
        <AntDesign name="home" size={size} color={color} />
      ),
      tabBarLabel:'Home'
    }}
    />
      <Tabs.Screen name='likes'
          options={{
      tabBarIcon:({color, size})=> (
     <Feather name="heart" size={size -2} color={color} />
      ),
      tabBarLabel:'Favorites'
    }}
      
      />
        <Tabs.Screen name='love'
                  options={{
                    tabBarActiveTintColor:Colors.PINK,
                    
      tabBarIcon:({color, size})=> (
    <View style={{height:60, width:60,  position:'absolute', bottom:4 }}>
      <LinearGradient colors={['white',Colors.PINK]} start={{x:0, y:0}} end={{x:1, y:1}} style={{height:'100%', width:'100%', borderRadius:30,}}>
         <LoveLogo />
      </LinearGradient>

    </View>
      ),
      tabBarLabel:'LOVE'
    }}
        
        />



          <Tabs.Screen name='profile'
                    options={{
      tabBarIcon:({color, size})=> (
<Ionicons name="person" size={size - 2} color={color} />
      ),
      tabBarLabel:'Profile'
    }}
          
          />
            <Tabs.Screen name='cart' options={{
              tabBarBadge:cartLength ? cartLength.length : null,
              tabBarIcon:({color, size})=> (
                <Feather name="shopping-cart" size={size - 2} color={color} />
              ),
              tabBarLabel:'Cart'
              }}/>
</Tabs>
  )
}

export default MainLayout