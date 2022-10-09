let nameEl = document.getElementById("name-input")
const confirmBtn = document.getElementById("confirm-btn")
let cardNumber = document.getElementById("cardnumber")
let expMonth = document.getElementById("month")
let expYear = document.getElementById("year")
let cvc = document.getElementById("cvc-input")
let cardNumPRV = document.getElementById("card-number-prv")
let cardHolderNamePRV = document.getElementById("cardholder-name-prv")
let expMonthPRV = document.getElementById("exp-month-prv")
let expYearPRV = document.getElementById("exp-year-prv")
let cvcPRV = document.getElementById("cvc-prv")
let carddigits = 0
let cardNumberArray = []
let nameArray = []
let monthArray = []
let yearArray = []
let cvcArray = []
let nameCondition = 0           // 0 -> default condition, when page is first loaded
let cardnumberCondition = 0     // 1 -> an input has been given and is currently active and works perfectly
let monthCondition = 0          // 2 -> input error
let yearCondition = 0           // 3 -> special exclusion error for blank input field
let cvcCondition = 0
let nameError = document.getElementById("name-error")
let numberError = document.getElementById("card-number-error")
let expError = document.getElementById("expdate-error")
let cvcError = document.getElementById("cvc-error")
let confirmError = document.getElementById("confirm-error")
let confirmFollowUp = document.getElementById("card-details-container")
let confirmedPage = document.getElementById("confirmed-page")
let signal = "stop"

confirmFollowUp.style.visibility = "visible"
confirmedPage.style.visibility = "hidden"

confirmBtn.addEventListener("click", function(){
    checkDetails()
    if (signal === "go"){
        confirmFollowUp.style.visibility = "hidden"
        confirmedPage.style.visibility = "visible"
    }
})

// Generating cardholder's name while typing
nameEl.addEventListener("input", function(){
    nameSplitter()
    cardHolderNamePRV.textContent = ""
    for(let i = 0; i < nameArray.length; i++){
          cardHolderNamePRV.textContent += nameArray[i]
    }
    if (nameCondition === 2){
        cardHolderNamePRV.textContent = ""
      }
})

// Generating card number while typing
cardNumber.addEventListener("input", function(){
    cardNumberSplitter()
    cardNumPRV.textContent = ""
    for(let i = 0; i < cardNumberArray.length;){
        for( let j =0; j < 4; i++){
            if (cardNumberArray[i] === undefined){
                cardNumPRV.textContent += ""
            } else{
                cardNumPRV.textContent += cardNumberArray[i]
            }
            j++
        }
        cardNumPRV.textContent += " "
    }
    if (cardnumberCondition === 2){
        cardNumPRV.textContent = "1234 5678 9123 0000"
      }
   
})

// Generating validity date while typing
    //For Month:
    expMonth.addEventListener("input", function(){
        monthSplitter()
        expMonthPRV.textContent = ""
        for(let i = 0; i < monthArray.length; i++){
            expMonthPRV.textContent += monthArray[i]
      }
      if (monthCondition === 2){
        expMonthPRV.textContent = "MM"
      }
    })
    //For Year:
    expYear.addEventListener("input", function(){
        yearSplitter()
        expYearPRV.textContent = ""
        for(let i = 0; i < yearArray.length; i++){
            expYearPRV.textContent += yearArray[i]
      }
      if (yearCondition === 2){
        expYearPRV.textContent = "YY"
      }
    })

// Generating CVC while typing 
cvc.addEventListener("input", function(){
    cvcSplitter()
    console.log(cvcArray)
    cvcPRV.textContent = ""
    for(let i = 0; i < cvcArray.length; i++){
        cvcPRV.textContent += cvcArray[i]
  }
  if (cvcCondition === 2){
    cvcPRV.textContent = "CVC"
  }
})

