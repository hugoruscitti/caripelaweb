var fs = require('fs');

/**
 * CaripelasController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {


  /**
   * Action blueprints:
   *    `/caripelas/cantidad`
   */
   cantidad: function (req, res) {

    fs.readdir('assets/caripelas', function(error, data) {
      return res.json({
        cantidad: data.length - 1
      });
    });
  },


  /**
   * Action blueprints:
   *    `/caripelas/obtener`
   */
   obtener: function (req, res) {

    fs.readdir('assets/caripelas', function(error, data) {
      var caripelas = [];

      for (i in data) {
        var item = {ruta: data[i]};

        if (/\d+/.test(data[i]))
          caripelas.push(item);
      }

      return res.json({caripelas: caripelas});
    });

  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CaripelasController)
   */
  _config: {}


};
