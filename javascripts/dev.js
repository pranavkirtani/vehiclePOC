$(document).ready(function()
{
	$('#search').keyup(function()
	{  var data_string=$(this).val();
        if(data_string.length>=3){
        searchTable($(this).val());
        }
     else{
       removeHightlight();
     }
     
		
	});
    
    
    
    $('#add').click(addRow);
    $('#json').click(tableToJson)
});

function searchTable(inputVal)
{
	var table = $('#tblData');
     var flag=false;
	table.find('tr').each(function(index, row)
	{  
		var allCells = $(row).find('td');
		if(allCells.length > 0)
		{
			
			allCells.each(function(index, td)
			{
				var regExp = new RegExp(inputVal, 'i');
				if(regExp.test($(td).text()))
				{
					$(row).addClass('selectedRow');
                    flag=true;
					
				}
			});
            if(!flag){
               removeHightlight();
            }
			
		}
	});
}
function removeHightlight(){

 $('.selectedRow').removeClass('selectedRow');
}
function addRow(){
    var type=$('#type').val();
    var make=$('#make').val();
    var model=$('#model').val();
    if(type===$('#type option:first').val()||!make||!model){
      alert('Please add data in all the fields');
      return;
    }
    var complete_data_string=type+make+model;

    $('#type').val($('#type option:first').val());
    $('#make').val('');
    $('#model').val('');
    if($('#search').val().length>=3&&complete_data_string.indexOf($('#search').val())>-1){
    $('#tblData tbody').append('<tr class="selectedRow"><td>'+type+'</td><td>'+make+'</td><td>'+model+'</td></tr>');
    }
    else{
    
    $('#tblData tbody').append('<tr><td>'+type+'</td><td>'+make+'</td><td>'+model+'</td></tr>');
    }
   
}


function tableToJson() {
    var data = [];

  
    var headers = [];
    
   headers[0]="Type";
   headers[1]="Make";
   headers[2]="Model";
   
   $('table').find('tr').each(function(index,row){
       var tableRow=$(row);
        var rowData = {};
       tableRow.find('td').each(function(index){
        rowData[ headers[index] ] = $(this).text();
       
       });
        data.push(rowData);
       
   
   
   
   })
       
var jsonData=JSON.stringify({"tableData":data})
   $('#jsonInsert').show().text(jsonData)
}