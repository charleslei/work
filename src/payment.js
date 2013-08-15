

function isValidIdNo(num) {
    var num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
    //下面分别分析出生日期和校验位 
    var len, re;
    len = num.length;
    if (len == 15) {
        re = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/i;
        var arrSplit = num.match(re);

        //检查生日日期是否正确 
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            //alert('输入的身份证号里出生日期不对！');
            return false;
        }
        else {
            //将15位身份证转成18位 
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
            var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            var nTemp = 0, i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len == 18) {
        re = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i;
        var arrSplit = num.match(re);

        //检查生日日期是否正确 
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            //alert(dtmBirth.getYear());
            //alert(arrSplit[2]);
            //alert('输入的身份证号里出生日期不对！');
            return false;
        }
        else {
            //检验18位身份证的校验码是否正确。 
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
            var valnum;
            var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            var nTemp = 0, i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                //alert('18位身份证的校验码不正确！'); //应该为： + valnum
                return false;
            }
            return true;
        }
    }
    return false;
}
(function(t){"use strict";function e(t,e,r){return t.addEventListener?t.addEventListener(e,r,!1):t.attachEvent?t.attachEvent("on"+e,r):void 0}function r(t,e){var r,n;for(r=0,n=t.length;n>r;r++)if(t[r]===e)return!0;return!1}function n(t,e){var r;t.createTextRange?(r=t.createTextRange(),r.move("character",e),r.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))}function a(t,e){try{return t.type=e,!0}catch(r){return!1}}t.Placeholders={Utils:{addEventListener:e,inArray:r,moveCaret:n,changeType:a}}})(this),function(t){"use strict";function e(t){var e;return t.value===t.getAttribute(S)&&"true"===t.getAttribute(I)?(t.setAttribute(I,"false"),t.value="",t.className=t.className.replace(R,""),e=t.getAttribute(P),e&&(t.type=e),!0):!1}function r(t){var e;return""===t.value?(t.setAttribute(I,"true"),t.value=t.getAttribute(S),t.className+=" "+k,e=t.getAttribute(P),e?t.type="text":"password"===t.type&&H.changeType(t,"text")&&t.setAttribute(P,"password"),!0):!1}function n(t,e){var r,n,a,u,i;if(t&&t.getAttribute(S))e(t);else for(r=t?t.getElementsByTagName("input"):r,n=t?t.getElementsByTagName("textarea"):n,i=0,u=r.length+n.length;u>i;i++)a=r.length>i?r[i]:n[i-r.length],e(a)}function a(t){n(t,e)}function u(t){n(t,r)}function i(t){return function(){f&&t.value===t.getAttribute(S)&&"true"===t.getAttribute(I)?H.moveCaret(t,0):e(t)}}function l(t){return function(){r(t)}}function c(t){return function(e){return p=t.value,"true"===t.getAttribute(I)?!(p===t.getAttribute(S)&&H.inArray(C,e.keyCode)):void 0}}function o(t){return function(){var e;"true"===t.getAttribute(I)&&t.value!==p&&(t.className=t.className.replace(R,""),t.value=t.value.replace(t.getAttribute(S),""),t.setAttribute(I,!1),e=t.getAttribute(P),e&&(t.type=e)),""===t.value&&(t.blur(),H.moveCaret(t,0))}}function s(t){return function(){t===document.activeElement&&t.value===t.getAttribute(S)&&"true"===t.getAttribute(I)&&H.moveCaret(t,0)}}function d(t){return function(){a(t)}}function g(t){t.form&&(x=t.form,x.getAttribute(U)||(H.addEventListener(x,"submit",d(x)),x.setAttribute(U,"true"))),H.addEventListener(t,"focus",i(t)),H.addEventListener(t,"blur",l(t)),f&&(H.addEventListener(t,"keydown",c(t)),H.addEventListener(t,"keyup",o(t)),H.addEventListener(t,"click",s(t))),t.setAttribute(j,"true"),t.setAttribute(S,y),r(t)}var v,b,f,h,p,m,A,y,E,x,T,N,L,w=["text","search","url","tel","email","password","number","textarea"],C=[27,33,34,35,36,37,38,39,40,8,46],B="#ccc",k="placeholdersjs",R=RegExp("\\b"+k+"\\b"),S="data-placeholder-value",I="data-placeholder-active",P="data-placeholder-type",U="data-placeholder-submit",j="data-placeholder-bound",V="data-placeholder-focus",q="data-placeholder-live",z=document.createElement("input"),D=document.getElementsByTagName("head")[0],F=document.documentElement,G=t.Placeholders,H=G.Utils;if(void 0===z.placeholder){for(v=document.getElementsByTagName("input"),b=document.getElementsByTagName("textarea"),f="false"===F.getAttribute(V),h="false"!==F.getAttribute(q),m=document.createElement("style"),m.type="text/css",A=document.createTextNode("."+k+" { color:"+B+"; }"),m.styleSheet?m.styleSheet.cssText=A.nodeValue:m.appendChild(A),D.insertBefore(m,D.firstChild),L=0,N=v.length+b.length;N>L;L++)T=v.length>L?v[L]:b[L-v.length],y=T.getAttribute("placeholder"),y&&H.inArray(w,T.type)&&g(T);E=setInterval(function(){for(L=0,N=v.length+b.length;N>L;L++)T=v.length>L?v[L]:b[L-v.length],y=T.getAttribute("placeholder"),y&&H.inArray(w,T.type)&&(T.getAttribute(j)||g(T),(y!==T.getAttribute(S)||"password"===T.type&&!T.getAttribute(P))&&("password"===T.type&&!T.getAttribute(P)&&H.changeType(T,"text")&&T.setAttribute(P,"password"),T.value===T.getAttribute(S)&&(T.value=y),T.setAttribute(S,y)));h||clearInterval(E)},100)}G.disable=a,G.enable=u}(this);


// rewrite jQuery val
(function(){

  var _val=$.fn.val;

  $.fn.val=function(){

    var v=_val.apply(this,Array.prototype.slice.call(arguments,0));

    if(this.attr('placeholder') && v==this.attr('placeholder')){
      return '';
    }
    return v;

  }
})();

