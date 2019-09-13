var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.welcomeMessage = 'Welcome!';
  $scope.actionButtonText = localStorage.getItem('user') === null ? 'Register' : 'Login';
  $scope.data = {};
  $scope.showDataCard = false;
  $scope.validation = {};
  $scope.registrationFormValid = false;
  $scope.actionButton = localStorage.getItem('user') === null ? 'registerModal' : 'loginModal';
  $scope.actionButtonDisable = false;
  $scope.user = JSON.parse(localStorage.getItem("user"));
  $scope.register = function(){
    $scope.errors = {};
    //check username valid;
    // console.log((/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).test($scope.data.email));
    // console.log((/([a-zA-Z]){1,2}(?=[1-9])/g).test($scope.data.username));
    // console.log()([a-zA-z]{1,2})(?=[1-9])
    $scope.validation.username = (/([a-zA-Z]{1,2})(?=[1-9])/g).test($scope.data.username) ? false : true;
    $scope.errors.username = !$scope.validation.username ? "Username can not have less than 3 chars between letters and nums, nor symbols." : null;
    $scope.validation.email = (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).test($scope.data.email) ? true : false;
    if(($scope.data.password === $scope.data.confirmPassword) 
      && (/[A-Z]/).test($scope.data.password)
      && $scope.data.password.length >= 5 
      && (/[0-9]/).test($scope.data.password) 
      && (/[^a-zA-z0-9]/).test($scope.data.password)
    ){
      $scope.validation.password = true;
    }else{
      $scope.validation.password = false;
    }
    $scope.validation.address = /[^a-zA-z0-9\,]/.test($scope.data.address) ? false : true;
    $scope.validation.phone = $scope.data.phone ? /[0-9]{10}/.test($scope.data.phone) ? true : false : true;
    //if valid set cookie; 
    console.log($scope.validation, $scope.data);
    if($scope.validation.username
      && $scope.validation.email
      && $scope.validation.password
      && $scope.validation.address
      && $scope.validation.phone)
    {
        if($scope.data.rememberMe){
          localStorage.setItem("user", JSON.stringify($scope.data));
          $scope.user = JSON.parse(localStorage.getItem("user"));
        }else{
        	$scope.user = $scope.data;
        }
        $("#registerModal").modal('hide');
	  	$scope.actionButtonDisable = true;
        $scope.showDataCard = true;
    }
  }
  
  $scope.login = function(){
    $scope.errors = {};
    console.log($scope.user, $scope.data);
    if($scope.user.username === $scope.data.username
      && $scope.user.password === $scope.data.password
    ){
      // $scope.data = $scope.user;
	  	$("#loginModal").modal('hide');
	  	$scope.actionButtonDisable = true;
	    $scope.showDataCard = true;
    }
  }
});
