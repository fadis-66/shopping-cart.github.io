const cardnumber = document.getElementById("cardNumber");
const typeimg = document.getElementById("typeimg");
const payBtn = document.getElementById("submitBtn");
let cardCvv = document.getElementById("cardCvv");
let cardExpiry = document.getElementById("ExpiryDate");
const cardHolder = document.getElementById("cardHolder");
let cardNum = 0;
let cardNumValid = false;
let cardCvvValid = false;
let cardExpireValid = false;
let cardNameValid = false;

payBtn.style.visibility = "hidden";
if (!sessionStorage.getItem("shopping-cart")) {
	window.location.href = "login.html";
}

cardnumber.addEventListener("keyup", (e) => {
	cardnumber.classList.remove("success");

	const valuesOfInput = e.target.value.replaceAll(" ", "");
	cardNum = valuesOfInput;
	if (e.target.value.length > 14) {
		e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
		cardnumber.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
	} else if (e.target.value.length > 9) {
		e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
		cardnumber.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
	} else if (e.target.value.length > 4) {
		e.target.value = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
		cardnumber.innerHTML = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
	} else {
		cardnumber.innerHTML = valuesOfInput;
	}
	const cardtype = GetCardType(valuesOfInput);
	updateCardType(cardtype);

	if (valuesOfInput.toString().length === 16 && cardnumber.classList.contains("success")) {
		cardnumber.classList.remove("warning");
		cardNumValid = true;
	} else {
		cardnumber.classList.remove("success");
		cardnumber.classList.add("warning");
		cardNumValid = false;
	}

	validatePayBtn();
});
function getWordCount(str) {
	return str.split(" ").filter(function (n) {
		return n != "";
	}).length;
}

cardHolder.addEventListener("input", (e) => {
	if (!e.target.value) {
		cardHolder.innerHTML = "John Doe";
		cardHolder.classList.add("warning");
	} else if (getWordCount(cardHolder.value) >= 2) {
		cardHolder.value = e.target.value.toUpperCase();
		cardHolder.classList.remove("warning");
		cardHolder.classList.add("success");
		cardNameValid = true;
	} else {
		cardHolder.classList.remove("success");
		cardHolder.classList.add("warning");
		cardNameValid = false;
	}
	validatePayBtn();
});
cardExpiry.addEventListener("input", (e) => {
	if (!cardExpiry.value) {
		cardExpiry.classList.remove("warning");
		cardExpiry.classList.remove("success");
		cardExpireValid = false;
	} else {
		const valuesOfInput = e.target.value.replace("/", "");
		console.log(valuesOfInput);
		if (e.target.value.length > 2) {
			e.target.value = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
			cardExpiry.innerHTML = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
		} else {
			cardExpiry.innerHTML = valuesOfInput;
		}

		const today = new Date();
		let todayYear = today.getFullYear();
		let todayMonth = today.getMonth() + 1;
		let cardYear = 0;
		let cardMonth = 0;
		todayYear = todayYear % 100;
		if (valuesOfInput.length == 3) {
			cardYear = valuesOfInput % 10;
			cardMonth = (valuesOfInput - (valuesOfInput % 10)) / 10;
		}
		if (valuesOfInput.length == 4) {
			cardYear = valuesOfInput % 100;
			cardMonth = (valuesOfInput - (valuesOfInput % 100)) / 100;
		}
		if (!cardExpiry.value) {
			cardExpiry.classList.remove("success");
			cardExpiry.classList.remove("warning");
			cardExpireValid = false;
		} else if ((cardYear > todayYear && cardMonth <= 12) || (cardYear == todayYear && todayMonth <= cardMonth && cardMonth <= 12)) {
			cardExpiry.classList.remove("warning");
			cardExpiry.classList.add("success");
			cardExpireValid = true;
		} else {
			cardExpiry.classList.remove("success");
			cardExpiry.classList.add("warning");
			cardExpireValid = false;
		}
	}
	validatePayBtn();
});
cardCvv.addEventListener("input", (e) => {
	cardCvv.classList.remove("success");
	cardCvv.classList.remove("warning");

	if (cardCvv.value.length === 3) {
		cardCvv.classList.remove("warning");
		cardCvv.classList.add("success");
		cardCvvValid = true;
	} else if (!cardCvv.value) {
		cardCvv.innerHTML = "xxx";
		cardCvv.classList.remove("success");
		cardCvv.classList.remove("warning");
		cardCvvValid = false;
	} else if (cardCvv.value.length < 3) {
		cardCvv.classList.add("warning");
		cardCvvValid = false;
	}
	validatePayBtn();
});

