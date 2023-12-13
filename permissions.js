const permissionsSet = new Set(["ADD_TO_CART", "REMOVE_FROM_CART", "EMPTY_CART", "DISCOUNT_15"]);

const loggedInUserEmail = sessionStorage.getItem("loggedInUserEmail");
const usersFromSession = JSON.parse(sessionStorage.getItem("users"));
const loggedInUser = usersFromSession.find((user) => user[0] === loggedInUserEmail)[1];

const userPermissions = new Set(loggedInUser.permissions);

if (!userPermissions.has("ADD_TO_CART")) {
	document.querySelectorAll(".add-to-cart").forEach((elem) => elem.remove());
}

if (!userPermissions.has("REMOVE_FROM_CART")) {
	document.querySelectorAll(".remove-from-cart").forEach((elem) => elem.remove());
}

if (!userPermissions.has("ADD_TO_CART") && !userPermissions.has("REMOVE_FROM_CART")) {
	document.querySelectorAll(".cart-action").forEach((elem) => elem.remove());
}

if (!userPermissions.has("EMPTY_CART")) {
	document.getElementById("btnEmpty").remove();
}

updateUserDiscount();

function updateUserDiscount() {
	if (userPermissions.has("DISCOUNT_15")) {
		const totalAmount = document.getElementById("totalAmount");
		const tbody = document.getElementById("cartTableBody");
		tbody.innerHTML += `
            <tr>
                <td colspan="3">Discount 15%</td>
                <td class="text-right">-$${Number(totalAmount.innerText.slice(1)) * 0.15}</td>
            </tr>
        `;
		sessionStorage.setItem("discount", Number(totalAmount.innerText.slice(1)) * 0.15);
		totalAmount.innerText = `$${Number(totalAmount.innerText.slice(1)) * 0.85}`;
	}
}
