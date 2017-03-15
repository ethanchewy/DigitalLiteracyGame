//var all = document.find('[role="article"] a');
var bkg = chrome.extension.getBackgroundPage();
bkg.console.log('foo');
var all = document.find('[role="article"] a').map(function () {
				return /(.*?)(?:\/\?|\?|$)/.exec($(this).attr('href'))[1];
			}).get();
console.log(test);
console.log(all);
for(i=0; i < all.length; i++) {
    if(all[i].innerHTML.indexOf(searchValue[j]) > -1){
    	all[i].innerHTML = "TEST";
    }
}