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
    }
  },

  componentDidMount: function () {
    this.setState(this.getInitialState())
    console.log('CLEARED STATE: ', this.state)
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

  saveId: function (dashId, func) {
      var currAcct = this.state.userDashes.filter(function (element) {
        if(element.id === dashId){
          return true;
        }
        return false;
      })
      this.setState({
        currentAccount: currAcct[0]
      })
      this.getDashContent(dashId, func);
      console.log('current account state', this.state);
    },

  checkCreds: function (func) {
    // Get DB set up first, lulz
    fetch("http://localhost:3000/auth/sign_in?email="+this.state.username+"&password="+this.state.password+"", {method: "POST"}, function (error) {
      console.error(error);
    })
      .then(function (response) {
        if(response.status === 200) {
          return response.headers.map
        } else {
          this.setState({
            accountDenied: true
          })
        }
      }.bind(this))
      .then(function (responseData) {
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
        console.log('User Headers: ', this.state.userHeaders)
        return this.state.userHeaders;
      }.bind(this))
      .then(function (headers) {
        this.setState({userLoggedIn: true})
        this.getDashesList(headers, func)
      }.bind(this))

  },

  setHead: function (data, func) {

  },

  getDashesList: function(headers, func) {
    fetch('http://localhost:3000/dashes.json', {method: 'GET', headers: headers}, function (err) {
      console.error('error getting dashes: ', err);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      this.setState({
        userDashes: responseData
      })
    }.bind(this))
    .done(function () {
      console.log('dashes: ', this.state.userDashes)
      func()
    }.bind(this))

  },

  getDashContent: function (dashId, func) {
    fetch('http://localhost:3000/dashes/'+dashId+'.json', {method: 'GET'}, function (err) {
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (responseData) {
        this.setState({
          unapprovedContent: responseData,
        })
      }.bind(this))
      .done(function(){
        this.setState({
          initialContentLoaded: true
        })
        func()
      }.bind(this))
  },

  getApprovedContent: function (dashId, func) {
    fetch('http://localhost:3000/dashes/'+dashId+'/queue.json', {method: 'GET'}, function (err) {
      console.log("Error retrieving approved content: ", err)
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (responseData) {
      this.setState({
        approvedContent: responseData
      })
    }.bind(this))
    .done(function(){
      console.log("state set: ", this.state.approvedContent)
      func()
    }.bind(this))
  },

  _navigate: function (navigator, component, title) {
    navigator.push({
      component: component,
      title: title
    })
  },

  // _renderNavbar: function () {
  //   return !this.props.userLoggedIn ?  : null
  // },

  _renderScene: function (route, navigator) {
    var Component = route.component;
    // var nav = this._renderNavbar()
    return (
      <View>
      
        <Navbar approvedContent={this.state.approvedContent} getApprovedContent={this.getApprovedContent} currentAccount={this.state.currentAccount} navigate={this._navigate} navigator={navigator} />

        <Component  navigate={this._navigate} 
                    dummyData={this.state.dummyData} 
                    setPassword={this.setPassword} 
                    setUsername={this.setUsername} 
                    username={this.state.username} 
                    password={this.state.password} 
                    checkCreds={this.checkCreds}
                    unapprovedContent={this.state.unapprovedContent}
                    initialContentLoaded={this.state.initialContentLoaded} 
                    userDashes={this.state.userDashes}
                    accountDenied={this.props.accountDenied}
                    userLoggedIn={this.state.userLoggedIn}
                    saveId={this.saveId} 
                    getApprovedContent={this.getApprovedContent}
                    currentAccount={this.state.currentAccount} 
                    approvedContent={this.state.approvedContent}
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