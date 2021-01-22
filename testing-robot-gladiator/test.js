
// create window prompt for player name
// create player info: name, health, attack
// create console display for player info
// enemy info: name, health, attack
// var fight function
// - window prompt: fight or skip
// - - if fight, player attack sequence
// - - enemy attack sequence
// - - promp enemey survive or died
// - window prompt: if skip, run sequence again (fight or skip);

var playerName = window.prompt("Choose your players name");
var playerHealth = 100;
var playerAttack = 10;

console.log(playerName, playerHealth, playerAttack);

var enemyName = "David";
var enemyHealth = 100;
var enemyAttack = 5;

console.log(enemyName, enemyHealth, enemyAttack);

var fight = function () {
  var promptFight = window.prompt("FIGHT or SKIP the fight");

  if (promptFight === "fight" || promptFight === "FIGHT") {
    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );
}
}

fight();
