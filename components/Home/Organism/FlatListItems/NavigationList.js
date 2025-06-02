import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Dim from "../../../../constants/Dim";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { naviggations } from "../../../../mockData";

const NavigationList = ({ data }) => {
  const router = useRouter()
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => router.push({pathname:'/category', params:{categoryId:item.name}})} style={{ width:80, height:80,  backgroundColor: "white", justifyContent:'center', alignItems:'center' }}>
        <View style={{height:34, width:34}}>
          <Image source={naviggations[item.name]} style={{height:'100%', width:'100%'}}/>
        </View>
        <Text style={{color:'black', fontFamily:'regular'}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ height: 180, width: Dim.width, backgroundColor: "white" }}>
      <ScrollView

        horizontal
        contentContainerStyle={{alignItems:'center', padding:8}}
        showsHorizontalScrollIndicator={false}
      >

        <FlatList 
        data={data.images}
        renderItem={renderItem}
        numColumns={Math.ceil(data.images.length /2)}
        style={{gap:8}}
        columnWrapperStyle={{gap:8}}
        />
      </ScrollView>
 
    </View>
  );
};

export default NavigationList;
