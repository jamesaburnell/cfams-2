var React = require('react-native');

var {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	ScrollView,
	LayoutAnimation,
	TextInput,
	ActivityIndicatorIOS
} = React;

var DashHome = React.createClass({

	// Create _renderRow function for these, then add to Scroll View
	render: function () {
		return (
			<View style={styles.dashHome}>
				<Text>Run Home</Text>
			</View>
		)
	}
});

var styles = StyleSheet.create({
	dashHome: {
		flex: 1,
		alignItems: 'center'
	},

})

module.exports = DashHome;