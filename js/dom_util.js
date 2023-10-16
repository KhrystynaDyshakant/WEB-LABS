const nameInput = document.getElementById("name_input");
const locationInput = document.getElementById("location_input");
const roomsInput = document.getElementById("rooms_input");
const ratingInput = document.getElementById("rating_input");

const itemsContainer = document.getElementById("hotel_container");

const getItemId = (id) => `item-${id}`;



const itemTemplate = ({ id, name, location, rooms, rating }) => `
<li id="${id}" class="card mb-3 item-card" draggable="true">
  <img
    src="./images/pexels-martin-péchy-2844474.jpg"
    class="item-container__image card-img-top" alt="card">
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">Locates in ${location}</p>
    <p class="card-text">${rooms} rooms</p>
    <p class="card-text">${rating} rating</p>
    <button class="btn btn-primary edit-button" data-id="${id}">Edit</button>
  </div>
</li>`;

export const clearInputs = () => {
  nameInput.value = "";
  locationInput.value = "";
  roomsInput.value = "";
  ratingInput.value = "";
};


export const addItemToPage = ({ id, name, location, rooms, rating }) => {
  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, name, location, rooms, rating })
  );

  const element = document.getElementById(id);
};

export const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item);
  }
}

export const getInputValues = () => {
  return {
    name: nameInput.value,
    location: locationInput.value,
    rooms: roomsInput.value,
    rating: ratingInput.value,
  };
};