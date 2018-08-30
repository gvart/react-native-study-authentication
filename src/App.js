/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {Button, Header, Spinner} from './components/common';
import LoginForm from "./components/LoginForm";

export default class App extends Component<Props> {
  constructor(props) {
      super(props);
      this.state = { loggedIn: null }
  }
  componentWillMount() {
      firebase.initializeApp({
          apiKey: 'AIzaSyCa4s345gk9MArwIECaNZABaSe3QSpWD1s',
          authDomain: 'athentication-aff2f.firebaseapp.com',
          databaseURL: 'https://athentication-aff2f.firebaseio.com',
          projectId: 'athentication-aff2f',
          storageBucket: 'athentication-aff2f.appspot.com',
          messagingSenderId: '85705955593'
      });

      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.setState({ loggedIn: true});
          } else {
              this.setState({ loggedIn: false});
          }
      });
  }

  renderContent() {
      switch (this.state.loggedIn) {
          case true:
              return (
                  <View style={{height: 40}}>
                      <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
                  </View>
              );
          case false:
              return <LoginForm/>;
          default:
              return <Spinner/>;

      }
  }


  render() {
    return (
      <View>
        <Header name={'Authentication'}/>
          {this.renderContent()}
      </View>
    );
  }
}
