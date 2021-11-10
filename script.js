let showName_ = "";
var EpisodeURL;

ShowsFun().then(() => {
  let loading = document.querySelector("#loading");
  loading.style.display = "none";

  const ShowCard = document.querySelectorAll(".showCard");

  const displayElement = document.querySelector(".display");
  displayElement.innerText = `Found ${ShowCard.length} Shows`;
}, 100);

async function ShowsFun() {
  const navBtn = document.querySelector(".navBtn");
  navBtn.style.display = "none";

  const selector = document.querySelector("#selector");
  selector.style.display = "none";

  const showName = document.querySelector(".showName");
  showName.style.display = "none";

  const searchInput = document.querySelector("#search-txt");
  searchInput.addEventListener("keyup", searchFun);

  const URL = "https://api.tvmaze.com/shows";

  let responce = await fetch(URL);

  let AllShows = await responce.json();

  AllShows.sort((a, b) => {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  AllShows.forEach((item) => {
    const showSlector = document.querySelector("#shows");
    let showOption = document.createElement("option");
    showOption.innerHTML = `${item.name}`;
    showOption.className = "showOption";
    showOption.value = `#${item.id}`;
    showSlector.appendChild(showOption);

    const ShowContainer = document.querySelector("#show");
    ShowContainer.className = "container_2 ";

    const showCard = document.createElement("div");
    showCard.className = "showCard";
    showCard.id = item.id;
    ShowContainer.appendChild(showCard);

    const cardRight = document.createElement("div");
    cardRight.className = "cardRight";
    showCard.appendChild(cardRight);

    const image = document.createElement("img");
    image.className = "image";
    image.src = item.image.medium;
    image.alt = item.name;
    cardRight.appendChild(image);

    const inFo = document.createElement("div");
    inFo.className = "inFo";
    showCard.append(inFo);

    const showLink = document.createElement("a");
    showLink.href = "#";
    showLink.id = `${item._links.self.href}/episodes`;
    showLink.className = "link";

    showLink.addEventListener("click", () => {
      EpisodeURL = showLink.id;

      showName_ = item.name;
      Change();
    });

    inFo.appendChild(showLink);

    const Title = document.createElement("strong");
    Title.innerHTML = item.name;
    Title.className = "Title";

    showLink.appendChild(Title);

    const table = document.createElement("table");
    for (let i = 0; i < 4; i++) {
      const tr = document.createElement("tr");
      const td_1 = document.createElement("td");
      td_1.className = "info";
      //
      const td_2 = document.createElement("td");

      if (i === 0) {
        td_1.innerHTML = "Lang";
        td_2.innerHTML = item.language;
      }
      if (i === 1) {
        td_1.innerHTML = "Date";
        td_2.innerHTML = item.premiered;
      }
      if (i === 2) {
        td_1.innerHTML = "Time";
        td_2.innerHTML = item.runtime + " min";
      }
      if (i === 3) {
        td_1.innerHTML = "Status";
        td_2.innerHTML = item.status;
      }
      tr.append(td_1, td_2);
      table.append(tr);
    }
    inFo.appendChild(table);

    const cardLeft = document.createElement("div");
    cardLeft.className = "cardLeft";
    showCard.appendChild(cardLeft);

    const genres = document.createElement("div");
    genres.className = " genres";
    cardLeft.appendChild(genres);

    for (let i = 0; i < item.genres.length; i++) {
      const p = document.createElement("p");
      p.className = "btn btn-primary";
      p.innerHTML = item.genres[i];
      genres.appendChild(p);
    }

    const By = document.createElement("div");
    By.className = "info1";
    cardLeft.appendChild(By);

    const Channel = document.createElement("a");
    Channel.className = "channel";
    let network = item.network;
    let of_link = item.officialSite;
    if (network === null) {
      network = "--";
    } else {
      network = item.network.name;
    }
    if (of_link === null) {
      of_link = "#";
    } else {
      of_link = item.officialSite;
    }

    Channel.innerHTML = network;
    Channel.href = of_link;
    Channel.target = "_blank";
    By.appendChild(Channel);

    const para = document.createElement("div");
    para.className = "para";
    para.innerHTML = item.summary;
    cardLeft.appendChild(para);
  });
}
