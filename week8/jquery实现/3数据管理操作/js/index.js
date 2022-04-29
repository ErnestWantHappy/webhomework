$(init)

function init() {
    $("body").on('click', '.btn-del', function () {
      $(this).parent().remove();
    });
    $("body").on('click', '.btn-add', function () {
      var $li = $("li:last").clone(true);
      $("li:last").after($li);
      var s=$("li:last>span").text();//字符串，代表当前span元素的序号
      var number=parseInt(s); 
      $("li:last>span").text(number+1);
    });
}
