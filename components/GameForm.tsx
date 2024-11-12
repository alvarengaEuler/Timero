import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ColorPicker } from "react-native-color-picker";
import { Slider } from "@react-native-community/slider";

export function GameForm() {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      gameName: "",
      gameDescription: "",
      gameColor: "#000000",
      duration: 30,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Game Name</Text>
      <Controller
        control={control}
        name="gameName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter game name"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Game Description</Text>
      <Controller
        control={control}
        name="gameDescription"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter game description"
            onChangeText={onChange}
            value={value}
            multiline
          />
        )}
      />

      <Text style={styles.label}>Game Color</Text>
      <ColorPicker
        onColorSelected={(color) => setValue("gameColor", color)}
        style={styles.colorPicker}
        defaultColor={watch("gameColor")}
      />
      <Text style={styles.colorText}>Selected Color: {watch("gameColor")}</Text>

      <Text style={styles.label}>Duration (minutes)</Text>
      <Controller
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
      />
      <Text style={styles.sliderValue}>
        Selected Duration: {watch("duration")} mins
      </Text>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 15,
    borderRadius: 5,
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
