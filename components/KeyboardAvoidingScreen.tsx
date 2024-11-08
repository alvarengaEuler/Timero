import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

interface KeyboardAvoidingScreenProps {
  children: ReactNode;
}

export const KeyboardAvoidingScreen: React.FC<KeyboardAvoidingScreenProps> = ({
  children,
}) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // Adjust offset as needed
    >
      <ScrollView contentContainerStyle={styles.inner}>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    // padding: 24,
    flexGrow: 1,
    // justifyContent: "space-between",
  },
});
