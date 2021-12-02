// particlesJS("particles-js", {
//     "particles": {
//         "number": {
//             "value": 80,
//             "density": {
//                 "enable": true,
//                 "value_area": 800
//             }
//         },
//         "color": {
//             "value": "#0059ff"
//         },
//         "shape": {
//             "type": "circle",
//             "stroke": {
//                 "width": 0,
//                 "color": "#000000"
//             },
//             "polygon": {
//                 "nb_sides": 5
//             },
//             "image": {
//                 "src": "img/github.svg",
//                 "width": 100,
//                 "height": 100
//             }
//         },
//         "opacity": {
//             "value": 0.5,
//             "random": false,
//             "anim": {
//                 "enable": false,
//                 "speed": 1,
//                 "opacity_min": 0.1,
//                 "sync": false
//             }
//         },
//         "size": {
//             "value": 3,
//             "random": true,
//             "anim": {
//                 "enable": false,
//                 "speed": 40,
//                 "size_min": 0.1,
//                 "sync": false
//             }
//         },
//         "line_linked": {
//             "enable": false,
//             "distance": 150,
//             "color": "#ffffff",
//             "opacity": 0.4,
//             "width": 1
//         },
//         "move": {
//             "enable": true,
//             "speed": 6,
//             "direction": "none",
//             "random": false,
//             "straight": false,
//             "out_mode": "out",
//             "bounce": false,
//             "attract": {
//                 "enable": false,
//                 "rotateX": 600,
//                 "rotateY": 1200
//             }
//         }
//     },
//     "interactivity": {
//         "detect_on": "canvas",
//         "events": {
//             "onhover": {
//                 "enable": true,
//                 "mode": "repulse"
//             },
//             "onclick": {
//                 "enable": true,
//                 "mode": "push"
//             },
//             "resize": true
//         },
//         "modes": {
//             "grab": {
//                 "distance": 400,
//                 "line_linked": {
//                     "opacity": 1
//                 }
//             },
//             "bubble": {
//                 "distance": 400,
//                 "size": 40,
//                 "duration": 2,
//                 "opacity": 8,
//                 "speed": 3
//             },
//             "repulse": {
//                 "distance": 200,
//                 "duration": 0.4
//             },
//             "push": {
//                 "particles_nb": 4
//             },
//             "remove": {
//                 "particles_nb": 2
//             }
//         }
//     },
//     "retina_detect": true
// });

//LLAMADA A LA ACCION BOTON - INICIO
// var c = document.getElementById('canvas2');
// var ctx = c.getContext('2d');
// var btn = document.getElementsByClassName('btn_cta')[0];
//
// c.width =150;
// c.height = 70;
//
// var mouseX = c.width;
// var mouseY = c.height;
// var txtPosition = 0;
//
// var particles = [];
//
// btn.addEventListener('mouseup', function(e){
//     mouseX = e.clientX;
//     mouseY = e.clientY;
//
//     createParticles();
//     changeText();
// });
//
// setTimeout(function(){
//     createParticles();
// }, 250);
//
// draw();
//
// function draw(){
//
//     drawBg();
//     incParticles();
//     drawParticles();
//
//     window.requestAnimationFrame(draw);
//
// }
//
// function drawBg(){
//     ctx.rect(0, 0, c.width, c.height);
//     ctx.fillStyle = "rgb(40, 45, 50)";
//     ctx.fill();
// }
//
// function drawParticles(){
//     for(i = 0; i < particles.length; i++){
//         ctx.beginPath();
//         ctx.arc(particles[i].x,
//             particles[i].y,
//             particles[i].size,
//             0,
//             Math.PI * 2);
//         ctx.fillStyle = particles[i].color;
//         ctx.closePath();
//         ctx.fill();
//     }
// }
//
// function incParticles(){
//     for(i = 0; i < particles.length; i++){
//         particles[i].x += particles[i].velX;
//         particles[i].y += particles[i].velY;
//
//         particles[i].size = Math.max(0, (particles[i].size - .05));
//
//         if(particles[i].size === 0){
//             particles.splice(i, 1);
//         }
//     }
// }
//
// function createParticles(){
//     for(i = 0; i < 30; i++){
//         particles.push({
//             x: mouseX,
//             y: mouseY,
//             size: parseInt(Math.random() * 10),
//             color: 'rgb(' + ranRgb() + ')',
//             velX: ranVel(),
//             velY: ranVel()
//         });
//     }
// }
//
// function ranRgb(){
//     var colors = [
//         '255, 122, 206',
//         '0, 157, 255',
//         '0, 240, 168',
//         '0, 240, 120'
//     ];
//
//     var i = parseInt(Math.random() * 10);
//
//     return colors[i];
// }
//
// function ranVel(){
//     var vel = 0;
//
//     if(Math.random() < 0.5){
//         vel = Math.abs(Math.random());
//     } else {
//         vel = -Math.abs(Math.random());
//     }
//
//     return vel;
// }
//
// // Text
//
// var btnTxt = [
//     'Descarga!!!',
//     'Descarga Yaa!!!',
// ];
//
// function changeText(){
//     if(txtPosition !== btnTxt.length){
//         btn.innerHTML = btnTxt[txtPosition];
//         txtPosition += 1;
//     }
// }
//LLAMADA A LA ACCION BOTON - FIN

