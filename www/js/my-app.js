// Dom7
var $$ = Dom7;
animations = ["رنگین کمان", "رنگین کمان+درخشش", "رنگین کمان+درخشش 2", "تپش تصادفی", "ستاره دنباله دار", "3 ستاره دنباله دار", "رفت و برگشتی", "7 رنگ پیوسته"];

var rangeObj=[];
// Init App
var myApp = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: 'md',
    smartSelect: {
    pageTitle: 'Select Option',
    closeOnSelect: true,
  },
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
      myApp.dialog.alert('Hello World!');
    },
  },
  //routes: routes,
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


document.addEventListener("DOMContentLoaded", function(event) { 
	var selectionHTMLstring='';
	for ( var i = 0; i < animations.length; i++) {
		selectionHTMLstring += '<option data-option-class="koodak-font" value="' + i + '">' + animations[i] + '</option>';
	}
	document.getElementById('animationListSelectElement').innerHTML=selectionHTMLstring; 
 
 	var listHTMLstring='';
	for ( var i = 0; i < animations.length; i++) {
		listHTMLstring += $listAddItem(animations[i]);
	}
	//listHTMLstring= '<ul>' + listHTMLstring + '</ul>';
	//$('#animationListDiv').html(listHTMLstring);
	document.querySelector('#animationListDiv ul').innerHTML=listHTMLstring;
	
	/// Brightness slider

	/*$('#brightnessSlider').slider({
		stop: function (event, ui) {
			$("#brightnessSliderVal").html($('#brightnessSlider').val());
			//$(".brightnessVal").append(" درصد ");
			//TODO: send command to ESP
		}
	});*/

var lastreq=0;
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


  myApp.on('sortableSort', function (listEl, indexes) {
  console.log(indexes);
});

myApp.sortable.enable('.sortable');  

$$('.open-vertical').on('click', function () {
//document.getElementById('greenSlider').value=200;
myApp.dialog.create({
  title: 'تنظیم رنگ',
  verticalButtons: false,
  cssClass: 'appdialog',
  buttons:[{text:'تایید'},{text:'انصراف'}],
  on:{
    open:function(d){
      var els=d.$el.find('.range-slider');
	  console.log(els);
		var color = $('#colorPickerInput').wheelColorPicker('getColor');
		colorR = Math.round(color.r * 255);
		colorG = Math.round(color.g * 255);
		colorB = Math.round(color.b * 255);
		colorarr=[colorR,colorG,colorB];
	  
      for(var i=0;i<els.length;i++){
		  els[i].value=200;
        rangeObj[i] = myApp.range.create({
          el: els[i],
          on:{
            change:function(r){
              //console.log(r.getValue());
            }
          }
        });
		rangeObj[i].setValue(colorarr[i]);
		console.log(rangeObj[i]);
		//myApp.range.get('.range-slider');
      }
		//console.log(myApp.range.get('#blueSlider').getValue());
		//console.log($('#blueSlider').val);
		myApp.range.setValue(document.getElementsByClassName('color-green'),200);
		//document.getElementById('greenSlider').value=200;
		console.log(document.getElementById('greenSlider').value);

      
    }
  },
  content: document.getElementById('rgbSliderPickerPopUp').innerHTML,
}).open();


});
  


$('#animationListDiv').on('click','.listAddItem',function(){
	myApp.smartSelect.open('#animationListSelect');
	$(this).parent().parent().after($listAddItem('جدید'+Math.round(Math.random()*100)));
});

$$('#redSlider').on('range:change', function (e, range) {
  console.log(range.value);
});

$('.hjhjhjhj').on('click',function(){
	console.log('sss');
});
  
});


//This function returns the html for new item to add
function $listAddItem(item){
return '<li class="swipeout">\
          <div class="item-content swipeout-content">\
            <div class="item-inner">\
              <div class="item-title">'+item+' </div>\
            </div>\
          </div>\
          <div class="sortable-handler"></div>\
		        <div class="swipeout-actions-right">\
        <a href="#" class="color-green listAddItem"><i class="material-icons">add</i></a>\
		<a href="#" class="color-blue listEditItem"><i class="material-icons">edit</i></a>\
        <a href="#" class="swipeout-delete"><i class="material-icons">delete</i></a>\
      </div>\
        </li>'
}
