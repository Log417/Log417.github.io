const container = $('.container');
const circle = $('#main');

let itemSize = 80;
let countCirlce = 1;
let winWidth = 0;
const list = [
    [

        {
            title: "WebBeautyBook",
            links:{
                git: "https://github.com/Ch-Tima/WebBeautyBook",
                web: "https://appwebbeautybook.azurewebsites.net"
            },
            img: ""
        },
        {
            title: "CurrencyConverter",
            links:{
                git: "https://github.com/Ch-Tima/CurrencyConverter",
                kofi: "https://ko-fi.com/i/IL4L5LHX6E",
                playStore: "https://play.google.com/store/apps/details?id=com.chtima.currencyconverter"
            },
            img: "img/CC.png"
        },
        {
            title: "Movie",
            links:{
                git: "https://github.com/Ch-Tima/Movie-net-6.0",
            },
            img: ""
        },
        {
            title: "Flashlight",
            links:{
                kofi: "https://ko-fi.com/i/IL4L5LHX6E",
                playStore: "https://play.google.com/store/apps/details?id=com.chtima.flashlight"
            },
            img: "img/F.png"
        }
    ], 
    [
        {
            title: "Guard",
            links:{
                git: "https://github.com/AN0NCER/guard",
            },
            img: "img/G.png"
        },
        {
            title: "Steam-lib",
            links:{
                git: "https://github.com/AN0NCER/steam-lib",
                nuget: "https://www.nuget.org/packages/SteamAuthStandart"
            },
            img: "img/G-lib.png"
        },
        {
            title: "WebAds",
            links:{
                git: "https://github.com/Ch-Tima/WebAds",
            },
            img: ""
        }
    ], 
    [
        {
            title: "SpaceInvaders",
            links:{
                git: "https://github.com/Ch-Tima/SpaceInvaders",
            },
            img: "img/SI.png"
        }
    ]
]

// var myScreenOrientation = window.screen.orientation;
// myScreenOrientation.lock("portrait");



$(function (){


    $(window).bind('orientationchange resize', function(event){
        if (event.orientation) {
          if (event.orientation == 'landscape') {
            if (window.rotation == 90) {
              rotate(this, -90);
            } else {
              rotate(this, 90);
            }
          }
        }
      });
    

    $(window).bind("resize", rerender);
    rerender();
});



function rotate(el, degs) {
    iedegs = degs/90;
    if (iedegs < 0) iedegs += 4;
    transform = 'rotate('+degs+'deg)';
    iefilter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+iedegs+')';
    styles = {
      transform: transform,
      '-webkit-transform': transform,
      '-moz-transform': transform,
      '-o-transform': transform,
      filter: iefilter,
      '-ms-filter': iefilter
    };
    $(el).css(styles);
  }


function createCircle(scale, indexProject){
    countCirlce++;
    let qE = $("<div>").addClass(countCirlce%2==0 ? "rotate-l" : "rotate-r").css({
        'width': circle.width()*scale,
        'height': circle.height()*scale,
        top: (circle.height()/2) -circle.height()*scale/2,
        left: (circle.width()/2) -circle.width()*scale/2,
        position: 'absolute'
    }).addClass('circle');
    addProjectes(qE, list[indexProject])
    return qE;
}

function rerender(){
    //cls
    $(".circle:not(#main)").remove();
    circle.children().remove();
    $("#hugeDetails").remove();
    countCirlce = 1;

    //calc item size
    winWidth = $(window).width();
    itemSize = winWidth >= 750 ? 80 : winWidth <= 750 && winWidth >= 540 ? 70 : 50
    
    //draw diograna
    addProjectes(circle, list[0])
    createCircle(0.68, 1).appendTo(container);
    createCircle(0.38, 2).appendTo(container);
}

function addProjectes(qE, arr){
    for (let i = 0; i < arr.length; i++) {
        var radius = qE.width()/2;
        var radians = (((360 / arr.length) * i) * (Math.PI / 180)) + countCirlce
        let item = $("<a>").attr("href",arr[i].link).css({
            'width': itemSize,
            'height': itemSize,
            'left': (radius * Math.cos((radians))) + radius - itemSize / 2,
            'top': (radius * Math.sin(radians)) + radius - itemSize / 2,
            'position': 'absolute'
        })
        .append($("<div>").addClass("item").css({
            "background-image": `url(${arr[i].img})`,
            "background-size": "90%",
            "background-position": "center",
            "background-repeat": "no-repeat"
        }).on("mouseenter", () => showDetails(arr[i], item)))
        .append($("<div>").addClass("item-details").css({
            width: `${175}px`,
            height: `${itemSize-5}px`,
            left: `${itemSize/2.25}px`,
        }));

        qE.append(item)
    }
}

function showDetails(event, element){
    console.log(event)

    let links = [];
    for (var key in event.links) {
        links.push($("<a>").attr("href", event.links[key]).append($("<img>").attr('src', `../assets/svg/${key}.svg`).css({
            'width': `${winWidth > 800 ? 28 : (winWidth < 800 && winWidth > 500 ? 55 : 35)}px`,
            'height': 'auto',
            'margin': `${winWidth < 800 ? 5 : 0}px ${winWidth < 800 ? 10 : 5}px`
        })))
    }

    if(winWidth < 800){
        $("#hugeDetails").remove();
        $("body").append
        (
            $("<div>").css({
                'width': '100%',
                'height': '13vh',
                'background': '#89d1d9',
                'position': 'absolute',
                'bottom': '0'
            }).attr("id", "hugeDetails")
            .append($("<p>").text(event.title).addClass("title-xxl"))
            .append($("<div>").addClass("df-center").append(links))
        )
    }else{
        let item = $(element).children(".item");
        let details = $(element).children(".item-details");

        details.children().remove();
        details.append($("<p>").text(event.title).addClass("text-center")).append($("<div>").addClass("df-center").append(links));
        
        item.addClass("item-on");
        details.addClass("item-details-on");

        // mouseout | mouseover
        details.on("mouseover",()=> {
            item.addClass("item-on");
            details.addClass("item-details-on");
            details.one("mouseout", ()=>{
                item.removeClass("item-on");
                details.removeClass("item-details-on");
            })
        });

        $(element).one("mouseout", ()=>{
            item.removeClass("item-on");
            details.removeClass("item-details-on")
        })
    }


}
