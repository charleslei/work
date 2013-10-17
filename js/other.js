//菜单选择状态时上方的border；
var act = $('.head .active');
$('.header_top').css('left',act.offset().left + 'px').css('width', act.css('width'));

//解决方案页面左侧的li点击事件
$('.nbox .lmenu ul li a').click(function(){
  $('.nbox .lmenu li.sel').removeClass('sel');
  $(this).parent().addClass('sel');
});

$('.head .header_menu_nav a').mouseover(function(){
  var me = $(this);
  $('.header_active_top').show().css('left',me.offset().left + 'px').css('width', me.css('width'));
}).mouseout(function(){
  var me = $(this);
  $('.header_active_top').hide();
})
