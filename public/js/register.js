window.onload = pageLoad;
function pageLoad(){
	var form = document.getElementById("myForm");
	form.onsubmit = validateForm;
}

function validateForm() {
    //ถ้าตรวจสอบแล้วว่ามีการ register ไม่ถูกต้องให้ return false ด้วย
    var Pass1 = document.forms["myForm"]["password1"];
    var Pass2 = document.forms["myForm"]["password2"];
    
    //ถ้าPassword ไม่ตรงกัน
    if(Pass1.value != Pass2.value){
        document.getElementById("errormsg").innerHTML = "error";
        alert ("Password did not match: Please try again");
        return false;
    }
    //ถ้าPassword ตรงกัน
    else{
        alert("Password Match: Registration completed");
    }
}
