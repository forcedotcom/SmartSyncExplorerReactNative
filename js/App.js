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
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import NavigationExperimental from 'react-native-deprecated-custom-components';
import {oauth} from 'react-native-force';
import storeMgr from './StoreMgr';
import SearchScreen from './SearchScreen';
import ContactScreen from './ContactScreen';
let contactScreenInstance;

// Nav bar components
class NavButton extends React.Component {
    render() {
        return (<View style={styles.navBarElt}>
                  <TouchableOpacity onPress={() => this.props.onPress()}>
                    <Text style={styles.navBarText}>{this.props.title}</Text>
                  </TouchableOpacity>
                </View>);
    }
}

class NavImgButton extends React.Component { 
    render() {
        return (<View style={styles.navBarElt}>
                  <TouchableOpacity onPress={() => this.props.onPress()}>
                    <Image source={this.props.imgSrc} style={styles.icon}/>
                  </TouchableOpacity>
                </View>);
    }
}

// Router
const NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        if (route.name === "Contact") {
            return (<NavImgButton imgSrc={require('./images/back.png')} onPress={() => onBack()}/>);
        }
    },

    RightButton(route, navigator, index, navState) {
        if (route.name === "Contacts") {
            return (<View style={styles.navButtonsGroup}>
                      <NavImgButton imgSrc={require('./images/add.png')} onPress={() => onAdd(navigator)} />
                      <NavImgButton imgSrc={require('./images/sync.png')} onPress={() => onSync()}/>
                      <NavButton title="Logout" onPress={() => onLogout()} />
                    </View>);
        }
        else if (route.name === "Contact") {
            const deleteUndeleteButtonLabel = (route.contact.__locally_deleted__ ? "Undelete" : "Delete");
            return (<View style={styles.navButtonsGroup}>
                      <NavButton title={deleteUndeleteButtonLabel} onPress={() => onDeleteUndelete()}/>
                      <NavButton title="Save" onPress={() => onSave()} />
                    </View>);
        }
    },
    
    Title(route, navigator, index, navState) {
        return ( <View style={styles.navBarElt}><Text style={styles.navBarTitleText}> {route.name} </Text></View>);
  },

};

// Actions handlers
var onAdd = navigator => {
    storeMgr.addContact(
        (contact) => navigator.push({name: 'Contact', contact})
    );
}

var onSync = () => {
    storeMgr.reSyncData();
}

var onSave = () => {
    const contact = contactScreenInstance.state.contact;
    const navigator = contactScreenInstance.props.navigator;
    contact.__locally_updated__ = contact.__local__ = true;
    storeMgr.saveContact(contact, () => navigator.pop());
}

var onDeleteUndelete = () => {
    const contact = contactScreenInstance.state.contact;
    const navigator = contactScreenInstance.props.navigator;
    contact.__locally_deleted__ = !contact.__locally_deleted__;
    contact.__local__ = contact.__locally_deleted__ || contact.__locally_updated__ || contact.__locally_created__;
    storeMgr.saveContact(contact, () => navigator.pop());
}

var onBack = () => {
    const contact = contactScreenInstance.state.contact;
    const navigator = contactScreenInstance.props.navigator;
    if (contact.__locally_created__ && !contact.__locally_modified__) {
        // Nothing typed in - delete
        storeMgr.deleteContact(contact, () => navigator.pop());
    }
    else {
        navigator.pop()
    }
}

var onLogout = () => {
    oauth.logout();
}

// App component
class App extends React.Component {
    componentDidMount() {
        storeMgr.syncData();
    }

    renderScene(route, navigator) {
        if (route.name === 'Contacts') {
            return (<SearchScreen style={styles.scene} navigator={navigator} />);
        }
        else if (route.name === 'Contact') {
            return (<ContactScreen style={styles.scene} navigator={navigator} contact={route.contact} ref={(screen) => contactScreenInstance = screen}
                    />);
        }
    }

    render() {
        const initialRoute = {name: 'Contacts'};
        return (
                <NavigationExperimental.Navigator
                  style={styles.container}
                  initialRoute={initialRoute}
                  configureScene={() => NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
                  renderScene={(route, navigator) => this.renderScene(route, navigator)}
                  navigationBar={<NavigationExperimental.Navigator.NavigationBar routeMapper={NavigationBarRouteMapper} style={styles.navBar} />} />
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navBar: {
        backgroundColor: 'red',
        height: 56,
    },
    navButtonsGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    navBarElt: {
        alignItems: 'center',
        height: 24,
        margin: 2,
    },
    navBarTitleText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
    },
    navBarText: {
        fontSize: 16,
        color: 'white',
    },
    icon: {
        width: 24,
        height: 24,
    },
    scene: {
        flex: 1,
        paddingTop: 56,
        backgroundColor: '#EAEAEA',
    },
});

export default App;

