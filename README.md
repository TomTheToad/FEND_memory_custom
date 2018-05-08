# FEND_memory_custom

<h3>Custom Memory Card Game</h3>
<h4>Created by Victor Asselta (aka TomTheToad)</h4>

<h3>Objective</h3>
<p>To build a custom, dynamic memory card game from scratch, mostly.</p>

<h3>Description</h3>
<p>This memory card game is a browser based game which displays a four by four grid of game cards, a score, timer, and basic button controls for game reset and theme selection.The user "flips" cards, two at a time, revealing a theme related back image. This game was created to satisfy a Udacity Front End Nanodegree assignment.</p>

<p>The game currently displays two themes which can be selected by the user. The carnival theme is based on carnival rides, games, and associated images. The New York City game displays notable buildings and statues from New York City.</p>

<h3>Photo Credits</h3>
<p>All images, not created by myself, were originally from royalty free sites <a href="https://unsplash.com">Unsplash.com</a> and <a href="https://www.pexels.com">Pexels.com</a>. Each image name contains as much of the original name as possible so they can be found on the aforementioned sites. Normally I would use my own imagery but, as this was a Udacity based assigment and time was a factor, I elected to use images generously offered up for free use by their creators. I would like to thank the contributors to <a href="https://unsplash.com">Unsplash.com</a> and <a href="https://www.pexels.com">Pexels.com</a> for this wonderful resource.</p>

<h3>What I did</h3>
<p>This project started out as a basic logic assignment from Udacity's Front End Nanodegree program. We, the students, had the option of using given starter code or attempting a build from scratch. I decided I'd build the project from scratch. I borrowed a shuffle function from the starter code but that was all. It's been a long time since I had done anything with javascript and I thought that this would be a great opportunity, read struggle, to learn the very updated language. I found this to be a challenge, coming from type safe languages with, what seems like, better defined core elements and class definitions. The last item presented the biggest challenge. I decided that I would try and take a more object oriented approach. I'm not sure I was entirely successful but, I will say, that I learned quite a bit about the make up javascript. This project represents a "first attempt" at testing the waters in javascript.</p>

<h3>Running the app</h3>
<p>This application is browser based and you should simply, assuming the below listed file structure is intact, be able to open the index.html file in any major, compatible browser.</p>

<h3>File Structure</h3>

<pre>
<code>
customCardGame
  |-- css
        |-- app.css
  |--images
        |-- star.png
        |-- themes]
              |-- (associated theme images, too many to list)
  |-- js
      |-- memory-game-theme-packs.js
      |-- memory-game-theme-functions.js
      |-- memory-game-item-constructor.js
      |-- memory-game-timer.js
      |-- memory-game-clock-functions.js
      |-- memory-game-build-functions.js
      |-- memory-game-main.js
 </code>
 </pre>
