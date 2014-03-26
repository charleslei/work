jQuery.fn.consumeTable = function(){
    this.container = null;
    this.window = null;
    this.document = null;
    this.nodeName = "";
    this.textareaHTML = null;

    this.options = {
        onChange: function() { }
    };

    function getNodeName(element) {
        if (typeof (element.tagName) != 'undefined')
            return element.tagName.toLowerCase();
        else
            return element.nodeName.toLowerCase();
    };

    this.activEditMode = function() {
        this.container.designMode = 'On';
        this.container.contentEditable = true;
    };

    function deActivEditMode() {
        this.container.designMode = 'off';
        this.container.contentEditable = false;
    };

    this.initEditor = function(element) {
        this.nodeName = getNodeName(element);
        if (this.nodeName == 'textarea') {
            this.textareaHTML = element;
            element.richtextarea = this;

            var editor = document.createElement("div");
            $(editor).addClass('richtextarea-content');
            $(element).after(editor);

            $(editor).css('width',$(element).css('width'));
            $(editor).css('height',$(element).css('height'));


            //add table
            var tableCtn = document.createElement("div");
            $(tableCtn).addClass('richtextarea-table-ctn');
            var table = document.createElement("table");
            var thead = document.createElement("thead");
            var tbody = document.createElement("tbody");
            $(table).addClass('table table-bordered richtextarea-table');
            $(thead).addClass('richtextarea-table thead');
            $(tbody).addClass('richtextarea-table tbody');
            $(table).append($(thead));
            $(table).append($(tbody));
            $(tableCtn).append($(table));
            var tableCtn_em = document.createElement("em");
            $(tableCtn_em).addClass('richtextarea-table-ctn-em');
            $(tableCtn_em).hide();
            $(tableCtn_em).text('点击这里，进行编辑或粘帖');
            $(tableCtn).append($(tableCtn_em));
            $(tableCtn).hide();

            $(tableCtn).css('width',$(element).css('width'));
            $(tableCtn).css('height',$(element).css('height'));
            $(editor).after(tableCtn);

            element = editor;

            $(element).html($(this.textareaHTML).text());
            $(this.textareaHTML).hide();
        }

        element.richtextarea = this;

        this.container = element;
        this.window = window;
        this.document = window.document;

        this.activEditMode();
        //attachEvent();
        return this;
    };


    this.parseObj  = function (obj) {
        if(obj instanceof Array) {
           return $.toJSON(obj)
        }else{
          return '';
        }
    }

    this.parseTable = function() {
        var _content = $('.richtextarea-content');

        if(!_content.children().length) {
          return {res:false, errorMsg: '文本区域不能为空！'};
        }
        var _contentTable = $('.richtextarea-content table');
        if(!_contentTable.length){
          return {res:false, errorMsg: '请拷贝表格并粘贴到文本框！'};
        }
        var maxRowCount = this.revertTable();
        this.mergeRow(maxRowCount);

        var values = $('.richtextarea-content table tr');
        if (values.length < 3) {
          return {res:false,errorMsg: '数据不得少于 3 行'};
        }

        // 合并行
        var nodes = $(values[0]).children(), rows = [], colHeaders = [];

        if(nodes.length > 1) {
            for(var j=0,len2=nodes.length;j<len2;j++) {
                if ($(nodes[j]).text().replace(/(^\s*)|(\s*$)/g, "") != '') {
                    colHeaders.push(j);
                }
            }
        }else{
            return {res:false,errorMsg: '数据不得少于 2 列'};
        }

        for(var i=0,len=values.length; i<len; i++) {
            cols = [];
            var text = $(values[i]).text();
            text = text ? text.replace(/(^\s*)|(\s*$)/g,"") : text;

            if(text ==null || text == '') continue;

            var nodes = $(values[i]).children();
            subRowCount = nodes.length;
            //每行比标题行的列数多的列，略过
            for(var j=0,len1=colHeaders.length;j<len1;j++) {
                var temp = $(nodes[colHeaders[j]]).text().replace(/(^\s*)|(\s*$)/g,"");
                //temp = temp || '-';
                cols.push(temp);
            }
            rows.push(cols);
        }
        rows = this.mergeSameCols(rows);
        return {res: true, rows: rows};
    }

    this.mergeSameCols = function(data) {
        var firstR = data[0], tempObj ={},colUnique = [], sameColCount = 1;
        //获取相同的列及其出现的次数
        var i = 0, len=firstR.length;
        for(;i<len;i++) {
            if(typeof tempObj[firstR[i]]  == 'undefined'){
                tempObj[firstR[i]] = [i];
                colUnique.push(firstR[i]);
            }else{
                tempObj[firstR[i]].push(i);
            }
        }

        //判断相同的列，数量是否相同
        var hasSameCols = 1, firstProp;
        for(var item in tempObj) {
            if(tempObj.hasOwnProperty(item)){
                firstProp = firstProp || item;
                sameColCount = tempObj[firstProp].length;
                hasSameCols &= sameColCount == tempObj[item].length ? true :false;
            }
        }

        //如果相同，进行列的拆分
        if(hasSameCols) {
            var newData = [],i =0,len=data.length, len1 = colUnique.length;
            for(;i<len;i++) {
                var k = 0;
                for(;k<sameColCount;k++) {
                    if(i==0 && k<sameColCount-1) continue;
                    var row = [], j =0;
                    for(;j<len1;j++) {
                        row.push(data[i][tempObj[colUnique[j]][k]]);
                    }
                    //略过空行
                    if(row.join('') != '')
                        newData.push(row);
                }
            }
            data = newData;
        }
        return data;
    }

    this.mergeRow = function(count){
        var tds = $('.richtextarea-content tr');
        if(count<2) return;
        $('td', tds[0]).each(function(tdindex, tditem){
            var i = count-1, parent = $($(tditem).parent('tr')[0]), finalText = '', firstRow = true;
            while(i--){
                var currentText = $(parent.children('td')[tdindex]).text(), nextText = $(parent.next().children('td')[tdindex]).text();
                if (firstRow){
                  finalText = currentText;
                  firstRow = false;
                }
                if(currentText !== nextText) {
                    finalText += '-' + nextText;
                }
                var preparent = parent;
                parent = parent.next();
            }
            $(tditem).text(finalText);
        });
        $(tds).each(function(tdindex, tditem){
            if(tdindex>0 && tdindex<count){
              $(tditem).remove();
            }else if (tdindex > count){
              return false;
            }
        })
    }

    this.revertTable = function(){
        var content = this.next('.richtextarea-content');
        var maxRowspanCount = 0, firstRow = true;
        $("tr",content).each(function(trindex,tritem){
            var cols = 0;
            $(tritem).find("td").each(function(tdindex,tditem){
                var rowspanCount = $(tditem).attr("rowspan"), colspanCount=$(tditem).attr("colspan"), value=$(tditem).text(), newtd="<td>"+value+"</td>";
                maxRowspanCount =  trindex == 0 && (+maxRowspanCount) < (+rowspanCount) ? +rowspanCount : +maxRowspanCount;
                if(rowspanCount>1){
                    var parent=$(tditem).parent("tr")[0];
                    while(rowspanCount-->1){
                        $(newtd).insertBefore($($(parent).next().children()[tdindex + cols]));
                        parent=$(parent).next();
                    }
                    $(tditem).attr("rowspan",1);
                }
                if(colspanCount>1){
                    cols += colspanCount -1;
                    while(colspanCount-->1){
                        $(tditem).after(newtd);
                    }
                    $(tditem).attr("colspan",1);
                }
            });
        });
        return maxRowspanCount;
    }

    function attachEvent() {
        $(this.container).keydown(function(event) { return this.richtextarea.onKeyDown(event) });
        $(this.container).dblclick(function(event) { return this.richtextarea.onDblClick(event) });
        $(this.container).mouseup(function(event) { return this.richtextarea.onMouseUp(event) });
        $(this.container).keyup(function(event) { return this.richtextarea.onKeyUp(event) });
    };

    this.onMouseUp = function(e) {
        return true;
    };

    this.onDblClick = function(e) {
        return true;
    };

    this.onChange = function(e) {
        if (this.textareaHTML) {
            $(this.textareaHTML).html(this.HtmlEncode(this.container.innerHTML));
        }
        this.options.onChange(e);
        return true;
    };

    this.onKeyDown = function(e) {
        if (window.event) { // IE
            keyNum = e.keyCode;
        }
        else if (e.which) {// Netscape/Firefox/Opera
            keyNum = e.which;
            if (keyNum == 0)
                keyNum = e.keyCode;
        }

        if (keyNum == 13) {
            if ($.browser.msie) {
                this.insertHtml("<br/>", true);
                this.stopPropagation(e);

                this.onChange({ 'func': 'onKeyDown', 'event': e });
                return false;
            }
        }

        this.onChange({ 'func': 'onKeyDown', 'event': e });
        return true;
    };

    this.onKeyUp = function(e) {
        this.onChange({ 'func': 'onKeyUp', 'event': e });
    };

    this.HtmlEncode = function(text) {
        text = new String(text);

        text = text.replace(/&/g, "&amp;");
        text = text.replace(/"/g, "&quot;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");
        text = text.replace(/\'/g, '&#39;'); // 39 27
        return text;
    };

    this.HtmlDecode = function(text) {
        text = new String(text);

        text = text.replace(/&quot;/g, '"');
        text = text.replace(/&amp;/g, '&');
        text = text.replace(/&#39;/g, "'");
        text = text.replace(/&lt;/g, '<');
        text = text.replace(/&gt;/g, '>');
        return text;
    };
    return this.initEditor(this[0]);

}

!function(){

  var consumeTable = $("#data_area").consumeTable();

  $('.richtextarea-table-ctn').click(function(){
    $(this).hide();
    $('.richtextarea-content').show()
  }).mouseenter(function(){
    $(this).children('em').show();
    $('.richtextarea-table').addClass('richtextarea-over');

  }).mouseleave(function(){
    $(this).children('em').hide();
    $('.richtextarea-table').removeClass('richtextarea-over');
  })
  $('.data_preview').mouseleave(function() {
    var sel_head = ".richtextarea-table-ctn table thead",
    sel_body = ".richtextarea-table-ctn table tbody",
    sel_table = ".richtextarea-table-ctn";

    $(sel_head).empty();
    $(sel_body).empty();

    var content = $('.richtextarea-content');
    if(!content.children().length){
      $('.error_message').text('请在文本框中粘贴表格！');
      return;
    }
    var result = consumeTable.parseTable(),i = 0, len= 0;
    if(!result.res){
      //$('.error_message').text('您的数据我们无法解析，请参照下方的示范数据，修改您的数据');
      $('.error_message').text(result.errorMsg);
      return false;
    }
    $('.error_message').text('');
    var rows = result.rows;
    len = rows.length
    for (; i<len; i++) {
      var str = '<tr>',j=0,len2=rows[i].length;
      for (;j<len2; j++) {
        str += '<td>' + rows[i][j] + '</td>';
      }
      str += '</tr>';
      if(i==0) {
        $(sel_head).append(str);
      } else {
        $(sel_body).append(str);
      }
    }
    if(len) {
      $(sel_table).show();
      $('.richtextarea-content').hide()
      $('#data_upload').attr('disabled',false);
    } else {
      $(sel_table).hide();
      $('.richtextarea-content').show()
    }
  });

  $('#data_upload').click(function() {
    if($('#data_upload').attr('disabled') == 'disabled'){
        return false;
    }
    if(!is_login){
      login();
    } else {
      var result = consumeTable.parseTable();
      if(!result.res){
        alert('您的数据我们无法解析，请参照下方的示范数据，对您的数据进行修改');
        return false;
      }
      var rows = result.rows;
      sstr = consumeTable.parseObj(rows);
      if(typeof sstr === 'undefined' || sstr === '') {
        $('#data_upload').text('下一步');
        return false;
      }

      upload_data(sstr,function(){
        $('#data_panel').hide();
        $('.sample-data').hide();
        $("#geodatum_upload_info").show();
      },function() {        
        $('#data_upload').text('下一步');
      })
    }
  });
}();
