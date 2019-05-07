import React, { Component } from 'react';
import { StyleSheet, View, Image, WebView } from 'react-native';
//import { WebView } from 'react-native-webview';
//UI
import { Container, Button, Text, Form, Input, Label, Item, H1 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//constants
import { baseUrl } from '../common/Constants';

export default class LoginAuth extends Component {
constructor(props) {
  super(props);
  this.props.navigation.navigate('Home');
  this.webView = null;
}

  onMessage = (event) => {
    let id = event.nativeEvent.data
    console.log(id);
    this.props.navigation.navigate('Home', {Id: id});
  }

  sendPostMessage() {
    console.log("Sending post message");
    this.webView.postMessage("Post message from react native");
  }
  render() {
    return (
      <WebView
        //originWhitelist={['*']}
        source={{ uri: baseUrl+'/index.php' }}
        scalesPageToFit={true}
        ref={(webView) => this.webView = webView}
        onMessage={this.onMessage}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  }
});