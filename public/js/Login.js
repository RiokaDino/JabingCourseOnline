window.onload = loginLoad;
function loginLoad(){
	var form = document.getElementById("myLogin");
	form.onsubmit = checkLogin;
}

function checkLogin(){
	//ถ้าตรวจสอบแล้วพบว่ามีการ login ไม่ถูกต้อง ให้ return false ด้วย
	var user = document.forms["myLogin"]["username"].value;
    var pass = document.forms["myLogin"]["password1"].value;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Username = urlParams.get('username')
    const Password = urlParams.get('password1')

    //ถ้าใส่Username หรือ Password ผิด
    if(user != Username || pass != Password){
        alert("Username or Password did not match: Please try again");
        return false
    }
    //ถ้าใส่Username กับ Password ถูก
    else{
        alert("Login completed");
    }
    
}


			