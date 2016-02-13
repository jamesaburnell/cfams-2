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

	getInitialState: function () {
		return {
			term: '',
			count: ''
		}
	},

	addTerm: function () {
		console.log('term:', this.state.term, ' count:', this.state.count);

	},

	startPhil: function () {
		console.log('booting up Phil...');
	},

	// Create _renderRow function for these, then add to Scroll View
	render: function () {
		return (
			<View style={styles.dashHome}>
				<Text>This is Phil</Text>
				<Text>he's very good at following directions.</Text>
				<Text>he's here to help people find your brand.</Text>
				<Text>plug in a few tags below and</Text>
				<Text>phil will go to work.</Text>
				<Text>let phil bring people to the party.</Text>

				<TextInput onChangeText={function (value) {this.setState({term: value})}.bind(this)} style={styles.inputField} placeholder='term' />
				<TextInput onChangeText={function (value) {this.setState({count: value})}.bind(this)} style={styles.inputField} placeholder='count' />
				<View style={styles.philButtonsCont}>
					<TouchableHighlight style={styles.button} onPress={this.addTerm}>
						<Text style={{fontFamily: 'verdana', color: "#000000"}}>Add Term</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.button} onPress={this.createNewTerm}>
						<Text style={{fontFamily: 'verdana', color: "#000000"}}>Start Phil!</Text>
					</TouchableHighlight>
				</View>
			
			</View>
		)
	}
});

var styles = StyleSheet.create({
	dashHome: {
		flex: 1,
		alignItems: 'center'
	},
	inputField: {
		height: 50,
        flexDirection: 'row',
        borderColor: '#B2CFDD',
        borderRadius: 4,
        borderWidth: 2,
        padding: 5,
        justifyContent: 'center',
        color: 'darkgrey',
        backgroundColor: '#ffffff',
        marginHorizontal: 5,
	    marginVertical: 3,
	},
	button: {
		flex: .5,
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginHorizontal: 5,
	    marginVertical: 3,
	    padding: 5,
	    borderRadius: 3,
	    paddingVertical: 10,
	    paddingHorizontal: 40,
	    backgroundColor: '#EAEAEA',

	},
	philButtonsCont: {
		flex: .5,
		flexDirection: 'row',
	}

})

module.exports = DashHome;