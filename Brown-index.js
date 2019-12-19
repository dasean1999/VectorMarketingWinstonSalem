/*loads everything as the site loads*/
window.onload = function(){
    /*creates dropbox button 1*/
    document.getElementById('drop').onclick = function(){dropdown();};
    /*creates dropbox button 2*/
    document.getElementById('drop2').onclick = function(){dropdown2()};
    /*creates district button*/
    document.getElementById('district').onclick = function(){goDistrict();};
    /*creates gallery button*/
    document.getElementById('gallery').onclick = function(){goGallery();};
    /*creates support button*/
    document.getElementById('support').onclick =function(){goSupport();};
    /*creates home button at logo*/
    document.getElementById('logo').onclick = function(){returnHome();};
    /*creates home button*/
    document.getElementById('home').onclick = function(){returnHome();};

};
/*closes the dropdown menus if they've not been clicked*/
function clickOff(event){
    /*checks if the element clicked is a dropbox*/
     if(event.target.className!=="drop"){
         var drops = document.getElementsByClassName("dropdown-content");
         var drops2 = document.getElementsByClassName("dropdown-content2");
         var i;
         /*loops through and reveals/hides dropbox*/
         for (i = 0; i < drops.length; i++) {
             var open = drops[i];
             var open2 = drops2[i];
             if (open.classList.contains('show')) {
                 open.classList.remove('show');
             }
             if(open2.classList.contains('show')) {
                 open2.classList.remove('show');
             }
         }
     }
}
/*returns to the homepage*/
function returnHome() {
    window.location = "Brown-index.html";
}
/*directs to district page*/
function goDistrict() {
    window.location = "Brown-District.html";
}
/*directs to support page*/
function goSupport(){
    window.location = 'Brown-Support.html';
}
/*activates 1st dropdown bar*/
function dropdown(){
    document.getElementById("myDropdown").classList.toggle("show")
}
/*activates 2nd dropdown bar*/
function dropdown2(){
    document.getElementById("myDropdown2").classList.toggle("show")
}
/*activates gallery page*/
function goGallery(){
    window.location = "Brown-Gallery.html";
}
/*allows for the clickOff event to be activated anytime the screen is clicked*/
window.onclick = function(event) {
    clickOff(event);
};

/*accesses jQuery functions*/
$(document).ready(function(){
    /*variables for id's*/
    var head1 = $('#head1');
    var head2 = $('#head2');
    var head3 = $('#head3');
    var head4 = $('#head4');
    /*hides elements*/
    head1.toggleClass('hidden');
    head2.toggleClass('hidden');
    head3.toggleClass('hidden');
    head4.toggleClass('hidden');
    /*fades elements in*/
    head1.fadeIn(function () {
        head2.fadeIn(1000, function () {
            head3.fadeIn(1000, function () {
                head4.fadeIn(1000);
            });
        });
    });
    /*creates box slider plugin*/
    $('#slider').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        pause: 5000,
        auto: true,
        slideWidth: 304,
        slideMargin:10,
        autoControls: true,
    });
    /*sets up variable for API request*/
    var set = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=61635a386d1f8d74c684bc5a584e1c06&gallery_id=185632048-72157711894739282&format=json&nojsoncallback=1",
        "method": "get",
        "headers": {}
    };
    /*picks out data from the API*/
    $.ajax(set).done(function (data) {
        $.each(data.photos.photo,function(k,v){
            var farm = v.farm;
            var serve = v.server;
            var idF = v.id;
            var secret = v.secret;
            /*appends the data to the html document*/
            $("#flick").append('<img src="https://farm' + farm + '.staticflickr.com/' + serve + '/' + idF + '_' + secret + '.jpg" alt="" />');
        });
    });
    /*picks out data from the .json file*/
    var json = "accordion.json";
    $.getJSON(json, function(data){
        $.each(data, function () {
            $.each(this, function (k, v) {
                /*appends the data to the html document*/
                $('.accord').append("<h3>" + v.label + "</h3>" +
                "<div><p>" + v.box + "</p></div>");
            });
        });
        /*creates and styles accessibility with accordion widget*/
        $("#accordion").accordion({
            event: "click",
            heightStyle: "content",
            collapsible: true
        });
        /*toggles the accordion_text class*/
        $("#accordion p").toggleClass('accordion_text');
    });
});

