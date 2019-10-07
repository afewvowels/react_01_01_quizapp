import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput
} from 'react-native';

import { MonoText } from '../components/StyledText';
import axios from 'axios';

const TextStyled = styled.Text`
  alignSelf: flex-start;
`

const TextInputStyled = styled.TextInput`
  borderBottomColor: black;
  borderBottomWidth: 1px;
  paddingTop: 10;
  paddingBottom: 10;
  marginBottom: 25;
  width: 100%;
`
const TouchableOpacityStyled = styled.TouchableOpacity`
  borderWidth: 1;
  borderColor: black;
  paddingTop: 15;
  paddingBottom: 15;
  paddingRight: 25;
  paddingLeft: 25;
  marginLeft: 10;
  margin-right: 10;
`

const ButtonsView = styled.View`
  marginTop: 50;
  flexDirection: row;
`

const MainView = styled.View`
  justifyContent: flex-start;
  alignItems: center;
  marginHorizontal: 50;
  marginTop: 45;
  height: 100%;
`

const InputsView = styled.View`
  width: 100%;
`

const Logo = styled.Image`
  width: 200;
  height: 200;
  resizeMode: contain;
  marginTop: 35;
`

const LogoWrapper = styled.View`
  alignItems: center;
`

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      message: 'no request made'
    }
  }

  _handleResetPress = () => {
    this.setState((state) => {return {user: '', pass: ''}});
  }

  _handleSubmitPress = () => {
    axios.post('https://keithbsmith.me/ysu/quizapp/api/users', {
      qa_users_name: this.state.user,
      qa_users_pass: this.state.pass
    })
      .then(res => {
        this.setState((state) => {return { message: res.data.toString() }});
      })
  }

  render () {
    return(
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <LogoWrapper style={styles.welcomeContainer}>
            <Logo
              source={
                __DEV__
                  ? require('../assets/images/logo.png')
                  : require('../assets/images/logo.png')
              }
            />
          </LogoWrapper>

          <MainView>
            <InputsView>
              <TextStyled>Username</TextStyled>
              <TextInputStyled onChangeText={(user) => this.setState({user})} value={this.state.user} />
              <TextStyled>Password</TextStyled>
              <TextInputStyled onChangeText={(pass) => this.setState({pass})} value={this.state.pass} />
            </InputsView>
            <ButtonsView>
              <TouchableOpacityStyled onPress={this._handleSubmitPress}>
                <TextStyled>Login</TextStyled>
              </TouchableOpacityStyled>
              <TouchableOpacityStyled onPress={this._handleResetPress}>
                <TextStyled>Reset</TextStyled>
              </TouchableOpacityStyled>
            </ButtonsView>
            <Text>{this.state.message}</Text>
          </MainView>
        </ScrollView>
      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  buttonStyles: {
    color: 'black',
    borderWidth: 10,
    borderColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
