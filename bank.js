let balances = 100
function credit(amount){
    balances= balances+amount
    console.log(balances+" "+"Credited Successfully")
}
function debit(amount){
    balances-=amount 
    console.log(balances+" "+"Debited Successfully")
}
function balance(){
    console.log("Balance:",balances)
}
credit(100)
debit(20)
balance()