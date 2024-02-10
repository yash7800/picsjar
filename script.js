document.addEventListener("DOMContentLoaded", function() {
  const accessKey = "pkIsFWqiq-N85aA3_Z-U1c5Fd8eDehkd36zNfDVnBHA";
  const formEl = document.querySelector("form");
  const inputSec = document.getElementById("search-input");
  const searchResults = document.querySelector(".search-results");
  const showMore = document.getElementById("show-more-button");

  let inputData = "";
  let page = 1;//by default this will be our page

  async function searchImages() {
    inputData = inputSec.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
      showMore.style.display = "block";
    }
  }

  formEl.addEventListener("submit", function(event) {
    event.preventDefault();
    page = 1;
    searchImages();
  });

  // Add event listener for show more button if it exists
  if (showMore) {
    showMore.addEventListener("click", function() {
      searchImages();
    });
  }
});
