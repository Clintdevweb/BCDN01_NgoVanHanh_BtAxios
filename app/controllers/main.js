// Tạo biến có object contructor InfoServices
var ttServices = new InfoServices();
var validation = new Validation();
var mang = [];
// Lấy danh sách
function LayDSTT() {
    ttServices.layDS()
        .then(function (response) {
            // console.log(response.data);
            mang = response.data;
            hienThiTable(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}
LayDSTT()

// Rút gọn getELE
function getELE(id) {
    return document.getElementById(id)
}
// Hiển thị lên giao diện
function hienThiTable(mangTT) {
    var content = "";
    mangTT.map(function (item, index) {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngonNgu}</td>
                <td>${item.loaiND}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaThongTin('${item.id}')" >Xóa</button>
                    <button class="btn btn-info" onclick="hienThiChiTiet('${item.id}')" data-toggle="modal" data-target="#myModal">Xem</button>
                </td>
            </tr>
        `;
    });

    document.getElementById('tblDanhSachNguoiDung').innerHTML = content;
}


// Thêm người dùng cho danh sách trung tâm
function themTT() {
    var account = getELE('TaiKhoan').value;
    var name = getELE('HoTen').value;
    var pass = getELE('MatKhau').value;
    var email = getELE('Email').value;
    var role = getELE('loaiNguoiDung').value;
    var language = getELE('loaiNgonNgu').value;
    var descript = getELE('MoTa').value;
    var image = getELE('HinhAnh').value;

    // Validation
    var isValidation = true;
    // Check tài khoản
    isValidation = validation.checkEmpty(account,'tbTaikhoan','Tài khoản không được để trống')&& validation.checkTaiKhoan(account,'tbTaikhoan','Tài khoản bị trùng',mang);

    // Check name
    isValidation &= validation.checkEmpty(name,'tbName','Tên không được để trống')&& validation.checkName(name,'tbName','Tên phải là kí tự chữ')

    // Check email
    isValidation &= validation.checkEmpty(email,'tbEmail','Email không được để trống')&& validation.checkEmail(email,'tbEmail','Email chưa đúng định dạng')

    // Check pass
    isValidation &= validation.checkEmpty(pass,'tbPass','Mật khẩu không được để trống')&& validation.checkPass(pass,'tbPass','Mật khẩu ( 6-8 kí tự ) phải gồm số, chữ in hoa, kí tự đặc biệt')
    
    // Check role
    isValidation &= validation.checkNguoiDung('loaiNguoiDung','tbNguoiDung','Hãy chọn loại người dùng')

    // Check language
    isValidation &= validation.checkNgonNgu('loaiNgonNgu','tbNgonNgu','Hãy chọn ngôn ngữ')

    // Check image
    isValidation &= validation.checkEmpty(image,'tbImage','Hình ảnh không được để trống')

    // Check descripts
    isValidation &= validation.checkEmpty(descript,'tbMota','Mô tả không được để trống')&& validation.checkMotTa('MoTa','tbMota','Mô tả không quá 60 kí tự')

    // console.log(isValidation)

    if(isValidation){
        var tt = new Info(account, name, pass, email, role, language, descript, image) ;
        ttServices.them(tt)
            .then(function(reponse) {
                // console.log(reponse.data);
                LayDSTT();
                resetForm();
                document.querySelector('#myModal .close').click();
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
}


// Thêm button thêm cho modal
getELE('btnThemNguoiDung').addEventListener("click", function () {
    document.querySelector(".modal-footer").innerHTML = `
    <button class="btn btn-success" onclick="themTT()">Thêm</button>
    `;
    resetForm()

});

// Hiển thị thông tin người dùng
function hienThiChiTiet(id) {
    ttServices.hienThi(id)
        .then(function (response) {
            // console.log(response.data);
            getELE('TaiKhoan').disabled = true;
            getELE('TaiKhoan').value = response.data.taiKhoan;
            getELE('HoTen').value = response.data.hoTen;
            getELE('MatKhau').value = response.data.matKhau;
            getELE('Email').value = response.data.email;
            getELE('HinhAnh').value = response.data.hinhAnh;
            getELE('loaiNguoiDung').value = response.data.loaiND;
            getELE('loaiNgonNgu').value = response.data.ngonNgu;
            getELE('MoTa').value = response.data.moTa;
            //  Thêm button cập nhật
            document.querySelector(".modal-footer").innerHTML = `
             <button class="btn btn-success" onclick="capNhatThongTin('${response.data.id}')">Cập nhật</button>
         `;
        })
        .catch(function (error) {
            console.log(error);
        });
        tatThongBao()
}

// Cập nhật thông tin người dùng
function capNhatThongTin(id) {

    // Lấy thông tin từ form
    var account = getELE('TaiKhoan').value;
    var name = getELE('HoTen').value;
    var pass = getELE('MatKhau').value;
    var email = getELE('Email').value;
    var role = getELE('loaiNguoiDung').value;
    var language = getELE('loaiNgonNgu').value;
    var descript = getELE('MoTa').value;
    var image = getELE('HinhAnh').value;

    // Validation
    var isValidation = true;
    // Check name
    isValidation &= validation.checkEmpty(name,'tbName','Tên không được để trống')&& validation.checkName(name,'tbName','Tên phải là kí tự chữ')

    // Check email
    isValidation &= validation.checkEmpty(email,'tbEmail','Email không được để trống')&& validation.checkEmail(email,'tbEmail','Email chưa đúng định dạng')

    // Check pass
    isValidation &= validation.checkEmpty(pass,'tbPass','Mật khẩu không được để trống')&& validation.checkPass(pass,'tbPass','Mật khẩu ( 6-8 kí tự ) phải gồm số, chữ in hoa, kí tự đặc biệt')
    
    // Check role
    isValidation &= validation.checkNguoiDung('loaiNguoiDung','tbNguoiDung','Hãy chọn loại người dùng');

    // Check language
    isValidation &= validation.checkNgonNgu('loaiNgonNgu','tbNgonNgu','Hãy chọn ngôn ngữ');

    // Check image
    isValidation &= validation.checkEmpty(image,'tbImage','Hình ảnh không được để trống')

    // Check descripts
    isValidation &= validation.checkEmpty(descript,'tbMota','Mô tả không được để trống')&& validation.checkMotTa('MoTa','tbMota','Mô tả không quá 60 kí tự')
    

    if(isValidation){
        var tt = new Info(account, name, pass, email, role, language, descript, image);
        ttServices.capNhat(tt, id)
            .then(function (response) {
                // console.log(response.data);
                LayDSTT();
                document.querySelector("#myModal .close").click();
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

// Xóa thông tin người dùng
function xoaThongTin(id) {
    ttServices.xoaTT(id)
        .then(function (response) {
            // console.log(response)
            LayDSTT()
        })
        .catch(function (error) {
            console.log(error)
        })
}

// Reset form nhập
function resetForm() {
    getELE('TaiKhoan').value = "";
    getELE('HoTen').value = "";
    getELE('MatKhau').value = "";
    getELE('Email').value = "";
    getELE('HinhAnh').value = "";
    getELE('loaiNguoiDung').value = document.querySelectorAll("#loaiNguoiDung option")[0].value;
    getELE('loaiNgonNgu').value = document.querySelectorAll("#loaiNgonNgu option")[0].value;
    getELE('MoTa').value = "";
    getELE('TaiKhoan').disabled = false;
    tatThongBao()
}

// Tắt thông báo lỗi
function tatThongBao() {
    var spThongBao = document.querySelectorAll('.txt-thongbao')
    spThongBao.forEach(function(item){
        item.innerHTML = ""
    })
}

// Ẩn thông báo khi nhập
function onInPut(messageId, inputID) {
    var message = getELE(messageId)
    var input = getELE(inputID)
    input.oninput = function(){
        if(message.innerHTML != "") {
            message.innerHTML = ""
        }
    }
}

onInPut("tbTaikhoan", "TaiKhoan");
onInPut("tbName", "HoTen");
onInPut("tbPass", "MatKhau");
onInPut("tbEmail", "Email");
onInPut("tbImage", "HinhAnh");
onInPut("tbNguoiDung", "loaiNguoiDung");
onInPut("tbNgonNgu", "loaiNgonNgu");
onInPut("tbMota", "MoTa");