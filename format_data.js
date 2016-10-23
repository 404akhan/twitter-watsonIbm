var fs = require('fs');

module.exports = function(user_name, callback) {

  var profile = require('./watson_data_' + user_name + '.json');

  /*** Willing To Pay ***/

  var willing_to_pay = 0;

  var cons = profile.consumption_preferences;

  for (var i = 0; i < cons.length; i++) {

    if (cons[i]['consumption_preference_category_id'] == 'consumption_preferences_shopping') {

      var cons_pref = cons[i].consumption_preferences;

      for (var j = 0; j < cons_pref.length; j++) {

        if (cons_pref[j]['consumption_preference_id'] == 'consumption_preferences_clothes_quality') {

          willing_to_pay += cons_pref[j]['score'];

        }

        if (cons_pref[j]['consumption_preference_id'] == 'consumption_preferences_clothes_comfort') {

          willing_to_pay += cons_pref[j]['score'];

        }

      }

    }

  }

  willing_to_pay /= 2;


  /*** Movies Ranking ***/

  var categories_movies = ['romance', 'adventure', 'horror', 'musical', 'historical',
    'science_fiction', 'war', 'drama', 'action', 'documentary'];

  var ranks_movies = {
    'romance': 0, 'adventure': 0, 'horror': 0, 'musical': 0, 'historical': 0,
    'science_fiction': 0, 'war': 0, 'drama': 0, 'action': 0, 'documentary': 0
  };

  for (var i = 0; i < cons.length; i++) {

    if (cons[i]['consumption_preference_category_id'] == 'consumption_preferences_movie') {

      cons_pref = cons[i].consumption_preferences;

      for (var j = 0; j < cons_pref.length; j++) {

        for (var k = 0; k < categories_movies.length; k++) {

          if (cons_pref[j].consumption_preference_id.indexOf(categories_movies[k]) != -1) {

            ranks_movies[categories_movies[k]] = cons_pref[j].score;

          }

        }

      }

    }

  }


  /*** Music Ranking ***/

  var categories_music = ['rap', 'country', 'r_b', 'hip_hop', 'latin',
    'rock', 'classical'];

  var ranks_music = {
    'rap': 0, 'country': 0, 'r_b': 0, 'hip_hop': 0, 'latin': 0,
    'rock': 0, 'classical': 0
  };


  for (var i = 0; i < cons.length; i++) {

    if (cons[i]['consumption_preference_category_id'] == 'consumption_preferences_music') {

      cons_pref = cons[i].consumption_preferences;

      for (var j = 0; j < cons_pref.length; j++) {

        for (var k = 0; k < categories_music.length; k++) {

          if (cons_pref[j].consumption_preference_id.indexOf(categories_music[k]) != -1) {

            ranks_music[categories_music[k]] = cons_pref[j].score;

          }

        }

      }

    }

  }


  /*** Books Ranking ***/

  var categories_books = ['information', 'entertainment', 'non_fiction',
    'financial', 'autobiographical'];

  var ranks_books = {
    'information': 0, 'entertainment': 0, 'non_fiction': 0,
    'financial': 0, 'autobiographical': 0
  };


  for (var i = 0; i < cons.length; i++) {

    if (cons[i]['consumption_preference_category_id'] == 'consumption_preferences_reading') {

      cons_pref = cons[i].consumption_preferences;

      for (var j = 0; j < cons_pref.length; j++) {

        for (var k = 0; k < categories_books.length; k++) {

          if (cons_pref[j].consumption_preference_id.indexOf(categories_books[k]) != -1) {

            ranks_books[categories_books[k]] = cons_pref[j].score;

          }

        }

      }

    }

  }


  /*** Food Preferences ***/

  var eat_out = 0;

  var fast_food = 0;

  for (var i = 0; i < cons.length; i++) {

    if (cons[i]['consumption_preference_category_id'] == 'consumption_preferences_health_and_activity') {

      cons_pref = cons[i].consumption_preferences;

      for (var j = 0; j < cons_pref.length; j++) {

        if (cons_pref[j]['consumption_preference_id'] == 'consumption_preferences_eat_out') {

          eat_out = cons_pref[j].score;

        }

        if (cons_pref[j]['consumption_preference_id'] == 'consumption_preferences_fast_food_frequency') {

          fast_food = cons_pref[j].score;

        }

      }

    }

  }


  /*** Finalize Person ***/

  var person = {

    twitter_screen_name: user_name,
    willing_to_pay: willing_to_pay,
    ranks_movies: ranks_movies,
    ranks_music: ranks_music,
    ranks_books: ranks_books,
    eat_out: eat_out,
    fast_food: fast_food,

  };

  fs.writeFileSync('./formatted_' + person.twitter_screen_name + '.json', JSON.stringify(person, null, 2), 'utf-8');

  // console.log('format');
  callback();

};