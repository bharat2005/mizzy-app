import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteDoc, doc, queryEqual } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useAuth } from '../../contexts/AuthContextProvider'
import { AntDesign } from '@expo/vector-icons'

const FavButton = ({productId, likesLength}) => {
    const {user} = useAuth()
    const queryClient = useQueryClient()
    const {mutate, error} = useMutation({
        mutationFn:async() => {
                await deleteDoc(doc(db, 'users', user?.uid, 'likes', productId ))
        },
        onMutate:async() => {
            await queryClient.cancelQueries(['favrouitProducts'])
            await queryClient.cancelQueries(['likedProducts'])


            const prevCatched = queryClient.getQueryData(['favrouitProducts'])
            const prevCatchedlikedProducts = queryClient.getQueryData(['likedProducts'])


            queryClient.setQueryData(['favrouitProducts'], (prev = [])=> {
                return prev.filter(item => item.docId !== productId)
            })
                        queryClient.setQueryData(['likedProducts'], (prev = [])=> {
                return prev.filter(item => item !== productId)
            })
            return {
                prevCatched,
                prevCatchedlikedProducts
            }
        },
        onError:(error, vars, context) => {
            queryClient.setQueryData(['favrouitProducts'],context.prevCatched )
             queryClient.setQueryData(['likedProducts'],context.prevCatchedlikedProducts )
        },
        onSuccess:()=> {
            queryClient.invalidateQueries(['favrouitProducts'])
             queryClient.invalidateQueries(['likedProducts'])
        }
    })

    console.log(error)
  return (
    <Pressable onPress={mutate}>
     <AntDesign name="heart" size={22} color="red" />
    </Pressable>
  )
}

export default FavButton