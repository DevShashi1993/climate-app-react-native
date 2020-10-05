import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../Constants/Colors";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "white",
  },
});

export default Header;
