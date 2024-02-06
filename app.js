const accessKey = "MWVschT0Rn6b7ntLW10v8UBZKwGvRvPbwTq9p_WAjFA";

const form1 = document.querySelector("form");
const searchInput = document.getElementById("searchInput");
const searchResult = document.querySelector(".container");
const showMore = document.getElementById("showMore");

var page = 1;
async function SearchImage() {
  var InputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${InputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResult.innerHTML = "";
  }
  const results = data.results;
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("card");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.innerHTML;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    searchResult.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

form1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  SearchImage();
});

showMore.addEventListener("click", () => {
  SearchImage();
});
