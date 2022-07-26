import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

/* The application’s main <Chat/> component that renders the chat interface */
export default class Chat extends React.Component {
  /* Transfers user's name from <Start/> component */
constructor(props) {
  super(props);
  this.state = { name: '', bgColor: "" };
}

render() {
/* function takes props from <Start/> and displays the user's name in navigation bar */
let { name } = this.props.route.params;
this.props.navigation.setOptions({ title: name });


/* function takes props from <Start/> and displays the user's chosen color in chat view */
let { bgColor } = this.props.route.params;
this.props.navigation.setOptions({ backgroundColor: bgColor });

return (
 /* Chat screen rendered for user */
      <View style={styles.container}>
        <Button 
          title="Go Back"
          onPress={() => this.props.navigation.navigate('Start')}/>
        </View>
      );
    };
  }

/* Dedicated style props for each styling component */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
});