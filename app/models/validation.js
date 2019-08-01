function Validation() {
    this.kiemTraTaiKhoan = function (input, span, thongBao) {
        return this.regex("^[a-z0-9_-]{3,16}$", input, span, thongBao);
    }
    this.kiemTraMatKhau = function (input, span, thongBao) {
        return this.regex("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", input, span, thongBao);
    }
    this.kiemTraHoTen = function (input, span, thongBao) {
        return this.regex("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$", input, span, thongBao);
    }
    this.kiemTraEmail = function (input, span, thongBao) {
        return this.regex("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
            + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", input, span, thongBao);
    }
    this.kiemTraSDT = function (input, span, thongBao) {
        return this.regex("^(09|03|07|08|012)+([0-9]{7,8})$", input, span, thongBao);
    }
    this.regex = function (regExp, input, span, thongBao) {
        var isValid = true;
        var pattern = new RegExp(regExp);
        var value = $(input).val();
        if (!pattern.test(value)) {
            isValid = false;
            $(span).css("display", "block");
            $(span).html(thongBao);
        }
        else {
            $(span).css("display", "none");
            $(span).html("");
        }
        return isValid;
    }
}