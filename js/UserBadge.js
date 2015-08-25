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
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} = React;

var colors = [
	'rgb(26, 188, 156)',
	'rgb(46, 204, 113)',
	'rgb(52, 152, 219)',
	'rgb(155, 89, 182)',
	'rgb(52, 73, 94)',
	'rgb(22, 160, 133)',
	'rgb(39, 174, 96)',
	'rgb(41, 128, 185)',
	'rgb(142, 68, 173)',
	'rgb(44, 62, 80)',
	'rgb(241, 196, 15)',
	'rgb(230, 126, 34)',
	'rgb(231, 76, 60)',
	'rgb(149, 165, 166)',
	'rgb(243, 156, 18)',
	'rgb(211, 84, 0)',
	'rgb(192, 57, 43)',
	'rgb(189, 195, 199)',
	'rgb(127, 140, 141)'
];


var UserBadge = React.createClass({
    render: function() {
        // Compute initials
        var firstName = this.props.user.FirstName;
        var lastName = this.props.user.LastName;
        var initials = (firstName ? firstName.substring(0,1) : "") + (lastName ? lastName.substring(0,1) : "");
        // Compute color
        var code = 0;
        if (lastName) {
            for (var i=0; i< lastName.length; i++) {
                code += lastName.charCodeAt(i);
            }
        }
        var color = colors[code % colors.length];
        return (
                <View style={[styles.circle, {backgroundColor: color}]}>
                  <Text style={styles.initials}>{initials}</Text>
                </View>           
               );
    }
});

var styles = StyleSheet.create({
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width:36,
        height:36,
        borderRadius:18,
        backgroundColor:'red',
        marginRight:5
    },
    initials: {
        fontSize:16,
        color:'black',
        backgroundColor:'transparent'
    }
});

module.exports = UserBadge;
