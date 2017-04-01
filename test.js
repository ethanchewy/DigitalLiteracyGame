//Based off of parse.js from politecho

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
var promises = [];
function getFriends(){
	var friends = [];
	request = $.ajax({
	     url: "https://mbasic.facebook.com/me/friends",
	     dataType: 'text',
	     success: function(data) {
	          //var elements = $("<div>").html(data)[0].getElementsByTagName("bu")[0].getElementsByTagName("bz");
	          var elements = $(data).find(".bz.ca").children();
	          
	          for(var i = 0; i < elements.length; i++) {
	               var name = elements[i].firstChild.innerText;
	               var firstDigit = name.match(/\d/);
	               index = name.indexOf(firstDigit);
	               name = name.slice(0, index);
	               // Do something here
	               friends.push(name);
	          }

	          //console.log(friends);
	          
	     }
	});
	promises.push( request);
	return friends;

}

//See if the answer is correct
function score(){

}

var total_score=0;

//Create a way to show mainly friend's contact

//From http://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
//Get subarray for questions
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}



//Create hash table for article objects
//http://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript
var article_hash={};
function getNewsFeedFrequency(maxDepth, done, onFetch) {
	var frequency = {};
	var newdiv = document.createElement("DIV");
	url = document.location.href;
	//console.log(document.location.href);
	//console.log("HELLO_1");

	function fetch(url, depth, friends_list, fetchDone) {
		//console.log('getNewsFeedFrequency.fetch', depth);
		//Get the three friends that will be inserted to the questions



		get(url, function (text) {
			
			var $t = $(text);

			//Get any link that contains an article witha preview window
			var links = $t.find('[role="article"] a').map(function () {
				return /(.*?)(?:\/\?|\?|$)/.exec($(this).attr('href'))[1];
			}).get();

			var g = 1;



			//See if each article contains a link or not
			$('[role="article"]').each(function(i) {
				//$(this).attr('id', 'page'+(i+1));
				if($(this).find("a").length){
					//Get random subset of friends
					var friends = getRandomSubarray(friends_list, 3);
					console.log(friends);

					if ($(this).find("[role=\"presentation\"]").length > 0){
						
						if($(this).find(".by.eo").length){
							$(this).find(".by.eo").css('background-color', 'red');
							parent_class = $(this).find(".by.eo");
						} else{
							//Block Out Name
							$(this).find("span:first").css('background-color', 'red');
							parent_class = $(this).find("span:first");
						}
						
						

						//Get first two words from string
						var re = /^([a-z]+)[\s,;:]+([a-z]+)/i; 
						var str = parent_class.text();
						var m;
						var rest = str.split(" ");


						var name = rest.slice(0, 2);
						name = name.join(" ");

						//ReProgram with a yield statement or a test fail loop
						//For shared articles stuff
						if ((m = re.exec(str)) !== null) {
							if(rest.length>2){
								rest.splice(0, 2);
								parent_class.text("Who Is This? " + rest.join(" "));
							} else{
								parent_class.text("Who Is This?");
							}
						}

						//Insert friend randomly into the array http://stackoverflow.com/a/1527820/4698963
						var location = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

						friends.splice(location, 0, name);


						console.log(friends);


						//Append Question
						/*
						$(this).append('<div id='+g+" class=" + "\"" + name +"\""+">"+ 
							'Question '
						 + g +
						 "<form><input type=\"radio\" name=\"choice\" value=\"" + friends[0] +"\""+">"+ friends[0]
						 + "<input type=\"radio\" name=\"choice\" value=\"" + friends[1] +"\""+">"+ friends[1] + 
						 "<input type=\"radio\" name=\"choice\" value=\"" + friends[2] +"\""+">"+ friends[2] + 
						 "<input type=\"radio\" name=\"choice\" value=\"" + friends[3] +"\""+">"+ friends[3] + 
						 "</form>" +
						 "<button class=\"submit\">"+ "Submit" +"</button>" 
						 +'</div>'+"<br>"

						 );
						 */
						$(this).append('<div id='+g+" class=" + "\"" + name +"\""+">"+ 
							'Question '
						 + g +
						 "<form" + " id="+g+" >" + "Guess: " +"<input type=\"text\" name=\"choice\">"+
						 "</form>" +
						 "<button class=\"submit\">"+ "Submit" +"</button>" 
						 +'</div>'+"<br>"

						 );


						//Block out profile photo + hovering function
						//Replace hoverin over with question or somethin

						
						//Get URL and store it to specific 
						//url = ;

						//Run script for checking if answer is correct
						/*
						if(score()===true){
							total_score++;
						}
						*/

						g++;
					}

				}
				
				
			});
			

			//TODO: ADD FORM OF QUESTION
			//Filter out videos with youtube and vimeo links
			//Filter out news content to display
			//Change questions as well
			//Look at extension code for sponsored posts to avoid marking those up. 
			//Filter out photos posted => c=any class similarity?
			//Can't add total score for now since this refreshes each time. Could add later
			// ^currently works so the user can check immedietly to see if they know who shared it. 

			//Add functionality where the correct sharer is revealed.
			//Add time functionality
			
			links.forEach(function (link) {
				if (!frequency.hasOwnProperty(link)) frequency[link] = 0;
				frequency[link]++;

			});

			onFetch();
			fetchDone();
		});
	}

	//Get random sort of 3 friends
	friends = getFriends();

	//http://stackoverflow.com/a/20291749/4698963
	var i =0;
	$.when.apply(null, promises).done(function(){
		
		
		fetch(url, maxDepth, friends, function () {
			done(frequency);
			
		});
	});
	

	

	
}

