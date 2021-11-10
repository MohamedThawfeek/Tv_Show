const container = document.querySelector(".epiContainer_");

function Change() {
  let loading = document.querySelector("#loading");
  loading.style.display = "";

  const showName = document.querySelector(".showName");
  showName.innerHTML = showName_;

  const container = document.getElementById("show");
  container.className = "container_ epiContainer_";

  [
    document.querySelector(".epiContainer_"),
    document.querySelector("#selector"),
  ].forEach((item) => {
    while (item.hasChildNodes()) {
      item.removeChild(item.firstChild);
    }
  });
  showMovies();
}

async function showMovies() {
  const removeSelector = document.querySelector("#shows");
  removeSelector.style.display = "none";

  const navBtn = document.querySelector(".navBtn");
  navBtn.style.display = "";

  const selector = document.querySelector("#selector");
  selector.style.display = "";

  const showName = document.querySelector(".showName");
  showName.style.display = "";

  const searchInput = document.querySelector("#search-txt");
  searchInput.addEventListener("keyup", searchFun_1);

  let responce = await fetch(EpisodeURL);
  let allEpisodes = await responce.json();

  window.onload = Episode();

  function Episode() {
    const container = document.querySelector(".container_");

    allEpisodes.forEach((item) => {
      let Selector = document.getElementById("selector");
      let options = document.createElement("option");
      options.innerHTML =
        item.name +
        "" +
        "S" +
        ("0" + item.season).slice(-2) +
        "E" +
        ("0" + item.number).slice(-2);
      options.value = `#${item.id}`;
      Selector.append(options);

      const div = document.createElement("div");
      div.className = "div";
      div.id = item.id;
      container.appendChild(div);

      const column = document.createElement("div");
      column.className = "column";
      column.id = item.id;
      div.appendChild(column);

      const title = document.createElement("strong");
      title.style.display = "block";
      title.className = "title";
      title.innerHTML =
        item.name +
        " " +
        "S" +
        ("0" + item.season).slice(-2) +
        "E" +
        ("0" + item.number).slice(-2);
      column.appendChild(title);

      const image = document.createElement("img");
      image.className = "image1 img-fluid";
      image.src = item.image.original;
      image.alt = item.name;
      column.appendChild(image);

      const para = document.createElement("p");
      para.className = "story";
      para.innerHTML = item.summary;
      column.appendChild(para);

      const br = document.createElement("br");
      column.appendChild(br);

      const button = document.createElement("a");
      button.className = "btn btn-danger button";
      button.type = "submit";
      button.innerHTML = "Click Me ";
      button.target = "__blank";
      button.href = item.url;
      column.appendChild(button);
    });
  }
}
