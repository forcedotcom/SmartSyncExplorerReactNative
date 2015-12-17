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
    View,
    TouchableHighlight,
    Text,
} = React;
var Field = require('./Field');
var storeMgr = require('./StoreMgr');
var navigator;

// State: contact
// Props: contact
var ContactScreen = React.createClass({
    getInitialState: function() {
        navigator = this.props.navigator;
        return {
            contact: this.props.contact
        };
    },

    onChange: function(fieldKey, fieldValue) {
        var contact = this.state.contact;
        contact[fieldKey] = fieldValue;
        this.setState({contact: contact});
    },

    onSaveContact: function() {
        var contact = this.state.contact;
        contact.__locally_updated__ = contact.__local__ = true;
        storeMgr.saveContact(contact, () => {navigator.pop();});
    },
    
    onDeleteUndeleteContact: function() {
        var contact = this.state.contact;
        contact.__locally_deleted__ = !contact.__locally_deleted__;
        contact.__local__ = contact.__locally_deleted__ || contact.__locally_updated__ || contact.__locally_created__;
        storeMgr.saveContact(contact, () => {navigator.pop();});
    },

    render: function() {
        return (
                <ScrollView style={this.props.style}>
                  <Field fieldLabel="First name" fieldValue={this.state.contact.FirstName} onChange={(text) => this.onChange("FirstName", text)}/>
                  <Field fieldLabel="Last name" fieldValue={this.state.contact.LastName} onChange={(text) => this.onChange("LastName", text)}/>
                  <Field fieldLabel="Title" fieldValue={this.state.contact.Title} onChange={(text) => this.onChange("Title", text)}/>
                  <Field fieldLabel="Mobile phone" fieldValue={this.state.contact.MobilePhone} onChange={(text) => this.onChange("MobilePhone", text)}/>
                  <Field fieldLabel="Email address" fieldValue={this.state.contact.Email} onChange={(text) => this.onChange("Email", text)}/>
                  <Field fieldLabel="Department" fieldValue={this.state.contact.Department} onChange={(text) => this.onChange("Department", text)}/>
                  <Field fieldLabel="Home phone" fieldValue={this.state.contact.HomePhone} onChange={(text) => this.onChange("HomePhone", text)}/>
                </ScrollView>
               );
    }
});

var styles = StyleSheet.create({
    button: {
        fontSize: 16,
        color: 'red',
        padding: 5
    }
});

module.exports = ContactScreen;
