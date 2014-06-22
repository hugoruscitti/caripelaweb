var app = angular.module('app');

app.controller('SelectorCtrl', function($scope, $location, $http, MisArchivos) {
  $scope.data = {};

  $scope.data.cantidad_caripelas = '.....';

  $http.get('/caripelas/cantidad').success(function(data) {
    $scope.data.cantidad_caripelas = data.cantidad;
  });


  $scope.data.caripelas = [];

  $http.get('/caripelas/obtener').success(function(data) {
    $scope.data.caripelas = data.caripelas;
  });

  $scope.crear_avatar = function() {
    $location.url('/editor');
  }

  $scope.abrir_avatar = function(obj) {
    //var ruta = obj.ruta_json;
    //$location.path('/editor').search({ruta: ruta});
    alert(obj);
  }

  $scope.borrar_avatar = function(obj) {
      MisArchivos.eliminar(obj);
      $scope.data.mis_archivos = MisArchivos.archivos;
  }

  $scope.data.mis_archivos = MisArchivos.archivos;
});
