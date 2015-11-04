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
    ActivityIndicatorIOS,
    StyleSheet,
    TextInput,
    View,
} = React;


var SearchBar = React.createClass({
    render: function() {
        return (
                <View style={this.props.style}>
                  <View style={styles.searchBar}>
                    <TextInput
                      autoCorrect={false}
                      onChange={this.props.onSearchChange}
                      placeholder="Search a contact..."
                      onFocus={this.props.onFocus}
                      style={styles.searchBarInput}
                    />
                    <ActivityIndicatorIOS
                      animating={this.props.isLoading}
                      style={styles.spinner}
                    />
                  </View>
                </View>
        );
    }
});

var styles = StyleSheet.create({
    searchBar: {
        padding: 3,
        paddingLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    searchBarInput: {
        flex: 1,
        fontSize: 15,
        height: 30,
    },
    spinner: {
        width: 30,
    },
});

module.exports = SearchBar;
