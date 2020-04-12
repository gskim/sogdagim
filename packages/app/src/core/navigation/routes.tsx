import React from 'react'
import {useScreens} from 'react-native-screens'
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    NavigationContainer,
    NavigationRouteConfigMap,
} from 'react-navigation'
import {
    MenuContainer,
} from '@src/containers/menu'
import {
    Article3Container,
    ArticleList1Container,
} from '@src/containers/layouts/articles'
import {
  // AuthContainer,
  // ForgotPasswordContainer,
  SignIn1Container,
  // SignIn2Container,
  // SignIn3Container,
  // SignIn4Container,
  // SignIn5Container,
  // SignUp1Container,
  // SignUp2Container,
  // SignUp3Container,
  SignUp4Container,
} from '@src/containers/layouts/auth'
import {
    Trainings1Container,
} from '@src/containers/layouts/dashboards'
import {
    Chat3Container,
    ConversationsListContainer,
} from '@src/containers/layouts/messaging'
import {
    Profile1Container,
    ProfileSettings1Container,
} from '@src/containers/layouts/social'
import {
    MenuNavigationOptions,
} from './options'

const BoardsNavigator: NavigationContainer = createStackNavigator(
    {
        ['게시판목록']: ArticleList1Container,
        ['게시판상세']: Article3Container,
    },
    {
        defaultNavigationOptions: MenuNavigationOptions,
    },
)

const ChatsNavigator: NavigationContainer = createStackNavigator(
    {
        ['채팅목록']: ConversationsListContainer,
        ['채팅상세']: Chat3Container,
    },
    {
        defaultNavigationOptions: MenuNavigationOptions,
    },
)

const HistoryNavigator: NavigationContainer = createStackNavigator(
    {
        ['히스토리']: Trainings1Container,
    },
    {
        defaultNavigationOptions: MenuNavigationOptions,
    },
)

const MeNavigator: NavigationContainer = createStackNavigator(
    {
        ['프로필']: Profile1Container,
        ['프로필수정']: ProfileSettings1Container,
    },
    {
        defaultNavigationOptions: MenuNavigationOptions,
    },
)

// MenuNavigator
const MainNavigator: NavigationContainer = createBottomTabNavigator({
    ['Boards']: BoardsNavigator,
    ['Chats']: ChatsNavigator,
    ['Histories']: HistoryNavigator,
    ['Me']: MeNavigator,
}, {
    tabBarComponent: MenuContainer,
})

const SignNavigator: NavigationContainer = createStackNavigator({
    ['SignIn']: SignIn1Container,
    // ['SignUp']: SignUp4Container,
}, {
    defaultNavigationOptions: MenuNavigationOptions,
},)

const AppNavigator: NavigationContainer = createStackNavigator({
    ['SignIn']: SignIn1Container,
    ['SignUp']: SignUp4Container,
    ['Main']: MainNavigator,
    // ['Sign']: SignNavigator,
}, {
    headerMode: 'screen',
    defaultNavigationOptions: {
        title: 'aasd',
        header: null,
    },
})

const createAppRouter = (container: NavigationContainer): NavigationContainer => {
    useScreens()
    return createAppContainer(container)
}


export const Router: NavigationContainer = createAppRouter(AppNavigator)
