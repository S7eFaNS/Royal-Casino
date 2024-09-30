import { Button } from "react-bootstrap";
import { useChat } from "../../Utils/API_Calls/Message/FetchMessage";

export const ChatComponent = () => {
  const {
    messages,
    message,
    username,
    handleNicknameChange,
    handleMessageChange,
    sendMessage,
  } = useChat(); 

  return (
    <div className="chat-container" style={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
      <div className="chat-messages" style={{ flex: '1 1 auto', overflowY: 'auto', backgroundColor:"#9a77e0", color:"black", maxWidth:"200px" }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <span>{msg.username}: </span>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="chat-input" style={{ flex: '0 0 auto', padding: '10px', borderTop: '1px solid #ccc' }}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          style={{ marginRight: '10px', width: '100%', marginBottom: '5px' }} 
        />
        <input
          type="text"
          value={username}
          onChange={handleNicknameChange}
          placeholder="Your nickname..."
          style={{ marginRight: '10px', width: '100%', marginBottom: '5px' }} 
          readOnly
        />
        <Button style={{ backgroundColor:"#4f1098", color:"white", width: '100%' }} onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};
