	$('#btnCreate').click(function() {
		alert('Create Info');
		var data = {"firstName":+$('.txtName').val(),"lastName":+$('.txtDOB').val(),"gender":+$('.txtGender').val(),"gender":+$('.txtGender').val(),"provider":+$('.txtProvider').val(),"email":+$('.txtEmail').val(),"username":+$('.txtUserName').val(),"password":+$('.txtPassword').val(),"ConfirmPassword":+$('.txtConfirmPassword').val(),"diagnosis":+$('.txtDiagnosis').val(),"symptons":+$('.txtSymptons').val()}
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
	
$(document).on('pageshow ', function() {
    loadFoooterLinks();
});	

function loadFoooterLinks() {
	$("#footerLinks").replaceWith("<ul>"
	+ "<li><a href='research.html'>Research Feed</a></li>"
	+ "<li><a href='mydata.html'>My Data</a></li>"
	+ "<li><a href='index.html'>Home</a></li>"
	+ "<li><a href='inbox.html'>Inbox</a></li>"
	+ "<li><a href='community.html'>My Community</a></li>"
	+ "<li><a href='profile.html'>My Profile</a></li>"
	+ "<li><a href='create-profile.html'>Create Profile</a></li>"
	+ "</ul>");
}