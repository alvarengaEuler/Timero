import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";

const { width } = Dimensions.get("window");

interface SlidingTabBarProps {
  tabs: string[];
  currentIndex: number;
  onTabPress: (index: number) => void;
}

export const SlidingTabBar: React.FC<SlidingTabBarProps> = ({
  tabs,
  currentIndex,
  onTabPress,
}) => {
  const tabWidth = width / tabs.length;

  const colorScheme = useColorScheme();

  // Shared value for the animated tab indicator position
  const translateX = useSharedValue(currentIndex * tabWidth);

  // Update the indicator position whenever the currentIndex changes
  React.useEffect(() => {
    translateX.value = withTiming(currentIndex * tabWidth, { duration: 250 });
  }, [currentIndex]);

  // Animated style for the tab indicator
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#161616" : "#100f0f" },
      ]}
    >
      <View
        style={[
          styles.tabsContainer,
          { backgroundColor: colorScheme === "dark" ? "#161616" : "#100f0f" },
        ]}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onTabPress(index)}
            style={[styles.tab, { width: tabWidth }]}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View
        style={[styles.indicator, indicatorStyle, { width: tabWidth }]}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 50,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  indicator: {
    position: "absolute",
    height: 4,
    backgroundColor: "#007AFF",
    bottom: 0,
    borderRadius: 2,
  },
});
