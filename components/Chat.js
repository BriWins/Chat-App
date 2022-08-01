import React from 'react';
import { View,  Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
/* Import the functions you need from the SDKs you need */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/* Google Firebase credentials */
const firebaseConfig = {
  apiKey: "AIzaSyCGfprEOsn-4YrGEdV-EHWM7F8foTqnYXI",
  authDomain: "chat-app-277b7.firebaseapp.com",
  projectId: "chat-app-277b7",
  storageBucket: "chat-app-277b7.appspot.com",
  messagingSenderId: "625602329790",
  appId: "1:625602329790:web:09e31c7a9bbbb0c704f2ef",
  measurementId: "G-BRQDEZNRMP"
};

/* The application’s main <Chat/> component that renders the chat interface */
export default class Chat extends React.Component {
/* Transfers user's name from <Start/> component */
constructor(props) {
  super(props);
  this.state = { 
    name: '',
    messages: [] 
};

/* Stores and retrieves user chat messages */  
this.referenceChatMessages = firebase.firestore().collection("messages");
}

onCollectionUpdate = (querySnapshot) => {
const messages = [];
/* go through each document */
querySnapshot.forEach((doc) => {
  /* get the QueryDocumentSnapshot's data */
  let data = doc.data();
  messages.push({
    _id: data._id,
    text: data.text,
    createdAt: data.createdAt.toDate(),
    user: data.user,
  });
});
}

/* starting the message state with a static message */
componentDidMount() {
  this.setState({
    messages: [],
    uid: 0,
  })

this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    await firebase.auth().signInAnonymously();
  }
  
  //update user state with currently active user data
  this.setState({
    uid: user.uid,
    loggedInText: 'Hello there',
  });
});

/* Loading messages via Firebase */
this.referenceChatMessages = firebase.firestore().collection("messages");
}

/* onSend() updates the message and creates a new message state */
onSend(messages = []) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }))
}

componentWillUnmount() {
  if (this.isConnected) {
    this.unsubscribe();
    this.authUnsubscribe();
  }
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