import "../assets/style.css";

import { initializeCalendar } from "./calendar";
import { fetchAvailability, fetchRooms } from "./availability";


document.addEventListener("DOMContentLoaded", () => {
  const calendarPopup = document.getElementById("calendarPopup");
  const calendarElement = document.getElementById("calendar");
  const openCalendarButton = document.getElementById("openCalendar");
  const submitDatesButton = document.getElementById("submitDates");
  const closePopupButton = document.getElementById("closePopup");
  const roomsContainer = document.getElementById("roomsContainer");
  const roomsList = document.getElementById("roomsList");

  let selectedDateRange = null;

  openCalendarButton.addEventListener("click", async () => {
    calendarPopup.classList.remove("hidden");
    const calendar = initializeCalendar(calendarElement, fetchAvailability, (dateRange) => {
      selectedDateRange = dateRange;
    });
  });

  closePopupButton.addEventListener("click", () => {
    calendarPopup.classList.add("hidden");
  });

  submitDatesButton.addEventListener("click", async () => {
    if (!selectedDateRange || selectedDateRange.length < 2) {
      alert("Please select a valid date range.");
      return;
    }

    try {
      const rooms = await fetchRooms(selectedDateRange);
      displayRooms(rooms);
      calendarPopup.classList.add("hidden");
    } catch (error) {
      console.error("Error fetching room data:", error);
      alert("Failed to fetch room data. Please try again.");
    }

  roomsContainer.scrollIntoView({ behavior: 'smooth' });
  });

  function displayRooms(rooms) {
    roomsContainer.classList.remove("hidden");
    roomsList.innerHTML = "";
    rooms.forEach((room) => {
      console.log(room)
      const roomElement = document.createElement("div");
      roomElement.className = "bg-white rounded-lg p-4 shadow room-box";
      roomElement.innerHTML = `
        <div class="room-box__container">
         <div class="room-box__container--top">
            <div class="room-box__image">
              <img src="${room._embedded.pictures[0].deal}" alt="${room.name}" class="object-cover">
            </div>
            <div class="room-box__details">
              <div class="room-box__details--left">
                  <h3 class="text-lg font-bold">${room.name}</h3>
                  <p class="room-box__capacity">Capacity: ${room.max_capacity}</p>
                  <p class="room-box__size">Room size: ${room.room_size_max}m<sup>2</sup></p>
              </div>
              <div class="room-box__details--right">
               <p class="room-box__price">${room.full_formatted_price}</p>
              </div>
            </div>
         </div>
          <div class="room-box__amenities">
            ${room._embedded.amenities.map(amenity => `<p class="room-box__amenity">${amenity.name}</p>`).join('')}
          </div>
        </div>
      `;
      roomsList.appendChild(roomElement);
    });
  }
});
