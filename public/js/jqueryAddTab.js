 //this javascript is for the add tab button for multiple rows.
$(function() {
    var tabs= $( "#tabs" ).tabs();

     var tabTemplate = "<li><a href='#{href}' id='#{tabid}'>#{label}</a></li>";
     var tabCounter=2;

    function addTab(){
    	var label="role"+tabCounter;
    	var id="tabs-"+tabCounter;
    	var   li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ).replace(/#\{tabid\}/g,"tabid"+tabCounter) );
    	tabs.find( ".ui-tabs-nav" ).append( li );
      //tabs.append( "<div id='" + id + "'>" +  "<div ng-include='"+"../../partials/testPartial.html"+"'></div>" + "</div>" );
      tabs.append("<div id='summary'></div>");
      tabs.append();
    	tabs.tabs( "refresh" );
      
      //this function has to be defined here, if not dynamically, when page load $('#') this objetc may not exist yet.
      $("#tabid2").click(function(){
      console.log("hello tehre!");
      $.ajax({
        url:"/summaryTable",
        success:function(result){
          $("#summary").html(result);
        }
      });
    });

      tabCounter++;
    }

    $("#addSource").click(function(){
      addTab();
    });
    //this is for injetcing the pink edited form in
    
  });