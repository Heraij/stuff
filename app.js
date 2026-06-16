const uploadBtn = document.getElementById('uploadBtn');
const itemTitle = document.getElementById('itemTitle');
const itemFile = document.getElementById('itemFile');
const hubBoard = document.getElementById('hubBoard');

// Array to hold all our uploaded items
let hubItems = JSON.parse(localStorage.getItem('hubItems')) || [];

// Function to render all items on the screen
function displayItems() {
    hubBoard.innerHTML = ''; // Clear board first
    
    hubItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'hub-card';
        
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h4>${item.title}</h4>
        `;
        
        hubBoard.appendChild(card);
    });
}

// Handle the Upload button click
uploadBtn.addEventListener('click', () => {
    const titleText = itemTitle.value.trim();
    const file = itemFile.files[0];

    if (!titleText || !file) {
        alert("Please provide both a title and an image file!");
        return;
    }

    // Use FileReader to convert the image file into a text string we can store
    const reader = new FileReader();
    reader.onload = function(event) {
        const newItem = {
            title: titleText,
            image: event.target.result // The raw image data string
        };

        // Add to array, update LocalStorage, and refresh screen
        hubItems.push(newItem);
        localStorage.setItem('hubItems', JSON.stringify(hubItems));
        displayItems();

        // Clear inputs
        itemTitle.value = '';
        itemFile.value = '';
    };

    reader.readAsDataURL(file); // Trigger the file reader
});

// Load existing items when the page opens
displayItems();
