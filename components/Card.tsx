import { StyleSheet, Pressable } from "react-native";
import { Text, View } from "./Themed";
import Octicons from "@expo/vector-icons/Octicons";

type CardProps = {
  name: string;
  score: number;
  bgColor: string;
};
export function Card({ name, score = 0, bgColor }: CardProps) {
  return (
    <View
      style={[styles.container, { backgroundColor: bgColor, marginBottom: 8 }]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Text style={styles.title}>{name}</Text>
        <Pressable
          onPress={() => {
            console.log("press edit");
          }}
        >
          <Octicons
            size={16}
            // style={{ marginBottom: -3 }}
            name="pencil"
            color="white"
          />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 30,
          paddingVertical: 20,
          backgroundColor: "transparent",
        }}
      >
        <Pressable
          onPress={() => {
            console.log("press minus");
          }}
        >
          <Octicons
            size={32}
            // style={{ marginBottom: -3 }}
            name="dash"
            color="white"
          />
        </Pressable>
        <Text style={styles.score}>{score}</Text>
        <Pressable
          onPress={() => {
            console.log("press plus");
          }}
        >
          <Octicons
            size={32}
            // style={{ marginBottom: -3 }}
            name="plus"
            color="white"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,

    borderRadius: 8,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  score: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});
