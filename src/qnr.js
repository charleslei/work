if(typeof QNR=="undefined"){
	var QNR={};
}

// 登录
QNR.signin=function(){

	var form=false, dialog=false;

	var load=function(){
		form=$("#timeout-form");
		
		if(!form.length){
			window.location.reload();
		}else{
			showDialog();
		}
	}
	
	var showDialog=function(){
		var str='<div style="width:363px;" class="pay_box"><div class="pay_tip"><div class="title_pay"><span js-dialog-action="close" class="icon_close">关闭</span>登录账户中心</div>'
			+'<p class="tip_info">为确保您信息的安全，"去哪儿网"需要您登录后，才能将您的支付信息保存在个人账户中</p>'
			+'<div class="login_form">'
			+'<div class="row" js-error="notmatch" style="display: none"><span style="" class="note_no">用户名或密码有误</span></div>'
			+'<div class="row"><label>账户名：</label><input type="text" class="textbox" id="username" value="" tabindex="1"><span js-error="require" style="display: none;" class="error">请输入用户名</span></div>'
			+'<div class="row"><label>密<cite>码：</cite></label><input type="password" tabindex="2" class="textbox" id="password" value=""><span js-error="require" style="display: none;" class="error">请输入密码</span></div>'
			+'<div class="ops"><input type="button" id="signin-button" class="button_lg" tabindex="4" value="登 录"> <a href="http://user.qunar.com/passport/forgotpwd.jsp" target="_blank" class="forget">忘记登录密码?</a></div>'
			+'<div class="ops">还没有账户中心？<a title="立即注册" href="http://user.qunar.com/passport/register.jsp" target="_blank">立即注册</a></div></div></div></div>';
		
		dialog=new QNR.htmlDialog(str);
		
		var valid=function(t){
			if(!$.trim(t.val()).length){
				t.parent().find("[js-error]").show();
				return false;
			}else{
				t.parent().find("[js-error]").hide();
				return true;
			}
		}
		/*
		var isProxy=true;
		var p_d=window.location.protocol+"//"+window.location.host;
		var _request=function(){
			QNR.crossDomainPost("http://user.qunar.com/webApi/login.jsp?callbacktype=1",{
				username: dialog.dom.find("#username").val(),
					password: dialog.dom.find("#password").val(),
					remember: 1
				},
				"payServer/view/qunarpay/proxy.jsp",
				{
					onsuccess: function(data){
						if(!data.ret){
							dialog.dom.find('[js-error="notmatch"]').show();
						}else{
							reload();
						}
					},
					type: 1,
					blank: p_d+"/payServer/view/qunarpay/blank.jsp"
				}
			);
		}
		*/
		var signin=function(){
			dialog.dom.find('[js-error="notmatch"]').hide();
			/*
			if(!isProxy){
				_request();
				
				return;
			}
			*/
			$.ajax({
				url:  "/user_proxy/webApi/login.jsp",
				data: {
					username: dialog.dom.find("#username").val(),
					password: dialog.dom.find("#password").val(),
					remember: 1
				},
				dataType: "json",
				type: "POST",
				success: function(data){
					//var abc=r.match(/'{.*?}'/).join("");
					//var data=(new Function("return "+abc.substring(1,abc.length-1)))();
					//match(/var dataString = '{.+}';/g)
					if(!data.ret){
						dialog.dom.find('[js-error="notmatch"]').html(data.errmsg).show();
					}else{
						reload();
					}
				},
				complete: function(){
				}
			});
		}
		
		dialog.dom.find(":text,:password").bind("blur",function(){
			var t=$(this);
			return valid(t);
		});
		
		dialog.dom.find("#signin-button").bind("click",function(){
		
			if(valid(dialog.dom.find("#username"))&&valid(dialog.dom.find("#password"))){
				signin();
			}
		});
		
		showDialog=function(){
			dialog.show();
		}
		
		closeDialog=function(){
			dialog.hide();
		}
		
		dialog.bind("close",closeDialog);
		
		showDialog();
	}
	
	var closeDialog=function(){
	}
	
	var reload=function(){
		form.submit();
	}

	return load;
}();

