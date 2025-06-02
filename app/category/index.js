import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../../components/Shared/TopBar'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import { FlatList } from 'react-native'
import { categoryData } from '../../mockData'
import { Image } from 'expo-image'
import { TouchableOpacity } from 'react-native'
import Dim from '../../constants/Dim'
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query'
import fetchCategoryList from '../../features/mainList/queries/fetchCategoryList'
import { ActivityIndicator } from 'react-native-paper'
import fetchCategoryHeader from '../../features/mainList/queries/fetchCategoryHeader'
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../constants/Colors'
import LikeButton from '../../components/Shared/LikeButton'

const Category = () => {
      const {categoryId} = useLocalSearchParams()
  const {data, error, refetch, isRefetching, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
    queryKey:['categoryList'],
    queryFn:fetchCategoryList,
    getNextPageParam:(returnedData) => returnedData.lastRef
  })

  const {data: headerImage, isLoading, refetch:refetchHeader, isRefetching:isRefetchingHeader} = useQuery({
    queryKey:['categoryHeader'],
    queryFn:() => fetchCategoryHeader(categoryId)
  })

  const cleanedList = useMemo(()=> {
return data?.pages.flatMap(item => item.data)
  },[data])


    const router = useRouter()




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


    const headerItem = () => (
      <View style={{height:200, width:'100%', marginBottom:40}}>

        <Image source={{uri:headerImage}} style={{height:'100%', width:'100%'}}/>
        </View>
    )
   




  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>

    <TopBar title={categoryId} />


{categoryId === 'Cloths' ? (

    <FlatList 
    numColumns={2}
    onEndReached={(hasNextPage && !(isFetchingNextPage)) && fetchNextPage}
    contentContainerStyle={{paddingVertical:12}}
    onEndReachedThreshold={0}
    data={cleanedList}
    refreshing={isRefetching && isRefetchingHeader}
    onRefresh={() => {refetch(); refetchHeader()}}
    ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size={'large'} color={Colors.PINK}  /> : null}
    ListHeaderComponent={headerItem()}
    keyExtractor={(item, index)=> index.toString()}
    renderItem={renderItem}
    />

) : (
<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
  <Text>Comming Soon!</Text>
</View>

 )}


    </SafeAreaView>
  )
}

export default Category