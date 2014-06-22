var app = angular.module('app');

app.controller('SelectorCtrl', function($scope, $location, $http, $modal, MisArchivos) {
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

  var PreviewModalCtrl = function ($scope, $modalInstance, obj) {
    $scope.obj = obj;

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };

  $scope.abrir_avatar = function(obj) {

    var modalInstance = $modal.open({
      templateUrl: 'partials/previewModal.html',
      controller: PreviewModalCtrl,
      resolve: {
        obj: function () {
          return obj;
        }
      }
    });

    //var ruta = obj.ruta_json;
    //$location.path('/editor').search({ruta: ruta});
  }

  $scope.borrar_avatar = function(obj) {
      MisArchivos.eliminar(obj);
      $scope.data.mis_archivos = MisArchivos.archivos;
  }

  $scope.data.mis_archivos = MisArchivos.archivos;
});
