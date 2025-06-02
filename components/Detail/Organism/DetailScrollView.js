import { View, Text } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import Dim from "../../../constants/Dim";
import ImageList from "./Molecule/ImageList";
import { Image } from "expo-image";
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../../constants/Colors'

const serviceData = [
  { image: require('../../../assets/images/delivery.png'), text: "Fast & Free Delivery ", secondaryText: 'Enjoy quick shipping with no extra cost on all orders' , },
  { image: require('../../../assets/images/card.png'), text: "Multiple Payment Methods", secondaryText: 'UPI, Cards, Wallets & Cash on Delivery' },
  { image:require('../../../assets/images/bag.png'), text: "7-Day Easy Returns", secondaryText: 'Hassle-free returns, no questions asked' },
];

const DetailScrollView = ({ scrollHandler, data }) => {
  const specialArray = data?.specialArray ? data?.specialArray : data?.detailImages
  return (
    <Animated.ScrollView onScroll={scrollHandler}>
      <ImageList data={data} />

      <View style={{ width: Dim.width, backgroundColor: "white", padding: 18 }}>
        <Text style={{ fontSize: 24, fontWeight: "600", fontFamily:'bold' }}>{data?.title}</Text>

        <Text style={{ fontSize: 14, color:'gray', fontFamily:'medium', paddingVerticle:4 }}>{data?.des}</Text>
      </View>

      <View style={{ width: Dim.width, backgroundColor: "white", padding: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap:6 }}>
          <Text style={{ fontSize: 24, fontFamily:'bold' }}>₹ {data?.price}</Text>
          <Text
            style={{
              fontSize: 16,
              color:'lightgray',
              fontFamily:'medium',
              textDecorationLine: "line-through",
            }}
          >
            {data?.fakePrice}
          </Text>
        </View>

        <Text style={{ fontSize: 18, color: Colors.PINK, fontFamily:'bold', marginHorizontal:4 }}>{data?.discount}%off</Text>
      </View>

      <View style={{ width: Dim.width, padding: 12 , marginTop:8}}>
        <Text style={{ fontSize: 20, fontFamily:'regular',marginVertical:8 }}>Item Description</Text>

        {serviceData.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                padding: 8,

                marginVertical: 4,
                alignItems: "center",
              }}
            >
              <View style={{ height: 50, width: 50, padding:8 }}>
                <Image
                source={item.image}
                  style={{
                    height: "100%",
                    width: "100%",
                  
                    borderRadius: 25,
                  }}
                />
              </View>
              <View>
                              <Text
                style={{
                  fontSize: 18,
                  fontFamily:'regular',
                  marginHorizontal: 12,
                }}
              >
                {item?.text}
              </Text>
              
              <Text
                style={{
                  fontSize: 12,
                  color:'gray',
                  fontFamily:'light',
                  marginHorizontal: 12,
                }}
              >
                {item?.secondaryText}
              </Text>

              </View>



            </View>
          );
        })}
      
      
      </View>

      <View style={{ width: Dim.width }}>
        <View style={{padding:12}}>
       <Text style={{ fontSize: 20, fontFamily:'regular',marginVertical:8 }}>Style Preview</Text>
        </View>

{specialArray && <>

       {specialArray.map((item,index)=> (
            <View key={index} style={{height:320, width:Dim.width}}>
                <Image source={{uri:item}} style={{height:'100%', width:'100%'}} />
                </View>
        ))}


</>}
 
        

      </View>

      <View style={{ width: Dim.width }}>
        <View style={{padding:12}}>
             <Text style={{ fontSize: 20, fontFamily:'regular',marginVertical:8 }}>Ratings</Text>
        </View>

<View style={{width:Dim.width, height:120, justifyContent:'center'}}>

    <View style={{width:'100%', height:'100%', backgroundColor:'', justifyContent:'center', alignItems:'center'}}>


<View style={{flexDirection:'row', alignItems:'center', gap:8}}>
    

      <View style={{height:60,  justifyContent:'center', alignItems:'center', flexDirection:'row', backgroundColor:''}}>
           <AntDesign name="star" size={40} color={Colors.PINK} />
             <AntDesign name="star" size={38} color={Colors.PINK} />
               <AntDesign name="star" size={36} color={Colors.PINK} />
                 <AntDesign name="star" size={34} color={Colors.PINK} />
                   <AntDesign name="star" size={32} color={Colors.PINK} />


      </View>

        <Text style={{fontSize:48, fontFamily:'bold'}}>{data?.rating}</Text>

</View>
<View style={{marginVertical:4}}>
    <Text style={{fontFamily:'light', color:'gray'}}>Verified By {data?.ratingQuantity} Users</Text>
</View>
      

    </View>

</View>
        

      </View>

      

      <View style={{height:120}}/>
    </Animated.ScrollView>
  );
};

export default DetailScrollView;
