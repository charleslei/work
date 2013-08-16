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
}  
if(typeof QNR=="undefined"){
  var QNR={};
}
(function($){

    var baseurl       = "/payServer/",
        btnSubmit     = $("#btnSubmit"),
        tips          = QNR.locale.tips,
        showAllBindBank	= $('#showAllBindBank'),
        expires_year  = $(".expires_year"),
        expires_month = $(".expires_month"), 
        bankname     = $('.bankname'), 
        allbankname = $('#allbankname'),
        bindbankname = $('#bindbankname'),
        payForm       = $("#quickpayform"), 
        numRegExp     = /^\s*[0-9][\d]*\s*$/i,
        bankLi			= $('.js-choose-item'),
        radios			= bankLi.find('input[type="radio"]'),
        //显示隐藏和选择银行,
        highlightClass	= "highlight",
        // 其他支付 展示更多银行	
        morebank	   = $('.more_bank'),
        hidebank	   = $('.hide_bank'),
        mobileStage		= $('#mobile-number #mobile'),
        vcode		=	$('#vCode'),
        jquery_dg= old_dg = old_defCarddg = jquery_defCarddg = null,
        bindCards = {},
        bindcardsCon = $('#bindcardsCon'),
        allcardsCon = $("#allcardsCon"),
        cardPicWrap = $('.e_card_picwrap'),
		creditInfoWrap = $(".credit-info-wrap"),
        //TODO:
        //imageURL = '/images/site/images/pay/bankicon_1/',
        imageURL = 'http://source.qunar.com/site/images/pay/bankicon_1/',
        bindUL = bindcardsCon.find('ul'),
        noImgBank = ['ZJCZCBANK', 'YCCCBANK', 'WUXIRCBANK', 'SDEBANK', 'SQBANK', 'SXYDRCBANK', 'LJBANK', 'LZBANK', 'JINHUABANK', 'JSPRCU', 'HNPRU', 'FJPRCU', 'ORDOSBANK', 'DYBANK', 'DALIANBANK', 'JYRCBANK', 'XJKCCB', 'XMCCB', 'FJHXBANK', 'LZCCB', 'DRCBANK', 'HBXH', 'SUZHOUBANK', 'AYB', 'SMXBANK', 'HBSBANK', 'ZHOUKBANK', 'YBCCB', 'YCCCB', 'HAINANBANK', 'GUILINBANK', 'KSRCB', 'TCRCB', 'JXSNXS', 'NMGNXS', 'WUHAICB', 'JCCBANK', 'JZBANK', 'SXNXYB', 'YQCCB', 'FTYZB', 'SZNCCB', 'ASCCB', 'FSBANK', 'QJCCB', 'GXNLS', 'NANHAIBANK', 'JLNLS', 'QHNB', 'CZCCB', 'HDCB', 'SBANK', 'TSBANK', 'ZJKCCB', 'DYCCB', 'SNCCB', 'ZGBANK', 'LSSCB', 'LSZSH', 'YAANBANK', 'NDHB'],
        

        //倒计时
        tmin = $("#mins"),
        tsec = $('#sec'),
        //选择卡类型
        cardType = $("input:radio[name='cardType']");

  function unionPay(){
    this._init();
  }
  unionPay.prototype = {
      _init : function(){

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

      _initBankIcon: function(){
                         var me = this;
                         $('.js-bank-icon').each(function(){
                             var $this = $(this), cardCode = $.trim($this.parents('.js-choose-card').find('input.radio_box').attr('bank'));
                             var bankicon= me.parseImgURL(cardCode);

                             $this.css('background-image','url('+bankicon+')');
                         });
                         me._checkBindCardShown();
                     },
					 
        initDebitCard: function(){
						  $('#debit_card li label,#platform li label').click(function(){
							var $this = $(this);
							$this.siblings().attr('checked',true).parent().addClass('active').siblings().removeClass('active');
						  })
						  var hide_ele = $('#allcards .hide');
						  $('#show_and_hide .up, #show_and_hide .down').click(function(){
							var $this = $(this);
							if($this.is('.down')){
							  hide_ele.show();
							}else{
							  hide_ele.hide();
							}
							$this.hide().siblings().show();
							return false;
						  })
						},

        _initEvent : function(){
                         var me = this;

                         //确认付款
                         btnSubmit.bind("click",function(e){
                             me.submitform(e);
                         });
                         //银行卡号
                         $("#credit_cardnum, #debit_cardnum").bind("keyup change focus", function() {
                            var _self = $(this),
                              text = _self.val(),
                              value;
                            if (text) {
                              value = me.formatCardNumber(text);
                              _self.val( value );
                              if( value.replace(/\s/g,"").length === 16 ){
                                me.showCreditCardInfo( value );
                              }else{
                                me.hideCreditCardInfo();
                              }
                            }
                          });

                         //手机号
                         $("#allcardsCon #mobile,#bindcardsCon #mobile").bind("keyup change", function () {
                             var _self = $(this), text = _self.val();
                             if (text) {
                                 _self.val(me.formatMobileNumber(text));
                             }
                         });

                         $('#credit_cardbacknum').live('focus', function(e) {
                            creditInfoWrap.hide();
                            cardPicWrap.show();
                            if(allcardsCon.is(":hidden"))
                              cardPicWrap.addClass("simple")
                            else
                              cardPicWrap.removeClass("simple")
                            $('.card_pic .img').css('background-position', '0 -142px');
                          });
						  
						  payForm.delegate('.yselector_box', 'click', function(e) {
                            creditInfoWrap.hide();
                            cardPicWrap.show();
                            if(allcardsCon.is(":hidden"))
                              cardPicWrap.addClass("simple")
                            else
                              cardPicWrap.removeClass("simple")
                            $('.card_pic .img').css('background-position', '0 0');
                          });
						  
                         //快捷支付 显示全部绑定银行
                         if(bankLi.length > 3) $(".all_blind_bank").show();
                         showAllBindBank.bind('click',function(){
                            var $this = $(this),
                              txt = $(this).attr("data-toggle");
                            if(bankLi.filter(":hidden").length){
                              bankLi.show(200);
                            }else if(bankLi.length >3){
                              bankLi.filter(":gt(2)").hide(200);
                            }else{
                              return false;
                            }
                            if(bankLi.length <= 3)
                              $this.parent().hide();
                            $this.attr("data-toggle",$this.text());
                            $this.text(txt);
                            return false;
                         });

                         $("#choosebank").live("click",function(){
                          me.showOtherBankDialog();
                         })

                         bindcardsCon.delegate('li.js-choose-item', 'mouseenter',function(e){
                             $(this).addClass(highlightClass);
                             $(this).find('.close').show();
                         }).delegate('li.js-choose-item', 'mouseleave',function(e){
                             if(showAllBindBank.is(':visible')) return;
                             $(this).removeClass(highlightClass);
                             $(this).find('.close').hide();
                         }).delegate('.js-choose-card', 'click',function(e){
                             var el = $(this).closest('li'), checkedEle = el.find('input[type=radio]'),
                                 mb = checkedEle.attr('mobile'),
                                 bk = checkedEle.attr('bank'),
                                 date = checkedEle.attr('valiDate');
                             var sibling = el.siblings('.js-choose-item');
                             sibling.hide(200);

                             checkedEle.attr('checked',true);
                             el.addClass(highlightClass);
                             showAllBindBank.show();

                             mobileStage.val(mb);
                             me.currentMobile = mb;
                             bindbankname.val(bk);
                             me.currentBank = bk;
                             me.recheckMobileVcode();

                             me.currentDate = date;
                             me.checkDateEnable();

                             setTimeout(function(){
                              if( bankLi.filter(":hidden").length >= 1){
                              $(".all_blind_bank").show().find("a").attr("data-toggle","全部收起").text("全部展开");
                             }
                           },400)
                             
                         });

                         $('#show_creditcard_online').click(function(){
                           me.showCreditCardDialog();
                           return false;
                         });
						 
						 $('#btnSubmitDebitCard_next, #btnSubmitPlatform_next').click(function(){
							var $this = $(this);
							me.netbankPay($this.parents('form'));
							return false;
						 });
                     },

        recheckMobileVcode: function(){
                                if(!vcode.length){
                                    return;
                                }

                                var newmobile=radios.filter(':checked').attr('mobile');

                                if(this.currentMobile!=newmobile){
                                    vcode.val('');
                                    $('[placeholder="get-permit-message"]').remove();
                                    this.showInvalid(vcode,'您选择的银行卡改变, 请重新发送验证码');
                                    this.currentMobile=newmobile;
                                }
                            },

  //初始化倒计时
  _initTimeCount : function(){
                     var countNum = 1800000;
                     var formattime = function(t){
                       t = t || '00000000000000';
                       var res = t.match(/\d{2}/g),
                         yy = res[0] + res[1],
                         mou = res[2],
                         dd = res[3],
                         hh = res[4],
                         mm = res[5],
                         ss = res[6];
                       return (new Date(yy,mou,dd,hh,mm,ss)).getTime();
                     };
                     var newtime=$('#newtime').val();
                     var oldtime=$('#oldtime').val();
                     var dur = countNum-( formattime(newtime)-formattime(oldtime) );


                     var timeout=function(){
                       window.location.href= baseurl + 'error.do?type=timeout';
                     };

                     var timeCount = new QNR.timeCount(dur,{min:tmin,sec:tsec},timeout);
                   },
 submitform : function(e){
                 var me = this;
                 this.formChecker.validateAll(function(ret) {
                   var valiHidden = me.valiHiddens();

                   if(ret && valiHidden){
                     me.syncsubmit();
                   }
                 });
                 e.preventDefault();
               },

  syncsubmit : function(){
                 var syncForm = document.createElement("form");
                 document.body.appendChild(syncForm);
                 syncForm.method = 'post';
                 syncForm.action = payForm.attr('action');
                 syncForm.target = '_self';

                 var o = this.getParam();
                 for( var _attr in o ){
                   if( o.hasOwnProperty(_attr) ){
                     //清除表单value的空格
                     var _val = $.trim(o[_attr]);
                     var _inp = document.createElement("input");
                     _inp.setAttribute("name", _attr );
                     _inp.setAttribute("value",o[_attr]);
                     _inp.setAttribute("type","hidden");
                     syncForm.appendChild( _inp );
                   }
                 }
                 syncForm.submit();
               },

  getParam : function(){
               var me = this;
               var parm = me.getForm(payForm);
               return parm;
             },

  //获取form表单
  getForm : function(form){
                var me = this;
                if(me._checkBindCardShown()){
                    allcardsCon.remove();
                    cardPicWrap.remove();
                }else{
                    bindcardsCon.remove();
                }
              var array = form.serializeArray();
              var ret ={}, mon, year;
              $.each(array,function(i,input){
                ret[input.name] = input.value.replace(/\s/g, '');
              });
              return ret;
            },

  formatCardNumber : function(num){
                       var text = num.replace(/\s/g, '').match(/(\w{4})|(\w{1,3})/g);
                       return !!text ? text.join(' ') : '';
                     },
					 
  formatMobileNumber : function(num){
                         var th = num.replace(/\s/g, '').match(/\w{1,3}/);
                         var fth = num.substring(3).match(/\w{1,4}/g);
                         var ar = !!fth ? th.concat(fth) : th;
                         return !!ar ? ar.join(' ') : '';
                       },
    // 显示添加其他信用卡
		showOtherBankDialog:function(){
      var me = this;
      // this.payResultDlg = null;
      var html = '<div class="b_fpanel b_other_bank b_pinfo_form">'+
                  '<div class="container">'+
                  '<div class="inner">'+
                  '<div class="e_title"><span class="title_txt">选择其他信用卡</span><a href="javascript:void(0)" class="close"></a></div>'+
                  '<div class="content_wrap">'+
                  '</div></div></div></div>';
      var obj = $("#allcardsCon,.b_pinfo_form .e_card_picwrap,.b_pinfo_form .credit-info-wrap,.b_pinfo_form .e_ops_button").show();

      this.payResultDlg = new QNR.htmlDialog(html);
      this.payResultDlg.show();
      $(".b_other_bank .content_wrap").append( obj );
      allcardsCon.show();
      creditInfoWrap.hide();

      // close
      $(".b_other_bank .close").one("click",function(){
        var $wrap = $(this).closest(".b_fpanel");
        $wrap.find(".content_wrap").children().appendTo(payForm);
        allcardsCon.hide();
        cardPicWrap.hide();
        creditInfoWrap.hide();
        me.payResultDlg.hide();
        me.payResultDlg = null;
        $(".b_other_bank").remove();
      });

      if (document.selection && document.selection.empty) {
        document.selection.empty();  //IE
      }else if(window.getSelection) {
        window.getSelection().removeAllRanges(); //ff
      }
    },
    showPayResultDialog: function(){
    var me = this;
    this.payResultDlg = null;
    var _html = quickPayTemplate.payDoneDialog.join('');

    //_html = _html.replace(/\{content\}/g,bankItem.join(''));

    this.payResultDlg = new QNR.htmlDialog(_html);
    this.payResultDlg.show();

    if (document.selection && document.selection.empty) {
      document.selection.empty();  //IE
    }else if(window.getSelection) {
      window.getSelection().removeAllRanges(); //ff
    }

    this.payResultDlg.dom.find('li label').click(function(){
      var $this = $(this);
      $this.siblings().attr('checked',true).parent().addClass('active').siblings().removeClass('active');
    });
  },

  showCreditCardDialog: function(){
    var me = this;
    me.creditCardDlg = null;
    var _html = quickPayTemplate.creditCardDialog.join(''), bankListCount = 0;

    bankItem = [];
    bankData = me.creditCardsBankList;
    $.each(bankData, function(k, v){
      bankItem.push('<li class="e_open_ibank">');
      bankItem.push('<input type="radio" name="bankCode" id="'+ k +'" value="'+ k +'" class="radio_box">');
      bankItem.push('<label class="bank_logo_box"><span class="bank_logo"><img title="'+ v.bankCode +'" src="'+ v.picUrl +'" /></span><span class="bank_name_txt"></span></label>');
      bankItem.push('</li>');
      bankListCount++;
    });
    _html = _html.replace(/\{content\}/g,bankItem.join(''));

    me.creditCardDlg = new QNR.htmlDialog(_html);
    me.creditCardDlg.show();

    if (document.selection && document.selection.empty) {
      document.selection.empty();  //IE
    }else if(window.getSelection) {
      window.getSelection().removeAllRanges(); //ff
    }

    me.creditCardDlg.dom.find('li label').click(function(){
      var $this = $(this);
      $this.siblings().attr('checked',true).parent().addClass('active').siblings().removeClass('active');
    });

    me.creditCardDlg.dom.find('#btnCreditSubmit_next').click(function(e){
      me.netbankPay(me.creditCardDlg.dom.find('form'), me.creditCardDlg);
      return false;
    })
    $("#banllist_close, #cancelbank").bind("click",function(){
      me.creditCardDlg.hide();
    });
  },
  
  showCreditCardInfo: function( cardId ){
      var lastId = $.trim( cardId ).split(" ")[3];
      $.get("creditList.json",function(res){
        // TO DO:ajax data | 判断与之前是否
        $(".credit-bank-wrap").html('<div class="fL"><img src="http://source.qunar.com/site/images/pay/bankicon_1/cmb.png" title="CMB"></div><div class="fR">信用卡 ** <span>'+lastId+'</span></div>');
        $(".credit-bank").slideDown();
        cardPicWrap.hide();
        $(".credit-info").html('<p>网上交易限额</p> <table> <tr class="title"> <td>单笔限额(元)</td> <td>单日限额(元)</td> </tr> <tr> <td>小于2万元</td> <td>小于2万元</td> </tr> <tr class="title"> <td colspan="2">备注</td> </tr> <tr> <td colspan="2">客服热线<span>95588</span></td> </tr> </table>');
        creditInfoWrap.show();
      })  
    },
	
    hideCreditCardInfo: function(){
      $(".credit-bank-wrap").html("");
      $(".credit-bank").slideUp(0);
      $(".credit-info").html("");
      cardPicWrap.show();
      creditInfoWrap.hide();
    },
        netbankPay: function(prt, dlg){
          var me = this, params = [];
          var arr = prt.serializeArray(), bankCodeTag = false;
          $.each(arr, function(i, v){
            bankCodeTag = v.name == 'bankCode' ? true : false;
          })

          if(!bankCodeTag){
            return false;
          }
          var array = payForm.serializeArray();
          var info = ["merchantCode","orderNo","orderDate","payId","payType","HMAC"]
          $.each(array, function(i, v){
            if($.inArray(v.name, info) > -1){
              arr.push(v);
            }
          });

          var queryParam = decodeURIComponent($.param(arr, true));
          var netPayUrl = '/page/union/netbankPay.do?' + queryParam;
          window.open(netPayUrl, 'netPay');

          if(dlg){
            dlg.hide();
            dlg.remove();
          }
          me.showPayResultDialog();
        },
  _refreshBindCard: function(obj){
                        var id = obj.id,me = this;
                            bankVal = id + ',' + obj.cardType,
                            mob = obj.telphone,
                            bk = obj.bankCode,
                            date = obj.validate,
                            cardNumA = obj.cardNo.split('*'),
                            cardNum = cardNumA[cardNumA.length -1],
                            img = me.parseImgURL(bk);

                            li = '<li class="js-choose-item highlight" style="display: list-item;"><div class="e_card_type clrfix"><div class="common_card">常用卡</div><div class="info_card js-choose-card"><input checked type="radio" name="bankAndType" value="' + bankVal + '" mobile="' + mob + '" bank="' + bk + '" validate="' + date + '" class="radio_box"><label class="banklogo_box" for=""><span class="bank_name js-bank-icon" style="background-image: url(' + img + ');background-position: 0px 0px;"></span><span class="bankcard_info">信用卡 <span class="encryption">**</span><em class="last_num">' + cardNum + '</em></span></label></div><a href="javascript:;" js_bid="' + id + '" js_btype="1" js_blastfnum="' + cardNum + '" class="close js_ops_link">删除</a></div></li>';
                        bankLi.eq(bankLi.length - 1).remove();
                        bindUL.append(li);
                        bankLi = $('.js-choose-item');
                        radios = bankLi.find('input[type="radio"]');

                    },

  //短信验证码
  _initMobile : function(){
                    var form = payForm,
                    _error = form.find("[placeholder='get-permit-error']"),
                    _message = form.find('[placeholder="get-permit-message"]'),
                    _button = form.find('[placeholder="get-permit"]');
                    var _showError=function(msg){
                        _error.removeClass("popup_tips_wrap_clr");
                        var _msg = quickPayTemplate.icon_wrong.join('');
                        _error.html( _msg.replace(/\{content\}/g,  msg) );					

                        if(_showError.handler){
                            clearTimeout(_showError.handler);
                        }

                        _showError.handler=setTimeout(function(){
                            _error.hide();
                            _showError.handler=false;
                        },3000);
                    };

                    QNR.phoneValid({
                        url: baseurl+"SendVcodeNoUid.do",
                        button: _button,
                        message: _message,
                        callback: function(data){
                            var m="status";
                            if(data.ret){
                                if(parseInt(data.data[m])==1){
                                    _error.hide();
                                    return true;
                                }else if(parseInt(data.data[m])==2){
                                    _showError(tips.vcode.limit);
                                    return false;
                                }else if(parseInt(data.data[m])==3){
                                    _showError(tips.vcode.frequent);
                                    return false;
                                }
                            }else{
                                _error.removeClass("popup_tips_wrap_clr");
                                var _msg = quickPayTemplate.icon_wrong.join('');
                                _error.html( _msg.replace(/\{content\}/g,  tips.vcode.sendFail) );					  
                                return false;
                            }

                            return false;
                        },
                        locker: function(obj){
                                    var _mobileObj = $(obj).parents('table').find('#mobile'),
                                    _mobile = (_mobileObj.val()).replace(/\s/g, '');

                                    if(!_mobile){
                                        $('#mobile').trigger('blur');
                                    }

                                    return QNR.patterns.mobile.test(_mobile);
                                },

                        paramRender: function(obj){
                                         var _self = this;
                                         var $moble = $(obj).parents('table').find('#mobile');
                                         var _moble = ($moble.val()).replace(/\s/g, '');
                                         $moble.trigger('blur');
                                         return {mobile:_moble, messageType: 1};
                                     }
                    });
                },
      _initBankCode: function(){
                         //如果是用户已经保存的卡，那么把选择的卡code放到的银行卡code里；
                         if(this._checkBindCardShown()){
                             this.currentMobile = radios.filter(':checked').attr('mobile')||'';
                             this.currentBank = radios.filter(':checked').attr('bank')||'';
                             this.currentDate = radios.filter(':checked').attr('valiDate')||'';
                             mobileStage.val(this.currentMobile);
                             bindbankname.val(this.currentBank);
                             cardPicWrap.hide();
                         }else{
                             allcardsCon.show();
                             cardPicWrap.show();
                         }
                     },

      _initClearForm: function(obj){
                          if(obj){
                              obj.find('.js_tipcontainer').hide();
                          }else{
                              $(".js_tipcontainer").hide();
                          }
                      },

      //验证银行卡，采用了 LUHN 算法
      isValidMasterCard : function(cardNo) {
                              return QNR.patterns.creditcard.test(cardNo);
                          },	
      //被隐藏的input校验
      valiHiddens : function(){
                        var me = this, res = true, m, y, bkEle,
                        y0 = dateNow.getFullYear().toString().match(/\d{2}/g)[1],
                        m0 = dateNow.getMonth() + 1;
                        if(me._checkBindCardShown()){
                            m = bindcardsCon.find('.expires_month');
                            y = bindcardsCon.find('.expires_year');
                            bkEle = bindbankname;
                        }else{
                            m = allcardsCon.find('.expires_month');
                            y = allcardsCon.find('.expires_year');
                            bkEle = allbankname;
                        }
                        if(!(m.get(0).selectedIndex) || !(y.get(0).selectedIndex) || (+$(y).val() <= +y0 && +$(m).val() < +m0 )){
                            me.showTips(y,'请选择有效期');
                            res = res && false;
                        }	

                        if($.trim(bkEle.val()) == ""){
                            me.showTips(bkEle,'请选择银行名称');
                            res = res && false;
                        }	

                        return res;
                    },
      _checkBindCardShown : function(){
                                var res =  bindcardsCon && bindcardsCon.is(":visible");
                                if (res){
                                    btnSubmit.parent().css('padding-left', '160px')
                                }else{
                                    btnSubmit.parent().css('padding-left', '130px')
                                }

                                return res;
                            },
      _initExpiresDate : function(){
                             var me = this;
                             var year = new Date().getFullYear().toString().substr(2);
                             var expire_M_Y = function(ori){
                                 var prt = $(ori.options.rawSelect).parents('.ops_date'),
                                     m = prt.find('.expires_month'),
                                     y = prt.find('.expires_year'),
                                     dateNow = new Date(),
                                     y0 = dateNow.getFullYear().toString().match(/\d{2}/g)[1],
                                     m0 = dateNow.getMonth() + 1;

                                 if(!!m.get(0).selectedIndex && !!y.get(0).selectedIndex){
                                     if(+$(y).val() <= +y0 && +$(m).val() < +m0 ){
                                         me.showTips(y,'请选择有效期');
                                     }else{
                                         me.clearTips(y);
                                     }
                                 }else{
                                     me.showTips(y,'请选择有效期');
                                 }
                             }
                             if(!expires_year.length) return;
                             expires_year.each(function(idx, val){
                                 var y_options = expires_year[idx].options, i = 0, _val;
                                 y_options.add(new Option("请选择年份", ""));
                                 do{
                                     _val = +year + i;
                                     y_options.add(new Option(_val,_val));
                                     i++;
                                 }while( i < 20 );
                             });

                             //填充有效期；只对绑定的银行卡有效
                             me.checkDateEnable();

                             expires_year.yselector({
                                 onchange: function(obj){
                                               expire_M_Y(this);
                                           }
                             });
                             expires_month.yselector({
                                 onchange: function(obj){
                                               expire_M_Y(this);
                                           }
                             });
                         },

      checkDateEnable: function(){
                           //判断有效期是否有效；无效则警告；有效则隐藏时间；
                           var date = this.currentDate && /^\d*$/.test(this.currentDate) || '1307', me = this;
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

                           if( +m < +m0 && +y <= y0){
                               yEle.parents('tr').show();
                               me.showTips(yEle, '请确认有效期');
                           }else if( +m == +m0 && +y <= y0){
                               yEle.parents('tr').show();
                           }else{
                               me.clearTips(yEle);
                               yEle.parents('tr').hide();
                           }

                       },
					   
      clearTips : function(el){
                      var _div = el.closest('td').find(".js_tipcontainer");
                      _div.find('.txt_tips').text('');
                      _div.find('.iright').show();
                      _div.find('.iwrong').hide();
                  },

      showTips : function(el, msg){
                     var _div = el.closest('td').find(".js_tipcontainer");
                     _div.show();
                     _div.find('.iwrong').show();
                     _div.find('.iright').hide();
                     _div.find('.txt_tips').text( msg );
                 },

      _initValidate : function(){
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
                                  validationCallback( QNR.patterns.mobile.test(value) );
                              }
                          });
                          $.jvalidator.addPattern({
                              name: 'creditcardcvv',
                              message: '格式有误',
                              validate: function(value, validationCallback) {
                                  //验证信用卡背后三位数字
                                  var mobileRegExp = /^\d{3}$/i;
                                  validationCallback( mobileRegExp.test($.trim(value)) );
                              }
                          });
                          $.jvalidator.addPattern({
                              name: 'debitcardno',
                              message: '请输入正确的银行卡号',
                              validate: function(value, validationCallback) {
                                  var cardRegExp = /^[\d]{16,19}$/;
                                  value = $.trim(value).replace(/\s/g, '');
                                  validationCallback( cardRegExp.test(value) );
                              }
                          });

                          $.jvalidator.addPattern({
                              name: 'creditcardno',
                              message: '请输入正确的信用卡号',
                              validate: function(value, validationCallback) {
                                  var isMasterCard = numRegExp.test($.trim(value).replace(/\s/g, ''));
                                  //todo 记得删除对beta的判断
                                  isMasterCard = isMasterCard&& me.isValidMasterCard($.trim(value).replace(/\s/g, ''));

                                  var cardid=$('#credit_cardnum');
                                  var params={cardType: $('[name="cardType"]:checked').val()};
                                  params[allbankname.attr('name')] = allbankname.val();
                                  params[cardid.attr('name')]=cardid.val().replace(/\s/g, '');

                                  if(isMasterCard&&bankname.val()){
                                      $.ajax({
                                          url: baseurl + 'CheckCardBin.do',
                                          data: params,
                                          type: 'post',
                                          dataType: 'json',
                                          success: function(data){
                                              var result=data.ret&&data.data&&(parseInt(data.data.status,10)==1);

                                              if(result){
                                                  validationCallback(result);
                                              }else{
                                                  validationCallback(result,'类型, 银行和卡号不匹配');
                                              }
                                          },

                                          error: function(data){
                                                     validationCallback(false);
                                                 }
                                      });
                                  }else{
                                      validationCallback( isMasterCard );
                                  }
                              }
                          });

                          $.jvalidator.addPattern({
                              name: 'vcode',
                              message: '请输入正确的验证码',
                              validate: function(value, validationCallback) {
                                  var isMatch=/^[\d]{6}$/.test($.trim(value));
                                  $('[placeholder="get-permit-message"]').remove();
                                  var _mobile=$(this).parents('table').find('input[name="mobile"]').val().replace(/\s/g, '');

                                  if(isMatch&&QNR.patterns.mobile.test(_mobile)){
                                      $.ajax({
                                          url: baseurl+'CheckVcodeNoUid.do',
                                          data: {
                                              mobile: _mobile,
                                          vcode: value,
                                          messageType: 1
                                          },
                                          type: 'post',
                                          dataType: 'json',
                                          success: function(data){
                                              if(data&&data.ret){
                                                  validationCallback(true);
                                              }else{
                                                  validationCallback(false);
                                              }
                                          }
                                      });
                                  }else{
                                      validationCallback(isMatch);
                                  }
                              }
                          });

                          this.showInvalid=function(el,message){
                              var e = $(el).closest('td').find(".js_tipcontainer");
                              e.removeClass("popup_tips_wrap_clr");
                              var _msg = quickPayTemplate.icon_wrong.join('');
                              e.html( _msg.replace(/\{content\}/g,  message) ).show();
                          };

                          this.showValid=function(el){
                              var e = $(el).parent().siblings(".js_tipcontainer");
                              e.removeClass("popup_tips_wrap_clr");
                              e.html(quickPayTemplate.icon_right.join('')).show();
                          };

                          this.formChecker= payForm.find("[data-jvalidator-pattern]").jvalidator({
                              validation_events:['blur'],
                              on: {
                                  invalid: function(evt,el,patterns) {
                                               var e = $(el).parent().siblings(".js_tipcontainer");
                                               e.removeClass("popup_tips_wrap_clr");
                                               var _msg = quickPayTemplate.icon_wrong.join('');
                                               e.html( _msg.replace(/\{content\}/g,  patterns[0].message) ).show();
                                           },
                              valid: function(evt,el,patterns) {
                                         var e = $(el).parent().siblings(".js_tipcontainer");
                                         e.removeClass("popup_tips_wrap_clr");
                                         e.html(quickPayTemplate.icon_right.join('')).show();
                                     }
                              }
                          });
                      },

      getCreditCarddList: function(callback){
                       var me = this;
                       var uid = QNR.PayInfo ? QNR.PayInfo.userid : '';
                       //TODO:
                       var url = "/creditList.json";
                       $.ajax({
                           url: url,
                           type: "POST",
                           dataType: 'json',
                           success: function(res){
                               if(res && res.ret && res.data){
                                   var creditCards = res.data.baseCard || [],
                                       creditCardsLen = creditCards.length,

                                       creditCardsData = {},
                                       bank, img;

                                   for(var i=0;i<creditCardsLen;i++){
                                       bank = creditCards[i];
                                       img = me.parseImgURL(bank.bankCode);
                                       bank.picUrl = img;
                                       creditCardsData[creditCards[i].bankCode] = bank;
                                   }								   
								   
                                   unionPay.creditCardsBankList = creditCardsData;
                                   callback && callback();
                               }
                           }
                       })
                   },
				   				   
      parseImgURL: function(code){
                       var url = '';
                       if($.inArray(code,noImgBank) > -1){
                            url = imageURL + 'nologo.png';
                       }else{
                            url = imageURL + code.toLowerCase() + '.png';
                       }
                       return url;
                   }
              };
  var unionPay = new unionPay();
  $(function(){
      unionPay.getCreditCarddList();
  });
})(jQuery);


$(function(){
    $('#login').click(function(){
        new $.LoginPop({callback: function(a){
            location.reload();
        },proxy:'payServer/view/proxy.htm',regFlag:false,twoWeek:false})
        return false;
    })

    $('#regist').bind('click', function(){
        new $.LoginPop({callback:function(a){
            location.reload();
        },type:'reg',proxy:'payServer/view/proxy.htm'});
        return false;
    });
})



// TODO: own 
$(function(){
  var tabs = $('.trigger_item'), ctns = $('.e_tab_content'),cls = 'trigger_item_current';
  tabs.click(function(e){
    var $this = $(this);
    var idx = tabs.index($this);
    tabs.removeClass(cls).eq(idx).addClass(cls);
    ctns.hide().eq(idx).show();
  })
})