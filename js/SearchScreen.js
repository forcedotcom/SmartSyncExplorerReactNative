'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    ListView,
    PixelRatio,
} = React;

var UserScreen = require('./UserScreen.js');
var UserCell = require('./UserCell.js');
var forceClient = require('./react.force.net.js');

var SearchScreen = React.createClass({
    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
          dataSource: ds.cloneWithRows([]),
      };
    },
    
    componentDidMount: function() {
        var that = this;
        var soql = 'SELECT Id, FirstName, LastName, Title, CompanyName, Email, MobilePhone, City FROM User LIMIT 50';
        forceClient.query(soql,
                          function(response) {
                              var users = response.records;
                              var data = [];
                              for (var i in users) {
                                  data.push(users[i]);
                              }

                              that.setState({
                                  dataSource: that.getDataSource(data),
                              });

                          });
    },

    getDataSource: function(users: Array<any>): ListViewDataSource {
        return this.state.dataSource.cloneWithRows(users);
    },

    render: function() {
        return (
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow} />
      );
    },

    renderRow: function(row: Object)  {
        return (
                <UserCell
                  onSelect={() => this.selectUser(row)}
                  user={row}
                />
        );
    },

    selectUser: function(user: Object) {
        this.props.navigator.push({
            title: user.Title,
            component: UserScreen,
            passProps: {user},
        });
    },

});

var styles = StyleSheet.create({
    row: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 12,
    }
});

module.exports = SearchScreen;
