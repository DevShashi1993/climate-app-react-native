import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import Colors from "../Constants/Colors";

const InputArea = ({ onHandleInput }) => {
  const [value, setValue] = React.useState("");

  const btnClickHandler = () => {
    onHandleInput(value);
    setValue("");
  };

  return (
    <View style={styles.inputArea}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        value={value}
        placeholder="Enter City"
      />
      <Button
        style={styles.button}
        mode="outlined"
        color="black"
        onPress={btnClickHandler}
      >
        Check
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  input: {
    width: "75%",
    fontSize: 20,
    backgroundColor: "transparent",
    height: 40,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    width: "25%",
    backgroundColor: Colors.buttoncolor,
  },
});

export default InputArea;
