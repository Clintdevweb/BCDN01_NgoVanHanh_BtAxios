function Validation() {  
    
    // Kiểm tra rỗng
    this.checkEmpty = function (inputValue, spanID, message) {
        if(inputValue.trim() === ""){
            document.getElementById(spanID).innerHTML = message
            return false;
        }
        else{
            document.getElementById(spanID).innerHTML = ""
            return true
        }
    }

    // Kiểm tra tài khoản bị trùng
    this.checkTaiKhoan = function(inputValue, spanID, message, mang) {
        var isExist = false
        isExist = mang.some(function(item){
            return (item.taiKhoan === inputValue.trim())
        })
        if(isExist){
            document.getElementById(spanID).innerHTML = message;
            return false;
        }else{
            document.getElementById(spanID).innerHTML = ""
            return true;
        }
    }

    // Kiểm tra tên
    this.checkName =  function(inputValue, spanID, message) {
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");

        if(pattern.test(inputValue)){
            document.getElementById(spanID).innerHTML = ""
            return true
        }else{
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // Kiểm tra email
    this.checkEmail = function(inputValue, spanID, message){
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(inputValue.match(pattern)){
            document.getElementById(spanID).innerHTML = ""
            return true
        }else{
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
        
    }

    // Kiểm tra mật khẩu
    this.checkPass = function(inputValue, spanID, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if(inputValue.match(pattern)){
            document.getElementById(spanID).innerHTML = ""
            return true
        }else{
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
        
    }

    // Kiểm tra người dùng
    this.checkNguoiDung = function(selID, spanID, message) {
        var optionIndex = document.getElementById(selID).selectedIndex;
        if(optionIndex != 0) {
            document.getElementById(spanID).innerHTML = ""
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    // Kiểm tra loại ngôn ngữ
    this.checkNgonNgu = function(selID, spanID, message) {
        var optionIndex = document.getElementById(selID).selectedIndex;
        if(optionIndex != 0) {
            document.getElementById(spanID).innerHTML = ""
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    //Kiểm tra mô tả
    this.checkMotTa = function(selID, spanID, message) {
        var pattern = document.getElementById(selID).value.length;
        // console.log(pattern)
        if(pattern <= 60 ){
            document.getElementById(spanID).innerHTML = ""
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    } 

}