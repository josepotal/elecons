angular.module('EleconsApp')
  .run(function($rootScope, $location, StorageFactory, AuthFactory, ApiFactory){

      if ( AuthFactory.isLoggedIn() ) {
        const token = StorageFactory.readToken()
        AuthFactory.setCredentials(token)
      }

      $rootScope.$on( "$routeChangeStart", function(event, next, current) {

        if (next && next.secure) {
          if ( !AuthFactory.isLoggedIn() ) {
            $location.path("/login");
          }
        }
      
      })
      
      $rootScope.$on( "userLogged", function(event, id) {
        ApiFactory.getUser(id)
            .then( response => {
                $rootScope.firstName = response.data.firstName || "Your firstName"
                $rootScope.lastName = response.data.lastName || "Your lastName"
                $rootScope.email = response.data.email || "Your email"
                $rootScope.maxPower = Number(response.data.maxPower) || 0
                $rootScope.contractedPower = Number(response.data.contractedPower) || 2.3
                $rootScope.energyTariff = response.data.energyTariff || "PVPC"
                $rootScope.updatedAt = response.data.updatedAt 
                $rootScope.urlCurrentPower = response.data.urlCurrentPower
                
            })
      })
  })