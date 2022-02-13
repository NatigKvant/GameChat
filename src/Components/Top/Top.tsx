import React, {FC} from 'react'
import './Top.css'
import {NavLink} from 'react-router-dom'
import DropDown from './TopBar/DropDown/DropDown'
import resize from '../../Assets/images/resize.svg'
import resizeReverse from '../../Assets/images/resize_reverse.svg'
import minimize from '../../Assets/images/minimize.svg'
import {Config, Language, TopPropsType} from '../../Types/Types'


const configs: Config[] = [
    {id: 1, path: './generalchat', name: 'ОБЩИЙ'},
    {id: 2, path: './clanchat', name: 'КЛАН'},
    {id: 3, path: './friendschat', name: 'ДРУЗЬЯ'},
    {id: 4, path: './newschat', name: 'НОВОСТИ'},
]

const languages: Language[] = [
    {id: 1, value: 'RU', name: 'RU'},
    {id: 2, value: 'EN', name: 'EN'},
    {id: 3, value: 'ZHO', name: 'ZHO'}
]

const Top: FC<TopPropsType> = ({appResize, windowSize}) => {
    return (
        <div className='top'>
            {configs.map(config =>
                <span key={config.id}>
                    <NavLink to={config.path}
                    >
                        {config.name}
                    </NavLink>
                    </span>
            )}
            <span>
            <DropDown languages={languages}
            />
                </span>
            <span>
               <div className='resize' onClick={appResize}>
                   {!windowSize ? (
                       <img
                           alt='resizeIconReverse'
                           src={resize}/>
                   ) : (
                       <img
                           alt='resizeIconReverse'
                           src={resizeReverse}/>
                   )}
               </div>
            </span>
            <span>
               <div className='minimize'>
                    <img alt='minimizeIcon'
                         src={minimize}/>
                </div>
            </span>
        </div>
    )
}

export default Top