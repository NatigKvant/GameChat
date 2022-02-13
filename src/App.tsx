import React, {useState} from 'react'
import './App.css'
import Top from './Components/Top/Top'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import GeneralChat from './Components/Top/TopBar/Chats/GeneralChat/GeneralChat'
import ClanChat from './Components/Top/TopBar/Chats/ClanChat/ClanChat'
import FriendsChat from './Components/Top/TopBar/Chats/FriendsChat/FriendsChat'
import NewsChat from './Components/Top/TopBar/Chats/NewsChat/NewsChat'

const App: React.FC = () => {

    const [windowSize, setWindowSize] = useState(false)

    const appResize = () => {
        setWindowSize(!windowSize)
    }

    return (
        <BrowserRouter>
            <div className='app' style={{transform: (windowSize ? 'scale(1.5)' : '')}}>
                <Top appResize={appResize}
                     windowSize={windowSize}
                />
                <Switch>
                    <Route exact path="/"
                           render={() => <Redirect to={"/generalchat"}/>}
                    />
                    <Route path='/generalchat'
                           component={(GeneralChat)}
                    />
                    <Route path='/clanchat'
                           component={(ClanChat)}
                    />
                    <Route path='/friendschat'
                           component={(FriendsChat)}
                    />
                    <Route path='/newschat'
                           component={(NewsChat)}
                    />
                    <Route path="*"
                           render={() => <div>404 NOT FOUND</div>}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
