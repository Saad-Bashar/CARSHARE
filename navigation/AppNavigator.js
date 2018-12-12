import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SigninScreen from '../screens/SigninScreen';

const AuthStack = createStackNavigator({
  Signin: SigninScreen
})

export default createSwitchNavigator({
  Auth: AuthStack,
  Main: MainTabNavigator,
});