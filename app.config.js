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
        API_KEY:process.env.API_KEY,
        AUTH_DOMAIN:process.env.AUTH_DOMAIN,
        PROJECT_ID:process.env.PROJECT_ID,
        STORAGE_BUCKET:process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID:process.env.MESSAGING_SENDER_ID,
        APP_ID:process.env.APP_ID,
        MEASURMENT_ID:process.env.MEASURMENT_ID,
      router: {},
      eas: { projectId: "3413616e-7ed4-41a4-9758-ad093e2831d0" },
    },
  },
};
