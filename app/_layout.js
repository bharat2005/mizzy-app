import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import AuthContextProvider from "../contexts/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from 'expo-font'

const client = new QueryClient();

export default function RootLayout() {

useFonts({
  light:require('../assets/fonts/light.ttf'),
    medium:require('../assets/fonts/medium.ttf'),
        regular:require('../assets/fonts/regular.ttf'),
            bold:require('../assets/fonts/bold.ttf'),
})
  
  return (
    <QueryClientProvider client={client}>
      <PaperProvider>
        <AuthContextProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(main)" />
            <Stack.Screen
              name="search"
              options={{ animation: "simple_push" }}
            />
              <Stack.Screen name="category"
                            options={{ animation: 'slide_from_right' }}
               />
                    <Stack.Screen name="detail" 
                                  options={{ animation: 'slide_from_right'}}
                    />
          </Stack>
        </AuthContextProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
