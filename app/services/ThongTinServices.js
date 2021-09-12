function InfoServices() {
         
    // Lấy danh sách người dùng
    this.layDS = function(){
        return axios({
            method: 'get',
            url: 'https://6130edad8066ca0017fdab48.mockapi.io/QLTT_Products',
            
        });
        
    }

    // Thêm thông tin người dùng
    this.them = function(tt) {
        return axios({
            method: 'post',
            url: 'https://6130edad8066ca0017fdab48.mockapi.io/QLTT_Products',
            data: tt
        });
    }

    // Hiển thị thông tin người dùng
    this.hienThi = function(id) {
        return axios({
            method: 'get',
            url: `https://6130edad8066ca0017fdab48.mockapi.io/QLTT_Products/${id}`           
        });
    }

    // Cập nhật thông tin người dùng
    this.capNhat = function(tt, id) {
        return axios({
            method: 'put',
            url: `https://6130edad8066ca0017fdab48.mockapi.io/QLTT_Products/${id}`,
            data: tt
        });
    }

    // Xóa thông tin người dùng
    this.xoaTT = function (id) {
        return axios({
            method: 'delete',
            url: `https://6130edad8066ca0017fdab48.mockapi.io/QLTT_Products/${id}`           
        });
    }
}