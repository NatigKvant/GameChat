import React, {useState, useEffect, FC, KeyboardEvent} from 'react'
import './FriendsChat.css'
import Chat from '../../ChatComponent/Chat'
import {webSocket} from '../../../../../socket'
import BLogo from '../../../../../Assets/images/BLogo.svg'
import BlueLogo from '../../../../../Assets/images/BlueLogo.svg'
import {useDispatch, useSelector} from 'react-redux'
import {getMessageFromServer, addMessageFromUser} from '../../../../../Redux/friendsChat-reducer'
import {AppStateType} from '../../../../../Redux/redux-store'
import RankM from '../../../../../Assets/images/RankM.png'
import RankA from '../../../../../Assets/images/RankA.png'
import {ExtendedServerMessage, IMessage} from '../../../../../Types/ReduxTypes'

const FriendsChat: FC<{}> = () => {

    const dispatch = useDispatch()
    const messages = useSelector((state: AppStateType) => state.FriendsChatReducer.messages)
    const [input, setInput] = useState('')

    useEffect(() => {
        webSocket.on("message", (message: IMessage): void => {
            const extendedMessage: ExtendedServerMessage = {
                ...message,
                isOwner: false,
                gamerLevel: Math.floor(Math.random() * 10),
                userLogo: Math.floor(Math.random() * 10) > 5 ? BLogo : BlueLogo,
                gamerRank: Math.floor(Math.random() * 10) > 5 ? RankA : RankM
            }
            addMessage(extendedMessage)
        })
        return (): void => {
            webSocket.off("message")
        }
    })

    const onPressEnter = (event: KeyboardEvent): void => {
        if (event.key === 'Enter' && input !== '') {
            const me = 'Natig'
            const message = {
                from: me,
                text: input,
                isOwner: true,
                id: Math.random().toString(36).substr(2, 100),
                createdAt: new Date().toISOString()
            }

            webSocket.emit("message", message, (err: string): void => {
                if (err) {
                    console.error(err)
                } else {
                    console.log("success")
                }
            })
            dispatch(addMessageFromUser(message))
        }
    }

    const addMessage = (message: ExtendedServerMessage): void => {
        dispatch(getMessageFromServer(message))
    }

    return (
        <div>
            <Chat input={input}
                  setInput={setInput}
                  messages={messages}
                  onPressEnter={onPressEnter}
                  addMessage={addMessage}
            />
        </div>
    )
}

export default FriendsChat