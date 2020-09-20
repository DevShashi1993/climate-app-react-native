import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WEATHER_API_KEY } from 'react-native-dotenv'
import * as Location from 'expo-location';

// const WEATHER_API_KEY = '6ba2d126dc7cc5c8553e08078ef62590';
const apiKey = process.env['WEATHER_API_KEY'];
console.log('WEATHER_API_KEY = ', WEATHER_API_KEY);
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

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
      const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
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

  if(currentWeather) {
    const { main: {temp} } = currentWeather;
    return (
      <View style={styles.container}>
        <Text>Weather of your current location is</Text>
        <Text>{temp} 'Celsius</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
