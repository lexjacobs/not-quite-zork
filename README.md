Not Quite Zork
==============

##Game engine inspired by a job interview question.

###Currently operating as more of a 'choose your own adventure' story engine. Interactivity is currently limited to picking up and dropping objects anywhere in the maze realm, and finding them there again when you return (during the current session only. Will not survive page refresh yet!)

Format if you want to run your own worlds:

Your 'world' object must contain:
* An array of rooms, with each room containing:
  * roomTitle
  * roomNumber
  * An array of roomItems
  * A roomDescription
  * roomDoors keyed to N,E,S,W and the room number that the door will take you to
  * whether or not this room is the final goal

* start: number that corresponds to what is the first room visited in the world.
