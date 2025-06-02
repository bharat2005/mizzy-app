import { collection, doc, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
import { db } from '../../../config/firebase'


export  const useMainListData = async ({pageParam}) => {
const q = pageParam  ?
query(collection(db, 'mainListData'), orderBy('orderId', 'asc'),startAfter(pageParam), limit(3))
: 
query(collection(db, 'mainListData'), orderBy('orderId', 'asc'), limit(3))

const res = await getDocs(q)

const lastRef = res.docs[res.docs.length - 1]
const data = res.docs.map(item => item.data())

return {
    data,
lastRef
}

}