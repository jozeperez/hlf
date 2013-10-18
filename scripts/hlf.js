var hlf = (function( $ ){
// private data
    var _modules  = [];
    var _config   = {};
    var _sb = function() {
        this.console = publik.console;
    };

// private methods

// public methods
    var publik = {};

    // window console (or dummy object if it doesn't exist)
    publik.console = window.console || {log:function(){},error:function(){},warn:function(){}};

    // register modules
    publik.register = function( slug, module ){
        var mod = { 
            "slug" : slug,
            "module" : module()
        };
        
        _modules.push(mod);
        publik[slug] = mod.module;
    };

    // namespace initializer
    publik.init = function( opts ){
        publik.console.log("Begining mdv.init();");

        // Merge in opts with config
        $.extend( _config, opts );

        // init all modules
        for( var key in _modules ) {
            // Throw a bone to the devs
            publik.console.log("Launch: mdv."+_modules[key].slug+".init();");

            var module = _modules[key].module;
            // Create new sandbox for each module
            module.init(new _sb(_modules[key].slug));
        }

        publik.console.log("End mdv.init();");

    };

// return public interface
    return publik;
})(jQuery);

/**
 * Forms module for HLF.com namespace
 */
hlf.register( 'forms',function(){
// private data
    // default config
    var _config = {};

    // sandbox reference
    var _sb = null;

// private methods
    // register all listeners for this module
    _registerListeners = function() {
        _sb.console.log( "working just fine" );
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

    // return module events
    publik.getEvents = function() {
        return $.extend( {}, _events );
    };

    // overwrite _config with config param
    publik.setConfig = function( config ) {
        $.extend( true, _config, config );
    };

    // return our public interface
    return publik;
});



// hlf.register( 'test',function(){
// // private data
//     // default config
//     var _config = {};

//     // sandbox reference
//     var _sb = null;

// // private methods
//     // register all listeners for this module
//     _registerListeners = function() {
//     };

// // public methods
//     var publik = {};

//     // module init method (constructor)
//     publik.init = function(sb) {
//         // set our sandbox Object
//         _sb = sb;

//         // register our listeners
//         _registerListeners();
//     };    

//     // return module events
//     publik.getEvents = function() {
//         return $.extend( {}, _events );
//     };

//     // overwrite _config with config param
//     publik.setConfig = function( config ) {
//         $.extend( true, _config, config );
//     };

//     // return our public interface
//     return publik;
// });

