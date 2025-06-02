import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Dim from "../../../../constants/Dim";
import Animated, { useReducedMotion } from "react-native-reanimated";
import { SecondFlatListCategoryList } from "../../../../mockData";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchOtherList } from "../../../../features/mainList/queries/fetchOtherList";
import { ActivityIndicator } from "react-native-paper";
import { Image } from "expo-image";
import LikeButton from "../../../Shared/LikeButton";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";


const navImages = [
  require('../../../../assets/images/navall.png'),
    require('../../../../assets/images/navdress.png'),
      require('../../../../assets/images/navjeans.png'),
        require('../../../../assets/images/navglasses.png'),
                require('../../../../assets/images/navscraf.png'),
                       require('../../../../assets/images/navbags.png'),
                              require('../../../../assets/images/navgloves.png'),

]

const categoriesList = SecondFlatListCategoryList.categoryList;
const categoriesMetaDataList = SecondFlatListCategoryList.metaData;

const SecondFlatList = ({ scrollhandler }) => {
    const [currentCategory, setCurrentCategory] = useState('all');
    const {data, fetchNextPage, isFetchingNextPage, refetch, isRefetching, hasNextPage, error} = useInfiniteQuery({
    queryKey:['fetchOtherList', currentCategory ],
    queryFn:fetchOtherList,
    getNextPageParam:(returnedData) => returnedData.lastRef
  })   
  const [listData, setListData] = useState(categoriesMetaDataList);
  const router = useRouter();

 const cleanedList = useMemo(()=> {
  return data?.pages.flatMap(item => item.data)

 },[data])



  const headerCategoryList = () => {
    return (
      <View style={{ width: Dim.width, backgroundColor: "white" }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categoriesList}
          contentContainerStyle={{
            paddingVertical: 24,
            gap: 18,
            paddingHorizontal: 18,
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>  setCurrentCategory(item)}
              style={{
                height: 55,
                width: 55,
                borderRadius: 30,
                borderWidth:1.5,
                backgroundColor:'lightgray'
,                padding:8,
                borderColor:
                  currentCategory === item ? Colors.PINK : "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image style={{height:'100%', width:'100%', backgroundColor:'lightgray', borderRadius:30}} source={navImages[index]}/>
              
            </TouchableOpacity>

          )}
        />
      </View>
    );
  };

    const renderItem = ({item, index}) => (
        <TouchableOpacity activeOpacity={1} onPress={()=> router.push({pathname:'/detail', params:{productId:item?.docId}})} style={{width:Dim.width /2, height:380, justifyContent:'', alignItems:'center',padding:12}}>
            <View style={{ width:180, gap:4}}>

                <View style={{height:180, width:'100%',}}>
                  <Image source={{uri:item?.image}} style={{height:'100%', width:'100%', borderRadius:12 }}/>
                </View>
               
                <View>
                    <Text style={{fontSize:18, fontFamily:'bold'}}>{item.title}</Text>
                      <Text numberOfLines={2} style={{fontSize:12, fontFamily:'regular', color:'gray'}}>{item.des}</Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:6, borderBottomWidth:0.5, borderBottomColor:'gray', alignItems:'center'}}>
                    <View style={{flexDirection:"row", alignItems:'baseline', gap:4}}>
                    <Text style={{fontSize:16, fontFamily:'bold'}}>₹{" "}{item.price}</Text>
                    <Text style={{textDecorationLine:'line-through', fontSize:12, fontFamily:'medium'}}>{item?.fakePrice}</Text>
                    <Text style={{fontSize:18, color:'orange', fontSize:16, fontFamily:'bold'}}>{item?.discount}%</Text>

                    </View>
             
            

                    <LikeButton productId={item?.docId}/>
                </View>

                <View style={{flexDirection:'row', gap:4, alignItems:'center'}}>
                    <AntDesign name="star" size={16} color={Colors.PINK} />
                    <Text style={{color:Colors.PINK, fontFamily:'bold'}}>{item.rating}</Text>


                </View>

            </View>

        </TouchableOpacity>
    )

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        numColumns={2}
        contentContainerStyle={{ paddingVertical: 12, paddingTop: 140 }}
        onScroll={scrollhandler}
        ListHeaderComponent={headerCategoryList}
        data={cleanedList}
        onEndReachedThreshold={0}
        ListFooterComponent={isFetchingNextPage ? <View style={{height:80}}><ActivityIndicator color="pink" size={'small'} /></View> : null}
        onEndReached={(hasNextPage && (!isFetchingNextPage)) && fetchNextPage}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SecondFlatList;
