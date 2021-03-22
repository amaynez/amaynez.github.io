$(function () {
  // Cache variables for increased performance on devices with slow CPUs.
  var flexContainer = $('div.flex-container')
  var searchBox = $('.search-box')
  var searchClose = $('.search-icon-close')
  var searchInput = $('#search-input')

  // Menu Settings
  $('.menu-icon, .menu-icon-close').click(function (e) {
    e.preventDefault()
    e.stopPropagation()
    flexContainer.toggleClass('active')
  })

  // Click outside of menu to close it
  flexContainer.click(function (e) {
    if (flexContainer.hasClass('active') && e.target.tagName !== 'A') {
      flexContainer.removeClass('active')
    }
  })

  // Press Escape key to close menu
  $(window).keydown(function (e) {
    if (e.key === 'Escape') {
      if (flexContainer.hasClass('active')) {
        flexContainer.removeClass('active')
      } else if (searchBox.hasClass('search-active')) {
        searchBox.removeClass('search-active')
      }
    }
  })

  // Search Settings
  $('.search-icon').click(function (e) {
    e.preventDefault()
    searchBox.toggleClass('search-active')
    searchInput.focus()

    if (searchBox.hasClass('search-active')) {
      searchClose.click(function (e) {
    		e.preventDefault()
    		searchBox.removeClass('search-active')
    	})
    }
  })
})

   function popup(url, title)
   {
    newwindow=window.open('https://www.facebook.com/sharer/sharer.php?u='+url+'&t='+title+'&display=popup&ref=plugin&src=like&kid_directed_site=0&app_id=113869198637480','share in facebook','height=300,width=650,screenX=600,screenY=500');

    if (window.focus) {newwindow.focus()}
    return false;
   }

