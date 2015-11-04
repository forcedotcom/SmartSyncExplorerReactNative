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
    Navigator,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
} = React;

var storeMgr = require('./StoreMgr');
var SearchScreen = require('./SearchScreen');
var ContactScreen = require('./ContactScreen');

var NavigationBarRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
        if (route.name === "Contact") {
            return (<TouchableNativeFeedback onPress={() => navigator.pop()} >
                      <View>
                        <Image source={require('image!android_back_white')} style={styles.icon}/>
                        <Text style={styles.navBarText}>Contacts</Text>
                      </View>
                    </TouchableNativeFeedback>);
        };
    },

    RightButton: function(route, navigator, index, navState) {
        if (route.name === "Contacts") {
            return (<TouchableNativeFeedback onPress={() => storeMgr.reSyncData()}>
                      <View>
                        <Image source={require('image!sync')} style={styles.icon}/>
                      </View>
                    </TouchableNativeFeedback>);
        }
    },

    Title: function(route, navigator, index, navState) {
        return ( <Text style={styles.navBarText}> {route.name} </Text>);
  },

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
                  configureScene={() => Navigator.SceneConfigs.PushFromRight}
                  renderScene={(route, navigator) => {
                      if (route.name === 'Contacts') {
                          return (<SearchScreen style={styles.scene} navigator={navigator} />);
                      }
                      else if (route.name === 'Contact') {
                          return (<ContactScreen style={styles.scene} navigator={navigator} contact={route.contact} />);
                      }
                  }}
                  navigationBar={<Navigator.NavigationBar routeMapper={NavigationBarRouteMapper} style={styles.navBar} />} />
        );
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    flex:1,
//    flexDirection: 'row',
//    alignItems: 'center',
    backgroundColor: 'red',
    height: 56,
  },
  navBarText: {
    fontSize: 20,
    color: 'white',
    padding: 0,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  scene: {
    flex: 1,
    paddingTop: 56,
    backgroundColor: '#EAEAEA',
  },
});

AppRegistry.registerComponent('SmartSyncExplorerReactNative', () => App);
