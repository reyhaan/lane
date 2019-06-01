import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, List, ListItem, Text, Thumbnail, Col, Row, Grid, Body, Right, Button } from 'native-base';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

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
        city
        country
        county
      }
    }
  }
`;

export default class UserScene extends PureComponent {

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
            onPress={() =>
              navigation.navigate('UserScene', { user: item })
            }
          >
            <Thumbnail style={styles.imageWrapper} large source={{uri: item.image}} />
            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: 70, textAlign: "center" }}>{item.name.split(" ")[0]}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const id = user.id;
    console.log(user)


    // #### DONE_todo: 2. would be cool if we actually displayed full user data that is contained in the user data object.

    // #### DONE_todo: 3. would be extra cool to include their company info, and if you tap on it you can go that CompanyScene.
    // if this is done correctly, we should be re-using components from the CompaniesScene.

    // #### DONE_todo: 4. would be even cooler to see a list of their friends, so I can tap on them an get more info about that user.
    // todo: 5 would be cool to make the user name and email updateable and saved ot the database, so we can let our users change their info.
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

            const { user } = data

            return (
              <Content style={styles.container}>
                <Grid>
                  <Row style={[styles.profilePicContainer, { backgroundColor: user.color }]}>
                    <Thumbnail style={styles.imageWrapper} large source={{uri: user.image}} />
                  </Row>
                  <Col>
                    <List>
                      <ListItem>
                        <Body>
                          <Text note>Name</Text>
                          <Text>{user.name}</Text>
                        </Body>
                        <Right>
                          <Button transparent>
                            <Text>View</Text>
                          </Button>
                        </Right>
                      </ListItem>
                      <ListItem>
                        <Body>
                          <Text note>Email</Text>
                          <Text>{user.email}</Text>
                        </Body>
                        <Right>
                          <Button transparent>
                            <Text>View</Text>
                          </Button>
                        </Right>
                      </ListItem>
                      <ListItem>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('CompanyScene', { company: user.company })
                          }
                        >
                          <Body>
                            <Text note>Company</Text>
                            <Text>{user.company.name}</Text>
                          </Body>
                        </TouchableOpacity>
                      </ListItem>
                    </List>
                    <Row style={{ padding: 10, paddingLeft: 30 }}>
                      <Text note>Friends</Text>
                    </Row>
                    <Row style={styles.friendsContainer}>
                      {this.renderFriendsList(user.friends)}
                    </Row>
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
