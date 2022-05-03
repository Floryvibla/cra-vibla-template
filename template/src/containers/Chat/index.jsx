import React, { useState, useEffect, useRef, Fragment } from 'react'
import MessageReceived from "./../../components/Chat/MessageReceived"
import MessageSend from "./../../components/Chat/MessageSend"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane, faCaretSquareLeft } from "@fortawesome/free-regular-svg-icons"
import HttpNlp from "./../../config/HttpNlp"
import { chatAction } from "./../../actions"
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

export const Chat = () => {
  const httpNlp = HttpNlp();
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState();
  const [chat, setChat] = useState([]);
  const { loading, chatBoot, error } = useSelector(state => state.chatBoot)

  useEffect(() => {
    if (localStorage.getItem("@investpage/storage")) {
      setUserId(JSON.parse(localStorage.getItem("@investpage/storage")).userId)
    } else {
      const id = uuidv4();
      localStorage.setItem("@investpage/storage", JSON.stringify({ 
        userId: id
      }))

      setUserId(id);
    }
  }, [])

  async function handleSendMessage(e) {
    try {
      e.preventDefault();
      if (message.trim() === "") {
        return false;
      }
      const messageAux = message;
      setMessage("");
      setChat((state) => ([
        ...state,
        {
          from: "user",
          message: messageAux
        }
      ]));
      const formData = new FormData();
      formData.append('user', userId);
      formData.append('query', message);

      chatAction.loadChat(formData)
      setChat((state) => ([
        ...state,
        {
          from: "bot",
          message: chatBoot
        }
      ]))
    } catch(err) {
      console.log(err)
    }
  }

  const firstMsg= "Hi, my name is Jo. I can help you understand the financial market and improve your trading skills. Ask me things like: What is Forex? Try it out."

  return (
    <div className="container flex justify-end flex-col lg:px-0 pl-0 lg:pl-16">
      <div className="chat-wrapper pt-0 w-100 position-relative scroll-bar">
        <div className="chat-body flex h-full flex-col justify-between" style={{ height: "100vh"}}>
          <div className="messages-content mb-50px lg:mb-0 pb-0 h-full overflow-y-auto">
          <MessageReceived name="Jo" message={ firstMsg} />
            { chat.map((item, index) => (
              <Fragment key={index}>
                {item.from === "user" ? (
                  <MessageSend name="Visitor" message={ item.message } />
                ) : (
                  <MessageReceived name="Jo" message={ item.message } />
                )}
                <AlwaysScrollToBottom />
              </Fragment>
            ))}
          </div>
          <div className="w-full z-10 px-4 lg:px-0 flex flex-col justify-center fixed bottom-0 right-0 lg:relative bg-white ">
            <form className="h-60px  flex items-center w-full mb-0 px-0 py-0">
              <div className="rounded-3xl bg-gray-200 px-4 py-2 w-full">
                <input type="text" placeholder="Start typing.." value={message} className="text-black text-base bg-transparent w-full focus:outline-none" onChange={ (e) => setMessage(e.target.value) }/>
              </div>
              <button disabled={loading} onClick={handleSendMessage} type="submit" className="rounded-full bg-primary h-45px min-w-45px ml-2 text-white flex items-center justify-center">
                <FontAwesomeIcon icon={faPaperPlane} className="w-16px h-16px text-white" />
              </button>
            </form>
          </div> 
        </div>
      </div>
    </div>
  )
}