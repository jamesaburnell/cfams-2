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
} = React;

var ApprovedContent = React.createClass({

  componentDidMount: function () {
    console.log('ayyy ', this.props.approvedContent);
  },

	render: function () {
		return (

			<View style={{justifyContent: 'center'}}>
				<Text>Approved Content</Text>
			</View>

		)
	}
})

module.exports = ApprovedContent;
