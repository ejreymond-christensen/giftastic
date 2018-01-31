//model
var topics= ["Moonbeam City", "Space Ghost", "Aqua Teen Hunger Force", "Ren and Stimpy", "Thunder Cats", "Cowboy Beebop", "Goldorak", "SilverHawk", "Sailor Moon", "Dino-Riders", "Speed Racer", "My Little Pony", "Carebears", "Fraggle Rock", "Smurfs", "Samurai Champloo", "DragonballZ", "Saint Seiya", "Sealab 2021", "Inuyasha", "Lupin the 3rd"];

var apiKey= "dc6zaTOxFJmzC";
var buttonQuery="";

var displayGifs= function(){
  var queryURL = "http://api.giphy.com/v1/gifs/search?q="+buttonQuery+"&api_key=dc6zaTOxFJmzC&limit=10";

  $("#giphyBox").empty();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(results){
    console.log(results);
    for (var i = 0; i < results.data.length; i++) {
      //console.log('coucou');
      var newDiv= $("<div class= gifContainer>");

      $(newDiv).html("<img class='gif hide' id='"+buttonQuery+i+"'src='"+results.data[i].images.fixed_height.url+"'>");
      $(newDiv).append("<img class='gif' id='"+buttonQuery+i+"'src='"+results.data[i].images.fixed_height_still.url+"'>");
      $(newDiv).append("<p>Rating: "+results.data[i].rating.toUpperCase()+"</p>");
      $("#giphyBox").append(newDiv);
    }
  });
};


//Function populates the array into buttons on the DOM
var buttonsPopulation= function(){
  $("#buttonsContainer").empty();

  for (var i = 0; i < topics.length; i++) {
    var buttonTag = $("<button>");
    buttonTag.addClass("gifButton");
    buttonTag.attr("data-name", topics[i]);
    buttonTag.text(topics[i]);
    $("#buttonsContainer").append(buttonTag);
  }
};
buttonsPopulation();

$("#submitSearchInput").on("click", function(event){
  event.preventDefault();
  var topicAdd = $("#searchInput").val().trim();
  topics.push(topicAdd);
  $("#searchInput").val("");
  buttonsPopulation();
});

$(document).on("click", ".gifButton", function(){
  buttonQuery= $(this).text();
  displayGifs();
});

$(document).on("click", ".gifContainer", function(){
  $(this).find("img").toggleClass("hide");
});

// sample search http://api.giphy.com/v1/gifs/search?q=messi&api_key=dc6zaTOxFJmzC&limit=10
