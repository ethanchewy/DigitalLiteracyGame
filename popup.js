//Global Vars
var activeTab;

var lastRequestTime = 0;
var requestInterval = 50;

var timeoutHistory = [];
var xhrHistory = [];

function get(url, done) {
	var xhr = new XMLHttpRequest();
	xhrHistory.push(xhr);
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState == 4) {
			done(xhr.responseText);
		}
	}
	var delay = Math.max(lastRequestTime + requestInterval - (+new Date()), 0) + Math.random() * requestInterval;
	lastRequestTime = delay + (+new Date());
	timeoutHistory.push(setTimeout(function () {
		xhr.send();
	}, delay));
}

//Get list of friends based on the most frequent posters on news feed
//Promise to be resolved using deferred objects inside the getnewsfeed function
//Need to store information in cache. Don't rurn this function everytime the page reloads.
// https://developer.chrome.com/extensions/storage , http://stackoverflow.com/questions/3937000/chrome-extension-accessing-localstorage-in-content-script 
var promises = [];
//var friends = [];

function getFriends(){
	
	var index = 0;
	var friends = [];
	while(index<=500){
		request = $.ajax({
		     url: "https://mbasic.facebook.com/friends/center/friends/?ppk="+index,
		     dataType: 'text',
		     success: function(data) {
		          //var elements = $("<div>").html(data)[0].getElementsByTagName("bu")[0].getElementsByTagName("bz");
		          if($(data).find(".v.bk")){
		          	var elements = $(data).find(".bj").children();
		          
			          for(var i = 0; i < elements.length; i++) {
			               var name = elements[i].firstChild.innerText;
			               var firstDigit = name.match(/\d/);
			               index = name.indexOf(firstDigit);
			               name = name.slice(0, index);

			               if(name.includes("Your PagesHelpSettings")){
			               		return false;
			               }
			               // Do something here
			               friends.push(name);
			          }

		          } else{
		          	return false;
		          }

		          

		          //console.log(friends);
		          
		     }
		});
		index++;
		promises.push( request);

	}
	
	return friends;

}

//https://developer.chrome.com/extensions/storage#type-StorageArea

//Overid the data limits via http://stackoverflow.com/questions/34060487/chrome-extension-store-large-amounts-of-data

//Shrink data: http://stackoverflow.com/a/13381396/4698963
function save_data(data){
	// Get a value saved in a form.
    //var theValue = textarea.value;
    // Check that there's some code there.
    if (!data) {
      //message('Error: No value specified');
      return;
    }
    // Save it using the Chrome extension storage API.
    /*
    chrome.storage.sync.set({'friends_list': data}, function() {
      // Notify that we saved.
      console.log("hello");
      console.log(data);
      //message('Settings saved');
    });
    */
    localStorage.setItem('friends_list', JSON.stringify(data));
    var myvar = localStorage["friends_list"];
    console.log(myvar);
    alert("all done updating");

}

$( document ).ready(function() {
    $( "#update" ).click(function() {
		//console.log("sdf");
		friends = null;
		var friends_list = getFriends();

		$.when.apply(null, promises).done(function(){
			localStorage.removeItem("friends_list");
			save_data(friends_list);
		});
	});
});
