window.addEventListener("load", () => {
  let tempDegree = document.querySelector(".temp-degree");
  let description = document.querySelector(".description");
  let place = document.querySelector(".place");
  let button = document.querySelector("#button");
  let position = document.querySelector("#location-input");
  let tempIcon = document.querySelector(".temp-icon");

  position.focus();
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       long = position.coords.longitude;
  //       lat = position.coords.latitude;

  const handleErrors = function (response) {
    if (!response.ok) {
      place.textContent = "Please specify the locality";
    }
    return response.json();
  };

  const weather = function () {
    tempDegree.textContent = "?";
    description.textContent = "I don't know";
    tempIcon.setAttribute("src", "");

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${position.value}?unitGroup=metric&key=SLC68C7AGAAC6KD5W2U4V2MAB`;
    fetch(url)
      .then((response) => handleErrors(response))

      .then((data) => {
        console.log(data);
        const { temp, conditions, icon } = data.currentConditions;

        tempDegree.textContent = temp;
        description.textContent = conditions;
        place.textContent = data.resolvedAddress;
        position.value = "";
        position.focus();
        setIcon(icon);
      });
  };

  button.addEventListener("click", weather);

  function setIcon(icon) {
    let path = `Monochrome\\${icon}.png`;
    tempIcon.setAttribute("src", path);
  }
});
