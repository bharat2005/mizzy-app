import { View, Text } from 'react-native'
import React from 'react'
import Dim from '../../../../constants/Dim'
import { FlatList } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image'
import Colors from '../../../../constants/Colors'

const QuadList = ({data}) => {


    const renderItem = ({item, index})=> {
        return (
            <View style={{flex:1, height:300,  alignItems:'center', paddingHorizontal:12}}>

                <View style={{width:Dim.width/2 * 0.9, height:Dim.width/2 * 0.9,  }}>
                    <Image source={{uri:item?.image}} style={{height:'100%', backgroundColor:'black', width:'100%'}} />
                </View>

                <View style={{width:'100%'}}>
                  
                  <View>
                    <Text numberOfLines={1} style={{fontSize:18, fontFamily:'bold'}}>{item?.title}</Text>
                  </View>

                        
                  <View style={{flexDirection:'row', alignItems:'center', gap:4}}>
                    <Text style={{fontFamily:'bold', fontSize:16}}>₹ {item?.price}</Text>
                     <Text style={{textDecorationLine:'line-through', fontFamily:'medium', color:'gray'}}>{item?.fakePrice}</Text>
                  </View>


                    <View>
   <Text style={{color:'orange', fontFamily:'medium'}}>{item?.discount}%off</Text>
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', gap:4}}>
                      <AntDesign name="star" size={16} color={Colors.PINK} />
                        <Text style={{color:Colors.PINK, fontFamily:'bold'}}>{item?.rating}</Text>
                    </View>
                
                    
                </View>
            </View>
        )
    }



  return (
    <View style={{backgroundColor:'white', width:Dim.width}}>
      
      <View  style={{paddingVertical:24, paddingHorizontal:12}}>
        <Text style={{fontFamily:'bold', fontSize:24}} >{data?.mainTitle}</Text>
      </View>

      <FlatList 
      data={data?.metaData}

      numColumns={2}
      keyExtractor={(item, index)=> index.toString()}
      renderItem={renderItem}
      />
    </View>
  )
}

export default QuadList