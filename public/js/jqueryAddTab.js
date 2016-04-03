 //this javascript is for the add tab button for multiple rows. 
 //originally want to only put the tab handle code here,
 //now put all the after page load js code here
$(function() {
    var tabs= $( "#tabs" ).tabs();

     var tabTemplate = "<li><a href='#{href}' id='#{tabid}'>#{label}</a></li>";
     var tabCounter=2;

//for click the summary tab.
      $("#tabid2").click(function(){
      console.log("hello tehre!");
      $.ajax({
        url:"/summaryTable",
        success:function(result){
          $("#summary").html(result);
        }
      });
    });
/*
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
    }*/


    $("#addSource").click(function(){ 
    //alert they commit the current one  

     if(confirm("This will clear all the input,please make sure you commit the current role first")){
       $('#sourceForm')[0].reset();
    //need this otherwise when clear it will show up the first option in the input.
     //$(".combobox").prop("selectedIndex", -1);--class won't work when changing only the underlying input and try to clear it later
     $("#combobox0").prop("selectedIndex", -1);
     $("#combobox1").prop("selectedIndex", -1);
     $("#combobox2").prop("selectedIndex", -1);
     $("#combobox3").prop("selectedIndex", -1);
     $("#combobox4").prop("selectedIndex", -1);
     $("#combobox5").prop("selectedIndex", -1);
    }
    else{
        return false;
    }  
    
    });


    
//*************************************when underlying box change make the hidden input change*********************//

$("#combobox0").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val());
    });
$("#combobox1").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val());
    });
$("#combobox2").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val());
    });

//***************end********************************************************************************************//
  
 //************************set the select value to be empty need this for clear the form*****************************************************//

 //************end**********************************************************************************************// 

    //this is for click the show all button when page load
    $('#toggle0').click();
    $('#toggle1').click();
    $('#toggle2').click();
    
  });
