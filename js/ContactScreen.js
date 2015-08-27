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
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} = React;
var ContactBadge = require('./ContactBadge.js');

var ContactScreen = React.createClass({
    render: function() {
        return (
                <ScrollView>
                  <Text style={styles.fieldName}>First name</Text>
                  <Text style={styles.fieldValue}>{this.props.contact.FirstName}</Text>

                  <Text style={styles.fieldName}>Last name</Text>
                  <Text style={styles.fieldValue}>{this.props.contact.LastName}</Text>

                  <Text style={styles.fieldName}>Title</Text>
                  <Text style={styles.fieldValue}>{this.props.contact.Title}</Text>

                  <Text style={styles.fieldName}>Mobile phone</Text>
                  <Text style={styles.fieldValue}>{this.props.contact.MobilePhone}</Text>

                  <Text style={styles.fieldName}>Email address</Text>
                  <Text style={styles.fieldValue}>{this.props.contact.Email}</Text>

                  <Text style={styles.fieldName}>Department</Text>
                  <Text style={styles.fieldValue}>{this.props.contact.Department}</Text>

                  <Text style={styles.fieldName}>Home phone</Text>
                  <Text style={styles.fieldValue}>{this.props.contact.HomePhone}</Text>

                <TouchableHighlight onPress={() => this.props.onDelete(this.props.contact)}>
                    <Text style={styles.button}>Delete Contact</Text>
                  </TouchableHighlight>
                </ScrollView>
               );
    }
});

var styles = StyleSheet.create({
    fieldName: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#F0F0F0',
        padding: 5
    },
    fieldValue: {
        flex: 1,
        fontSize: 16,
        padding: 5
    },
    button: {
        fontSize: 16,
        color: 'red',
        padding: 5
    }
});

module.exports = ContactScreen;
