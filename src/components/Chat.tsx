import { useMemo, useCallback, useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import { MainContainer, Sidebar, ConversationList, Conversation, Avatar, ChatContainer, ConversationHeader, MessageGroup, Message, MessageList, MessageInput, TypingIndicator, InfoButton, VideoCallButton, VoiceCallButton, StarButton, } from "@chatscope/chat-ui-kit-react";
import HashImage from '../assets/HashImage.png'
import {
    useChat,
    ChatMessage,
    MessageContentType,
    MessageDirection,
    MessageStatus
} from "@chatscope/use-chat";
import { MessageContent, TextContent, User } from "@chatscope/use-chat";
import { Button, Navbar } from "react-bootstrap";
import NavbarChat from "./Navbar";
import SwipeableTemporaryDrawer from "./buttonSlider/SliderBtn";

export const Chat = ({ user }: { user: User }) => {

    // Get all chat related values and methods from useChat hook 
    const {
        currentMessages, conversations, activeConversation, setActiveConversation, sendMessage, getUser, currentMessage, setCurrentMessage,
        sendTyping, setCurrentUser
    } = useChat();

    useEffect(() => {
        setCurrentUser(user);
    }, [user, setCurrentUser]);

    // Get current user data
    const [currentUserAvatar, currentUserName] = useMemo(() => {

        if (activeConversation) {
            const participant = activeConversation.participants.length > 0 ? activeConversation.participants[0] : undefined;

            if (participant) {
                const user = getUser(participant.id);
                if (user) {
                    return [<Avatar src={user.avatar} />, user.username]
                }
            }
        }

        return [undefined, undefined];

    }, [activeConversation, getUser]);

    const handleChange = (value: string) => {
        // Send typing indicator to the active conversation
        // You can call this method on each onChange event
        // because sendTyping method can throttle sending this event
        // So typing event will not be send to often to the server
        setCurrentMessage(value);
        if (activeConversation) {
            sendTyping({
                conversationId: activeConversation?.id,
                isTyping: true,
                userId: user.id,
                content: value, // Note! Most often you don't want to send what the user types, as this can violate his privacy!
                throttle: true
            });
        }

    }


    const handleSend = (text: string) => {

        const message = new ChatMessage({
            id: "", // Id will be generated by storage generator, so here you can pass an empty string
            content: text as unknown as MessageContent<TextContent>,
            contentType: MessageContentType.TextHtml,
            senderId: user.id,
            direction: MessageDirection.Outgoing,
            status: MessageStatus.Sent
        });

        if (activeConversation) {
            sendMessage({
                message,
                conversationId: activeConversation.id,
                senderId: user.id,
            });
        }

    };

    const getTypingIndicator = useCallback(
        () => {

            if (activeConversation) {

                const typingUsers = activeConversation.typingUsers;

                if (typingUsers.length > 0) {

                    const typingUserId = typingUsers.items[0].userId;

                    // Check if typing user participates in the conversation
                    if (activeConversation.participantExists(typingUserId)) {

                        const typingUser = getUser(typingUserId);

                        if (typingUser) {
                            return <TypingIndicator content={`${typingUser.username} is typing`} />
                        }

                    }

                }

            }



            return undefined;


        }, [activeConversation, getUser],
    );

    return (<MainContainer responsive>
        <Sidebar position="left" scrollable>
            {/* <NavbarChat /> */}
            <div style={{
                borderBottom: '1px solid #cedbe3',
                paddingLeft: 15,
                paddingRight: 10,
                height: 74,
                display: 'flex',
                justifyContent: "space-between",
                alignItems: 'center',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <div style={{
                        marginLeft: 15,
                    }}>
                        {user.username}
                    </div>
                </div>
                <LogoutIcon color="primary" />
            </div>

            <ConversationList>
                {conversations.map(c => {
                    // Helper for getting the data of the first participant
                    const [avatar, name] = (() => {

                        const participant = c.participants.length > 0 ? c.participants[0] : undefined;

                        if (participant) {
                            const user = getUser(participant.id);
                            if (user) {

                                return [<Avatar src={HashImage} status="available" />, user.username]

                            }
                        }

                        return [undefined, undefined]
                    })();

                    return <Conversation style={{
                        borderBottom: '1px solid #cedbe3'
                    }} key={c.id}
                        name={name}
                        info={c.draft ? `Draft: ${c.draft.replace(/<br>/g, "\n").replace(/&nbsp;/g, " ")}` : ``}
                        active={activeConversation?.id === c.id}
                        unreadCnt={c.unreadCounter}
                        onClick={() => setActiveConversation(c.id)}>
                        {avatar}
                    </Conversation>
                    //  <div style={{
                    //     display: 'flex',
                    //     justifyContent: 'space-around',
                    //     width: 320,
                    //     height: 60,
                    //     borderBottom: '1px solid #cedbe3',
                    //     backgroundColor: 'red',
                    //     padding: 5,
                    // }}
                    //     onClick={() => setActiveConversation(c.id)}
                    // >
                    //     <img style={{
                    //         width: '20%',
                    //         height: '100%',
                    //         borderRadius: 5,
                    //     }}
                    //         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6_biXgzeLrkmwzHGXxv_UPOiqbWJuklFUbDK6mq1Cp0-phvVEhI3xp-DtnpjxcWMwvhA&usqp=CAU" alt="" />
                    //     <div style={{
                    //         display: 'flex',
                    //         alignItems: 'center',
                    //         justifyContent: 'space-between',
                    //         width: '70%',
                    //         height: '100%',
                    //         // backgroundColor:'yellow',
                    //     }}>
                    //         <div>
                    //             <p style={{
                    //                 margin: 0,
                    //                 fontFamily: "Inter,sans-serif",
                    //                 fontSize: 18,
                    //             }}>
                    //                 {name}
                    //             </p>
                    //             <p style={{
                    //                 margin: 0,
                    //                 color: 'gray',
                    //                 fontSize: 13,
                    //             }}>{c.draft ? `Draft: ${c.draft.replace(/<br>/g, "\n").replace(/&nbsp;/g, " ")}` : ``}</p>
                    //         </div>
                    //         <p style={{
                    //             margin: 0,
                    //             color: 'gray',
                    //             fontSize: 10,
                    //         }}>3:00 pm</p>
                    //     </div>
                    // </div>

                })}
            </ConversationList>
        </Sidebar>
        {/* <div style={{
            height: "100%",
            // backgroundColor:'red',
        }}>
            <div style={{
                display: 'flex',
                borderBottom: '1px solid #cedbe3',
                alignItems: 'center',
                height: 65.5,
                backgroundColor: '#f5fbff',

            }}>
                <ConversationHeader.Back />
            </div>
        </div> */}



        <ChatContainer>

            {activeConversation

                &&
                //         <ConversationHeader>
                //     <ConversationHeader.Back />

                //     <ConversationHeader.Content userName="Emily" info="Active 10 mins ago" />                                   
                //     <ConversationHeader.Actions>                                                                             
                //       <StarButton title="Add to favourites" />
                //       <SwipeableTemporaryDrawer/>
                //     </ConversationHeader.Actions>
                // </ConversationHeader>
                <ConversationHeader>
                    <ConversationHeader.Back />
                    {/* {currentUserAvatar} */}
                    <ConversationHeader.Content userName={currentUserName} info="Active 10 mins ago" />
                    <ConversationHeader.Actions>
                        <StarButton title="Add to favourites" />
                        <SwipeableTemporaryDrawer />
                    </ConversationHeader.Actions>
                </ConversationHeader>
            }
            <MessageList typingIndicator={getTypingIndicator()}>
                {activeConversation && currentMessages.map((g) => <MessageGroup key={g.id} direction={g.direction}>
                    <MessageGroup.Messages>
                        {g.messages.map((m: ChatMessage<MessageContentType>) => <Message key={m.id} model={{
                            type: "html",
                            payload: m.content,
                            direction: m.direction,
                            position: "normal"
                        }} />)}
                    </MessageGroup.Messages>
                </MessageGroup>)}
            </MessageList>

            {/* <MessageInput value={currentMessage} onChange={handleChange} onSend={handleSend} disabled={!activeConversation} attachButton={false} placeholder="Type here..." /> */}
        </ChatContainer>

    </MainContainer>);

}