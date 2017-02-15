window.fbAsyncInit = function() {
    FB.init({
      appId      : '1778865799042954',
      xfbml      : true,
      version    : 'v2.3'
    });
    FB.AppEvents.logPageView();
    $( document ).ready(function() {
        FB.login(function(response) {
        if (response.status === 'connected') {
        	
          // Logged into your app and Facebook.
          var friends;
          FB.api('/me/taggable_friends?limit=5000', function(response) {
	          console.log(response);
	          //displayFriends(response);
	          friends = response;
	          //console.log(friends);
	          //displayMutualFriends(response);
	      });
	      
          
	      FB.api('/me/feed?limit=5000', function(response) {
	          //console.log(response);
	          //displayPostLikes(response);
	          console.log(response);
	          //reactions=0;

	          console.log(response);
	          
	          /*
	          comments.done(function(something){
	          	console.log(something);
	          	displayTotalScoreComments(reactions, something, friends);
	          });

	          var test1;
	          var test2;
	          function callback1(data1){
	          	console.log(data1);
	          	test1=data1;
	          	return data1;
	          }
	          function callback2(data2){
	          	console.log(data2);
	          	test2=data2;
	          	return data2;
	          }
	          setTimeout(function(){
	          	console.log(reactions);
	          	console.log(comments);
	          	displayTotalScoreComments(test1, test2, friends);
	          },15000);
	          */
	          //var list = 
	          

	      });
	      
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
        }
      },{scope: 'public_profile, email, user_about_me, user_actions.books, user_actions.fitness, user_actions.music, user_actions.news, user_actions.video, user_birthday, user_education_history, user_events, user_games_activity, user_hometown, user_likes, user_location, user_managed_groups, user_photos, user_posts, user_relationships, user_relationship_details, user_religion_politics, user_friends, user_tagged_places, user_videos, user_website, user_work_history, read_custom_friendlists, read_insights, read_audience_network_insights, read_page_mailboxes, manage_pages, publish_pages, publish_actions, rsvp_event, pages_show_list, pages_manage_cta, pages_manage_instant_articles, ads_read, ads_management, pages_messaging, pages_messaging_subscriptions,  pages_messaging_phone_number, user_posts'});

    });
  }; 