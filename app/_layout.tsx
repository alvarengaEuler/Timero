import { StyleSheet, View, TextInput, Button } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import BottomSheet, {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomBottomSheet from "@/components/bottom-sheet/new-player";
import { NewGameBS } from "@/components/bottom-sheet/new-game";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  // ref
  // const bottomSheetRef = useRef<BottomSheet>(null);

  // // const bottomSheetRef = useRef<BottomSheet>(null);
  // const [title, setTitle] = useState("Passing my data 🔥");

  // const handleClosePress = () => bottomSheetRef.current?.close();
  // const handleOpenPress = () => bottomSheetRef.current?.expand();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
        <NewGameBS />

        {/* <TextInput style={styles.input} onChangeText={setTitle} value={title} />
        <Button title="Open" onPress={handleOpenPress} />
        <Button title="Close" onPress={handleClosePress} />
        <CustomBottomSheet ref={bottomSheetRef} title={title} /> */}
        {/* <BottomSheet
          ref={bottomSheetRef}
          enableDynamicSizing={false}
          index={1}
          snapPoints={snapPoints}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.containerHeadline}>
              Awesome Bottom Sheet 🎉
            </Text>
          </View>
        </BottomSheet> */}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",

    padding: 8,
    backgroundColor: "#f9f9f9",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
});
