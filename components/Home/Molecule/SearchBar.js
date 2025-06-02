import { View, Text, Pressable } from "react-native";
import React, { useReducer } from "react";
import RollingBar from "react-native-rolling-bar";
import Feather from "@expo/vector-icons/Feather";
import Dim from "../../../constants/Dim";
import { useRouter } from 'expo-router'
import Colors from '../../../constants/Colors'

const SearchBar = () => {
  const router = useRouter()
  return (
    <View
      style={{
        width: "100%",
        padding: 4,
        alignItems: "center",
      }}
    >
      <Pressable
      onPress={() => router.push('/search')}
        style={{
          height: 44,
          width: Dim.width * 0.9,
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          paddingHorizontal: 12,
          borderRadius: 8,
          borderWidth: 1.2,
          borderColor: Colors.RED,
        }}
      >
       

        <RollingBar
          defaultStyle={false}
          customStyle={{ backgroundColor: "transparent" }}>
 <Text>Search for "Summer Dresses" ☀️</Text>
<Text>Search for "Trendy Tops" ✨</Text>
<Text>Find your "Perfect Outfit" 👗</Text>
<Text>Looking for "Korean Fashion"? 🇰🇷</Text>
<Text>Type to discover "Latest Arrivals" 🆕</Text>
<Text>Search "Floral Skirts" 🌸</Text>
<Text>What's your vibe today? 🛒</Text>
<Text>Find "Cute Accessories" 🎀</Text>
<Text>"Party Dresses" or "Comfy Wear"? 💃</Text>
<Text>Search your style ✨</Text>

        </RollingBar>

         <Feather name="search" size={24} color={Colors.RED} />
      </Pressable>
    </View>
  );
};

export default SearchBar;
