import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../Constants/Colors";

const FooterDataList = ({
  wind_speed,
  pressure,
  humidity,
  temp_min,
  temp_max,
}) => {
  return (
    <View style={styles.footerDataList}>
      <View style={styles.footerDataRow}>
        <View style={{ ...styles.footerBox, borderBottomWidth: 1 }}>
          <Text>Wind Speed: </Text>
          <Text style={styles.additionalInfo}>{wind_speed} meter/sec</Text>
        </View>
        <View
          style={{
            ...styles.footerBox,
            borderBottomWidth: 1,
            borderLeftWidth: 1,
          }}
        >
          <Text>Pressure: </Text>
          <Text style={styles.additionalInfo}>{pressure}hPa</Text>
        </View>
      </View>
      <View style={styles.footerDataRow}>
        <View style={styles.footerBox}>
          <Text>Humidity: </Text>
          <Text style={styles.additionalInfo}>{humidity}%</Text>
        </View>
        <View style={{ ...styles.footerBox, borderLeftWidth: 1 }}>
          <Text>Temp min/max: </Text>
          <Text style={styles.additionalInfo}>
            {temp_min}/{temp_max} &deg;C
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerDataList: {
    borderWidth: 1,
    borderRadius: 15,
    margin: 10,
  },
  footerDataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerBox: {
    flex: 1,
    padding: 10,
  },
  additionalInfo: {
    fontSize: 20,
    fontWeight: "700",
  },
});

export default FooterDataList;
