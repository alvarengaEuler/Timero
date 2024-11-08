import { View, StyleSheet, Text, Button } from "react-native";
import React, { forwardRef, useMemo } from "react";
import BottomSheet, { useBottomSheet } from "@gorhom/bottom-sheet";
import { useColorScheme } from "@/components/useColorScheme";
export type Ref = BottomSheet;

interface Props {
  title: string;
}

const CloseBtn = () => {
  const { close } = useBottomSheet();

  return <Button title="Close" onPress={() => close()} />;
};

const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  const colorScheme = useColorScheme();
  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
      backgroundStyle={{
        backgroundColor: colorScheme === "dark" ? "#020202" : "#fff",
      }}
      enableDynamicSizing={false}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>{props.title}</Text>
        <CloseBtn />
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
    color: "#fff",
  },
});

export default CustomBottomSheet;
