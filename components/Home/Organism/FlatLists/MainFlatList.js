import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useMemo } from 'react'
import Dim from '../../../../constants/Dim'
import Animated from 'react-native-reanimated'
import {listData} from '../../../../mockData'
import MainCrousal from '../FlatListItems/MainCrousal'
import NavigationList from '../FlatListItems/NavigationList'
import DynamicVideoImage from '../FlatListItems/DynamicVideoImage'
import LongVerticleList from '../FlatListItems/LongVerticleList'
import SlidedList from '../FlatListItems/SlidedList'
import QuadList from '../FlatListItems/QuadList'
import QList from '../FlatListItems/QList'
import SimpleHoriList from '../FlatListItems/SimpleHoriList'
import IndeList from '../FlatListItems/IndeList'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMainListData } from '../../../../features/mainList/queries/fetchMainList'
import { ActivityIndicator } from 'react-native-paper'


const upperData = [
  listData.mainCrousal,
  listData.navigators,
  listData.dynamicImageVideoData,
  listData.longVerticalList,
  listData.slidedList,
  listData.quadList,
  listData.qList,
  listData.simpleHoriList,
  listData.indeList
]

const MainFlatList = ({scrollhandler}) => {
  const {data, fetchNextPage, isFetchingNextPage, refetch, isRefetching, hasNextPage, error} = useInfiniteQuery({
    queryKey:['mainListData'],
    queryFn:useMainListData,
    getNextPageParam:(returnedData) => returnedData.lastRef
  })

  const cleanedList = useMemo(()=> {
    return data?.pages?.flatMap(item => item.data)
  }, [data])




  const alignType = {
    mainCrousal : MainCrousal,
    navigators: NavigationList,
    dynamicImageVideoData : DynamicVideoImage,
    longVerticalList : LongVerticleList,
    slidedList: SlidedList,
    quadList: QuadList,
    qList: QList,
    simpleHoriList : SimpleHoriList,
    indeList : IndeList

    
  }

  const renderItem = ({item, index}) =>{
   const Compo = alignType[item.type]
   return <Compo data={item} />
  }


  return (
    <View style={{flex:1, backgroundColor:'#F3F3F3'}}>
      
      <Animated.FlatList
      onEndReachedThreshold={0}
      onRefresh={refetch}
      refreshing={isRefetching}
      progressViewOffset={160}
      onEndReached={(hasNextPage && (!isFetchingNextPage)) && fetchNextPage}
      ListFooterComponent={isFetchingNextPage ? <View style={{height:80}}><ActivityIndicator size={'small'} color='pink' /></View> : null}
      onScroll={scrollhandler} 
      data={cleanedList}
      contentContainerStyle={{alignItems:'center', gap:12, paddingTop:160}}
      keyExtractor={(item, index)=> index.toString()}
      renderItem={renderItem}
      />
      
    </View>
  )
}

export default MainFlatList