let bill = document.getElementById("billAmount");
let range = document.getElementById("tipRange");
let calculate = document.getElementById("btnCalculate");
let tipOut = document.getElementById("percentOut");
let result = document.getElementById("result");


range.ondrag = function () {
    tipOut.innerHTML = range.value + "%";
}

calculate.onclick = function () {
    let theBill = parseFloat(bill.value);
    let tip = (theBill * (range.value / 100)).toFixed(2);
    let total = (theBill + parseFloat(tip)).toFixed(2);
    let out = `<strong>Tip Amount: </strong> $${tip} <br/> <strong> Total Bill Amount: </strong>$${total}`;
    result.innerHTML = out;
}