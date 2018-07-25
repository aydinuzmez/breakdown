app1.factory("pdfExport",function(){
    var factory = {};
    var doc = new jsPDF();
    
    factory.imgData = function() {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAByCAYAAAC4P4gMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NzU1NzYyRjJCMjcxMUU3ODlDRkQ3NTFGMjRDMjc5MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NzU1NzYzMDJCMjcxMUU3ODlDRkQ3NTFGMjRDMjc5MSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc3NTU3NjJEMkIyNzExRTc4OUNGRDc1MUYyNEMyNzkxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc3NTU3NjJFMkIyNzExRTc4OUNGRDc1MUYyNEMyNzkxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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'
    }

    factory.companyLogo = function() {
        var imgData = factory.imgData();
        doc.addImage(imgData,'PNG',20,25,36,27)
    };

    factory.save = function(categories) {
        console.log(categories);
        factory.companyLogo();
        doc.setFontSize(22);
        var y = 60;
        doc.text(categories[0].name, 20,y)
        doc.setFontSize(12);
        doc.setLineWidth(0.5);
        doc.line(20,y+2,90,y+2);
        var assets1 = [];
        
        for (i=0; i < categories[0].assets.length; i++) {
            assets1.push(categories[0].assets[i].name);
        }
        doc.text(20,y+10,assets1);
        doc.setFontSize(22);
        doc.text(categories[1].name, 92,y)
        doc.setFontSize(12);
        doc.setLineWidth(0.5);
        doc.line(92,y+2,150,y+2);
        var assets2 = [];
        for (i=0; i < categories[1].assets.length; i++) {
            assets2.push(categories[1].assets[i].name);
        }
        doc.text(92,y+10,assets2);
        /* doc.save("a4.pdf") */

    }
    return factory;


})

app1.factory("pdfExport",function(){
    var factory = {};
    var doc = new jsPDF("p","pt","a4");
    doc.internal.scaleFactor = 3.75;

    var element = document.getElementById("left_modal");

    var option ={
        pagesplit:true,
        retina:true,
        background:"#ccc"
    };
    factory.save = function() {
        doc.addHTML(element,option,function(){
            doc.save("a4.pdf");
        });

    }
    return factory;
})

app1.factory("pdfExport",function(){
    var factory = {};
    /*
    var w = doc.internal.pageSize.width;
    var h = doc.internal.pageSize.height;
    */
    factory.save = function() {  
        var doc = new jsPDF("p","pt","a4");
        doc.internal.scaleFactor = 3.75;
        var element = document.getElementById("left_modal");
        var w = element.clientWidth;
        var h = element.clientHeight;

        console.log("client:",w,h);
        console.log("doc_pageSze",doc.internal.pageSize.width,doc.internal.pageSize.height);
        var testcanvas =  document.createElement("canvas");
        testcanvas.width = w*2;
        testcanvas.height = h*2;
        testcanvas.style.width = w+"px";
        testcanvas.style.height = h+"px";
        
        var context = testcanvas.getContext("2d");
        context.scale(2,2);


        var option = {
            pagesplit:true,
            canvas:testcanvas
            /*format:"PNG" */
        }
         doc.addHTML(element,option,function(){
        doc.save("a4.pdf");
    });

    }
    return factory;
})



app1.factory("pdfExport",function(){
    var factory = {};
    /*
    var w = doc.internal.pageSize.width;
    var h = doc.internal.pageSize.height;
    */
    factory.save = function() {  
        var doc = new jsPDF("p","pt","a4");
        doc.internal.scaleFactor = 1;
        var element = $("#left_modal")[0];

        var option = {
            pagesplit:true,
            retina:true,
            format:"PNG" 
        }
         doc.addHTML(element,option,function(){
        doc.save("a4.pdf");
    });

    }
    return factory;
})


app1.factory("pdfExport",function($http){
    var factory = {};
    var filename = "a4_2.pdf"

    factory.getHtml = function(){
        return $http.get("export.html")
    }



    factory.save = function(html) {  
        var pdf = new jsPDF("p","pt","a4");
        var canvas = pdf.canvas;
        canvas.height = 72 * 11;
        canvas.width = 72 * 8.5;
        html2pdf(html,pdf,function(pdf) {
                return pdf.save(filename)
            });
    }
    return factory;
})



app1.factory("pdfExport",function($http){
    var factory = {};
    var filename = "a4_2.pdf"

    factory.getHtml = function(){
        return $http.get("export.html")
    }

    factory.save = function() {
        var doc = new jsPDF("p","pt","a4");
        doc.internal.scaleFactor = 1;
        var element = $("#export")[0];

        var option = {
            pagesplit:true,
            retina:true,
            format:"PNG" 
        }
         doc.addHTML(element,option,function(){
        doc.save(filename);
    });

    }
    return factory;
})
