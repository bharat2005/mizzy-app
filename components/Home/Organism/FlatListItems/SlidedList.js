import { View, Text, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import Dim from "../../../../constants/Dim";
import { chunckArray } from "../../../../util/funtions";
import { Image } from "expo-image";
import Colors from "../../../../constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';

const SlidedList = ({ data }) => {
  const chunckedData = chunckArray(data?.metaData, 6);
  const [currentPage, setCurrentPage] = useState(0)


  const onScroll = (event)=> {
    setCurrentPage(Math.round(event.nativeEvent.contentOffset.x /Dim.width))

  }


  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: Dim.width }}>
        <FlatList
          data={item}
          numColumns={3}
          contentContainerStyle={{ paddingVertical: 18, gap: 12 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: 260,
                width: Dim.width / 3,
                alignItems: "center",
        
              }}
            >
              <View
                style={{
                  width: (Dim.width / 3) * 0.9,
                  height: (Dim.width / 3) * 0.9,
                }}
              >
                <Image
                source={{uri:item?.image}}
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius:12,
                    backgroundColor: "black",
                  }}
                />
              </View>

              <View style={{ width:'90%'}}>
                <View style={{ flexDirection: "row", gap:4, alignItems:'center' }}>
                  <Text style={{fontFamily:'bold', fontSize:16}}>₹ {item?.price}</Text>
                  <Text style={{ textDecorationLine: "line-through", fontFamily:'light', color:'gray', fontSize:12 }}>
                    {item?.fakePrice}
                  </Text>
                </View>

                <View>
                  <Text style={{ color: "orange" , fontFamily:'regular'}}> {item?.discount}% off</Text>
                </View>

                <View >
                  <Text numberOfLines={1} style={{ fontSize: 16 , fontFamily:'bold'}}>{item?.title}</Text>
                </View>

                <View>
                  <Text numberOfLines={2} style={{fontFamily:'light', color:'gray', fontSize:12}}>{item?.des}</Text>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', gap:3}}>
                  <AntDesign name="star" size={14} color={Colors.PINK} />
                  <Text style={{fontFamily:'bold', color:Colors.PINK}}>{item?.rating}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={{ width: Dim.width, backgroundColor: "white" }}>
      <View style={{ paddingHorizontal: 12, paddingVertical: 18 }}>
        <Text style={{ fontSize: 24, fontFamily:'bold' }}>
          {data?.mainTitle}
        </Text>
      </View>

      <FlatList
        onScroll={onScroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={chunckedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <View style={{ height: 50, flexDirection:'row', width:'100%', justifyContent:'center', alignItems:'center' }}>

        {chunckedData.map((item,index)=>(
            <View key={index} style={{marginHorizontal:8, height:8, width:8, borderRadius:4, backgroundColor:index === currentPage ? 'black' : 'gray'}}>
                </View>
        ))}
      </View>
    </View>
  );
};

export default SlidedList;
