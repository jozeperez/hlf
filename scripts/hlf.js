var hlf = (function( $ ){
// private data
    var _minimods = {};
    var _sb = function() {
        this.console = publik.console;
    };

// private methods

// public methods
    var publik = {};

    // window console (or dummy object if it doesn't exist)
    publik.console = window.console || {log:function(){},error:function(){},warn:function(){}};

    // mini-namespace initializer
    publik.init = function() {
        // detect any forms
        if( $( '.hlf-submit' ).size() > 0 ) {
            // submit button(s) detected, lets init forms
            _minimods.forms.init();
        }
    };

// public sub modules
    
    /**
     * HLF forms mini sub module
     */
    _minimods.forms = (function( $, sb ) {
    // private vars
        var _sb = sb;

    // private methods
        
    // public methods
        var miniPublik = {};
        miniPublik.init = function() {
            _sb.console.log( "Mini mod is inited" );
        }
        return miniPublik;
    } )( $, new _sb() );
    publik.forms = _minimods.forms;

    /**
     * HLF utility mini sub module
     */
    _minimods.util = (function( $, sb ) {
    // private vars
        var _sb = sb;

    // private methods
        
    // public methods
        var miniPublik = {};
        miniPublik.init = function() {
            _sb.console.log( "Mini mod is inited" );
        }
        return miniPublik;
    } )( $, new _sb() );
    publik.util = _minimods.util;




// return public interface
    return publik;
})(jQuery);


// /**
//  * HLF mini sub module EXAMPLE
//  */
// _minimods.NAME = (function( $, sb ) {
// // private vars
//     var _sb = sb;

// // private methods
    
// // public methods
//     var miniPublik = {};
//     miniPublik.init = function() {
//         _sb.console.log( "Mini mod is inited" );
//     }
//     return miniPublik;
// } )( $, new _sb() );
// publik.NAME = _minimods.NAME;