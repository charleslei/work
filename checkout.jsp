<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <title>支付</title>
    <script type="text/javascript">
    if(typeof QNR=="undefined"){ QNR={}; }; QNR.PayInfo={userid:"${userId}"};
    </script>
    <link href='/static/payment/prd/styles/u-pay-<%@include file='/include/.ver'%>.css' rel='stylesheet' type='text/css'/>
    <link href="${loginCss}" rel="stylesheet" type="text/css"/>
    <title>支付</title>
    <!--[if IE 6]>
    <script type="text/javascript" src="/static/js/compatibilityUtils/build/DD_belatedPNG-min.js"></script>
    <script type="text/javascript">
      DD_belatedPNG.fix('.png24');
    </script>
    <![endif]-->
  </head>
  <body>
  <form id="reload-form" action ="${cashierPayUrl}" method="post">
  	<input name="busiTypeId" type="hidden" value="${busiTypeId}"/>
	<input name="merchantCode" type="hidden" value="${merchantCode}"/>
	<input name="orderNo" type="hidden" value="${orderNo}"/>
	<input name="orderDate" type="hidden" value="${orderDate}"/>
	<input name="sourceReq" type="hidden" value="RELOAD"/>
	<input name="HMAC" type="hidden" value="${HMAC}"/>
	<input name="UHMAC" value="${UHMAC}" class="hide" js-submit>
	<input name="submitBtn" type="submit" class="hide"/>
  </form>
    <div class="xs_wrap">
      <div class="xs_header">
        <div class="login">
          <p class="welcome"><span>去哪儿网客服电话：<strong>10101234</strong></span><span class='server_icon'></span><span>7x24服务</span></p>
          <c:if test="${not empty userId}">
          	<p class="right_link" id="js_Login">${userName}，您好！</p>
          </c:if>
          <c:if test="${empty userId}">
          	<p class="right_link" id="js_Login"><a href="javascript:;" id="login" alt="登录">登录</a> | <a href="javascript:;" id="regist" alt="注册">注册</a></p>
          </c:if>
        </div>
      </div>
    </div>
  	<input id="oldtime" value="${oldtime}" class="hide" type="hidden">
  	<input id="newtime" value="${newtime}" class="hide" type="hidden">
  	<input id="validtime" value="${validtime}" class="hide" type="hidden">
    <div class="q_page_container">
      <div class="q_page_wrap">
        <div class="q_page">
          <div class="b_header">
            <div class="header_inner">
              <div class="e_header_logo png24"></div>
              <span class="e_header_title">支付</span>
            </div>
          </div>
          <!--选择银行支付-->
          <div class="b_payfor_content">
            <div class="b_hd_mod">
              <div class="e_notice_content notice_state_success">
                <div class="notice_icon icon_state_success"></div>
                <div class="notice_txt bd">
                  <div class="order_name clrfix">
                    <h3 class="order_name_pri">北京北大博雅国际酒店</h3>
                    <div class="sub_name">
                      <span class="subt"><em class="subt1"></em><em class="subt2 dash_border_a" id="information_ctl">退订说明</em></span>
                      <div id="information_ctn">
                        <div class="lg_explain_arrow"><span class="bottom1"></span></div>
                        <div class="ctn">
                          <h3>担保提示</h3>
                          <ul>
                            <li>夜间及节假日预订，商家与酒店确认房间时间较长，您可以在此之前直接担保；</li>
                            <li>担保成功后，一旦确认有房，担保金额将直接抵扣房费；</li>
                            <li>如确认无房，担保自动撤销；</li>
                            <li>其他时间预订，确认时间一般需要20分钟，您可直接担保或等待商家确认有房后支付。</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="order_sub_name">房型：高级大床房- Queen Bed 限时优惠(Superior Queen Limited Time OFFer)</div>

                  <table cellpadding="0" cellspacing="0" width="100%" height="100%" class="order_sub_name_details">
                    <tbody>
                      <tr>
                        <td>床型：大床</td>
                        <td>房间数：8间</td>
                        <td>入住日期：2013年01年30日</td>
                        <td>离店日期：2013年02月01日</td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="pay_count_detail" id="pay_count_detail"><span>支付</span><span class="sum_num"> <b>0.01</b></span><span>元</span></div>

                  <div class="detail_more">
                    <div class="detail_more_ctl"><a href="#" class="show"><span class="desc">订单详情</span><span class="down_1"></span></a></div>
                    <div class="detail_more_ctn hide">
                      <table cellpadding="0" cellspacing="0" width="100%" height="100%">
                        <tbody>
                          <tr>
                            <td class="detail_more_ctn_left">
                              <div id="detail_more_ctn_box"></div>
                            </td>
                            <td class="detail_more_ctn_right"><div class="pay_count"><span>支付</span><span class="sum_num"> <b>0.01</b></span><span>元</span></div></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="b_main_pay">
              <div class="b_pay_tab">
                <!--网银支付的tabn内容区-->
                <div class="b_tab_ui">
                  <div class="e_tab_trigger">
                    <div class="tab_nav">
                      <c:if test="${isCanUseNoCardGW=='true' ||  not empty creditBankList}"><a class="trigger_item trigger_item_current js-tab">信用卡</a></c:if>
                      <c:if test="${not empty debitBankList}"><a class="trigger_item">储蓄卡</a></c:if>
                      <c:if test="${not empty platBankList}"><a class="trigger_item">支付平台</a></c:if>
                    </div>
                    <div class="popup_tips_wrap">
                      <div class="b_popup_tips">
                        <div class="tips_contair">
                          <div class="tips_content">
                            <p>请及时完成付款，否则订单将被取消<span class="countdown_l">支付订单剩余时间：</span><span id="timeCount" class="countdown_r"></span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <c:if test="${isCanUseNoCardGW=='true' ||  not empty creditBankList}">
                  <!--信用卡支付 开始-->
                  <div class="e_tab_content js-typepanel" data-type="quickpay">
                    <div class="tab_content_inner tab_content_inner1">
                      <div class="b_pinfo_form">
                        <c:if test="${isCanUseNoCardGW=='true'}">
                        <form name="quickpayform" class='quickpayform' id="quickpayform" action="${usuallyCardpayUrl}" method="post" target="_blank">
                          <input name="busiTypeId" value="${busiTypeId}" class="hide" js-submit>
                          <input name="merchantCode" value="${merchantCode}" class="hide" js-submit>
                          <input name="orderNo" value="${orderNo}" class="hide" js-submit>
                          <input name="orderDate" value="${orderDate}" class="hide" js-submit>
                          <input name="HMAC" value="${HMAC}" class="hide" js-submit>
                          <!-- bind card container-->

                          <c:if test="${not empty allBindCard}">
	                          <div class="b_card_list b_validate_box b_write_card" id="bindcardsCon">
	                              <ul class='bindcard_list'>
	                                <!-- 注：风控写入data-ctl属性 -->
	                                <c:forEach items="${allBindCard}" var="vo" varStatus="vs">
		                                <li class="js-choose-item <c:if test="${vs.index=='0'}">highlight current</c:if>  <c:if test="${vs.index>'2'}">hide</c:if> "><div class="e_card_type clrfix"><div class="common_card"></div>
		                                  <div class="info_card js-choose-card" data-ctl='${vo.inputItem}'>
		                                    <input type="radio"  name="cardId" data-id="${vo.cardlibrary.id}" value="${vo.cardlibrary.id}"  bankCode="${vo.bankCode}" tppCode="${vo.tppCode}" channel="${vo.channel}" isDirect="${vo.isDirect}" mobile="${vo.mobile}" inputItemHMAC="${vo.inputItemHMAC}" class="radio_box" <c:if test="${vs.index=='0'}"> checked </c:if> >
		                                    <label class="banklogo_box" for="">
		                                      <span class="bank_name js-bank-icon" data-url="${vo.picUrl}" style="background-position:0 0;"></span>
		                                      <span class="bankcard_info">信用卡 <span class="encryption">**</span><em class="last_num"><c:if test="${fn:length(vo.cardlibrary.cardNo) > 4}">${fn:substring(vo.cardlibrary.cardNo, fn:length(vo.cardlibrary.cardNo)-4, -1)}</c:if></em></span>
		                                    </label>
		                                  </div>
		                                  <div class="table-box">
		                                    <table class="info hide">
		                                    <tr>
		                                      <th>单笔限额（元）</th>
		                                      <th>单日限额（元）</th>
		                                    </tr>
		                                    <tr>
		                                   	  <td class='min'>小于${vo.maxAmout}元</td>
		                                      <td class='minDay'>小于${vo.maxDayAmout}元</td>
		                                    </tr>
		                                    </table>
		                                  </div>
		                                </li>
	                                </c:forEach>
	                               
	                              </ul>
	
	                            <div class="e_write_inner">
	                              <input name="pmCode" value="QCARD" type="hidden">
                                  <!-- info  -->
                                  <div class="e_card_picwrap hide" ><div class="card_pic"><div class="img"></div></div></div>
                                  <!-- info end -->
	                              <div class="e_bank_all clrfix">
	                                <div class="info_card clrfix">
	                                  <div class="chose_card chose_all_card" id="dvchoose"><a id="choosebank" href="javascript:void(0);" class="choosebank"><span class="hl"></span><span>使用其他信用卡</span></a></div>
	                                  <c:if test="${fn:length(allBindCard) > 3 }">
	                                  <div class="all_blind_bank chose_card"><a href="javascript:;" id="showAllBindBank" class='show'><span>全部展开</span><span class="down"></span></a></div>
	                                  </c:if>
	                                </div>
	                              </div>
	
	                              <table cellpadding="0" cellspacing="0" width="100%" class="ftable">
	                                <tr class="js_credit_tr hide" id="cardholder">
	                                  <td class="c1">姓名</td>
	                                  <td>
	                                    <div class="ops_cardnum">
	                                      <div class="set input"><input type="text" name="cardholder" data-jvalidator-pattern="not_empty & cardholder" class="grey_txt txtbox" placeholder="输入姓名需与注册银行卡相同" value=""></div>
	                                      <div class="set popup_tips_wrap js_tipcontainer"></div>
	                                    </div>
	                                  </td>
	                                </tr>
	                                <tr class="js_credit_tr hide" id="identityCode">
	                                  <td class="c1">身份证</td>
	                                  <td>
	                                    <div class="ops_cardnum">
	                                      <div class="set input"><input type="text" name="identityCode" data-jvalidator-pattern="not_empty & idcard" class="grey_txt txtbox" placeholder="请输入与银行卡绑定的证件号" value=""></div>
	                                      <div class="set popup_tips_wrap js_tipcontainer"></div>
	                                    </div>
	                                  </td>
	                                </tr>
	                                <tr class="js_credit_tr hide" id="validate">
	                                  <td class="c1">有效期</td>
	                                  <td><div class="ops_date">
	                                      <div class="csparest csparest_province"><select data-jvalidator-pattern="not_empty" id="expires_month" class='expires_month' name="month"><option value="请选择月份">请选择月份</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div>
	                                      <div class='date_middle'></div>
	                                      <div class="csparest csparest_province"><select data-jvalidator-pattern="not_empty" id="expires_year" class='expires_year' name="year"></select></div>
	                                    </div>
	                                    <div class="set popup_tips_wrap js_tipcontainer" style="display:none"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em><em class="icon_tips iright"></em><em class="txt_tips"></em></span></div>
	                                  </td>
	                                </tr>
	                                <tr class="js_credit_tr hide" id="cvv">
	                                  <td class="c1">卡背面三位数</td>
	                                  <td>
	                                    <div class="ops_cardback">
	                                      <div class="set input"><input name="cvv" id="credit_cardbacknum" data-jvalidator-pattern="not_empty & creditcardcvv" type="text" class="txtbox" placeholder="请输入信用卡背面的末三位数字" maxlength="3"></div>
	                                      <div class="set popup_tips_wrap js_tipcontainer"></div>
	                                    </div>
	                                  </td>
	                                </tr>
	                                <tr class="js_credit_tr hide" id="mobile">
	                                  <td class="c1">手机号</td>
	                                  <td>
	                                    <div id="mobile-number">
	                                      <div class="set input"><input type="text" readonly placeholder="请输入银行预留手机号" value="" class="txtbox"  id="mobile" name="mobile" maxlength="13"></div>
	                                      <div class="set popup_tips_wrap js_tipcontainer"></div>
	                                    </div>
	                                  </td>
	                                </tr>
	                                <tr class="js_credit_tr hide" id="vCode">
	                                  <td class="c1">短信验证码</td>
	                                  <td>
	                                    <div class="ops_icode">
	                                      <div class="set input"><input id="vCode" type="text" class="txtbox" value="" name="vCode" data-jvalidator-pattern="not_empty & vcode" placeholder="请输入验证码" js-submit maxlength="6"></div>
	                                      <a placeholder="get-permit" class="btn" href="javascript:void(0);" js-reset-class="get_code" js-sent-class="btn_grey"><em>免费获取</em></a>
	                                      <div class="set popup_tips_wrap js_tipcontainer"  placeholder="get-permit-error" name="vCode"></div>
	                                    </div>
	                                  </td>
	                                </tr>
	                              </table>
	                            </div>
	                          </div>
                          </c:if>

                          <!--bind card container-->

                          <!-- all cards container-->
                          <div class="b_validate_box b_write_card hide" id='allcardsCon'>
                            <div class="e_write_inner">
                              <input name="pmCode" value="NOCARD" type="hidden">
                              <!-- info  -->
                              <div class="e_card_picwrap hide" ><div class="card_pic"><div class="img"></div></div></div>                              
                              <div class="credit-info-wrap"><div class="credit-info"></div></div>
                              <!-- info end -->
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tr class="js_credit_tr">
                                  <td class="c1 c2">信用卡卡号</td>
                                  <td>
                                    <div class="ops_cardnum">
                                      <div class="set input"><input type="text" name="cardId" id="credit_cardnum" data-jvalidator-pattern="not_empty & creditcardno" class="grey_txt txtbox txtbox1" placeholder="只输入卡号，自动匹配银行" maxlength="30"></div>
                                      <div class="set popup_tips_wrap js_tipcontainer" style="display:none"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em><em class="icon_tips imsg"></em><em class="icon_tips iright"></em><em class="txt_tips"></em></span></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr class="credit-bank">
                                  <td class="c1"></td>
                                  <td><div class="credit-bank-wrap"></div></td>
                                </tr>
                                <tr class="js_credit_tr">
                                  <td class="c1">姓名</td>
                                  <td>
                                    <div class="ops_cardnum">
                                      <div class="set input"><input type="text" name="cardholder" data-jvalidator-pattern="not_empty & cardholder" class="grey_txt txtbox" placeholder="输入姓名需与注册银行卡相同" value=""></div>
                                      <div class="set popup_tips_wrap js_tipcontainer"></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr class="js_credit_tr">
                                  <td class="c1">身份证</td>
                                  <td>
                                    <div class="ops_cardnum">
                                      <div class="set input"><input type="text" name="identityCode" data-jvalidator-pattern="not_empty & idcard" class="grey_txt txtbox" placeholder="请输入与银行卡绑定的证件号" value=""></div>
                                      <div class="set popup_tips_wrap js_tipcontainer"></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr class="js_credit_tr">
                                  <td class="c1">有效期</td>
                                  <td><div class="ops_date">
                                      <div class="csparest csparest_province"><select data-jvalidator-pattern="not_empty" id="expires_month" class='expires_month' name="month"><option value="请选择月份">请选择月份</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div>
                                      <div class='date_middle'></div>
                                      <div class="csparest csparest_province"><select data-jvalidator-pattern="not_empty" id="expires_year" class='expires_year' name="year"></select></div>
                                    </div>
                                    <div class="set popup_tips_wrap js_tipcontainer" style="display:none"><span class="icon_tips_wrap"><em class="icon_tips iwrong"></em><em class="icon_tips iright"></em><em class="txt_tips"></em></span></div>
                                  </td>
                                </tr>
                                <tr class="js_credit_tr">
                                  <td class="c1">卡背面三位数</td>
                                  <td>
                                    <div class="ops_cardback">
                                      <div class="set input"><input name="cvv" id="credit_cardbacknum" data-jvalidator-pattern="not_empty & creditcardcvv" type="text" class="txtbox" placeholder="请输入信用卡背面的末三位数字" maxlength="3" value=""></div>
                                      <div class="set popup_tips_wrap js_tipcontainer"></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="c1">银行预留手机号</td>
                                  <td>
                                    <div class="ops_mobile">
                                      <div class="set input"><input type="text" placeholder="请输入手机号" class="txtbox" data-jvalidator-pattern="not_empty & mobile" id="mobile" name="mobile" maxlength="13" value=""></div>
                                      <div class="set popup_tips_wrap js_tipcontainer"></div>
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                  <td class="c1">短信验证码</td>
                                  <td>
                                    <div class="ops_icode">
                                     <div class="set input"><input type="text" name="vCode" id="validcode" class="txtbox" data-jvalidator-pattern="not_empty & vcode" placeholder="请输入验证码" maxlength="6"></div>
                                      <a placeholder="get-permit" class="btn" href="javascript:void(0);" js-reset-class="get_code" js-sent-class="btn_grey"><em>免费获取</em></a>
                                      <span placeholder="get-permit-message" class="yzm_tip"><span class="icon_correct2"></span>验证码已发送，请查收！</span>
                                      <div class="set popup_tips_wrap js_tipcontainer" placeholder="get-permit-error"></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr >
                                  <td class="c1"></td>
                                  <td><label><input type="checkbox" name="isBind" checked value="1" class="radio_box"><span>同意使用常用卡支付，下次支付更快捷</span></label><br/><a href="/payServer/commonCardAgree.jsp" target="blank" class="protoInfo">《去哪儿网常用卡支付协议》</a></td>
                                </tr>
                              </table>
                            </div>
                          </div>
                          <!-- all cards container end-->

                          <div class="e_ops_button">
                            <button class="btn_large_submit" id="btnSubmit" type="button">同意协议并付款</button>
                          </div>


                        </form>
						</c:if>
                        <c:if test="${not empty creditBankList}"><div class='to_bank'><a id='show_creditcard_online' class='dash_border_a' href='javascript:;' >信用卡网上银行</a> <span>跳转至银行页面完成付款</span></div></c:if>


                      </div>
                    </div>
                  </div>
                  <!--信用卡支付 结束-->
				  </c:if>
                  <!-- 信用卡网上银行列表 -->
                  <div id='creditCardListCtn' class='hide'>
                    <form name="creditpayform" class="quickpayform" id="creditpayform" action="${netbankPayUrl}" method="post" target="_blank">
                     
                      <table>
                        <tr>
                          <td class="left_ctn"><div class="title">信用卡网银支付</div></td>
                          <td><span>跳转至银行页面完成支付</span></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <ul class="inline">
                              <c:forEach items="${creditBankList}" var="b" varStatus="vs">
	                                <li class="e_open_ibank"><input pmcode="${b.pmCode}" <c:if test="${vs.index=='0'}"> checked </c:if> type='radio' name='bankCode' id='${b.bankCode}' value='${b.bankCode}' class='radio_box'><label class="bank_logo_box"><span class="bank_logo"><img title="${b.bankName}" src="${b.picUrl}" /></span><span class="bank_name_txt"></span></label></li>
                              </c:forEach>
                             </ul>
                          </td>
                        </tr>
                      </table>
                      <div class="e_ops_button e_ops_button1 clrfix"><button class="btn_submit" id="btnCreditSubmit_next" type="button">下一步</button><span>跳转至银行页面完成付款</span></div>
                    </form>
                  </div>
                  <c:if test="${not empty debitBankList}">
                  <!--储蓄卡支付 开始-->
                  <div class="e_tab_content js-typepanel hide" data-type="">
                    <div class="tab_content_inner">
                      <div class='b_bank_list debit_card' id='debit_card'>
                        <form name="debitpayform" class='quickpayform' id="debitpayform" action="${netbankPayUrl}" method="post" target="_blank">
                          <table>
                            <tr>
                              <td class='left_ctn'><div class='title'>储蓄卡网银支付</div></td>
                              <td><span>需开通网银<c:if test="${isCanUseNoCardGW=='true' ||  not empty creditBankList}">，如未开通请选择<a href='#' class='dash_border_a' id='payByCreditCard'>信用卡支付</a></c:if></span></td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>
                                <ul id="allcards" class="inline">
                                 <c:forEach items="${debitBankList}" var="b" varStatus="vs">
	                                 <li class="e_open_ibank <c:if test="${vs.index>'7'}">hide</c:if>" >
	                                  <input pmcode="${b.pmCode}" type="radio" name="bankCode" id=${b.bankCode} value="${b.bankCode}" class="radio_box" <c:if test="${vs.index=='0'}"> checked </c:if> >
	                                  <label class="bank_logo_box"><span class="bank_logo"><img title=${b.bankName} src="${b.picUrl}"></span><span class="bank_name_txt"></span></label>
	                                  </li>
                              	  </c:forEach>
                                </ul>
                              </td>
                            </tr>
                            <c:if test="${fn:length(debitBankList) > 8 }">
	                            <tr>
	                              <td></td>
	                              <td style='padding-top:0'><div class='clrfix show_and_hide' id='show_and_hide'><a href='#' class='show'><span>展开更多银行</span><span class='down'></span></a></div></td>
	                            </tr>
                            </c:if>
                          </table>
                          <div class="e_ops_button e_ops_button1 clrfix"><button class="btn_submit" id="btnSubmitDebitCard_next" type="button">下一步</button><span>跳转至银行页面完成付款</span></div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <!--储蓄卡支付 结束-->
                  </c:if>
                  <c:if test="${not empty platBankList}">
                  <!--平台支付 开始-->
                  <div class="e_tab_content js-typepanel hide" data-type="">
                    <div class="tab_content_inner">
                      <div class='b_bank_list debit_card' id='platform'>
                        <form name="platpayform" class='quickpayform' id="platpayform" action="${netbankPayUrl}" method="post" target="_blank">
                          <table>
                            <tr>
                              <td class='left_ctn'><div class='title'>支付平台</div></td>
                              <td><span>跳转至平台页面完成付款</span></td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>
                                <ul class="inline">
                                	<c:forEach items="${platBankList}" var="b" varStatus="vs">
                                		 <li class="e_open_ibank">
                                  		 	<input pmcode="${b.pmCode}" type="radio" name="bankCode" id="${b.bankCode}" value="${b.bankCode}" class="radio_box" <c:if test="${vs.index=='0'}"> checked </c:if>>
                                  			<label class="bank_logo_box"><span class="bank_logo"><img title="${b.bankName}" src="${b.picUrl}"></span><span class="bank_name_txt"></span></label>
                                  		</li>
                                	</c:forEach>
                                </ul>
                              </td>
                            </tr>
                          </table>
                          <div class="e_ops_button e_ops_button1 clrfix"><button class="btn_submit" id="btnSubmitPlatform_next" type="button">下一步</button><span class='btn_desc'>跳转至平台页面完成付款</span></div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <!--平台支付 结束-->
                  </c:if>
                </div>
                <!--\网银支付的tabn内容区-->
                <!--底部的安全贴士-->
                <div class="b_safe_tips">
                  <p class="lead">安全贴士：</p>
                  <ul class="liststyle_disc">
                    <li>请您确认浏览器地址必须为https开头</li>
                    <li>您的账户信息请妥善保管并尽量避免在网吧等公共场所进行支付</li>
                  </ul>
                </div>
                <!--\底部的安全贴士-->
                <div class='pay-footer'>
	              <p>去哪儿网&nbsp;版权所有&nbsp;©&nbsp;京ICP备05021087号</p>
	            </div>
              </div>
            </div>
            <!--\选择银行支付-->
          </div>
        </div>
      </div>
    </div>
    <script type="text/javascript" src="/static/payment/prd/scripts/u-pay-<%@include file='/include/.ver'%>.js"></script>
    <script type="text/javascript"  src="${loginJs}" /></script>
    <script type="text/javascript">
      
         (function(){
         window._ba_utm_init = function(GA){ 
         window['_ba_utm_l'] = 'pay';
         window['_ba_utm_s'] = '922';
         window['_ba_utm_ex'] = {};
         };
    //-- load ga script
    var s = document.createElement('script');
    s.src = '/static/payment/prd/scripts/ga-<%@include file='/include/.ver'%>.js'; 
    var head = document.getElementsByTagName('head');
    if(head&&head[0]) { head[0].appendChild(s);}
    })();
       
    </script>
  </body>
</html>
