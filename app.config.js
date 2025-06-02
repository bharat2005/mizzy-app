import 'dotenv/config'

export default {
  expo: {
    name: "mizzy",
    slug: "mizzy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/mizzyicon.png",
    scheme: "mizzy",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: { supportsTablet: true },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/mizzyicon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.bharat2005.mizzy",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash.png",
          resizeMode: "cover",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-font",
    ],
    experiments: { typedRoutes: true },
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_PROJECT_ID:process.env.FIREBASE_PROJECT_ID,
      FIREBASE_APP_ID:process.env.FIREBASE_APP_ID,
      router: {},
      eas: { projectId: "3413616e-7ed4-41a4-9758-ad093e2831d0" },
    },
  },
};
