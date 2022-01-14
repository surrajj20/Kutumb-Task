import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/components/Home";
import Trending from "./src/components/Trending";

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
          ></Stack.Screen>
          <Stack.Screen
            name="Trending"
            component={Trending}
          ></Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>

    );
  }
}

export default App;