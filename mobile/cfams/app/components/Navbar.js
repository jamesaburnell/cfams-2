var React = require('react-native');
var ApprovedContent = require('./ApprovedContent.js');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  LayoutAnimation,
} = React;

var Navbar = React.createClass({
	getInitialState: function () {
		return {
			navStyle: {
				height: 50
			}
		}
	},

	toApprovedPage: function () {
		this.props.navigate(this.props.navigator, ApprovedContent, 'Approved Content');
	},

	animateNavbar: function () {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		this.setState({
			navStyle: {
				height: this.state.navStyle.height > 50 ? 50 : 200,
			}
		})
	},

	render: function () {
		var navbarStyle = [styles.container, this.state.navStyle]
		return (
			<View style={navbarStyle}>
				<View style={{marginTop: 15, flex: 1, flexDirection: 'row'}}>
					
					<View style={styles.menuButton}>
						<TouchableHighlight 
							onPress={this.animateNavbar} 
							style={styles.menuButton}
							>
							<Text style={{fontSize: 30}}>...</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		)
	}
})

var styles = StyleSheet.create({
	container: {
		width: 400,
		backgroundColor: 'turquoise',
		flex: 1,
		flexDirection: 'row'
	},
	menuButton: {
		width: 50,
		alignItems: 'flex-end',
		left: 120,
	}

})

module.exports = Navbar;