// Split the card number into an array
function cardNumberSplitter(){
    let cardNo = cardNumber.value
    cardNo = cardNo.toUpperCase()
    cardNo = cardNo.replace(/\s/g, "")
    carddigits = cardNo.length
    if(/^\d+$/i.test(cardNo) === true ){ // this tests if all characters are numerical digits or not
        if(cardNo.length < 17 && cardNo.length > 0){
            if(cardNo.length < 16){
                cardNumberArray = cardNo.split("")
                numberError.textContent = "Please enter a valid card number"
                cardnumberCondition = 4 //special condition
                cardNumber.style.border = "1.5px solid rgb(255, 53, 53)"
            }else{
            cardNumberArray = cardNo.split("")
            numberError.textContent = ""
            cardnumberCondition = 1
            cardNumber.style.border = "1.5px solid #937dc2" 
        }    
        } else if (cardNo.length > 16){
            numberError.textContent = "Please enter a valid card number"
            cardnumberCondition = 2
            cardNumber.style.border = "1.5px solid rgb(255, 53, 53)"
        } 
        
    } else if ( cardNo.length > 0 ){
        numberError.textContent = "Please enter only numerical digits"
        cardnumberCondition = 2
        cardNumber.style.border = "1.5px solid rgb(255, 53, 53)"
    } else {
        numberError.textContent = "Card number cannot be left blank"
        cardnumberCondition = 2
        cardNumber.style.border = "1.5px solid rgb(255, 53, 53)"
    }
}


// Split the cardholder's name into an array
function nameSplitter(){
    let nameSplit = nameEl.value
    nameSplit = nameSplit.toUpperCase()
    if(nameSplit.length < 33 && nameSplit.length > 0){
        nameArray = nameSplit.split("")
        nameError.textContent = ""
        nameCondition = 1
        nameEl.style.border = "1.5px solid #937dc2"
        j = 1
    } else if (nameSplit.length >= 33){
        nameError.textContent = "Name cannot be more than 32 characters"
        nameCondition = 3 // special exclusion
        nameEl.style.border = "1.5px solid rgb(255, 53, 53)"
    } else {
        nameError.textContent = "Name cannot be left blank"
        nameCondition = 2
        nameEl.style.border = "1.5px solid rgb(255, 53, 53)"
    }
}

// Splitting the validity dates into array 
    // For month
function monthSplitter(){
    let monthSplit = expMonth.value
    monthSplit = monthSplit.replace(/\s/g, "")
    let monthSplitNo = Number(monthSplit)
    if(monthSplitNo > 0 && monthSplitNo < 13 ){
        monthArray = monthSplit.split("")
        monthCondition = 1
        expError.textContent = ""
        expMonth.style.border = "1.5px solid #937dc2"
    } else{
        expError.textContent = "Enter a valid month"
        monthCondition = 2
        expMonth.style.border = "1.5px solid rgb(255, 53, 53)"
    }
}
    // For year
function yearSplitter(){
    let yearSplit = expYear.value
    yearSplit = yearSplit.replace(/\s/g, "")
    let yearSplitNo = Number(yearSplit)
    if(yearSplitNo > 21 && yearSplitNo < 41 ){
        yearArray = yearSplit.split("")
        yearCondition = 1
        expError.textContent = ""
        expYear.style.border = "1.5px solid #937dc2"
    } else{
        expError.textContent = "Enter a valid year"
        yearCondition = 2
        expYear.style.border = "1.5px solid rgb(255, 53, 53)"
    }
}


// Splitting CVC into array
function cvcSplitter(){
    let cvcSplit = cvc.value
    cvcSplit = cvcSplit.replace(/\s/g, "")
    let cvcSplitNo = Number(cvcSplit)
    if(cvcSplitNo > 99 & cvcSplitNo < 1000){
        cvcArray = cvcSplit.split("")
        cvcCondition = 1
        cvcError.textContent = ""
        cvc.style.border = "1.5px solid #937dc2"
    } else if (cvcSplitNo > 0 && cvcSplitNo < 100){
        if(cvcSplit[0]==="0"){
            cvcArray = cvcSplit.split("")
            cvcCondition = 1
            cvcError.textContent = ""
            cvc.style.border = "1.5px solid #937dc2"
        } else{
        cvcCondition = 2
        cvcError.textContent = "Enter a valid 3 digit CVC"
        cvc.style.border = "1.5px solid rgb(255, 53, 53)"
        }
    } else{
        cvcCondition = 2
        cvcError.textContent = "Enter a valid 3 digit CVC"
        cvc.style.border = "1.5px solid rgb(255, 53, 53)"
    }
}

// Final Check
function checkDetails(){
    if(((nameCondition === 1 && cardnumberCondition === 1) && (cvcCondition === 1 && monthCondition === 1)) && yearCondition === 1){
        signal = "go"
        confirmError.textContent = "Processing..."
    } else {
        signal = "stop"
        confirmError.textContent = "Please see that all fields are filled correctly"
    }
}

// Changing input position for virtual keyboard:
if (document.getElementsByClassName("input-tags") == document.activeElement) {
    document.getElementById("input-tags").class += "absolute"
}