 $(document).ready(function() {

       
 //Create a variables name topics and assigned with disney characters in string.
      var topics = ["cinderella", "goofy", "tinkerbell", "elsa", "sleeping beauty", "ariel", "pooh", "belle", "mickey mouse", "simba"];
     
    //Create functions to render the buttons when you click it. 
       function renderButtons() {
              
              $("#disney-characters").empty();
              for (var i = 0; i < topics.length; i++) { 
               var a = $("<button>");
               a.addClass("disneyGif");
               a.attr("data-disneyCharacter", topics[i]);
               a.text(topics[i]);
            $("#disney-characters").append(a);
         }
        }

        $("#find-disneyCharacter").on("click", function(event) {
            event.preventDefault();
    
            var disneyGif = $("#disney-input").val().trim();
            topics.push(disneyGif);
    
             renderButtons();
        });
    
        renderButtons();
    

      $("button").on("click", function(event) {
          event.preventDefault();
          
            var disneyCharacter = $(this).attr("data-disneyCharacter");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disneyCharacter + "&api_key=iNztTxLueglvaGFJ6pTOQUtn4vLGftx6&limit=10";

            console.log(queryURL);
         //Performing ajax request
            $.ajax ({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                var results = response.data;

                $("#gifs-box").empty();
                //Using for loop for the results on whatever the responce that return.
                for (var i = 0; i < results.length; i++) {
                         
               if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                   var gifDiv = $("<div>");
                   var rating = results[i].rating;
                   var p = $("<p>").text("Rating: " + rating);

                   var disneyCharacterImage = $("<img>");

                   disneyCharacterImage.attr("src",  results[i].images.fixed_height.url);

                   gifDiv.append(p);
                   gifDiv.append(disneyCharacterImage);
                   $("#gifs-box").prepend(gifDiv);
               }
            }
         });
     
     });

       $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        //================================
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-still", "animate");
        }
     });

 });
         
