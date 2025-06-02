import { doc, getDoc, query } from "firebase/firestore"
import { db } from "../../../config/firebase"


const fetchProductData = async(productId) => {
    const q = query(doc(db, 'Tops', productId))
    const res = await getDoc(q)
    const data = {
        ...res.data(),
        images: [...Array(6).fill(res.data().image)],
        detailImages: [...Array(6).fill(res.data().image)],
    }

    return data

}

export default fetchProductData