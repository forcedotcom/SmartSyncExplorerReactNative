/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import IntegrationTestSmartStoreBridgeTest from './IntegrationTestSmartStoreBridgeTest'

const testSuites_ = {
  IntegrationTestSmartStoreBridgeTest:IntegrationTestSmartStoreBridgeTest
}

export default class IntegrationTestsApp extends Component {
  render() {
    const TestSuite = testSuites_[this.props.testName]
    return <TestSuite {... this.props} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SmartSyncExplorerReactNativeTestApp', () => IntegrationTestsApp);
