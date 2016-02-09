'use strict';

var React = require('react-native');
var Dash = require('./Dash.js')

var {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Image,
  LayoutAnimation,
  TouchableWithoutFeedback,
  ScrollView,
  Link
} = React;

var AccountHome = React.createClass({

	getInitialState: function () {
		return {
			viewStyle: {
				height: 240,
			    width: 360
			}
		}
	},

	goToDashes: function (id) {
		if(!this.props.unapprovedContent) {
			return this.props.saveId(id, this.goToDashes);
		}
		this.props.navigate(this.props.navigator, Dash, 'Dash');
	},

	render: function () {
		console.log('user dashes: ', this.props.userDashes)
		var dashList = this.props.userDashes.map(function (dash) {
			return ( <View><TouchableHighlight onPress={function(){this.goToDashes(dash.id)}.bind(this)} style={styles.dash}><Text>{dash.title}</Text></TouchableHighlight></View> )
		}.bind(this)) 


		return (
			<View style={styles.container}>	
				{dashList}	
			</View>
		)
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20
	},
	dash: {
		backgroundColor: 'turquoise',
		padding: 10,
		borderRadius: 10,
	}

})

module.exports = AccountHome;