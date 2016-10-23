# twitter-watsonIbm


API

1) /:user
get data about user

2) /reg/:user
if user was not registered use this request
	2.1) it will collect his tweets
	2.2) send request to Watson IBM to get info about personality including movies, musics, books, shopping patterns
	2.3) save json file about user (cashing), to use (1) request in the future

3) /msgs/:user
advices and quotes for user

<br />

URL

https://watson-seamless.herokuapp.com

<br />

EXAMPLES

https://watson-seamless.herokuapp.com/realDonaldTrump
<br />
https://watson-seamless.herokuapp.com/msgs/realDonaldTrump
