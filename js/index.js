import {
  addItemToPage,
  clearInputs,
  getInputValues,
  renderItemsList,
} from "./dom_util.js";


const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const calculateButton = document.getElementById("calculate_button");
const summaryRooms = document.getElementById("summary_rooms");
const sortHotels = document.getElementById("sort_button");


let hotels = [];
let displayedHotels = [];
let hotelToEdit = null;

const saveDataToLocalStorage = () => {
  localStorage.setItem("hotels", JSON.stringify(hotels));
  localStorage.setItem("displayedHotels", JSON.stringify(displayedHotels));
};

const loadDataFromLocalStorage = () => {
  const storedHotels = JSON.parse(localStorage.getItem("hotels"));
  const storedDisplayedHotels = JSON.parse(
    localStorage.getItem("displayedHotels")
  );

  if (storedHotels) {
    hotels = storedHotels;
  }

  if (storedDisplayedHotels) {
    displayedHotels = storedDisplayedHotels;
  }
};

loadDataFromLocalStorage();

const addItem = ({ name, location, rooms, rating }) => {
  const generatedId = uuid.v1();

  const newItem = {
    id: generatedId,
    name,
    location,
    rooms,
    rating,
  };

  hotels.push(newItem);
  if (displayedHotels.length === 0 || findInput.value === "") {
    displayedHotels.push(newItem);
  }
  addItemToPage(newItem);

  saveDataToLocalStorage();
};

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const { name, location, rooms, rating } = getInputValues();
  if (name.trim() === "") {
    alert("Назва готелю є обов'язковою!");
    return;
  }

  if (location.trim() === "") {
    alert("Локація є обов'язковою!");
    return;
  }

  if (rooms < 0) {
    alert("Кількість кімнат не може бути від'ємною!");
    return;
  }

  if (rating < 1 || rating > 5) {
    alert("Рейтинг повинен бути від 1 до 5!");
    return;
  }

  clearInputs();

  addItem({
    name,
    location,
    rooms,
    rating,
  });
});

findButton.addEventListener("click", () => {
  const searchTerm = findInput.value.toLowerCase();

  displayedHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm)
  );

  renderItemsList(displayedHotels);
});

cancelFindButton.addEventListener("click", () => {
  displayedHotels = [...hotels];

  renderItemsList(displayedHotels);

  findInput.value = "";
});

calculateButton.addEventListener("click", () => {
  const totalRooms = displayedHotels.reduce(
    (total, hotel) => Number(total) + Number(hotel.rooms),
    0
  );
  summaryRooms.textContent = `Summary rooms: ${totalRooms} in Hotel`;
});

sortHotels.addEventListener("click", () => {
  hotels.sort((second, first) => {
    return second.rating - first.rating;
  });

  renderItemsList(hotels);
});
renderItemsList(hotels);



function handleEditClick(id) {
  const hotel = hotels.find((h) => h.id === id);

  if (hotel) {
    const editNameInput = document.getElementById("edit_name_input");
    const editLocationInput = document.getElementById("edit_location_input");
    const editRoomsInput = document.getElementById("edit_rooms_input");
    const editRatingInput = document.getElementById("edit_rating_input");


    editNameInput.value = hotel.name;
    editLocationInput.value = hotel.location;
    editRoomsInput.value = hotel.rooms;
    editRatingInput.value = hotel.rating;

    hotelToEdit = hotel;

    const editForm = document.getElementById("edit_form");
    editForm.style.display = "block";


  }
}


function handleSaveEditClick() {
  if (hotelToEdit) {
    const editedName = document.getElementById("edit_name_input").value;
    const editedLocation = document.getElementById("edit_location_input").value;
    const editedRooms = document.getElementById("edit_rooms_input").value;
    const editedRating = document.getElementById("edit_rating_input").value;

    if (editedName.trim() === "") {
      alert("Назва готелю є обов'язковою!");
      return;
    }

    if (editedLocation.trim() === "") {
      alert("Локація є обов'язковою!");
      return;
    }
  
    if (editedRooms.trim() === "") {
      alert("Кількість кімнат є обов'язковою!");
      return;
    }

    if (parseInt(editedRooms) < 0) { 
      alert("Кількість кімнат не може бути від'ємною!"); 
      return; 
    }

    if (editedRating < 1 || editedRating > 5) {
      alert("Рейтинг повинен бути від 1 до 5!");
      return;
    }
    hotelToEdit.name = editedName;
    hotelToEdit.location = editedLocation;
    hotelToEdit.rooms = editedRooms;
    hotelToEdit.rating = editedRating;

    renderItemsList(hotels);

    const editForm = document.getElementById("edit_form");
    editForm.style.display = "none";

    hotelToEdit = null;

    saveDataToLocalStorage();
    
    document.getElementById("edit_name_input").value = "";
    document.getElementById("edit_location_input").value = "";
    document.getElementById("edit_rooms_input").value = "";
    document.getElementById("edit_rating_input").value = "";

    addEventListenersForEditButtons();

  }
}

function addEventListenersForEditButtons() {
  const editButtons = document.querySelectorAll(".edit-button");
  const saveEditButton = document.getElementById("edit_submit_button");
  const cancelEditButton = document.getElementById("cancel_edit_button");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const hotelId = button.getAttribute("data-id");
      handleEditClick(hotelId);
    });
  });


  saveEditButton.addEventListener("click", () => {
    handleSaveEditClick();
  });

  cancelEditButton.addEventListener("click", () => {
    const editForm = document.getElementById("edit_form");
    editForm.style.display = "none";
    hotelToEdit = null;
  });
}

addEventListenersForEditButtons();