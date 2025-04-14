const base_url =
	"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

updateExchangeRate = async () => {
	let amount = document.querySelector(".amount input");
	let amtVal = amount.value;
	if (amtVal === "" || amtVal < 1) {
		amtVal = 1;
		amount.value = "1";
	}

	//console.log(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());

	const URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`;

	let response = await fetch(URL);
	let data = await response.json();
	let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

	let finalAmount = amtVal * rate;

	msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${
		toCurr.value
	}`;
};

for (let select of dropdowns) {
	for (currCode in countryList) {
		let newOption = document.createElement("option");
		newOption.innerText = currCode;
		newOption.value = currCode;

		if (select.name === "From" && currCode === "EUR") {
			newOption.selected = "selected";
		} else if (select.name === "To" && currCode === "BDT") {
			newOption.selected = "selected";
		}

		select.append(newOption);
	}

	select.addEventListener("change", (evt) => {
		updateFlag(evt.target);
	});
}

const updateFlag = (element) => {
	let currCode = element.value;
	let countryCode = countryList[currCode];
	let newSrc = `https://flagsapi.com/${countryCode}/flat/24.png`;
	let img = element.parentElement.querySelector("img");
	img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
	evt.preventDefault();
	updateExchangeRate();
});

window.addEventListener("load", () => {
	updateExchangeRate();
});
