import React, {useState, useEffect, FC, KeyboardEvent} from 'react'
import './ClanChat.css'
import Chat from '../../ChatComponent/Chat'
import {webSocket} from '../../../../../socket'
import BLogo from '../../../../../Assets/images/BLogo.svg'
import BlueLogo from '../../../../../Assets/images/BlueLogo.svg'
import {useDispatch, useSelector} from 'react-redux'
import {getMessageFromServer, setMessages, addMessageFromUser} from '../../../../../Redux/clanChat-reducer'
import {AppStateType} from '../../../../../Redux/redux-store'
import RankM from '../../../../../Assets/images/RankM.png'
import RankA from '../../../../../Assets/images/RankA.png'
import {ExtendedServerMessage, IMessage, MessageFromOwner} from '../../../../../Types/ReduxTypes'

const ClanChat: FC<{}> = () => {

    const dispatch = useDispatch()
    const messages = useSelector((state: AppStateType) => state.ClanChatReducer.messages)
    const [input, setInput] = useState('')

    useEffect(() => {
        fetch('https://test-chat-backend-hwads.ondigitalocean.app/api/messages?skip=0&limit=40')
            .then(response => response.json())
            .then((historyMessages: IMessage[]) => {
                const historyMessagesExtended: ExtendedServerMessage[] = historyMessages.map((message) => {
                    return {
                        ...message,
                        isOwner: false,
                        gamerLevel: Math.floor(Math.random() * 10),
                        userLogo: Math.random() > 0.5 ? BLogo : BlueLogo,
                        gamerRank: Math.random() > 0.5 ? RankM : RankA,
                    }
                })
                dispatch(setMessages(historyMessagesExtended.reverse()))
            })
    }, [dispatch])

    useEffect(() => {
        webSocket.on("message", (message: IMessage): void => {
            const extendedMessage: ExtendedServerMessage = {
                ...message,
                isOwner: false,
                gamerLevel: Math.floor(Math.random() * 10),
                userLogo: Math.floor(Math.random() * 10) > 5 ? BLogo : BlueLogo,
                gamerRank: Math.random() > 0.5 ? RankM : RankA,
            }
            addMessage(extendedMessage)
        })
        return (): void => {
            webSocket.off("message")
        }
    })

    const addMessage = (message: ExtendedServerMessage): void => {
        dispatch(getMessageFromServer(message))
    }

    const onPressEnter = (event: KeyboardEvent): void => {
        if (event.key === 'Enter' && input !== '') {
            const me = 'Natig'
            const message: MessageFromOwner = {
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

export default ClanChat