import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
const array =   ["dresses",
  "tops",
  "jeans",
  "skirts",
  "jackets",
  "bottoms",

]

export const fetchOtherList = async ({ pageParam, queryKey }) => {
  const [_, categoryId] = queryKey;

  const ourStack = [collection(db, "otherList"), orderBy("index", "asc")];

  if (array.includes(categoryId)) {
    ourStack.push(where("categoryId", "==", categoryId))
  }
  if (pageParam) {
    ourStack.push(startAfter(pageParam));
  }
  if (!(array.includes(categoryId))){
ourStack.push(limit(6));
  }
  



  const res = await getDocs(query(...ourStack));


  const lastRef = res.docs[res.docs.length - 1];
  const data = res.docs.map((item) => item.data());

  return {
    data,
    lastRef,
  };
};
