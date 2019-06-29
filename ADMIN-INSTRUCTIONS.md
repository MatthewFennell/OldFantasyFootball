# Running the app

* ## Actions available to only admins

  * Creating / deleting players
  * Creating / deleting teams
  * Adding points directly to a single player
  * Editing a single player stats
  * Creating a match result
  * Triggering a new week
  * Making a user a captain of a given team
  * Resetting a users password
  * Opening / closing the transfer market

* ## General rules / information

  * Users can make as many transfers as they wish whilst the transfer market is open
  * The standard formations are the only ones allowed
  * There can be a cap on the number of players from any single team
  * The database stores a list of users, and each user will have a team for each week
  * When a new week is triggered, every users team is locked in for that week and can't be changed
  * Resetting a users password sets it to `123456`

* ## Some examples of how it works

  * Assume we have a user called `Bob`
  * Terminology wise, `users` are people using the website, `players` are the in game players 
  * He has a full team of players, and the next set of matches are for week 3
  * The last day before the weekend of matches, Week 3 should be triggered
  * This will lock in all users teams in for week 3, so that any transfers they make don't affect their week 3 team
  * After the matches have been played, the results should be submitted for the corresponding week
  * Adding these results will update the points for each user
