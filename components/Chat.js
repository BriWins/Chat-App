import React from 'react';
import { View,  Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

/* The application’s main <Chat/> component that renders the chat interface */
export default class Chat extends React.Component {
/* Transfers user's name from <Start/> component */
constructor(props) {
  super(props);
  this.state = { 
    name: '',
    messages: [] 
  };
}

/* starting the message state with a static message*/
componentDidMount() {
  this.setState({
    messages: [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
       },
       {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
       },
      ]
  })
}

/* onSend() updates the message and creates a new message state */
onSend(messages = []) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }))
}

/* colors chat render bubbles black */
renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000'
        }
      }}
    />
  )
}

render() {
/* function takes props from <Start/> and displays the user's name in navigation bar */
let { name } = this.props.route.params;
this.props.navigation.setOptions({ title: name });

/* function takes props from <Start/> and displays the user's chosen color in chat view */
let { colors } = this.props.route.params;
this.props.navigation.setOptions({ backgroundColor: colors });

return (
 /* Chat screen rendered for user */
      <View  style={[{ backgroundColor: colors }, styles.container]}>
          <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          />
          {/* Makes sure older mobile version keyboard don't block messages upon render*/}
  { Platform.OS === 'android' ? (<KeyboardAvoidingView behavior="height" />) : null }
      </View>
      );
    };
  }

/* Dedicated style props for each styling component */
const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});