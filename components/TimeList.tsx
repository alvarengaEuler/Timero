// components/ColorList.tsx

import { getContrastColor } from "@/utils/colors";
import React from "react";
import { View, Text, StyleSheet, FlatList, PixelRatio } from "react-native";

export const TimeList = () => {
  const timeListData = [
    "15s",
    "30s",
    "1m",
    "1:30m",
    "2m",
    "2:30m",
    "3m",
    "10min",
    "20min",
    "30min",
    "40min",
    "50min",
    "1h",
  ];

  return (
    <FlatList
      style={styles.flatListStyle}
      contentContainerStyle={styles.flatListContentStyle}
      data={timeListData}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={[styles.colorBox, { backgroundColor: "#90d6d9" }]}>
          <Text
            style={[styles.colorText, { color: getContrastColor("#90d6d9") }]}
          >
            {item}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  flatListContentStyle: {
    alignItems: "center",
  },
  flatListStyle: {
    // borderWidth: 1,
    // borderColor: "red",
    maxHeight: 70,
    marginVertical: 16,
  },
  colorBox: {
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 68,
    height: 48,
    borderRadius: 48 / 2,
  },
  colorText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
