
      $('#submit').click(function(){

        //stop form from refreshing
        event.preventDefault();

        //Grab the user's selection and store it in a variable
        let strength = $('input[name=strength]:checked', '#myForm').val();
        let bitter = $('input[name=bitter]:checked', '#myForm').val();
        let colour = $('input[name=colour]:checked', '#myForm').val();

        // Define args for the API call
        let str;
        let bit;
        let col;

        //defines parameters according to selections from form
          if (strength === 'strong') {str = '&abv_lt=8&abv_gt=5';}
            else if (strength === 'light') { str = '&abv_lt=5'}
            else if (strength === 'super') { str = '&abv_gt=8'}
            else { str = '';}

          if (bitter === 'yesBitter') {bit = '&ibu_gt=60'}
            else if (bitter === 'noBitter'){bit = '&ibu_lt=30' }
            else if (bitter === 'mediumBitter') {bit = '&ibu_lt=60&ibu_gt=30'}
            else {bit = '';}

          if (colour === 'blonde') {col = '&ebc_lt=10'}
            else if (colour === 'dark') {col = '&ebc_gt=90'}
            else if (colour === 'red') {col = '&ebc_gt=10&ebc_lt=90'}
            else {col = '';}

          //API call
          $.getJSON("https://api.punkapi.com/v2/beers?per_page=1&page=1" + str + bit + col, function(json) {

            //check if there is a result first else return try again
            if (json.length != 0) {
              $('.beerList').html(
                '<p> <span>Name: </span>'+ json["0"].name +' </p><p><span>Alcohol: </span>'+ json["0"].abv +'%</p><p><span>Description: </span>'+ json["0"].description +' </p><img class="beer" src='+ json["0"].image_url +' />'
              );
            } else {
              $('.beerList').html(
                '<p>Sorry, your taste is too particular! Try another combination.</p>'
              );
            }

        });
});

//Surprise me button function
$('#surprise').click(function(){

    //stop form from refreshing
    event.preventDefault();

    //Returns a random beer
    $.getJSON("https://api.punkapi.com/v2/beers/random", function(json) {
     $('.beerList').html(
       '<p> <span>Name: </span>'+ json["0"].name +' </p><p><span>Alcohol: </span>'+ json["0"].abv +'%</p><p><span>Description: </span>'+ json["0"].description +' </p><img class="beer" src='+ json["0"].image_url +' />'
     );
  });
});

$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }
});
