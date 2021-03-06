/*global require: false, provide: false */
/*jslint browser: true, regexp: true, nomen:true */
(function(context) {
	"use strict";

	// Ready libs
	var $script = require('scriptjs'),
	    _ = require('underscore'), Backbone = require('backbone'),
    	// Async Libs
	    jQuery, hogan,
    	// Domain
	    domain,
    	// Repositories
	    bundleLibrary,
    	// Views
    	bundleLibraryView,
    	// Funcs
    	prepareModel,
    	prepareUi,
    	fetch,
    	ready;

	// Load custom scripts
	$script('app/bundles/domain', 'BundleDomain');
	$script('vendor/google-code-prettify/prettify', 'prettify');

	prepareModel = function () {
		bundleLibrary = new domain.BundleLibrary();
	};

	prepareUi = function () {
		var bundleTemplate = hogan.compile(jQuery("#bundleTemplate").html()), BundleView, BundleLibraryView,
		    fullTable;

		BundleView = Backbone.View.extend({
			tagName : 'tr',
			render : function() {
				var element = jQuery(this.el),
				    model   = this.model;
				
				model.on('statusChange', fetch);

				element.html(bundleTemplate.render(model.toJSON()));

				jQuery(".bundle-start", element).click(function() {
					model.start();
				});

				jQuery(".bundle-stop", element).click(function() {
					model.stop();
				});

				jQuery(".bundle-restart", element).click(function() {
					model.restart();
				});

				jQuery(".bundle-update", element).click(function() {
					model.update();
				});

				jQuery(".bundle-uninstall", element).click(function() {
					model.uninstall();
				});

				return this;
			}
		});

		BundleLibraryView = Backbone.View.extend({
			buildChildren : function() {
				var that = this;
				this._bundleViews = [];

				this.collection.each(function(bundle) {
					that._bundleViews.push(new BundleView({
						model : bundle
					}));
				});
			},
			render : function() {
				var that = this, 
				    filter;
				if(fullTable) {
					filter = fullTable.fnSettings().oPreviousSearch.sSearch;
					fullTable.fnDestroy();
				}
				jQuery(this.el).empty();
				this.buildChildren();
				_(this._bundleViews).each(function(bv) {
					jQuery(that.el).append(bv.render().el);
					return this;
				});
				fullTable = jQuery("#fullTable").dataTable({
					sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
					sPaginationType: "bootstrap"
				});
				if(filter && filter != '') {
					fullTable.fnFilter(filter);
				}
			}
		});

		bundleLibraryView = new BundleLibraryView({
			collection : bundleLibrary,
			el : jQuery('.bundles')[0]
		});
		
	};

	ready = function() {
		jQuery("#modalMessage").modal({
			show: false
		});
		
		jQuery("#modalInstall").modal({
			show: false
		});
		
		jQuery("#install").click(function () {
			jQuery('#install').button('loading');
			jQuery('#installUrl').attr('disabled', 'disabled');
			bundleLibrary.installModule(jQuery("#installUrl").val(), function () {
				jQuery('#installUrl').removeAttr('disabled');
				jQuery('#install').button('reset');
				fetch();
			});
		});
		
		jQuery("#showModalInstall").click(function () {
			jQuery("#modalInstall").modal('show');
		});
		
		jQuery("#executeModalInstall").click(function () {
			var installs = jQuery("#installBody").val().replace(/\r\n/g, '\n').split('\n');
			jQuery('#executeModalInstall').button('loading');
			jQuery("#installBody").attr('disabled', 'disabled');
			var installPart = function installPart(i) {
				bundleLibrary.installModule(installs[i], function () {
					if(i + 1 < installs.length) {
						installPart(i + 1);
					} else {
						jQuery('#installBody').removeAttr('disabled');
						jQuery('#executeModalInstall').button('reset');
						fetch();
					}
				});
			};
			installPart(0);
		});

		fetch = function () {
			bundleLibrary.fetch({
				success : function () {
					bundleLibraryView.render();
				}
			});	
		};
		
		fetch();
		
	};

	// Ready to rumble
	$script.ready([ 'jquery', 'bootstrap', 'dataTables', 'hogan', 'BundleDomain' ], function() {
		jQuery = require('jquery');
		hogan = require('hogan');
		domain = require('BundleDomain');

		prepareModel();
		prepareUi();

		jQuery(document).ready(ready);

	});

}());
