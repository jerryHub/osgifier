/*global require: false, provide: false */
/*jslint nomen: true*/
(function (context) {
	"use strict";
	
	var _        = require('underscore'),
	    $script  = require('scriptjs'),
	    jQuery,
	    install;
	
	$script('app/package/package', 'package');
	
	$script.ready(['jquery', 'bootstrap', 'package'], function () {
		jQuery  = require('jquery');
		
		jQuery("#installShiro").click(function () {
			install = require('PackageInstall');
			jQuery('#installShiro').button('loading');
			install('shiro', function () {
				jQuery('#installShiro').button('reset');
			});
			
		});
		
		jQuery("#installAspectj").click(function () {
			install = require('PackageInstall');
			jQuery('#installAspectj').button('loading');
			install('aspectj', function () {
				jQuery('#installAspectj').button('reset');
			});
			
		});
		
		jQuery("#installJasper").click(function () {
			install = require('PackageInstall');
			jQuery('#installJasper').button('loading');
			install('jasper', function () {
				jQuery('#installJasper').button('reset');
			});
			
		});
		
		jQuery("#installLogback").click(function () {
			install = require('PackageInstall');
			jQuery('#installLogback').button('loading');
			install('logback', function () {
				jQuery('#installLogback').button('reset');
			});
			
		});
		

		jQuery("#installScala").click(function () {
			install = require('PackageInstall');
			jQuery('#installScala').button('loading');
			install('scala', function () {
				jQuery('#installScala').button('reset');
			});
			
		});
		
		jQuery("#installMahout").click(function () {
			install = require('PackageInstall');
			jQuery('#installMahout').button('loading');
			install('mahout', function () {
				jQuery('#installMahout').button('reset');
			});
			
		});
		
		jQuery("#installAries").click(function () {
			install = require('PackageInstall');
			jQuery('#installAries').button('loading');
			install('aries', function () {
				jQuery('#installAries').button('reset');
			});
			
		});
		
		jQuery("#installPaxMvn").click(function () {
			install = require('PackageInstall');
			jQuery('#installPaxMvn').button('loading');
			install('pax-mvn', function () {
				jQuery('#installPaxMvn').button('reset');
			});
			
		});
		
	});
	
}());