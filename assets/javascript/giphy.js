 $(document).ready(function() {

    //Create a variables name topics and assigned with disney characters in string.
      var topic = ["cinderella", "goofy", "tinkerbell", "elsa", "ariel", "pooh", "belle", "simba"];
     
     
      function renderButtons() {
              
        $("#disney-characters").empty();
        for (var i = 0; i < topic.length; i++) { 
         var a = $("<button>");
          a.addClass("disney");
          a.attr("data-name", topic[i]);
          a.text(topic[i]);
          $("#disney-characters").append(a);
      }
  }
   
      $("#find-disneyCharacter").on("click", function(event) {
           event.preventDefault();

          var disney = $("#disney-input").val().trim();
           
            topic.push(disney);
           // console.log(topic);
              renderButtons();  
          });
       renderButtons();
     
    $("button").on("click", function() {
        var disneyCharacters = $(this).attr("data-name");
           var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disneyCharacters + "&api_key=iNztTxLueglvaGFJ6pTOQUtn4vLGftx6&limit=10";

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

              var rating = results[i].rating;

               var p = $("<h3>").text("Rating: " + rating);

               var disneyCharactersImage = $("<img>");
                  disneyCharactersImage.attr("src", results[i].images.fixed_height.url);
                
                 
                  gifDiv.prepend(p);
                  gifDiv.prepend(disneyCharactersImage);
                  $("#gifs-box").prepend(gifDiv);
                } 
         });
     });      
         $("#gifs-box").on("click", function() {
            var disneyCharactersGifs = $(this).attr("data-state");
            
           if (disneyCharactersGifs === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
           $(this).attr("data-state", "animate");
           }
           else { 
           $(this).attr("src", $(this).attr("data-still"));
           $(this).attr("data-state", "still");
       
           }
      }); 
});
    


         
