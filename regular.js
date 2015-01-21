var module = angular.module("myApp", []);

module.controller('MCQController', function ($scope, $http, $timeout) {
	$scope.hideControlButtons;
	$scope.qDisabled;
	var src;
	$timeout(function () {
		if ($scope.src == "random") {
			src = $scope.getRandom(); //"http://7.32.61.43/questions/"+filenames[rnd];
		} else {
			src = $scope.src;
		}

		$http({
			method : 'GET',
			url : src
		}).
		success(function (data, status, headers, config) {
			var qdata = $.xml2json(data);
			$scope.stem = qdata.questionTexts.stem;
			$scope.options = qdata.matches.match;
			for (var i = 0; i < $scope.options.length; i++) {
				var str = qdata.metadata.id + "_rb_" + i;
				$scope.options[i].id = str;
			}
			$scope.metadata = qdata.metadata;
		}).
		error(function (data, status, headers, config) {
			//alert(data);
		});

		$scope.templates = {
			mcq : "https://cdn.rawgit.com/mb-int/questions/master/mcq.html",
			ne : "https://cdn.rawgit.com/mb-int/questions/master/ne.html"
		}; // etc etc

		// select handler *** MANUAL BINDING! must be a way of binding this with an ng-include - tried $parent but it wasn't playing nicely ***
		$scope.selected = function (val) {
			$scope.optionSelected = val;
		};

	}, 50);

	// marking symbols etc
	$scope.markingSymbol = "";
	$scope.labelClass = "";
	$scope.labelText = "";
	// submit handler
	$scope.submit = function () {
		// check if it's correct - loop through options and check for correct attribute
		for (var i in $scope.options) {
			if ($scope.options[i].value == $scope.optionSelected) {
				var correct = ($scope.options[i].correct == "true") ? true : false;
				if (correct) {
					$scope.alertType = "alert-success";
					$scope.hideControlButtons = true;
					$scope.markingSymbol = "icon-ok icon-white";
					$scope.labelClass = "label label-success";
					$scope.feedback = $scope.options[i].feedback;
					$scope.qDisabled = true;
				} else {
					$scope.alertType = "alert-error";
					if ($scope.options[i].feedback) {
						$scope.markingSymbol = "icon-remove icon-white";
						$scope.labelClass = "label label-important";
						$scope.feedback = $scope.options[i].feedback;
					} else {
						$scope.markingSymbol = "";
						$scope.feedback = "That's not right, try again.";
					}
				}
			}
		}
	};

	$scope.reveal = function () {
		for (var i in $scope.options) {
			console.log($scope.options[i].correct);
			if ($scope.options[i].correct == "true") {
				$scope.markingSymbol = "";
				$scope.labelClass = "label label-info";
				$scope.labelText = "Answer";
				$scope.feedback = $scope.options[i].value;
				$scope.alertType = "alert-info";
				$scope.qDisabled = true;
			}
		}
		$scope.hideControlButtons = true;
	};

	module.directive('disable', function () {});

	$scope.getRandom = function () {
		var filenames = ["ABC_10_06_Q1_MCQ.xml", "ABC_10_06_Q2_MCQ.xml", "ABC_10_06_Q3_MCQ.xml", "ABC_10_06_Q4_MCQ.xml", "ABC_10_06_Q5_MCQ.xml", "ABC_10_06_Q6_MCQ.xml", "ABC_10_06_Q7_MCQ.xml", "ABC_12_05_Q1_MCQ.xml", "ABC_12_05_Q2_MCQ.xml", "ABC_12_05_Q3_MCQ.xml", "ABC_12_05_Q4_MCQ.xml", "ABC_12_05_Q5_MCQ.xml", "ABC_12_05_Q6_MCQ.xml", "ABC_12_05_Q7_MCQ.xml", "ABC_12_05_Q8_MCQ.xml", "ABC_13_02_Q1_MCQ.xml", "ABC_13_02_Q2_MCQ.xml", "ABC_13_02_Q3_MCQ.xml", "ABC_13_03_Q1_MCQ.xml", "ABC_13_03_Q2_MCQ.xml", "ABC_13_03_Q3_MCQ.xml", "ABC_13_03_Q4_MCQ.xml", "ABC_13_10_Q1_MCQ.xml", "ABC_13_10_Q2_MCQ.xml", "ABC_13_10_Q3_MCQ.xml", "ABC_13_13_Q1_MCQ.xml", "ABC_13_13_Q2_MCQ.xml", "ABC_13_13_Q3_MCQ.xml", "ABC_13_13_Q4_MCQ.xml", "ABC_16_06_Q10_MCQ.xml", "ABC_16_06_Q12_MCQ.xml", "ABC_16_06_Q13_MCQ.xml", "ABC_16_06_Q1_MCQ.xml", "ABC_16_06_Q3_MCQ.xml", "ABC_16_06_Q4_MCQ.xml", "ABC_16_06_Q6_MCQ.xml", "ABC_16_06_Q8_MCQ.xml", "ABC_16_06_Q9_MCQ.xml", "ABC_16_10_Q11_MCQ.xml", "ABC_16_10_Q13_MCQ.xml", "ABC_16_10_Q14_MCQ.xml", "ABC_16_10_Q16_MCQ.xml", "ABC_16_10_Q18_MCQ.xml", "ABC_16_10_Q1_MCQ.xml", "ABC_16_10_Q3_MCQ.xml", "ABC_16_10_Q5_MCQ.xml", "ABC_16_10_Q7_MCQ.xml", "ABC_16_10_Q9_MCQ.xml", "ABC_17_10_q1_MCQ.xml", "ABC_17_10_q2_MCQ.xml", "ABC_17_10_q3_MCQ.xml", "ABC_17_10_q4_MCQ.xml", "ABC_17_10_q5_MCQ.xml", "ABC_17_10_q6_MCQ.xml", "ABC_17_10_q7_MCQ.xml", "ABC_17_10_q8_MCQ.xml", "ABC_17_11_Q11_MCQ.xml", "ABC_17_11_Q13_MCQ.xml", "ABC_17_11_Q15_MCQ.xml", "ABC_17_11_Q18_MCQ.xml", "ABC_17_11_Q20_MCQ.xml", "ABC_17_11_Q2_MCQ.xml", "ABC_17_11_Q4_MCQ.xml", "ABC_17_11_Q7_MCQ.xml", "ABC_17_11_Q9_MCQ.xml", "ABC_18_08_Q1_MCQ.xml", "ABC_18_08_Q2_MCQ.xml", "ABC_18_08_Q3_MCQ.xml", "ABC_18_08_Q4_MCQ.xml", "ABC_18_08_Q5_MCQ.xml", "ABC_18_08_Q6_MCQ.xml", "ABC_18_08_Q7_MCQ.xml", "ABC_18_08_Q8_MCQ.xml", "ABC_5_06_Q1_MCQ.xml", "ABC_5_06_Q2_MCQ.xml", "ABC_5_06_Q3_MCQ.xml", "ABC_5_06_Q4_MCQ.xml", "ABC_5_06_Q5_MCQ.xml", "ABC_5_06_Q6_MCQ.xml", "ABC_5_06_Q7_MCQ.xml", "ABC_6_03_Q10_MCQ.xml", "ABC_6_03_Q11_MCQ.xml", "ABC_6_03_Q12_MCQ.xml", "ABC_6_03_Q13_MCQ.xml", "ABC_6_03_Q14_MCQ.xml", "ABC_6_03_Q1_MCQ.xml", "ABC_6_03_Q2_MCQ.xml", "ABC_6_03_Q3_MCQ.xml", "ABC_6_03_Q4_MCQ.xml", "ABC_6_03_Q5_MCQ.xml", "ABC_6_03_Q6_MCQ.xml", "ABC_6_03_Q7_MCQ.xml", "ABC_6_03_Q8_MCQ.xml", "ABC_6_03_Q9_MCQ.xml", "ABC_7_07_Q2_MCQ.xml", "ABC_7_07_Q3_MCQ.xml", "ABC_7_07_Q4_MCQ.xml", "ABC_7_07_Q5_MCQ.xml", "ABC_7_07_Q6_MCQ.xml", "ABC_7_07_Q7_MCQ.xml", "ABC_8_03_Q1_MCQ.xml", "ABC_8_03_Q2_MCQ.xml", "ABC_8_03_Q3_MCQ.xml", "ABC_8_03_Q4_MCQ.xml", "ABC_8_03_Q6_MCQ.xml", "ABC_8_03_Q7_MCQ.xml", "ABC_8_03_Q8_MCQ.xml", "ABC_8_03_Q9_MCQ.xml", "ABC_9_02_Q1_MCQ.xml", "ABC_9_05_Q1_MCQ.xml", "ABC_a1_23_Q1_MCQ.xml", "ABC_a2_02_Q1_MCQ.xml", "ABC_a2_13_Q1_MCQ.xml", "ABC_a3_04_Q1_MCQ.xml", "ABC_a3_06_Q1_MCQ.xml", "ABC_a3_20_Q1_MCQ.xml", "ABC_a3_24_Q1_MCQ.xml", "ABC_a3_29_Q1_MCQ.xml"];
		var rnd = Math.floor((Math.random() * filenames.length) + 1);
		var str = "./questions/" + filenames[rnd];
		console.log(str);
		return str;
	}

});
