'use strict';

var React = require('react-native');
var Login = require('./components/Login.js');
var Navbar = require('./components/Navbar.js');

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
      initialContentLoaded: false,
      accountDenied: false,
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

  checkCreds: function (func) {
    // Get DB set up first, lulz
    fetch("http://localhost:3000/auth/sign_in?email="+this.state.username+"&password="+this.state.password+"", {method: "POST"}, function (error) {
      console.error(error);
    })
      .then(function (response) {

        console.log(response.status);
        // this.getDashContent(func);
        if(response.status === 200) {
          return response.headers.map
        } else {
          this.setState({
            accountDenied: true
          })
        }

      }.bind(this))
      .then(function (responseData) {
        console.log('RD', responseData)
        if(!this.state.accountDenied) {
          this.setState({
            userHeaders: {
              access_token: responseData['access-token'][0],
              client: responseData.client[0],
              expiry: responseData.expiry[0],
              token_type: responseData['token-type'][0],
              uid: responseData.uid[0]
            }
          })
        }
        return this.state.userHeaders;

      }.bind(this))
      .then(function (headers) {
        console.log('saved headers: ', this.state.userHeaders);
      }.bind(this))

  },

  setHead: function (data, func) {

  },

  getDashesList: function(func) {
    fetch('http://localhost:3000/dashes', {method: 'GET'}, function (err) {
      console.log('error getting dashes: ', err);
    })
    .then(function (response) {
      console.log('dashes list: ', response);
    })
  },

  getDashContent: function (func) {
    fetch('http://localhost:3000/dashes/1.json', {method: 'GET'}, function (err) {
      console.log("error getting dash content: ", err)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (responseData) {
        console.log('reddit: ', responseData);
        this.setState({
          unapprovedContent: responseData,
        })
      }.bind(this))
      .done(function(){
        console.log('CONTENT: ', this.state.unapprovedContent);
        this.setState({
          initialContentLoaded: true
        })
        func()
      }.bind(this))
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
      <View>
      
        <Navbar  
            navigate={this._navigate}
            navigator={navigator} />

        <Component  navigate={this._navigate} 
                    dummyData={this.state.dummyData} 
                    setPassword={this.setPassword} 
                    setUsername={this.setUsername} 
                    username={this.state.username} 
                    password={this.state.password} 
                    checkCreds={this.checkCreds}
                    unapprovedContent={this.state.unapprovedContent}
                    initialContentLoaded={this.state.initialContentLoaded}
                    {...route.props}
                    navigator={navigator}
                    route={route} />
      </View>
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