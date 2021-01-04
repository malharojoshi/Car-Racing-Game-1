var box;
var position, database;
function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  box = createSprite(250, 250, 10, 10);
  box.shapeColor = "red";
  var boxPosition = database.ref("ball/position");
  boxPosition.on("value", readPosition, showError);
}

function draw() {
  background("white");
  if (position !== undefined)
    if (keyDown(LEFT_ARROW)) {
      changePosition(-1, 0);
    } else if (keyDown(RIGHT_ARROW)) {
      changePosition(1, 0);
    } else if (keyDown(UP_ARROW)) {
      changePosition(0, -1);
    } else if (keyDown(DOWN_ARROW)) {
      changePosition(0, +1);
    }
  drawSprites();
}

function changePosition(x, y) {
  database.ref("ball/position").set({
    x: position.x + x,
    y: position.y + y,
  });
}
function readPosition(data) {
  position = data.val();
  console.log(position.x);
  box.x = position.x;
  box.y = position.y;
}
function showError() {
  console.log("Error in writing to the database.");
}
