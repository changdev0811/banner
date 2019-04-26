$(function(){
	$("#detail").slideUp("slow");
	$.ajax({
	    url: "https://customerapi.mydealeronline.com/inventories/search?page=0&size=20&token=jL4puHtBQLxCFt3mi5KO",
	    dataType: "json",
	    method: "GET",
	    async: false,
	    success: function(response){
	      // console.log(response);
	      let list = response.List;
	      let content_html = '';
	      let i = 0;
	      $.each(list, function(index, item){
	        i++;
	        let Id = item.Id;
	      	let ImageProxyUrl = item.ImageProxyUrl;
	    	let Year = item.Year;
	    	let Make = item.Make;
	    	if (Make.length >4){
	            Make = Make.substr(0, 3)+'..';
	          }
	    	let Model = item.Model;
	    	if (Model.length >10){
	            Model = Model.substr(0, 7)+'...';
	          }
	    	let TopOffer = item.TopOffer;
	    	let _Trim_ = item.Trim;
	        
	        try {
	          if (_Trim_.length >5){
	            _Trim_ = _Trim_.substr(0, 5)+'...';
	          }
	        }
	        catch(err){
	          _Trim_ = "";
	        }
    		let Mileage = item.Mileage;
    		let AuctionInventoryUrl = "https://www.worldautosalesneb.com/exclusive-offsite-vehicles.aspx?utm_source=exclusive-offsite-vehicles&utm_medium=dynamic_banner&utm_campaign=dynamic_FB_vehicle";
    		let IsCleanTitle  = item.IsCleanTitle;
    		let desc = '<div style="display: inline-block; width: 70px; height: 100%; padding-left:5px;">'+
								'<p style="margin-bottom: 12px;">'+Year+' '+Make+'</p>'+
								'<p style="margin-bottom: 12px;">'+Model+'</p>'+
								'<p style="margin-bottom: 13px;">'+_Trim_+'</p>'+
								'<p style="font-size: 9px; font-weight:bold; margin-bottom: 15px;">'+Mileage+'mi</p>'+
								'<p style="margin-bottom: 10px;font-size: 13px; color:red;">$'+TopOffer+'</p>'+
								'<a href="#">view more</a>'+
							'</div>';
    		if(IsCleanTitle == "True"){
    			if(i==1){
    				content_html = content_html + '<div class="carousel-item col-12 col-sm-4 col-md-4 col-lg-4 active" style="height: 100%;padding: 0px;">'+
    						 '<div style="display: inline-block; height: 100%;">'+
    						 '<img src="'+ImageProxyUrl+'" class="car-item img-fluid mx-auto d-block" style="height: 100%; cursor:pointer;" data-id='+Id+'>'+
    						 '</div>'+
    						 desc+
    						 '</div>'+
    						 '</div>';
				}else{
					content_html = content_html + '<div class="carousel-item col-12 col-sm-4 col-md-4 col-lg-4" style="height: 100%;padding: 0px;">'+
					 '<div style="display: inline-block; height: 100%;">'+
					 '<img src="'+ImageProxyUrl+'" class="car-item img-fluid mx-auto d-block" style="height: 100%; cursor:pointer;" data-id='+Id+'>'+
					 '</div>'+
					 desc+
					 '</div>';
				}
    		}
	        $('.carousel-inner').html(content_html);
	      });
	    },
	    error: function(data){
	      alert("Error");
	      $(".container-fluid").html("");
	    }
	});
	$(".car-item").bind('touchstart click', function(e){

		//modal 
		const _html = '<p style="font-size: 18px; margin-bottom: 10px; text-align: center;line-height:20px;">No hassle inquiry. We will only contact you ONCE regarding this vehicle</p>'+
      					'<form class="form-inline"><input id="email_phone" type="text" style="width:280px;" class="form-control" placeholder="email or phone">'+
      					'<button type="button" class="btn btn-danger" style="background-color:red;" onclick="javascript: send();">Submit</button></form>';
  		$(".modal-body").html(_html);

  		//

		let Id = $(this).data('id');
		let ImageProxyUrl = $(this).attr('src');
		$("#detail").slideDown("slow");
		$("#detail").remove();
		$.ajax({
	      url: "https://customerapi.mydealeronline.com/inventories/inventory?inventoryID="+Id+"&token=jL4puHtBQLxCFt3mi5KO",
	      dataType: "json",
	      method: "GET",
	      async: false,
	      success: function(response){
	        // console.log(response);
	        $("#inventoryID").val(response.Id);
	        let _TopOffer = response.TopOffer;
	        let _Year = response.Year;
	        let _Make = response.Make;
	        let _MakeId = response.MakeId;
	        let _Mileage = response.Mileage;
	        let _Model = response.Model;
	        let _Trim = response.Trim;
	        let Images = response.Images;
	        try {
	          // if (_Trim.length >3){
	            _Trim = _Trim.substr(0, 2);
	          // }
	        }
	        catch(err){
	          _Trim_ = "";
	        }
	        let note = "Note: This vehicle is NOT currently on display at the dealer's lot but could be brought in upon customer's request."
	        let car_images_top = "";
	        let car_images_down = "";
	        
	        images_count = Images.length;
	        $.each(Images, function(index, item){
	        	// console.log(item.ThumbnailImageUrl);
	        	if(index<4){
	        		car_images_top = car_images_top + '<td><img class="thumbnail" src="'+item.ThumbnailImageUrl+'"></td>';
	        	}else{
	        		car_images_down = car_images_down + '<td><img class="thumbnail" src="'+item.ThumbnailImageUrl+'"></td>';
	        	}

		        if(index==7){
		        	return false;
		        }
	        });
	        detail_html = '<div id="detail">'+
	        					'<div class="car-image"><img id="main_image" src="'+ImageProxyUrl+'" style="margin-top:10px; margin-bottom:30px;margin-left:10px;margin-right:10px; width: 95%; border:3px; border-style:solid;border-color: #fdc5c5">'+
	        					'<div style="width:300px;padding-left:15px;padding-bottom:8px;"><p style="display:inline; line-height: 1.3; color:white; font-size:12px;"">'+note+'</p></div><button style="width:20px; height:20px;" onclick="javascript:test()">X</button>'+
	        					'</div>'+
	        					'<div class="car-desc">'+
	        						'<table width="320px" height="128px"><tr>'+car_images_top+'</tr><tr>'+car_images_down+'</table>'+
	        						'<div style="text-align:center; margin-top:15px;margin-bottom: 10px;"><img src="assets/img/phone-icon_728x90_expand.png" style="vertical-align: sub;"><a href="tel:2154165584" class="text_shadow" style="color: white; font-size:20px; font-weight:bold;">215-416-5584</a></div>'+
	        						'<div style="text-align:center; margin-bottom:20px;"><img onclick="javascript: confirm();" class="inquire_btn" src="assets/img/button_728x90_expand.png" style="cursor:pointer;"></div>'+
	        						'<div style="text-align:center;margin-bottom:25px;"><a target="_blank" href="https://www.worldautosalesneb.com/exclusive-offsite-vehicles.aspx?makeID='+_MakeId+'" class="value" style="font-weight: 400;"><h5 style="color:yellow; text-decoration: underline">SEE SIMILAR VEHICLE</h5></a></div>'+
	        						'<div>'+
	        							'<table width="330px" height="100px"><tr><td class="key_1" colspan=4>'+_Year+' '+_Make+' '+_Model+' '+_Trim+'</td></tr>'+
	        							'<tr><td class="key">Price:</td><td class="value">$'+_TopOffer+'</td><td class="key">Model:</td><td class="value">'+_Model+'</td></tr>'+
	        							'<tr><td class="key">Year:</td><td class="value">'+_Year+'</td><td class="key">Trim:</td><td class="value">'+_Trim+'</td></tr>'+
	        							'<tr><td class="key">Make:</td><td class="value">'+_Make+'</td><td class="key">Mileage:</td><td class="value">'+_Mileage+'mi</td></tr>'+
	        							'</table>'+
	        						'</div>'+
	        					'</div>'+
	        				'</div>'
	    		
	    		$("body").append(detail_html);
	      },
	      error: function(data){
	        alert("Error");
	        // $("#container").html("");
	      }
	    });
	    $(".thumbnail").bind('touchstart click', function(e){
			let thumbnailImageUrl = $(this).attr('src');
			
			$("#main_image").attr("src", thumbnailImageUrl);
		});
	});

});

function test(){
  // $("#detail").slideUp("slow");
  $("#detail").remove();
  AdButlerIframeContentManager.triggerCloseEvent();
}



function send(){
    const script_url = "https://script.google.com/macros/s/AKfycbw6rEh_I8qB3SLMqLLA6x-TszEjd3geIFVEAlUPCno0iw2luLE/exec";
    let email_phone = $('#email_phone').val();
    let inventoryID = $("#inventoryID").val();
    let source = window.location.hostname;
    const url = script_url + "?callback=ctrlq&email_phone=" + email_phone + "&inventoryID=" + inventoryID + "&source=" + source + "&action=insert";
    $.ajax({
      url: url,
      dataType: "json",
      method: "GET",
      success: function(data){
        if (data.result == "success"){
          const message = "Thank you. We will contact you shortly";
          $(".modal-body").html("<p style='font-size: 18px; margin-top: 43px;'>"+message+"</p>")
        }
        setTimeout(function(){ 
          $("#myModal").css("display", "none");
        }, 30000);
      }
    });
    
  }

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function confirm(){
	modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}