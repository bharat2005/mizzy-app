import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Dim from '../../../../constants/Dim'
import LongVerticleListScrollList from '../../Molecule/LongVerticleListScrollList'
import LongVerticleListPaginList from '../../Molecule/LongVerticleListPaginList'
import { LinearGradient } from 'expo-linear-gradient'

const LongVerticleList = ({data}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const titleList = data?.data.map(item => item.title)




          const chunckArray = (array, size) => {
          return Array.from({length: Math.ceil(array.length / size)}, (item, index)=> {
              return array.slice(index * size, (index * size) + size )
          })
      }





  return (
    <View style={{width:Dim.width, backgroundColor:'white', gap:12,}}>
      <LinearGradient colors={['#fdecff', '#efeaff', '#eff8ff']} start={{x:0, y:1}} end={{x:1, y:1}}>
        
        <View style={{paddingHorizontal:18, paddingVertical:8}}>
      <Text style={{fontSize:26, fontFamily:'bold'}}>{data?.mainTitle}</Text>
        </View>

        <LongVerticleListScrollList data={titleList} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />

        <LongVerticleListPaginList data={data?.data[currentIndex]?.metaDataList} chunckArray={chunckArray} currentIndex={currentIndex}/>

      </LinearGradient>


    </View>
  )
}

export default LongVerticleList