// ajax
$._ajax=$.ajax;
$.ajax=function(args){

	var params={};
	
	if(typeof arguments[0]=="string"||typeof arguments[0]=="number"){
		$.extend(params,{url:arguments[0]});
	}else if(typeof arguments[0]=="object"){
		$.extend(params,arguments[0]);
	}

	if(arguments.length>1&&typeof arguments[1]=="object"){
		$.extend(params,arguments[1]);
	}

	var _s=params.success||function(){};
	var _e=params.error||function(){};

	params.success=function(data){
		try{
			_s(data);
		}catch(e){
		}

	};

	params.error=function(arg1,arg2,arg3){
		try{
			_e(arg1,arg2,arg3);
		}catch(e){
		}
	}

	return $._ajax($.extend({complete:function(data){
	
		if(data.status==302){
			//QNR.signin();
		}
		
		//alert(data.responseText);
		
		var j=data.statusText=="error"?false:(new Function("return "+data.responseText))();
		if(typeof j=="object"){
			if(parseInt(j.errcode)==-1){
				QNR.signin();
			}
		}
		
	}},params));
};

// phone validate
QNR.phoneValid=function(_config){

	var isSending=false;

	var config=$.extend({
		before: function(){
		},
		after: function(){
		},
		url: "",
		paramRender: function(){
			return {};
		},
		locker: function(){
			return true;
		},
		
		callback: function(){
			return true;
		},
		
		onsend: function(){
		},
		
		button: "#get-permit",
		
		message: "[js-place-holder='get-permit-message']"
	},_config);

	var m=$(config.button),_msg=$(config.message).remove().removeClass("hide").removeClass("fl");
	var _oricls=m.attr("js-reset-class"), _sentcls=m.attr("js-sent-class");
	var locked=false;
	
	var timer=function(t){
		var l=parseInt(t);
		
		if(!l){
			unlock();
			return;
		}
		
		m.html(""+l+"秒后重新发送");
		l--;
		
		setTimeout(function(){
			timer(l);
		},1000);
	}
	
	var lock=function(onlylock){
		locked=true;
		
		m.removeClass(_oricls);
		m.addClass(_sentcls);
		
		try{
			config.after();
		}catch(e){
		}
		
		if(onlylock===true){
			return;
		}
		
		m.parent().append(_msg);
	}
	
	var unlock=function(){
		m.removeClass(_sentcls);
		m.addClass(_oricls);
		
		m.html("重新获取验证码");
		
		try{
			config.before();
		}catch(e){
		}
		locked=false;
		
		_msg.remove();
	}
	
	var send=function(){
    if(config.beforeSend && config.beforeSend(this)){
      return
    }

		if(locked||!config.locker(this)||isSending){
			return;
		}
		
		try{
			config.onsend();
		}catch(e){
		}
		
		isSending=true;
	
		$.ajax({
			url:config.url,
			dataType:"json",
			type:"POST",
			async: false,
			data:config.paramRender(this),
			success:function(data){
			
				if(config.callback(data)){
					lock();
					timer(60);
				}else{
                    config.errCallback && config.errCallback(data);
                }
				
			}
		});
		
		isSending=false;
	}
	
	m.bind("click",send);
	
	return {
		lock: function(){
			lock(true);
		}
	};
};

