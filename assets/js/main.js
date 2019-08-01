
$(document).ready(function () {
  var danhSachTK = new DanhSachTaiKhoan();
  var dataJSON = localStorage.getItem("DSTK");
  var viTri = 0;
  var validation = new Validation();
  if (dataJSON) {
    danhSachTK.mangTaiKhoan = JSON.parse(dataJSON);
    taoBang(danhSachTK.mangTaiKhoan);
  } else {
    danhSachTK.mangTaiKhoan = [];
  }
  function taoBang(array) {
    var content = "";
    array.map(function (item, index) {
      content += `
        <tr>
        <td>${index + 1}</td>
        <td>${item.taiKhoan}</td>
        <td>${item.matKhau}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
        <td>${item.soDienThoai}</td>
        <td><button class="btn btn-danger" id="btnXoa" data-id=${index}>Xoá</button>
        <button class="btn btn-primary" id="btnSua" data-id=${index} data-toggle="modal" data-target="#myModal">Sửa</button></td>
        </tr>
         `
    })


    $("#tblDanhSachNguoiDung").html(content);

  }

  $("body").delegate("#btnXoa", "click", function (event) {
    var btnXoa = event.target;
    viTri = btnXoa.getAttribute("data-id");
    (danhSachTK.mangTaiKhoan).splice(viTri, 1);
    taoBang(danhSachTK.mangTaiKhoan);
    setLocalStorage();
  })
  $("body").delegate("#btnSua", "click", function (event) {
    var title = "Sửa người dùng";
    $("#TaiKhoan").attr("disabled","1");
    $(".modal-title").html(title);
    var btnCapNhat = "<button class='btn btn-success' id='btnCapNhat'>Cập nhật</button>"
    $(".modal-footer").html(btnCapNhat);
    var btnSua = event.target;
    viTri = btnSua.getAttribute("data-id");
    var tK = danhSachTK.mangTaiKhoan[viTri];
    giaTri(tK.taiKhoan, tK.hoTen, tK.matKhau, tK.email, tK.soDienThoai)

  })
  $("body").delegate("#btnCapNhat", "click", function () {
    var tK = layThongTin();
    var isValid = kiemTraHopLe();
    if (isValid == true) {
      danhSachTK.mangTaiKhoan[viTri] = tK;
      setLocalStorage();
      taoBang(danhSachTK.mangTaiKhoan);
    }
  })
  $("#btnThemNguoiDung").click(function () {
    giaTri("", "", "", "", "");
$("#TaiKhoan").prop("disabled",false);
    var title = "Thêm người dùng";
    $(".modal-title").html(title);
    var btnThemMoi = "<button class='btn btn-danger' id='btnThemMoi'>Thêm mới</button>"
    $(".modal-footer").html(btnThemMoi);

  })
  $("body").delegate("#btnThemMoi", "click", function () {
    var tK = layThongTin();
    var isValid = kiemTraHopLe();
    if (isValid == true) {
      danhSachTK.themTaiKhoan(tK);
      taoBang(danhSachTK.mangTaiKhoan);
      setLocalStorage();
    }
  })
  function kiemTraHopLe() {
    var isValid = true;
    isValid &= validation.kiemTraTaiKhoan("#TaiKhoan", "#spanTaiKhoan", "Vui lòng nhập tài khoãn đúng định dạng")
    isValid &= validation.kiemTraMatKhau("#MatKhau", "#spanMatKhau", "Vui lòng nhập mật khảu đúng định dạng");
    isValid &= validation.kiemTraHoTen("#HoTen", "#spanHoTen", "Vui lòng nhập đúng họ tên");
    isValid &= validation.kiemTraEmail("#Email", "#spanEmail", "Vui lòng nhập đúng email");
    isValid &= validation.kiemTraSDT("#SoDienThoai", "#spanSDT", "Vui lòng nhập đúng số điện thoại");
    return isValid;
  }
  function giaTri(taiKhoan, hoTen, matKhau, email, soDienThoai) {
    $("#TaiKhoan").val(taiKhoan);
    $("#HoTen").val(hoTen);
    $("#MatKhau").val(matKhau);
    $("#Email").val(email);
    $("#SoDienThoai").val(soDienThoai);
    $("span").html("");
  }
  function layThongTin() {
    var TaiKhoan = $("#TaiKhoan").val();
    var HoTen = $("#HoTen").val();
    var MatKhau = $("#MatKhau").val();
    var Email = $("#Email").val();
    var SoDienThoai = $("#SoDienThoai").val();
    var tK = new taiKhoan(TaiKhoan, HoTen, MatKhau, Email, SoDienThoai)
    return tK;
  }
  function setLocalStorage() {
    dataJSON = JSON.stringify(danhSachTK.mangTaiKhoan);
    localStorage.setItem("DSTK", dataJSON);
  }
  $("#inputSearch").keyup(function () {
    var keyword = $("#inputSearch").val().toLowerCase().replace(/\s/g, '');
    danhSachTKTimKiem = [];
    danhSachTKTimKiem = (danhSachTK.mangTaiKhoan).filter(function (item) {

      return item.hoTen.toLowerCase().replace(/\s/g, '').indexOf(keyword) != -1;
    })
    taoBang(danhSachTKTimKiem);
  })
})