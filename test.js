//Based off of parse.js from politecho

var lastRequestTime = 0;
var requestInterval = 50;

var timeoutHistory = [];
var xhrHistory = [];
/*
var list_of_friends = localStorage;

console.log("hello");
console.log(list_of_friends);
*/
var list_of_friends = null;

chrome.storage.local.get(['friends_list'], function(items) {
  //message('Settings retrieved', items);
  
  list_of_friends = Object.keys(items).map(function (key) { return items[key]; });
  console.log(list_of_friends);
});

/*
if(list_of_friends===null){
	alert("Please press the update button in the extension popup window!");
}
*/

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
	//friends = getFriends();
	var newdiv = document.createElement("DIV");
	url = document.location.href;
	//console.log(document.location.href);
	//console.log("HELLO_1");

	function fetch(url, depth, fetchDone) {
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
					//var friends = getRandomSubarray(friends_list, 3);
					//console.log(friends);

					

					if ($(this).find("[role=\"presentation\"]").length > 0){
						//Get first two words from string
						//Shared class is .by.eo
						//contains_shared = #elementId:contains('some text').length > 0;

						//Check to see if "shared by" is captured by string
						//console.log($("#elementId:contains('some text')").length);
						var shared = $(this).first().text().indexOf(" shared a ");
						
						/*
						if($(this).find(".by.eo").length || shared > 0){
							//$(this).find(".by.eo").css('background-color', 'red');
							parent_class = $(this).find(".by.eo");
						} else{
							//Block Out Name
							//$(this).find("span:first").css('background-color', 'red');
							parent_class = $(this).find("span:first");
						}*/

						console.log(shared);
						

						//parent_class = $(this).find("span:first");
						var parent_div = $(this).find("a:first");

						var re = /^([a-z]+)[\s,;:]+([a-z]+)/i; 
						var str = parent_div.text();
						var m;
						var rest = str.split(" ");


						var name = rest.slice(0, 2);
						name = name.join(" ");

						//console.log(name);
						//console.log(list_of_friends);
						console.log(list_of_friends instanceof Array);
						console.log(list_of_friends[0]);
						//console.log(list_of_friends["friends_list"]);
						console.log(name);
						console.log(list_of_friends[0].indexOf(name));

						if(list_of_friends[0].indexOf(name)>-1&&shared>-1){
							//ReProgram with a yield statement or a test fail loop
							//For shared articles stuff
							
							console.log(parent_div);
							parent_div.css('background-color', 'red');
							
							if ((m = re.exec(str)) !== null) {
								if(rest.length>2){
									rest.splice(0, 2);
									parent_div.text("Who Is This? " + rest.join(" "));
								} else{
									parent_div.text("Who Is This?");
								}
							}

							$(this).append('<div id='+g+" class=" + "\"" + name + " question"+"\""+">"+ 
							'Question '
							 + g +
							 "<form" + " id="+g+" >" + "Guess: " +"<input type=\"text\" name=\"choice\">"+
							 "</form>" +
							 "<button class=\"submit\">"+ "Submit" +"</button>" 
							 + "<button class=\"reveal\">"+ "Reveal Correct Answer" +"</button>" +
							 '</div>'+"<br>"

							 );
							$(this).append('<br><br><br><br>');

							$("body").find("#console:first").append(
								"<li data-time=\"0\" data-field=\"" + g + "\">Question " + g +": <span>0</span>s</li>"

							);
							
							g++;

						}

						
						
						

						

						//Insert friend randomly into the array http://stackoverflow.com/a/1527820/4698963
						/*
						var location = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

						friends.splice(location, 0, name);

						$(this).append('<div id='+g+" class=" + "\"" + name + " question"+"\""+">"+ 
							'Question '
						 + g +
						 "<form" + " id="+g+" >" + "Guess: " +"<input type=\"text\" name=\"choice\">"+
						 "</form>" +
						 "<button class=\"submit\">"+ "Submit" +"</button>" 
						 + "<button class=\"reveal\">"+ "Reveal Correct Answer" +"</button>" +
						 '</div>'+"<br>"

						 );

						$("body").find("#console:first").append(
							"<li data-time=\"0\" data-field=\"" + g + "\">Question " + g +": <span>0</span>s</li>"

							);




						*/

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

			//Add classes to question after. 

			//Do you trust this or not? question box with 

			//form with checkbox
			
			links.forEach(function (link) {
				if (!frequency.hasOwnProperty(link)) frequency[link] = 0;
				frequency[link]++;

			});

			onFetch();
			fetchDone();
		});
	}

	//Get random sort of 3 friends
	
	//friends = ["ethan chiu","asdfasdf asdfasdfad", "asdfsdfsd", "Asdfsdfad sdf", "asdf sdfsdf"];
	//http://stackoverflow.com/a/20291749/4698963

	
	var i =0;

	fetch(url, maxDepth, function () {
		done(frequency);
		
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
	var choice = $('#' + number + ' input[name=choice]').val().toLowerCase();

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

$(document).on('click', '.reveal', function() {
	//e.preventDefault();
	var number =$(this).parent().attr('id');
	var correct =$(this).parent().attr('class');
	//var choice = $('#' + number + ' input[name=choice]:checked').val();
	//http://stackoverflow.com/a/588322/4698963
	alert("The person who shared/posted this is " + correct);
});



$( document ).ready(function() {
	//getFriends();
	//getFriends();
	var $div = $("<div style=\"display: none\" id=\"hideAll\">&nbsp;</div>").appendTo('body');

	$("<div id=\"console\"></div>").appendTo(".g:first");
	/*
	document.getElementsByTagName('body')[0].append(
		"<div style=\"display: none\" id=\"hideAll\">&nbsp;</div>"
		);
		*/
	document.getElementById("hideAll").style.display = "block";
	var maxNewsFeedDepth = 20;
	var profileToFrequency;
	//document.body.append("<div>sdfsdfsdfdf</div>");
	//chrome.extension.getBackgroundPage().console.log("sdfsdfsfdsdf");
	getNewsFeedFrequency(maxNewsFeedDepth, function (data, progress) {
		//chrome.extension.getBackgroundPage().console.log("sdfsdfsfdsdf");
		//chrome.extension.getBackgroundPage().console.log(data);
		document.getElementById("hideAll").style.display = "none";
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
		  reportInterval:1,
		  callback: function(data) {
		    // Example { Top: 5, Middle: 3 }
		    $.each(data, function(key, val) {
		      var $elem = $('#console li[data-field="' + key + '"]');
		      var current = parseInt($elem.data('time'), 10);

		      $elem.data('time', current + val);
		      $elem.find('span').html(current += val);
		    });

		  }
		});
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