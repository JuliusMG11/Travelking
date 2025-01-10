import flatpickr from "flatpickr";

export function initializeCalendar(calendarElement, fetchAvailability, onDateRangeChange) {
  let selectedDateRange = null;

  fetchAvailability().then((availability) => {
    const datesWithInfo = availability.map(({ date, price, price_position }) => ({
      date,
      info: `€${price}`,
      color:
        price_position === "low" ? "#d1fae5" :
        price_position === "medium" ? "#fbd7b9" :
        "#fbd7b9",
    }));


    flatpickr(calendarElement, {
      mode: "range",
      inline: true,
      enable: datesWithInfo.map((d) => d.date),
      onDayCreate: function (dObj, dStr, fp, dayElem) {
        const dateInfo = datesWithInfo.find((d) => d.date === dayElem.dateObj.toISOString().split("T")[0]);
        if (dateInfo) {
          dayElem.style.backgroundColor = dateInfo.color;
          dayElem.style.display = "flex";
          dayElem.style.flexDirection = "column";
          dayElem.style.alignItems = "center";
          dayElem.style.lineHeight = "12px";
          const priceLabel = document.createElement("p");
          priceLabel.innerHTML = `${dateInfo.info}`;
          priceLabel.style.fontSize = "0.6rem";
          priceLabel.style.display = "block";
          dayElem.appendChild(priceLabel);
        }
      },
      onChange: function (selectedDates) {
        selectedDateRange = selectedDates.map((d) => d.toISOString().split("T")[0]);
        onDateRangeChange(selectedDateRange);
      },
    });
  });
}