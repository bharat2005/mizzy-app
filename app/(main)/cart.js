import { View, Text, FlatList, Image, Pressable, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CartTopBar from "../../components/Shared/CartTopBar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContextProvider";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Button, Menu } from "react-native-paper";
import MyMenu from "../../components/Shared/MyMenu";
import Colors from "../../constants/Colors";


const paytment = [
  {name:'Credit / Debit Card', image: require('../../assets/images/credit.png')},
    {name:'Net Banking', image: require('../../assets/images/net.png')},
      {name:'UPI', image: require('../../assets/images/paytm.png')},
        {name:'Cash on Delivery (COD)', image: require('../../assets/images/cod.png')},
]

const Cart = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: cartLength } = useQuery({
    queryKey: ["cartProducts"],
    queryFn: async () => {
      const res = await getDocs(collection(db, "users", user?.uid, "cart"));
      const data = res.docs.map((item) => ({ ...item.data(), docId: item.id }));

      return data;
    },
    enabled: !!user?.uid,
  });

  const { data, error } = useQuery({
    queryKey: ["myCartData"],
    queryFn: async () => {
      const res = await Promise.all(
        cartLength.map((item) => {
          return getDoc(doc(db, "Tops", item.docId));
        })
      );
      const data = res.map((item) => ({ ...item.data(), docId: item.id }));
      return data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      await updateDoc(doc(db, "users", user?.uid, "cart", productId), {
        quantity,
      });
    },
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries(["myCartData"]);
      const prevCatched = queryClient.getQueryData(["myCartData"]);
      queryClient.setQueryData(["myCartData"], (prev = []) => {
        return prev.map((item) =>
          item.docId === productId ? { ...item, quantity } : item
        );
      });
      return {
        prevCatched,
      };
    },
    onError: (err, vars, context) => {
      queryClient.setQueryData(["myCartData"], context.prevCatched);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myCartData"]);
    },
  });

  const { mutate: delMutate, delerror } = useMutation({
    mutationFn: async (productId) => {
      await deleteDoc(doc(db, "users", user?.uid, "cart", productId));
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries(["myCartData"]);
      await queryClient.cancelQueries(["cartProducts"]);

      const prevCatched = queryClient.getQueryData(["myCartData"]);
      const prevCatchedcartProducts = queryClient.getQueryData([
        "cartProducts",
      ]);

      queryClient.setQueryData(["myCartData"], (prev = []) => {
        return prev.filter((item) => item.docId !== productId);
      });
      queryClient.setQueryData(["cartProducts"], (prev = []) => {
        return prev.filter((item) => item.docId !== productId);
      });
      return {
        prevCatched,
        prevCatchedcartProducts,
      };
    },
    onError: (a, b, c) => {
      queryClient.setQueryData(["myCartData"], c.prevCatched);
      queryClient.setQueryData(["cartProducts"], c.prevCatchedcartProducts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myCartData"]);
      queryClient.invalidateQueries(["cartProducts"]);
    },
  });



  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: "100%",
          marginVertical: "12",
          flexDirection: "row",
          alignItems: "center",
          padding: 12,
          paddingVertical: 24,
        }}
      >
        <View style={{ height: 140, width: 140 }}>
          <Image
          source={{uri:item?.image}}
            style={{
              backgroundColor: "black",
              height: "100%",
              width: "100%",
              borderRadius: 12,
            }}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 18,

            justifyContent: "space-around",
            flex: 1,
  
          }}
        >
          <Text style={{fontSize:18, fontFamily:'bold'}}>{item?.title}</Text>

          <Text numberOfLines={1} style={{fontFamily:'regular', fontSize:14, color:"gray"}}>{item?.des}</Text>

          <View style={{ flexDirection: "row", gap: 6 , marginTop:8}}>
                  <Text style={{fontFamily:'bold', fontSize:16}}>₹ {item?.price}</Text>

          </View>

<View style={{marginTop:8}}>
          <MyMenu
            productId={item?.docId}
            item={item}
            isPending={isPending}
            cartLength={cartLength}
            mutate={mutate}
          />
</View>

        </View>

        <View style={{ height: "100%", marginHorizontal: 12 }}>
          <Pressable onPress={() => delMutate(item?.docId)}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    );
  };

  const caltotal = () => {
    let totalPrice = 0;
    if (data) {
      data.forEach((item) => {

        const a = cartLength.find((x) => x.docId === item.docId);
        
        const abx = Number(a.quantity) * Number(item.price);

        totalPrice += abx;
      });

      return totalPrice;
    }
  };



const renderFooter = () => (
  <View style={{ width: "100%", paddingVertical: 16 }}>

    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        marginBottom: 8,
      }}
    >
      <Text style={{ fontFamily: 'bold', fontSize: 16 }}>Subtotal (Items):</Text>
      <Text style={{ fontFamily: 'medium', fontSize: 16 }}>₹ {caltotal()}</Text>
    </View>

    
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        marginBottom: 8,
      }}
    >
      <Text style={{ fontFamily: 'bold', fontSize: 16 }}>Delivery Charges:</Text>
      <Text style={{ fontFamily: 'medium', fontSize: 16 }}>₹ 0</Text>
    </View>


    <View style={{ borderBottomWidth: 1, borderColor: '#eee', marginVertical: 8 }} />


    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Total Payable:</Text>
      <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>₹ {caltotal()}</Text>
    </View>


    <View style={{ paddingHorizontal: 12, gap: 12 }}>
      {paytment.map((item, index) => (
        <View
          key={index}
          style={{
            height: 50,
            flexDirection:'row',
            backgroundColor: '#fff',
            borderRadius: 12,
            borderWidth: 1,
            gap:12,
            borderColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={item?.image} style={{width:'10%', height:'70%'}}/>
          <Text style={{ fontFamily: 'medium', fontSize: 16 }}>{item.name}</Text>
        </View>
      ))}
    </View>

  </View>
);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
      <CartTopBar />

      <FlatList
        ListHeaderComponent={
          <View
            style={{
              padding: 12,
              width: "100%",
              height: 80,
            }}
          >
            <Text style={{ fontSize: 14, fontFamily:'medium', color:'#54A8D2' }}>
        Take a final look at your selected items. Make sure everything is perfect before heading to checkout — your fashion moment is just a step away!
            </Text>
          </View>
        }
        contentContainerStyle={{paddingBottom:50}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
      />

      <View style={{position:'absolute', bottom:0, left:0, right:0, width:Dimensions.get('screen').width, height:60, padding:4}}>
<TouchableOpacity style={{height:'100%', width:'100%', backgroundColor:Colors.RED, borderRadius:12, justifyContent:'center', alignItems:'center'}}>
  <Text style={{fontFamily:'bold', fontSize:18, color:'white'}}>Place Order</Text>
</TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
