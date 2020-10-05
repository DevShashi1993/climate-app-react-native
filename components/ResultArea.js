import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Env from "../Constants/Env";
import * as Location from "expo-location";

const ResultArea = ({ cityName }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

  const load = async () => {
    try {
      //let { status } = await Location.requestPermissionsAsync();
      // if (status !== "granted") {
      //   setErrorMessage("Access to location is needed to run this app");
      //   return;
      // }
      //const location = await Location.getCurrentPositionAsync();
      //const {latitude, longitude} = location.coords;

      const weatherUrl = `${BASE_WEATHER_URL}q=${cityName}&units=${unitSystem}&appid=${Env.WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl);
      const responseJson = await response.json();

      if (response.ok) {
        setCurrentWeather(responseJson);
      } else setErrorMessage(responseJson.message);
    } catch (error) {
      console.log("Error", error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (cityName) {
      load();
    }
  }, [cityName]);

  return (
    <>
      <View style={styles.resultContainer}>
        {currentWeather ? (
          <>
            <Text style={styles.cityAndCountryName}>
              {currentWeather.name}, {currentWeather.sys.country}
            </Text>
            <Text style={styles.biggerText}>
              {currentWeather.main.temp} &deg;C
            </Text>
            <Image
              style={styles.logo}
              source={{
                uri: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`,
              }}
            />
            <Text style={styles.normalText}>
              {currentWeather.weather[0].main}
            </Text>
          </>
        ) : (
          <>
            {errorMessage && (
              <Text style={styles.normalText}>Error: {errorMessage}</Text>
            )}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityAndCountryName: {
    fontSize: 25,
    marginBottom: 25,
  },
  normalText: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
  },
  biggerText: {
    fontSize: 50,
    fontWeight: "700",
    textAlign: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default ResultArea;
