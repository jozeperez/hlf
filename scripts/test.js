/**
 * HLF product page
 */
hlf.register( 'productPage', function() {
// private data
    // default config
    var _config = {};

    // sandbox reference
    var _sb = null;

// private methods
    // register all listeners for this module
    _registerListeners = function() {
        // green order button, take to form
        $( 'body' ).on( 'click', '.hlf-scroll-to',
            function( e ) {
                _sb.util.scrollTo( '.hlf-scroll-to' );

                // stop default action
                e.preventDefault();
            }
        );

        // form official submit button, send via ajax
        $( 'body' ).on( 'click', '.hlf-submit',
            function( e ) {
                // declare variables needed
                var submitButton       = $( this ),
                    formTarget         = submitButton.closest( 'form' ),
                    loaderSpinner      = formTarget.find( '.loader' ),
                    notificationBanner = formTarget.prev();

                // reset fields & notification banner
                formTarget.find( '.required' ).removeClass( 'error' ).next().removeClass( 'error' );
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

                // show notification banner
                if( $( '.required.error', formTarget ).size() > 0 ) {
                    $( '.notification' ).css( 'display', 'block' );
                }
                // OR initiate the submission
                else {
                    // show spinner & disable submit button
                    loaderSpinner.fadeIn();
                    submitButton.attr( 'disabled', 'disabled' );

                    // submit form
                    $.ajax( {
                        url: '//dev.api.healthyleanandfit.com',
                        data: formTarget.serialize(),
                        success: function( data ) {
                            console.log( data );
                            // success
                            if( data.requestStatus === 200 ) {

                            }
                            // error, handle it
                            else {

                            }
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
    };

// public methods
    var publik = {};

    // module init method (constructor)
    publik.init = function(sb) {
        // set our sandbox Object
        _sb = sb;

        // register our listeners
        _registerListeners();
    };  

    // overwrite _config with config param
    publik.setConfig = function( config ) {
        $.extend( true, _config, config );
    };

    // return our public interface
    return publik;
});