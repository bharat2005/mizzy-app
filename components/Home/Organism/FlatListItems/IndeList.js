import { View, Text, Dimensions, FlatList } from "react-native";
import React from "react";
import Dim from "../../../../constants/Dim";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";

const IndeList = ({ data }) => {
  const renderItem = ({ item, index }) => (
    <View
      style={{
        backgroundColor: "white",
        width: Dim.width,
        height: 460,
        alignItems: "center",
        marginBottom: 12,
        paddingTop: 18,
      }}
    >
      <View style={{ width: "100%", height: 300 }}>
        <Image
        source={{uri:item?.image}}
          style={{ height: "100%", width: "100%", backgroundColor: "black" }}
        />
      </View>

      <View style={{ width: "100%" , paddingHorizontal:18, marginTop:12}}>
 
       <View>
         <Text style={{fontSize:18, fontFamily:'bold'}}>{item?.title}</Text>
       </View>


      <View>
        <Text style={{fontFamily:'regular', color:'gray', fontSize:14}}>{item?.des}</Text>
      </View>

        <View style={{flexDirection:'row', gap:4, alignItems:'center'}}>
        <Text style={{fontFamily:'bold', fontSize:18}}>₹ {item?.price}</Text>
           <Text style={{textDecorationLine:'line-through', fontFamily:'medium', color:'gray',}}>{item?.fakePrice}</Text>
      </View>

      <View>
        <Text style={{color:'orange', fontFamily:'medium', fontSize:16}}>{item?.discount}%off</Text>
      </View>


      <View style={{flexDirection:'row', alignItems:'center', gap:4}}>
        <AntDesign name="star" size={16} color={Colors.PINK} />
        <Text style={{fontFamily:'bold', color:Colors.PINK, fontSize:16}}>{item?.rating}</Text>
      </View>
      </View>
    </View>
  );

  const renderHeader = () => {
    return (
 
       <View style={{ paddingVertical: 18, paddingHorizontal: 12 , backgroundColor:'white'}}>
       <Text style={{ fontFamily:'bold', fontSize: 24 }}>
           {data?.mainTitle}
         </Text>
       </View>
    )
  }

  return (
    <View style={{ width: Dim.width, backgroundColor: "lightgary" }}>
      <FlatList
        data={data?.metaData}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default IndeList;