function updateCardType(text) {
	switch (text) {
		case "VISA":
			typeimg.setAttribute("src", "/img/visa.svg");
			cardnumber.classList.add("success");

			break;
		case "MASTERCARD":
			typeimg.setAttribute("src", "img/master.svg");
			cardnumber.classList.add("success");

			break;
		case "AMEX":
			typeimg.setAttribute("src", "img/amex.svg");
			cardnumber.classList.add("success");

			break;
		case "DINERS":
			typeimg.setAttribute("src", "img/diners.svg");
			cardnumber.classList.add("success");

			break;
		case "JCB":
			typeimg.setAttribute("src", "img/jcb.svg");
			cardnumber.classList.add("success");

			break;
		case "DISCOVER":
			typeimg.setAttribute("src", "img/discover.svg");
			cardnumber.classList.add("success");

			break;
		default:
			typeimg.setAttribute("src", "img/chip.svg");
			cardnumber.classList.add("success");

			break;
	}
}

function GetCardType(number) {
	// visa

	var re = new RegExp("^4");
	if (number.match(re) != null) return "VISA";

	// Mastercard
	// Updated for Mastercard 2017 BINs expansion
	if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) return "MASTERCARD";

	// AMEX
	re = new RegExp("^3[47]");
	if (number.match(re) != null) return "AMEX";

	// Discover
	re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
	if (number.match(re) != null) return "DISCOVER";

	// Diners
	re = new RegExp("^36");
	if (number.match(re) != null) return "DINERS";

	// Diners - Carte Blanche
	re = new RegExp("^30[0-5]");
	if (number.match(re) != null) return "DINERS";

	// JCB
	re = new RegExp("^35(2[89]|[3-8][0-9])");
	if (number.match(re) != null) return "JCB";

	// Visa Electron
	re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
	if (number.match(re) != null) return "VISA";

	return "";
}

function validatePayBtn() {
	if (cardCvvValid && cardNameValid && cardNumValid && cardExpireValid) {
		payBtn.style.visibility = "visible";
	} else {
		payBtn.style.visibility = "hidden";
	}
}

//console.log(sessionStorage.getItem("shopping-cart"));
function LoadCartItems() {
	const cartItems = sessionStorage.getItem("shopping-cart");
	let items = JSON.parse(cartItems);
	return items;
}

function LoadItemsCheckOut(items) {
	document.getElementById("itemsList").innerHTML = ``;
	document.getElementById("priceTotal").innerText = ``;

	let discountAmount = sessionStorage.getItem("discount");
	console.log(items.length);
	let sum = 0;
	let content = "";
	items.forEach((item) => {
		content = `
<li>
	<div class="description">
		${item.name}
		<span>  Quantity : <span style="color:red;font-weight:600">${item.quantity}</span> -- Price : <span style="color:red;font-weight:600">${item.price}
		</span></span>
	</div>
	<div class="price"> Total : <span style="color:red;font-weight:600">${item.price * item.quantity}</span> </div>
</li>;`;
		sum += item.price * item.quantity;
		document.getElementById("itemsList").innerHTML += content;
	});
	document.getElementById("itemsList").innerHTML += `<li>
					<div class="description">Dicounts & Offers</div>
					<div class="price"><span style="color:red;font-weight:600">${discountAmount}</span></div>
				</li>
				<hr />
				<li>
					<div class="description">Tax</div>
					<div class="price">0.00</div>
				</li>
				<li>
					<div class="description">Total</div>
					<div  id="Pricefinal" class="price"><span style="color:red;font-weight:700;font-size:18px">${sum - discountAmount}</span></div>
				</li>`;
	document.getElementById("priceTotal").innerText = sum - discountAmount;
}

let items = LoadCartItems();
console.log(items);
LoadItemsCheckOut(items);

payBtn.addEventListener("click", (event) => {
	event.preventDefault();
	console.log("hello wrold pay");
	alert("Payment Successful");
});
