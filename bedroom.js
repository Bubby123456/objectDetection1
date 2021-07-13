bedroom_img="";
objects=[];
function setup() {
    canvas=createCanvas(480,380);
    canvas.center();

    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects"
}
function preload() {
    bedroom_img=loadImage("bedroom.jpg");
}
function modelLoaded() {
    console.log("COCO SSD LOADED");
    status=true;
    objectDetector.detect(bedroom_img,gotResults);
}
function draw() {
    image(bedroom_img,0,0,480,380);
    if (status != "") {
        
    
    for ( i=0; i < objects.length; i++) {
        document.getElementById("status").innerHTML="Status : Object detected !!";
        document.getElementById("number_of_objects").innerHTML="There are 6 big objects in the room but the model has detected "+objects.length;+" objects"
        fill("#FF0000");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+ " "+ percent+ "%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}
function gotResults(error,results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}