// so now each function is put inside the object
//DOM elemets
const resultEl=document.getElementById('result');
const lengthEl=document.getElementById('length');
const uppercaseEl=document.getElementById('uppercase');
const lowercaseEl=document.getElementById('lowercase');
const numberEl=document.getElementById('numbers');
const symbolEl=document.getElementById('symbols');
const generateEl=document.getElementById('generate');
const clipboardEl=document.getElementById('clipboard');


const randomFunc={
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbol
}

/*//copy clisboard*/
function myFunction() {
  /*Get the text field */
  let resultEl1 = document.getElementById("result");
  /* Select the text field */
  let newpassword =resultEl.innerText;
  //resultEl1.setSelectionRange(0, 99999); /* For mobile devices */
   /* Copy the text inside the text field */
  navigator.clipboard.writeText(newpassword);
  /* Alert the copied text */
  alert("Copied the text: " + resultEl.innerText);
}



generateEl.addEventListener('click', () =>{

    const length = +lengthEl.value;
    //below const will return boolean values true or false based on the action,which is that is checkboxes are checked or not if yes then 
    //cosnt will return the true otherwise will return false.
    const hasLower=lowercaseEl.checked;
    const hasUpper=uppercaseEl.checked;
    const hasNumber=numberEl.checked;
    const hasSymbol=symbolEl.checked;
    //the values of the obove objects is passed to the function called 'generatePassword()'
    //and further this function is passed ot resultEl which intern will return to result container.

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
//this is a method which attach an event handler to the document.
//syntax >>> element.addEventListener(event, function, useCapture)
//whenever we click generate which is an event handler attached to generate button
//


//genratePassword
function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword='';
    const typesCount=lower+upper+number+symbol; //this will give the count of the trues and false returned by the functions
    const typesArr= [{lower}, {upper}, {number}, {symbol}].filter
    (
        item => Object.values(item)[0]
        );
    //this then will give an array of trues and false returnded by the functions
    //curly braces will change the format of output like >>> 0:{lower:false}     1:{upper:true}.....like this
    //to elimate the selection of false function we will use the filter funciton
    if (typesCount === 0){
        return '';
    }//so if there is non checked then we dont need to genertae the password

    for(let i=0; i<length; i+=typesCount){
        typesArr.forEach(type => {
            const funcName=Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword;
}





//genrator function
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()*26)+97);
    // from this statement we return lowercase random letter...
    //as mention from 97 to 122 each number indicate the separate lowercase letter form charcters
    // String.fromCharCode() will convert those number to charcters
    //and Math.random() gives the random numbers from the given range but with the decimals and we need complete numbers
    //for that we use Math.floor(Math.random()).
}
//similarly to obtain uppercase letter we just the numbers
//here uppercase letters start from 65 and ends at 90
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26)+ 65 );
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}
function getRandomSymbol(){
    const symbols='!@#$~%^&*()+=[]{}<>?/,.';
    return symbols[Math.floor(Math.random()*symbols.length)];
}
//symbols[0]>>will give the ! which is indexed at '0' as array elements are indexed so similarly we 
//are now just generating random number withing that bracket to so that we get the symbols indexed at that 
//number.