var quickPayTemplate = {
  tips: ['<div class="b_popup_tips" style="top:0px;left:15px;">',
           '<div class="tips_contair">',
            '<div class="bott"></div>',
            '<div class="topp"></div>',
          '<div class="tips_content">',
            '<p>{content}</p>',
          '</div>',
        '</div>',
      '</div>'],
  icon_right: ['<span class="icon_tips_wrap"><em class="icon_tips iright"></em></span>'],
  icon_right_tips : ['<span class="icon_tips_wrap"><em class="icon_tips iright"></em><em class="txt_tips">{content}</em></span>'],
  icon_wrong: ['<span class="icon_tips_wrap"><em class="icon_tips iwrong"></em><em class="txt_tips">{content}</em></span>'],
  boundCardBankListDialog : ['<div class="b_fpanel bank_width b_chose_bank">',
                  '<div class="container">',
                    '<div class="inner">',
                      '<div class="e_title"><a id="banllist_close" href="javascript:void(0);" class="close">关闭</a><span class="title_txt">选择银行</span></div>',
                      '<div class="content_wrap">',
                        '<div class="e_content">',
                          '<div id="banklist" class="b_bank_list">',
                            '<ul class="inline">{content}</ul>',
                          '</div>',
                        '</div>',
                      '</div>',
                      '<div  class="e_action_btn">',
                        '<button id="confimbank" class="btn_submit_blue">确定提交</button>',
                        '<button id="cancelbank" class="btn_submit btn_submit_grey">取消操作</button>',
                      '</div>',
                    '</div>',
                  '</div>',
                '</div>'],
  creditCardDialog : ['<div class="b_fpanel bank_width b_chose_bank">',
                  '<div class="container">',
                    '<div class="inner">',
                      '<div class="e_title"><a id="banllist_close" href="javascript:void(0);" class="close">关闭</a><span class="title_txt">信用卡网上银行</span></div>',
                      '<div class="content_wrap">',
                        '<form name="quickpayform" class="quickpayform" id="quickpayform" action="${usuallyCardpayUrl}" method="post" target="_blank">',
                          '<table>',
                          '<tbody><tr>',
                            '<td class="left_ctn"><div class="title">信用卡网银支付</div></td>',
                            '<td><span>跳转至银行页面完成支付</span></td>',
                          '</tr>',
                          '<tr>',
                            '<td></td>',
                            '<td>',
                            '<ul id="allcards" class="inline">{content}</ul>',
                            '</td>',
                          '</tr>',
                          '</tbody></table>',
                          '<div class="e_ops_button e_ops_button1"><button class="btn_submit" id="btnSubmit_next" type="button">下一步</button><span>跳转至银行页面完成付款</span></div>',
                        '</form>',
                      '</div>',
                    '</div>',
                  '</div>',
                '</div>'],
  boundCardBankListDialog1 : ['<div class="b_fpanel bank_width b_chose_bank">',
                  '<div class="container">',
                    '<div class="inner">',
                      '<div class="e_title"><a id="banllist_close" href="javascript:void(0);" class="close">关闭</a><span class="title_txt">选择银行</span></div>',
                      '<div class="content_wrap">',
                        '<div class="e_content">',
                          '<div id="bindbanklist" class="b_bank_list">',
                                                        '<div class="title">已使用过银行卡</div>',
                            '<ul class="inline" id="bindcards">{bindcontent}</ul>',
                          '</div>',
                          '<div id="allbanklist" class="b_bank_list">',
                            '<div class="title">可选择银行卡</div>',
                            '<ul id="allcards" class="inline">{content}</ul>',
                          '</div>',
                          '<div id="otherbanklist" class="b_bank_list">',
                                                        '<div class="title">其他银行卡</div>',
                            '<ul id="othercards" class="inline">{othercontent}</ul>',
                          '</div>',
                        '</div>',
                      '</div>',
                      '<div  class="e_action_btn">',
                        '<button id="confimbank" class="btn_submit_blue">确定提交</button>',
                        '<button id="cancelbank" class="btn_submit btn_submit_grey">取消操作</button>',
                      '</div>',
                    '</div>',
                  '</div>',
                '</div>'],
  boundCardDialog : ['<div class="b_fpanel b_remove_blind removeDiaWidth">',
              '<div class="container">',
                '<div class="inner">',
                  '<div class="e_title"><a href="#" id="dlg_close" class="close">关闭</a><span class="title_txt">绑定银行卡</span></div>',
                  '<div id="dialog_msg" class="e_content"><div style="text-align:center;margin-left:-18px;"><img src="../../images/site/images/pay/quick_pay/ajax-loader.gif"/><br/><span>请求发送中，请稍等...</span></div></div>',
                  '<div id="dialog_gogetway" class="e_content hide"><div class="row_btn"><a class="btn_h30" href=""><span id="dlg_success"><b>绑定成功</b></span></a><a class="btn_h30 btn_h30_fail" href=""><span id="dlg_fail"><b>绑定失败，继续绑定</b></span></a></div>',
                  '</div>',
                '</div>',
              '</div>',
            '</div>'],
  removeCardDialog : ['<div class="b_fpanel b_remove_blind removeDiaWidth" id="removeCardDialog">',
            '<div class="container">',
                    '<div class="inner">',
                        '<div class="e_title"><a href="javascript:void(0)" id="dlg_close" class="close">关闭</a><span class="title_txt">解除绑定</span></div>',
                        '<div id="dialog_sending" class="hide e_content b_remove_blind b_remove_blind_success"><div style="text-align:center;margin-left:-18px;"><img src="../../images/site/images/pay/quick_pay/ajax-loader.gif"/><br/><span>请求发送中，请稍等...</span></div></div>',
                        '<div id="dialog_sended_failed" class="e_content hide">',
                          '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em></span>网络故障,请稍后重试</p><p class="count_down"></p><em class="count_close"></em>秒后自动关闭</div>',
                        '</div>',
                        '<div id="dialog_remove_failed_sys" class="e_content hide">',
                          '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em></span>{errmsg}</p><p class="count_down"></p><em class="count_close"></em>秒后自动关闭</div>',
                        '</div>',
                        '<div id="dialog_send" class="e_content">',
                            '<div class="row_txt">{initcontent}</div><div class="row_btn"><a class="btn btn_narrow" href="javascript:void(0)" id="removeSubmit"><span><b>确 定</b></span></a><a class="btn btn_lgrey" href="javascript:void(0)" id="removeCancel"><span><b>取 消</b></span></a></div>',
                        '</div>',
                        '<div id="dialog_remove_success" class="e_content hide"',
                          '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iright"></em></span>您已成功解除<span class="encryption">**</span><span class="last_num">{bLastFNum}</span>{bType}。</p><p class="count_down"></p><em class="count_close"></em>秒后自动刷新页面</div>',
                      '</div>',
                      '<div id="dialog_remove_failed" class="e_content hide"',
                          '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em></span>解除绑定<span class="encryption">**</span><span class="last_num">{bLastFNum}</span>{bType}失败。</p><p class="count_down"></p><em class="count_close"></em>秒后自动关闭</div>',
                      '</div>',
                    '</div>'],
  removeCardDialog1 : ['<div class="b_fpanel b_remove_blind removeDiaWidth" id="removeCardDialog">',
            '<div class="container">',
                    '<div class="inner">',
                        '<div class="e_title"><a href="javascript:void(0)" id="dlg_close" class="close">关闭</a><span class="title_txt">解除绑定</span></div>',
                        '<div id="dialog_sending" class="hide e_content b_remove_blind b_remove_blind_success"><div style="text-align:center;margin-left:-18px;"><img src="../../images/site/images/pay/quick_pay/ajax-loader.gif"/><br/><span>请求发送中，请稍等...</span></div></div>',
                        '<div id="dialog_sended_failed" class="e_content hide">',
                          '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em></span>网络故障,请稍后重试</p><p class="count_down"></p><em class="count_close"></em>秒后自动关闭</div>',
                        '</div>',
                        '<div id="dialog_remove_failed_sys" class="e_content hide">',
                          '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em></span>{errmsg}</p><p class="count_down"></p><em class="count_close"></em>秒后自动关闭</div>',
                        '</div>',
                        '<div id="dialog_send" class="e_content">',
                            '<div class="row_txt">{initcontent}</div><div class="row_btn"><a class="btn btn_narrow" href="javascript:void(0)" id="removeSubmit"><span><b>确 定</b></span></a><a class="btn btn_lgrey" href="javascript:void(0)" id="removeCancel"><span><b>取 消</b></span></a></div>',
                        '</div>',
                        '<div id="dialog_remove_success" class="e_content hide">',
                          '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iright"></em></span>您已成功解除<span class="encryption">**</span><span class="last_num">{bLastFNum}</span>{bType}。</p><p class="count_down"></p><em class="count_close"></em>秒后自动刷新页面</div>',
                      '</div>',
                      '<div id="dialog_remove_failed" class="e_content hide">',
                          '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em></span>解除绑定<span class="encryption">**</span><span class="last_num">{bLastFNum}</span>{bType}失败。</p><p class="count_down"></p><em class="count_close"></em>秒后自动关闭</div>',
                      '</div>',
                            '</div>',
                        '</div>',
                        '</div>'],
  boundCardPaidDialog : [ '<div class="b_fpanel b_online_pay boundCDWidth" id="boundCardPaidDialog">',
                '<div class="container">',
                '<div class="inner">',
                  '<div class="e_title"><a href="javascript:void(0)" class="dlg_close close">关闭</a><span class="title_txt">登陆银联绑定</span></div>',
                  '<div class="b_remove_blind b_remove_blind_success" id="dialog_msg"><div style="text-align:center"><img src="../../images/site/images/pay/quick_pay/ajax-loader.gif" style="padding: 5px 180px;"/><br/><span>请求发送中，请稍等...</span>',
                  '</div></div>',
                  '<div class="e_content hide" id="dialog_gogetway"><div class="row_btn"><a class="btn_h30" href="javascript:void(0)"><span id="dlg_success"><b>绑定成功</b></span></a><a class="btn_h30 btn_h30_fail btn_h30_last" href="javascript:void(0)"><span id="dlg_fail"><b>绑定失败，继续绑定</b></span></a></div>',
                  '</div>',
                  '<div class="b_remove_blind b_remove_blind_success hide" id="dialog_sended_failed"><div class="e_content"><div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em></span>网络故障,请稍后重试</p><p class="count_down"></p><em class="count_close"></em>秒后自动关闭</div>',
                  '</div></div>',
                  '<div class="b_remove_blind b_remove_blind_success hide" id="dialog_bind_success"><div class="e_content"><div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iright"></em></span>您已成功绑定<span class="encryption">**</span><span class="last_num">{bLastFNum}</span>{bType}。</p><p class="count_down"></p><em class="count_close"></em>秒后跳转到列表页</div>',
                  '</div></div>',
                  '<div class="b_remove_blind b_remove_blind_success hide" id="dialog_bind_failed"><div class="e_content"><div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em></span>绑定<span class="encryption">**</span><span class="last_num">{bLastFNum}</span>{bType}失败。</p><p class="count_down"></p><em class="count_close"></em>秒后自动关闭</div>',
                  '</div></div>',
                '</div>',
                '</div>',
              '</div>'],
  setDefaultCardDialog : ['<div class="b_fpanel b_remove_blind removeDiaWidth" id="setDefaultCardDialog">',
              '<div class="container">',
                      '<div class="inner">',
                          '<div class="e_title"><a href="javascript:void(0)" id="dlg_def_close" class="close">关闭</a><span class="title_txt">设定常用卡</span></div>',
                        '<div id="dialog_confirm" class="e_content">',
                              '<div class="row_txt"><p class="cross_check">您确认要设置<span class="encryption">**</span><span class="last_num">{bLastFNum}</span>{bType}为常用卡么？</p></div><div class="row_btn"><a class="btn btn_narrow" href="javascript:void(0)" id="defaultSubmit"><span><b>确 定</b></span></a><a class="btn btn_lgrey" href="javascript:void(0)" id="defaultCancel"><span><b>取 消</b></span></a></div>',
                          '</div>',
                          '<div id="dialog_def_sending" class="hide e_content b_remove_blind b_remove_blind_success"><div style="text-align:center;margin-left:-18px;"><img src="../../images/site/images/pay/quick_pay/ajax-loader.gif"/><br/><span>请求发送中，请稍等...</span></div></div>',
                          '<div id="dialog_def_success" class="e_content hide">',
                            '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iright"></em></span>您已成功设置<span class="encryption">**</span><span class="last_num">{bLastFNum}</span>{bType}为常用卡。</p><p class="count_down"></p><em class="count_close"></em>秒后自动刷新页面</div>',
                        '</div>',
                        '<div id="dialog_def_failed" class="e_content hide">',
                            '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em></span>设置<span class="encryption">**</span><span class="last_num">{bLastFNum}</span>{bType}为常用卡失败。</p><p class="count_down"></p><em class="count_close"></em>秒后自动关闭</div>',
                        '</div>',
                        '<div id="dialog_def_sended_failed" class="e_content hide">',
                            '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em></span>网络故障,请稍后重试</p><p class="count_down"></p><em class="count_close"></em>秒后自动关闭</div>',
                          '</div>',
                          '<div id="dialog_def_sended_failed_sys" class="e_content hide">',
                            '<div class="row_txt"><p class="cross_check"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em></span>{errmsg}</p><p class="count_down"></p><em class="count_close"></em>秒后自动关闭</div>',
                          '</div>',
                      '</div>',
                  '</div>',
                  '</div>'],
  removeContent:  ['<p class="cross_check">您确认要解除的 <span class="encryption">**</span><span class="last_num">{bLastFNum}</span> {bType}么？</p>解绑后您将不能使用该卡进行快捷支付！']
};

