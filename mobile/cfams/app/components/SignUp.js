'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} = React;

var SignUp = React.createClass({
	render: function () {
		return (
			<View style={styles.signUp}><TouchableHighlight><Text>SIGN UP, YO</Text></TouchableHighlight></View>
		)
	}
});

var styles = StyleSheet.create({
	signUp: {
		flex: 1,
		justifyContent: 'center'
	}
})

module.exports = SignUp;