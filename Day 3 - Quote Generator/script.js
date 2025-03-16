let quotes = [];

// Fetch quotes from JSON file
fetch("quotes.json")
    .then(response => response.json())
    .then(data => {
        quotes = data;
        generateQuote(); // Display a quote when the page loads
    })
    .catch(error => console.error("Error loading quotes:", error));

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    document.getElementById("quote").innerText = `"${quote.quote}"`;
    document.getElementById("author").innerText = `- ${quote.author}`;
}
