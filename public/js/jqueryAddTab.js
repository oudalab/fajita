 //this javascript is for the add tab button for multiple rows.
$(function() {
    var tabs= $( "#tabs" ).tabs();
     var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
     var tabCounter=1;

    function addTab(){
    	var label="yan's tab";
    	var id="tabs-4";
    	var   li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) );
    	tabs.find( ".ui-tabs-nav" ).append( li );
    	tabs.tabs( "refresh" );
    }

    $("#addSource").click(function(){
      addTab();
    });
  });
