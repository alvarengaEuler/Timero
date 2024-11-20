import { StyleSheet, ScrollView } from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Card } from "@/components/Card";
import { SoloPlayersList } from "@/components/SolorPlayerList";

export default function TabOneScreen() {
  return (
    <View
      style={styles.container}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    >
      <SoloPlayersList />
      {/* 
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      {/* <View
        style={styles.buttonContainer}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",

    // padding: 8,
    // borderWidth: 1,
    // borderColor: "red",
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
  buttonContainer: {
    height: 70,
    width: "100%",

    // borderWidth: 1,
    // borderColor: "red",
  },
});
