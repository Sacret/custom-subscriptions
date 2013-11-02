(function ($) {

  Drupal.behaviors.collectiveMove = {
    attach: function(context, settings) {
      // show buttons on hover
      $('.view-items .views-row').hover(function() {
        $(this).find('.views-field-nid a').css('display', 'block');
      });

      // hide buttons on mouseleave
      $('.view-items .views-row').mouseleave(function() {
        $(this).find('.views-field-nid a.follow, .views-field-nid a.unfollow').css('display', 'none');
      });

      // show 'unfollow' when user has already had a subscription
      $('.view-items .views-row .views-field-nid .following').live('mouseover', function() {
        $(this).text('UNFOLLOW');
        $(this).addClass('unfollow');
      });

      // hide 'unfollow' when user has already had a subscription
      $('.view-items .views-row .views-field-nid .following').live('mouseout', function() {
        $(this).text('FOLLOWING');
        $(this).removeClass('unfollow');
      });

      // click on follow/unfollow buttons
      $('.view-items .views-row .views-field-nid a').bind('click', function(e) {
        e.preventDefault();        
        var href = $(this).attr('href');        
        var strs = href.split('/');
        var item = $(this);
        $.post(
          Drupal.settings.basePath + 'custom_subscriptions_ajax',
          {
            type: strs[0],
            nid: strs[1],             
          },
          function (data) {
            if (data == 1) {
              if (strs[0] == 'follow') {
                item.text('UNFOLLOW');
                item.removeClass('follow');
                item.addClass('following unfollow');
                item.attr('href', 'unfollow/' + strs[1]);
              }   
              if (strs[0] == 'unfollow') {
                item.text('FOLLOW');
                item.removeClass('following');
                item.removeClass('unfollow');
                item.addClass('follow');
                item.attr('href', 'follow/' + strs[1]);
              }          
            }
          }
        );         
      });
    }
  };

})(jQuery);