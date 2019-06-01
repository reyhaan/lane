import ApolloClient, { InMemoryCache } from "apollo-boost";
import { AsyncStorage } from "react-native";
import { persistCache } from "apollo-cache-persist";

// note: this may not work on android, you will probably have to put your IP address here
// const address = "http://192.168.2.15:5000/graphql";
const address = "http://10.0.2.2:5000/graphql";

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage
});

export default new ApolloClient({
  uri: address,
  cache
});