//VIDEOs - INICIO


$(document).ready(function(){
    function toggle_video_modal() {
        $(".js-trigger-video-modal").on("click", function(e){
            e.preventDefault();
            var id = $(this).attr('data-youtube-id');
            var autoplay = '?autoplay=1';
            var related_no = '&rel=0';
            var src = '//player.vimeo.com/video/'+id+autoplay+related_no;
            $("#youtube").attr('src', src);
            $("body").addClass("show-video-modal noscroll");
        });
        // Close and Reset the Video Modal
        function close_video_modal() {
            event.preventDefault();
            $("body").removeClass("show-video-modal noscroll");
            $("#youtube").attr('src', '');
        }
        $('body').on('click', '.close-video-modal, .video-modal .overlay', function(event) {
            close_video_modal();
        });
        $('body').keyup(function(e) {
            if (e.keyCode == 27) {
                close_video_modal();
            }
        });
    }
    toggle_video_modal();
});
//VIDEOS - FIN

//animation phone
$(document).ready(function() {

    if( document.getElementById("owl-demo") !==null) {
        var owl = $("#owl-demo");
        owl.owlCarousel({
            items: 1,
            singleItem: true,
            loop: true,
            autoplay: true,
            autoPlay: 5000
        })

        $('.phone1').click(function () {
            owl.trigger('to.owl.carousel', 0);
            owl.trigger('stop.owl.autoplay')
        });
        $('.phone2').click(function () {
            owl.trigger('to.owl.carousel', 1);
            owl.trigger('stop.owl.autoplay')
        });
        $('.phone3').click(function () {
            owl.trigger('to.owl.carousel', 2);
            owl.trigger('stop.owl.autoplay')
        });
        $('.phone4').click(function () {
            owl.trigger('to.owl.carousel', 3);
            owl.trigger('stop.owl.autoplay')
        });
        $('.phone5').click(function () {
            owl.trigger('to.owl.carousel', 4);
            owl.trigger('stop.owl.autoplay')
        });
        $('.phone6').click(function () {
            owl.trigger('to.owl.carousel', 5);
            owl.trigger('stop.owl.autoplay')
        });
    }
});
//scroll to element phone just in phone
function scrollFunction() {
    let e = document.getElementById("phone_expo");
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)){
        e.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
            inline: 'start'
        });
    }
}
//animation phone fin


/**
 * The stars in our starfield!
 * Stars coordinate system is relative to the CENTER of the canvas
 * @param  {number} x
 * @param  {number} y
 */
var Star = function(x, y, maxSpeed) {
    this.x = x;
    this.y = y;
    this.slope = y / x; // This only works because our origin is always (0,0)
    this.opacity = 0;
    this.speed = Math.max(Math.random() * maxSpeed, 1);
};

/**
 * Compute the distance of this star relative to any other point in space.
 *
 * @param  {int} originX
 * @param  {int} originY
 *
 * @return {float} The distance of this star to the given origin
 */
Star.prototype.distanceTo = function(originX, originY) {
    return Math.sqrt(Math.pow(originX - this.x, 2) + Math.pow(originY - this.y, 2));
};

/**
 * Reinitializes this star's attributes, without re-creating it
 *
 * @param  {number} x
 * @param  {number} y
 *
 * @return {Star} this star
 */
Star.prototype.resetPosition = function(x, y, maxSpeed) {
    Star.apply(this, arguments);
    return this;
};

/**
 * The BigBang factory creates stars (Should be called StarFactory, but that is
 * a WAY LESS COOL NAME!
 * @type {Object}
 */
var BigBang = {
    /**
     * Returns a random star within a region of the space.
     *
     * @param  {number} minX minimum X coordinate of the region
     * @param  {number} minY minimum Y coordinate of the region
     * @param  {number} maxX maximum X coordinate of the region
     * @param  {number} maxY maximum Y coordinate of the region
     *
     * @return {Star} The random star
     */
    getRandomStar: function(minX, minY, maxX, maxY, maxSpeed) {
        var coords = BigBang.getRandomPosition(minX, minY, maxX, maxY);
        return new Star(coords.x, coords.y, maxSpeed);
    },

    /**
     * Gets a random (x,y) position within a bounding box
     *
     *
     * @param  {number} minX minimum X coordinate of the region
     * @param  {number} minY minimum Y coordinate of the region
     * @param  {number} maxX maximum X coordinate of the region
     * @param  {number} maxY maximum Y coordinate of the region
     *
     * @return {Object} An object with random {x, y} positions
     */
    getRandomPosition: function(minX, minY, maxX, maxY) {
        return {
            x: Math.floor((Math.random() * maxX) + minX),
            y: Math.floor((Math.random() * maxY) + minY)
        };
    }
};

/**
 * Constructor function of our starfield. This just prepares the DOM nodes where
 * the scene will be rendered.
 *
 * @param {string} canvasId The DOM Id of the <div> containing a <canvas> tag
 */
