/**
 * Event listeners
 */

// Green order button, take to form
$( 'body' ).on( 'click', '.button',
    function( e ) {
        var formTarget = $( '.form-headline' );
        if( formTarget.length ) {
            $( 'html, body' ).stop().animate( { scrollTop: ( formTarget.offset().top - 80 ) }, { queue:false, duration:1000 } );
        }

        // stop default action
        e.preventDefault();
    }
);

// Form official submit button, send via ajax
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
            $( '.notification' ).fadeIn();
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