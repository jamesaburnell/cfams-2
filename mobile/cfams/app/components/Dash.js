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
  TouchableOpacity,
  ScrollView,
} = React;

var Dash = React.createClass({

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
		var idProp = 0;
		var images = this.props.unapprovedContent.map(function (element, index) {
			idProp++;
			return (

				<View key={idProp} style={{marginBottom: 50, }}>
					
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
		         
		// onPress={() => { ScrollView.scrollTo({y: 0}); }}>
		var _scrollView: ScrollView;
		return (
			<View>	
				
		        <ScrollView
		          	automaticallyAdjustContentInsets={false}
		          	horizontal={false}
		          	style={[styles.scrollView, styles.horizontalScrollView]}>
		          	{images}
		        </ScrollView>
		        <TouchableOpacity
		          style={styles.button}>
		          <Text>Scroll to Top</Text>
		        </TouchableOpacity>
		     </View>
				
			
		)
	}
});

var styles = StyleSheet.create({
	scrollView: {
    	backgroundColor: 'D9F0FF',
    	height: 300,
  	},
  	horizontalScrollView: {
    	height: 600,
  	},
	accountHome: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 20
	},
	resizeMode: {
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

module.exports = Dash;