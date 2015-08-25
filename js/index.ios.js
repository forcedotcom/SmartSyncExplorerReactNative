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
    AppRegistry,
    StyleSheet,
    NavigatorIOS
} = React;

var smartstore = require('./react.force.smartstore.js');
var smartsync = require('./react.force.smartsync.js');
var SearchScreen = require('./SearchScreen.js');

var App = React.createClass({
    componentDidMount: function() {
        smartstore.registerSoup(false,
                                "users", 
                                [ {path:"Id", type:"string"}, 
                                  {path:"FirstName", type:"string"}, 
                                  {path:"LastName", type:"string"}, 
                                  {path:"__local__", type:"string"} ],
                                function() {
                                    var fieldlist = ["Id", "FirstName", "LastName", "Title", "CompanyName", "Email", "MobilePhone","City"];
                                    var target = {type:"soql", query:"SELECT " + fieldlist.join(",") + " FROM User WHERE CompanyName = 'salesforce.com' and Title like '%Engineer%' LIMIT 10000"};
                                    smartsync.syncDown(false, target, "users", {mergeMode:smartsync.MERGE_MODE.OVERWRITE});
                                });

    },

    render: function() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: 'Mobile SDK Sample App',
                    component: SearchScreen,
                }}
            />
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});

React.AppRegistry.registerComponent('SampleAppReact', () => App);
