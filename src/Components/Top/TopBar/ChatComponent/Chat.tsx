import React, {useEffect, useRef, FormEvent, FC, KeyboardEvent} from 'react'
import './Chat.css'
import Message from './Message/Message'
import emodji from '../../../../Assets/images/emodji.svg'
import {MessageFromOwner, ExtendedServerMessage} from '../../../../Types/ReduxTypes'

export type CommandChatMessage = Partial<ExtendedServerMessage> & MessageFromOwner

export interface ChatPropsType {
    input: string
    setInput: (text: string) => void
    messages: CommandChatMessage[]
    onPressEnter: (event: KeyboardEvent) => void
    addMessage: (message: ExtendedServerMessage) => void
}

const Chat: FC<ChatPropsType> = ({input, setInput, messages, onPressEnter, addMessage}) => {

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesStartRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "auto"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        setInput('')
    }
    return (
        <form className='general-form' onSubmit={handleSubmit}>
            <div className='general-chat' ref={messagesStartRef}>
                {messages.map((message, index) =>
                    <Message
                        text={message.text}
                        key={message.id}
                        isOwner={message.isOwner}
                        from={message.from}
                        gamerLevel={message.gamerLevel}
                        createdAt={message.createdAt}
                        userLogo={message.userLogo}
                        gamerRank={message.gamerRank}
                        id={message.id}
                    />
                )}
                <div ref={messagesEndRef}>
                </div>
            </div>
            <div className='input'>
                <input type='text'
                       value={input}
                       onKeyPress={onPressEnter}
                       onChange={event => setInput(event.target.value)}
                       placeholder='Напишите сообщение...'
                />
                <img
                    alt='emodjiIcon'
                    src={emodji}/>
            </div>
        </form>
    )
}

export default Chat