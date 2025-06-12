(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		const navbar = $('.navbar-b');
		const scrolled = $(window).scrollTop();
		
		// Dynamic navbar background opacity based on scroll
		const opacity = Math.min(scrolled / 200, 0.98);
		const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
		const bgColor = isDark ? 
			`rgba(26, 26, 26, ${opacity})` : 
			`rgba(255, 255, 255, ${opacity})`;
		
		navbar.css('background-color', bgColor);
		
		// Dynamic shadow
		const shadowOpacity = Math.min(scrolled / 200, 0.1);
		navbar.css('box-shadow', `0 4px 30px rgba(0, 0, 0, ${shadowOpacity})`);
		
		// Add/remove reduce class
		if (scrolled > 20) {
			navbar.addClass('navbar-reduce').removeClass('navbar-trans');
		} else {
			navbar.addClass('navbar-trans').removeClass('navbar-reduce');
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

	// Update dark mode toggle functionality
	const themeToggle = document.getElementById('theme-toggle');
	const themeIcon = themeToggle.querySelector('i');

	themeToggle.addEventListener('click', () => {
		const currentTheme = document.documentElement.getAttribute('data-theme');
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		
		document.documentElement.setAttribute('data-theme', newTheme);
		themeIcon.classList.toggle('fa-moon-o');
		themeIcon.classList.toggle('fa-sun-o');
		
		localStorage.setItem('theme', newTheme);
		
		// Force repaint to fix any styling issues
		document.body.style.display = 'none';
		document.body.offsetHeight;
		document.body.style.display = '';
	});

	// Check for saved theme preference on page load
	window.addEventListener('DOMContentLoaded', () => {
		const savedTheme = localStorage.getItem('theme') || 'light';
		document.documentElement.setAttribute('data-theme', savedTheme);
		
		if (savedTheme === 'dark') {
			themeIcon.classList.remove('fa-moon-o');
			themeIcon.classList.add('fa-sun-o');
		}
	});

	// Add scroll reveal animations
	ScrollReveal().reveal('.service-box', {
		delay: 200,
		distance: '20px',
		origin: 'bottom',
		interval: 100
	});

	ScrollReveal().reveal('.work-box', {
		delay: 200,
		distance: '20px',
		origin: 'bottom',
		interval: 100
	});

	ScrollReveal().reveal('.event-box', {
		delay: 200,
		distance: '20px',
		origin: 'bottom',
		interval: 100
	});

	// Smooth scroll for nav links
	$('.nav-link').on('click', function(e) {
		const href = $(this).attr('href');
		if(href.startsWith('#')) {
			e.preventDefault();
			const target = $(href);
			if(target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top - 70
				}, 1000, 'easeInOutExpo');
				
				// Close mobile menu
				$('.navbar-collapse').collapse('hide');
			}
		}
	});

	// Enhanced mobile menu animation
	$('.navbar-toggler').on('click', function() {
		$(this).toggleClass('active');
	});

	// Add hover effect for desktop
	if(window.innerWidth > 991) {
		$('.nav-link').hover(
			function() {
				$(this).css('transform', 'translateY(-2px)');
			},
			function() {
				$(this).css('transform', 'translateY(0)');
			}
		);
	}

	// Timeline animation
	document.addEventListener('DOMContentLoaded', function() {
		const timelineItems = document.querySelectorAll('.timeline-item');
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = '1';
					entry.target.style.transform = 'translateY(0)';
				}
			});
		}, {
			threshold: 0.2
		});

		timelineItems.forEach(item => {
			item.style.opacity = '0';
			item.style.transform = 'translateY(20px)';
			item.style.transition = 'all 0.5s ease-out';
			observer.observe(item);
		});
	});

})(jQuery);
