'use strict';

var React = require('react-native');
var SignUp = require('./SignUp.js');
var AccountHome = require('./AccountHome.js')

var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TextInput
} = React;

var Login = React.createClass({

	goToSignUp: function () {
		this.props.navigate(this.props.navigator, SignUp, 'Sign Up');
	},

	goToAccountHome: function () {
		
		this.props.checkCreds();
		this.props.navigate(this.props.navigator, AccountHome, 'Account Home');
	},

	render: function () {
		return (
			<View style={styles.login}>

				<View style={styles.headingContainer}>
					<Text style={styles.heading}>Welcome to the Greenery</Text>
					<Text style={styles.tagLine}>the premier content finding and management system</Text>
					<Text style={styles.tagLine}>for the cannabis industry</Text>
				</View>

				<Text>Username:</Text>
                <TouchableHighlight>
                    <TextInput style={styles.inputField} onChangeText={this.props.setUsername} />    
                </TouchableHighlight>

                <Text>Password:</Text>
                <TouchableHighlight>
                    <TextInput style={styles.inputField} onChangeText={this.props.setPassword} />    
                </TouchableHighlight>

				<View>
					<TouchableHighlight onPress={this.goToSignUp}>
						<Text>SIGN UP PAGE</Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={this.goToAccountHome}>
						<Text>LOGIN</Text>
					</TouchableHighlight>
				</View>	

			</View>	
		)
	}
});

var styles = StyleSheet.create({
	login: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',

	},
	inputField: {
		height: 50,
        width: 300,
        borderColor: 'grey',
        borderWidth: 2,
        marginBottom: 30,
        padding: 5,
        justifyContent: 'center',
        color: 'darkgrey',
        backgroundColor: '#ffffff'
	},
	headingContainer: {
		marginBottom: 30,
		alignItems: 'center',
	},
	heading: {
		fontSize: 30,
	},
	tagLine: {
		fontSize: 15,
		fontStyle: 'italic',
	}
})

module.exports = Login;