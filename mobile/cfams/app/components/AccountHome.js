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

	animateView: function () {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
		this.setState({
			viewStyle: {
				height: this.state.viewStyle.height > 240 ? 240 : 250,
				width: this.state.viewStyle.width > 180 ? 180 : 300
			}
		})
	},

	approvePost: function (dashId, postId, toggle) {
		fetch('http://localhost:3000/dashes/'+dashId+'/posts/'+postId+'/'+toggle, {method: 'GET'}, function (err) {
			console.error("error: ", err)
		})
		.then(function (response) {
			console.log('approvePost response: ', response)
		})
	},

	render: function () {
		console.log(this.props)
		var imageStyle = [styles.resizeMode, this.state.viewStyle]
		var images = this.props.unapprovedContent.map(function (element, index) {
			return (

				<View style={{marginBottom: 50, }}>
					
					<Image resizeMode={Image.resizeMode.cover} style={imageStyle} key={index} source={{uri: element.image_src}} />
					<Text style={{fontStyle: 'italic'}}>{element.body}</Text>					
					<Text style={{fontStyle: 'italic'}}>Source: {element.title}</Text>

					<View style={styles.choice}>
						
						<TouchableHighlight onPress={function(){this.approvePost(element.dash_Id, element.id, 'toggle_approve')}.bind(this)} style={styles.choiceButton}>
							<Text>Approve</Text>
						</TouchableHighlight>
						
						<TouchableHighlight onPress={function(){this.approvePost(element.dash_Id, element.id, 'toggle_disapprove')}.bind(this)} style={styles.choiceButton}>
							<Text>Disapprove</Text>
						</TouchableHighlight>

					</View>

				</View>

				)
		}.bind(this)) 

		return (
			<View style={styles.accountHome}>	
				<Text>{this.props.username}</Text>
				<ScrollView 
					automaticallyAdjustContentInsets={false}>
					<View>{images}</View>
				</ScrollView>
				
			</View>
		)
	}
});

var styles = StyleSheet.create({
	accountHome: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 20
	},
	resizeMode: {
	    //width: 180,
	    // height: 120,
	    flex: 2,
	    flexDirection: 'row',
	    borderWidth: 0.5,
	    borderColor: 'black',
	    
 	},
 	choiceButton: {
 		width: 100,
 		height: 30,
 		backgroundColor: 'lightgrey',
	    borderWidth: 0.5,
	    borderColor: 'black',


 	}

})

module.exports = AccountHome;