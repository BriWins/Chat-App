import React, { Component } from 'react';
import Start from "./components/Start";
import Chat from './components/Chat';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

// Creates the navigator to switch between screens 
const Stack = createStackNavigator();

// The application’s main <ChatApp/> component is the main gateway for all app views 
export default class ChatApp extends Component {
  render() {
      return (
        <ActionSheetProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Start">
              <Stack.Screen name="Start" component={Start} />
              <Stack.Screen name="Chat" component={Chat} />   
            </Stack.Navigator>
        </NavigationContainer>
        </ActionSheetProvider>
      );
    }
}

// style prop to align all items in center for entire app 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});