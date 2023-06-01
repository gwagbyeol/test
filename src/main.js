//movieFetch 받기
const movieFetch = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDFjYmRhY2YzYWNlNGQ4YzUzYjFhNjI4NmFiOGRlOCIsInN1YiI6IjY0NzA4ZDYzYzVhZGE1MDBhODJkZjNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jEIfVpdiPByKAg5DAqWHrCBFHuh-_gc9pphbOuAsxec",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  const data = await response.json();
  return data.results;
};

//영화 리스트 카드 불러오기, div class 에 onclick으로 클릭할 수 있게함
const createList = async () => {
  const movieData = await movieFetch();
  const cardList = document.querySelector(".card-list");
  cardList.innerHTML = movieData.map( //map으로 cardList에 담기
    (movie) => `
        <div class="movie-card" id=${movie.id} onclick="select(${movie.id})">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <p>Rating: ${movie.vote_average}</p>
        </div>`
  ).join(""); //join("")을 사용해 카드리스트 사이의 공백 제거
};
createList();

//movie-card 클릭시 alert 창 생성
function select(id) {
  alert(`영화 id : ${id}`); // movie.id 를 넣지 못하고 id를 넣어야 되는 이유가 뭘까?
};

//영화 검색
const searchListener = (event) => {
  event.preventDefault(); // submit 새로고침 막는 역할
  const searchInput = document.getElementById("search-input"); // 입력창
  const movieCard = document.getElementsByClassName("movie-card"); // 검색할 정보
  const search = searchInput.value.toLowerCase(); // 대소문자 구분 없이 검색

  for (let i = 0; i <movieCard.length; i++){
    if(!movieCard[i].childNodes[3].textContent.toLowerCase().includes(search)){ //movieCard항목의 세번째가 movie.title 이라서 childNodes 사용
      movieCard[i].style.display = "none"; // 화면에서 보이지 않게 none
    } else{
      movieCard[i].style.display = ""; // 화면에서 보이게 block인데 다른 문자를 넣어도 잘 보임 기본값이 block이라 그런건가?
    }
  };
};
//페이지를 열었을때 focus 지정
search-input.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("input_btn").click();
  }
});