var quickBankData = [
        {text:'招商银行',code:'CMB',source:'cmb'},
        {text:'工商银行',code:'ICBC',source:'icbc'},
        {text:'中国银行',code:'BOC',source:'bofc'},
        {text:'中国建设银行',code:'CCB',source:'ccb'},
        // {text:'中国农业银行',code:'ABC',source:'abc'},
        // {text:'交通银行',code:'BANKCOMM',source:'boc'},
        {text:'中国民生银行',code:'CMBC',source:'cmbc'},
        {text:'中信银行',code:'CITIC',source:'zxyh'},
        {text:'平安银行',code:'PINGANBANK',source:'pingan'},
        {text:'光大银行',code:'CEB',source:'cebb'},
        {text:'上海浦东发展银行',code:'SPDB',source:'spdb'},
        {text:'广东发展银行',code:'GDB',source:'gdb'},
        {text:'深圳发展银行',code:'SDB',source:'sdb'},
        {text:'中国邮政',code:'PSBC',source:'postupay'},
        {text:'兴业银行',code:'CIB',source:'cib'},
        {text:'上海银行',code:'SHBANK',source:'bosh'},
        {text:'广州农村商业银行',code:'GZRCC',source:'grcb'},
        {text:'上海农村商业银行',code:'SRCB',source:'shrcb'},
        {text:'北京银行',code:'BJBANK',source:'bob'},
        {text:'南京银行',code:'NJCB',source:'njcb'},
        {text:'华夏银行',code:'HXB',source:'hxb'},
        {text:'宁波银行',code:'NBCB',source:'nbcb'},
        {text:'广州银行',code:'GZCB',source:'gzcbank'},
        {text:'北京农村商业银行',code:'BJRCB',source:'bjrcb'},
        {text:'渤海银行',code:'CBHB',source:'cbhb'},
        {text:'杭州银行',code:'HZBANK',source:'hccb'},
        {text:'江苏银行',code:'JSBCHINA',source:'jsbchina'}
      ];

var errorInfo = { 
  "QN02"    :   "本次支付超过限额，请返回重新选择支付方式",
  "QN03"    :   "银行卡信息填写有误，交易失败",
  "QN04"    :   "网关通讯异常，交易失败",
  "QN05"    :   "该卡交易受限（可能的情况：非该卡开户手机号、或本月交易次数过多等），请更换银行卡重新进行支付",  
  "T404"    :   "系统不支持的银行卡", 
  "T436"    :   "该银行卡交易时间受限，请明天八点以后再交易", 
  "T432"    :  "银行卡被列入黑名单，拒绝交易",

  "AMOUNT_INVALID"        : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "BUSITYPEID_INVALID"      : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "MERCHANTCODE_INVALID" : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "PRODUCTDESC_INVALID"   : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "PRODUCTNAME_INVALID"   : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "PRODUCTID_INVALID"       : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "SHAREDATA_INVALID"     : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "URL_INVALID"             : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "ORDERDATE_INVALID"     : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "ORDERNO_INVALID"       : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "HMAC_INVALID"          : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "VERSION_INVALID"         : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "TRANSTYPEID_INVALID"     : "对不起，提交的订单信息不正确，交易不能进行，请联系客服！", 
  "ORDER_PAY_SUCCESS"     : "您的订单已经支付成功，请勿重复支付！", 
  "REPEAT_SUCCESS"        : "您的订单已经支付成功，请勿重复支付！", 
  "ORDER_REPEAT"          : "请勿频繁支付，请稍后再试！",
  "PAY_TIMEOUT"             : "交易超时，请查看订单状态，如有问题请联系客服！", 
  "PAY_FAIL"                : "交易失败，如有问题请联系客服！",
  "DATABASE_ERROR"        : "交易失败，如有问题请联系客服！",
  "unknown"                 : "交易失败，如有问题请联系客服！"
}; 

