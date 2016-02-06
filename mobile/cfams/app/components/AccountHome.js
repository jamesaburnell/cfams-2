'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Image,
  LayoutAnimation,
  TouchableWithoutFeedback
} = React;

var AccountHome = React.createClass({

	getInitialState: function () {
		return {
			viewStyle: {
				height: 120,
			    width: 180
			}
		}
	},

	animateView: function () {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
		this.setState({
			viewStyle: {
				height: this.state.viewStyle.height > 120 ? 120 : 250,
				width: this.state.viewStyle.width > 180 ? 180 : 300
			}
		})
	},

	createList: function () {
		
	},

	render: function () {
		var imageStyle = [styles.resizeMode, this.state.viewStyle]
		var images = this.props.dummyData.map(function (element, index) {
			return (<TouchableWithoutFeedback onPress={this.animateView}><Image resizeMode={Image.resizeMode.cover} style={imageStyle} key={index} source={element.imgUrl} /></TouchableWithoutFeedback>)
		}.bind(this))

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
	    // height: 120,
	    borderWidth: 0.5,
	    borderColor: 'black',
	    
  },
})

module.exports = AccountHome;