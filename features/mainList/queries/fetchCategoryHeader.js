import { collection, doc, getDoc, query, where } from "firebase/firestore"
import { db } from "../../../config/firebase"


const fetchCategoryHeader = async(categoryId) => {

const q = query(doc(db, 'headerImages', categoryId))
const res = await getDoc(q)
const data = res.data()


return data.image
}

export default fetchCategoryHeader