import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';
import CheckBox from 'react-native-check-box';

const ScrollViewStyled = styled.ScrollView`
  marginHorizontal: 50;
  marginVertical: 50;
`

const MainView = styled.View`

`

const Title = styled.Text`
  fontSize: 25;
  paddingBottom: 5;
  textDecoration: underline;
`

const UserCard = styled.View`
  paddingHorizontal: 25;
  paddingVertical: 25;
  marginVertical: 15;
  borderWidth: 1;
`

const UserItem = styled.Text`
  marginBottom: 10;
`

const UserItemLast = styled.Text`
  marginBottom: 0;
`

const ButtonView = styled.View`
  alignItems: center;
  justifyContent: center;
`

const DeleteButton = styled.TouchableOpacity`
  borderWidth: 1;
  paddingHorizontal: 25;
  paddingVertical: 15;
`

export default class LinksScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: '',
      users: []
    }
    this._handleCheckboxSelect = this._handleCheckboxSelect.bind(this);
  }

  componentDidMount() {
    axios.get('https://keithbsmith.me/ysu/quizapp/api/users')
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  _handleCheckboxSelect(userID) {
    let url = 'https://keithbsmith.me/ysu/quizapp/api/users/' + userID;

    axios.delete(url);
  }

  render(){
    return(
    <ScrollViewStyled>
      <MainView>
        <Title>List of users</Title>
        {this.state.users.map(user =>
          <UserCard key={user.qa_users_pk}>
            <UserItem>ID: {user.qa_users_pk}</UserItem>
            <UserItem>Name: {user.qa_users_name}</UserItem>
            <UserItem>Email: {user.qa_users_email}</UserItem>
            <UserItem>Login: {user.qa_users_login}</UserItem>
            <UserItem>Password: {user.qa_users_pass}</UserItem>
            <UserItemLast>Score: {user.qa_users_score}</UserItemLast>
            <CheckBox onClick={this._handleCheckboxSelect.bind(user.qa_users_pk)} />
          </UserCard>)}
      </MainView>
      <ButtonView>
          <DeleteButton>
            <Text>Delete</Text>
          </DeleteButton>
      </ButtonView>
    </ScrollViewStyled>
    )
  };
}

