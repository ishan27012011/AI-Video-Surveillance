status = "";
objects = [];
video = "";

function preload() {
    video = createVideo("video.mp4");
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide()
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("numberOfObjectsDetected").innerHTML = "Number of objects detected: " + objects.length;
            document.getElementById("status").innerHTML = "Status: Detected Objects";
            percentage = floor(objects[i].confidence * 100);
            fill("red");
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}


function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0.5);
    console.log("Model Loaded")
}