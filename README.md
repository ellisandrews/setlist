# Setlist

<p align="center">
  <img src="frontend/src/SetlistLogo.png" width="200">
</p>

## Motivation

Many guitar players in the age of the internet are teaching themselves songs using online resources. This process often looks something like this:

1. **Identify the song to learn.**
    - Listen to it on a music streaming service like Spotify.

2. **Search the internet for the chords.**
    - Sort through a pile of alternate tabs. There are usually _many_ ways to play a song listed on a site like [ultimate-guitar.com](https://www.ultimate-guitar.com/), with varying degress of accuracy and difficulty. Eventually find one you like and that sounds close to the record.

3. **Pull up a YouTube video tutorial.**
    - There are some fantastic YouTube channels dedicated to teaching popular guitar songs. These can be super helpful when just looking at the chords isn't enough.

4. **Learn the song.**
    - Click back and forth between browser windows of the chords and the YouTube tutorial, while occasionally listening to the original song on Spotify while you learn to play the song. 

5. **Decide to revisit the song a day, a week, or a month later.**
    - Often, it's easy to forget entirely what song you were working on in the past. If you do remember which song it was, you likely won't remember the exact chords you selected or the YouTube video you found helpful. You now have to go through the same research process you did the first time.


Setlist was built to ease this process, so that you can remember the songs you learn to play and how _you_ play them. Setlist can be your single browser window open while revisiting a song. The Spotify track, chords, YouTube video, notes and more are all right there on one page!

## UI

![](setlist-tour.gif)

Setlist is currently hosted for free on Heroku at [setlist-frontend.herokuapp.com](https://setlist-frontend.herokuapp.com). Note that the free Heroku servers sleep after a period inactivity, so it may take up to 30 seconds to load initially. Please be patient!

A read-only mode pre-populated with a handful of songs can be accessed by clicking the `Preview` button on the left side menu. No need to create an account to browse with this feature!

## Development

Please see [deployment.md](deployment.md). Setlist is fully dockerized, and can be run locally without installing any packages on your machine other than docker! That means no Postgres, Ruby on Rails, React, etc. Your environment is good to go out of the box after a little configuration.