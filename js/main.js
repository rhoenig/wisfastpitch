$(document).ready(function(){
   	loadFoooterLinks();
   	if(localStorage.getItem('userInfo') == "null"){
	   	$.mobile.changePage('index.html#seven');
	   	//$('#seven').append('<div data-role="header" class="ui-header ui-bar-a" role="banner"><a href="index.html" data-icon="delete" class="ui-btn-left ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-a ui-btn-active" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Home</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a><h1 class="ui-title" role="heading" aria-level="1">Login</h1><a href="index.html" data-icon="check" data-theme="b" class="ui-btn-right ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-b" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Login</span><span class="ui-icon ui-icon-check ui-icon-shadow">&nbsp;</span></span></a></div>').trigger( "create" );
	} else {
		$.mobile.changePage('index.html#two');
		//$('#seven').append('<div data-role="header" class="ui-header ui-bar-a" role="banner"><a href="index.html" data-icon="delete" class="ui-btn-left ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-a ui-btn-active" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Home</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a><h1 class="ui-title" role="heading" aria-level="1">Login</h1><a href="index.html" data-icon="check" data-theme="b" class="ui-btn-right ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-b" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Logout</span><span class="ui-icon ui-icon-check ui-icon-shadow">&nbsp;</span></span></a></div>').trigger( "create" );
	}
	
   	$('#btn').click(function() {
	    alert('Get Info');
	    $.ajax({
	        url: "http://nephcurebetaapi.azurewebsites.net/api/v1/users/"+$('.txt').val(),
	        type: "GET",
	    	contentType: "application/json",
	        dataType: "json",
	        success: function (result) {
		        alert('Got Data');
		        console.log(result);
		        var i, repo;
		        $.each(result, function (i, repo) {
		           $("#allRepos").append("<h4>" + repo.firstName + "</h4>"
		            + "<p>" + repo.lastName + "</p>"
		            + "<p>" + repo.age + "</p></a></li>");
		        });
		        $('#allRepos').listview('refresh');
	       },
	        error: function (xhr, ajaxOptions, thrownError) {
	        	alert(xhr.status);
	        	alert(thrownError);
	        }
	    });
	});

	$('#btnCreate').click(function() {
		alert('Create Info');
		var blnContinue = '';
		if ($('#txtEmail').val() == '' || $('#txtUserName').val() != '' || $('#txtPassword').val() != '') {
			return false;
		}
		
		if ($('#txtPassword').val() != $('#txtConfirmPassword').val()) {
			return false;
		}
		
		var email = $("#email").val();
		if (!validateEmail(email)) {
		    return false;
		}		
		
		var data = {"emailaddress":+$('#txtEmail').val(),"username":+$('#txtUserName').val(),"password":+$('#txtPassword').val()};
	    $.ajax({
	        url: "http://nephcurebetaapi.azurewebsites.net/api/v1/users/",
	        type: "POST",
	    	contentType: "application/json",
	        data : JSON.stringify(data),
	        dataType: "json",
	        success: function (result) {
		            alert('Profile Created '+result.id);
			        console.log(data);
	       },
	        error: function (xhr, ajaxOptions, thrownError) {
	        alert(xhr.status);
	        alert(thrownError);
	        }
	    });
	});
	
	$('.btnLogin').click(function() {
		alert('Login');
		//var data = {"firstName":+$('#txtName').val(),"lastName":+$('#txtlastName').val(),"age":+$('#txtGender').val()};
		localStorage.setItem('userInfo', 'true');
		$.mobile.changePage('index.html#two');
	    //$.ajax({
	    //    url: "http://testing.hoenigwebdesign.com/dev/login.php?email="+$('#username').val()+"&password="+$('#password').val()+"&login=true",
	    //    type: "POST",
	    //	contentType: "application/json",
	    //    data : JSON.stringify(data),
	    //    dataType: "json",
	    //    success: function (result) {
		//            localStorage.setItem('userInfo', result.d);
		//            alert('Login Successful');
		//	        console.log(data);
	    //    },
	    //    error: function (xhr, ajaxOptions, thrownError) {
	    //    	alert(xhr.status);
	    //    	alert(thrownError);
	    //    }
	    //});
	});
	
	$('.btnLogOut').click(function() {
		alert('LogOut');
		//var data = {"firstName":+$('#txtName').val(),"lastName":+$('#txtlastName').val(),"age":+$('#txtGender').val()};
		localStorage.setItem('userInfo', 'null');
		$.mobile.changePage('index.html#seven');
	    //$.ajax({
	    //    url: "http://testing.hoenigwebdesign.com/dev/login.php?email="+$('#username').val()+"&password="+$('#password').val()+"&login=true",
	    //    type: "POST",
	    //	contentType: "application/json",
	    //    data : JSON.stringify(data),
	    //    dataType: "json",
	    //    success: function (result) {
		//            localStorage.setItem('userInfo', result.d);
		//            alert('Login Successful');
		//	        console.log(data);
	    //    },
	    //    error: function (xhr, ajaxOptions, thrownError) {
	    //    	alert(xhr.status);
	    //    	alert(thrownError);
	    //    }
	    //});
	});
 });

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function loadFoooterLinks() {
	$("#footerLinks").replaceWith("<ul>"
	+ "<li><a href='#research' data-role='button'>Research Feed</a></li>"
	+ "<li><a href='#mydata' data-role='button'>My Data</a></li>"
	+ "<li><a href='#index' data-role='button'>Home</a></li>"
	+ "<li><a href='#inbox' data-role='button'>Inbox</a></li>"
	+ "<li><a href='#community' data-role='button'>My Community</a></li>"
	+ "<li><a href='#profile' data-role='button'>My Profile</a></li>"
	+ "<li><a href='#one' data-role='button'>Create Profile</a></li>"
	+ "</ul>");
}