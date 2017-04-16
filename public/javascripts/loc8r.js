angular.module("myApp", []);


function authCtrl($scope, authentication, $location){
    authCtrl.$inject = ['$scope','authentication', '$location'];
    
    $scope.currentUser = authentication.currentUser().name;
    $scope.isLoggedIn = authentication.isLoggedIn();
    $scope.logout = function() {
        authentication.logout();
        window.location.href = '/';
        };
    $scope.hi = "hi";
    $scope.pageHeader = {
     title: 'Sign in to Loc8r'
    };
    $scope.credentials = {
        email : "",
        password : ""
     };

    $scope.onLoginSubmit = function () {
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
            window.location.href = '/';
        });
    }
    
    $scope.formError = authentication.currentUser().name;
    $scope.pageHeader = {
     title: 'Sign in to Loc8r'
    };
    $scope.regcredentials = {
        rname: "",
        remail : "",
        rpassword : ""
     };

    $scope.onRegisterSubmit = function () {
        $scope.formError = "";
        if (!$scope.regcredentials.remail || !$scope.regcredentials.rpassword) {
            $scope.formError = "All fields required, please try again";
            return false;
        } 
        else {
            $scope.doRegister();
            
        }
     };
     
    $scope.doRegister = function() {
        $scope.formError = "";

        authentication
        .register($scope.regcredentials)
        .catch(function(err){
        $scope.formError = err;
        })
        .then(function(data){
            
            window.location.href = '/';
        });
        
    }
}


function loginCtrl($scope, authentication, $location) {
    loginCtrl.$inject = ['$scope','authentication', '$location'];
    
    $scope.currentUser = authentication.currentUser().name;

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


angular.module("myApp").controller("authCtrl", authCtrl).service("authentication", authentication)