# Game-Arcade

ECS 162 Creative Assignment 2 :: JavaScript Game Arcade Website

My game arcade website has four games: Tic Tac Toe, Memory, Connect 4, and
Sliding Puzzle. The theme of this website is childish and feminine. There is a
clear pink theme, but the color palette includes shades of green and orange as
well. The images on the homepage are from OpenAI DALL-E.

The Tic Tac Toe code was provided by Professor Posnett. This is a one player
game. There are three game modes the user can choose from: easy, medium, and
hard. These game modes correspond to the difficulty of the bot, which is the
player's opponent. I added lots of styling to the page to fit the childish and
feminine theme.

Memory and Connect 4 were implemented by me. However, portions of the code
belong to Professor Posnett. Professor Posnett's Tic Tac Toe code was a huge
inspiration for my implementations of Memory and Connect 4. Both of these games
include two different game modes: 1 Player and 2 Player. When playing Memory, 1
Player mode will calculate the player's score based on the amount of turns they
take to find all the matches. On the other hand, 2 Player mode allows two
players to compete against each other to find the most matches. When playing
Connect 4, 1 Player mode allows the user to play against a medium-difficulty
bot. 2 Player mode allows two players to compete against each other.

The Sliding Puzzle game is an open source game from [BrightScreenTV's GitHub
repository](https://github.com/BrightScreenTV/sliding-puzzle/tree/main) which is
under the [MIT
license](https://github.com/BrightScreenTV/sliding-puzzle/blob/main/LICENSE). In
this game, the player is tasked with rearranging 15 tiles in numerical order,
with one empty space. I made some changes to the code to improve its readability
and cohesiveness. I refactored the code by removing unnecessary classes and
lines of code (e.g., the `btninplace` and `btnoutofplace` classes that do not
impact the implementation). Additionally, I restyled the code to fit the theme
of my game arcade and added a button so that users can start a new game without
having to reload the page.

The most notable challenges I had when creating my website was styling the pages
and making the pages mobile-friendly. Particularly, I had a difficult time
displaying all of the games in a grid-like manner on the front-page. I also
spent significant time making my pages adaptable to different screen sizes. I
was not able to get my Connect 4 game mobile-friendly, but that is because a 6x7
grid is difficult for users to interact with on small screens.
