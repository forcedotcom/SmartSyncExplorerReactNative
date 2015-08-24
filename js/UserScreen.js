'use strict';

var React = require('react-native');
var {
    ExpandingText,
    Image,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    View,
} = React;

var UserScreen = React.createClass({
    render: function() {
        return (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                  <View style={styles.mainSection}>
                    <View style={styles.rightPane}>
                      <Text style={styles.name}>{this.props.user.FirstName} {this.props.user.LastName}</Text>
                      <Text>{this.props.user.Email}</Text>
                      <Text>{this.props.user.Title} {this.props.user.CompanyName}</Text>
                      <Text>{this.props.user.MobilePhone}</Text>
                      <Text>{this.props.user.City}</Text>
                    </View>
                  </View>
                </ScrollView>
               );
    },
});

var styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
    },
    rightPane: {
        justifyContent: 'space-between',
        flex: 1,
    },
    name: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    mainSection: {
        flexDirection: 'row',
    }
});

module.exports = UserScreen;
