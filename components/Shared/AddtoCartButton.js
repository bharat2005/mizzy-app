import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContextProvider";
import Colors from "../../constants/Colors";
import { ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";

const AddtoCartButton = ({ productId }) => {
  const router = useRouter()
    const {user, cartLength} = useAuth()
  const queryClient = useQueryClient();
  const cartList = queryClient.getQueryData(["cartProducts"]);
  const { mutate, error, isPending } = useMutation({
    mutationFn: async () => {
        await setDoc(doc(db, 'users', user?.uid , 'cart', productId), {
            productId,
            quantity:1,
            addedAt:serverTimestamp()
        })
    },
    onMutate: async()=> {
        await queryClient.cancelQueries(['cartProducts'])
        const prevCatched = queryClient.getQueryData(['cartProducts'])
        queryClient.setQueryData(['cartProducts'], (prev) => [...prev, productId])
        return {
        prevCatched
        }
    },
    onError:(err, vars, context)=> {
        queryClient.setQueryData(['cartProducts'],context.prevCatched)
    },
    onSuccess:() => {
        queryClient.invalidateQueries(['cartProducts'])
    }
  });


  const checkPlease = (productId) => {
return cartLength.find(item => item.docId === productId)

  }



  if (checkPlease(productId)) {
    return (
      <TouchableOpacity
      onPress={()=> router.push('/(main)/cart')}
      activeOpacity={1}
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 12,
          borderWidth:0.6,
          borderColor:Colors.PINK,
          height: 55,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontFamily:'medium',color:Colors.PINK}}>Go to Cart</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
    activeOpacity={1}
    onPress={mutate}
      style={{
        flex: 1,
        backgroundColor: Colors.PINK,
        borderRadius: 12,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
      }}
    >{isPending ? (
      <ActivityIndicator color="white"/>
    ) :(
          <Text style={{ fontSize: 18, fontFamily:'medium', color:'white'}}>
        ADD TO CART</Text>
    )}
  
    </TouchableOpacity>
  );
};

export default AddtoCartButton;
