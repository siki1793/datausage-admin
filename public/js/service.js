<!DOCTYPE html>
<html lang="en">


<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js"></script>
</head>

<body ng-app="myapp">

  <div ng-controller="MyController" >
    <button ng-click="myData.doClick(item, $event)">Send AJAX Request</button>
    <br/>
    Data from server: {{myData.fromServer}}
  </div>

  <script>
    angular.module("myapp", [])
        .controller("MyController", function($scope, $http) {
            $scope.myData = {};
            $scope.myData.doClick = function(item, event) {

                var responsePromise = $http.get("/angularjs-examples/json-test-data.jsp");

                responsePromise.success(function(data, status, headers, config) {
                    $scope.myData.fromServer = data.title;
                });
                responsePromise.error(function(data, status, headers, config) {
                    alert("AJAX failed!");
                });
            }


        } );
  </script>

</body>

</html>
