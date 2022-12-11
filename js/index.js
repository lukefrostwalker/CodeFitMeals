const planContainer = document.querySelector("#planContainer");
const selectDate = document.querySelectorAll("#dateSelector");
const subTotal = document.querySelectorAll("#subTotal");

let cart = []


function dateSelect(date) {
    console.log(date)
}

const dateClicked = e => {
    let date = e.target.dataset.date
    let order = e.target.dataset.seq
    console.log(order)
    // e.target.style.color = "black"
    e.target.classList.add("clicked")
    e.target.style.pointerEvents = "none"

    if (e.target.classList.contains("clicked")) {
        dateSelect(date)
        e.target.classList.add("delete")

        var main = document.createElement("div")
        main.classList = "mb-3 deleteID"
        main.dataset.id = date
        main.style.order = order
   
        var dateTitle = document.createElement("p")
        dateTitle.classList = "date_title fw-bold text-center py-2 text-white mt-3"
        dateTitle.innerHTML = date + " MENU   "

        var delBtn = document.createElement("button")
        delBtn.innerHTML = "Remove"
        delBtn.style.fontSize = "12px"
        delBtn.classList = "del-btn btn btn-outline-light rounded-pill fw-bold";
        delBtn.addEventListener("click", delItem)
    
        var mealGroup = document.createElement("div")
        mealGroup.classList = "card-group gap-4"
  
        planContainer.appendChild(main)
        main.appendChild(dateTitle)
        dateTitle.appendChild(delBtn)
        main.appendChild(mealGroup)

        meals.forEach((meal) => {
            mealGroup.innerHTML += `
            <div class="card col-lg-12 col-sm-3 col-3 border" style="width: 18rem;">
            <img src="${meal.imgSrc}" alt="...">
            <div class="card-body position-relative">
              <h5 class="card-title">
                ${meal.name}</br><span class="small">₱${meal.price}</span>⠀<i type="button" class="fa-solid fa-circle-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop${meal.id}"></i>
              </h5>
              
              <div class="modal fade" id="staticBackdrop${meal.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">${meal.name}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container pb-4">
                            <div class="text-center" id="meal-modal-image"><img src="${meal.imgSrc}" class="img-thumbnail" alt="meal-image"></div>

                            <div class="text-center alert alert-danger" role="alert">
                                <strong style="color:red; font-size: 0.825rem;">
                                    Ingredient items and nutrition facts are subject to change without prior notice.
                                </strong>
                            </div>
                            <div class="mb-3">
                                <div class="mb-1">
                                    <span class="fw-bold">Ingredients: </span>
                                </div>
                                <div id="ingredients">${meal.ingredients}</div>
                            </div>
                            <div class="container">
                            <div class="py-2">
                                <div class="mb-2 fw-bold">
                                    <span>Nutrition</span>
                                </div>
                                <div class="nutrition mb-1">
                                    ${meal.facts}
                                </div>
                            </div>
                            </div>
                            <div class="d-grid mt-3">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              <p class="card-text">${meal.description}</p>

                <div class="d-inline-flex">
                    <div class="input-group-sm d-inline-flex">
                        <button class="btn btn-outline-success" type="button" onclick="changeNumberOfQuantity('minus', ${meal.id})" data-target=${meal.id}"><i class="fa-solid fa-minus"></i></button>
                        <input type="text" class="form-control quantity-input" placeholder="Quantity" id=${meal.id} value=0>
                        <button class="btn btn-outline-success" type="button" onclick="changeNumberOfQuantity('plus', ${meal.id})" data-target=${meal.id}"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
            </div>
          </div>
            `
            
        })

        } else if (e.target.classList.contains("delete")) {
            // var delMain = document.querySelector('[data-id = ${date}]');
            // console.log(delMain)
            console.log(date)
            // delMain.remove()
            
    }

    

    function delItem() {
        let delText = "Are you sure?";
            
            if (confirm(delText) === true) {
                delBtn.parentElement.parentElement.remove();
                e.target.classList.remove("clicked")
                e.target.style.pointerEvents = ""
            }
    }
}

for (let x of selectDate) {
    x.addEventListener("click", dateClicked)
}

function changeNumberOfQuantity(action, id) {
    var quantity = document.querySelector(".quantity-input")
    quantity.value = 0
    subTotal.innerHTML = 0

        if(cart.some((item) => item.id === id)) {
            let numberOfUnits = meals.numberOfUnits
                quantity.value = numberOfUnits
            if(meals.id === id) {
                
                if (action === "minus" && numberOfUnits > 1) {
                    quantity.value--
                    numberOfUnits--
                } else if (action === "plus") {
                    numberOfUnits++
                    quantity.value++

                }
            }
        } else {
            const item = meals.find((meal) => meal.id === id)
            cart.push({
                ...item,
                numberOfUnits: 1,
            })
        }
        console.log(cart)
        
   
    cart = cart.map((meal) => {
        let numberOfUnits = meal.numberOfUnits
        if(meal.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--
                // quantity.value--
            } else if (action === "plus") {
                numberOfUnits++
                // quantity.value++
            }
        }
        return {
            ...meal,
            numberOfUnits,
        }
        
    })
}

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
