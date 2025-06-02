import { collection, getDoc, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore"
import { db } from "../../../config/firebase"


const fetchCategoryList = async({pageParam}) => {

const q = pageParam ? 
query(collection(db,'Tops'), orderBy('index', 'asc'), startAfter(pageParam), limit(4))
: 
query(collection(db,'Tops'), orderBy('index', 'asc'), limit(4))

const res = await getDocs(q)
const lastRef = res.docs[res.docs.length - 1]
const data = res.docs.map(item => ({...item.data(), docId : item.id}))

return {
    data,
    lastRef
}

}

export default fetchCategoryList