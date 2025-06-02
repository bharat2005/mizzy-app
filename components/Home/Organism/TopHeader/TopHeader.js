import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Dim from '../../../../constants/Dim'
import CustomeTabBar from '../../Molecule/CustomeTabBar'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LogoHeader from '../../Molecule/LogoHeader'
import SearchBar from '../../Molecule/SearchBar'


const TopHeader = ({routes, setIndex, index, animatedHeaderStyle, animatedFadeStyle}) => {
  const insets = useSafeAreaInsets()
  return (
    <Animated.View style={[{height:190, paddingTop:insets.top - 8, width:Dim.width,backgroundColor:'white', position:'absolute', zIndex:1}, animatedHeaderStyle]}>


<Animated.View style={animatedFadeStyle}>


  <LogoHeader />

<SearchBar />

</Animated.View>


<CustomeTabBar routes={routes} setIndex={setIndex} index={index} />


    </Animated.View>
  )
}

export default TopHeader