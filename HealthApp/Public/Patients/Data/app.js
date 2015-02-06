var PatientApp = angular.module('patientApp', []);

PatientApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
      when('/', {
            templateUrl: 'Views/index.html',
            controller: 'patientModel'
        }).
       when('/patientdetails', {
            templateUrl: 'Views/PatientDetails.html',
            controller: 'patientdetails'
        }).
      when('/patientslist', {
            templateUrl: 'Views/PatientList.html',
            controller: 'patientslist'
        }).
      otherwise({
            redirectTo: '/'
        });
    }]);

PatientApp.controller('patientModel', function ($scope, $http) {
    
    $scope.patientModel = [{
            status: 'active'
        }];
    $scope.create = function () {
        console.log($scope.patientModel);
        $http.post('/patientModel', $scope.patientModel)
        .success(function (response) {
            //$scope.all_info();
            $scope.message = "Patient record inserted";
        });
    };
    $scope.reset = function () {
        $scope.patientModel = angular.copy($scope.master);
        $scope.message = angular.copy($scope.master);
    };
    
    $scope.reset();
});


PatientApp.controller('patientslist', function ($scope, $http) {
    
    $scope.renderpatientModels = function (response) {
        $scope.patientModels = response;
    };

    $scope.all_info = function () {
        $http.get('/patientModels')
        .success($scope.renderpatientModels);
    }
    
    $scope.delete = function (id) {
        $http.delete('/patientModels/' + id)
        .success(function (response) {
            $scope.all_info();
        });
    };
    
    $scope.all_info();
});

PatientApp.controller('patientdetails', function ($scope, $http) {
    $scope.renderpatientModels = function (response) {
        $scope.patientModels = response;
    };
    
    $scope.all_info = function () {
        $http.get('/patientModels')
        .success($scope.renderpatientModels);
    }
    $scope.all_info();
    

    $scope.select = function (id) {
        $http.get('/patientModels/' + id)
        .success(function (response) {
            $scope.patientModel = response;
        });
    };

    $scope.update = function () {
        $http.put('/patientModels/' + $scope.patientModel._id, $scope.patientModel)
        .success(function (response) {
            $scope.all_info();
            $scope.message = "Patient record updated";
            $scope.query = angular.copy($scope.master);
        });
    };
});
