import {
    MESSAGE_FROM_SERVER, MessageFromOwner, SET_MESSAGES, ADD_MESSAGE, DefaultStateType, GetMessageFromServerType,
    AddMessageFromUserType, SetMessagesType, ActionType, ExtendedServerMessage
} from '../Types/ReduxTypes'

type IDefaultState = DefaultStateType<ExtendedServerMessage | MessageFromOwner>

const defaultState: IDefaultState = {
    messages: []
}

export default function ClanChatReducer(state = defaultState, action: ActionType): IDefaultState {
    switch (action.type) {
        case 'MESSAGE_FROM_SERVER':
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.messages
            }
        default:
            return state
    }
}

export const getMessageFromServer = (message: MessageFromOwner): GetMessageFromServerType => ({
    type: MESSAGE_FROM_SERVER,
    message
})

export const addMessageFromUser = (message: MessageFromOwner): AddMessageFromUserType => ({type: ADD_MESSAGE, message})

export const setMessages = (messages: ExtendedServerMessage[]): SetMessagesType => ({type: SET_MESSAGES, messages})