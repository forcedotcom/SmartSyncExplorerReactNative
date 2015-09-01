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
var Subscribable = require('Subscribable');

var SearchBar = require('./SearchBar.js');
var ContactScreen = require('./ContactScreen.js');
var ContactCell = require('./ContactCell.js');
var smartstore = require('./react.force.smartstore.js');
var lastRequestSent = 0;
var lastResponseReceived = 0;

var SearchScreen = React.createClass({
    mixins: [Subscribable.Mixin],
    
    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            isLoading: false,
            filter: '',
            dataSource: ds.cloneWithRows([]),
            queryNumber: 0
      };
    },

    componentDidMount: function() {
        var that = this;
        this.props.events.addListener('syncCompleted', () => that.refresh() );
    },
    
    refresh: function() {
        this.searchContacts(this.state.filter);
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
                <ContactCell
                  onSelect={() => this.selectContact(row)}
                  contact={row}
                />
        );
    },

    selectContact: function(contact: Object) {
        this.props.navigator.push({
            component: ContactScreen,
            passProps: {contact:contact,
                        onDeleteContact:this.onDeleteContact,
                       },
            rightButtonTitle: "Save",
            onRightButtonPress: () => this.onSaveContact(contact)
        });
    },

    onSearchChange: function(event: Object) {
        var filter = event.nativeEvent.text.toLowerCase();
        clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => this.searchContacts(filter), 10);
    },

    onSaveContact: function(contact: Object) {
        contact.__locally_updated__ = contact.__local__ = true;
        smartstore.upsertSoupEntries(false, "contacts", [contact],
                                     () => {
                                         this.props.navigator.pop();
                                         this.refresh();
                                     });
    },

    onDeleteContact: function(contact: Object) {
        contact.__locally_deleted__ = contact.__local__ = true;
        smartstore.upsertSoupEntries(false, "contacts", [contact],
                                     () => {
                                         this.props.navigator.pop();
                                         this.refresh();
                                     });
    },

    searchContacts: function(query: string) {
        this.setState({
            isLoading: true,
            filter: query
        });

        var queryParts = query.split(/ /);
        var queryFirst = queryParts.length == 2 ? queryParts[0] : query;
        var queryLast = queryParts.length == 2 ? queryParts[1] : query;
        var queryOp = queryParts.length == 2 ? "AND" : "OR";
        var match = "{contacts:FirstName}:" + queryFirst + "* " + queryOp + " {contacts:LastName}:" + queryLast + "*";

        var querySpec = smartstore.buildMatchQuerySpec(null, match, "ascending", 25, "LastName");
        var that = this;

        lastRequestSent++;
        var currentRequest = lastRequestSent;

        smartstore.querySoup(false,
                             "contacts",
                             querySpec,
                             (cursor) => {
                                 console.log("Response for #" + currentRequest);
                                 if (currentRequest > lastResponseReceived) {
                                     lastResponseReceived = currentRequest;
                                     var contacts = cursor.currentPageOrderedEntries;
                                     that.setState({
                                         isLoading: false,
                                         filter: query,
                                         dataSource: that.state.dataSource.cloneWithRows(contacts),
                                         queryNumber: currentRequest                                  
                                     });
                                 }
                                 else {
                                     console.log("IGNORING Response for #" + currentRequest);
                                 }
                             },
                             (error) => {
                                 console.log("Error->" + JSON.stringify(error));
                                 that.setState({
                                     isLoading: false
                                 });
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
