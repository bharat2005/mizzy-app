import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Colors from '../../../constants/Colors';

const CustomeTabBar = ({routes, index, setIndex}) => {
    const flatListRef = useRef(null);
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, 
      });
    }
  }, [index]);

  return (
      <View style={{ marginTop:'auto' }}>

        <FlatList
            ref={flatListRef}
            showsHorizontalScrollIndicator={false}
          horizontal
          data={routes}
          contentContainerStyle={{
            gap: 40,
            alignItems: "center",
            paddingHorizontal: 18,
          }}
          keyExtractor={(item, i) => item.key}
          renderItem={({ item, index:i }) => (
            <TouchableOpacity
              onPress={() => setIndex(i)}
              style={{
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: index === i ? 2 : 0,
                borderBottomColor: Colors.PINK,
              }}
            >
              <Text style={{  fontFamily:'light', fontSize:16, color: index === i ? Colors.PINK : 'black' }}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
  )
}

export default CustomeTabBar