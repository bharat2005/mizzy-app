import { View, Text } from "react-native";
import React, { useState } from "react";
import Dim from "../../../../constants/Dim";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "expo-image";

const MainCrousal = ({ data }) => {
  const [imageIndex, setImageIndex] = useState(1);

  const renderItem = ({ item, index, setSwipeEnabled }) => (
    <View style={{ height: "100%", width: "100%", backgroundColor: "black" }}>
      <Image source={{ uri: item }} style={{ height: "100%", width: "100%" }} />
    </View>
  );

  return (
    <View>
      <Carousel
        loop
        autoPlay
        onSnapToItem={(i) => setImageIndex(i)}
        width={Dim.width}
        autoPlayInterval={2500}
        height={240}
        data={data.images}
        renderItem={renderItem}
      />
            <View
        style={{
          position: "absolute",
          opacity: 0.7,
          height: 30,
          width: 70,
          borderTopLeftRadius:18,
        borderBottomLeftRadius:18,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          bottom:8,
          right:0
        }}
      >
        <Text style={{color:'white'}}>
          {" "}
          {imageIndex + 1} / {data?.images.length}
        </Text>
      </View>
    </View>
  );
};

export default MainCrousal;
