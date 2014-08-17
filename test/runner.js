require.config({
  baseUrl: '.',
  paths: {
    'mocha': '../bower_components/mocha/mocha',
    'chai': '../bower_components/chai/chai',
    'address-client': '../lib/address-client'
  },
  //urlArgs: 'bust=' + (new Date()).getTime()
});

require(['require', 'chai', 'mocha', 'address-client'], function (require, chai) {

  // chai
  var assert = chai.assert;

  /*globals mocha */
  mocha.setup('bdd');
  mocha.ui('bdd');
  mocha.reporter('html');
  
  require([
    'spec.js',
  ], function (require) {

    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }

  });

});