import { View, Text, Alert } from 'react-native'
import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import {auth, db} from '../config/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'
import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import { useQueries, useQuery } from '@tanstack/react-query'


const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [user , setUser] = useState(null)
    const router =  useRouter()

useEffect(()=> {
    const unsub = onAuthStateChanged(auth, (user)=> {
        if (user){
        router.replace('/(main)/home')
        setUser(user)
        
        } else {
        router.replace('/(auth)/start')
        setUser(null)
        }
    })

return unsub

},[])

const {data: likesLength} = useQuery({
  queryKey:['likedProducts'],
  queryFn:async() => {
    const res = await getDocs(collection(db, 'users', user?.uid, 'likes'))
    const data = res.docs.map(item => item.id)

    return data

  },
    enabled: !!(user?.uid)
})

const {data: cartLength}  = useQuery({
  queryKey:['cartProducts'],
  queryFn:async() => {
    const res = await getDocs(collection(db, 'users', user?.uid, 'cart'))
    const data = res.docs.map(item => ({...item.data(), docId: item.id}))

    return data

  },
  enabled: !!(user?.uid)
})


const register = async (email, password, username) => {
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, 'users', res?.user?.uid), {
      uid: res?.user?.uid,
      username,
      emailVerified: res?.user?.emailVerified,
      registeredAt: serverTimestamp()
    })

  } catch(err){
    console.log("Error form register funtion", err.message)
    Alert.alert("Errror", err.message)
  }
}

const login = async (email, password) => {
  try{
     await signInWithEmailAndPassword(auth, email, password)

  } catch(err){
    console.log("Error form login funtion", err.message)
    Alert.alert("Errror", err.message)
  }
}

const logout = async () =>{
  try{
    await signOut(auth)

  } catch(err){
    console.log("Error from logout funion", err.message)
    Alert.alert("Error", err.message)
  }
}

  return (
<AuthContext.Provider value={{user, register, logout, login, cartLength, likesLength}}>
{children}
</AuthContext.Provider>
  )
}

export default AuthContextProvider

export const useAuth = () => useContext(AuthContext)