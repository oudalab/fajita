 //this javascript is for the add tab button for multiple rows. 
 //originally want to only put the tab handle code here,
 //now put all the after page load js code here, can put the jquery event handler code here.
$(function() {
    var tabs= $( "#tabs" ).tabs();
    $( "#tabs1" ).tabs();


     var tabTemplate = "<li><a href='#{href}' id='#{tabid}'>#{label}</a></li>";
     var tabCounter=2;

//for click to see the source summary table
      $("#tabid2").click(function(){
      var sourceword=$('#sourceWord').val();
      /*console.log("this is the sourceword"+sourceword);*/

      $.ajax({
        method: "GET",
        url:"/summaryTable",
        data:{"queryword":sourceword},
        success:function(result){
          $("#summary").html(result);
        }
      });
    });

// for click to see the target summary table
    $("#tabid4").click(function(){
      var targetword=$('#targetWord').val();
      //also the source and taget summary they share the same jade table for summary.
      $.ajax({
        method: "GET",
        url:"/summaryTable",
        data:{"queryword":targetword},
        success:function(result){
          $("#summaryTarget").html(result);
        }
      });
    });
//*******************************clear the form when click on add another button************************//

    $("#addSource").click(function(){ 
    //alert they commit the current one  

     if(confirm("This will clear all the input,please make sure you commit the current role first")){
       $('#sourceForm')[0].reset();
    //need this otherwise when clear it will show up the first option in the input.
     //$(".combobox").prop("selectedIndex", -1);--class won't work when changing only the underlying input and try to clear it later
     $("#combobox0").prop("selectedIndex", -1);
     $("#combobox1").prop("selectedIndex", -1);
     $("#combobox2").prop("selectedIndex", -1);

    }
    else{
        return false;
    }  
    });
      $("#addTarget").click(function(){ 
    //alert they commit the current one  

     if(confirm("This will clear all the input,please make sure you commit the current role first")){
       $('#targetForm')[0].reset();
    //need this otherwise when clear it will show up the first option in the input.
     //$(".combobox").prop("selectedIndex", -1);--class won't work when changing only the underlying input and try to clear it later
   
     $("#combobox4").prop("selectedIndex", -1);
     $("#combobox5").prop("selectedIndex", -1);
     $("#combobox6").prop("selectedIndex", -1);
    }
    else{
        return false;
    }  
    });
//****************************end of this*******************************************************************//


    
//*************************************when underlying box change make the hidden input change*********************//

//test//
/*$('#combobox0input').change(function(){
  console.log("hahah I AM HERE!");
  $('#wholeSentenceForm-SourceCountryCode').val($(this).val());

});*/
/* $('#combobox0input').on("change",function(){

     $('#wholeSentenceForm-SourceCountryCode').val("yanyan");
 });*/
//test//

/*$('.custom-combobox-input').change(function(){
$(this).closest('.comboboxGroup').val($(this).val());
});*/

$("#combobox0").change(function() {
$(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val()).trigger("change");
/*('#wholeSentenceForm-SourceCountryCode').val($(this).val());*/

});

$("#combobox1").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val()).trigger("change");
    });
$("#combobox2").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val()).trigger("change");
    });
$("#combobox3").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val()).trigger("change");
    });
$("#combobox4").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val()).trigger("change");
    });
$("#combobox5").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val()).trigger("change");
    });
$("#combobox6").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val()).trigger("change");
    });

//***************end********************************************************************************************//
  
 //************************set the select value to be empty need this for clear the form*****************************************************//

 //************end**********************************************************************************************// 

    //this is for click the show all button when page load
    $('#toggle0').click();
    $('#toggle1').click();
    $('#toggle2').click();
    $('#toggle3').click();
    $('#toggle4').click();
    $('#toggle5').click();
    $('#toggle6').click();

    //this is to define the click event on the track performance button
    //and also defin the dialog here
    var dialog=$("#trackYourPerformanceDialog").dialog({
     autoOpen:false,
     height:500,
     width:550,
     modal:true,
     title: "Tagging Performance",
     buttons:{
      Close:function(){
        dialog.dialog("close");
      }
     } 
    });
 

    $("#trackYourPerformance").on("click",function(){
        //get total source count
        $.ajax({
        method: "GET",
        url:"/getSourceTaggingCountForCurrentUser",
      
        success:function(result){
          $("#sourceCount").text(result); //text() working here but html() is not working not sure why.
        }
      });
        $.ajax({
        method: "GET",
        url:"/getFlaggedSourceTaggingCountForCurrentUser",
        success:function(result){
          $("#sourceFlagged").html("<strong>"+result+"</strong>"); 
        }
      });
        //get total target count
        $.ajax({
        method: "GET",
        url:"/getVerbTaggingCountForCurrentUser",
      
        success:function(result){
          $("#verbCount").text(result); //text() working here but html() is not working not sure why.
        }
      });
        $.ajax({
        method: "GET",
        url:"/getFlaggedVerbTaggingCountForCurrentUser",
      
        success:function(result){
          $("#verbFlagged").html("<strong>"+result+"</strong>"); 
        }
      });
        //get total sentence count
        $.ajax({
        method: "GET",
        url:"/getSentenceTaggingCountForCurrentUser",
      
        success:function(result){
          $("#sentenceCount").text(result); //text() working here but html() is not working not sure why.
        }
      });

      dialog.dialog("open");
    })
    
  });
