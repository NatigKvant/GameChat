import {
    MESSAGE_FROM_SERVER, MessageFromOwner, ADD_MESSAGE, DefaultStateType, GetMessageFromServerType,
    AddMessageFromUserType, ActionType, FriendsMessage
} from '../Types/ReduxTypes'
import BLogo from '../Assets/images/BLogo.svg'
import BlueLogo from '../Assets/images/BlueLogo.svg'
import RankM from '../Assets/images/RankM.png'
import RankA from '../Assets/images/RankA.png'

type IDefaultState = DefaultStateType<FriendsMessage | MessageFromOwner>

const defaultState: IDefaultState = {
    messages: [
        {
            from: 'BivOld',
            id: Math.random().toString(36).substr(2, 20),
            text: 'Я думал, что они будут пополнятся разв н-ное время. А тут реально игра закончена',
            createdAt: new Date().toISOString(),
            isOwner: false,
            gamerLevel: 5,
            userLogo: BLogo,
        },
        {
            from: 'Nigativ',
            id: Math.random().toString(36).substr(2, 20),
            text: 'was можно только купить',
            createdAt: new Date().toISOString(),
            isOwner: false,
            gamerLevel: 3,
            userLogo: BlueLogo,
            gamerRank: RankM
        },
        {
            from: 'Skylifesky',
            id: Math.random().toString(36).substr(2, 20),
            text: 'Цена 1 wас = 0.1$ и цена не изменится',
            createdAt: new Date().toISOString(),
            isOwner: false,
            gamerLevel: 10,
            userLogo: BLogo,
            gamerRank: RankA
        },
        {
            from: '',
            id: Math.random().toString(36).substr(2, 20),
            text: 'Сегодня идем на Германию',
            createdAt: new Date().toISOString(),
            isOwner: true,
        }
    ],
}

export default function FriendsChatReducer(state = defaultState, action: ActionType) {
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
        default:
            return state
    }
}

export const getMessageFromServer = (message: MessageFromOwner): GetMessageFromServerType => ({
    type: MESSAGE_FROM_SERVER,
    message
})

export const addMessageFromUser = (message: MessageFromOwner): AddMessageFromUserType => ({type: ADD_MESSAGE, message})