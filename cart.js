var productItem = [
	new Product(1, "FinePix Pro2 3D Camera", "1800.00", "camera.jpg"),
	new Product(2, "EXP Portable HD", "800.00", "external-hard-drive.jpg"),
	new Product(3, "Luxury Ultra thin Wrist Watch", "500.00", "laptop.jpg"),
	new Product(4, "XP 1155 Intel Core Laptop", "1000.00", "watch.jpg"),
	new Product(5, "Dyson for hair styling", "600.00", "dyson.jpg"),
	new Product(6, "Apple watch series 7", "300.00", "applewatch.jpg"),
	new Product(7, "Violin ", "2500.00", "violin.jpg"),
	new Product(8, "Channel perfume 100ml", "200.00", "channel.jpg"),
	new Product(9, "Iphone 14 pro Max", "1300.00", "iphone.png"),
	new Product(10, "Playstation 5 + Fifa 24", "550.00", "ps5.jpg"),
	new Product(11, "Luxury Scooter", "1400.00", "scooter.jpg"),
	new Product(12, "Sony Smart Tv 65'' ", "1150.00", "tv.jpg"),
];

const checkOutBtn = document.getElementById("checkOutBtn");
checkOutBtn.style.visibility = "hidden";

showProductGallery(productItem);
showCartTable();

function Product(id, name, price, photo) {
	this.id = id;
	this.name = name;
	this.price = price;
	this.photo = photo;
}

function addToCart(element) {
	var productParent = element.closest("div.product-item");
	var id = productParent.querySelector(".productid").value;
	var price = productParent.querySelector(".price span").innerText;
	var name = productParent.querySelector(".productname").innerText;
	var quantity = productParent.querySelector(".product-quantity").value;

	var cartItem = {
		id: id,
		name: name,
		price: price,
		quantity: quantity,
	};

	var cartArray = new Array();
	// If javascript shopping cart session is not empty
	if (sessionStorage.getItem("shopping-cart")) {
		cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
		const itemIndex = cartArray.findIndex((item) => item.id === id);
		if (itemIndex !== -1) {
			cartArray[itemIndex].quantity = Number(cartArray[itemIndex].quantity) + Number(quantity);
		} else {
			cartArray.push(cartItem);
		}
	} else {
		cartArray.push(cartItem);
	}

	var cartJSON = JSON.stringify(cartArray);
	sessionStorage.setItem("shopping-cart", cartJSON);
	checkOutBtnLogic();
	showCartTable();
	updateUserDiscount();
	scrollToTop();
}

function removeFromCart(element) {
	var productParent = element.closest("div.product-item");
	var id = productParent.querySelector(".productid").value;
	var quantity = productParent.querySelector(".product-quantity").value;

	var cartArray = new Array();
	// If javascript shopping cart session is not empty
	if (sessionStorage.getItem("shopping-cart")) {
		cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
		const itemIndex = cartArray.findIndex((item) => item.id === id);
		if (itemIndex !== -1) {
			cartArray[itemIndex].quantity = Math.max(Number(cartArray[itemIndex].quantity) - Number(quantity), 0);
			if (!cartArray[itemIndex].quantity) {
				cartArray = cartArray.filter((value, index) => index !== itemIndex);
			}
		} else {
			alert("This item is not in your cart");
		}
	}

	var cartJSON = JSON.stringify(cartArray);
	console.log(cartJSON);
	sessionStorage.setItem("shopping-cart", cartJSON);

	checkOutBtnLogic();
	showCartTable();
	updateUserDiscount();
	scrollToTop();
}

function emptyCart() {
	if (sessionStorage.getItem("shopping-cart")) {
		sessionStorage.removeItem("shopping-cart");
		showCartTable();
	}
}

function showCartTable() {
	var cartRowHTML = "";
	var itemCount = 0;
	var grandTotal = 0;

	var price = 0;
	var quantity = 0;
	var subTotal = 0;

	if (sessionStorage.getItem("shopping-cart")) {
		var shoppingCart = JSON.parse(sessionStorage.getItem("shopping-cart"));

		//Iterate javascript shopping cart array
		shoppingCart.forEach(function (item) {
			price = parseFloat(item.price);
			quantity = parseInt(item.quantity);
			subTotal = price * quantity;
			itemCount += quantity;

			cartRowHTML +=
				"<tr>" +
				"<td>" +
				item.name +
				"</td>" +
				"<td class='text-right'>$" +
				price.toFixed(2) +
				"</td>" +
				"<td class='text-right'>" +
				quantity +
				"</td>" +
				"<td class='text-right'>$" +
				subTotal.toFixed(2) +
				"</td>" +
				"</tr>";

			grandTotal += subTotal;
		});
	}

	document.querySelector("#cartTableBody").innerHTML = cartRowHTML;
	document.querySelector("#itemCount").innerText = itemCount;
	document.querySelector("#totalAmount").innerText = "$" + grandTotal.toFixed(2);

	checkOutBtnLogic();
}

function showProductGallery(product) {
	//Iterate javascript shopping cart array
	var productHTML = "";
	product.forEach(function (item) {
		productHTML +=
			'<div class="product-item">' +
			'<input class="productid" type="hidden" value="' +
			item.id +
			'">' +
			'<img src="product-images/' +
			item.photo +
			' " style="width:255px;height:150px">' +
			'<div class="productname">' +
			item.name +
			"</div>" +
			'<div class="price">$<span>' +
			item.price +
			"</span></div>" +
			'<div class="cart-action">' +
			'<input type="number" class="product-quantity" name="quantity" value="1" size="2" min="1" />' +
			'<input type="submit" value="Add" class="add-to-cart" onClick="addToCart(this)" />' +
			'<input type="submit" value="Remove" class="remove-from-cart" onClick="removeFromCart(this)" />' +
			"</div>" +
			"</div>";
		("<tr>");
	});

	document.querySelector("#product-item-container").innerHTML = productHTML;
}

function checkOutBtnLogic() {
	let key = JSON.parse(sessionStorage.getItem("shopping-cart"));

	if (key.length > 0) {
		checkOutBtn.style.visibility = "visible";
	} else if (sessionStorage.getItem("shopping-cart") == "[]") {
		checkOutBtn.style.visibility = "hidden";
	}

	checkOutBtn.addEventListener("click", () => {
		if (!!sessionStorage.getItem("shopping-cart")) {
			window.location.href = "index1.html";
		}
	});
}
function scrollToTop() {
	window.scrollTo(0, 0);
}