$(function(){
    var bindcardsCon = $('#bindcardsCon');
  bindcardsCon.delegate('.js_ops_link','click', removeBank);
  //$('.radio_box').change(setDefaultCard);
  //resetRadio();
/**
 * [removeBank 解绑]
 * @return 无
 */
  var oldInnerShowed='#dialog_send';
  var defOldInShowed='#dialog_confirm';
  var jquery_dg=old_dg=old_defCarddg=jquery_defCarddg=null;
  var cardNum=$('.js_ops_link').length;

function removeBank(){
    var bType=$(this).attr('js_bType')=='1'?'信用卡':'借记卡';
    var bId=$(this).attr('js_bId');
    var bLastFNum=$(this).attr('js_bLastFNum');
    if(cardNum&&cardNum==1){
      var _html=quickPayTemplate.removeCardDialog1.join('').replace(/\{initcontent\}/g,'您只剩下最后一张银行卡，删除后将无法使用快捷支付，确认解除绑定吗？').replace(/\{bLastFNum\}/g,bLastFNum).replace(/\{bType\}/g,bType);
    }
    else{
      var _html=quickPayTemplate.removeCardDialog1.join('').replace(/\{initcontent\}/g,quickPayTemplate.removeContent.join('')).replace(/\{bLastFNum\}/g,bLastFNum).replace(/\{bType\}/g,bType);
    }
    showBindDialog(_html,bId);
}
/**
 * [delayClose 用于延迟关闭]
 * @param  {jquery} el       [显示倒计时的元素]
 * @param  {number} count    [倒计时秒数]
 * @param  {function} callBack [倒计时完成后的回调函数]
 * @return 无
 */
function delayClose(el,count,callBack){
  el.html(count);
  count--;
  if(count>=0){
    setTimeout(function(){delayClose(el,count,callBack)},1000);
  }
  else
    callBack();
}
/**
 * [syncAjax 同步Ajax请求，用于解绑]
 * @param  {[string]} bId [需要解绑卡的id]
 * @param  {[string]} url [接口地址]
 * @param  {[jquery]} el [需要处理的弹层]
 * @return 无
 */
function syncAjax(bId,url,el,flag){
  $.ajax(url,{
    async:false,
    data:{'bankId':bId, 'userId': QNR.PayInfo.userid},
    type:'post',
    dataType:'json',
    error:function(XMLHttpRequest, textStatus, errorThrown){
      if(flag){
        switchInner(el,'#dialog_def_sended_failed',function(){
          delayClose(jquery_defCarddg.find('.count_close'),3,function(){
            el.hide();
            resetRadio();
          })
        },true);
        return;
      }
      switchInner(el,'#dialog_sended_failed',function(){
          delayClose(jquery_dg.find('.count_close'),3,function(){
            el.hide();
            resetRadio();
          })
        });
    },
    success:function( data ){
          if(!data) return;
          if( data.ret ){
            var type = data.data[0].status;
            switch(type){
              case "SUCCESS":
                if(flag){
                  switchInner(el,'#dialog_def_success',function(){
                    delayClose(jquery_defCarddg.find('.count_close'),3,function(){
                      window.location.reload();
                    })
                  },true);
                }
                else{
                  switchInner(el,'#dialog_remove_success',function(){
                    delayClose(jquery_dg.find('.count_close'),3,function(){
                                            window.location.reload();
                    })
                  });
                }
              break;
              case "FAILED":
                if(flag){
                  switchInner(el,'#dialog_def_failed',function(){
                    delayClose(jquery_defCarddg.find('.count_close'),3,function(){
                      el.hide();
                      resetRadio();
                    })
                  },true);
                }
                else{
                  switchInner(el,'#dialog_remove_failed',function(){
                    delayClose(jquery_dg.find('.count_close'),3,function(){
                      el.hide();
                      resetRadio();
                    })
                  });
                }
              break;
            }
          }
          else{
            if(flag){
              $('#dialog_def_sended_failed_sys').html($('#dialog_def_sended_failed_sys').html().replace('\{errmsg\}',data.errmsg));
              switchInner(el,'#dialog_def_sended_failed_sys',function(){
                    delayClose(jquery_defCarddg.find('.count_close'),3,function(){
                      el.hide();
                      resetRadio();
                    })
                  },true);
            }
            else{
              $('#dialog_remove_failed_sys').html($('#dialog_remove_failed_sys').html().replace('\{errmsg\}',data.errmsg));
              switchInner(el,'#dialog_remove_failed_sys',function(){
                    delayClose(jquery_dg.find('.count_close'),3,function(){
                      el.hide();
                      resetRadio();
                    })
                  });
            }
          }
        }
  });
}
function switchInner(el,innerId,callBack,flag){
  if(flag){
    $(defOldInShowed).hide();
    $(innerId).show();
    defOldInShowed=innerId;
    if(callBack){
      callBack();
    }
    return;
  }
  $(oldInnerShowed).hide();
  $(innerId).show();
  oldInnerShowed=innerId;
  if(callBack){
    callBack();
  }
}
function showBindDialog(_html,bId,flag){
      if(flag){
        if(old_defCarddg) {old_defCarddg.remove();defOldInShowed='#dialog_confirm';}
        var dg=old_defCarddg=new QNR.htmlDialog(_html);
        dg.show();
        $("#dlg_def_close").bind("click",function(){
          dg.hide();
          resetRadio();
        });
        jquery_defCarddg=$('#setDefaultCardDialog');
        $('#defaultSubmit').bind("click",function(){
          switchInner(dg,'#dialog_def_sending',false,true);
          syncAjax(bId,"defaultCard.do",dg,true);
        });
        $('#defaultCancel').bind("click",function(){
          dg.hide();
          resetRadio();
        });
      }
      else{
        if(old_dg) {old_dg.remove();oldInnerShowed='#dialog_send';}
        var dg=old_dg=new QNR.htmlDialog(_html);
        dg.show();
        $("#dlg_close").bind("click",function(){
        dg.hide();
        });
        jquery_dg=$('#removeCardDialog');
        $('#removeSubmit').bind("click",function(){
          switchInner(dg,'#dialog_sending');
          syncAjax(bId,"delQuickPayCard.do",dg);
        });
        $('#removeCancel').bind("click",function(){
          dg.hide();
        });
      }
    }
function setDefaultCard(){
  if(this.checked){
    var bType=$(this).attr('js_bType')=='1'?'信用卡':'借记卡';
    var bId=$(this).attr('js_bId');
    var bLastFNum=$(this).attr('js_bLastFNum');
    var _html=quickPayTemplate.setDefaultCardDialog.join('').replace(/\{bLastFNum\}/g,bLastFNum).replace(/\{bType\}/g,bType);
    showBindDialog(_html,bId,true);
  }
}
function resetRadio(){
  $('.radio_box').each(function(){
    this.checked=false;
  })
}
});

jQuery.fn.isExistItem = function(value) {  
    var isExist = false,  
        sel = $(this).get(0);
    var count = sel && sel.options && sel.options.length;
    for(var i=0;i<count;i++){  
        if(sel.options[i].value == value) {  
            isExist = true;  
            break;  
        }  
    }  
    return isExist;  
};  

