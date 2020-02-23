  //Create a variables name topics and assigned with disney characters in string.
      var topics = ["cinderella", "goofy", "tinkerbell", "elsa", "ariel", "pooh", "belle", "simba"];
 
   //disneyCharacterInfo function re-render the HTML to display the appropriate content
     function disneyCharacterInfo() {
      event.preventDefault();
        var topic = $(this).attr("data-name");
           var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=iNztTxLueglvaGFJ6pTOQUtn4vLGftx6&limit=10";

           console.log(queryURL);
        //Performing ajax request
           $.ajax ({
               url: queryURL,
               method: "GET"
           })
           .then(function(response) {
               $("#gifs-box").empty();
               var results = response.data;
               //console.log(response);
              
               //Using for loop for the results on whatever the responce that return.
             for (var i = 0; i < results.length; i++) {
               
               var gifDiv = $("<div class='topic'>");
               var p = $("<h5>").text("Rating: " + "" + rating);

              var rating = results[i].rating;

              var disneyCharactersImage = $("<img>");
                 disneyCharactersImage.attr("src", results[i].images.fixed_height_still.url);
                 disneyCharactersImage.attr("data-still", results[i].images.fixed_height_still.url);
                 disneyCharactersImage.attr("data-animate", results[i].images.fixed_height.url);
                 //Appending the paragraph and image into gifDiv
                 gifDiv.append(p);
                 gifDiv.append(disneyCharactersImage);
                 $("#gifs-box").prepend(gifDiv);
            };
         });
     }
     //function for displaying the disneyCharacters data
     function renderButtons() {
              
      $("#disney-characters").html("");
      for (var i = 0; i < topics.length; i++) { 
       var a = $("<button>");
        a.addClass("disney-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#disney-characters").append(a);
    };
}
   //The function that handles event where diney-input added
   $("#find-disneyCharacter").on("click", function(event) {
     event.preventDefault();

     var topic = $("#disney-input").val().trim();

       topics.push(topic);
     // console.log(topic);
     renderButtons(); 
     document.getElementById('disney-input').value=''; 
     });
   
     $(document).on('click', ".disney-btn", disneyCharacterInfo);
                 
     renderButtons();

    //The jquery method that allow to get the value of attr from HTML element
      $("#gifs-box").on("click", "img", function() {
            var state = $(this).attr("data-state");
        /// If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value   
           if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
           $(this).attr("data-state", "animate");
           }
           else { 
           $(this).attr("src", $(this).attr("data-still"));
           $(this).attr("data-state", "still");
       
           }
      }); 

     

         
