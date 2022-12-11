//------Start Log-in JS------
var formSection = document.querySelector(".formSection");
var emailSection = document.querySelector(".emailSection");
var emailInput = document.querySelector(".emailInput");
var passwordSection = document.querySelector(".passwordSection");
var passwordInput = document.querySelector(".passwordInput");

formSection.onsubmit = (e) => {
    e.preventDefault();
    (emailInput.value == "") ? emailSection.classList.add("shake", "error") : checkEmail();
    (passwordInput.value == "") ? passwordSection.classList.add("shake", "error") : checkPass();

    setTimeout(() => {
        emailSection.classList.remove("shake");
        passwordSection.classList.remove("shake");
    }, 800);

    emailInput.onkeyup = () => {checkEmail();}
    passwordInput.onkeyup = () => {checkPassword();}

    function checkEmail(){
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(!emailInput.value.match(pattern)){
          emailSection.classList.add("error");
          emailSection.classList.remove("valid");
            let errorMessage = emailSection.querySelector(".errorMessage");
        
            (emailInput.value != "") ? errorMessage.innerText = "Please enter a valid email address" : errorMessage.innerText = "Email can't be blank";
        }else { 
            emailSection.classList.remove("error");
            emailSection.classList.add("valid");
        }
    }
    function checkPassword(){
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(!passwordInput.value.match(pattern)){
          passwordSection.classList.add("error");
          passwordSection.classList.remove("valid");
            let errorMessage = passwordSection.querySelector(".errorMessage");
        
            (passwordInput.value != "") ? errorMessage.innerText = "Invalid password" : errorMessage.innerText = "Password can't be blank";
        }else { 
          passwordSection.classList.remove("error");
          passwordSection.classList.add("valid");
        }
    }
}
//------End Log-in JS------

//------Start Chatbox JS------
var chatboxLogo = document.querySelector(".chatboxLogo")
var messageContainer = document.querySelector(".messageContainer")
var messageInput = document.querySelector(".messageInput")
var messageForm = document.querySelector(".messageForm")
var messageContent = document.querySelector(".messageContent")
var messageNoMessage = document.querySelector(".messageNoMessage")

//------CHATBOX------
chatboxLogo.addEventListener("click", function () {
    messageContainer.classList.toggle('show')
  })
  
  //------MESSAGE------
  messageInput.addEventListener("input", function () {
    let line = messageInput.value.split("/n").length
  
    if(messageInput.rows < 6 || line < 6) {
      messageInput.rows = line
    }
    if(messageInput.rows > 1) {
      messageForm.style.alignItems = "flex-end"
    }
    else {
      messageForm.style.alignItems = "center"
    }
  })
  
  messageForm.addEventListener("submit", function (x) {
    x.preventDefault()
  
    if(isValid(messageInput.value)) {
      writeMessage()
      setTimeout(autoReply, 1000)
    }
  })
  
  function addZero(num) {
    return num < 10 ? '0'+num : num
  }
  
  function writeMessage() {
    const today = new Date()
    let message = `
      <div class="messageText sent">
        <span class="messageTexts">${messageInput.value.trim().replace(/\n/g, "<br>\n")}</span>
        <span class="messageTime">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
      </div>
    `
    messageContent.insertAdjacentHTML("beforeend", message)
    messageForm.style.alignItems = "center"
    messageInput.rows = 1
    messageInput.focus()
    messageInput.value = ""
    messageNoMessage.style.display = "none"
    scrollBottom()
  }
  
  function autoReply() {
    const today = new Date()
    let message = `
      <div class="messageText received">
        <span class="messageTexts">We'll get back to you in a minute!</span>
        <span class="messageTime">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
      </div>
    `
    messageContent.insertAdjacentHTML("beforeend", message)
    scrollBottom()
  }
  
  function scrollBottom() {
    messageContent.scrollTo(0, messageContent.scrollHeight)
  }
  
  function isValid(value) {
    let text = value.replace(/\n/g, "")
    text = text.replace(/\s/g, "")
  
    return text.length > 0
  }
//------End Chatbox JS------