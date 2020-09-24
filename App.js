import React, {useEffect, useLayoutEffect, useState} from 'react';
import { Button, StatusBar, StyleSheet, Text, View, Switch , Platform } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Constants from "expo-constants";
import * as Location from 'expo-location';

const WEATHER_API_KEY = '6ba2d126dc7cc5c8553e08078ef62590';
const BASE_WEATHER_URL='https://api.openweathermap.org/data/2.5/weather?';
const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric');

  const load = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if(status !== 'granted'){
        setErrorMessage('Access to location is needed to run this app')
        return;
      }
      const location = await Location.getCurrentPositionAsync(); 
      const {latitude, longitude} = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;
      
      const response = await fetch(weatherUrl);
      const responseJson = await response.json();

      if(response.ok){
        setCurrentWeather(responseJson);
      } else setErrorMessage(responseJson.message);

    } catch (error) {
      console.log('Error', error);
      setErrorMessage(error.message)
    }
  }

  useEffect(()=> {
    load();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="grey" barStyle="default" />
        <Card>
          <Card.Content>
            <Title>Climate App</Title>
            <Paragraph>Displays temperature based on the device current Location</Paragraph>
          </Card.Content>
        </Card>

      <View style={styles.container}>
        {currentWeather ? (
          <>
            <Text style={styles.textStyle}>
              Weather of your current location is
            </Text>
            <Text style={styles.biggerText}>
              {currentWeather.main.temp} &deg;C
            </Text>
          </>
        ) : (
          <>
            <Text>{errorMessage}</Text>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ECF0F1',
  },
  textStyle:{
    fontSize: 15,
    textAlign: 'center'
  },
  biggerText:{
    fontSize: 35,
    textAlign: 'center'
  },
});

export default App;
