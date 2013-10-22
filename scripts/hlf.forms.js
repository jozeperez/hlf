/**
 * HLF forms module
 */
hlf.register( 'forms', function() {
// private data
    // default config
    var _config = {
        apiUrl: '//{SUB-DOMAIN}.healthyleanandfit.com',
        apiRequiredPreData: 'domain='+location.hostname+'&',
        cssSelectors: {
            notificationTarget: '.notification',
            notificationMsgTarget: '.notification .hlf-msg'
        },
        defaultErrorMsg: '<p><span>Error!</span> Please fill in all the fields required.</p>'
    };

    // sandbox reference
    var _sb = null;

// private methods
    // register all listeners for this module
    var _registerListeners = function() {
        // green order button, take to form (if any)
        if( $( '.hlf-scroll-to' ).size() ) {
            $( '#content-wrapper' ).on( 'click', '.hlf-scroll-to',
                function( e ) {
                    _sb.util.scrollTo( '.hlf-scroll-to' );

                    // stop default action
                    e.preventDefault();
                }
            );
        }

        // form official submit button, send via ajax
        $( '#content-wrapper' ).on( 'click', '.hlf-submit',
            function( e ) {
                // declare variables needed
                var submitButton       = $( this ),
                    formTarget         = submitButton.closest( 'form' ),
                    loaderSpinner      = formTarget.find( '.loader' ),
                    notificationBanner = formTarget.prev();

                // reset fields & notification banner
                formTarget.find( '.required, .is-email' ).removeClass( 'error' ).next().removeClass( 'error' );
                notificationBanner.fadeOut();

                // loop through data, make sure all required fields are present
                $( formTarget ).find( '.required' ).each(
                    function( index, originalElement ) {
                        var el = $( originalElement );
                        if( !el.val() || el.val() == originalElement.defaultValue ) {
                            el.addClass( 'error' ).next().addClass( 'error' );
                        }
                    }
                );

                // loop through any emails
                $( formTarget ).find( '.is-email' ).each(
                    function( index, originalElement ) {
                        var el = $( originalElement );
                        if( el.val() && el.val() != originalElement.defaultValue && ( el.val().indexOf( '@' ) == -1 || el.val().indexOf( '.' ) == -1 ) ) {
                            el.addClass( 'error' ).next().addClass( 'error' );
                        }
                    }
                );

                // show notification banner
                if( $( '.required.error', formTarget ).size() > 0 ) {
                    // insert error message in DOM and show
                    $( _config.cssSelectors.notificationMsgTarget ).html( _config.defaultErrorMsg );
                    $( _config.cssSelectors.notificationTarget ).removeClass( 'error success' ).addClass( 'error' ).fadeIn();
                }
                // OR initiate the submission
                else {
                    // show spinner & disable submit button
                    loaderSpinner.fadeIn();
                    submitButton.attr( 'disabled', 'disabled' );

                    // submit form
                    $.ajax( {
                        url: _config.apiUrl,
                        data: _config.apiRequiredPreData+formTarget.serialize(),
                        success: function( data ) {
                            // success
                            if( data.status === 'success' ) {
                                // insert success message in DOM
                                var successMsg = '<p><span>'+_sb.util.ucfirst( data.status )+'!</span> '+data.msg+'</p>';
                                $( _config.cssSelectors.notificationMsgTarget ).html( successMsg );

                                // hide tail and button
                                loaderSpinner.fadeOut();
                                submitButton.fadeOut();

                                // lock all visible fields
                                $( formTarget ).find( 'input, textarea' ).not( ':hidden' ).attr( 'disabled', 'disabled' );
                            }
                            // error, handle it
                            else if( data.status === 'error' ) {
                                var errorMsg = "";
                                if( data.debug ) {
                                    $.each( data.debug,
                                        function( index, message ) {
                                            errorMsg = errorMsg + '<p><span>'+_sb.util.ucfirst( data.status )+'!</span> '+message+'</p>';
                                        }
                                    );
                                } else {
                                    errorMsg = errorMsg + '<p><span>'+_sb.util.ucfirst( data.status )+'!</span> '+data.msg+'</p>';
                                }
                                
                                // insert error message in DOM
                                $( _config.cssSelectors.notificationMsgTarget ).html( errorMsg );

                                // hide tail and activate button
                                loaderSpinner.fadeOut();
                                submitButton.removeAttr( 'disabled' );
                            }

                            // add correct class to notification
                            $( _config.cssSelectors.notificationTarget ).removeClass( 'error success' ).addClass( data.status ).fadeIn();
                        },
                        error : function( xhr, msg, e ) {
                            if( window.console ) {
                                console.error( 'JSONP Error: ', msg, e, xhr );
                            }
                        },
                        dataType: 'jsonp',
                        cache : false,
                        crossDomain: true
                    } );
                }
            }
        );
    },

    // apply all jquery plugins
    _applyPlugins = function() {
        if( $( '.is-telephone' ).size() ) {
            $( '.is-telephone' ).mask( '(999) 999-9999' );
        }
    };

// public methods
    var publik = {};

    // module init method (constructor)
    publik.init = function(sb) {
        // set our sandbox Object
        _sb = sb;

        // determine what api url to use
        _config.apiUrl = _config.apiUrl.replace( '{SUB-DOMAIN}', location.host.indexOf( 'dev.' ) > -1 ? 'dev.api' : 'api' );

        // register our listeners
        _registerListeners();

        // apply our plugins
        _applyPlugins();
    };  

    // overwrite _config with config param
    publik.setConfig = function( config ) {
        $.extend( true, _config, config );
    };

    // return our public interface
    return publik;
});