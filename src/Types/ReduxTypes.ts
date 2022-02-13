export const MESSAGE_FROM_SERVER = 'MESSAGE_FROM_SERVER'
export const SET_MESSAGES = 'SET_MESSAGES'
export const ADD_MESSAGE = 'ADD_MESSAGE'

export interface IMessage {
    id: number | string;
    from: string
    text: string
    createdAt: string
}

export interface ExtendedServerMessage extends IMessage {
    gamerLevel: number
    userLogo: string
    gamerRank: string
    isOwner: boolean
}

export interface MessageFromOwner extends IMessage {
    isOwner: boolean
}

export interface FriendsMessage extends ExtendedServerMessage {
    gamerRank: string
}

export interface DefaultStateType<MessageType> {
    messages: MessageType[]
}

export interface GetMessageFromServerType {
    message: MessageFromOwner
    type: typeof MESSAGE_FROM_SERVER
}

export interface AddMessageFromUserType {
    message: MessageFromOwner
    type: typeof ADD_MESSAGE
}

export interface SetMessagesType {
    messages: MessageFromOwner[]
    type: typeof SET_MESSAGES
}

export type ActionType = GetMessageFromServerType | AddMessageFromUserType | SetMessagesType