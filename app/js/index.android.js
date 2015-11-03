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
    Image,
    BackAndroid,
    Navigator,
    Platform,
    StyleSheet,
    TouchableNativeFeedback,
    Text,
    ToolbarAndroid,
    View,
} = React;

var storeMgr = require('./StoreMgr');
var SearchScreen = require('./SearchScreen');
var ContactScreen = require('./ContactScreen');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21;

var background = IS_RIPPLE_EFFECT_SUPPORTED ?
    TouchableNativeFeedback.SelectableBackgroundBorderless() :
    TouchableNativeFeedback.SelectableBackground();

var RouteMapper = function(route, navigationOperations, onComponentRef) {
    _navigator = navigationOperations;
    var component, actions, actionHandler;
    if (route.name === 'Contacts') {
        return (<SearchScreen navigator={navigationOperations} />);
    }
    else if (route.name === 'Contact') {
        return (
                <View style={styles.container}>
                  <View style={styles.toolbar}>
                    <TouchableNativeFeedback
                        background={background}
                        onPress={() => navigationOperations.pop()}>
                      <View>
                        <Image
                          source={require('image!android_back_white')}
                          style={styles.icon}
                        />
                      </View>
                    </TouchableNativeFeedback>
                    <Text style={styles.toolbarText}>Contact</Text>
                  </View>
                  <ContactScreen style={{flex: 1}} navigator={navigationOperations} contact={route.contact} />
                </View>
        );
    }
};

var onActionSelected = function() {
};

var App = React.createClass({
    componentDidMount: function() {
        storeMgr.syncData();
    },


    render: function() {
        var initialRoute = {name: 'Contacts'};
        return (
                <Navigator
                  style={styles.container}
                  initialRoute={initialRoute}
                  configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                  renderScene={RouteMapper}
                />
        );
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
    height: 56,
  },
  toolbarText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    padding: 0,
    backgroundColor: 'transparent'
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
});

AppRegistry.registerComponent('SmartSyncExplorerReactNative', () => App);
