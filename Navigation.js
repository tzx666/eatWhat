import {DrawerNavigator,TabNavigator,createStackNavigator, createAppContainer } from 'react-navigation'
import {Mainscreen} from './Pages/Mainscreen/Mainscreen'
import {ShowData} from './Pages/Showdata/ShowData'
import {Test} from './Pages/test/test'
 const RootStack=createStackNavigator({
  Home: {screen: Mainscreen},
  details: {screen: ShowData},
  testnewCom:{screen:Test}
},
  {
    initialRouteName:'Home'
  }
);
const Container = createAppContainer(RootStack);
export default Container