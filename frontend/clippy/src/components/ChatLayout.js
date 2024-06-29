import React from 'react';
import Clippy from './Clippy';
import ChatBox from './ChatBox';
import './ChatLayout.css';

const ClippyChatLayout = () => (
  <div className="clippy-chat-container">
        <div className="chatbox">
      <ChatBox />
    </div>
    <div className="clippy">
      <Clippy />
    </div>
  </div>
);

export default ClippyChatLayout;
