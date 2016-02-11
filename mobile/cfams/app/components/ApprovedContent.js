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
    console.log(this.props.approvedContent)
    var imageStyle = [styles.resizeMode]
    var idProp = 0;
    var images = this.props.approvedContent.map(function (element, index) {
      idProp++;
      return (

        <View key={idProp} style={{marginBottom: 50, flex: 1}}>
          <View style={{flex: 1}}>
            <Image resizeMode={Image.resizeMode.contain} style={imageStyle} key={index} source={{uri: element.image_src}} />
            <Text style={{fontStyle: 'italic'}}>{element.body}</Text>         
            <Text style={{fontStyle: 'italic'}}>Source: {element.title}</Text>
          </View>
          <View style={styles.choice}>

            <TouchableHighlight onPress={function(){this.props.approvePost(element.dash_id, element.id, 'toggle_disapprove')}.bind(this)} style={styles.choiceButton}>
              <Text>Disapprove</Text>
            </TouchableHighlight>
             <TouchableHighlight onPress={function(){this.props.sendPost(element.dash_id, element.id, 'post_tweet')}.bind(this)} style={styles.choiceButton}>
              <Text>Post to Twitter!</Text>
            </TouchableHighlight>
             <TouchableHighlight onPress={function(){this.props.sendPost(element.dash_id, element.id, 'post_tumblr')}.bind(this)} style={styles.choiceButton}>
              <Text>Post to Tumblr!</Text>
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
           </View>
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
      width: 400
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
      backgroundColor: '#ffffff',
      height: 400
      
  },
  choiceButton: {
    width: 100,
    height: 30,
    backgroundColor: 'lightgrey',
      borderWidth: 0.5,
      borderColor: 'black',
  }

})

module.exports = ApprovedContent;
