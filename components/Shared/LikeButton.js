import { View, Text, Pressable } from "react-native";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AntDesign, Feather } from "@expo/vector-icons";
import { deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContextProvider";

const LikeButton = ({ productId, size=32 }) => {
    

    const { likesLength, user } = useAuth()
    

    const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn:async() => {
        if(likesLength.includes(productId)){
           await deleteDoc(doc(db,'users',user?.uid, 'likes', productId))
        } else {
            setDoc(doc(db,'users',user?.uid, 'likes', productId), {
                likedAt:serverTimestamp(),
                productId
            })
        }
        
    },
    onMutate:async(productId) => {
        await queryClient.cancelQueries(['likedProducts'])
        const prevCached = queryClient.getQueryData(['likedProducts'])
        if (likesLength.includes(productId)) {
        queryClient.setQueryData(['likedProducts'], (prev)=> prev.filter(item => item !== productId))
        } else {
        queryClient.setQueryData(['likedProducts'], (prev)=> [...prev, productId])
        }

        return {prevCached}
    },
    onError:(err,vars,context)=> {
        queryClient.setQueryData(['likedProducts'], context.prevCached)
    },
    onSuccess:()=>{
        queryClient.invalidateQueries(['likedProducts'])
    }
  })




  return (
    <Pressable onPress={mutate}>
        {likesLength.includes(productId) ? (
<AntDesign name="heart" size={size} color="red" />
        ) : (
<Feather name="heart" size={size} color={"lightgray"} />
        )}
    </Pressable>
  )

};

export default LikeButton;
