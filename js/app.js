// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (500 * dt);
    if (this.x >= 500) {
        var random = Math.random((Math.random() * 250) + 150);
        this.x = -(random * 80);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This our Player Class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 300;
    this.y = 400;
};

// Render player image with his beginning position
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// this will update and check if enemy 
// is near a player then a player 
// will call reset function
Player.prototype.update = function() {
    allEnemies.forEach(function(enemy) {
        var range_x = Math.ceil(enemy.x) - player.x;
        var range_y = Math.ceil(enemy.y) - player.y;
        if (Math.abs(range_x) <= 10 && Math.abs(range_y) <= 5) {
            player.reset();
        }
    });
};

// this reset function it to make player
// back to position beginning
Player.prototype.reset =  function() {
    this.x = 300;
    this.y = 400;
};

// this function is to handle input from keyboard arrow
// to move the player
Player.prototype.handleInput = function(mv) {
    if (mv == 'left') {
        this.x = this.x - 100;
        if (this.x <= 0) {
            this.x = 0;
        }
    } 
    if (mv == 'right') {
        this.x = this.x + 100;
        if (this.x >= 400) {
            this.x = 400;
        }
    }

    if (mv == 'up') {
        if (this.y <= 300) {
            this.y = this.y - 90;
        } else {
            this.y = this.y - 100;
        }
        if (this.y <= 30) {
            this.y = 30;
        }
    }

    if (mv == 'down') {
        if (this.y <= 210) {
            this.y = this.y + 90;
        } else {
            this.y = this.y + 100;
        }
        if (this.y >= 400) {
            this.y = 400;
        }
    }
};

// all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 5; i++) {
    var enemy = new Enemy();
    if (i % 3 == 0) {
        enemy.x = -(i * 100);
        enemy.y = 210;
    } else if (i % 2 == 0) {
        enemy.x = -(i * 100);
        enemy.y = 120;
    }  else {
        enemy.x = -(i * 100);
        enemy.y = 30;
    };
    allEnemies.push(enemy);
};

// place Player object in instance called player
var player = new Player();


// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