// patterns
QNR.patterns={
	creditcard: {
		test: function(cardNo){
			cardNo=cardNo||'';
			var cache = [], cardNoArr= cardNo.split(''),
				temp, cardNoTemp, cardNoArrLen = cardNoArr.length,
				sum = 0, cacheLen;
            /*信用卡校验规则：
            *1、从倒数第二位开始，每相隔一位*2，如果乘积为两位数则数字相加
            *2、得到的乘积与1中未处理的数字相加（除了最后一位），取和向上最近的以0结尾的数字
            *3、用2得到的数字减去2中相加的和，得到的数字等于信用卡最后一位
            */   
            if(cardNoArrLen < 1){
            	return false;
            }
            var lastnumber = cardNoArr[cardNoArrLen-1];
            var cacuIndex = cardNoArrLen - 2;
            var curIndex = cardNoArrLen - 1;
            while(curIndex--){
            	var mod = cacuIndex-curIndex;
				if (mod % 2){
					cache.push(parseInt(cardNoArr[curIndex]));
				} else {
					cardNoTemp = cardNoArr[curIndex] * 2;

					if (cardNoTemp.toString().length == 1) {
						cache.push(cardNoArr[curIndex] * 2);
					} else {
						temp = cardNoTemp.toString().split('');
						cache.push(parseInt(temp[0], 10) + parseInt(temp[1], 10));
					}
				}
            }
			cacheLen = cache.length;
			while(cacheLen--) {
				sum += cache[cacheLen];
			}			
			var ceil = Math.ceil(sum/10) ;            
            return (ceil*10 - sum) ==  lastnumber;
		}
	},
	
	mobile: {
		test: function(str){
			var v=(str||'').split(' ').join('');
			return /^1\d{10}$/i.test(v);
		}
	},
	
	idcard: {
		test: function(num) {	

			num = num.toUpperCase();  				
			//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
			if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) { 
				return false; 
			}
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
			//下面分别分析出生日期和校验位 
			var len, re; 
			len = num.length; 
			if (len == 15) {
				
				re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/); 
				var arrSplit = num.match(re); 

				//检查生日日期是否正确 
				var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]); 
				var bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])); 
				
				if (!bGoodDay) { 
					return false; 
				} else {				
					return 1;
				}   
			}
			
			if (len == 18) {
				
				re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/); 
				var arrSplit = num.match(re); 

				//检查生日日期是否正确 
				var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]); 
				var bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])); 

				if (!bGoodDay) { 
					return false; 
				} else { 
					//检验18位身份证的校验码是否正确。 
					//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
					var valnum; 
					var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
					var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
					var nTemp = 0, i; 
					for(i = 0; i < 17; i ++) { 
						nTemp += num.substr(i, 1) * arrInt[i]; 
					} 
					
					valnum = arrCh[nTemp % 11];
					if (valnum != num.substr(17, 1)) { 
						return false; 
					} 
					
					return 1; 
				} 
			}
			
			return false; 
		}
	}
};

