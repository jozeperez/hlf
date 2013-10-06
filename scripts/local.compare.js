// equalize heights helpter utility function
function equalizeHeights( config ) {
    // decifer config
    var selector      = config.selector || false,
        tallest       = 0;

    // get tallest height
    $( selector ).each(
        function( index, el ) {
            // first reset height real quick
            $( el ).height( 'auto' );
            tallest = $( el ).height() > tallest ? $( el ).height() : tallest;
        }
    );

    // apply tallest height
    $( selector ).each(
        function( index, el ) {
            $( el ).height( tallest );
        }
    );
}

// equalize everytime window is resized
$( window ).on( 'resize',
    function() {
        // list of selectors to equalize heights
        var equalizeList = ['.columns h3', '.plan-features'];
        $.each( equalizeList,
            function( index, selector ) {
                equalizeHeights( {
                    "selector": selector
                } );
            }
        );
    }
);