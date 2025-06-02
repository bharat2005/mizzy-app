import { View, Text, FlatList } from "react-native";
import React, { useEffect, useRef } from "react";
import Dim from "../../../constants/Dim";
import { Image } from "expo-image";
import { useState } from "react";
import {} from 'expo-linear-gradient'

const VideoImageFlatList = ({ data, onScroll, currrentIndex }) => {
  const flatListRef = useRef(null)

useEffect(()=> {
  
      flatListRef.current.scrollToIndex({
        index: currrentIndex,
        animated: true,
      });
 

}, [currrentIndex])

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: Dim.width,
          height: '100%',
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ height: "100%", width: "90%", borderRadius: 12,  }}>
          <Image
          source={{uri:item?.image}}
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              backgroundColor: "cyan",
              borderRadius: 12,
            }}
          />
          

          <View
            style={{
              marginTop: "auto",
              flexDirection: "row",
              paddingHorizontal: 12,
              paddingVertical:5,
              gap: 12,
              width: "100%",
              alignItems: "center",
            }}
          >
            <View style={{ height: 48, width: 48, backgroundColor:'white', borderRadius:25, padding:8}}>
              <Image
              source={{uri:item?.brandImage}}
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "black",
                  borderRadius: 25,
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text numberOfLines={2} style={{color:'white', fontFamily:'bold', backgroundColor:'rgba(0,0,0,0.4)', padding:8, borderRadius:12}}>
                {item?.des}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ width: Dim.width, height: 250 }}>
      <FlatList
      ref={flatListRef}
    pagingEnabled
        data={data}
        horizontal
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default VideoImageFlatList;
