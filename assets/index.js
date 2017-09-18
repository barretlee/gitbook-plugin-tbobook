require(["gitbook"], function(gitbook) {
  
    var pluginConfig;
  
    $('.site-header-wrapper a').on('click', function(evt) {
      var href = window.location.href;
      var link = $(this).attr('href');
      if (href.indexOf('_book') > -1 && /^\//.test(link)) {
        evt.preventDefault();
        link = link === '/' ? '/index.html' : link;
        window.location.href = href.split('_book')[0] + '_book' + link;
      }
    });
  
    var navChange = function() {
      if(!pluginConfig || !pluginConfig['tbobook']) return;
  
      var path = decodeURIComponent(window.location.pathname)
      if (path.indexOf('_book') > -1) {
        path = path.split('_book')[1];
      } else {
        path = path.slice(1);
      }
      if (/^\.\./.test(path)) {
        path = resolvePath(path);
      }
      if (!path) {
        path = $('.summary>.header').eq(0).next().attr('data-path');
      }
  
      var $selected = $('.site-nav a[href="/' + path + '"]');
      var index = 0;
  
      if ($selected.length) {
        index = $selected.parent().index();
      } else {
        var $chapter = findEle(path);
        try {
          index = $chapter.attr('data-level').split('.')[0] - 2;
        } catch(e) {
          index = 0;
        }
        $selected = $('.site-nav li').eq(index).find('a');
      }
  
      $('.site-nav a').removeClass('selected');
      $selected.addClass('selected');
  
      $('.summary>*').hide();
      // $('.summary>.header').eq(index).show();
      $('.summary>.chapter[data-level^="' + (index + 2) + '."]').show();
    };
  
    gitbook.events.bind("start", function(e, config) {
      pluginConfig = config;
      navChange();
    });
  
    gitbook.events.bind("page.change", function() {
      navChange();
    });
  
    gitbook.events.bind("exercise.submit", function(e, data) {
        
    });
  
  
  
    function resolvePath(path) {
      var realpath = decodeURIComponent(window.location.pathname)
      if (realpath.indexOf('_book') > -1) {
        realpath = realpath.split('_book')[1];
      } else {
        realpath = realpath.slice(1);
      }
      var stackA = realpath.split('/');
      var stackB = path.split('/');
      stackA.pop();
      for (var i = 0; i < stackB.length; i++) {
        if (stackB[i] === '..') {
          stackA.pop();
          stackB.shift();
          break;
        }
      }
      return stackA.concat(stackB).join('/');
    }
  
    function findEle(path) {
      var $chapters = $('.summary .chapter');
      for (var i = 0; i < $chapters.length; i++) {
        var p = $chapters.eq(i).attr('data-path') || '';
        if (p && resolvePath(p) === path) {
          return $chapters.eq(i);
        }
      }
      return null;
    }
  }); 