//Click event to check if the answer is correct
//http://stackoverflow.com/a/6658774/4698963
/*
$(document).on('click', '.submit', function() {
	//e.preventDefault();
	var number =$(this).parent().attr('id');
	var correct =$(this).parent().attr('class');
	var choice = $('#' + number + ' input[name=choice]:checked').val();
	console.log(choice);
	console.log(correct);
	console.log(number);
	if($(this).parent().attr('id')==number){
		if(choice===correct){
			alert("Correct!");
		} else if(choice!==correct){
			alert("Incorect!");
		}

	}
});
*/
$(document).on('click', '.submit', function() {
	//e.preventDefault();
	var number =$(this).parent().attr('id');
	var correct =$(this).parent().attr('class').toLowerCase();
	//var choice = $('#' + number + ' input[name=choice]:checked').val();
	//http://stackoverflow.com/a/588322/4698963
	var choice = $('#' + number + ' input[name=choice]').val();

	console.log(choice);
	console.log(correct);
	console.log(number);
	if($(this).parent().attr('id')==number){
		if(choice===correct){
			alert("Correct!");
		} else if(choice!==correct){
			alert("Incorect!");
		}

	}
});



$( document ).ready(function() {
	var maxNewsFeedDepth = 20;
	var profileToFrequency;
	//document.body.append("<div>sdfsdfsdfdf</div>");
	//chrome.extension.getBackgroundPage().console.log("sdfsdfsfdsdf");
	getNewsFeedFrequency(maxNewsFeedDepth, function (data, progress) {
		//chrome.extension.getBackgroundPage().console.log("sdfsdfsfdsdf");
		//chrome.extension.getBackgroundPage().console.log(data);
		chrome.runtime.sendMessage({
			action: "parseResponse",
			data: data,
			tab: sender.tab.id
		});
		//profileToFrequency = data;
		//onReturn();
	},  function (elapsed, total) {
		//console.log('Progress: ' + elapsed + '/' + total);
		//Timing function for each question
		//Need to make scalable => push to array everytime question is created
		//This is just for temprorary reasons
		//Take information from callback
		$.screentime({
		  fields: [
		    { selector: '#1',
		      name: '1'
		    },
		    { selector: '#2',
		      name: '2'
		    },
		    { selector: '#3',
		      name: '3'
		    },
		    { selector: '#4',
		      name: '4'
		    },
		    { selector: '#5',
		      name: '5'
		    },
		    { selector: '#6',
		      name: '6'
		    },
		    { selector: '#7',
		      name: '7'
		    },
		    { selector: '#8',
		      name: '8'
		    },
		    { selector: '#9',
		      name: '9'
		    },
		    { selector: '#10',
		      name: '10'
		    },
		    { selector: '#11',
		      name: '11'
		    },
		    { selector: '#12',
		      name: '12'
		    },
		    { selector: '#13',
		      name: '13'
		    },
		    { selector: '#14',
		      name: '14'
		    },
		    { selector: '#15',
		      name: '15'
		    },
		    { selector: '#16',
		      name: '16'
		    },
		    { selector: '#17',
		      name: '17'
		    },
		    { selector: '#18',
		      name: '18'
		    },
		    { selector: '#19',
		      name: '19'
		    },
		    { selector: '#20',
		      name: '20'
		    },
		    
		  ],
		  reportInterval:10,
		  callback: function(data) {
		    console.log(data);
		    // Example { Top: 5, Middle: 3 }
		  }
		});
		chrome.runtime.sendMessage({
			action: "parseProgress",
			data: {
				elapsed: elapsed,
				total: total,
			},
		});
	});
	//console.log("hji");
	
	


});