// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var myApp = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.


// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {	
    // Get page data from event data
    var page = e.detail.page;
	console.log('1');
    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})


$$(document).on('deviceready', function () { console.log('1'); });

document.addEventListener("DOMContentLoaded", function(event) { 
  console.log('1');
  
  	/// Brightness slider

	/*$('#brightnessSlider').slider({
		stop: function (event, ui) {
			$("#brightnessSliderVal").html($('#brightnessSlider').val());
			//$(".brightnessVal").append(" درصد ");
			//TODO: send command to ESP
		}
	});*/

	var lastreq = 0;
	$('#brightnessSlider').on("change", function () {
		localStorage.setItem("brightnessValue", $('#brightnessSlider').val());
		var d = new Date();
		var currenttime = d.getTime(); //get the time of this change event
		var interval = currenttime - lastreq; //how many milliseconds since the last request
		if (interval >= 100) { //more than 100 milliseconds
			lastreq = currenttime; //set lastreq for next change event
			$("#brightnessSliderVal").html($('#brightnessSlider').val());
			//$(".brightnessVal").append(" درصد ");
			//TODO: send command to ESP
		}

	});
  
  setTimeout(function () {
		widthSize = $(window).width() * .65;
		$('#colorPickerDiv').css({
			'width': widthSize,
			'height': widthSize
		});

		$('#colorPickerInput').wheelColorPicker({
			format: 'hsv',
			sliders: 'w',
			layout: 'block',
			autoResize: false
		});


	}, 0);
  
  
  
  
  
  
});

