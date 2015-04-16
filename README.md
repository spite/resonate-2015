###Resonate 2015 Workshop###
#Experimenting with today's web technologies#
###Creating online interactive music videos###

We live in a time and society where music and data are prevalent. We like to experience music in many ways, and one of them is making visible the invisible, intangible nature of music, through digital synesthesia. We use all kinds of representations to understand music and discover new relations with other media. We explore relations of sets of information using computers. We're going to explore what tools and technologies does the web provide to work with music and visual metaphors, and how can we use that knowledge to create interactive music videos.

We'll go step by step through the different ways of creating interactive visual experiences. From the basic techniques used to put pixels on screen to more complex ways of synchronising animations to sound and rhythm, participants will learn how to manage drawing in a 2D context, drawing in a 3D context, connect sound to their images and animations, and create interactive visuals. We'll go through the basics of 2D and 3D APIs, and sound synthesis and analysis.

We will be using JavaScript, the language of the web, more and more widespread everyday. JavaScript is a functional programming language that allows highly interactive and iterative process, and largely reduces the friction when getting started with creative coding. We'll also be using associated web technologies, like Canvas, WebGL and Web Audio, to name a few.

Participants will learn how to start a project, integrate libraries, use available tools and complete their own vision of a real-time interactive music video.

####Requirements####

JavaScript knowledge required. We will prepare a complete library of methods for all participants, there's no need to be worried about getting stuck: we'll provide even sample drawing routines, and animations.

Some previous familiarity with 2D and 3D drawing APIs is recommended: LOGO is fine, Processing is even better!

Laptop with OS X, Windows, or Linux, that can run a browser with WebGL (Firefox, Chrome, Internet Explorer), Chrome or Firefox advised.

Headphones.

Recommended: a mobile phone with a modern OS and browser, like Android 4+ or iOS 7+.

#### Code editors ####

These are some suggerences for code editors:

- Windows: [Notepad++](http://notepad-plus-plus.org/)
- OSX: [Sublime Text](http://www.sublimetext.com/)
- Linux: vi or emacs :)
- Multiplatform: [atom](https://atom.io/)

#### How to run code locally ####

- Windows: Use [mongoose](https://code.google.com/p/mongoose/)
- OSX: There's a pre-installed web server for PHP apps, just go to /sandbox and run ``php -S 0.0.0.0:8000``. Alternatively, you can use [asdf](https://www.npmjs.com/package/asdf)
- Linux: go to /sandbox and run ``python -m SimpleHTTPServer```
- If nothing of the previous works, try running Chrome with the flags ``--disable-web-security``

#### Structure ####

The folder ``sandbox`` contains the files.

- ``index.html`` example of [2D Canvas](http://cheatsheetworld.com/programming/html5-canvas-cheat-sheet/) rendering
- ``index3d.html`` example of 3D WebGL rendering with [three.js](http://threejs.org/docs/)

#### License ####

MIT licensed

Copyright (C) 2015
Jaume Sanchez Elias http://www.clicktorelease.com
Ricardo Cabello http://mrdoob.com
