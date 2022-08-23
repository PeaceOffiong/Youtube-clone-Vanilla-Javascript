//controls functionality
const video_player = document.querySelector('.video-container');
mainVideo = document.getElementById('main-video');
progressAreaTime = document.querySelector('.progressAreaTime');
controls = document.querySelector('.controls');
progressArea = document.querySelector('.progress-area');
progressBar = document.querySelector('.progress-bar');
play_pause = document.querySelector('.play_pause');
fastForward = document.querySelector('.fast-forward');
volume_range = document.querySelector('.volume_range');
current = document.querySelector('.current');
totalDuration = document.querySelector('.duration');
auto_play = document.querySelector('.auto-play');
settingsBtn = document.querySelector('.settingsBtn');
picture_in_picture = document.querySelector('.picture-in-picture');
fullscreen = document.querySelector('.fullscreen');
settings = document.querySelector('#settings');
playback = document.querySelector('.playback');
i = document.querySelector(".fas.fa-volume-up");
form = document.querySelector("search-bar");
const showmore = document.querySelector(".expansion")

// // eventListeners
play_pause.addEventListener("click", pause_play)

function pause_play(){
    const isVideoPaused = video_player.classList.contains("paused");
    isVideoPaused ? pauseVideo(): playVideo();
};

fastForward.addEventListener("click", function(){
    mainVideo.currentTime += 01;
});

mainVideo.addEventListener("pause", function(){
    pauseVideo();
})

mainVideo.addEventListener("play", function(){
    playVideo();
})

mainVideo.addEventListener("loadeddata", (e)=>{
    let videoDuration = e.target.duration;
    let totalMin = Math.floor(videoDuration / 60);
    let totalSec = Math.floor(videoDuration % 60);
    totalSec < 10 ? totalSec = "0"+totalSec : totalSec;
    totalDuration.innerHTML = `${totalMin} : ${totalSec}` 

});

mainVideo.addEventListener("timeupdate", (e)=>{
    let currentvideoTime = e.target.currentTime;
    let currentMin = Math.floor(currentvideoTime / 60);
    let currentSec = Math.floor(currentvideoTime % 60);
    currentSec < 10 ? currentSec = "0"+currentSec : currentSec;
    current.innerHTML = `${currentMin} : ${currentSec}`

    let videoDuration = e.target.duration;
    let progressWidth = (currentvideoTime/videoDuration) *100;
    progressBar.style.width = `${progressWidth}%`
});


//functions
function playVideo(){
    play_pause.innerHTML = "pause";
    play_pause.title = "pause";
    video_player.classList.add("paused");
    mainVideo.play()
};

function pauseVideo(){
    play_pause.innerHTML = "play_arrow";
    play_pause.title = "play";
    video_player.classList.remove("paused");
    mainVideo.pause();
};

progressArea.addEventListener("click", function(e){
    let videoDuration = mainVideo.duration;
    let progressWidthval = progressArea.clientWidth;
    let ClickOffsetX = e.offsetX;

    mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
})


function changeVolume(){
    mainVideo.volume = volume_range.value / 100;
}

volume_range.addEventListener('change', ()=>{
    changeVolume();
})

auto_play.addEventListener('click', function(){
    auto_play.classList.toggle('active');
    if(auto_play.classList.contains("active")){
        auto_play.title = "Autoplay is on";
    }else{
        auto_play.title = "Autoplay is off";
    }
});

mainVideo.addEventListener("ended", ()=>{
    if(auto_play.classList.contains("active")){
       playVideo(); 
    }else{
        play_pause.innerHTML = "replay";
        play_pause.title = "replay";
    }
});

picture_in_picture.addEventListener("click", ()=>{
    mainVideo.requestPictureInPicture();
});

fullscreen.addEventListener("click", ()=>{
    if(video_player.classList.contains("openFullScreen")){
        video_player.classList.add("openFullScreen");
        fullscreen.innerHTML = "fullscreen_exit";
        video_player.requestFullscreen();
    } else{
        video_player.classList.add("openFullScreen");
        fullscreen.innerHTML = "fullscreen";
        document.exitfullscreen();
    }
});

settingsBtn.addEventListener("click", ()=>{
    settings.classList.toggle("active");
    settingsBtn.classList.toggle("active");
});

// video_player.addEventListener("mouseover", ()=>{
//     controls .classList.add("active");
// });

// video_player.addEventListener("mouseleave", ()=>{
//     if(video_player.classList.contains("paused")){
//        if(settingsBtn.classList.contains("active")){
//           controls.classList.add("active");
//         }else{
//             controls.classList.remove("active")
//         }
//     }else{
//         controls.classList.add("active");
//     }
// });


// toggle
const toggleBtn = document.querySelector(".nav-toggle");
const insideToggleBtn = document.querySelector(".nav-toggle2");
const sliderBar = document.querySelector(".slidebar");
const body = document.querySelector(".body");

toggleBtn.addEventListener("click", function(){
    sliderBar.classList.add("show-sidebar");
    hidescrollbar();
});

function hidescrollbar(){
    body.classList.add("hide-scrollbar");
};

insideToggleBtn.addEventListener("click", function(){
    sliderBar.classList.remove("show-sidebar");
    replaceScrollbar();
});

function replaceScrollbar(){
    body.classList.remove("hide-scrollbar");
};

//automatic inclusion 


// fixed navbar
window.addEventListener('scroll', function(){
    // const scrollHeight = window.pageYOffset;
    // const navHeight = navbar.getBoundingClientRect().height;
    // if(scrollHeight > navHeight){
    //     navbar.classList.add('sticky');
    // }else{
    //     navbar.classList.remove('sticky')
    // }
    const navbar = document.querySelector('.nav');
    navbar.classList.toggle("sticky", window.scrollY > 0);
})

// views and date

const views = document.querySelector(".views");
const date = document.querySelector(".date");
const viewsNumber = document.querySelector(".views-number");
const titleLeft  = document.querySelector(".title-left");
const titleRight = document.querySelector(".title-right");
const description = document.querySelector(".description");

window.addEventListener("resize", checkwidth, shortForm);

checkwidth();
newKini();
shortForm();

function checkwidth(){
    const triggerDisapearance = window.innerWidth;
    titleLeftwidth = titleLeft.offsetWidth.valueOf();
    titleRightwidth = titleRight.offsetWidth.valueOf();
    totalWidth = titleLeftwidth + titleRightwidth.valueOf();
    if(triggerDisapearance < totalWidth.valueOf()){
        date.classList.add("hide");
    } else if(triggerDisapearance > 703){
        date.classList.remove("hide");
    }else{
        return newKini();
    }
    newKini();
};

function newKini(){
    const newTotalWidth = titleLeftwidth + titleRightwidth;
    const triggerDisapearance = window.innerWidth;
    titleLeftwidth = titleLeft.offsetWidth;
    titleRightwidth = titleRight.offsetWidth;
    if(triggerDisapearance < newTotalWidth){
        views.classList.add("hide");
    }else if(triggerDisapearance > 614){
        views.classList.remove("hide")
    }
    shortForm();
}; 

function shortForm(){
    if(views.classList.contains("hide") &&  viewsNumber.innerHTML > 900){
        return viewsNumber.innerHTML + "k";
    };
    console.log(views.classList.contains("hide"));
    console.log(viewsNumber.innerHTML > 900);
};

showmore.addEventListener("click", showMore)

function showMore(e) {
    console.log(e.previousSibling);
}