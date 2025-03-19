const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";
let currencyRates = {};

async function loadCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        currencyRates = data.rates;
        
        const fromCurrency = document.getElementById("fromCurrency");
        const toCurrency = document.getElementById("toCurrency");

        Object.keys(currencyRates).forEach(currency => {
            let option1 = new Option(currency, currency);
            let option2 = new Option(currency, currency);
            fromCurrency.add(option1);
            toCurrency.add(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "INR"; // Default to Indian Rupee
    } catch (error) {
        console.error("Error fetching currency rates:", error);
    }
}

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultElement = document.getElementById("result");

    if (amount === "" || amount <= 0) {
        resultElement.textContent = "Please enter a valid amount.";
        return;
    }

    const convertedAmount = (amount * currencyRates[toCurrency] / currencyRates[fromCurrency]).toFixed(2);
    resultElement.textContent = `Converted Amount: ${convertedAmount} ${toCurrency}`;
}

loadCurrencies();
