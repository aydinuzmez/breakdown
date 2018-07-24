
app1.controller("app_ctrl", function ($scope,$routeParams,listFactory) {
    $scope.template = {
        "export":"lib/views/export.html",
        "popExport": "lib/views/pop.html",
        "sidebar": "lib/views/sidebar.html",
        "content": "lib/views/content.html",
        "navbar": "lib/views/navbar.html"
    };
    
    $scope.categories = listFactory.getCategories();
    $scope.colors = listFactory.getColors();
    $scope.selectedColor = $scope.colors[0];
    $scope.tab = -1;
    $scope.newAsset_text = "";

	$scope.getCatLink = function(catID) {
		return listFactory.getCatLink(catID)
	}
	
    $scope.addCategory = function (newCategory,newCategoryColor) {
    if (newCategory != "") {
        listFactory.addCategory(newCategory,newCategoryColor);
        $scope.newCategory= "";
		$scope.selectedColor = $scope.colors[0];
        } else { return false}
    };

    $scope.addAssetText = function (catID,newAsset) {
        listFactory.addAssetText(catID,newAsset);
		this.newAsset_text= "";

    };
    $scope.removeAsset = function(catID,assetID) {
        listFactory.removeAsset(catID,assetID)
    };
    $scope.changeBorderColor = function(item,bool) {
        if(bool==true) {
            this.borderColor = {'border-left-color':item};
            this.active = true;
        } else if (bool==false) {
            this.borderColor = {'border-left-color':'#fff'};
            this.active = false;
        }
    }

    $scope.getAssetLink = function(assetID) {
		return listFactory.getAssetLink(catID,assetID+1)
    };

})

.controller("scenerio",function($scope,$routeParams,listFactory){
	
	$scope.x = "0px";
    $scope.y = "0px";
	$scope.selectedText ="";
	$scope.selectedHTML ;
	
	$scope.coordinate = function ($event) {
        $scope.x = $event.x;
        $scope.y = $event.y;
    };

    $scope.context_css = function () {
        return {
            "left" : $scope.left+"px",
            "top": $scope.top+"px",
        }
    };
	
    $scope.textSelected = function () {
        var selection = "";
		var div = document.createElement("div");
        if (window.getSelection) {
        selection = window.getSelection();
		text = selection.toString();
		range = selection.getRangeAt(0);
		var cloneSelection = range.cloneContents()
		div.appendChild(cloneSelection)
        }
        $scope.selectedText = div.innerText;
		$scope.selectedHTML = angular.copy(div);
		console.log($scope.selectedHTML);
    };
	
	$scope.isThereSelectText = function () {
        if ($scope.right_click) {
            return true;
        }
        else {
            return false;
        }
    };

    $scope.rightClick = function () {
		$scope.textSelected()
        $scope.right_click = angular.copy($scope.selectedText);
        $scope.left = $scope.x;
        $scope.top = $scope.y;
    };

	$scope.leftClick = function () {
		$scope.right_click = "";
	};
	
    $scope.addAsset = function (catID,newAsset) {
		listFactory.setInnerHtml($scope.selectedHTML)
		listFactory.addAsset(catID,newAsset)
		$scope.right_click = "";
		document.execCommand("bold", false, null);
    };
})

.controller("ListDetailController",function ($scope,$routeParams,listFactory) {
    var catID = $routeParams.catId;
	$scope.cat = listFactory.getAsset(catID);

    $scope.addAsset = function (newAsset) {
        listFactory.addAsset(catID,newAsset);
		$scope.newAsset= ""

    };

	$scope.getAssetLink = function(assetID) {
		return listFactory.getAssetLink(catID,assetID+1)
	}

})

.controller("AssetController",function($scope,$routeParams) {
	console.log($routeParams.catId)
})

.controller("exportController",function($scope,$routeParams,pdfExport) {
    

    if ($scope.name) {
        console.log($scope.name);
        $scope.valid = "is-valid";
        } else {
        $scope.valid = "is-invalid";
        }

    $scope.ngExport = function() {

            var pdf = new jsPDF("p","pt","a4");
            /*
            var canvas = pdf.canvas;
            var katsayi = 10;
            canvas.height =  pdf.internal.pageSize.height*20;
            canvas.width =  pdf.internal.pageSize.width;*/
            var element = document.getElementById("left_modal");
            /*var data = angular.copy($("#left_modal")[0]);

            element.appendChild(data);*/
            /*
            html2pdf(element,pdf,function(pdf) {
                     pdf.save("a4_2.pdf")
                });
            */

            html2pdf(element,{
                margin: 5,
                filename:"a4_3.pdf",
                image: {type:"jpeg",quality:0.98},
                html2canvas: {dpi:192, letterRendering:true},
                jsPDF: {unit:"pt",format:"a4",orientation:"portrait"}
            });

           /* $("#export #left_modal").remove();*/

  

    };
})

