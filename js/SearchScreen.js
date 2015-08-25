'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    ListView,
    PixelRatio,
} = React;

var SearchBar = require('./SearchBar.js');
var UserScreen = require('./UserScreen.js');
var UserCell = require('./UserCell.js');
var forceClient = require('./react.force.net.js');

var SearchScreen = React.createClass({
    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            isLoading: false,
            filter: '',
            dataSource: ds.cloneWithRows([]),
            queryNumber: 0
      };
    },
    
    render: function() {
        return (
                <View style={styles.container}>
                  <SearchBar
                    onSearchChange={this.onSearchChange}
                    isLoading={this.state.isLoading}
                  />
                  <View style={styles.separator} />
                  <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
                </View>
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
            title: user.FirstName.substring(0, 1) + " " + user.LastName,
            component: UserScreen,
            passProps: {user},
        });
    },

    onSearchChange: function(event: Object) {
        var filter = event.nativeEvent.text.toLowerCase();
        clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => this.searchUsers(filter), 10);
    },

    searchUsers: function(query: string) {
        this.setState({
            isLoading: true,
            filter: query
        });

        var queryParts = query.split(/ /);
        var queryFirst = queryParts.length == 2 ? queryParts[0] : query;
        var queryLast = queryParts.length == 2 ? queryParts[1] : query;
        var queryOp = queryParts.length == 2 ? "AND" : "OR";

        var query = "SELECT Id, FirstName, LastName, Title, CompanyName, Email, MobilePhone, City"
            + " FROM User "
            + " WHERE FirstName LIKE '" + queryFirst + "%'"
            + " " + queryOp + " LastName LIKE '" + queryLast + "%'"
            + " LIMIT 25";

        var that = this;
        forceClient.query(query,
                          function(response) {
                              var users = response.records;
                              that.setState({
                                  isLoading: false,
                                  filter: query,
                                  dataSource: that.state.dataSource.cloneWithRows(users),
                                  queryNumber: that.state.queryNumber + 1                                  
                              });
                          },
                          function(error) {
                              console.log("Error->" + JSON.stringify(error));
                          });
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
    separator: {
        height: 1,
        backgroundColor: '#eeeeee',
    }
});

module.exports = SearchScreen;
