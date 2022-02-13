import {combineReducers} from 'redux'
import {createStore, applyMiddleware} from 'redux'
import GeneralChatReducer from './generalChat-reducer'
import ClanChatReducer from './clanChat-reducer'
import FriendsChatReducer from './friendsChat-reducer'
import NewsChatReducer from './newsChat-reducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    GeneralChatReducer: GeneralChatReducer,
    ClanChatReducer: ClanChatReducer,
    FriendsChatReducer: FriendsChatReducer,
    NewsChatReducer: NewsChatReducer
})

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))