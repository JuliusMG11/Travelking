export async function fetchAvailability() {
    const url = "https://api.travelcircus.net/hotels/17080/checkins?E&party=%7B%22adults%22:2,%22children%22:%5B%5D%7D&domain=de&date_start=2025-01-01&date_end=2025-06-31";
    const response = await fetch(url);
    const data = await response.json();
    return data._embedded.hotel_availabilities;
  }
  
  export async function fetchRooms(selectedDateRange) {
    const [checkin, checkout] = selectedDateRange;
    const url = `https://api.travelcircus.net/hotels/17080/quotes?locale=de_DE&checkin=${checkin}&checkout=${checkout}&party=%7B%22adults%22:2,%22children%22:%5B%5D%7D&domain=de`;
    const response = await fetch(url);
    const data = await response.json();
    return data._embedded.hotel_quotes;
  }
  