import { h } from 'hyperapp';
import './Main.css';

const Message = ({ message, username, sentAt }) => (
  <div className="message-wrapper">
    <div className="message-header">
      <span className="author">{username}</span>{' '}
      <span className="date">{`${new Date(sentAt)
        .toString()
        .split(' ')
        .slice(0, 5)
        .join(' ')}`}</span>
    </div>
    <div className="message-body">{message}</div>
  </div>
);

function updateScroll() {
  const element = document.querySelector('.message-log');
  if (element) element.scrollTop = element.scrollHeight;
}

const MainView = (props) => {
  return (
    <div className="container">
      <header>
        <div className="user-box">
          <div className="user">{props.state.appStatus.username}</div>
          <button className="btn-base btn-logout" onclick={props.actions.handleLogout}>
            logout
          </button>
        </div>
      </header>
      <div id="main">
        <div className="msg-log">
          <div className="message-log" onupdate={updateScroll}>
            {props.state.chat.messageLog.map((msg) => (
              <Message {...msg} />
            ))}
          </div>
        </div>
        <div className="user-list">
          <div className="user-list-header">Users Online</div>
          <div className="user-list-log">
            {props.state.chat.userList.map((user) => (
              <div>{user}</div>
            ))}
          </div>
        </div>
      </div>
      <footer>
        <textarea
          className="input-area"
          rows={5}
          value={props.state.chat.draft}
          oninput={(e) => props.actions.chat.handleEnter(e.target.value)}
          oncreate={(e) => {
            let newline = false;
            e.addEventListener('keypress', (e) => {
              if (e.keyCode === 13 && !newline) {
                e.preventDefault();
                props.actions.chat.sendMessage();
              }
            });
            e.addEventListener('keydown', (e) => {
              if (e.keyCode === 16) newline = true;
            });
            e.addEventListener('keyup', (e) => {
              if (e.keyCode === 16) newline = false;
            });
          }}
        />
        <button className="btn-base send-btn" onclick={props.actions.chat.sendMessage}>
          Send
        </button>
      </footer>
    </div>
  );
};

export default MainView;
