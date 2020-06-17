# LoL-Stats
Web app that allows you to quickly analyse your in-game performance using Riot Games API


This web application uses the Riot Games API in order to fetch summoner information, including match history, as well as you/your teammates'
performance in each match. Additionally it displays your average K/D/A, your summoner level, and a number of other useful statistics.


## Get it yourself
Clone this repository, then run:

`cd lol-stats`
`npm start`

You will now be able to see the app on your localhost:3000

## Usage
Enter your League of Legends username on the index page. This will send an API request to an API proxy server (run on AWS Lambda), which will retrieve your match history. You can view this information when you submit your username.


