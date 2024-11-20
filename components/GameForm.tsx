import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { TimeList } from "./TimeList";
import { SlidingTabBar } from "./SlidingTabbar";

type FormData = {
  gameName: string;
  gameDescription: string;
  gameColor: string;
  duration: number;
};

export function GameFormComponent() {
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      gameName: "",
      gameDescription: "",
      gameColor: "#000000",
      duration: 30,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const tabs = ["On going", "finished"];

  const handleTabPress = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Game Name</Text> */}
      <SlidingTabBar
        tabs={tabs}
        currentIndex={currentIndex}
        onTabPress={handleTabPress}
      />
      <Controller
        control={control}
        name="gameName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Game name"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {/* <Text style={styles.label}>Game Description</Text> */}
      <Controller
        control={control}
        name="gameDescription"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Game description"
            onChangeText={onChange}
            value={value}
            multiline
          />
        )}
      />

      <TimeList />
      {/* <ColorPicker
        onColorSelected={(color) => setValue("gameColor", color)}
        style={styles.colorPicker}
        defaultColor={watch("gameColor")}
      /> */}
      {/* <Text style={styles.colorText}>Selected Color: {watch("gameColor")}</Text> */}

      {/* <Text style={styles.label}>Duration (minutes)</Text> */}
      {/* <Controller
        control={control}
        name="duration"
        render={({ field: { onChange, value } }) => (
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={120}
            step={1}
            value={value}
            onValueChange={onChange}
          />
        )}
      /> */}
      {/* <Text style={styles.sliderValue}>
        Selected Duration: {watch("duration")} mins
      </Text> */}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    // borderWidth: 1,
    // borderColor: "#ccc",
    fontWeight: "bold",
    padding: 8,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 22,
  },
  colorPicker: {
    height: 150,
    marginBottom: 15,
  },
  colorText: {
    fontSize: 14,
    marginBottom: 15,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderValue: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center",
  },
});
