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
				height: 400,
			}
		}
	},

	animateView: function () {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
		this.setState({
			viewStyle: {
				height: this.state.viewStyle.height > 400 ? 400 : 500,
			}
		})
	},

	render: function () {
		console.log(this.props)
		var imageStyle = [styles.resizeMode, this.state.viewStyle]
		var idProp = 0;
		var images = this.props.unapprovedContent.map(function (element, index) {
			idProp++;
			return (

				<View key={idProp} style={{marginBottom: 50, flex: 1}}>
					<View style={{flex: 1}}>
						<Image resizeMode={Image.resizeMode.contain} style={imageStyle} key={index} source={{uri: element.image_src}} />
						<Text style={{fontStyle: 'italic'}}>{element.body}</Text>					
						<Text style={{fontStyle: 'italic'}}>Source: {element.title}</Text>
					</View>
					<View>
						<TouchableHighlight onPress={function(){this.props.approvePost(element.dash_Id, element.id, 'toggle_approve')}.bind(this)} style={[styles.choiceButton, {backgroundColor: "#1E824C"}]}>
							<Text style={{color: '#ffffff'}}>Approve</Text>
						</TouchableHighlight>
						
						<TouchableHighlight onPress={function(){this.props.approvePost(element.dash_Id, element.id, 'toggle_disapprove')}.bind(this)} style={[styles.choiceButton, {backgroundColor: "#CF000F" }]}>
							<Text style={{color: '#ffffff'}}>Disapprove</Text>
						</TouchableHighlight>
					</View>
				</View>

				)
		}.bind(this)) 
		         
		// onPress={() => { _scrollView.scrollTo({y: 0}); }}>
		// var _scrollView: ScrollView;
		return (
			<View>
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
			</View>
		)
	}
});

var styles = StyleSheet.create({
	scrollView: {
	    backgroundColor: '#EAEAEA',
    	// backgroundColor: 'D9F0FF',
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
	    borderBottomWidth: 0.5,
	    borderColor: 'black',
	    backgroundColor: '#ffffff'
	    
 	},
 	choiceButton: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginHorizontal: 5,
	    marginVertical: 3,
	    padding: 5,
	    backgroundColor: '#EAEAEA',
	    borderRadius: 3,
	    paddingVertical: 10,

 	}

})

module.exports = Dash;