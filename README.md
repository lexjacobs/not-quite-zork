Not Quite Zork
==============

##Game engine for you to create your own choose-your-own-adventure stories, and invite people to interactively walk through them.

###In process: interactivity is currently limited to picking up and dropping objects anywhere in the maze realm, and finding them there again when you return (during the current session only. Will not survive page refresh yet!)

TODO:

* Allow for a default setting that reveals available directions without having to type 'look'.
* Allow for saving current progress.
* Incorporate 'localstorage' for persistance between accidental page loads or browser navigation.
* Allow for the interaction between carried objects and in-world scenarios.

Here is the JSON object format if you want to run your own worlds:
**ENSURE** that your JSON formatting is correct, with double quotes around all keys.

Your 'world' object must contain:
* An array of rooms, with each room containing:
  * roomTitle
  * roomNumber
  * An array of roomItems
  * A roomDescription
  * roomDoors keyed to N,E,S,W and the room number that the door will take you to
  * whether or not this room is the final goal

* start: number that corresponds to what is the first room visited in the world.
