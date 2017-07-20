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

import React from 'react';
import {
    Image,
    Platform,
    ActivityIndicator,
    TextInput,
    StyleSheet,
    TouchableNativeFeedback,
    View,
} from 'react-native';

const IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21;

class SearchBar extends React.Component {
  render() {
    const background = IS_RIPPLE_EFFECT_SUPPORTED ?
      TouchableNativeFeedback.SelectableBackgroundBorderless() :
      TouchableNativeFeedback.SelectableBackground();
    return (
      <View style={styles.searchBar}>
        <TouchableNativeFeedback
            background={background}
            onPress={() => this.refs.input && this.refs.input.focus()}>
          <View>
            <Image
              source={require('./images/android_search_white.png')}
              style={styles.icon}
            />
          </View>
        </TouchableNativeFeedback>
        <TextInput
          ref="input"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          onChange={this.props.onSearchChange}
          placeholder="Search a contact..."
          onFocus={this.props.onFocus}
          style={styles.searchBarInput}
        />
        <ActivityIndicator
          animating={this.props.isLoading}
          color="white"
          size="large"
          style={styles.spinner}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#a9a9a9',
        height: 56,
    },
    searchBarInput: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        height: 50,
        margin: 2,
        backgroundColor: 'transparent'
    },
    spinner: {
        width: 30,
        height: 30,
        marginRight: 16,
    },
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 8,
    },
});

export default SearchBar;