var StarField = function(containerId) {
    if(document.body.contains(document.getElementById(containerId))){
        this.container = document.getElementById(containerId);
        this.canvasElem = this.container.getElementsByTagName('canvas')[0];
        this.canvas = this.canvasElem.getContext('2d');

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.starField = [];
    }
};

/**
 * Updates the properties for every star for the next frame to be rendered
 */
StarField.prototype._updateStarField = function() {
    var i,
        star,
        randomLoc,
        increment;

    for (i = 0; i < this.numStars; i++) {
        star = this.starField[i];

        increment = Math.min(star.speed, Math.abs(star.speed / star.slope));
        star.x += (star.x > 0) ? increment : -increment;
        star.y = star.slope * star.x;

        star.opacity += star.speed / 100;

        // Recycle star obj if it goes out of the frame
        if ((Math.abs(star.x) > this.width / 2) ||
            (Math.abs(star.y) > this.height / 2)) {
            //randomLoc = BigBang.getRandomPosition(
            //    -this.width / 2, -this.height / 2,
            //       this.width, this.height
            //);
            randomLoc = BigBang.getRandomPosition(
                -this.width / 10, -this.height / 10,
                this.width / 5, this.height / 5
            );
            star.resetPosition(randomLoc.x, randomLoc.y, this.maxStarSpeed);
        }
    }
};

/**
 * Renders the whole starfield (background + stars)
 * This method could be made more efficient by just blipping each star,
 * and not redrawing the whole frame
 */
StarField.prototype._renderStarField = function() {
    var i,
        star;
    // Background
    this.canvas.fillStyle = "#000033";
    this.canvas.fillRect(0, 0, this.width, this.height);
    // Stars
    for (i = 0; i < this.numStars; i++) {
        star = this.starField[i];
        this.canvas.fillStyle = "rgba(255, 255, 255, " + star.opacity + ")";
        this.canvas.fillRect(
            star.x + this.width / 2,
            star.y + this.height / 2,
            2, 2);
    }
};

/**
 * Function that handles the animation of each frame. Update the starfield
 * positions and re-render
 */
StarField.prototype._renderFrame = function(elapsedTime) {
    var timeSinceLastFrame = elapsedTime - (this.prevFrameTime || 0);

    window.requestAnimationFrame(this._renderFrame.bind(this));

    // Skip frames unless at least 30ms have passed since the last one
    // (Cap to ~30fps)
    if (timeSinceLastFrame >= 30 || !this.prevFrameTime) {
        this.prevFrameTime = elapsedTime;
        this._updateStarField();
        this._renderStarField();
    }
};

/**
 * Makes sure that the canvas size fits the size of its container
 */
StarField.prototype._adjustCanvasSize = function(width, height) {
    // Set the canvas size to match the container ID (and cache values)
    this.width = this.canvasElem.width = width || this.container.offsetWidth;
    this.height = this.canvasElem.height = height || this.container.offsetHeight;
};

/**
 * This listener compares the old container size with the new one, and caches
 * the new values.
 */
StarField.prototype._watchCanvasSize = function(elapsedTime) {
    var timeSinceLastCheck = elapsedTime - (this.prevCheckTime || 0),
        width,
        height;

    window.requestAnimationFrame(this._watchCanvasSize.bind(this));

    // Skip frames unless at least 333ms have passed since the last check
    // (Cap to ~3fps)
    if (timeSinceLastCheck >= 333 || !this.prevCheckTime) {
        this.prevCheckTime = elapsedTime;
        width = this.container.offsetWidth;
        height = this.container.offsetHeight;
        if (this.oldWidth !== width || this.oldHeight !== height) {
            this.oldWidth = width;
            this.oldHeight = height;
            this._adjustCanvasSize(width, height);
        }
    }
};

/**
 * Initializes the scene by resizing the canvas to the appropiate value, and
 * sets up the main loop.
 * @param {int} numStars Number of stars in our starfield
 */
StarField.prototype._initScene = function(numStars) {
    var i;
    for (i = 0; i < this.numStars; i++) {
        this.starField.push(
            BigBang.getRandomStar(-this.width / 2, -this.height / 2, this.width, this.height, this.maxStarSpeed)
        );
    }

    // Intervals not stored because I don't plan to detach them later...
    window.requestAnimationFrame(this._renderFrame.bind(this));
    window.requestAnimationFrame(this._watchCanvasSize.bind(this));
};

/**
 * Kicks off everything!
 * @param {int} numStars The number of stars to render
 * @param {int} maxStarSpeed Maximum speed of the stars (pixels / frame)
 */
StarField.prototype.render = function(numStars, maxStarSpeed) {
    this.numStars = numStars || 100;
    this.maxStarSpeed = maxStarSpeed || 3;

    this._initScene(this.numStars);
};

/**
 * requestAnimationFrame shim layer with setTimeout fallback
 * @see http://paulirish.com/2011/requestanimationframe-for-smart-animating
 */
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Kick off!
if(document.body.contains(document.getElementById("bottom-cta-bg"))) {
    var starField = new StarField('bottom-cta-bg').render(333, 3);
}
