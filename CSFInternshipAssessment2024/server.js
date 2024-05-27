async function fetchData(searchType, stockID, display) {
    try {
        console.log(`https://api.coincap.io/v2/${searchType}/${stockID}`);
        const url = `https://api.coincap.io/v2/${searchType}/${stockID}`;
        const response = await fetch(url);
        console.log('Fetching Responce: ', response);
        if (!response.ok) {
            throw new Error(`Could not fetch resource: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const dataValue = data.data;
        const stockInfoDiv = document.getElementById(display);
        html = ``;
            Object.entries(dataValue).forEach(([key, value]) => {
                html += `<h1>${key}: ${value}</h1>`;
                stockInfoDiv.innerHTML = html;
            });
    } catch (error) {
        console.error('Fetch error:', error);
    }
}