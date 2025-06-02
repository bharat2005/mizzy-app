import { View, Text, FlatList } from "react-native";
import React from "react";
import Dim from "../../../../constants/Dim";
import { Image } from "expo-image";
import Colors from "../../../../constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';

const QList = ({ data }) => {



const renderItem = ({item, index})=>(
  <View style={{ width:180, alignItems:'center'}}>

    <View style={{height:180, width:180}}>
      <Image source={{uri:item?.image}} style={{backgroundColor:'black', height:'100%', width:'100%', borderRadius:12}} />
    </View>

    <View style={{width:'100%'}}>

      <View>
        <Text style={{fontSize:18, fontFamily:'bold'}}>{item?.title}</Text>
      </View>

      <View>
        <Text numberOfLines={2} style={{fontFamily:'regular', color:'gray', fontSize:14}}>{item?.des}</Text>
      </View>

        <View style={{flexDirection:'row', gap:4}}>
        <Text style={{fontFamily:'bold', fontSize:16}}>₹ {item?.price}</Text>
           <Text style={{textDecorationLine:'line-through', fontFamily:'medium', color:'gray',}}>{item?.fakePrice}</Text>
      </View>

      <View>
        <Text style={{color:'orange', fontFamily:'medium'}}>{item?.discount}%off</Text>
      </View>


      <View style={{flexDirection:'row', alignItems:'center', gap:4}}>
        <AntDesign name="star" size={14} color={Colors.PINK} />
        <Text style={{fontFamily:'bold', color:Colors.PINK}}>{item?.rating}</Text>
      </View>
      
    </View>


  </View>
)





  return (
    <View style={{ width: Dim.width, backgroundColor: "white", height: 420 }}>
      <View style={{ position: "absolute", width: Dim.width, height: 200 }}>
        <View style={{ flex: 1, backgroundColor: "#83d4df" }} />
      </View>

      <View style={{ paddingVertical: 18, paddingHorizontal: 12 }}>
        <Text style={{ fontFamily:'bold', fontSize: 24 }}>
          {data?.mainTitle}
        </Text>
        <Text style={{fontFamily:'regular'}}>{data?.subTitle}</Text>
      </View>

      <FlatList
      data={data?.metaData}
      contentContainerStyle={{gap:12, paddingHorizontal:12}}
      keyExtractor={(item, index)=> index.toString()}
      horizontal
      renderItem={renderItem}
      />
    </View>
  );
};

export default QList;
