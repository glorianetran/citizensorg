angular.module("myApp", []);





function loginCtrl($scope, authentication) {
    loginCtrl.$inject = ['$scope','authentication'];
    

    $scope.hi = "hi";
    $scope.pageHeader = {
     title: 'Sign in to Loc8r'
    };
    $scope.credentials = {
        email : "",
        password : ""
     };

    $scope.onSubmit = function () {
        $scope.formError = "";
        if (!$scope.credentials.email || !$scope.credentials.password) {
            $scope.formError = "All fields required, please try again";
            return false;
        } 
        else {
            $scope.doLogin();
        }
     };
     
    $scope.doLogin = function() {
        $scope.formError = "";
        authentication
        .login($scope.credentials)
        .catch(function(err){
        $scope.formError = err;
        })
        .then(function(){

        });
 }
}
registerCtrl.$inject = ['$scope','authentication'];

function registerCtrl($scope, authentication)
{
    $scope.formError = authentication.currentUser().name;
    $scope.pageHeader = {
     title: 'Sign in to Loc8r'
    };
    $scope.credentials = {
        name: "",
        email : "",
        password : ""
     };

    $scope.onSubmit = function () {
        $scope.formError = "";
        if (!$scope.credentials.email || !$scope.credentials.password) {
            $scope.formError = "All fields required, please try again";
            return false;
        } 
        else {
            $scope.doLogin();
        }
     };
     
    $scope.doLogin = function() {
        $scope.formError = "";
        console.log("hi");

        authentication
        .register($scope.credentials)
        .catch(function(err){
        $scope.formError = err;
        })
        .then(function(data){
           
            $scope.currentUser = authentication.currentUser().name;

        });
        
    
    
}
    
    
};
  
function authentication ($http,$window) {
        authentication.$inject = ['$http','$window'];
        var saveToken = function (token) {
            $window.localStorage['loc8r-token'] = token;
        };
        var getToken = function () {
            return $window.localStorage['loc8r-token'];
        };
        
        var register = function(user) {
            return $http.post('/api/register', user).then(function(data){
            
            saveToken(data.data.token);
            });
        };
        
        var login = function(user) {
            return $http.post('/api/login', user).then(function(data) {
            saveToken(data.data.token);
            });
        };
        
        var isLoggedIn = function() {
             console.log("hey");
             var token = getToken();
             if(token){
             var payload = JSON.parse($window.atob(token.split('.')[1]));
             return payload.exp > Date.now() / 1000;
             } else {
             return false;
             }
        };
        
        var currentUser = function() {
             if(isLoggedIn()){
            
             var token = getToken();

             var payload = JSON.parse($window.atob(token.split('.')[1]));
             return {
             email : payload.email,
             name : payload.name
             };
             
             }
             return {
             email : "",
             name : ""
             };
        };
        var logout = function() {
            $window.localStorage.removeItem('loc8r-token');
        };
        return {
            register : register,
            login : login,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
            logout: logout
        };
 }


angular.module("myApp").controller("loginCtrl", loginCtrl).controller("registerCtrl", registerCtrl).service("authentication", authentication)