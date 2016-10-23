var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var fs = require('fs');

var personality_insights = new PersonalityInsightsV3({
  username: '453e6b28-bcd2-4f9e-8755-42271e1cdb94',
  password: '4mJB1XXZAshO',
  version_date: '2016-10-20'
});



module.exports = function(user_name, callback) {

  // console.log('watson');

  var format_data = require('./format_data');

  var user = user_name;

  var params = {
    // Get the content items from the JSON file.
    content_items: require('./profile_' + user +'.json').contentItems,
    consumption_preferences: true,
    raw_scores: true,
    headers: {
      'accept-language': 'en',
      'accept': 'application/json'
    }
  };

  personality_insights.profile(params, function (error, response) {
      if (error)
        console.log('error:', error);
      else {
        fs.writeFileSync('./watson_data_' + user + '.json', JSON.stringify(response, null, 2), 'utf-8');
      }

      // console.log('watson');
      format_data(user_name, callback);
    }
  );

};