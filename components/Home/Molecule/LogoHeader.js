import { View, Text, Pressable } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import HomeLogo from '../../../assets/svg/homeLogo'
import { useAuth } from "../../../contexts/AuthContextProvider";
import { Badge } from "react-native-paper";
import { useRouter } from "expo-router";
import Colors from "../../../constants/Colors";

const LogoHeader = () => {
    const {likesLength, cartLength = []} = useAuth()
    const router = useRouter()
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingRight: 24,
        alignItems: "center",
        justifyContent: "space-between",

      }}
    >
      <HomeLogo />

      <View style={{ flexDirection: "row", gap:16 }}>
        <Pressable  onPress={()=> router.push('/(main)/likes')}>
          <Feather name="heart" size={24} color="black" />
        </Pressable>

        <Pressable onPress={()=> router.push('/(main)/cart')}>
          <Feather name="shopping-cart" size={24} color="black" />
          <Badge visible={cartLength.length > 0}  size={18}  style={{position:'absolute', top:-6, right:-6, backgroundColor:Colors.RED}} >
            <Text style={{fontSize:14}}>{cartLength.length}</Text>
            </Badge>
        </Pressable>
      </View>
    </View>
  );
};

export default LogoHeader;
