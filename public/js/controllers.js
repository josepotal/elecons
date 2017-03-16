angular.module('EleconsApp')
  .controller('LoginCtrl', function($scope, $location, AuthFactory) {
    $scope.login = function() {
      const username = $scope.username
      const password = $scope.password
      AuthFactory.login({ username, password })
        .then( AuthFactory.setCredentials )
        .then( () => $location.path('/dashboard') )
    }

  })
  .controller('RegisterCtrl', function($scope, AuthFactory) {
    $scope.register = function() {
      const username = $scope.username
      const password = $scope.password
      AuthFactory.register({ username, password })
    }
  })
  .controller('NavbarCtrl', function($scope, $location, AuthFactory) {

    $scope.logout = function() {
      AuthFactory.logout()
      $location.path('/dashboard');
    }
  })
  .controller('PrivateCtrl', function($scope, auth, DataFactory) {
    console.log(auth)
    DataFactory.getPrivateData()
      .then( ({ message }) => $scope.message = message )
  })
