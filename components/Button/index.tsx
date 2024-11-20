import { StyleSheet, Pressable } from "react-native";
import { View, Text } from "../Themed";

type CProps = {
  title: string;
  onPressButton: () => void;
};
export const Button: React.FC<CProps> = ({ title, onPressButton }) => {
  return (
    <Pressable onPress={onPressButton}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    color: "white",
  },
});
