/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = ReactNative;


// Keep this list in sync with UIExplorerIntegrationTests.m
var TESTS = [
  require('./IntegrationTestSmartStoreBridgeTest')
];

TESTS.forEach(
  (test) => AppRegistry.registerComponent(test.displayName, () => test)
);

// Modules required for integration tests
//require('LoggingTestModule');

type Test = any;

class IntegrationTestsApp extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Start you development server</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 40,
    margin: 15,
  },
  row: {
    padding: 10,
  },
  testName: {
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#bbbbbb',
  },
});

AppRegistry.registerComponent('SmartSyncExplorerReactNative', () => IntegrationTestsApp);
