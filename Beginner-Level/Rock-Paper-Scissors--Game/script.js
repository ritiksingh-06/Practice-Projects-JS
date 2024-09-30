let playGame = confirm("Hey!!!, Let's play Rock-Paper-Scissors?")
if(playGame){
    let playerChoice = prompt("Please enter Rock, Paper or Scissors")
    if (playerChoice){
        let player = playerChoice.trim().toLocaleLowerCase()
        if (player === "rock" || player === "paper" || player === "scissors"){
            let computerChoice = Math.floor(Math.random() * 3 + 1)
            let computer = computerChoice === 1 ? "rock" : computerChoice === 2 ? "paper" : "scissors";
            let result = 
                player === computer ? "Game tie!!" :
                player === "rock" && computer === "paper" ? `Player: ${player}\nComputer: ${computer}\nComputer wins!!`:
                player === "paper" && computer === "scissors" ? `Player: ${player}\nComputer: ${computer}\nComputer wins!!`:
                player === "scissors" && computer === "rock" ? `Player: ${player}\nComputer: ${computer}\nComputer wins!!`:
                `Player: ${player}\nComputer: ${computer}\nYou wins!!`;
            alert(result)
            let playAgain = confirm("Let's play again!!")
            playAgain ? location.reload() : alert("Ok.., Thanks for playing!!")
        }else{
            alert("You didn't enter rock, paper or scissors correctly!!")
        }
    }else{
        alert("You didn't enter any thing!!")
    }
}else{
    alert("Khelo chahe bhad me jao !!!")
}