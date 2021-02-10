
login = () => { 
    var userName = document.getElementById("user-name").value;
    var password = document.getElementById("user-password").value;
 
	if(userName && password) {
        mp.trigger("client:sendLoginToServer", userName, password);
    } else {
		error('Niste upisali korisničko ime i korisničku lozinku !', ['#user-name', '#user-password'])
    }
}

 
error = (msg, fields = null) => { 
    $('.error').text(msg)
    $('.error').fadeIn(1000);
    setTimeout(() => { $('.error').fadeOut(1000); }, 4000)
    console.log(fields.length)
    if (fields) { 
        $(fields).css('borderColor', 'tomato')
        setTimeout(() => {  $(fields).css('borderColor', 'white') }, 4000); 
    }
    if (fields.length > 1) { 
        fields.forEach(field => { 
            $(field).css('borderColor', 'tomato')
            setTimeout(() => {  $(field).css('borderColor', 'white') }, 4000); 
        })
    }
}

// error('poruka', ['#user-name', '#user-password'])
