import { View, Text } from "react-native";
import React from "react";
import Dim from "../../../../constants/Dim";
import ScrollableList from "../../Molecule/ScrollableList";
import VideoImageFlatList from "../../Molecule/VideoImageFlatList";
import { useState } from "react";
import VideoImageTagList from "../../Molecule/VideoImageTagList";
import VideoImageProduuctsList from "../../Molecule/VideoImageProduuctsList";

const DynamicVideoImage = ({ data }) => {
  const [currrentIndex, setCurrentIndex] = useState(0);
  const topNameList = data?.data.map((item) => item.topName);

  const onScroll = (event) => {
    const value = event.nativeEvent.contentOffset.x;
    setCurrentIndex(Math.round(value / Dim.width));
  };

  return (
    <View style={{ backgroundColor: "white", width: Dim.width, gap: 12 }}>
      <View style={{ padding: 12, paddingHorizontal:18 }}>
        <Text style={{ fontSize: 26, fontFamily:'bold' }}>
          {data?.mainTitle}
        </Text>
      </View>

      <ScrollableList data={topNameList} currrentIndex={currrentIndex} setCurrentIndex={setCurrentIndex} />

<View>
    <VideoImageFlatList data={data?.data} onScroll={onScroll} currrentIndex={currrentIndex} />

        <VideoImageTagList data={data?.data[currrentIndex]?.tags} />

        <VideoImageProduuctsList   data={data?.data[currrentIndex]?.metaDataList}  />



</View>

    
    </View>
  );
};

export default DynamicVideoImage;
