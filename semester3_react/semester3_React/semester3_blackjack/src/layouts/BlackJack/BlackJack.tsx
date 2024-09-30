import React from 'react';
import { ChatComponent } from './components/ChatSideBar';
import BlackjackTable from './components/BlackJackComponent';
import image from "./../../images/bg.png";

export const BlackJack: React.FC = () => {
    return (
        <div style={{ display: 'flex', height: '90vh' }}>
            <div style={{ flex: '0 0 13%', backgroundColor: 'lightgray' }}>
                <ChatComponent />
            </div>
            <div style={{flex:"auto", backgroundImage:`url(${image})`, overflow:"hidden"}}>  
                <BlackjackTable />
            </div>
        </div>
    );
};

