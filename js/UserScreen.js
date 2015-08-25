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
    ExpandingText,
    Image,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    View,
} = React;
var UserBadge = require('./UserBadge.js');

var UserScreen = React.createClass({
    render: function() {
        return (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                  <View style={styles.mainSection}>
                    <UserBadge user={this.props.user}/>
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
