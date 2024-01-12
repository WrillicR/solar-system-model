This is my Solar System Model interface. I created it originally as a way of playing with JavaScript and jQuery, but I have since recreated it as a React App. 

[View Live](https://solar-system-model.onrender.com)  

**(Please note that the project is hosted on Render and may take a few minutes to load.)**

## How It Works

The model utilizes the VSOP87 (French acronym of "Secular Variation of the Planet's Orbits 1987") mathematical model of the solar system.

The VSOP formulas take a given Julian Calendar Date value `julian` and returns the (x,y) coordinate data of each planet. The angle is found using the `arctan` function.

`(x, y) = getplanet ( julian )`

`angle = arctan ( y / x )`

Each planet is then transformed using rotate ( angle ) with the sun as its origin to set it at the correct angle.

In order to animate the model, the revolution speed (e.g. 1 day/s) is taken and divided by the framerate (e.g. 1/60 days/s) and added to the `julian` date value. The operation is done 60 times every second, so that the date is updated to:

`julian = julian + speed`

Each planet is updated accordingly, 60 times per second.

## Technologies Used

The following technologies were used in making this interface.

1. JavaScript
2. React
3. Next.JS
4. Tailwind CSS
5. SVG
