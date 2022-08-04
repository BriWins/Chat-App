import React from 'react';
import { View,  Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage'

//import database to store messages
const firebase = require('firebase');
require('firebase/firestore');

// Google Firestore credentials 
const firebaseConfig = {
  apiKey: "AIzaSyCGfprEOsn-4YrGEdV-EHWM7F8foTqnYXI",
  authDomain: "chat-app-277b7.firebaseapp.com",
  projectId: "chat-app-277b7",
  storageBucket: "chat-app-277b7.appspot.com",
  messagingSenderId: "625602329790",
  appId: "1:625602329790:web:09e31c7a9bbbb0c704f2ef",
  measurementId: "G-BRQDEZNRMP"
};

// The application’s main <Chat/> component that renders the user's chat screen 
export default class Chat extends Component {
  constructor () {
    super();
      this.state ={
        messages: [],
        uid: 0,
        user: {
          _id: "",
          name: "",
        },
    }

    // Firestore app initialization
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    //function stores and retrieves chat message
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.referenceMessagesUser= null;
  }

// render lifecycle beginning
componentDidMount() {
    
// function takes props from <Start/> and displays the user's name in navigation bar 
let { name } = this.props.route.params;
this.props.navigation.setOptions({ title: name });

// function takes props from <Start/> and displays the user's chosen color as chat background color
let { newColor } = this.props.route.params;
this.props.navigation.setOptions({ backgroundColor: newColor });

// loading messages to be stored in database collection
this.referenceChatMessages = firebase.firestore().collection("messages");
    
// user authentication via Firebase
this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    firebase.auth().signInAnonymously();
  }
  this.setState({
    uid: user.uid,
    messages: [],
    user: {
      _id: user.uid,
      name: name,
  },
});

  this.referenceMessagesUser = firebase.firestore().collection("messages").where("uid", '==', this.state.uid);            
  // saving messages while user is online
  this.saveMessages();
  this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc")     
  });    
}

// temporarily stores messages
async getMessages() {
  let messages = '';
  try {
    messages = await AsyncStorage.getItem('messages') || [];
    this.setState({
      messages: JSON.parse(messages)
    });
  } catch (error) {
    console.log(error);
  }
};


// end of render lifecycle
componentWillUnmount() {
  this.authUnsubscribe();
}

 // Adds messages to cloud storage
 addMessages() {
  const message = this.state.messages[0];
  this.referenceChatMessages.add({
    uid: this.state.uid,
    _id: message._id,
    text: message.text || "",
    createdAt: message.createdAt,
    user: message.user,
  });
}

// updates message state
onSend(messages = []) {
  this.setState((previousState) => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }),() => {
    this.addMessages();
    this.getMessages();
  });
}


onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  querySnapshot.forEach((doc) => {
    var data = doc.data();
    messages.push({
      _id: data._id,
      text: data.text,
      createdAt: data.createdAt.toDate(),
      user: {
        _id: data.user._id,
      } 
    });
  });
  this.setState({
    messages: messages,
  });
};

// user cannot send messages while offline
renderInputToolbar(props) {
  if (this.state.isConnected == false) {
  } else {
    return(
      <InputToolbar
      {...props}
      />
    );
  }
}

// Customize the color of the sender bubble
renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#ADD8E6'
        }
      }}
    />
  )
}

render() {

//grabbing user's name and selected color
let { newColor, name } = this.props.route.params;

return (
 // Chat screen rendered for user 
      <View  style={[{ backgroundColor: newColor }, styles.container]}>
          <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={ (messages) => this.onSend(messages)}
          user={{
            _id: 1,
            name: name,
          }}
          />
          {/* Makes sure older mobile version keyboard don't block messages upon render*/}
  { Platform.OS === 'android' ? (<KeyboardAvoidingView behavior="height" />) : null }
      </View>
      );
    };
  }

// Dedicated style props for each styling component 
const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});