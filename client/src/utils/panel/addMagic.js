import * as jQuery from 'jquery'
import 'jquery-ui-dist/jquery-ui'

(function($) {
  $.widget("akottr.dragtable", {
    options: {
      revert: false,
      dragHandle: '.table-handle',
      maxMovingRows: 1,
      excludeFooter: false,
      onlyHeaderThreshold: 100,
      dragaccept: null,
      persistState: null,
      restoreState: null,
      exact: true,
      clickDelay: 1000,
      containment: null,
      cursor: 'pointer',
      cursorAt: false,
      distance: 0,
      tolerance: 'pointer',
      axis: 'x',
      beforeStart: $.noop,         
      beforeMoving: $.noop,
      beforeReorganize: $.noop,
      beforeStop: $.noop
    },
    originalTable: {
      el: null,
      selectedHandle: null,
      sortOrder: null,
      startIndex: 0,
      endIndex: 0
    },
    sortableTable: {
      el: $(),
      selectedHandle: $(),
      movingRow: $()
    },
    persistState: function() {
      var _this = this;
      this.originalTable.el.find('th').each(function(i) {
        if (this.id !== '') {
          _this.originalTable.sortOrder[this.id] = i;
        }
      });
      $.ajax({
        url: this.options.persistState,
        data: this.originalTable.sortOrder
      });
    },
    _restoreState: function(persistObj) {
      for (var n in persistObj) {
        this.originalTable.startIndex = $('#' + n).closest('th').prevAll().length + 1;
        this.originalTable.endIndex = parseInt(persistObj[n] + 1, 10);
        this._bubbleCols();
      }
    },
    _bubbleCols: function() {
      var i, j, col1, col2;
      var from = this.originalTable.startIndex;
      var to = this.originalTable.endIndex;
      var thtb = this.originalTable.el.children();
      if (this.options.excludeFooter) {
        thtb = thtb.not('tfoot');
      }
      if (from < to) {
        for (i = from; i < to; i++) {
          col1 = thtb.find('> tr > td:nth-child(' + i + ')')
            .add(thtb.find('> tr > th:nth-child(' + i + ')'));
          col2 = thtb.find('> tr > td:nth-child(' + (i + 1) + ')')
            .add(thtb.find('> tr > th:nth-child(' + (i + 1) + ')'));
          for (j = 0; j < col1.length; j++) {
            swapNodes(col1[j], col2[j]);
          }
        }
      } else {
        for (i = from; i > to; i--) {
          col1 = thtb.find('> tr > td:nth-child(' + i + ')')
            .add(thtb.find('> tr > th:nth-child(' + i + ')'));
          col2 = thtb.find('> tr > td:nth-child(' + (i - 1) + ')')
            .add(thtb.find('> tr > th:nth-child(' + (i - 1) + ')'));
          for (j = 0; j < col1.length; j++) {
            swapNodes(col1[j], col2[j]);
          }
        }
      }
    },
    _rearrangeTableBackroundProcessing: function() {
      var _this = this;
      return function() {
        _this._bubbleCols();
        _this.options.beforeStop(_this.originalTable);
        _this.sortableTable.el.remove();
        restoreTextSelection();
        if (_this.options.persistState !== null) {
          $.isFunction(_this.options.persistState) ? _this.options.persistState(_this.originalTable) : _this.persistState();
        }
      };
    },
    _rearrangeTable: function() {
      var _this = this;
      return function() {
        _this.originalTable.selectedHandle.removeClass('dragtable-handle-selected');
        _this.sortableTable.el.sortable("disable");
        _this.sortableTable.el.addClass('dragtable-disabled');
        _this.options.beforeReorganize(_this.originalTable, _this.sortableTable);
        _this.originalTable.endIndex = _this.sortableTable.movingRow.prevAll().length + 1;
        setTimeout(_this._rearrangeTableBackroundProcessing(), 50);
      };
    },
    _generateSortable: function(e) {
      !e.cancelBubble && (e.cancelBubble = true);
      var _this = this;
      var attrs = this.originalTable.el[0].attributes;
      var attrsString = '';
      for (var i = 0; i < attrs.length; i++) {
        if (attrs[i].nodeValue && attrs[i].nodeName !== 'id' && attrs[i].nodeName !== 'width') {
          attrsString += attrs[i].nodeName + '="' + attrs[i].nodeValue + '" ';
        }
      }
      var rowAttrsArr = [];
      var heightArr = [];
      this.originalTable.el.find('tr').slice(0, this.options.maxMovingRows).each(function(i, v) {
        var attrs = this.attributes;
        var attrsString = "";
        for (var j = 0; j < attrs.length; j++) {
          if (attrs[j].nodeValue && attrs[j].nodeName !== 'id') {
            attrsString += " " + attrs[j].nodeName + '="' + attrs[j].nodeValue + '"';
          }
        }
        rowAttrsArr.push(attrsString);
        heightArr.push($(this).height());
      });
      var widthArr = [];
      var totalWidth = 0;
      var thtb = _this.originalTable.el.children();
      if (this.options.excludeFooter) {
        thtb = thtb.not('tfoot');
      }
      thtb.find('> tr > th').each(function(i, v) {
        var w = $(this).outerWidth();
        widthArr.push(w);
        totalWidth += w;
      });
      if(_this.options.exact) {
          var difference = totalWidth - _this.originalTable.el.outerWidth();
          widthArr[0] -= difference;
      }
      totalWidth += 2

      var sortableHtml = '<ul class="dragtable-sortable" style="position:absolute; width:' + totalWidth + 'px;">';
      thtb.find('> tr > th').each(function(i, v) {
        sortableHtml += '<li>';
        sortableHtml += '<table ' + attrsString + '>';
        var row = thtb.find('> tr > th:nth-child(' + (i + 1) + ')');
        if (_this.options.maxMovingRows > 1) {
          row = row.add(thtb.find('> tr > td:nth-child(' + (i + 1) + ')').slice(0, _this.options.maxMovingRows - 1));
        }
        row.each(function(j) {
          var row_content = $(this).clone().wrap('<div></div>').parent().html();
          if (row_content.toLowerCase().indexOf('<th') === 0) sortableHtml += "<thead>";
          sortableHtml += '<tr ' + rowAttrsArr[j] + '" style="height:' + heightArr[j] + 'px;">';
          sortableHtml += row_content;
          if (row_content.toLowerCase().indexOf('<th') === 0) sortableHtml += "</thead>";
          sortableHtml += '</tr>';
        });
        sortableHtml += '</table>';
        sortableHtml += '</li>';
      });
      sortableHtml += '</ul>';
      this.sortableTable.el = this.originalTable.el.before(sortableHtml).prev();
      this.sortableTable.el.find('> li > table').each(function(i, v) {
        $(this).css('width', widthArr[i] + 'px');
      });
      this.sortableTable.selectedHandle = this.sortableTable.el.find('th .dragtable-handle-selected');

      var items = !this.options.dragaccept ? 'li' : 'li:has(' + this.options.dragaccept + ')';
      this.sortableTable.el.sortable({
        items: items,
        stop: this._rearrangeTable(),
        revert: this.options.revert,
        tolerance: this.options.tolerance,
        containment: this.options.containment,
        cursor: this.options.cursor,
        cursorAt: this.options.cursorAt,
        distance: this.options.distance,
        axis: this.options.axis
      });
      this.originalTable.startIndex = $(e.target).closest('th').prevAll().length + 1;
      this.options.beforeMoving(this.originalTable, this.sortableTable);
      this.sortableTable.movingRow = this.sortableTable.el.find('> li:nth-child(' + this.originalTable.startIndex + ')');
      disableTextSelection();
      this.sortableTable.movingRow.trigger($.extend($.Event(e.type), {
        which: 1,
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        screenX: e.screenX,
        screenY: e.screenY
      }));
      var placeholder = this.sortableTable.el.find('.ui-sortable-placeholder');
      if(!placeholder.height()  <= 0) {
        placeholder.css('height', this.sortableTable.el.find('.ui-sortable-helper').height());
      }
      placeholder.html('<div class="outer" style="height:100%;"><div class="inner" style="height:100%;"></div></div>');
    },
    bindTo: {},
    _create: function() {
      this.originalTable = {
        el: this.element,
        selectedHandle: $(),
        sortOrder: {},
        startIndex: 0,
        endIndex: 0
      };
      this.bindTo = this.originalTable.el.find('th');
      if (this.options.dragaccept) {
        this.bindTo = this.bindTo.filter(this.options.dragaccept);
      }
      if (this.bindTo.find(this.options.dragHandle).length > 0) {
        this.bindTo = this.bindTo.find(this.options.dragHandle);
      }
      if (this.options.restoreState !== null) {
        $.isFunction(this.options.restoreState) ? this.options.restoreState(this.originalTable) : this._restoreState(this.options.restoreState);
      }
      var _this = this;
      this.bindTo.mousedown(function(evt) {
        if(evt.which!==1) return;
        if (_this.options.beforeStart(_this.originalTable) === false) {
          return;
        }
        clearTimeout(this.downTimer);
        this.downTimer = setTimeout(function() {
          _this.originalTable.selectedHandle = $(this);
          _this.originalTable.selectedHandle.addClass('dragtable-handle-selected');
          _this._generateSortable(evt);
        }, _this.options.clickDelay);
      }).mouseup(function(evt) {
        clearTimeout(this.downTimer);
      });
    },
    redraw: function(){
      this.destroy();
      this._create();
    },
    destroy: function() {
      this.bindTo.unbind('mousedown');
      $.Widget.prototype.destroy.apply(this, arguments);
    }
  });

  var body_onselectstart_save = $(document.body).attr('onselectstart'),
    body_unselectable_save = $(document.body).attr('unselectable');

  function disableTextSelection() {
    var $style = $('<style id="__dragtable_disable_text_selection__" type="text/css">body { -ms-user-select:none;-moz-user-select:-moz-none;-khtml-user-select:none;-webkit-user-select:none;user-select:none; }</style>');
    $(document.head).append($style);
    $(document.body).attr('onselectstart', 'return false;').attr('unselectable', 'on');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else {
      document.selection.empty();
    }
  }

  function restoreTextSelection() {
    $('#__dragtable_disable_text_selection__').remove();
    if (body_onselectstart_save) {
      $(document.body).attr('onselectstart', body_onselectstart_save);
    } else {
      $(document.body).removeAttr('onselectstart');
    }
    if (body_unselectable_save) {
      $(document.body).attr('unselectable', body_unselectable_save);
    } else {
      $(document.body).removeAttr('unselectable');
    }
  }

  function swapNodes(a, b) {
    var aparent = a.parentNode;
    var asibling = a.nextSibling === b ? a : a.nextSibling;
    b.parentNode.insertBefore(a, b);
    aparent.insertBefore(b, asibling);
  }
})(jQuery);