// union pay
(function($) {

  var baseurl = "/payServer/",
    btnSubmit = $("#btnSubmit"),
    tips = QNR.locale.tips,
    showAllBindBank = $('#showAllBindBank'),
    expires_year = $(".expires_year"),
    expires_month = $(".expires_month"),
    bankname = $('.bankname'),
    allbankname = $('#allbankname'),
    bindbankname = $('#bindbankname'),
    payFrom = $("#quickpayform"),
    numRegExp = /^\s*[0-9][\d]*\s*$/i,
    bankLi = $('.js-choose-item'),
    radios = bankLi.find('input[type="radio"]'),
    //显示隐藏和选择银行,
    highlightClass = "highlight",
    // 其他支付 展示更多银行  
    morebank = $('.more_bank'),
    hidebank = $('.hide_bank'),
    mobileStage = $('#mobile-number #mobile'),
    vcode = $('#vCode'),
    jquery_dg = old_dg = old_defCarddg = jquery_defCarddg = null,
    bindCards = {},
    bindcardsCon = $('#bindcardsCon'),
    allcardsCon = $("#allcardsCon"),
    cardPicWrap = $('.e_card_picwrap'),
    imageURL = '/images/site/images/pay/bankicon_1/',
    bindUL = bindcardsCon.find('ul'),
    noImgBank = ['ZJCZCBANK', 'YCCCBANK', 'WUXIRCBANK', 'SDEBANK', 'SQBANK', 'SXYDRCBANK', 'LJBANK', 'LZBANK', 'JINHUABANK', 'JSPRCU', 'HNPRU', 'FJPRCU', 'ORDOSBANK', 'DYBANK', 'DALIANBANK', 'JYRCBANK', 'XJKCCB', 'XMCCB', 'FJHXBANK', 'LZCCB', 'DRCBANK', 'HBXH', 'SUZHOUBANK', 'AYB', 'SMXBANK', 'HBSBANK', 'ZHOUKBANK', 'YBCCB', 'YCCCB', 'HAINANBANK', 'GUILINBANK', 'KSRCB', 'TCRCB', 'JXSNXS', 'NMGNXS', 'WUHAICB', 'JCCBANK', 'JZBANK', 'SXNXYB', 'YQCCB', 'FTYZB', 'SZNCCB', 'ASCCB', 'FSBANK', 'QJCCB', 'GXNLS', 'NANHAIBANK', 'JLNLS', 'QHNB', 'CZCCB', 'HDCB', 'SBANK', 'TSBANK', 'ZJKCCB', 'DYCCB', 'SNCCB', 'ZGBANK', 'LSSCB', 'LSZSH', 'YAANBANK', 'NDHB'],


    //倒计时
    tmin = $("#mins"),
    tsec = $('#sec'),
    //选择卡类型
    cardType = $("input:radio[name='cardType']");

  function unionPay() {
    this._init();
  }
  unionPay.prototype = {
    _init: function() {

      //初始化银行信息
      this._initBankIcon();
      this._initBankCode();
      this.initDebitCard();
      //初始化页面事件     
      this._initEvent();

      //初始化短信验证码
      this._initMobile();
      //初始化表单验证器
      this._initValidate();
      //初始化倒计时  
      this._initTimeCount();
      //初始化信用卡过期日期 yselector
      this._initExpiresDate();
      //阻止浏览器记住表单 && 清除信用卡年份yselector初始化时change事件引发的错误提示
      this._initClearForm();
    },

    _initBankIcon: function() {
      var me = this;
      $('.js-bank-icon').each(function() {
        var $this = $(this),
          cardCode = $.trim($this.parents('.js-choose-card').find('input.radio_box').attr('bank'));
        var bankicon = me.parseImgURL(cardCode);

        $this.css('background-image', 'url(' + bankicon + ')');
      });
      me._checkBindCardShown();
    },
    initDebitCard: function() {
      $('#debit_card li label,#platform li label').click(function() {
        var $this = $(this);
        $this.siblings().attr('checked', true).parent().addClass('active').siblings().removeClass('active');
      })
      var hide_ele = $('#allcards .hide');
      $('#show_and_hide .up, #show_and_hide .down').click(function() {
        var $this = $(this);
        if ($this.is('.down')) {
          hide_ele.show();
        } else {
          hide_ele.hide();
        }
        $this.hide().siblings().show();
        return false;
      })
    },

    _initEvent: function() {
      var me = this;

      //确认付款
      btnSubmit.bind("click", function(e) {
        me.submitform(e);
      });
      //银行卡号
      $("#credit_cardnum, #debit_cardnum").bind("keyup change", function() {
        var _self = $(this),
          text = _self.val();
        if (text) {
          _self.val(me.formatCardNumber(text));
        }
      });

      //手机号
      $("#allcardsCon #mobile,#bindcardsCon #mobile").bind("keyup change", function() {
        var _self = $(this),
          text = _self.val();
        if (text) {
          _self.val(me.formatMobileNumber(text));
        }
      });

      // 选择银行
      $("#allcardsCon .ops_chose, #allcardsCon .chose_bank").bind("click", function() {
        var $this = $(this);
        me.getBankList(function() {
          me.showBankListDialog($this);
        })
      });
      $("#bindcardsCon #choosebank, #bindcardsCon #rechoosebank").bind('click', function() {
        var $this = $(this);
        me.getBankList(function() {
          me.showBankListDialog($this);
        })
      });


      $('#credit_cardbacknum').bind('focus', function(e) {
        $('.card_pic .img').css('background-position', '0 -142px');
      });

      payFrom.delegate('.yselector_box', 'click', function(e) {
        $('.card_pic .img').css('background-position', '0 0');
      });
      //快捷支付 显示全部绑定银行
      showAllBindBank.bind('click', function(e) {
        e.preventDefault();
        bankLi.show(200).removeClass(highlightClass);
        bankLi.find('.close').hide();
        showAllBindBank.hide();
      });

      bindcardsCon.delegate('li.js-choose-item', 'mouseenter', function(e) {
        $(this).addClass(highlightClass);
        $(this).find('.close').show();
      }).delegate('li.js-choose-item', 'mouseleave', function(e) {
        if (showAllBindBank.is(':visible')) return;
        $(this).removeClass(highlightClass);
        $(this).find('.close').hide();
      }).delegate('.js-choose-card', 'click', function(e) {
        var el = $(this).closest('li'),
          checkedEle = el.find('input[type=radio]'),
          mb = checkedEle.attr('mobile'),
          bk = checkedEle.attr('bank'),
          date = checkedEle.attr('valiDate');
        var sibling = el.siblings('.js-choose-item');
        sibling.hide(200);

        checkedEle.attr('checked', true);
        el.addClass(highlightClass);
        showAllBindBank.show();

        mobileStage.val(mb);
        me.currentMobile = mb;
        bindbankname.val(bk);
        me.currentBank = bk;
        me.recheckMobileVcode();

        me.currentDate = date;
        me.checkDateEnable();
      });

      $('#show_creditcard_online').click(function() {});
    },

    recheckMobileVcode: function() {
      if (!vcode.length) {
        return;
      }

      var newmobile = radios.filter(':checked').attr('mobile');

      if (this.currentMobile != newmobile) {
        vcode.val('');
        $('[placeholder="get-permit-message"]').remove();
        this.showInvalid(vcode, '您选择的银行卡改变, 请重新发送验证码');
        this.currentMobile = newmobile;
      }
    },

    //初始化倒计时
    _initTimeCount: function() {
      var countNum = 1800000;
      var formattime = function(t) {
        t = t || '00000000000000';
        var res = t.match(/\d{2}/g),
          yy = res[0] + res[1],
          mou = res[2],
          dd = res[3],
          hh = res[4],
          mm = res[5],
          ss = res[6];
        return (new Date(yy, mou, dd, hh, mm, ss)).getTime();
      };
      var newtime = $('#newtime').val();
      var oldtime = $('#oldtime').val();
      var dur = countNum - (formattime(newtime) - formattime(oldtime));


      var timeout = function() {
        window.location.href = baseurl + 'error.do?type=timeout';
      };

      var timeCount = new QNR.timeCount(dur, {
        min: tmin,
        sec: tsec
      }, timeout);
    },
    submitform: function(e) {
      var me = this;
      this.formChecker.validateAll(function(ret) {
        var valiHidden = me.valiHiddens();

        if (ret && valiHidden) {
          me.syncsubmit();
        }
      });
      e.preventDefault();
    },

    syncsubmit: function() {
      var syncForm = document.createElement("form");
      document.body.appendChild(syncForm);
      syncForm.method = 'post';
      syncForm.action = payFrom.attr('action');
      syncForm.target = '_self';

      var o = this.getParam();
      for (var _attr in o) {
        if (o.hasOwnProperty(_attr)) {
          //清除表单value的空格
          var _val = $.trim(o[_attr]);
          var _inp = document.createElement("input");
          _inp.setAttribute("name", _attr);
          _inp.setAttribute("value", o[_attr]);
          _inp.setAttribute("type", "hidden");
          syncForm.appendChild(_inp);
        }
      }
      syncForm.submit();
    },

    getParam: function() {
      var me = this;
      var parm = me.getForm(payFrom);
      return parm;
    },

    //获取form表单
    getForm: function(form) {
      var me = this;
      if (me._checkBindCardShown()) {
        allcardsCon.remove();
        cardPicWrap.remove();
      } else {
        bindcardsCon.remove();
      }
      var array = form.serializeArray();
      var ret = {}, mon, year;
      $.each(array, function(i, input) {
        ret[input.name] = input.value.replace(/\s/g, '');
      });
      return ret;
    },

    formatCardNumber: function(num) {
      var text = num.replace(/\s/g, '').match(/(\w{4})|(\w{1,3})/g);
      return !!text ? text.join(' ') : '';
    },
    formatMobileNumber: function(num) {
      var th = num.replace(/\s/g, '').match(/\w{1,3}/);
      var fth = num.substring(3).match(/\w{1,4}/g);
      var ar = !! fth ? th.concat(fth) : th;
      return !!ar ? ar.join(' ') : '';
    },
    showDltDialog: function(card) {
      var me = this;
      if (!this.dltCardDialog) {}
    },
    showBankListDialog: function() {
      var me = this;
      $('.b_chose_bank').remove();
      this.banklistdlg = null;
      var _html = quickPayTemplate.boundCardBankListDialog1.join(''),
        userbankListCount = 0,
        bankListCount = 0,
        otherbankListCount = 0;

      bankItem = [];
      bankData = me.userbankList;
      $.each(bankData, function(k, v) {
        bankItem.push('<li class="e_open_ibank e_open_ibank_long" data-bId="' + v.id + '">');
        bankItem.push('<input type="radio" name="bank" id="' + v.id + '" value="' + v.bankCode + '" class="radio_box">');
        bankItem.push('<label class="bank_logo_box"><span class="bank_logo"><img title="' + v.bankCode + '" src="' + v.picUrl + '" /></span><span class="bankcard_info">信用卡 <span class="encryption">**</span><em class="last_num">' + v.cardNo.substr(v.cardNo.length - 4, 4) + '</em></span></label>');
        bankItem.push('</li>');
        userbankListCount++;
      });
      _html = _html.replace(/\{bindcontent\}/g, bankItem.join(''));

      bankItem = [];
      bankData = me.bankList;
      $.each(bankData, function(k, v) {
        bankItem.push('<li class="e_open_ibank">');
        bankItem.push('<input type="radio" name="bank" id="' + k + '" value="' + k + '" class="radio_box">');
        bankItem.push('<label class="bank_logo_box"><span class="bank_logo"><img title="' + v.bankCode + '" src="' + v.picUrl + '" /></span><span class="bank_name_txt"></span></label>');
        bankItem.push('</li>');
        bankListCount++;
      });
      _html = _html.replace(/\{content\}/g, bankItem.join(''));

      bankItem = [];
      bankData = me.otherbankList;
      $.each(bankData, function(k, v) {
        bankItem.push('<li class="e_open_ibank">');
        bankItem.push('<input type="radio" name="bank" id="' + k + '" value="' + k + '" class="radio_box">');
        bankItem.push('<label class="bank_logo_box"><span class="bank_logo"><img title="' + v.bankCode + '" src="' + v.picUrl + '" /></span><span class="bank_name_txt"></span></label>');
        bankItem.push('</li>');
        otherbankListCount++;
      });
      _html = _html.replace(/\{othercontent\}/g, bankItem.join(''));


      this.banklistdlg = new QNR.htmlDialog(_html);
      this.banklistdlg.show();

      if (document.selection && document.selection.empty) {
        document.selection.empty(); //IE
      } else if (window.getSelection) {
        window.getSelection().removeAllRanges(); //ff
      }


      if (!userbankListCount) {
        $('#bindbanklist').hide();
      }
      if (!bankListCount) {
        $('#allbanklist').hide();
      }
      if (!otherbankListCount) {
        $('#otherbanklist').hide();
      }

      var confirmBtn = $("#confimbank");

      this.banklistdlg.dom.find('li').each(function() {
        var input = $(this).find('input');
        $(this).find('label').bind('click', function() {
          input.attr('checked', true);
        })

        $(this).bind('dblclick', function() {
          input.attr('checked', true);
          confirmBtn.trigger("click");
        });
      });

      $("#banllist_close, #cancelbank").bind("click", function() {
        me.banklistdlg.hide();
      });

      confirmBtn.bind("click", function() {
        me.banklistdlg.hide();
        var el = $("input:radio[name='bank']:checked");
        if (el.length == 0) {
          return;
        }
        var _code = el.val(),
          _id = el.attr('id'),
          _source = el.closest('li').find('img').attr('src');
        //判断：如果选择新银行，那么跳到标准模式；否则进入简单模式
        if (el.parents('ul').is('#allcards') || el.parents('ul').is('#othercards')) { //进入标准模式
          me._initClearForm(allcardsCon);
          allbankname.val(_code);
          me.clearTips(allbankname);
          allcardsCon.find("#dvchoose").hide();
          allcardsCon.find("#dvrechoose").show();
          allcardsCon.find("#bankimg").attr("src", _source);
          bindcardsCon.hide();
          allcardsCon.show();
          cardPicWrap.show();
          //用户已经登录，若选择其他银行卡，则隐藏绑卡提示：
          var bind = allcardsCon.find('input[name="isBind"]');
          if (QNR.PayInfo.userid != '' && el.parents('ul').is('#othercards')) {
            bind.attr('checked', false);
            bind.parents('tr').hide();
          } else if (QNR.PayInfo.userid != '') {
            bind.attr('checked', true);
            bind.parents('tr').show();
          }

        } else if (el.parents('ul').is('#bindcards')) { //进入简单模式
          me._initClearForm(bindcardsCon);
          bindcardsCon.show();
          allcardsCon.hide();
          cardPicWrap.hide();
          bindbankname.val(_code);

          bankLi.hide();
          bankLi.removeClass(highlightClass);
          var inp = bankLi.find('input[value="' + _id + ',1"]');
          if (inp.length) {
            inp.attr('checked', true);
            inp.parents('li').addClass(highlightClass).show();
            var date = inp.attr('valiDate'),
              mb = inp.attr('mobile');
          } else {
            var data = me.userbankList[_id];
            me._refreshBindCard(data);
            var date = data.validate,
              mb = data.telphone;
          }
          showAllBindBank.show();

          mobileStage.val(mb);
          me.currentMobile = mb;

          me.currentDate = date;
          me.checkDateEnable();
        }

        me._checkBindCardShown();
      });
    },
    _refreshBindCard: function(obj) {
      var id = obj.id,
        me = this;
      bankVal = id + ',' + obj.cardType,
      mob = obj.telphone,
      bk = obj.bankCode,
      date = obj.validate,
      cardNumA = obj.cardNo.split('*'),
      cardNum = cardNumA[cardNumA.length - 1],
      img = me.parseImgURL(bk);

      li = '<li class="js-choose-item highlight" style="display: list-item;"><div class="e_card_type clrfix"><div class="common_card">常用卡</div><div class="info_card js-choose-card"><input checked type="radio" name="bankAndType" value="' + bankVal + '" mobile="' + mob + '" bank="' + bk + '" validate="' + date + '" class="radio_box"><label class="banklogo_box" for=""><span class="bank_name js-bank-icon" style="background-image: url(' + img + ');background-position: 0px 0px;"></span><span class="bankcard_info">信用卡 <span class="encryption">**</span><em class="last_num">' + cardNum + '</em></span></label></div><a href="javascript:;" js_bid="' + id + '" js_btype="1" js_blastfnum="' + cardNum + '" class="close js_ops_link">删除</a></div></li>';
      bankLi.eq(bankLi.length - 1).remove();
      bindUL.append(li);
      bankLi = $('.js-choose-item');
      radios = bankLi.find('input[type="radio"]');

    },

    //短信验证码
    _initMobile: function() {
      var form = payFrom,
        _error = form.find("[placeholder='get-permit-error']"),
        _message = form.find('[placeholder="get-permit-message"]'),
        _button = form.find('[placeholder="get-permit"]');
      var _showError = function(msg) {
        _error.removeClass("popup_tips_wrap_clr");
        var _msg = quickPayTemplate.icon_wrong.join('');
        _error.html(_msg.replace(/\{content\}/g, msg));

        if (_showError.handler) {
          clearTimeout(_showError.handler);
        }

        _showError.handler = setTimeout(function() {
          _error.hide();
          _showError.handler = false;
        }, 3000);
      };

      QNR.phoneValid({
        url: baseurl + "SendVcodeNoUid.do",
        button: _button,
        message: _message,
        callback: function(data) {
          var m = "status";
          if (data.ret) {
            if (parseInt(data.data[m]) == 1) {
              _error.hide();
              return true;
            } else if (parseInt(data.data[m]) == 2) {
              _showError(tips.vcode.limit);
              return false;
            } else if (parseInt(data.data[m]) == 3) {
              _showError(tips.vcode.frequent);
              return false;
            }
          } else {
            _error.removeClass("popup_tips_wrap_clr");
            var _msg = quickPayTemplate.icon_wrong.join('');
            _error.html(_msg.replace(/\{content\}/g, tips.vcode.sendFail));
            return false;
          }

          return false;
        },
        locker: function(obj) {
          var _mobileObj = $(obj).parents('table').find('#mobile'),
            _mobile = (_mobileObj.val()).replace(/\s/g, '');

          if (!_mobile) {
            $('#mobile').trigger('blur');
          }

          return QNR.patterns.mobile.test(_mobile);
        },

        paramRender: function(obj) {
          var _self = this;
          var $moble = $(obj).parents('table').find('#mobile');
          var _moble = ($moble.val()).replace(/\s/g, '');
          $moble.trigger('blur');
          return {
            mobile: _moble,
            messageType: 1
          };
        }
      });
    },
    _initBankCode: function() {
      //如果是用户已经保存的卡，那么把选择的卡code放到的银行卡code里；
      if (this._checkBindCardShown()) {
        this.currentMobile = radios.filter(':checked').attr('mobile') || '';
        this.currentBank = radios.filter(':checked').attr('bank') || '';
        this.currentDate = radios.filter(':checked').attr('valiDate') || '';
        mobileStage.val(this.currentMobile);
        bindbankname.val(this.currentBank);
        cardPicWrap.hide();
      } else {
        allcardsCon.show();
        cardPicWrap.show();
      }
    },

    _initClearForm: function(obj) {
      if (obj) {
        obj.find('.js_tipcontainer').hide();
      } else {
        $(".js_tipcontainer").hide();
      }
    },

    //验证银行卡，采用了 LUHN 算法
    isValidMasterCard: function(cardNo) {
      return QNR.patterns.creditcard.test(cardNo);
    },
    //被隐藏的input校验
    valiHiddens: function() {
      var me = this,
        res = true,
        m, y, bkEle,
        y0 = dateNow.getFullYear().toString().match(/\d{2}/g)[1],
        m0 = dateNow.getMonth() + 1;
      if (me._checkBindCardShown()) {
        m = bindcardsCon.find('.expires_month');
        y = bindcardsCon.find('.expires_year');
        bkEle = bindbankname;
      } else {
        m = allcardsCon.find('.expires_month');
        y = allcardsCon.find('.expires_year');
        bkEle = allbankname;
      }
      if (!(m.get(0).selectedIndex) || !(y.get(0).selectedIndex) || (+$(y).val() <= +y0 && +$(m).val() < +m0)) {
        me.showTips(y, '请选择有效期');
        res = res && false;
      }

      if ($.trim(bkEle.val()) == "") {
        me.showTips(bkEle, '请选择银行名称');
        res = res && false;
      }

      return res;
    },
    _checkBindCardShown: function() {
      var res = bindcardsCon && bindcardsCon.is(":visible");
      if (res) {
        btnSubmit.parent().css('padding-left', '160px')
      } else {
        btnSubmit.parent().css('padding-left', '130px')
      }

      return res;
    },
    _initExpiresDate: function() {
      var me = this;
      var year = new Date().getFullYear().toString().substr(2);
      var expire_M_Y = function(ori) {
        var prt = $(ori.options.rawSelect).parents('.ops_date'),
          m = prt.find('.expires_month'),
          y = prt.find('.expires_year'),
          dateNow = new Date(),
          y0 = dateNow.getFullYear().toString().match(/\d{2}/g)[1],
          m0 = dateNow.getMonth() + 1;

        if ( !! m.get(0).selectedIndex && !! y.get(0).selectedIndex) {
          if (+$(y).val() <= +y0 && +$(m).val() < +m0) {
            me.showTips(y, '请选择有效期');
          } else {
            me.clearTips(y);
          }
        } else {
          me.showTips(y, '请选择有效期');
        }
      }
      if (!expires_year.length) return;
      expires_year.each(function(idx, val) {
        var y_options = expires_year[idx].options,
          i = 0,
          _val;
        y_options.add(new Option("请选择年份", ""));
        do {
          _val = +year + i;
          y_options.add(new Option(_val, _val));
          i++;
        } while (i < 20);
      });

      //填充有效期；只对绑定的银行卡有效
      me.checkDateEnable();

      expires_year.yselector({
        onchange: function(obj) {
          expire_M_Y(this);
        }
      });
      expires_month.yselector({
        onchange: function(obj) {
          expire_M_Y(this);
        }
      });
    },

    checkDateEnable: function() {
      //判断有效期是否有效；无效则警告；有效则隐藏时间；
      var date = this.currentDate || '1307',
        me = this;
      dd = date.match(/\d{2}/g),
      y = dd[0], m = dd[1],
      dateNow = new Date(),
      y0 = dateNow.getFullYear().toString().match(/\d{2}/g)[1],
      m0 = dateNow.getMonth() + 1,
      yEle = bindcardsCon.find('.expires_year'),
      mEle = bindcardsCon.find('.expires_month');

      mEle.val(mEle.isExistItem(m) ? m : '请选择月份');
      yEle.val(yEle.isExistItem(y) ? y : '请选择年份');
      mEle.trigger('change');
      yEle.trigger('change');

      if (+m < +m0 && +y <= y0) {
        yEle.parents('tr').show();
        me.showTips(yEle, '请确认有效期');
      } else if (+m == +m0 && +y <= y0) {
        yEle.parents('tr').show();
      } else {
        me.clearTips(yEle);
        yEle.parents('tr').hide();
      }

    },
    clearTips: function(el) {
      var _div = el.closest('td').find(".js_tipcontainer");
      _div.find('.txt_tips').text('');
      _div.find('.iright').show();
      _div.find('.iwrong').hide();
    },

    showTips: function(el, msg) {
      var _div = el.closest('td').find(".js_tipcontainer");
      _div.show();
      _div.find('.iwrong').show();
      _div.find('.iright').hide();
      _div.find('.txt_tips').text(msg);
    },

    _initValidate: function() {
      var me = this;
      $.jvalidator.addPattern({
        name: 'not_empty',
        message: '不能为空',
        validate: function(value, validationCallback) {
          validationCallback($.trim(value) != '');
        }
      });
      $.jvalidator.addPattern({
        name: 'mobile',
        message: '请输入正确的手机号',
        validate: function(value, validationCallback) {
          value = $.trim(value).replace(/\s/g, '');
          validationCallback(QNR.patterns.mobile.test(value));
        }
      });
      $.jvalidator.addPattern({
        name: 'creditcardcvv',
        message: '格式有误',
        validate: function(value, validationCallback) {
          //验证信用卡背后三位数字
          var mobileRegExp = /^\d{3}$/i;
          validationCallback(mobileRegExp.test($.trim(value)));
        }
      });
      $.jvalidator.addPattern({
        name: 'debitcardno',
        message: '请输入正确的银行卡号',
        validate: function(value, validationCallback) {
          var cardRegExp = /^[\d]{16,19}$/;
          value = $.trim(value).replace(/\s/g, '');
          validationCallback(cardRegExp.test(value));
        }
      });

      $.jvalidator.addPattern({
        name: 'creditcardno',
        message: '请输入正确的信用卡号',
        validate: function(value, validationCallback) {
          var isMasterCard = numRegExp.test($.trim(value).replace(/\s/g, ''));
          //todo 记得删除对beta的判断
          isMasterCard = isMasterCard && me.isValidMasterCard($.trim(value).replace(/\s/g, ''));

          var cardid = $('#credit_cardnum');
          var params = {
            cardType: $('[name="cardType"]:checked').val()
          };
          params[allbankname.attr('name')] = allbankname.val();
          params[cardid.attr('name')] = cardid.val().replace(/\s/g, '');

          if (isMasterCard && bankname.val()) {
            $.ajax({
              url: baseurl + 'CheckCardBin.do',
              data: params,
              type: 'post',
              dataType: 'json',
              success: function(data) {
                var result = data.ret && data.data && (parseInt(data.data.status, 10) == 1);

                if (result) {
                  validationCallback(result);
                } else {
                  validationCallback(result, '类型, 银行和卡号不匹配');
                }
              },

              error: function(data) {
                validationCallback(false);
              }
            });
          } else {
            validationCallback(isMasterCard);
          }
        }
      });

      $.jvalidator.addPattern({
        name: 'vcode',
        message: '请输入正确的验证码',
        validate: function(value, validationCallback) {
          var isMatch = /^[\d]{6}$/.test($.trim(value));
          $('[placeholder="get-permit-message"]').remove();
          var _mobile = $(this).parents('table').find('input[name="mobile"]').val().replace(/\s/g, '');

          if (isMatch && QNR.patterns.mobile.test(_mobile)) {
            $.ajax({
              url: baseurl + 'CheckVcodeNoUid.do',
              data: {
                mobile: _mobile,
                vcode: value,
                messageType: 1
              },
              type: 'post',
              dataType: 'json',
              success: function(data) {
                if (data && data.ret) {
                  validationCallback(true);
                } else {
                  validationCallback(false);
                }
              }
            });
          } else {
            validationCallback(isMatch);
          }
        }
      });

      this.showInvalid = function(el, message) {
        var e = $(el).closest('td').find(".js_tipcontainer");
        e.removeClass("popup_tips_wrap_clr");
        var _msg = quickPayTemplate.icon_wrong.join('');
        e.html(_msg.replace(/\{content\}/g, message)).show();
      };

      this.showValid = function(el) {
        var e = $(el).parent().siblings(".js_tipcontainer");
        e.removeClass("popup_tips_wrap_clr");
        e.html(quickPayTemplate.icon_right.join('')).show();
      };

      this.formChecker = payFrom.find("[data-jvalidator-pattern]").jvalidator({
        validation_events: ['blur'],
        on: {
          invalid: function(evt, el, patterns) {
            var e = $(el).parent().siblings(".js_tipcontainer");
            e.removeClass("popup_tips_wrap_clr");
            var _msg = quickPayTemplate.icon_wrong.join('');
            e.html(_msg.replace(/\{content\}/g, patterns[0].message)).show();
          },
          valid: function(evt, el, patterns) {
            var e = $(el).parent().siblings(".js_tipcontainer");
            e.removeClass("popup_tips_wrap_clr");
            e.html(quickPayTemplate.icon_right.join('')).show();
          }
        }
      });
    },

    getBankList: function(callback) {
      var me = this;
      var uid = QNR.PayInfo ? QNR.PayInfo.userid : '';
      var url = "/payServer/quickPayBankList.do" + "?userId=" + uid;
      $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        success: function(res) {
          if (res && res.ret && res.data) {
            var userCards = res.data.userCard || [],
              baseCards = res.data.baseCard || [],
              otherCards = res.data.otherCard || [],
              userCardsLen = userCards.length,
              baseCardsLen = baseCards.length,
              otherCardsLen = otherCards.length,

              userCardsData = {},
              baseCardsData = {},
              otherCardsData = {},
              bank, img;

            for (var i = 0; i < userCardsLen; i++) {
              bank = userCards[i];
              img = me.parseImgURL(bank.bankCode);
              bank.picUrl = img;
              userCardsData[userCards[i].id] = bank;
            }
            for (var i = 0; i < baseCardsLen; i++) {
              bank = baseCards[i];
              img = me.parseImgURL(bank.bankCode);
              bank.picUrl = img;
              baseCardsData[baseCards[i].bankCode] = bank;
            }
            for (var i = 0; i < otherCardsLen; i++) {
              bank = otherCards[i];
              img = me.parseImgURL(bank.bankCode);
              bank.picUrl = img;
              otherCardsData[otherCards[i].bankCode] = bank;
            }
            unionPay.userbankList = userCardsData;
            unionPay.bankList = baseCardsData;
            unionPay.otherbankList = otherCardsData;

            callback && callback();
          }
        }
      })
    },
    parseImgURL: function(code) {
      var url = '';
      if ($.inArray(code, noImgBank) > -1) {
        url = imageURL + 'nologo.png';
      } else {
        url = imageURL + code.toLowerCase() + '.png';
      }
      return url;
    }
  };
  var unionPay = new unionPay();
  $(function() {
    unionPay.getBankList();
  });
})(jQuery);


$(function() {
  $('#login').click(function() {
    new $.LoginPop({
      callback: function(a) {
        location.reload();
      },
      proxy: 'payServer/view/proxy.htm',
      regFlag: false,
      twoWeek: false
    })
    return false;
  })

  $('#regist').bind('click', function() {
    new $.LoginPop({
      callback: function(a) {
        location.reload();
      },
      type: 'reg',
      proxy: 'payServer/view/proxy.htm'
    });
    return false;
  });
})

// TODO: own 
$(function() {
  var tabs = $('.trigger_item'),
    ctns = $('.e_tab_content'),
    cls = 'trigger_item_current';
  tabs.click(function(e) {
    var $this = $(this);
    var idx = tabs.index($this);
    tabs.removeClass(cls).eq(idx).addClass(cls);
    ctns.hide().eq(idx).show();
  })
})