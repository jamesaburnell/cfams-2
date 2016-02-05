'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Image
} = React;

var AccountHome = React.createClass({

	render: function () {

		var images = this.props.dummyData.map(function (element, index) {
			return (<Image resizeMode={Image.resizeMode.cover} style={styles.resizeMode} key={index} source={element.imgUrl} />)
		})

		return (
			<View style={styles.accountHome}>	
				<Text>{this.props.username}</Text>
				<Text>{this.props.password}</Text>
				<TouchableHighlight><View>{images}</View></TouchableHighlight>
			</View>
		)
	}
});

var styles = StyleSheet.create({
	accountHome: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center'
	},
	resizeMode: {
	    width: 180,
	    height: 120,
	    borderWidth: 0.5,
	    borderColor: 'black',
	    
  },
})

module.exports = AccountHome;