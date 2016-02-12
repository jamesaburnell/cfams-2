'use strict';

// 
// THIS PAGE WILL COME B4 THE UNAPPROVED CONTENT, AFTER CHOOSING THE DASH.
// IT WILL HOUSE MOST (IF NOT ALL) OF THE FUNCTIONALITY (BUTTONS, INPUT, ETC) FOR THE INDIVIDUAL DASHES
//

var React = require('react-native');
var Dash = require('./Dash.js');

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

var ScrapeHome = React.createClass({

	getInitialState: function () {
		return {
			twitterTerm: '',
			giphyTerm: '',
			redditTerm: '',
			tumblrTerm: '',
			animating: {
				twitter: false,
				giphy: false,
				reddit: false,
				tumblr: false
			}
		}
	},

	goToUnapprovedContent: function () {
		this.props.navigate(this.props.navigator, Dash, 'Dash')
	},

	addTerms: function (toggle, term) {
		this.props.resetContentState();
		fetch('http://localhost:3000/dashes/'+this.props.currentAccount.id+'/'+toggle+'?search_term='+term, {method: 'GET'}, function(){
			this.setState({
				animating: {
					twitter: true
				}
			})
		}, function (err) {
			console.error('Error adding Terms: ', err)
		}.bind(this))
		.then(function (response) {
			console.log('Term Response: ', response)
			this.setState({
				animating: {
					twitter: false
				}
			})
		}.bind(this))
	},

	goToDashes: function (id) {
		// console.log('in go to dashes');
		if(!this.props.unapprovedContent) {
			return this.props.getDashContent(id, this.goToDashes);
		}
		this.props.navigate(this.props.navigator, Dash, 'Dash');
	},

	// Create _renderRow function for these, then add to Scroll View
	render: function () {
		return (
			<View style={styles.ScrapeHome}>
				<Text>Dash Home!</Text>
					<View style={styles.termContainer}>
						<TouchableHighlight>
							<TextInput onChangeText={function (term) {this.setState({twitterTerm: term})}.bind(this)} style={styles.inputField} />
						</TouchableHighlight>
						<TouchableHighlight style={[styles.button, {backgroundColor: '#4099FF'}]} onPress={function(){this.addTerms('twitter-pics', this.state.twitterTerm)}.bind(this)}>
							<Text style={{fontFamily: 'verdana'}}>Twitter</Text>
						</TouchableHighlight>
					</View>

					<View style={styles.termContainer}>
						<TouchableHighlight>
							<TextInput onChangeText={function (term) {this.setState({giphyTerm: term})}.bind(this)} style={styles.inputField} />
						</TouchableHighlight>
						<TouchableHighlight style={[styles.button, {backgroundColor: '#35465C'}]} onPress={function(){this.addTerms('giphy-gifs', this.state.giphyTerm)}.bind(this)}>
							<Text style={{fontFamily: 'verdana'}}>Giphy</Text>
						</TouchableHighlight>
					</View>

					<View style={styles.termContainer}>
						<TouchableHighlight>
							<TextInput onChangeText={function (term) {this.setState({redditTerm: term})}.bind(this)} style={styles.inputField} />
						</TouchableHighlight>
						<TouchableHighlight style={[styles.button, {backgroundColor: '#5F99CF'}]} onPress={function(){this.addTerms('reddit-pics', this.state.redditTerm)}.bind(this)}>
							<Text style={{fontFamily: 'verdana'}}>Reddit</Text>
						</TouchableHighlight>
					</View>

					<View style={styles.termContainer}>
						<TouchableHighlight>
							<TextInput onChangeText={function (term) {this.setState({tumblrTerm: term})}.bind(this)} style={styles.inputField} />
						</TouchableHighlight>
						<TouchableHighlight style={[styles.button, {backgroundColor: '#35465C'}]} onPress={function(){this.addTerms('tumblr-pics', this.state.tumblrTerm)}.bind(this)}>
							<Text style={{fontFamily: 'verdana'}}>Tumblr</Text>
						</TouchableHighlight>
					</View>

				<TouchableHighlight onPress={function (){this.goToDashes(this.props.currentAccount.id)}.bind(this)}>
					<Text>Scrape!</Text>
				</TouchableHighlight>
			</View>
		)
	}
});

var styles = StyleSheet.create({
	ScrapeHome: {
		flex: 1,
		justifyContent: 'center'
	},
	inputField: {
		height: 50,
        width: 300,
        borderColor: '#B2CFDD',
        borderRadius: 4,
        borderWidth: 2,
        padding: 5,
        justifyContent: 'center',
        color: 'darkgrey',
        backgroundColor: '#ffffff'
	},
	button: {
		backgroundColor: '#B3CFE8',
		width: 100,
		height: 40,
		marginBottom: 20
	},
	termContainer: {
		backgroundColor: '#F5F5F5',
		padding: 5,
		marginTop: 20,
		borderColor: '#B2CFDD',
        borderRadius: 4,
        borderWidth: 2, 
	}

})

module.exports = ScrapeHome;