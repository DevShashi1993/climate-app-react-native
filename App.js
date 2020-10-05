import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import Header from "./components/Header";
import Colors from "./Constants/Colors";
import Env from "./Constants/Env";
import InputArea from "./components/InputArea";
import ResultArea from "./components/ResultArea";
import * as Location from "expo-location";

const App = () => {
  const [cityName, setCityName] = React.useState("");

  const handleInput = (cityname) => {
    setCityName(cityname);
  };

  useEffect(() => {}, []);

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.primary} barStyle="default" />
        <Header title="Climate App" />
        <InputArea onHandleInput={handleInput} />
        <ResultArea cityName={cityName} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
});

export default App;
