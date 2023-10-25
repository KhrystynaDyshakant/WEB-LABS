const main = document.getElementById('main');
const sortBtn = document.getElementById('sort');
const searchInput = document.getElementById('search');
let hotelsData = [];  

function updateDOM() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredHotels = hotelsData.filter(item => item.name.toLowerCase().includes(searchTerm));

  main.innerHTML = '<h2>Hotel List</h2>';

  filteredHotels.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('hotel');
    element.innerHTML = `
      <strong>${item.name}</strong> - Location: ${item.location}, Rooms: ${item.rooms}, Rating: ${item.rating}
      <button class="edit-button" onclick="redirectToEditPage(${item.id})">Edit</button>
      <button class="remove-button" onclick="removeHotel(${item.id})">Remove</button>
    `;
    main.appendChild(element);
  });
}

function redirectToEditPage(hotelId) {
  window.location.href = `edit_hotel.html?id=${hotelId}`;
}

function redirectToAddPage() {
  window.location.href = `add_hotel.html`;
}

function loadHotels() {
  fetch('http://localhost:5000/hotels')
    .then(response => response.json())
    .then(data => {
      hotelsData = data.hotels; 
      updateDOM(); 
    })
    .catch(error => console.error('Error fetching hotels:', error));
}

function removeHotel(hotelId) {
  fetch(`http://localhost:5000/hotels/${hotelId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      hotelsData = hotelsData.filter(item => item.id !== hotelId);

      updateDOM();
    })
    .catch(error => console.error('Error deleting hotel:', error));
}

function init() {
  sortBtn.addEventListener('click', () => {
    hotelsData.sort((a, b) => a.name.localeCompare(b.name));
    updateDOM();
  });

  searchInput.addEventListener('input', updateDOM);

  loadHotels();
}
const calculateBtn = document.getElementById('calculate'); 
const totalRoomsHotel = document.getElementById('rooms'); 
 
calculateBtn.addEventListener('click', calculateTotalRooms); 
 
function calculateTotalRooms() { 
  const searchTerm = searchInput.value.toLowerCase(); 
  const filteredHotels = hotelsData.filter(item => item.name.toLowerCase().includes(searchTerm)); 
 
  fetch('http://localhost:5000/calculate-rooms', { 
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify(filteredHotels) // Використовуйте фільтрований список замість printersData 
  }) 
    .then(response => response.json()) 
    .then(data => { 
      totalRoomsHotel.textContent = `Total Rooms: ${data.totalRooms} `; 
    }) 
    .catch(error => console.error('Error calculating total rooms:', error)); 
}

function sortHotels(field) { 
  fetch('http://localhost:5000/sort-hotels', { 
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({ field }) 
  }) 
    .then(response => response.json()) 
    .then(data => { 
      hotelsData = data.hotels; 
      // Використовуйте localeCompare для сортування регістронезалежно 
      hotelsData.sort((a, b) => a[field].localeCompare(b[field], undefined, { sensitivity: 'base' })); 
      updateDOM(); // Оновіть DOM після сортування, щоб показати відсортовані дані 
    }) 
    .catch(error => console.error('Error sorting hotels:', error)); 
} 
 
 
function init() { 
  sortBtn.addEventListener('click', () => { 
    sortHotels('name'); 
  }); 
 
  searchInput.addEventListener('input', updateDOM); 
 
  loadHotels(); 
}

init();