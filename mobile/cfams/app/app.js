'use strict';

var React = require('react-native');
var Login = require('./components/Login.js');

var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator
} = React;

var cfams = React.createClass({

  getInitialState: function () {
    return {
      username: null,
      password: null,
      dummyData: [
        {
          title: 'story 1',
          imgUrl: require('./../dummyData/img1.png'),
          info: 'dis is tha info for dis pic mon'
        },
        {
          title: 'story 2',
          imgUrl: require('./../dummyData/img2.png'),
          info: 'dis be da info for dis here pic ma main mon'
        },
        {
          title: 'story 3',
          imgUrl: require('./../dummyData/img3.png'),
          info: 'right by da beach mon'
        },

      ]
    }
  },

  setUsername: function (username) {
    this.setState({
      username: username
    })
  },

  setPassword: function (password) {
    this.setState({
      password: password
    })
  },

  checkCreds: function () {
    // Get DB set up first, lulz
    fetch("http://localhost:3000/users/sign_in?email="+this.state.username+"&password="+this.state.password+"", {method: "POST"}, function (error) {
      console.error(error);
    })
      .then(function (response) {
        console.log(response);
        this.getDashContent();
      })
  },

  getDashContent: function () {
    fetch('http://localhost:3000/dashes/1.json', {method: 'GET'}, function (err) {
      console.log("ERROR: ", err)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (responseData) {
        console.log('redit: ', responseData);
        this.setDashContent(responseData);
      })
  },

  setDashContent: function (data) {
    this.setState({
      unapprovedContent: data
    })
  },

  _navigate: function (navigator, component, title) {
    navigator.push({
      component: component,
      title: title
    })
  },

  _renderScene: function (route, navigator) {
    var Component = route.component;
    return (
      <Component  navigate={this._navigate} 
                  dummyData={this.state.dummyData} 
                  setPassword={this.setPassword} 
                  setUsername={this.setUsername} 
                  username={this.state.username} 
                  password={this.state.password} 
                  checkCreds={this.checkCreds}
                  unapprovedContent={this.unapprovedContent}
                  {...route.props}
                  navigator={navigator}
                  route={route} />
    )
  },

  render: function () {
    return (
      <Navigator 
          initialRoute={{name: 'Login', component: Login, index: 0}}
          renderScene={this._renderScene} />
    );
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = cfams;