$(document).ready(function () {

    window.fbAsyncInit = function () {
        FB.init({
            appId: '839142646102346', // App ID
            channelUrl: '//localhost:9393', // Channel File
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true // parse XFBML
        });

        addEventListeners();
    };

    // Load the SDK Asynchronously
    (function (d) {
        var js, id = 'facebook-jssdk',
            ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

});

var addEventListeners = function () {
    FB.Event.subscribe('auth.login', function (response) {
        if (response.status === 'connected') {
            loggedInHandler(response);
        } else if (response.status === 'not_authorized') {
            FB.login(function () {}, {
                scope: 'email'
            });
        } else {
            FB.login(function () {}, {
                scope: 'email'
            });
        }
    });
};


var loggedInHandler = function (response) {

    FB.api('/me?fields=email, picture', function (response) {
        var userData = {
            email: response.email,
            facebook_id: response.id,
            picture_url: response.picture.data.url
        };
        loginOrCreateUser(userData);
    });
};

var loginOrCreateUser = function(userData){
    console.log(userData)
    $.ajax({
        url: '/session/facebook_login/',
        method: 'post',
        data: userData
    }).done(function (userPage) {
        window.location.href = userPage;
    });
}