// locale
QNR.locale=function(){

	var tips={
		vcode: {
			tip: "请输入您收到的验证码",
			error: "您输入的验证码错误",
			sendFail: "短信发送失败，请重试",
			max: "",
			require: "请输入验证码",
			limit: "当日获取验证码到限",
			frequent: "发送过于频繁"
		},
		
		mobile: {
			tip: "请输入您的手机号",
			error: "请输入正确的手机号",
			require: "请输入您的手机号"
		},
		
		certtype: {
			tip: "如您的银行卡是凭身份证开户，请选择身份证"
		},
		
		certno: {
			tip: "证件号是个人账户唯一凭证，请您仔细填写",
			error: "请输入正确证件号码",
			require: "请输入正确证件号码"
		},
		
		securepwd: {
			tip: "6-16个字符，必须为字母、数字或符号的组合",
			error: "6-16个字符，必须为字母、数字或符号的组合",
			require: "请输入交易密码",
			repeat: "交易密码不能与登录密码相同"
		},
		
		oldpwd: {
			tip: "请输入您现用的密码",
			error: "您输入的交易密码格式有误",
			require: "请输入您现用的密码"
		},
		
		password: {
			tip: "请输入您的交易密码",
			require: "请填写交易密码",
			error: "交易密码错误，请重试！",
			limit: "密码错误，您还有1次机会！",
			locked: '密码错误已4次，为了账户安全，暂时锁定1小时。如需立即解锁，<a js-action="reset-password" href="javascript:QNR.resetPassword();void(0);">请点此找回密码</a>',
			_locked: '密码错误已4次，为了账户安全，暂时锁定1小时。'
		},
		
		repeatpwd: {
			tip:"请重复上面的交易密码",
			error: "两次密码输入不同",
			require: "请输入确认密码"
		},
		
		newpwdcheck: {
			error: "请检查页面上所有选项是否正确填写，并且已阅读并同意《去哪儿网个人账户服务协议》",
			fail: "创建交易密码失败, 请重试"
		},
		
		refund: {
			wrongformat: "您输入的金额格式有误, 请检查并重新输入",
			limit: "您输入的金额大于当前可退的最大金额",
			zero: "对不起, 退还金额不能为0",
			empty: "请输入您要退还的金额"
		},
		
		reset: {
			error: {
				"1":"系统异常",
				"2":"参数错误",
				"3":"当日找回交易密码次数超限，请您隔日再试",
				"4":"新交易密码与登录密码一致",
				"5":"验证码已过期"
			}
		},
		
		updatepwd: {
			"NEWPWDERROR": "新交易密码错误",
			"NEWPWD2ERROR":	"新交易密码重复输入错误",
			"NEWPWDSAMEERROR":"新交易密码与登录密码一致",
			"LOCK":	"交易密码已锁定！",
			"FORBIDMODIFY":	"当日修改交易密码次数超限，请您隔日再试",
			"SUCCESS": "交易密码修改成功",
			"FAIL": "交易密码修改失败",
			repeat: '您设置的新密码与原密码一致'
		},

		cashamount :{
			error: "您输入的金额格式错误，小数最多两位",
			tip:"请输入提现金额"
		},

		cardname :{
			tip : "请输入持卡人姓名",
			error: "您输入的姓名有误"
		},

		cardnum :{
			tip : "请正确填写卡号",
			error: "您输入的卡号有误"
		}

	};

	return {
		tips: tips
	};

}();

// 倒计时
QNR.timeCount = function(t,o,timeout){
	this.o = o;
	this.t = t;
	this.timeout=timeout||function(){};
	this._init();
}
QNR.timeCount.prototype = {
	_init : function(){
		var _self = this;
        _self.count();
	},
	dealTime : function(t){
		return t >= 0;
	},
	formatTime : function(t){
        $.each(t,function(name,val){
            t[name] = val < 10 ? "0"+val : val;
        });
        return t;
	},
    count : function(){
        var _self = this;
        var dur = {};
        var t = _self.t;
        
        if(t<=0){
			t=0;
        }
        
        var timeout = 1000;
        var mins = 60000;
        var secs = 1000;
        if(_self.dealTime(t)){
            dur.mm =  Math.floor(t/mins);
            dur.ss = Math.floor((t-dur.mm*mins)/secs);
            
            _self.show(_self.formatTime(dur));
            
            if(t){
				setTimeout(function(){
					_self.count();
				},timeout);
				_self.t = t - timeout;
			}else{
				this.timeout();
			}
        }
    },
    show : function(dur){
    	var o =this.o;
    	o.min.html(dur.mm);
    	o.sec.html(dur.ss);
    }
};

