import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, List, ListItem, Text, Thumbnail, Col, Row, Grid, Body, Right, Button, Icon, Input, Toast } from 'native-base';

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
  query Company($id: ID!) {
    company(id: $id) {
      id
      name
      color
      image
      bs
      catchPhrase
      suffice
      employees {
        name
        image
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

class CompanyScene extends PureComponent {

  constructor(props) {
    super(props);
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
              navigation.navigate('UserScene', { ...item })
            }}
          >
            <Thumbnail style={styles.imageWrapper} large source={{uri: item.image}} />
            <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: 70, textAlign: "center" }}>{item.name.split(" ")[0]}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  render() {
    // #### DONE_todo: 2. would be really cool to show the company info here.
    // #### DONE_todo: 3. would be extra cool to show the employee list and make it navigate to that user on tap.

    const { navigation } = this.props;
    const id = navigation.getParam('id');

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

            console.log(data.company.employees)

            return (
              <Content style={styles.container}>
                <Grid>
                  <Row style={[styles.profilePicContainer, { backgroundColor: data.company.color }]}>
                    <Thumbnail style={styles.imageWrapper} large source={{uri: data.company.image}} />
                  </Row>
                  <Col>
                    <List>
                      <ListItem>
                        <Body>
                          <Text note>Name</Text>
                          <Text>{data.company.name}</Text>
                        </Body>
                        <Right>
                        </Right>
                      </ListItem>
                      <ListItem>
                        <Body>
                          <Text note>Address</Text>
                          <Text>{`${data.company.address.streetAddress}, \n${data.company.address.city}, \n${data.company.address.country}, \n${data.company.address.zipCode}`}</Text>
                        </Body>
                        <Right>
                        </Right>
                      </ListItem>
                    </List>
                    { data.company.employees && data.company.employees.length !== 0 &&
                      <>
                        <Row style={{ padding: 10, paddingLeft: 30 }}>
                          <Text note>Employees</Text>
                        </Row>
                        <Row style={styles.friendsContainer}>
                          {this.renderFriendsList(data.company.employees)}
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

export default CompanyScene