Not Quite Zork
==============

##Game engine inspired by a job interview question.

Format if you want to run your own worlds:

Your 'world' object must contain:
* An array of rooms, with each room containing:
  * roomTitle
  * roomNumber
  * An array of roomItems
  * A roomDescription
  * roomDoors keyed to N,E,S,W and the room number that the door will take you to
  * whether or not this room is the final goal

* start: which corresponds to what is the first room in the world.
