import { useMutation } from "@tanstack/react-query"
import { doc, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../../config/firebase"

export const useLike = async (uid) => {
    return useMutation({
        mutationFn:async(productId) => {
            const q = doc(db, 'users', uid, 'likes', productId)
            await setDoc(q, {
                likedAt:serverTimestamp()
            })

        }

    })

}


