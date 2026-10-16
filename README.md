# Early Concept

My current plan for my project is to create an application to view data from the MC Championship API (https://github.com/Noxcrew/mcchampionship-api) in an interesting way. MC Championship is a Minecraft tournament featuring 10 teams of 4 players competing across 8 minigames, and the API contains data for who plays on which team and the scores they get in each minigame.

I do not have a set idea yet for what data will be displayed, but one idea I have is to show a graph of which players have been on a team with other players to create a network - similar to how you might have friends of friends on a social media site. Another idea is to track a player's average scores across different minigames, along with a way to compare these to other players.

The app will have an authentication feature to access an admin panel, which will be used to sort the data from the API - some of this data may need to be cleaned or adjusted due to players changing their username between events or playing on a different account to usual. The data will also be stored in a database, both to keep this cleaned data and to reduce the number of required API calls.