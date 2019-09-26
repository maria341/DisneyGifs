 $(document).ready(function() {

    //Create a variables name topics and assigned with disney characters in string.
      var topic = ["cinderella", "goofy", "tinkerbell", "elsa", "ariel", "pooh", "belle", "simba"];
 
      renderButtons();
     function renderButtons() {
              
        $("#disney-characters").empty();
        for (var i = 0; i < topic.length; i++) { 
         var a = $("<button>");
          a.addClass("newCharacter");
          a.attr("data-name", topic[i]);
          a.text(topic[i]);
          $("#disney-characters").append(a);
      }
  }
   //Adding click  event listen listener to all buttons
  $("button").on("click", function(event) {
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
               
               var gifDiv = $("<div>");
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
     });  

     $("#find-disneyCharacter").on("click", function(event) {
      event.preventDefault();

      var newCharacter = $("#disney-input").val().trim();
 
       topic.push(newCharacter);
      // console.log(topic);
        renderButtons();  
      });

      
     
        $("#gifs-box").on("click", "img", function() {
            var state = $(this).attr("data-state");
            
           if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
           $(this).attr("data-state", "animate");
           }
           else { 
           $(this).attr("src", $(this).attr("data-still"));
           $(this).attr("data-state", "still");
       
           }
      }); 
         
 });
    


         
