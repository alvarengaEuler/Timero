// components/ColorList.tsx

import React from "react";
import { View, Text, StyleSheet, FlatList, PixelRatio } from "react-native";
import { colorsWithContrast } from "../utils/colors";

const ColorList = () => {
  return (
    <FlatList
      data={colorsWithContrast}
      keyExtractor={(item) => item.color}
      horizontal
      renderItem={({ item }) => (
        <View style={[styles.colorBox, { backgroundColor: item.color }]}>
          {/* <Text style={[styles.colorText, { color: item.contrastColor }]}>
            {item.color}
          </Text> */}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  colorBox: {
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
  },
  colorText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ColorList;
