'use strict';

// 
// THIS PAGE WILL COME B4 THE UNAPPROVED CONTENT, AFTER CHOOSING THE DASH.
// IT WILL HOUSE MOST (IF NOT ALL) OF THE FUNCTIONALITY (BUTTONS, INPUT, ETC) FOR THE INDIVIDUAL DASHES
//

var React = require('react-native');
var Dash = require('./Dash.js');
var ScrapeHome = require('./ScrapeHome.js');
var RunHome = require('./RunHome.js')

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

	goToScrapeHome: function (id) {
		if(!this.props.unapprovedContent) {
			return this.props.getDashContent(id, this.goToScrapeHome);
		}
		this.props.navigate(this.props.navigator, ScrapeHome, 'Scrape Home');
	},

	goToRunHome: function (id) {
		// if(!this.props.unapprovedContent) {
		// 	return this.props.getDashContent(id, this.goToScrapeHome);
		// }
		this.props.navigate(this.props.navigator, RunHome, 'Run Home');
	},

	// Create _renderRow function for these, then add to Scroll View
	render: function () {
		return (
			<View style={styles.dashHome}>
				<TouchableHighlight onPress={function (){this.goToScrapeHome(this.props.currentAccount.id)}.bind(this)}>
					<Text>Scrape</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={function (){this.goToRunHome(this.props.currentAccount.id)}.bind(this)}>
					<Text>Run</Text>
				</TouchableHighlight>
			</View>
		)
	}
});

var styles = StyleSheet.create({
	dashHome: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'

	},

})

module.exports = DashHome;