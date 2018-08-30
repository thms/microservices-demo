import { StackNavigator } from 'react-navigation';
import UserList from './UserList';
import User from './User';
const Stack = StackNavigator({
  Home: {
    screen: UserList
  },
  Detail: {
    screen: User
  }
});
