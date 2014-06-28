var fs = require('fs');
var spawn = require('child_process').spawn;

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

      // Hace que las caripelas mas nuevas aparezcan primero.
      data = data.sort(function(a, b) { return parseInt(a, 10) < parseInt(b, 10)});

      for (i in data) {
        var item = {ruta: data[i]};

        if (/\d+/.test(data[i]))
          caripelas.push(item);
      }

      return res.json({caripelas: caripelas});
    });

  },

  publicar: function (req, res) {
      if (req.param('datajson') === undefined)
          return res.send('No has especificado el parametro datajson', 404);

      if (req.param('datapng') === undefined)
          return res.send('No has especificado el parametro datapng', 404);

      var datajson = req.param('datajson');
      var datapng = req.param('datapng');


      // Busca crear un directorio con un numero mas grande a los
      // existentes.

      var directorios = fs.readdirSync('assets/caripelas');
      var max = 0;

      for (i in directorios) {
        var numero = parseInt(directorios[i], 10);

        if (numero > max)
          max = numero;
      }

      max += 1;

      // Genera el directorio destino.
      var directorio_destino = 'assets/caripelas/' + max;
      fs.mkdirSync(directorio_destino);

      // Guarda la imagen PNG
      fs.writeFile(directorio_destino + '/preview.png', datapng, 'base64', function(err) {


        spawn('convert', [directorio_destino + '/preview.png',
                          '-resize',
                          '100x100',
                          directorio_destino + '/thumb.png']);

        if (err) {
          console.log(err);
        } else {
          res.json({codigo: "ok"});
        }
      });
  },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CaripelasController)
   */
  _config: {}


};
