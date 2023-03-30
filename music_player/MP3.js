let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'cover_page/switch.jpg',
        name : 'Switch',
        artist : '6LACK',
        music : 'music/6LACK_-_Switch_East_Atlanta_Love_L_(getmp3.pro).mp3'
    },
    {
        img : 'cover_page/lifeofpablo.jpg',
        name : '30 Hours',
        artist : 'Kanye West',
        music : 'music/30_Hours_(getmp3.pro).mp3'
    },
    {
        img : 'cover_page/attachment-Al-Green-Lets-Stay-Together-Album-Image.jpg',
        name : 'Lets Stay Together',
        artist : 'Al Green',
        music : 'music/Al_Green_-_Lets_Stay_Together_(getmp3.pro).mp3'
    },
    {
        img : 'cover_page/Aminé_ONEPOINTFIVE.webp',
        name : 'WHY',
        artist : 'Amine',
        music : 'music/Amin_-_WHY_Audio_(getmp3.pro).mp3'
    },
    {
        img : 'cover_page/hooligans.jpeg',
        name : 'Hooligans',
        artist : 'Baby Keem',
        music : 'music/Baby_Keem_-_hooligan_Official_Vide_(getmp3.pro).mp3'
    },
    {
        img : 'cover_page/clouds.jpg',
        name : 'Clouds Never Get Old',
        artist : 'Bas',
        music : 'music/Bas_-_Clouds_Never_Get_Old_Officia_(getmp3.pro).mp3'
    },
    {
        img : 'cover_page/lit.jpg',
        name : 'Lit',
        artist : 'Bas ft. J.Cole, KQuick',
        music : 'music/Bas_-_Lit_ft_J_Cole_KQuick_(getmp3.pro).mp3'
    },
    {
        img : 'cover_page/half.png',
        name : 'Halfway Off The Balcony',
        artist : 'Big Sean',
        music : 'music/Big_Sean_-_Halfway_Off_The_Balcony_(getmp3.pro).mp3'
    },
    {
        img : 'cover_page/iknow.jpg',
        name : 'I Know',
        artist : 'Big Sean',
        music : 'music/Big_Sean_-_I_Know_Feat_Jhen_Aik_(getmp3.pro).mp3'
    },
    {
        img : 'cover_page/DAMN.jpeg',
        name : 'BLOOD.',
        artist : 'Kendrick Lamar',
        music : 'music/BLOOD.mp3'
    },
    {
        img : 'cover_page/Is_This_Love_(Bob_Marley_&_The_Wailers_single_-_cover_art).jpg',
        name : 'Is This Love',
        artist : 'Bob Marley',
        music : 'music/Bob_Marley_-_Is_This_Love_(getmp3.pro).mp3'
    },
    {
        img : 'cover_page/satisfy.jpg',
        name : 'Satisfy My Soul',
        artist : 'Bob Marley',
        music : 'music/Bob_Marley_-_Satisfy_My_Soul_(getmp3.pro).mp3'
    },
    {
        img : 'cover_page/DAMN.jpeg',
        name : 'PRIDE.',
        artist : 'Kendrick Lamar',
        music : 'music/PRIDE - Kendrick Lamar (DAMN).mp3'
    },
    {
        img : 'cover_page/lifeisgood.jpeg',
        name : 'Life Is Good',
        artist : 'SiR',
        music : 'music/SiR - Life Is Good (Official Video) ft. Scribz Riley.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}