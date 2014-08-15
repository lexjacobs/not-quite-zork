($(function() {
  'use strict';
  var world;
  var currentRoom;
  var currentDoors;

  // initialize the global item stash, keyed by index=room number:  
  var globalItemStore = [];
  var playerItems = [];

  // function to change dom based on current room
  var roomPresenter = function(roomToPresent) {
    world.rooms.forEach(function(room) {
      if (room.roomNumber === roomToPresent) {
        currentRoom = roomToPresent;
        currentDoors = room.roomDoors;
        $('.room-title').text('You are in: ' + room.roomTitle);
        $('.room-description').text(room.roomDescription);
        $('.room-items').text('You notice these things here: ' + globalItemStore[currentRoom]);
        $('.moves-available').text('');
        if (playerItems.length === 0) {
          $('.player-items').text('You have on your person: ' + 'bupkis!');
        } else {
          $('.player-items').text('You have on your person: ' + playerItems);
        }
        if (room.goal) {
          $('.room-description').css({
            "font-size": "40px"
          });
          $('.player-input').detach();
          $('.player-submit').detach();
          $('body > *').delay(2000).fadeOut('slow');

          setTimeout(function() {
            $('body').html('<span>. . . dream</span>').css({
              "position": "absolute",
              "top": "170px",
              "left": "20%"
            });

            setInterval(function() {
              $('body > span').toggle();
            }, 800);

          }, 3010);
        }
      }
    });
  };

  var doorRevealer = function() {

    var directionKeys = {
      0: 'n',
      1: 'e',
      2: 's',
      3: 'w'
    };
    var directions = [];
    for (var i = 0; i < currentDoors.length; i++) {
      if (currentDoors[i]) {
        directions.push(directionKeys[i]);
      }
    }

    $('.moves-available').text('You can walk: ' + directions);
  };


  var playerHelp = function() {
    $('.room-description').html("<pre>'Look' = Reveals what you can see in the world\n" +
      "'Go' + direction (n,e,s,w) = Move in that direction\n" + "'Get' + (item name) = picks it up!\n" +
      "'Put' + (item name) = puts it down!\n'Doors' = when you get tired of bumping into walls!</pre>");
  };


  // function to decide what to do
  var playerActionInterpreter = function(input) {
    var verb = arguments[0];
    var adverb = Array.prototype.slice.call(arguments, 1);

    if (arguments[0] === 'help') {
      playerHelp();
      return null;
    }

    if (arguments[0] === 'look') {
      roomPresenter(currentRoom);
      return null;
    }

    if (arguments[0] === 'doors') {
      doorRevealer();
      return null;
    }

    if (arguments[0] === 'get') {
      for (var i = 0; i < globalItemStore[currentRoom].length; i++) {
        if (globalItemStore[currentRoom][i].toLowerCase() === adverb[0]) {
          var pickingUp = globalItemStore[currentRoom].splice(i, 1)[0];
          playerItems.push(pickingUp);
          roomPresenter(currentRoom);
          return null;
        }
      }
      $('.room-description').text("You can't always get what you want to!");
    }

    if (arguments[0] === 'put') {
      for (var i = 0; i < playerItems.length; i++) {
        if (playerItems[i].toLowerCase() === adverb[0]) {
          var puttingDown = playerItems.splice(i, 1)[0];
          if (globalItemStore[currentRoom] !== undefined) {
            globalItemStore[currentRoom].push(puttingDown);
          } else {
            globalItemStore[currentRoom] = [puttingDown];
          }

          roomPresenter(currentRoom);
          return null;
        }
      }
      $('.room-description').text("You can't put down what you didn't pick up!");
    }

    if (arguments[0] === 'go') {
      var directionKeys = {
        'n': 0,
        'e': 1,
        's': 2,
        'w': 3
      };
      var roomTransition = function(direction) {
        if (!currentDoors[direction]) {
          $('.room-description').text("BONK!");
          return false;
        } else {
          roomPresenter(currentDoors[direction]);
        }
      };
      roomTransition(directionKeys[adverb[0]]);
    }
  };


  // function to do things when player enters commands
  var playerInputParser = function(command) {
    // normalize and clean out spaces from the input
    command = command.toLowerCase();
    var entered = command.split(' ');
    for (var i = 0; i < entered.length; i++) {
      if (entered[i] === '') {
        entered.splice(i, 1);
        i--;
      }
    }
    playerActionInterpreter.apply(null, entered);
  };

  var init = function(worldFile) {

    // initialize dev environment with premade world-seed:
    world = worldFile;

    world.rooms.forEach(function(room) {
      var roomNum = room.roomNumber;
      var roomItems = room.roomItems;
      if (globalItemStore[roomNum] === undefined) {
        globalItemStore[roomNum] = roomItems;
      } else {
        globalItemStore[roomNum] = globalItemStore[roomNum].concat(roomItems);
      }
    });

    // listener for input
    $('.player-submit').on('click', function() {
      playerInputParser($('.player-input').val());
      $('.player-input').val('');
      $('.player-input').focus();
    });

    // where the story all begins;
    currentRoom = world.start;

    // start the story
    roomPresenter(currentRoom);
  };

  var jsonWorldLoader = function(world){
    if(arguments.length === 0){
      // console.log(arguments);
      // var worldData;

      // var reqListener = function(e) {
      //   console.log('in listener');
      //   worldData = JSON.parse(this.responseText);
      //   init(worldData);
      // };

      // var req = new XMLHttpRequest();
      // req.onload = reqListener;
      // req.open("get", "lib/world.json", true);
      // req.send();

      init(sampleWorld);

    } else {
      init(world);
    }

  };

  var initialWorldChooser = function(){
    $(".moves-available").html("<div>Paste your properly formatted JSON world below and click 'Upload World'</div>");
    $(".moves-available").append("<br><input class='worldJsonPaste'><br>");
    $(".moves-available").append("<br><button class='uploadWorld'>Upload World</button><br>");
    $(".moves-available").append("<br><div>Or click 'Start' to begin the default world</div>");
    $(".moves-available").append("<br><button class='defaultStart'>Start</button>");

    $('.defaultStart').on('click', function(){
      console.log('clicked');
      jsonWorldLoader();
    });

    $('.uploadWorld').on('click', function(){
      var pastedWorld = $('.worldJsonPaste').val();
      jsonWorldLoader(JSON.parse(pastedWorld));
    });

  };

  initialWorldChooser();

}));