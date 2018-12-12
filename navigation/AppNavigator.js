import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SigninScreen from '../screens/SigninScreen';
import StartingScreen from '../StartingScreen';

const AuthStack = createStackNavigator({
  Signin: SigninScreen
})

export default createSwitchNavigator({  
  Starting: StartingScreen,
  Auth: AuthStack,
  Main: MainTabNavigator,
});