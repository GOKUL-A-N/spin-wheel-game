/* 1.deposit some money
  2.Determine the number of lines the user wants to bet
  3.collect the bet amount
  4.spin the solt machine
  5.check if the user won
  6.give the user their winnings
  7.play again
*/
const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS =3;

const SYMBOLS_COUNT = {
  A : 2,
  B : 4,
  C : 6,
  D : 8
}
const SYMBOL_VALUES = {
  "A" : 5,
  "B" : 4,
  "C" :3,
  "D" :2
}





const deposit = () =>{
 while(true){
  const depositAmount = prompt("Enter the Amount to be deposited: ");
  const numberDepositAmount=parseFloat(depositAmount);

  if(isNaN(numberDepositAmount) || numberDepositAmount <=0){
    console.log("Invalid deposit amount , Try Again")
  }else{
    return numberDepositAmount;
  }
 }
}

// console.log(depositAmount);

const numberOfLinesOfBet = () => {
  while(true){
    const numberOfLines = prompt("Enter the  number of lines (1-3) : ");
    const noOfLines=parseFloat(numberOfLines);
  
    if(isNaN( noOfLines) || noOfLines <=0 || noOfLines > 3){
      console.log("Invalid  lines of bet  , Try Again")
    }else{
      return noOfLines;
    }
   }
}

const getBetAmount = (balance,line) => {
  while(true){
    const betAmt = prompt("Enter the  bet amount per line: ");
    const betAmount=parseFloat(betAmt);
  
    if(isNaN( betAmount) || betAmount <=0 || betAmount > ( balance / line)){
      console.log("Invalid  bet amount  , Try Again")
    }else{
      return betAmount;
    }
   }
}

const spin = () => {
  const symbols =[];
  for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
      for(let i=0;i<count;i++){
        symbols.push(symbol);
      }
  }
const reels =[];
for(let i=0;i<COLS;i++){
  reels.push([]);
  const reelSymbol = [...symbols]
  for(j=0;j<ROWS;j++){
    const randomIndex=Math.floor(Math.random() * reelSymbol.length );
    const selectedSymbol = reelSymbol[randomIndex];
    reels[i].push(selectedSymbol);
    reelSymbol.splice(randomIndex,1)
  }
}

return reels;
}

const transpose = (reels) => {
  const rows=[];
  for(let i=0;i<ROWS;i++){
    rows.push([]);
    for(let j=0;j<COLS;j++){
      rows[i].push(reels[j][i])
    }
  }
  return rows;
}

const printRows = (rows) => {
  for(row of rows){
    let rowString= "";
    for(const [i,symbol] of row.entries()){
      rowString += symbol
      if(i !== row.length-1)
        rowString += " | ";
    }
    console.log(rowString)
  }
}
const getWinnings = (rows,bet,lines) => {
  let winnings =0;
  for(let row=0;row<lines;row++){
    const symbols=rows[row];
    let allSame=true;
    for(const symbol of symbols){
      if(symbol != symbols[0]){
        allSame=false;
        break;
      }
    }
    if(allSame){
      winnings += bet * SYMBOL_VALUES[symbols[0]]
    }
  }
  return winnings;
}

let balance=deposit();
const noOfLines=numberOfLinesOfBet();
let betAmount=getBetAmount(balance,noOfLines);
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings=getWinnings(rows,betAmount,noOfLines);
console.log("you won, $ "+ winnings)