import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from "react-navigation";
//components
import SideMenu from './components/SideMenu';
//UI
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//screens
import Login from './screens/Login';
import Home from './screens/Home';
import Signup from "./screens/Signup";
import VerifyMobile from "./screens/VerifyMobile";
import BankBalance from "./screens/BankBalance";
import Recievables from "./screens/Recievables";
import Payables from "./screens/Payables";
import StatuatoryPayables from "./screens/StatuatoryBalance";
import Income from "./screens/Income";
import Expenses from "./screens/Expenses";
import ProfitAndLoss from "./screens/ProfitAndLoss";
import CashInFlow from "./screens/CashInFlow";

const LoginStack = createStackNavigator({
  Login: { screen: Login},
  Signup: Signup,
  VerifyMobile: VerifyMobile
}, {
      headerMode: 'none',
      navigationOptions: {
      headerVisible: false,
    }
   }
);

const MainStack = createDrawerNavigator({
  //visible
   Home: Home,
   //for navigation
   BankBalance: BankBalance,
   Recievables: Recievables,
   Payables: Payables,
   StatutoryPayables: StatuatoryPayables,
   Income: Income,
   Expenses: Expenses,
   ProfitAndLoss: ProfitAndLoss,
   CashInFlow: CashInFlow
}, {
  contentComponent: SideMenu,
  drawerWidth: wp('69%'),
}
);

const AppNavigator = createSwitchNavigator(
  {
    BeforeLogin: {
      screen: LoginStack,
    },
    
    LoggedIn: { 
      screen: MainStack,
    }
  }
);

export default createAppContainer(AppNavigator);