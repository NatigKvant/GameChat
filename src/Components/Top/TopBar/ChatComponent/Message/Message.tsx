import React, {FC} from 'react'
import './Message.css'
import {CommandChatMessage} from '../Chat'

const Message: FC<CommandChatMessage> = ({text, isOwner, from, gamerLevel, createdAt, userLogo, gamerRank, id}) => {
    return (
        <div className='message'>
            <div className={`chat ${isOwner && 'owner'}`}>
                {!isOwner &&
                <div className='user_name'>
                    <div className={userLogo ? `user_logo` : 'hidden'}>
                        <img alt='logo_circle'
                             src={!isOwner ? userLogo : 'hidden'}/>
                    </div>
                    {!isOwner ? from : null}
                    <div className={gamerRank ? `gamer_rank` : 'hidden'}>
                        <img alt='rank'
                             src={!isOwner ? gamerRank : 'hidden'}/>
                    </div>
                    <div className='gamer_level'>
                        {gamerLevel}
                    </div>
                </div>
                }
                {text}
            </div>
            {createdAt ?
                <div className={`message_time ${isOwner && 'owner'}`}>
                    {createdAt.substr(11, 5)}
                </div>
                : null}
        </div>
    )
}

export default Message