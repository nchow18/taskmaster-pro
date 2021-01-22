// Assignment code here

function generatePassword(passwordInput) {
  var passwordInput = window.prompt('Choose a number between 8 - 128');
  var passwordLength
  if (passwordInput < 8 && passwordInput > 128) { passwordLength = passwordInput } else { alert('Please choose a number between 8 - 128')}


  /* lower case character true or false */
  var lowerCase = confirm('confirm for lower case characters');
  var lower;
  if (lowerCase === true) { lower = 'abcdefghijklmnopqrstuvwxyz';} else { lower = '';}

  /* upper case character true or false */
  var upperCase = confirm('Confirm for upper case characters')
  var upper;
  if (upperCase === true) { upper = "ABCDEFHGIJKLMNOPQRSTUVWXYZ";} else { lower = '';}

  /* symbols character true or false */
  var symbolsCharacter = confirm('Confirm for symbol characters')
  var symbols;
  if (symbolsCharacter === true) { symbols = "!@#$%^&*()_-=+[]{}";} else { symbols = '';}

  /* numbers character true or false */
  var numberCharacter = confirm('Confirm for number characters')
  var numbers;
  if (numberCharacter === true) {numbers = "0123456789"} else { numbers = '';}

  /* random number generator */
  var result = '';
  var list = lower.concat(upper).concat(symbols).concat(numbers);
  var characterLength = list.length;
  for (var i = 0; i < passwordLength; i++) {
    result += list.charAt(Math.floor(Math.random() * characterLength));
  }
return result;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var replaceText = document.querySelector("textarea");
  replaceText.textContent = password;
 

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

