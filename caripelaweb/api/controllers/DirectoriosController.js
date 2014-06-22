var fs = require('fs');
/**
 * DirectoriosController
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


function actualizar_galeria(directorios, ruta_directorio, objeto_directorio) {
  var titulo = objeto_directorio.titulo;
  var indice = -1;

  // Cuando se actualiza una galeria, ya existe un listado de todos
  // los directorios de galerias, así que en esta parte de procede
  // a buscar el índice de la galería dentro de esa lista previsamente
  // realizada.
  for (var i=0; i<directorios.length; i++) {
    if (directorios[i].titulo === titulo) {
      indice = i;
    }
  }

  // Ahora se lee el directorio en busca de archivos svg, para actualizar
  // la galeria.
  //
  // Como caso particular, si se encuentra un archivo llamado configuración
  // "preferencias.json", se lee para que sea el que define las preferencias
  // iniciales para cada objeto de la colección.
  var data = fs.readdirSync(ruta_directorio);

    directorios[indice].objetos = [];

    if (!data)
      return;

    for (var i=0; i<data.length; i++) {
      var ruta = data[i];

      if (/\.svg$/.test(ruta) || /\.jpg$/.test(ruta)) {
        var src = (ruta_directorio + '/' + ruta).replace('assets/', '/');
        var item = {src: src};
        directorios[indice].objetos.push(item);
      }

      if (/^preferencias.json$/.test(ruta)) {
        var preferencias_path = "./" + ruta_directorio + "/" + ruta;
        var preferencias = (JSON.parse(fs.readFileSync(preferencias_path, "utf8")));
        directorios[indice].preferencias = preferencias;
        directorios[indice].tiene_preferencias = true;
      }
    }

  //console.log(indice, ruta_directorio);
  //objeto_directorio.objetos.push({src: "partes/pelo/nariz_1.svg"});
}


module.exports = {

  obtener: function(req, res) {
    var directorios = [];
    var path = 'assets/partes';

    fs.readdir(path, function(error, data) {
      // Por cada directorio en  "./partes" ...
      for (var i=0; i<data.length; i++) {
        var titulo = data[i];
        var objeto_directorio = {titulo: titulo, tiene_preferencias: false, preferencias: {}, active: false, objetos: []}

        if (/^\./.test(titulo)) // ignora los directorios y archivos ocultos.
          continue;

        directorios.push(objeto_directorio);
        actualizar_galeria(directorios, path + '/' + titulo, objeto_directorio);
      }

      res.send(directorios);
    });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DirectoriosController)
   */
  _config: {}

};
