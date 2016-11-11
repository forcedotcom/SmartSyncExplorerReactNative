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

import React from 'react';
import {
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

var ContactBadge = require('./ContactBadge');

var ContactCell = React.createClass({
    render: function() {
        var statusIcon;
        if (this.props.contact.__local__) {
            var iconSource;
            if (this.props.contact.__locally_updated__) iconSource = require("image!localupdate");
            if (this.props.contact.__locally_created__) iconSource = require("image!localadd");
            if (this.props.contact.__locally_deleted__) iconSource = require("image!localdelete");

            if (iconSource) {
                statusIcon = (<Image source={iconSource} />);
            }
        }

        return (
                <View>
                  <TouchableHighlight onPress={this.props.onSelect}>
                    <View style={styles.row}>
                      <ContactBadge contact={this.props.contact}/>
                      <View style={styles.textContainer}>
                        <Text style={styles.name} numberOfLines={2}>
                          {this.props.contact.FirstName} {this.props.contact.LastName}
                        </Text>
                        <Text style={styles.title} numberOfLines={1}>
                          {this.props.contact.Title}
                        </Text>
                      </View>
                      {statusIcon}
                    </View>
                    </TouchableHighlight>
                  <View style={styles.cellBorder} />
                </View>
               );
    }
});

var styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    textContainer: {
        flex: 1,
    },
    name: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
        fontFamily: 'Helvetica Neue'
    },
    title: {
        color: '#999999',
        fontSize: 12,
        fontFamily: 'Helvetica Neue'
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // Trick to get the thinest line the device can display
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
    },
});

module.exports = ContactCell;
