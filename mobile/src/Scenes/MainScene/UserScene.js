import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, List, ListItem, Text, Thumbnail, Col, Row, Grid, Body, Right, Button } from 'native-base';

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
    overflow: 'scroll'
  }
});

export default class UserScene extends PureComponent {

  renderFriendsList = (friends) => {
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
          </TouchableOpacity>
        )}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    console.log(user)


    // #### DONE_todo: 2. would be cool if we actually displayed full user data that is contained in the user data object.

    // #### DONE_todo: 3. would be extra cool to include their company info, and if you tap on it you can go that CompanyScene.
    // if this is done correctly, we should be re-using components from the CompaniesScene.

    // todo: 4. would be even cooler to see a list of their friends, so I can tap on them an get more info about that user.
    // todo: 5 would be cool to make the user name and email updateable and saved ot the database, so we can let our users change their info.
    return (
      <Container>
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
              <Row style={styles.friendsContainer}>
                {this.renderFriendsList(user.friends)}
              </Row>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}
