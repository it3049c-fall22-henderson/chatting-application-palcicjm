
let writtenName = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const saveButton = document.getElementById("save-name");
let saved = "not";
const darkButton = document.getElementById("dark-mode");
const lightButton = document.getElementById("light-mode");


let nameInput = document.getElementById("my-name-input");

saveButton.addEventListener("click", function(saveButtonClickEvent){
    saveButtonClickEvent.preventDefault();
    localStorage.setItem('username', writtenName.value);
    saved = "yes";
    nameInput.value = localStorage.getItem('username');
    return nameInput;
});




async function updateMessagesInChatBox() {
  const messages = await fetchMessages();
  let formattedMessages = "";
    messages.forEach(message => {
        formattedMessages += formatMessage(message, nameInput.value);
    });
    chatBox.innerHTML = formattedMessages;

}

const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;

function fetchMessages() {
  return fetch(serverURL)
      .then( response => response.json())
}



sendButton.addEventListener("click", function(sendButtonClickEvent) {
    sendButtonClickEvent.preventDefault();
    
    const sender = nameInput.value;
    const message = myMessage.value;
    if (saved === "yes") {
        sendMessages(sender,message);
        myMessage.value = "";
    } else {alert("Please save a username to send a message")}
 });

 

function formatMessage(message, nameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;
  
  if (nameInput.value == message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}


function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  $.post(serverURL, newMessage);
}



// make an if then else here
  




// final stuff?
function updateMessages() { 
setInterval(updateMessages, 10000);
const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);
}



updateMessages();
updateMessagesInChatBox();


saveButton.addEventListener("click", function(saveButtonClickEvent){
    saveButtonClickEvent.preventDefault();
    localStorage.setItem('username', writtenName.value);
    saved = "yes";
    nameInput.value = localStorage.getItem('username');
    return nameInput;
});