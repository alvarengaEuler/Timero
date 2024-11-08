import React, { useRef, useEffect } from "react";
import { Button, TextInput, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { View, Text } from "../Themed";
import ColorList from "../ColorList";
import { useColorScheme } from "@/components/useColorScheme";
import { KeyboardAvoidingScreen } from "../KeyboardAvoidingScreen";

export const NewGameBS: React.FC = () => {
  const colorScheme = useColorScheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {
    isBottomSheetOpen,
    openBottomSheet,
    closeBottomSheet,
    toggleBottomSheet,
  } = useBottomSheetStore();

  useEffect(() => {
    if (isBottomSheetOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isBottomSheetOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1} // initially closed
      snapPoints={["25%", "50%", "75%"]}
      onClose={closeBottomSheet} // close sheet on swipe down
      backgroundStyle={{
        backgroundColor: colorScheme === "dark" ? "#100f0f" : "#fff",
      }}
      enableDynamicSizing={false}
    >
      <KeyboardAvoidingScreen>
        <View style={{ padding: 10, backgroundColor: "transparent" }}>
          <Text>New Game</Text>
          <Button title="Close Sheet" onPress={closeBottomSheet} />
          {/* Other content */}
          <ColorList />
          <TextInput style={styles.input} keyboardAppearance="dark" />
        </View>
      </KeyboardAvoidingScreen>
    </BottomSheet>
  );
};

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