.controller("feedbackController",function($scope){
    $scope.sendFeed = function() {
        var feedPath = "feed/log.txt";
        var feedFile = new File([""],feedPath);
        feedFile.open("w");
        feedFile.writeln("Selam burasi oldu");
        feedFile.close();

    };
})

function listFactory() {
    var listFactory = {};
	var selectSpanLength = 0;

	var colors = [
        {name: "Red",       hex:"#f64f59"},
        {name: "Yellow",    hex:"#fff1a9"},
        {name: "Green",     hex:"#52bf9b"},
        {name: "Orange",    hex:"#ff9555"},
        {name: "Blue",      hex:"#58add8"},
        {name: "Brown",     hex:"#7f5332"},
        {name: "Pink",      hex:"#fea1cd"},
        {name: "Purple",    hex:"#a478e6"},
        {name: "Black",     hex:"#4c5359"},
        ];

    var categories = [
                {
                    id:0,
                    name:"Cast Member",
                    color:"#f64f59",
                    assets:[
                        {
                            name:"Hakan",
                            id:parseInt(date*Math.random())
                        },
                        {
                            name:"Necmi",
                            id:parseInt(date*Math.random())
                        }]
                },
                {
                    id:1,
                    name: "Makeup",
                    color:"#58add8",
                    assets:[{name:"Makyaj",id:parseInt(date*Math.random())}]
                }
            ];

    listFactory.getColors = function () {
        return colors;
    };

    listFactory.getCategories = function () {
        return categories;
    };

    listFactory.getAsset = function (catID) {
        return categories[catID]
    };

    listFactory.removeAsset = function (catID,assetID) {
        var indexAsset = categories[catID].assets.findIndex(i => i.id === assetID)
        var content = document.getElementById("content");
        var deleteElem = document.getElementById("asset_"+assetID)
/*        var deleteElem = angular.element(document.querySelector())*/
        console.log(indexAsset)
        console.log(deleteElem)
        if (deleteElem != null) {
            deleteElem.replaceWith(deleteElem.innerText);
        }
        categories[catID].assets.splice(indexAsset,1)
        /*deleteElem.remove();*/
    };

    listFactory.addCategory = function (newAsset,newCategoryColor) {
        categories.push({
            id:categories.length,
            name:newAsset,
            color:newCategoryColor,
            assets:[]
        });
    };
 
	
	listFactory.getCatLink = function (catID) {
		return "#/"+categoryName+"/"+catID
	};
	

	
	listFactory.setInnerHtml = function(div) {
		selectedHTML = div.innerHTML;
		selectSpanLength = div.getElementsByTagName("span").length;
	};
	
	listFactory.addSecondClass = function() {
		if (selectSpanLength >0) {
			return "secondAsset"
		} else {
			return ""
		}
	}
	
	listFactory.getAssetLink = function (catID,assetID) {
		return listFactory.getCatLink(catID)+"/"+assetName+"/"+assetID
	};
	
	listFactory.addSpan = function(html,colorStyle){
		console.log(colorStyle);
		return "<span class='secondAsset' style='"+colorStyle+"'>"+html+"</span>"
	};


	listFactory.addAssetText = function(catID,newAsset) {
        categories[catID].assets.push({
            id:parseInt(date*Math.random()),
            name:newAsset,
        });
	};
	
    listFactory.addAsset = function (catID,newAsset) {
        listFactory.addAssetText(catID,newAsset)
		var idLength = categories[catID].assets[categories[catID].assets.length-1].id;
		var color = categories[catID].color;
	
		//css angularjs
		borderColor = "border-bottom-color: "+color;
		colorStyle= "color: "+ color;
        var html = '<span contenteditable="false" id="asset_'+idLength+'" class="asset" style="'+borderColor+'"><a href="'+listFactory.getAssetLink(catID,idLength)+'" style="margin:0;padding:0; '+colorStyle+'">'+newAsset+'</a></span>';
        
		if (selectSpanLength >0) {
			//second selected
			html = listFactory.addSpan(selectedHTML,colorStyle);
			document.execCommand("insertHTML", false, html);
			return
			
		};
		
		document.execCommand("insertHTML", false, html);
    };
    return listFactory;
};
app1.factory("listFactory",listFactory)


.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
})

.directive("myEnter",function(){
	return function (scope,element,attrs) {
		element.bind("keydown keypress",function(){
			if (event.which ===13) {
				scope.$apply(function(){
					scope.$eval(attrs.myEnter);
				});
				event.preventDefault();
			}
		})
	}
	
})

.directive('contenteditable', ['$sce', function($sce) {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return; // do nothing if no ng-model

        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
        };

        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$evalAsync(read);
        });
        read(); // initialize

        // Write data to the model
        function read() {
          var html = element.html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if (attrs.stripBr && html === '<br>') {
            html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    };
}]);


