import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";
import MainFlatList from "../../components/Home/Organism/FlatLists/MainFlatList";
import SecondFlatList from "../../components/Home/Organism/FlatLists/SecondFlatList";
import ThirdFlatList from "../../components/Home/Organism/FlatLists/ThirdFlatList";
import FourthFlatList from "../../components/Home/Organism/FlatLists/FourthFlatList";
import FifthFlatList from "../../components/Home/Organism/FlatLists/FifthFlatList";
import SixthFlatList from "../../components/Home/Organism/FlatLists/SixthFlatList";
import Dim from "../../constants/Dim";
import CustomeTabBar from "../../components/Home/Molecule/CustomeTabBar";
import TopHeader from "../../components/Home/Organism/TopHeader/TopHeader";
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "main", title: "Home" },
    { key: "second", title: "Trending" },
    { key: "third", title: "Explore" },
    { key: "fourth", title: "Deals" },
    { key: "fifth", title: "Discover" },
    { key: "sixth", title: "Sale" },
  ]);
  const renderScene = ({ route }) => {
    const props = {scrollhandler}
    switch (route.key) {
      case "main":
        return <MainFlatList {...props} />;
      case "second":
        return <SecondFlatList {...props} />;
      case "third":
        return <ThirdFlatList {...props} />;
      case "fourth":
        return <FourthFlatList {...props} />;
      case "fifth":
        return <FifthFlatList {...props} />;
      case "sixth":
        return <SixthFlatList {...props} />;
    }
  };
  const scrollY = useSharedValue(0);

  const scrollhandler = useAnimatedScrollHandler((event) => {
      scrollY.value = event.contentOffset.y;
    
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0,180],
      [0, -100],
      Extrapolate.CLAMP
    )
    return {
      transform:[{translateY}]
    }
  
  })

  const animatedFadeStyle = useAnimatedStyle(()=>{
    const opacity = interpolate(
      scrollY.value,
      [0, 180],
      [1,0],
      Extrapolate.CLAMP
    )

    return {opacity}
  })


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
      <TopHeader animatedFadeStyle={animatedFadeStyle} routes={routes} setIndex={setIndex} index={index} animatedHeaderStyle={animatedHeaderStyle} />

      <TabView
      swipeEnabled={false}
        renderScene={renderScene}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        initialLayout={{ width: Dim.width }}
        renderTabBar={() => null}
      />
    </SafeAreaView>
  );
};

export default Home;
