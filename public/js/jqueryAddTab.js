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

$("#combobox0").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val());
    });
$("#combobox1").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val());
    });
$("#combobox2").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val());
    });
$("#combobox3").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val());
    });
$("#combobox4").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val());
    });
$("#combobox5").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val());
    });
$("#combobox6").change(function() {
    $(this).closest('div.ui-widget').find('input.comboboxinput').val($(this).val());
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
    
  });
