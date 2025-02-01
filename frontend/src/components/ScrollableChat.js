import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Check if content is a string or object */}
              {m.content == null ? (
                <span>[No Content]</span>
              ) : typeof m.content === "object" && m.content.type === "text" ? (
                <span>{m.content.content}</span> 
              ) : typeof m.content === "string" &&
                !m.content.startsWith("http") ? (
                <span>{m.content}</span>
              ) : typeof m.content === "string" &&
                m.content.startsWith("http") &&
                (m.content.endsWith(".jpg") ||
                  m.content.endsWith(".jpeg") ||
                  m.content.endsWith(".png") ||
                  m.content.endsWith(".gif")) ? (
                <img
                  src={m.content}
                  alt="sent file"
                  style={{ maxWidth: "200px", borderRadius: "10px" }}
                />
              ) : typeof m.content === "string" &&
                m.content.startsWith("http") &&
                m.content.endsWith(".mp4") ? (
                <video
                  src={m.content}
                  controls
                  style={{ maxWidth: "250px", borderRadius: "10px" }}
                />
              ) : typeof m.content === "object" &&
                m.content.type === "image" ? (
                <img
                  src={m.content.url}
                  alt="sent"
                  style={{ maxWidth: "200px", borderRadius: "10px" }}
                />
              ) : typeof m.content === "object" &&
                m.content.type === "video" ? (
                <video
                  src={m.content.url}
                  controls
                  style={{ maxWidth: "250px", borderRadius: "10px" }}
                />
              ) : (
                <span>[Unsupported Message Format]</span>
              )}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
