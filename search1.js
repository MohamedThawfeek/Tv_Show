function searchFun_1() {
  let num = 0;

  var searchInput = document.querySelector("#search-txt");
  let filter = searchInput.value.toLowerCase();
  let movieCard = document.getElementsByClassName("div");

  let movieTitle = document.querySelectorAll("strong");

  for (let i = 0; i < movieCard.length; i++) {
    let titlevalue = movieTitle[i].innerText;

    if (titlevalue.toLowerCase().indexOf(filter) > -1) {
      // console.log(filter.titlevalue);

      movieCard[i].style.display = "";
    } else {
      movieCard[i].style.display = "none";
    }

    if (isHidden(movieCard[i]) === false) {
      num = num + 1;
      let displayElements = document.querySelector(".display");
      num < 2
        ? (displayElements.innerHTML = `Found ${num}Show`)
        : (displayElements.innerHTML = `Found ${num}Shows`);
    }
  }
}
