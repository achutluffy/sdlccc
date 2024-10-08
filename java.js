async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === "") {
        alert("Please enter an amount");
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        
        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        
        saveToHistory(amount, fromCurrency, toCurrency, convertedAmount);
    } catch (error) {
        document.getElementById('result').innerText = "Error fetching exchange rate!";
    }
}

function saveToHistory(amount, fromCurrency, toCurrency, result) {
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    history.push({ amount, fromCurrency, toCurrency, result });
    localStorage.setItem('conversionHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const historyDiv = document.getElementById('history');
    const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    historyDiv.innerHTML = history.map(item => `<p>${item.amount} ${item.fromCurrency} = ${item.result} ${item.toCurrency}</p>`).join('');
}

function clearHistory() {
    localStorage.removeItem('conversionHistory');
    renderHistory();
}

// Theme toggle logic
const toggleThemeBtn = document.getElementById('toggle-theme');
toggleThemeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleThemeBtn.textContent = 'Switch to Light Mode';
    } else {
        toggleThemeBtn.textContent = 'Switch to Dark Mode';
    }
});