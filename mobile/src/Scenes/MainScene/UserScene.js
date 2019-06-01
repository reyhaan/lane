import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, List, ListItem, Text, Thumbnail, Col, Row, Grid, Body, Right, Button, Icon, Input, Toast } from 'native-base';

import { gql } from 'apollo-boost';
import { Query, Mutation, withApollo } from 'react-apollo';

import { ErrorScene } from '../../components';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  imageWrapper: {
    marginRight: 20,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#ffffff',
    width: 80,
    height: 80,
    overflow: 'hidden',
  },
  profilePicContainer: {
    flexDirection: "column", 
    alignItems: "center", 
    padding: 40 
  },
  friendsContainer: {
    overflow: 'scroll',
    padding: 10,
    paddingLeft: 20
  }
});

const query = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      color
      name
      email
      image
      friends {
        id
        name
        image
        color
      }
      company {
        name
        id
      }
      address {
        streetAddress
        secondaryAddress
        streetName
        streetPrefix
        streetSuffix
        city
        cityPrefix
        citySuffix
        state
        zipCode
        county
        country
        latitude
        longitude
      }
    }
  }
`;

const mutation = gql`
  mutation UpdateUser($user: UserInput!) {
    updateUser(user: $user) {
      id
      name
      email
    }
  }
`;

class UserScene extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: {
        name: false,
        email: false,
      },
      email: null,
      name: null
    }
  }

  renderFriendsList = (friends) => {
    const { navigation } = this.props;

    if (!friends) {
      return (<Text>No friends bruh!?</Text>)
    }

    return (
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              this.resetState(() => {
                navigation.navigate('UserScene', { ...item })
              })
            }}
          >
            <Thumbnail style={styles.imageWrapper} large source={{uri: item.image}} />
            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: 70, textAlign: "center" }}>{item.name.split(" ")[0]}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  editItem = (item) => {
    this.setState({ isEditing: { [item]: true } })
  }

  resetState = (cb) => {
    this.setState({
      isEditing: {
        name: false,
        email: false
      },
      email: null,
      name: null,
    }, () => {cb()})
  }

  render() {
    let { name, email } = this.state;
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    name = name || navigation.getParam('name')
    email = email || navigation.getParam('email')

    const user = { id, name, email }

    // #### DONE_todo: 2. would be cool if we actually displayed full user data that is contained in the user data object.

    // #### DONE_todo: 3. would be extra cool to include their company info, and if you tap on it you can go that CompanyScene.
    // if this is done correctly, we should be re-using components from the CompaniesScene.

    // #### DONE_todo: 4. would be even cooler to see a list of their friends, so I can tap on them an get more info about that user.
    // #### DONE_todo: 5 would be cool to make the user name and email updateable and saved ot the database, so we can let our users change their info.
    return (
      <Container>
        <Query query={query} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }

            return (
              <Content style={styles.container}>
                <Grid>
                  <Row style={[styles.profilePicContainer, { backgroundColor: data.user.color }]}>
                    <Thumbnail style={styles.imageWrapper} large source={{uri: data.user.image}} />
                  </Row>
                  <Col>
                  <Mutation 
                    mutation={mutation} 
                    variables={{ user }} 
                    update={(store, { data }) => {
                      try {
                        const userData = store.readQuery({ query: query, variables: { id: id } })
                        
                        userData.user.name = data.updateUser.name
                        userData.user.email = data.updateUser.email

                        store.writeQuery({
                          query: mutation,
                          data: { updateUser: userData.user } 
                        })
                      } catch(e) {
                        
                      }
                    }}
                  >
                    {mutation => (
                      <List>
                        <ListItem>
                          <Body>
                            <Text note>Name</Text>
                            { this.state.isEditing.name && 
                              <Input
                                autoFocus={true}
                                onChangeText={(value) => {this.setState({ name: value })}}
                                onSubmitEditing={() => {
                                  this.setState({ isEditing: { name: false } }, () => {
                                    mutation();
                                    Toast.show({
                                      text: 'updated!',
                                      buttonText: 'Okay'
                                    })
                                  })
                                }}
                                defaultValue={data.user.name} 
                              />
                            }
                            { !this.state.isEditing.name && <Text>{data.user.name}</Text> }
                          </Body>
                          <Right>
                            <Button transparent onPress={() => this.editItem('name')}>
                              <Icon style={{ color: '#ccc' }} type="FontAwesome" name="pencil" />
                            </Button>
                          </Right>
                        </ListItem>
                        <ListItem>
                          <Body>
                            <Text note>Email</Text>
                            { this.state.isEditing.email && 
                              <Input
                                autoFocus={true}
                                onChangeText={(value) => {this.setState({ email: value })}}
                                onSubmitEditing={() => {
                                  this.setState({ isEditing: { email: false } }, () => {
                                    mutation();
                                    Toast.show({
                                      text: 'Updated!',
                                      buttonText: 'Okay'
                                    })
                                  })
                                }}
                                defaultValue={data.user.email}
                              /> 
                            }
                            { !this.state.isEditing.email && <Text>{data.user.email}</Text> }
                          </Body>
                          <Right>
                            <Button transparent onPress={() => this.editItem('email')}>
                              <Icon style={{ color: '#ccc' }} type="FontAwesome" name="pencil" />
                            </Button>
                          </Right>
                        </ListItem>
                        { data.user.company &&
                          <ListItem>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('CompanyScene', { company: data.user.company })
                              }
                            >
                              <Body>
                                <Text note>Company</Text>
                                <Text>{data.user.company.name}</Text>
                              </Body>
                            </TouchableOpacity>
                          </ListItem>
                        }
                      </List>
                    )}
                  </Mutation>
                    { data.user.friends && data.user.friends.length !== 0 &&
                      <>
                        <Row style={{ padding: 10, paddingLeft: 30 }}>
                          <Text note>Friends</Text>
                        </Row>
                        <Row style={styles.friendsContainer}>
                          {this.renderFriendsList(data.user.friends)}
                        </Row>
                      </>
                    }
                  </Col>
                </Grid>
              </Content>
            );
          }}
          
        </Query>
      </Container>
    );
  }
}

export default withApollo(UserScene)