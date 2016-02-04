var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} = React;

var AccountHome = React.createClass({
	render: function () {
		return (
			<View style={styles.accountHome}><TouchableHighlight><Text>YER IN, YO</Text></TouchableHighlight></View>
		)
	}
});

var styles = StyleSheet.create({
	accountHome: {
		flex: 1,
		justifyContent: 'center'
	}
})

module.exports = AccountHome;