import React from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import BackgroundImage from "../Images/Background_Image.png";

/* The application’s main <Start/> component that renders the start screen */
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

/* changeBgColor holds the state for the background color selected by user later transferred to <Chat/> component*/
changeBgColor = (newColor) => {
  this.setState({ bgColor: newColor });
};

/* color options for user */
  colors = {
    black: "#090C08",
    purple: "#474056",
    gray: "#8A95A5",
    green: "#B9C6AE"
  }

  render() {
    /* Start screen name input box, background color options, and start chat button rendered for user */
    return (
      <View style={styles.container}>
          <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Chat App</Text>
              <View style={styles.startBox}>
                <View style={styles.nameBox}>
                  <TextInput
                  style={styles.textInput}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    placeholder='Your Name...'
                  />
                </View>
            <Text style={styles.colorInput}>Choose your background color!</Text>
                <View style={styles.colorArray}>
                    <TouchableOpacity
                      style={styles.colorBlack}
                      onPress={() => this.changeBgColor(this.colors.black)}
                    ></TouchableOpacity>

                    <TouchableOpacity
                      style={styles.colorPurple}
                      onPress={() => this.changeBgColor(this.colors.purple)}
                    ></TouchableOpacity>

                    <TouchableOpacity
                      style={styles.colorGray}
                      onPress={() => this.changeBgColor(this.colors.gray)}
                    ></TouchableOpacity>

                    <TouchableOpacity
                      style={styles.colorGreen}
                      onPress={() => this.changeBgColor(this.colors.green)}
                    ></TouchableOpacity>
                  </View>
                <Pressable
                style={styles.chatButton}
                title="Start Chatting"
                onPress={() => this.props.navigation.navigate('Chat', {
                name: this.state.name, 
                bgColor: this.state.bgColor}
                )}
                />
          </View>
        </ImageBackground>
      </View>
    )
  }
}

/* Dedicated style props for each styling component */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  nameBox: {
    height: 35,
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 12,
  },
  startBox: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    height: '44%',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  textInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  chatButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    backgroundColor: "#757083",
  },
  colorArray: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%"
  },
  colorInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083"
  },
  colorBlack: {
    backgroundColor: "#090C08",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  colorPurple: {
    backgroundColor: "#474056",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  colorGray: {
    backgroundColor: "#8A95A5",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  colorGreen: {
    backgroundColor: "#B9C6AE",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});