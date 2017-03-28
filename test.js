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
function getFriends(){
	$.ajax({
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
	               console.log(name);
	          }

	          console.log(elements);
	     }
	});
}

//See if the answer is correct
function score(){

}

var total_score=0;

//Create a way to show mainly friend's contact




//Create hash table for article objects
//http://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript
var article_hash={};
function getNewsFeedFrequency(maxDepth, done, onFetch) {
	var frequency = {};
	var newdiv = document.createElement("DIV");
	url = document.location.href;
	console.log(document.location.href);
	//document.write("sdfsdfsdfdfs");
	/*
	document.body.append("<div>sdfsdfsdfdf</div>");
	$(".cb .cc").text("TESTTESTTEST");
	*/

	//document.write("sddfdssdfsd");
	console.log("HELLO_1");
	function fetch(url, depth, fetchDone) {
		console.log('getNewsFeedFrequency.fetch', depth);
		get(url, function (text) {
			var $t = $(text);

			var links = $t.find('[role="article"] a').map(function () {
				return /(.*?)(?:\/\?|\?|$)/.exec($(this).attr('href'))[1];
			}).get();
			/*
			var htmlstuff = $t.find('[role="article"] a').map(function () {
				console.log("sdff");
				$(this).append("<p>TEST</p>")[1];
				return 0;
			}).get();
			*/
			/*
			var htmlstuff = $t.find('[role="article"] a').map(function () {
				return /(.*?)(?:\/\?|\?|$)/.exec($(this).attr('class'))[1];
			}).get();
			*/
			var g = 1;
			$('[role="article"]').each(function(i) {
				//$(this).attr('id', 'page'+(i+1));
				if ($(this).find("[role=\"presentation\"]").length > 0){
					console.log("g: " + g);
					//$(this).find(".cg.ch").append('<div class=\"question'+g+'\">Question ' + g +'</div>');
					//$(this).after('<div id=\"question'+g+'\"'+" class=\"question\">"+ 'Question ' + g +'</div>');
					//Append Question
					$(this).append('<div id=\"question'+g+'\"'+" class=\"question\">"+ 
						'Question '
					 + g +
					 "<form><input type=\"radio\" name=\"choice\" value=\"Name 1\"> Name 1<input type=\"radio\" name=\"choice\" value=\"Name 2\"> Name 2<input type= \"radio\" name=\"Name 3\" value=\"Application\"> Name 3<input type=\"radio\" name=\"choice\" value=\"None of These\"> Name 4</form>"
					 +'</div>'+"<br>");
					
					//Block Out Name
					$(this).find("span:first").css('background-color', 'red');
					//$(this).find("span:first").text("GUESS!");
					/*
					var me = $(this).find("span:first");
					me.html(me.html().replace(/^(\w+)/, '<span>test</span>'));
					*/
					/*
					var me = $(this).find("span:first");
					$(me).html(function (i, html) {
					    return html.replace(/(\w+\s\w+)/, 'TEST');
					});
					*/
					var re = /^([a-z]+)[\s,;:]+([a-z]+)/i; 
					var str = $(this).find("span:first").text();
					console.log(str);
					var m;
					var rest = str.split(" ");
					console.log(rest);

					var name = rest.slice(0, 2);
					name = name.join(" ");
					console.log(name);

					//ReProgram with a yield statement or a test fail loop
					if ((m = re.exec(str)) !== null) {
						if(rest.length>2){
							rest.splice(0, 2);
							$(this).find("span:first").text("Who Is This " + rest.join(" "));
						} else{
							$(this).find("span:first").text("Who Is This");
						}
					    
					}

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
				
			});

			//TODO: ADD FORM OF QUESTION
			//Filter out videos with youtube and vimeo links
			//Filter out news content to display
			//Change questions as well
			//Look at extension code for sponsored posts to avoid marking those up. 
			//Filter out photos posted => c=any class similarity?


			/*
			htmlstuff.forEach(function (html) {
				if (!frequency.hasOwnProperty(html)) frequency[html] = 0;
				frequency[html]++;
				$(".cb .cc").append("<p>TEST</p>");
			});
			*/
			/*
			htmlstuff.forEach(function (html) {
				if (!frequency.hasOwnProperty(html)) frequency[html] = 0;
				frequency[html]++;
				if(html=="cg ch"){
					$(".cb.cc").prepend('<div id="root"> dsfsdfsdfsdfsdfs</div>');
				}
				
			});
			*/
			//$(".cb").prepend('<div id="root"> dsfsdfsdfsdfsdfs</div>');
			//console.log(htmlstuff);
			
			links.forEach(function (link) {
				if (!frequency.hasOwnProperty(link)) frequency[link] = 0;
				frequency[link]++;
				console.log("HELLO_2");
				console.log(link);

				//$('a[href^='+link+"http://example.com/external/link"]').prepend('<div id="root"> dsfsdfsdfsdfsdfs</div>');
				/*
				var linkdiv = document.createElement("DIV");
				linkdiv.appendChild(document.createTextNode("some text"));
				link.appendChild(linkdiv);
				*/

			});

			onFetch();
			fetchDone();
			/*
			var next = $t.find('a[href^="/stories.php?aftercursorr"]').last().attr('href');
			if (next && depth) {
				fetch('https://mbasic.facebook.com' + next, depth - 1, fetchDone);
			} else {
				fetchDone();
			}
			*/
		});
	}

	fetch(url, maxDepth, function () {
		done(frequency);
	});
}

$( document ).ready(function() {
	getFriends();

	//console.log("sdf");
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
		console.log('Progress: ' + elapsed + '/' + total);
		chrome.runtime.sendMessage({
			action: "parseProgress",
			data: {
				elapsed: elapsed,
				total: total,
			},
		});
	});


});
/*
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	chrome.extension.getBackgroundPage().console.log("sdfsdfsfdsdf");
	var maxNewsFeedDepth = 20;
	var profileToFrequency;
	getNewsFeedFrequency(maxNewsFeedDepth, function (data, progress) {
		chrome.extension.getBackgroundPage().console.log("sdfsdfsfdsdf");
		chrome.extension.getBackgroundPage().console.log(data);
		chrome.runtime.sendMessage({
			action: "parseResponse",
			data: data,
			tab: sender.tab.id
		});
		//profileToFrequency = data;
		//onReturn();
	},  function (elapsed, total) {
		console.log('Progress: ' + elapsed + '/' + total);
		chrome.runtime.sendMessage({
			action: "parseProgress",
			data: {
				elapsed: elapsed,
				total: total,
			},
		});
	});
});
*/
/*
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	var bkg = chrome.extension.getBackgroundPage();
	bkg.console.log('foo');
    appendTextToBody(request.sel_text);
  });

function appendTextToBody(text) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.executeScript(tab.id, {"code" : '$("body").append("Test : "'+text+');'}) ;
	chrome.tabs.executeScript(null, {file: 'custom.js'});  
  });
}

function check(tab_id, data, tab){
    if(tab.url.indexOf("google") > -1){
        chrome.pageAction.show(tab_id);
    }
};
chrome.tabs.onUpdated.addListener(check);
*/