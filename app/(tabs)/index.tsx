import { StyleSheet, ScrollView } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Card } from "@/components/Card";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ gap: 8 }}>
          <Card name="Euler" bgColor="#1abc9c" score={0} />
          <Card name="Ingrid" bgColor="#3498db" score={10} />
          <Card name="Eydde" bgColor="#8e44ad" score={7} />
          <Card name="Mario" bgColor="#e67e22" score={9} />
        </View>
      </ScrollView>
      {/* <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 1,
    padding: 8,
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
