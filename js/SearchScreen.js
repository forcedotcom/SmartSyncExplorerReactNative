/*
 * Copyright (c) 2015, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

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
var lastRequestSent = 0;
var lastResponseReceived = 0;

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

        lastRequestSent++;
        var currentRequest = lastRequestSent;

        forceClient.query(query,
                          function(response) {
                              console.log("Response for #" + currentRequest);
                              if (currentRequest > lastResponseReceived) {
                                  lastResponseReceived = currentRequest;
                                  var users = response.records;
                                  that.setState({
                                      isLoading: false,
                                      filter: query,
                                      dataSource: that.state.dataSource.cloneWithRows(users),
                                      queryNumber: currentRequest                                  
                                  });
                              }
                              else {
                                  console.log("IGNORING Response for #" + currentRequest);
                              }
                          },
                          function(error) {
                              console.log("Error->" + JSON.stringify(error));
                          });
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    separator: {
        height: 1,
        backgroundColor: '#eeeeee',
    }
});

module.exports = SearchScreen;
