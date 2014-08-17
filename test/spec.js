/**
 * address-client
 *
 *    Library test
 */
define(function(require) {
  
  'use strict'

  var chai            = require('chai'),
      assert          = chai.assert,
      address_client  = require('address-client');

  describe('get states tests', function () {

    this.timeout(10000);
    
    it('should get 27 states', function (done) {

      address_client
        .getStates()
        .then(function (data) {

          assert.isNotNull(data);
          assert.equal(data.length, 27);

          done();
        }, null);

    });

  });

  describe('get cities tests', function () {

    this.timeout(10000);
    
    it('should return null when state is null', function (done) {

      address_client
        .getCities(null)
        .then(null, function (data) {
          assert.isNull(data);
          done();
        });

    });

    it('should get 22 cities for state AC', function (done) {
      address_client
        .getCities('ac')
        .then(function (data) {

          assert.isNotNull(data);
          assert.equal(data.length, 22);

          done();
        }, null);
    });


    it('should get all cities for state AP', function (done) {

      address_client
        .getCities('ap')
        .then(function (data) {

          assert.isNotNull(data);
          assert.equal(data.length, 16);

          done();
        }, null);

    });
  });

  describe('get address tests', function () {

    this.timeout(10000);

    it('should return null when postalCode is null', function (done) {

      address_client
        .getAddress(null)
        .then(null, function (data) {

          assert.isNull(data);

          done();
        });

    });

    it('should return error message when postalCode is not valid', function (done) {

      address_client
        .getAddress('00000-000')
        .then(null, function (data) {

          assert.isNotNull(data);
          assert.equal(data.message, "Address Not Found for Postal Code: '00000-000'");

          done();
        });

    });

    it('should return correct address when postalCode is 01311-300', function (done) {

      address_client
        .getAddress('01311-300')
        .then(function (data) {

          assert.isNotNull(data);
          assert.equal(data.postalCode, '01311-300');
          assert.equal(data.streetSuffix + ' ' + data.street, 'Avenida Paulista');
          assert.equal(data.district, 'Bela Vista');

          assert.notEqual(data.city, null);
          assert.equal(data.city.code, '3550308');
          assert.equal(data.city.name, 'São Paulo');

          assert.notEqual(data.state, null);
          assert.equal(data.state.code, '35');
          assert.equal(data.state.abbreviation, 'SP');
          assert.equal(data.state.name, 'São Paulo');

          done();

        }, null);

    });

    it('should return correct address when postalCode is 01311300', function (done) {

      address_client
        .getAddress('01311300')
        .then(function (data) {

          assert.isNotNull(data);
          assert.equal(data.postalCode, '01311-300');
          assert.equal(data.streetSuffix + ' ' + data.street, 'Avenida Paulista');
          assert.equal(data.district, 'Bela Vista');

          assert.notEqual(data.city, null);
          assert.equal(data.city.code, '3550308');
          assert.equal(data.city.name, 'São Paulo');

          assert.notEqual(data.state, null);
          assert.equal(data.state.code, '35');
          assert.equal(data.state.abbreviation, 'SP');
          assert.equal(data.state.name, 'São Paulo');

          done();

        }, null);

    });

  });

});