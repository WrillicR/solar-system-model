This is my Solar System Model interface. I created it originally as a way of playing with JavaScript and jQuery, but I have since recreated it as a React App. 

##How It Works

The model utilizes the VSOP87 (French acronym of "Secular Variation of the Planet's Orbits 1987") mathematical model of the solar system.

The VSOP formulas take a given Julian Calendar Date value julian and returns the (x,y) coordinate data of each planet. The angle is found using the arctan function.

(x, y) = getplanet ( julian )

angle = arctan ( y / x )

The revolution speed (e.g. 1 day/s) is taken and divided by the framerate (e.g. 1/60 days/s) and added to the julian date value. The operation is done 60 times every second, so that the date is updated to:

julian = julian + speed

Each planet is then transformed using rotate ( angle ) with the sun as its origin to set it at the correct angle.
