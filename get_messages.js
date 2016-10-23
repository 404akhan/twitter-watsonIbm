module.exports = function(profile) {

  var strings = [];

  var needs = ['Challenge', 'Curiosity', 'Excitement', 'Love'];

  var quotes = {
    'Challenge': 'Life is either a daring adventure or nothing at all',
    'Curiosity': 'Curiosity is a willing, a proud, an eager confession of ignorance',
    'Excitement': 'They sicken of the calm who know the storm',
    'Love': 'People are lonely because they build walls instead of bridges'
  };

  for(var j = 0; j < needs.length; j++) {

    for(var i = 0; i < profile.needs.length; i++) {

      if (profile.needs[i]['name'] == needs[j] && profile.needs[i]['raw_score'] > 0.65) {

        strings.push(quotes[needs[j]]);

      }

    }

  }

  return strings;

};