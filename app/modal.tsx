import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { GameFormComponent } from "@/components/GameForm";

import { useColorScheme } from "@/components/useColorScheme";
import { Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#100f0f" : "#fff" },
      ]}
    >
      <View
        style={{
          // borderWidth: 1,
          // borderColor: "red",
          backgroundColor: "transparent",
          marginTop: 16,
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <Link href="/" asChild>
          <Pressable>
            {({ pressed }) => (
              <Octicons
                size={25}
                name="x-circle-fill"
                color={colorScheme === "dark" ? "#fff" : "#100f0f"}
                style={{
                  opacity: pressed ? 0.5 : 1,
                }}
              />
            )}
          </Pressable>
        </Link>
        <Text style={styles.title}>Create a New Game</Text>
        <Link href="/" asChild>
          <Pressable>
            {({ pressed }) => (
              <Octicons
                size={25}
                name="filter"
                color={colorScheme === "dark" ? "#fff" : "#100f0f"}
                style={{
                  opacity: pressed ? 0.5 : 1,
                }}
              />
            )}
          </Pressable>
        </Link>
      </View>
      {/* <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" /> */}
      <GameFormComponent />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
