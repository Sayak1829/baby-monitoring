
Status = "";
objects = [];
alarm = "";
function preload(){
    alarm = loadSound("alarm.mp3");
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_detection = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("heading3").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(video, 0, 0,380, 380);
    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        object_detection.detect(video, gotresults);
        for ( index = 0; index < objects.length; index++) {
            document.getElementById("heading3").innerHTML = "Status: Objects Detected";
            fill(r,g,b);
            v1 = floor(objects[index].confidence * 100);
            text(objects[index].label + " " + v1 + "%", objects[index].x + 15, objects[index].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);
            
            if(objects[index].label =="Person"){
                document.getElementById("heading3_2").innerHTML = "Baby Found";
                alarm.stop();
            }
            else{
                document.getElementById("heading3_2").innerHTML = "Baby not Found";
                alarm.play();
            }
           
        }
        if (objects.length == 0) {
            document.getElementById("heading3_2").innerHTML = "Baby not Found";
            alarm.play();    
        }

    }

}
function modelloaded() {
    console.log('model loaded');
    Status = true;
}
function gotresults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
