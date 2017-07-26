/*
  Here is a rough idea for the steps you could take:
*/
console.log('hello world');
// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
let container = document.querySelector('.container')
let result = document.querySelector('.results');
let searchBar = document.querySelector('#searchBar');
let submitButton = document.querySelector('#submit');
let audio = document.querySelector('.musicPlayer')


submitButton.addEventListener("click", function(e){
  e.preventDefault();
  let html = "";
  fetch(`https://itunes.apple.com/search?term==${searchBar.value}`)
  .then(function(response) {
    if (response.status === 200){
    return response.json();
  }
    console.log(response);
  })

  .then (function(data){
    console.log(data);
    result.innerHTML = "";

    for (var i = 0; i < data.results.length; i++) {
      result.innerHTML +=
      `<div class="wrap">
        <img class="thumbnail" src=${data.results[i].artworkUrl100}/>
        <div style="display: none;" class="musicPreview">${data.results[i].previewUrl}</div>
        <h3 class="song">${data.results[i].trackName}</h3>
        <h2 class="artist">${data.results[i].artistName}<h2>
       </div>`
    }

  })

});

result.addEventListener("click", function(event){
  if (event.target && event.target.matches("div.wrap.img")) {
    let parent = event.target.parentElement;
    audio.src = parent.getElementsByClassName('musicPreview')[0].innerHTML;
    audio.play();
    let songDisplay = document.querySelector('#currentSong');
    let artist = parent.getElementsByClassName('artist')[0].innerHTML;
    let song = parent.getElementsByClassName('song')[0].innerHTML;

    songDisplay.innerHTML = `Now Playing: ${artist} - ${song}`;

  }
});
