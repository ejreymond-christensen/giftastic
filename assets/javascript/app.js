//model
var topics= ["dog", "cat", "ferret", "elephant", "coyote", "wolf", "bird"];

var apiKey= "dc6zaTOxFJmzC";
var buttonQuery="";

var displayGifs= function(){
  var queryURL = "http://api.giphy.com/v1/gifs/search?q="+buttonQuery+"&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(results){
    console.log(results);
    for (var i = 0; i < results.data.length; i++) {
      //console.log('coucou');
      //$("#giphyBox").append("<p>"+results.data[i].rating+"</p>");
      $("#giphyBox").append("<img class='gif' id='"+buttonQuery+i+"'src='"+results.data[i].images.fixed_height.url+"'>");
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

// sample search http://api.giphy.com/v1/gifs/search?q=messi&api_key=dc6zaTOxFJmzC&limit=10