// dialog
(function(){

	var _eve=$("<div></div>");

	QNR.dialog=function(args){
	
		if(typeof args=="string"){
			args={message:"string"};
		}
	
		this.config=$.extend({
			mask: false,
			buttons: [{
					name: "确定",
					event: "ok"
				}],
			title: false,
			message: "",
			closeButton: true,
			className: "",
			template: ''
		},args);
		
		this.init();
		
		this.render();
		
		this.bindEvents();
	};
	
	var hidemask=function(){};
	
	var mask=function(){
		var _m=$("<div></div>");
		_m.hide().appendTo(document.body);
		_m.css({'position':'absolute', 'z-index':'3000', 'opacity':0.5, 'top':0, 'left':0, 'width':"100%", 'background':'#CCC'});
		
		mask=function(){
			var height = $(window).height()>$(document.body).height()?$(window).height():$(document.body).height() + 'px';
			var width = $(window).width() + 'px';
			_m.css({'height':height}).show();
		};
		
		hidemask=function(){
			_m.hide();
		}
		
		mask();
	}
	
	
	QNR.htmlDialog=function(str,args){
		this.config=$.extend({
			mask: true
		},args);
		
		this.init(str);
	}
	
	var _common={
		remove: function(){
			this.dom.remove();
		},
		
		xy: function(left,top){
			if(typeof left=="object"){
				var top=left.top;
				left=left.left;
			}
			
			this.dom.css("left",left+"px");
			this.dom.css("top", top+"px" );
		},
		
		append: function(){
			this.body.append(this.dom);
			
			this.append=function(){
				this.dom.show();
			}
			
			this.append();
			
			_eve.bind("dialog-show",$.proxy(function(e,data){
				
				if(this!=data){
					this.dom.hide();
				}
				
			},this));
		},
		
		show: function(){
			
			if(this.config.mask){
				mask();
			}
			
			var self=this;
			
			this.xy(-10000,-10000);
			this.append();
			
			setTimeout(function(){
				self.update();
			},1);
			
			_eve.trigger("dialog-show",[this]);
		},
		
		update: function(){
			var _h=parseInt(this.dom.css("height"));
			var _w=parseInt(this.dom.css("width"));
			
			var cdh = document.documentElement.clientHeight;
			var cbh = document.body.clientHeight;
			
			var _ch=cdh>cbh&&cbh>0?cbh:(cbh>cdh&&cdh>0?cdh:(cbh||cdh));
			
			//var _bw = $(window).width();
			
			var st=(document.body.scrollTop||document.documentElement.scrollTop);
			
			var t=parseInt((_ch-_h)/2)+st;
			var l="50%";
			//parseInt((_bw-_w)/2);
			
			if(t<0){
				t=0;
			}else{
				t=t+"px";
			}
			
			this.dom.css({'left':l,'top':t,'margin-left':-parseInt(_w/2)+"px"});
		},
		
		hide: function(){
			this.dom.hide();
			
			if(this.config.mask){
				hidemask();
			}
		},
		
		trigger: function(eve,v){
			this.eve.trigger(eve,v);
			return this;
		},
		
		bind: function(eve,func){
			this.eve.bind(eve,func);
			return this;
		}
	};
	
	$.extend(QNR.htmlDialog.prototype,_common, {
		init: function(str){
			this.body=$(document.body);
			this.eve=$('<div></div>');
			
			this.dom=$(str);
			
			this.dom.css({"position":"absolute","z-index":3001,"overflow":"hidden"});
			
			this.bindEvents();
		},
		
		bindEvents: function(){
			var self=this;
			this.dom.find("[js-dialog-action]").bind("click",function(){
				var v=$(this);
				
				var act=v.attr("js-dialog-action");
				
				self.trigger(act);
			});
		}
	});
	
	$.extend(QNR.dialog.prototype,_common,{
		init: function(){
			this.body=$(document.body);
			this.eve=$('<div></div>');
			
			if(this.buttons instanceof Array){
				for( var i=0, bitem; i<this.buttons.length; i++){
					bitem=this.buttons[i];
					
					if(!bitem.name){
						bitem.name="确定";
					}
					
					if(!bitem.event){
						bitem.event="button"+i;
					}
				}
			}else if(typeof this.buttons == "object"){
				var bs=[];
				
				for( var method in this.buttons ){
					bs.push({name:this.buttons[method],event:method});
				}
				
				this.buttons=bs;
			}
		},
		
		render: function(){
		},
		
		bindEvents: function(){
		}
	});
})();