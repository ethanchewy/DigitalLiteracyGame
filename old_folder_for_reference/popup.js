//Global Vars
var activeTab;
function myfunc(){
    var x = $('#options option:selected').text();
    chrome.extension.sendMessage({sel_text: x});
}

$( document ).ready(function() {
    $( "#run_game" ).click(function() {
		console.log("sdf");
		//chrome.tabs.create({url: 'index.html'});
		/*
		chrome.tabs.executeScript(null, {
	        //code: 'var config = ' + JSON.stringify(getKeywords)
	    }, function() {
	        chrome.tabs.executeScript(null, {file: 'custom.js'});
	    });
		chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            activeTab = tabs[0];
            get_input_values();
        });
        */
        $('#options').change(myfunc);
        var someVar = {text: 'test', foo: 1, bar: false};
		chrome.tabs.executeScript({
		    code: '(' + function(params) {
		        document.body.insertAdjacentHTML('beforeend',
		            '<div style="all:unset; position:fixed; left:0; top:0; right:0; bottom:0;' +
		                'background-color:rgba(0,255,0,0.3)">' + params.text + '</div>'
		        );
		        return {success: true, html: document.body.innerHTML};
		    } + ')(' + JSON.stringify(someVar) + ');'
		}, function(results) {
		    console.log(results[0]);
		});
	});

	function get_input_values() {
	    chrome.tabs.sendMessage(activeTab.id, {
	        "method": "get_data"
	    }, function(items) {
	        overlay_items();
	    });
	}


	function overlay_items(){

	}
});
