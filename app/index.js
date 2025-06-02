import { ActivityIndicator, Text, View } from "react-native";
import Logo from '../assets/svg/logo'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'white',
      }}
    >
 <Logo />
    </View>
  );
}
