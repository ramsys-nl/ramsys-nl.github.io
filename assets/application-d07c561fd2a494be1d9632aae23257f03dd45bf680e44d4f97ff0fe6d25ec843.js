/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket trac-14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var version = "3.7.1",

	rhtmlSuffix = /HTML$/i,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},


	// Retrieve the text value of an array of DOM nodes
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		}
		if ( nodeType === 1 || nodeType === 11 ) {
			return elem.textContent;
		}
		if ( nodeType === 9 ) {
			return elem.documentElement.textContent;
		}
		if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	isXMLDoc: function( elem ) {
		var namespace = elem && elem.namespaceURI,
			docElem = elem && ( elem.ownerDocument || elem ).documentElement;

		// Assume HTML when documentElement doesn't yet exist, such as inside
		// document fragments.
		return !rhtmlSuffix.test( namespace || docElem && docElem.nodeName || "HTML" );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}


function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var pop = arr.pop;


var sort = arr.sort;


var splice = arr.splice;


var whitespace = "[\\x20\\t\\r\\n\\f]";


var rtrimCSS = new RegExp(
	"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
	"g"
);




// Note: an element does not contain itself
jQuery.contains = function( a, b ) {
	var bup = b && b.parentNode;

	return a === bup || !!( bup && bup.nodeType === 1 && (

		// Support: IE 9 - 11+
		// IE doesn't have `contains` on SVG.
		a.contains ?
			a.contains( bup ) :
			a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
	) );
};




// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

function fcssescape( ch, asCodePoint ) {
	if ( asCodePoint ) {

		// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
		if ( ch === "\0" ) {
			return "\uFFFD";
		}

		// Control characters and (dependent upon position) numbers get escaped as code points
		return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
	}

	// Other potentially-special ASCII characters get backslash-escaped
	return "\\" + ch;
}

jQuery.escapeSelector = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};




var preferredDoc = document,
	pushNative = push;

( function() {

var i,
	Expr,
	outermostContext,
	sortInput,
	hasDuplicate,
	push = pushNative,

	// Local document vars
	document,
	documentElement,
	documentIsHTML,
	rbuggyQSA,
	matches,

	// Instance-specific data
	expando = jQuery.expando,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" +
		"loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rleadingCombinator = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" +
		whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		ID: new RegExp( "^#(" + identifier + ")" ),
		CLASS: new RegExp( "^\\.(" + identifier + ")" ),
		TAG: new RegExp( "^(" + identifier + "|[*])" ),
		ATTR: new RegExp( "^" + attributes ),
		PSEUDO: new RegExp( "^" + pseudos ),
		CHILD: new RegExp(
			"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
				whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
				whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		bool: new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		needsContext: new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		if ( nonHex ) {

			// Strip the backslash prefix from a non-hex escape sequence
			return nonHex;
		}

		// Replace a hexadecimal escape sequence with the encoded Unicode code point
		// Support: IE <=11+
		// For values outside the Basic Multilingual Plane (BMP), manually construct a
		// surrogate pair
		return high < 0 ?
			String.fromCharCode( high + 0x10000 ) :
			String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes; see `setDocument`.
	// Support: IE 9 - 11+, Edge 12 - 18+
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE/Edge.
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && nodeName( elem, "fieldset" );
		},
		{ dir: "parentNode", next: "legend" }
	);

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android <=4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = {
		apply: function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		},
		call: function( target ) {
			pushNative.apply( target, slice.call( arguments, 1 ) );
		}
	};
}

function find( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE 9 only
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								push.call( results, elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE 9 only
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							find.contains( context, elem ) &&
							elem.id === m ) {

							push.call( results, elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( !nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rleadingCombinator.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when
					// strict-comparing two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( newContext != context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = jQuery.escapeSelector( nid );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrimCSS, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties
		// (see https://github.com/jquery/sizzle/issues/157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by jQuery selector module
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		return nodeName( elem, "input" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		return ( nodeName( elem, "input" ) || nodeName( elem, "button" ) ) &&
			elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11+
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a jQuery selector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [node] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
function setDocument( node ) {
	var subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	documentElement = document.documentElement;
	documentIsHTML = !jQuery.isXMLDoc( document );

	// Support: iOS 7 only, IE 9 - 11+
	// Older browsers didn't support unprefixed `matches`.
	matches = documentElement.matches ||
		documentElement.webkitMatchesSelector ||
		documentElement.msMatchesSelector;

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors
	// (see trac-13936).
	// Limit the fix to IE & Edge Legacy; despite Edge 15+ implementing `matches`,
	// all IE 9+ and Edge Legacy versions implement `msMatchesSelector` as well.
	if ( documentElement.msMatchesSelector &&

		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 9 - 11+, Edge 12 - 18+
		subWindow.addEventListener( "unload", unloadHandler );
	}

	// Support: IE <10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		documentElement.appendChild( el ).id = jQuery.expando;
		return !document.getElementsByName ||
			!document.getElementsByName( jQuery.expando ).length;
	} );

	// Support: IE 9 only
	// Check to see if it's possible to do matchesSelector
	// on a disconnected node.
	support.disconnectedMatch = assert( function( el ) {
		return matches.call( el, "*" );
	} );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// IE/Edge don't support the :scope pseudo-class.
	support.scope = assert( function() {
		return document.querySelectorAll( ":scope" );
	} );

	// Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
	// Make sure the `:has()` argument is parsed unforgivingly.
	// We include `*` in the test to detect buggy implementations that are
	// _selectively_ forgiving (specifically when the list includes at least
	// one valid selector).
	// Note that we treat complete lack of support for `:has()` as if it were
	// spec-compliant support, which is fine because use of `:has()` in such
	// environments will fail in the qSA path and fall back to jQuery traversal
	// anyway.
	support.cssHas = assert( function() {
		try {
			document.querySelector( ":has(*,:jqfake)" );
			return false;
		} catch ( e ) {
			return true;
		}
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter.ID = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter.ID =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find.TAG = function( tag, context ) {
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			return context.getElementsByTagName( tag );

		// DocumentFragment nodes don't have gEBTN
		} else {
			return context.querySelectorAll( tag );
		}
	};

	// Class
	Expr.find.CLASS = function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	rbuggyQSA = [];

	// Build QSA regex
	// Regex strategy adopted from Diego Perini
	assert( function( el ) {

		var input;

		documentElement.appendChild( el ).innerHTML =
			"<a id='" + expando + "' href='' disabled='disabled'></a>" +
			"<select id='" + expando + "-\r\\' disabled='disabled'>" +
			"<option selected=''></option></select>";

		// Support: iOS <=7 - 8 only
		// Boolean attributes and "value" are not treated correctly in some XML documents
		if ( !el.querySelectorAll( "[selected]" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
		}

		// Support: iOS <=7 - 8 only
		if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
			rbuggyQSA.push( "~=" );
		}

		// Support: iOS 8 only
		// https://bugs.webkit.org/show_bug.cgi?id=136851
		// In-page `selector#id sibling-combinator selector` fails
		if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
			rbuggyQSA.push( ".#.+[+~]" );
		}

		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		if ( !el.querySelectorAll( ":checked" ).length ) {
			rbuggyQSA.push( ":checked" );
		}

		// Support: Windows 8 Native Apps
		// The type and name attributes are restricted during .innerHTML assignment
		input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		el.appendChild( input ).setAttribute( "name", "D" );

		// Support: IE 9 - 11+
		// IE's :disabled selector does not pick up the children of disabled fieldsets
		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		documentElement.appendChild( el ).disabled = true;
		if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
			rbuggyQSA.push( ":enabled", ":disabled" );
		}

		// Support: IE 11+, Edge 15 - 18+
		// IE 11/Edge don't find elements on a `[name='']` query in some cases.
		// Adding a temporary attribute to the document before the selection works
		// around the issue.
		// Interestingly, IE 10 & older don't seem to have the issue.
		input = document.createElement( "input" );
		input.setAttribute( "name", "" );
		el.appendChild( input );
		if ( !el.querySelectorAll( "[name='']" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
				whitespace + "*(?:''|\"\")" );
		}
	} );

	if ( !support.cssHas ) {

		// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
		// Our regular `try-catch` mechanism fails to detect natively-unsupported
		// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
		// in browsers that parse the `:has()` argument as a forgiving selector list.
		// https://drafts.csswg.org/selectors/#relational now requires the argument
		// to be parsed unforgivingly, but browsers have not yet fully adjusted.
		rbuggyQSA.push( ":has" );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a === document || a.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b === document || b.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	};

	return document;
}

find.matches = function( expr, elements ) {
	return find( expr, null, null, elements );
};

find.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return find( expr, document, null, [ elem ] ).length > 0;
};

find.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return jQuery.contains( context, elem );
};


find.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (see trac-13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	if ( val !== undefined ) {
		return val;
	}

	return elem.getAttribute( name );
};

find.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
jQuery.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	//
	// Support: Android <=4.0+
	// Testing for detecting duplicates is unpredictable so instead assume we can't
	// depend on duplicate detection in all browsers without a stable sort.
	hasDuplicate = !support.sortStable;
	sortInput = !support.sortStable && slice.call( results, 0 );
	sort.call( results, sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			splice.call( results, duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

jQuery.fn.uniqueSort = function() {
	return this.pushStack( jQuery.uniqueSort( slice.apply( this ) ) );
};

Expr = jQuery.expr = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		ATTR: function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] || match[ 5 ] || "" )
				.replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		CHILD: function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					find.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" )
				);
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

			// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				find.error( match[ 0 ] );
			}

			return match;
		},

		PSEUDO: function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr.CHILD.test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		TAG: function( nodeNameSelector ) {
			var expectedNodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return nodeName( elem, expectedNodeName );
				};
		},

		CLASS: function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace + ")" + className +
					"(" + whitespace + "|$)" ) ) &&
				classCache( className, function( elem ) {
					return pattern.test(
						typeof elem.className === "string" && elem.className ||
							typeof elem.getAttribute !== "undefined" &&
								elem.getAttribute( "class" ) ||
							""
					);
				} );
		},

		ATTR: function( name, operator, check ) {
			return function( elem ) {
				var result = find.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				if ( operator === "=" ) {
					return result === check;
				}
				if ( operator === "!=" ) {
					return result !== check;
				}
				if ( operator === "^=" ) {
					return check && result.indexOf( check ) === 0;
				}
				if ( operator === "*=" ) {
					return check && result.indexOf( check ) > -1;
				}
				if ( operator === "$=" ) {
					return check && result.slice( -check.length ) === check;
				}
				if ( operator === "~=" ) {
					return ( " " + result.replace( rwhitespace, " " ) + " " )
						.indexOf( check ) > -1;
				}
				if ( operator === "|=" ) {
					return result === check || result.slice( 0, check.length + 1 ) === check + "-";
				}

				return false;
			};
		},

		CHILD: function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || ( parent[ expando ] = {} );
							cache = outerCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {
								outerCache = elem[ expando ] || ( elem[ expando ] = {} );
								cache = outerCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );
											outerCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		PSEUDO: function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// https://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					find.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as jQuery does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		not: markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrimCSS, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element
					// (see https://github.com/jquery/sizzle/issues/299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		has: markFunction( function( selector ) {
			return function( elem ) {
				return find( selector, elem ).length > 0;
			};
		} ),

		contains: markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || jQuery.text( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// https://www.w3.org/TR/selectors/#lang-pseudo
		lang: markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				find.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		target: function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		root: function( elem ) {
			return elem === documentElement;
		},

		focus: function( elem ) {
			return elem === safeActiveElement() &&
				document.hasFocus() &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		enabled: createDisabledPseudo( false ),
		disabled: createDisabledPseudo( true ),

		checked: function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			return ( nodeName( elem, "input" ) && !!elem.checked ) ||
				( nodeName( elem, "option" ) && !!elem.selected );
		},

		selected: function( elem ) {

			// Support: IE <=11+
			// Accessing the selectedIndex property
			// forces the browser to treat the default option as
			// selected when in an optgroup.
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		empty: function( elem ) {

			// https://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		parent: function( elem ) {
			return !Expr.pseudos.empty( elem );
		},

		// Element/input types
		header: function( elem ) {
			return rheader.test( elem.nodeName );
		},

		input: function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		button: function( elem ) {
			return nodeName( elem, "input" ) && elem.type === "button" ||
				nodeName( elem, "button" );
		},

		text: function( elem ) {
			var attr;
			return nodeName( elem, "input" ) && elem.type === "text" &&

				// Support: IE <10 only
				// New HTML5 attribute values (e.g., "search") appear
				// with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		first: createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		last: createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		eq: createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		even: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		odd: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		lt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i;

			if ( argument < 0 ) {
				i = argument + length;
			} else if ( argument > length ) {
				i = length;
			} else {
				i = argument;
			}

			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		gt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos.nth = Expr.pseudos.eq;

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rleadingCombinator.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrimCSS, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	if ( parseOnly ) {
		return soFar.length;
	}

	return soFar ?
		find.error( selector ) :

		// Cache the tokens
		tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						if ( skip && nodeName( elem, skip ) ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = outerCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							outerCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		find( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem, matcherOut,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed ||
				multipleContexts( selector || "*",
					context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems;

		if ( matcher ) {

			// If we have a postFinder, or filtered seed, or non-seed postFilter
			// or preexisting results,
			matcherOut = postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results;

			// Find primary matches
			matcher( matcherIn, matcherOut, context, xml );
		} else {
			matcherOut = matcherIn;
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf.call( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			var ret = ( !leadingRelative && ( xml || context != outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element
			// (see https://github.com/jquery/sizzle/issues/299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 )
							.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrimCSS, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find.TAG( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: iOS <=7 - 9 only
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
			// elements by id. (see trac-14142)
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							push.call( results, elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					jQuery.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

function compile( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
}

/**
 * A low-level selection function that works with jQuery's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with jQuery selector compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find.ID(
				token.matches[ 0 ].replace( runescape, funescape ),
				context
			) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr.needsContext.test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) &&
						testContext( context.parentNode ) || context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Support: Android <=4.0 - 4.1+
// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Initialize against the default document
setDocument();

// Support: Android <=4.0 - 4.1+
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

jQuery.find = find;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.unique = jQuery.uniqueSort;

// These have always been private, but they used to be documented as part of
// Sizzle so let's maintain them for now for backwards compatibility purposes.
find.compile = compile;
find.select = select;
find.setDocument = setDocument;
find.tokenize = tokenize;

find.escape = jQuery.escapeSelector;
find.getText = jQuery.text;
find.isXML = jQuery.isXMLDoc;
find.selectors = jQuery.expr;
find.support = jQuery.support;
find.uniqueSort = jQuery.uniqueSort;

	/* eslint-enable */

} )();


var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
	// Strict HTML recognition (trac-11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to jQuery#find
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.error );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the error, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getErrorHook ) {
									process.error = jQuery.Deferred.getErrorHook();

								// The deprecated alias of the above. While the name suggests
								// returning the stack, not an error instance, jQuery just passes
								// it directly to `console.warn` so both will work; an instance
								// just better cooperates with source maps.
								} else if ( jQuery.Deferred.getStackHook ) {
									process.error = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

// If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
// captured before the async barrier to get the original error cause
// which may otherwise be hidden.
jQuery.Deferred.exceptionHook = function( error, asyncError ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message,
			error.stack, asyncError );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See trac-6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see trac-8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (trac-14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (trac-11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (trac-14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (trac-13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (trac-12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (trac-13208)
				// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (trac-13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", true );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, isSetup ) {

	// Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
	if ( !isSetup ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				if ( !saved ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					this[ type ]();
					result = dataPriv.get( this, type );
					dataPriv.set( this, type, false );

					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						return result;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering
				// the native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved ) {

				// ...and capture the result
				dataPriv.set( this, type, jQuery.event.trigger(
					saved[ 0 ],
					saved.slice( 1 ),
					this
				) );

				// Abort handling of the native event by all jQuery handlers while allowing
				// native handlers on the same element to run. On target, this is achieved
				// by stopping immediate propagation just on the jQuery event. However,
				// the native event is re-wrapped by a jQuery one on each level of the
				// propagation so the only way to stop it for jQuery is to stop it for
				// everyone via native `stopPropagation()`. This is not a problem for
				// focus/blur which don't bubble, but it does also stop click on checkboxes
				// and radios. We accept this limitation.
				event.stopPropagation();
				event.isImmediatePropagationStopped = returnTrue;
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (trac-504, trac-13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {

	function focusMappedHandler( nativeEvent ) {
		if ( document.documentMode ) {

			// Support: IE 11+
			// Attach a single focusin/focusout handler on the document while someone wants
			// focus/blur. This is because the former are synchronous in IE while the latter
			// are async. In other browsers, all those handlers are invoked synchronously.

			// `handle` from private data would already wrap the event, but we need
			// to change the `type` here.
			var handle = dataPriv.get( this, "handle" ),
				event = jQuery.event.fix( nativeEvent );
			event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
			event.isSimulated = true;

			// First, handle focusin/focusout
			handle( nativeEvent );

			// ...then, handle focus/blur
			//
			// focus/blur don't bubble while focusin/focusout do; simulate the former by only
			// invoking the handler at the lower level.
			if ( event.target === event.currentTarget ) {

				// The setup part calls `leverageNative`, which, in turn, calls
				// `jQuery.event.add`, so event handle will already have been set
				// by this point.
				handle( event );
			}
		} else {

			// For non-IE browsers, attach a single capturing handler on the document
			// while someone wants focusin/focusout.
			jQuery.event.simulate( delegateType, nativeEvent.target,
				jQuery.event.fix( nativeEvent ) );
		}
	}

	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			var attaches;

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, true );

			if ( document.documentMode ) {

				// Support: IE 9 - 11+
				// We use the same native handler for focusin & focus (and focusout & blur)
				// so we need to coordinate setup & teardown parts between those events.
				// Use `delegateType` as the key as `type` is already used by `leverageNative`.
				attaches = dataPriv.get( this, delegateType );
				if ( !attaches ) {
					this.addEventListener( delegateType, focusMappedHandler );
				}
				dataPriv.set( this, delegateType, ( attaches || 0 ) + 1 );
			} else {

				// Return false to allow normal processing in the caller
				return false;
			}
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		teardown: function() {
			var attaches;

			if ( document.documentMode ) {
				attaches = dataPriv.get( this, delegateType ) - 1;
				if ( !attaches ) {
					this.removeEventListener( delegateType, focusMappedHandler );
					dataPriv.remove( this, delegateType );
				} else {
					dataPriv.set( this, delegateType, attaches );
				}
			} else {

				// Return false to indicate standard teardown should be applied
				return false;
			}
		},

		// Suppress native focus or blur if we're currently inside
		// a leveraged native-event stack
		_default: function( event ) {
			return dataPriv.get( event.target, type );
		},

		delegateType: delegateType
	};

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	//
	// Support: IE 9 - 11+
	// To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
	// attach a single handler for both events in IE.
	jQuery.event.special[ delegateType ] = {
		setup: function() {

			// Handle: regular nodes (via `this.ownerDocument`), window
			// (via `this.document`) & document (via `this`).
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType );

			// Support: IE 9 - 11+
			// We use the same native handler for focusin & focus (and focusout & blur)
			// so we need to coordinate setup & teardown parts between those events.
			// Use `delegateType` as the key as `type` is already used by `leverageNative`.
			if ( !attaches ) {
				if ( document.documentMode ) {
					this.addEventListener( delegateType, focusMappedHandler );
				} else {
					doc.addEventListener( type, focusMappedHandler, true );
				}
			}
			dataPriv.set( dataHolder, delegateType, ( attaches || 0 ) + 1 );
		},
		teardown: function() {
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType ) - 1;

			if ( !attaches ) {
				if ( document.documentMode ) {
					this.removeEventListener( delegateType, focusMappedHandler );
				} else {
					doc.removeEventListener( type, focusMappedHandler, true );
				}
				dataPriv.remove( dataHolder, delegateType );
			} else {
				dataPriv.set( dataHolder, delegateType, attaches );
			}
		}
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,

	rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (trac-8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Re-enable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {

							// Unwrap a CDATA section containing script contents. This shouldn't be
							// needed as in XML documents they're already not visible when
							// inspecting element contents and in HTML documents they have no
							// meaning but we're preserving that logic for backwards compatibility.
							// This will be removed completely in 4.0. See gh-4904.
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew jQuery#find here for performance reasons:
			// https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var rcustomProp = /^--/;


var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (trac-8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "box-sizing:content-box;border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is `display: block`
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		isCustomProp = rcustomProp.test( name ),

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, trac-12537)
	//   .css('--customProperty) (gh-3144)
	if ( computed ) {

		// Support: IE <=9 - 11+
		// IE only supports `"float"` in `getPropertyValue`; in computed styles
		// it's only available as `"cssFloat"`. We no longer modify properties
		// sent to `.css()` apart from camelCasing, so we need to check both.
		// Normally, this would create difference in behavior: if
		// `getPropertyValue` returns an empty string, the value returned
		// by `.css()` would be `undefined`. This is usually the case for
		// disconnected elements. However, in IE even disconnected elements
		// with no styles return `"none"` for `getPropertyValue( "float" )`
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( isCustomProp && ret ) {

			// Support: Firefox 105+, Chrome <=105+
			// Spec requires trimming whitespace for custom properties (gh-4926).
			// Firefox only trims leading whitespace. Chrome just collapses
			// both leading & trailing whitespace to a single space.
			//
			// Fall back to `undefined` if empty string returned.
			// This collapses a missing definition with property defined
			// and set to an empty string but there's no standard API
			// allowing us to differentiate them without a performance penalty
			// and returning `undefined` aligns with older jQuery.
			//
			// rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
			// as whitespace while CSS does not, but this is not a problem
			// because CSS preprocessing replaces them with U+000A LINE FEED
			// (which *is* CSS whitespace)
			// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
			ret = ret.replace( rtrimCSS, "$1" ) || undefined;
		}

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0,
		marginDelta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		// Count margin delta separately to only add it after scroll gutter adjustment.
		// This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
		if ( box === "margin" ) {
			marginDelta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta + marginDelta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		animationIterationCount: true,
		aspectRatio: true,
		borderImageSlice: true,
		columnCount: true,
		flexGrow: true,
		flexShrink: true,
		fontWeight: true,
		gridArea: true,
		gridColumn: true,
		gridColumnEnd: true,
		gridColumnStart: true,
		gridRow: true,
		gridRowEnd: true,
		gridRowStart: true,
		lineHeight: true,
		opacity: true,
		order: true,
		orphans: true,
		scale: true,
		widows: true,
		zIndex: true,
		zoom: true,

		// SVG-related
		fillOpacity: true,
		floodOpacity: true,
		stopOpacity: true,
		strokeMiterlimit: true,
		strokeOpacity: true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (trac-7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug trac-9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (trac-7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// Use proper attribute retrieval (trac-12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];
						if ( cur.indexOf( " " + className + " " ) < 0 ) {
							cur += className + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );

				// This expression is here for better compressibility (see addClass)
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];

						// Remove *all* instances
						while ( cur.indexOf( " " + className + " " ) > -1 ) {
							cur = cur.replace( " " + className + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var classNames, className, i, self,
			type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		classNames = classesToArray( value );

		return this.each( function() {
			if ( isValidValue ) {

				// Toggle individual class names
				self = jQuery( this );

				for ( i = 0; i < classNames.length; i++ ) {
					className = classNames[ i ];

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (trac-14686, trac-14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (trac-2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (trac-9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (trac-6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// trac-7653, trac-8125, trac-8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (trac-10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket trac-12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// trac-9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (trac-11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// trac-1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see trac-8605, trac-14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// trac-14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this
			.on( "mouseenter", fnOver )
			.on( "mouseleave", fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "$1" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (trac-13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*!
 * Bootstrap v3.4.0 (https://getbootstrap.com/)
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under the MIT license
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // https://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.4.0'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    selector    = selector === '#' ? [] : selector
    var $parent = $(document).find(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.4.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.4.0'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      if (typeof $next === 'object' && $next.length) {
        $next[0].offsetWidth // force reflow
      }
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    if (href) {
      href = href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    }

    var target  = $this.attr('data-target') || href
    var $target = $(document).find(target)

    if (!$target.hasClass('carousel')) return

    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.4.0'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(document).find(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(document).find(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.4.0'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(document).find(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#modals
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options = options
    this.$body = $(document.body)
    this.$element = $(element)
    this.$dialog = this.$element.find('.modal-dialog')
    this.$backdrop = null
    this.isShown = null
    this.originalBodyPad = null
    this.scrollbarWidth = 0
    this.ignoreBackdropClick = false
    this.fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom'

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION = '3.4.0'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
          this.$element[0] !== e.target &&
          !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    var scrollbarWidth = this.scrollbarWidth
    if (this.bodyIsOverflowing) {
      this.$body.css('padding-right', bodyPad + scrollbarWidth)
      $(this.fixedContent).each(function (index, element) {
        var actualPadding = element.style.paddingRight
        var calculatedPadding = $(element).css('padding-right')
        $(element)
          .data('padding-right', actualPadding)
          .css('padding-right', parseFloat(calculatedPadding) + scrollbarWidth + 'px')
      })
    }
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
    $(this.fixedContent).each(function (index, element) {
      var padding = $(element).data('padding-right')
      $(element).removeData('padding-right')
      element.style.paddingRight = padding ? padding : ''
    })
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
    var href = $this.attr('href')
    var target = $this.attr('data-target') ||
      (href && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7

    var $target = $(document).find(target)
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.4.0'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(document).find($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo($(document).find(this.options.container)) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.4.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
        o.content.call($e[0]) :
        o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.4.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.4.0'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(document).find(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
          .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#affix
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    var target = this.options.target === Affix.DEFAULTS.target ? $(this.options.target) : $(document).find(this.options.target)

    this.$target = target
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.4.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/*
File generated by js-routes 1.3.3
Based on Rails routes of Website::Application
 */

(function() {
  var DeprecatedBehavior, NodeTypes, ParameterMissing, ReservedOptions, SpecialOptionsKey, Utils, createGlobalJsRoutesObject, defaults, root,
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  ParameterMissing = function(message) {
    this.message = message;
  };

  ParameterMissing.prototype = new Error();

  defaults = {
    prefix: "",
    default_url_options: {}
  };

  NodeTypes = {"GROUP":1,"CAT":2,"SYMBOL":3,"OR":4,"STAR":5,"LITERAL":6,"SLASH":7,"DOT":8};

  SpecialOptionsKey = "_options";

  DeprecatedBehavior = false;

  ReservedOptions = ['anchor', 'trailing_slash', 'host', 'port', 'protocol'];

  Utils = {
    default_serializer: function(object, prefix) {
      var element, i, j, key, len, prop, s;
      if (prefix == null) {
        prefix = null;
      }
      if (object == null) {
        return "";
      }
      if (!prefix && !(this.get_object_type(object) === "object")) {
        throw new Error("Url parameters should be a javascript hash");
      }
      s = [];
      switch (this.get_object_type(object)) {
        case "array":
          for (i = j = 0, len = object.length; j < len; i = ++j) {
            element = object[i];
            s.push(this.default_serializer(element, prefix + "[]"));
          }
          break;
        case "object":
          for (key in object) {
            if (!hasProp.call(object, key)) continue;
            prop = object[key];
            if ((prop == null) && (prefix != null)) {
              prop = "";
            }
            if (prop != null) {
              if (prefix != null) {
                key = prefix + "[" + key + "]";
              }
              s.push(this.default_serializer(prop, key));
            }
          }
          break;
        default:
          if (object != null) {
            s.push((encodeURIComponent(prefix.toString())) + "=" + (encodeURIComponent(object.toString())));
          }
      }
      if (!s.length) {
        return "";
      }
      return s.join("&");
    },
    custom_serializer: null,
    serialize: function(object) {
      if ((this.custom_serializer != null) && this.get_object_type(this.custom_serializer) === "function") {
        return this.custom_serializer(object);
      } else {
        return this.default_serializer(object);
      }
    },
    clean_path: function(path) {
      var last_index;
      path = path.split("://");
      last_index = path.length - 1;
      path[last_index] = path[last_index].replace(/\/+/g, "/");
      return path.join("://");
    },
    extract_options: function(number_of_params, args) {
      var last_el, options;
      last_el = args[args.length - 1];
      if ((args.length > number_of_params && last_el === void 0) || ((last_el != null) && "object" === this.get_object_type(last_el) && !this.looks_like_serialized_model(last_el))) {
        options = args.pop() || {};
        delete options[SpecialOptionsKey];
        return options;
      } else {
        return {};
      }
    },
    looks_like_serialized_model: function(object) {
      return !object[SpecialOptionsKey] && ("id" in object || "to_param" in object);
    },
    path_identifier: function(object) {
      var property;
      if (object === 0) {
        return "0";
      }
      if (!object) {
        return "";
      }
      property = object;
      if (this.get_object_type(object) === "object") {
        if ("to_param" in object) {
          if (object.to_param == null) {
            throw new ParameterMissing("Route parameter missing: to_param");
          }
          property = object.to_param;
        } else if ("id" in object) {
          if (object.id == null) {
            throw new ParameterMissing("Route parameter missing: id");
          }
          property = object.id;
        } else {
          property = object;
        }
        if (this.get_object_type(property) === "function") {
          property = property.call(object);
        }
      }
      return property.toString();
    },
    clone: function(obj) {
      var attr, copy, key;
      if ((obj == null) || "object" !== this.get_object_type(obj)) {
        return obj;
      }
      copy = obj.constructor();
      for (key in obj) {
        if (!hasProp.call(obj, key)) continue;
        attr = obj[key];
        copy[key] = attr;
      }
      return copy;
    },
    merge: function() {
      var tap, xs;
      xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      tap = function(o, fn) {
        fn(o);
        return o;
      };
      if ((xs != null ? xs.length : void 0) > 0) {
        return tap({}, function(m) {
          var j, k, len, results, v, x;
          results = [];
          for (j = 0, len = xs.length; j < len; j++) {
            x = xs[j];
            results.push((function() {
              var results1;
              results1 = [];
              for (k in x) {
                v = x[k];
                results1.push(m[k] = v);
              }
              return results1;
            })());
          }
          return results;
        });
      }
    },
    normalize_options: function(parts, required_parts, default_options, actual_parameters) {
      var i, j, key, len, options, part, parts_options, result, route_parts, url_parameters, use_all_parts, value;
      options = this.extract_options(parts.length, actual_parameters);
      if (actual_parameters.length > parts.length) {
        throw new Error("Too many parameters provided for path");
      }
      use_all_parts = DeprecatedBehavior || actual_parameters.length > required_parts.length;
      parts_options = {};
      for (key in options) {
        if (!hasProp.call(options, key)) continue;
        use_all_parts = true;
        if (this.indexOf(parts, key) >= 0) {
          parts_options[key] = value;
        }
      }
      options = this.merge(defaults.default_url_options, default_options, options);
      result = {};
      url_parameters = {};
      result['url_parameters'] = url_parameters;
      for (key in options) {
        if (!hasProp.call(options, key)) continue;
        value = options[key];
        if (this.indexOf(ReservedOptions, key) >= 0) {
          result[key] = value;
        } else {
          url_parameters[key] = value;
        }
      }
      route_parts = use_all_parts ? parts : required_parts;
      i = 0;
      for (j = 0, len = route_parts.length; j < len; j++) {
        part = route_parts[j];
        if (i < actual_parameters.length) {
          if (!parts_options.hasOwnProperty(part)) {
            url_parameters[part] = actual_parameters[i];
            ++i;
          }
        }
      }
      return result;
    },
    build_route: function(parts, required_parts, default_options, route, full_url, args) {
      var options, parameters, result, url, url_params;
      args = Array.prototype.slice.call(args);
      options = this.normalize_options(parts, required_parts, default_options, args);
      parameters = options['url_parameters'];
      result = "" + (this.get_prefix()) + (this.visit(route, parameters));
      url = Utils.clean_path(result);
      if (options['trailing_slash'] === true) {
        url = url.replace(/(.*?)[\/]?$/, "$1/");
      }
      if ((url_params = this.serialize(parameters)).length) {
        url += "?" + url_params;
      }
      url += options.anchor ? "#" + options.anchor : "";
      if (full_url) {
        url = this.route_url(options) + url;
      }
      return url;
    },
    visit: function(route, parameters, optional) {
      var left, left_part, right, right_part, type, value;
      if (optional == null) {
        optional = false;
      }
      type = route[0], left = route[1], right = route[2];
      switch (type) {
        case NodeTypes.GROUP:
          return this.visit(left, parameters, true);
        case NodeTypes.STAR:
          return this.visit_globbing(left, parameters, true);
        case NodeTypes.LITERAL:
        case NodeTypes.SLASH:
        case NodeTypes.DOT:
          return left;
        case NodeTypes.CAT:
          left_part = this.visit(left, parameters, optional);
          right_part = this.visit(right, parameters, optional);
          if (optional && ((this.is_optional_node(left[0]) && !left_part) || ((this.is_optional_node(right[0])) && !right_part))) {
            return "";
          }
          return "" + left_part + right_part;
        case NodeTypes.SYMBOL:
          value = parameters[left];
          if (value != null) {
            delete parameters[left];
            return this.path_identifier(value);
          }
          if (optional) {
            return "";
          } else {
            throw new ParameterMissing("Route parameter missing: " + left);
          }
          break;
        default:
          throw new Error("Unknown Rails node type");
      }
    },
    is_optional_node: function(node) {
      return this.indexOf([NodeTypes.STAR, NodeTypes.SYMBOL, NodeTypes.CAT], node) >= 0;
    },
    build_path_spec: function(route, wildcard) {
      var left, right, type;
      if (wildcard == null) {
        wildcard = false;
      }
      type = route[0], left = route[1], right = route[2];
      switch (type) {
        case NodeTypes.GROUP:
          return "(" + (this.build_path_spec(left)) + ")";
        case NodeTypes.CAT:
          return "" + (this.build_path_spec(left)) + (this.build_path_spec(right));
        case NodeTypes.STAR:
          return this.build_path_spec(left, true);
        case NodeTypes.SYMBOL:
          if (wildcard === true) {
            return "" + (left[0] === '*' ? '' : '*') + left;
          } else {
            return ":" + left;
          }
          break;
        case NodeTypes.SLASH:
        case NodeTypes.DOT:
        case NodeTypes.LITERAL:
          return left;
        default:
          throw new Error("Unknown Rails node type");
      }
    },
    visit_globbing: function(route, parameters, optional) {
      var left, right, type, value;
      type = route[0], left = route[1], right = route[2];
      if (left.replace(/^\*/i, "") !== left) {
        route[1] = left = left.replace(/^\*/i, "");
      }
      value = parameters[left];
      if (value == null) {
        return this.visit(route, parameters, optional);
      }
      parameters[left] = (function() {
        switch (this.get_object_type(value)) {
          case "array":
            return value.join("/");
          default:
            return value;
        }
      }).call(this);
      return this.visit(route, parameters, optional);
    },
    get_prefix: function() {
      var prefix;
      prefix = defaults.prefix;
      if (prefix !== "") {
        prefix = (prefix.match("/$") ? prefix : prefix + "/");
      }
      return prefix;
    },
    route: function(parts_table, default_options, route_spec, full_url) {
      var j, len, part, parts, path_fn, ref, required, required_parts;
      required_parts = [];
      parts = [];
      for (j = 0, len = parts_table.length; j < len; j++) {
        ref = parts_table[j], part = ref[0], required = ref[1];
        parts.push(part);
        if (required) {
          required_parts.push(part);
        }
      }
      path_fn = function() {
        return Utils.build_route(parts, required_parts, default_options, route_spec, full_url, arguments);
      };
      path_fn.required_params = required_parts;
      path_fn.toString = function() {
        return Utils.build_path_spec(route_spec);
      };
      return path_fn;
    },
    route_url: function(route_defaults) {
      var hostname, port, protocol;
      if (typeof route_defaults === 'string') {
        return route_defaults;
      }
      protocol = route_defaults.protocol || Utils.current_protocol();
      hostname = route_defaults.host || window.location.hostname;
      port = route_defaults.port || (!route_defaults.host ? Utils.current_port() : void 0);
      port = port ? ":" + port : '';
      return protocol + "://" + hostname + port;
    },
    has_location: function() {
      return typeof window !== 'undefined' && typeof window.location !== 'undefined';
    },
    current_host: function() {
      if (this.has_location()) {
        return window.location.hostname;
      } else {
        return null;
      }
    },
    current_protocol: function() {
      if (this.has_location() && window.location.protocol !== '') {
        return window.location.protocol.replace(/:$/, '');
      } else {
        return 'http';
      }
    },
    current_port: function() {
      if (this.has_location() && window.location.port !== '') {
        return window.location.port;
      } else {
        return '';
      }
    },
    _classToTypeCache: null,
    _classToType: function() {
      var j, len, name, ref;
      if (this._classToTypeCache != null) {
        return this._classToTypeCache;
      }
      this._classToTypeCache = {};
      ref = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
      for (j = 0, len = ref.length; j < len; j++) {
        name = ref[j];
        this._classToTypeCache["[object " + name + "]"] = name.toLowerCase();
      }
      return this._classToTypeCache;
    },
    get_object_type: function(obj) {
      if (root.jQuery && (root.jQuery.type != null)) {
        return root.jQuery.type(obj);
      }
      if (obj == null) {
        return "" + obj;
      }
      if (typeof obj === "object" || typeof obj === "function") {
        return this._classToType()[Object.prototype.toString.call(obj)] || "object";
      } else {
        return typeof obj;
      }
    },
    indexOf: function(array, element) {
      if (Array.prototype.indexOf) {
        return array.indexOf(element);
      } else {
        return this.indexOfImplementation(array, element);
      }
    },
    indexOfImplementation: function(array, element) {
      var el, i, j, len, result;
      result = -1;
      for (i = j = 0, len = array.length; j < len; i = ++j) {
        el = array[i];
        if (el === element) {
          result = i;
        }
      }
      return result;
    }
  };

  createGlobalJsRoutesObject = function() {
    var namespace;
    namespace = function(mainRoot, namespaceString) {
      var current, parts;
      parts = (namespaceString ? namespaceString.split(".") : []);
      if (!parts.length) {
        return;
      }
      current = parts.shift();
      mainRoot[current] = mainRoot[current] || {};
      return namespace(mainRoot[current], parts.join("."));
    };
    namespace(root, "Routes");
    root.Routes = {
// about => /over-ons(.:format)
  // function(options)
  about_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"over-ons",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
// contact => /contact(.:format)
  // function(options)
  contact_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"contact",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
// exception_test => /exception/test(.:format)
  // function(options)
  exception_test_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"exception",false],[2,[7,"/",false],[2,[6,"test",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
// messages => /messages(.:format)
  // function(options)
  messages_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"messages",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
// newsletter_subscribers => /newsletter_subscribers(.:format)
  // function(options)
  newsletter_subscribers_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"newsletter_subscribers",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
// privacy => /privacy(.:format)
  // function(options)
  privacy_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"privacy",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
// rails_info => /rails/info(.:format)
  // function(options)
  rails_info_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
// rails_info_properties => /rails/info/properties(.:format)
  // function(options)
  rails_info_properties_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"info",false],[2,[7,"/",false],[2,[6,"properties",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
// rails_info_routes => /rails/info/routes(.:format)
  // function(options)
  rails_info_routes_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"info",false],[2,[7,"/",false],[2,[6,"routes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
// rails_mailers => /rails/mailers(.:format)
  // function(options)
  rails_mailers_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"mailers",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
// root => /
  // function(options)
  root_path: Utils.route([], {}, [7,"/",false]),
// service => /diensten/:id(.:format)
  // function(id, options)
  service_path: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"diensten",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
// services => /diensten(.:format)
  // function(options)
  services_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"diensten",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
// support => /support(.:format)
  // function(options)
  support_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"support",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
// vcard => /vcard(.:format)
  // function(options)
  vcard_path: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"vcard",false],[1,[2,[8,".",false],[3,"format",false]],false]]])}
;
    root.Routes.options = defaults;
    root.Routes.default_serializer = function(object, prefix) {
      return Utils.default_serializer(object, prefix);
    };
    return root.Routes;
  };

  if (typeof define === "function" && define.amd) {
    define([], function() {
      return createGlobalJsRoutesObject();
    });
  } else {
    createGlobalJsRoutesObject();
  }

}).call(this);
$(function () {
  var token = $( 'meta[name="csrf-token"]' ).attr( 'content' );

  $.ajaxSetup( {
    beforeSend: function ( xhr ) {
      xhr.setRequestHeader( 'X-CSRF-Token', token );
    }
  });
});
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {
  regula.bind();

  $("#btnSubmit").on("click", function(event) {
    event.preventDefault();

    $("#formFreedback").empty();

    var validationResults = regula.validate();
    if (validationResults.length > 0) {
      $("#formFeedback").html("<p class=\"big\">U heeft niet alle velden ingevuld.</p>");
      return false;
    }

    var name = $("#message_name").val();
    var company_name = $("#message_company_name").val();
    var email_address = $("#message_email_address").val();
    var phone_number = $("#message_phone_number").val();
    var question = $("#message_question").val();

    var recaptcha_response = $("#g-recaptcha-response").val();

    var data = {
      message: {
        name: name,
        company_name: company_name,
        email_address: email_address,
        phone_number: phone_number,
        question: question
      },
      recaptcha_response: recaptcha_response
    }

    var method = "POST";
    var url = Routes.messages_path();

    $.ajax({
      url: url,
      method: method,
      data: data
    }).done(function (data) {
      $("#contactForm").hide();
      $("#formFeedback").html("<p class=\"big\">Bedankt voor uw bericht. Wij zullen z.s.m. contact met u opnemen.</p>");
    }).fail(function (data) {
      $("#formFeedback").html("<p class=\"big\">Uw bericht is niet verstuurd. Probeer het opnieuw.</p>");
    });

    return true;
  })
});
/**
 * jQuery
 * @see          http://jquery.com/
 * @license      MIT license
 */

!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t="length"in e&&e.length,n=it.type(e);return"function"===n||it.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e}function r(e,t,n){if(it.isFunction(t))return it.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return it.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(ft.test(t))return it.filter(t,e,n);t=it.filter(t,e)}return it.grep(e,function(e){return it.inArray(e,t)>=0!==n})}function i(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}function o(e){var t=xt[e]={};return it.each(e.match(bt)||[],function(e,n){t[n]=!0}),t}function a(){ht.addEventListener?(ht.removeEventListener("DOMContentLoaded",s,!1),e.removeEventListener("load",s,!1)):(ht.detachEvent("onreadystatechange",s),e.detachEvent("onload",s))}function s(){(ht.addEventListener||"load"===event.type||"complete"===ht.readyState)&&(a(),it.ready())}function u(e,t,n){if(void 0===n&&1===e.nodeType){var r="data-"+t.replace(Et,"-$1").toLowerCase();if(n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:Nt.test(n)?it.parseJSON(n):n}catch(i){}it.data(e,t,n)}else n=void 0}return n}function l(e){var t;for(t in e)if(("data"!==t||!it.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function c(e,t,n,r){if(it.acceptData(e)){var i,o,a=it.expando,s=e.nodeType,u=s?it.cache:e,l=s?e[a]:e[a]&&a;if(l&&u[l]&&(r||u[l].data)||void 0!==n||"string"!=typeof t)return l||(l=s?e[a]=J.pop()||it.guid++:a),u[l]||(u[l]=s?{}:{toJSON:it.noop}),("object"==typeof t||"function"==typeof t)&&(r?u[l]=it.extend(u[l],t):u[l].data=it.extend(u[l].data,t)),o=u[l],r||(o.data||(o.data={}),o=o.data),void 0!==n&&(o[it.camelCase(t)]=n),"string"==typeof t?(i=o[t],null==i&&(i=o[it.camelCase(t)])):i=o,i}}function d(e,t,n){if(it.acceptData(e)){var r,i,o=e.nodeType,a=o?it.cache:e,s=o?e[it.expando]:it.expando;if(a[s]){if(t&&(r=n?a[s]:a[s].data)){it.isArray(t)?t=t.concat(it.map(t,it.camelCase)):t in r?t=[t]:(t=it.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;for(;i--;)delete r[t[i]];if(n?!l(r):!it.isEmptyObject(r))return}(n||(delete a[s].data,l(a[s])))&&(o?it.cleanData([e],!0):nt.deleteExpando||a!=a.window?delete a[s]:a[s]=null)}}}function f(){return!0}function p(){return!1}function h(){try{return ht.activeElement}catch(e){}}function m(e){var t=Ft.split("|"),n=e.createDocumentFragment();if(n.createElement)for(;t.length;)n.createElement(t.pop());return n}function g(e,t){var n,r,i=0,o=typeof e.getElementsByTagName!==Ct?e.getElementsByTagName(t||"*"):typeof e.querySelectorAll!==Ct?e.querySelectorAll(t||"*"):void 0;if(!o)for(o=[],n=e.childNodes||e;null!=(r=n[i]);i++)!t||it.nodeName(r,t)?o.push(r):it.merge(o,g(r,t));return void 0===t||t&&it.nodeName(e,t)?it.merge([e],o):o}function v(e){jt.test(e.type)&&(e.defaultChecked=e.checked)}function y(e,t){return it.nodeName(e,"table")&&it.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function b(e){return e.type=(null!==it.find.attr(e,"type"))+"/"+e.type,e}function x(e){var t=Vt.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function w(e,t){for(var n,r=0;null!=(n=e[r]);r++)it._data(n,"globalEval",!t||it._data(t[r],"globalEval"))}function T(e,t){if(1===t.nodeType&&it.hasData(e)){var n,r,i,o=it._data(e),a=it._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)it.event.add(t,n,s[n][r])}a.data&&(a.data=it.extend({},a.data))}}function C(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!nt.noCloneEvent&&t[it.expando]){i=it._data(t);for(r in i.events)it.removeEvent(t,r,i.handle);t.removeAttribute(it.expando)}"script"===n&&t.text!==e.text?(b(t).text=e.text,x(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),nt.html5Clone&&e.innerHTML&&!it.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&jt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}function N(t,n){var r,i=it(n.createElement(t)).appendTo(n.body),o=e.getDefaultComputedStyle&&(r=e.getDefaultComputedStyle(i[0]))?r.display:it.css(i[0],"display");return i.detach(),o}function E(e){var t=ht,n=Zt[e];return n||(n=N(e,t),"none"!==n&&n||(Kt=(Kt||it("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),t=(Kt[0].contentWindow||Kt[0].contentDocument).document,t.write(),t.close(),n=N(e,t),Kt.detach()),Zt[e]=n),n}function k(e,t){return{get:function(){var n=e();if(null!=n)return n?void delete this.get:(this.get=t).apply(this,arguments)}}}function S(e,t){if(t in e)return t;for(var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=pn.length;i--;)if(t=pn[i]+n,t in e)return t;return r}function A(e,t){for(var n,r,i,o=[],a=0,s=e.length;s>a;a++)r=e[a],r.style&&(o[a]=it._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&At(r)&&(o[a]=it._data(r,"olddisplay",E(r.nodeName)))):(i=At(r),(n&&"none"!==n||!i)&&it._data(r,"olddisplay",i?n:it.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}function D(e,t,n){var r=ln.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function j(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;4>o;o+=2)"margin"===n&&(a+=it.css(e,n+St[o],!0,i)),r?("content"===n&&(a-=it.css(e,"padding"+St[o],!0,i)),"margin"!==n&&(a-=it.css(e,"border"+St[o]+"Width",!0,i))):(a+=it.css(e,"padding"+St[o],!0,i),"padding"!==n&&(a+=it.css(e,"border"+St[o]+"Width",!0,i)));return a}function L(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=en(e),a=nt.boxSizing&&"border-box"===it.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=tn(e,t,o),(0>i||null==i)&&(i=e.style[t]),rn.test(i))return i;r=a&&(nt.boxSizingReliable()||i===e.style[t]),i=parseFloat(i)||0}return i+j(e,t,n||(a?"border":"content"),r,o)+"px"}function H(e,t,n,r,i){return new H.prototype.init(e,t,n,r,i)}function q(){return setTimeout(function(){hn=void 0}),hn=it.now()}function _(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=St[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function M(e,t,n){for(var r,i=(xn[t]||[]).concat(xn["*"]),o=0,a=i.length;a>o;o++)if(r=i[o].call(n,t,e))return r}function F(e,t,n){var r,i,o,a,s,u,l,c,d=this,f={},p=e.style,h=e.nodeType&&At(e),m=it._data(e,"fxshow");n.queue||(s=it._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,u=s.empty.fire,s.empty.fire=function(){s.unqueued||u()}),s.unqueued++,d.always(function(){d.always(function(){s.unqueued--,it.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],l=it.css(e,"display"),c="none"===l?it._data(e,"olddisplay")||E(e.nodeName):l,"inline"===c&&"none"===it.css(e,"float")&&(nt.inlineBlockNeedsLayout&&"inline"!==E(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",nt.shrinkWrapBlocks()||d.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],gn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(h?"hide":"show")){if("show"!==i||!m||void 0===m[r])continue;h=!0}f[r]=m&&m[r]||it.style(e,r)}else l=void 0;if(it.isEmptyObject(f))"inline"===("none"===l?E(e.nodeName):l)&&(p.display=l);else{m?"hidden"in m&&(h=m.hidden):m=it._data(e,"fxshow",{}),o&&(m.hidden=!h),h?it(e).show():d.done(function(){it(e).hide()}),d.done(function(){var t;it._removeData(e,"fxshow");for(t in f)it.style(e,t,f[t])});for(r in f)a=M(h?m[r]:0,r,d),r in m||(m[r]=a.start,h&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function O(e,t){var n,r,i,o,a;for(n in e)if(r=it.camelCase(n),i=t[r],o=e[n],it.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=it.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function P(e,t,n){var r,i,o=0,a=bn.length,s=it.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=hn||q(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:it.extend({},t),opts:it.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:hn||q(),duration:n.duration,tweens:[],createTween:function(t,n){var r=it.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(O(c,l.opts.specialEasing);a>o;o++)if(r=bn[o].call(l,e,c,l.opts))return r;return it.map(c,M,l),it.isFunction(l.opts.start)&&l.opts.start.call(e,l),it.fx.timer(it.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function B(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(bt)||[];if(it.isFunction(n))for(;r=o[i++];)"+"===r.charAt(0)?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function R(e,t,n,r){function i(s){var u;return o[s]=!0,it.each(e[s]||[],function(e,s){var l=s(t,n,r);return"string"!=typeof l||a||o[l]?a?!(u=l):void 0:(t.dataTypes.unshift(l),i(l),!1)}),u}var o={},a=e===In;return i(t.dataTypes[0])||!o["*"]&&i("*")}function W(e,t){var n,r,i=it.ajaxSettings.flatOptions||{};for(r in t)void 0!==t[r]&&((i[r]?e:n||(n={}))[r]=t[r]);return n&&it.extend(!0,e,n),e}function $(e,t,n){for(var r,i,o,a,s=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===i&&(i=e.mimeType||t.getResponseHeader("Content-Type"));if(i)for(a in s)if(s[a]&&s[a].test(i)){u.unshift(a);break}if(u[0]in n)o=u[0];else{for(a in n){if(!u[0]||e.converters[a+" "+u[0]]){o=a;break}r||(r=a)}o=o||r}return o?(o!==u[0]&&u.unshift(o),n[o]):void 0}function z(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(a=l[u+" "+o]||l["* "+o],!a)for(i in l)if(s=i.split(" "),s[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){a===!0?a=l[i]:l[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(d){return{state:"parsererror",error:a?d:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}function I(e,t,n,r){var i;if(it.isArray(t))it.each(t,function(t,i){n||Jn.test(e)?r(e,i):I(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==it.type(t))r(e,t);else for(i in t)I(e+"["+i+"]",t[i],n,r)}function X(){try{return new e.XMLHttpRequest}catch(t){}}function U(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function V(e){return it.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}var J=[],Y=J.slice,G=J.concat,Q=J.push,K=J.indexOf,Z={},et=Z.toString,tt=Z.hasOwnProperty,nt={},rt="1.11.3",it=function(e,t){return new it.fn.init(e,t)},ot=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,at=/^-ms-/,st=/-([\da-z])/gi,ut=function(e,t){return t.toUpperCase()};it.fn=it.prototype={jquery:rt,constructor:it,selector:"",length:0,toArray:function(){return Y.call(this)},get:function(e){return null!=e?0>e?this[e+this.length]:this[e]:Y.call(this)},pushStack:function(e){var t=it.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return it.each(this,e,t)},map:function(e){return this.pushStack(it.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(Y.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:Q,sort:J.sort,splice:J.splice},it.extend=it.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||it.isFunction(a)||(a={}),s===u&&(a=this,s--);u>s;s++)if(null!=(i=arguments[s]))for(r in i)e=a[r],n=i[r],a!==n&&(l&&n&&(it.isPlainObject(n)||(t=it.isArray(n)))?(t?(t=!1,o=e&&it.isArray(e)?e:[]):o=e&&it.isPlainObject(e)?e:{},a[r]=it.extend(l,o,n)):void 0!==n&&(a[r]=n));return a},it.extend({expando:"jQuery"+(rt+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===it.type(e)},isArray:Array.isArray||function(e){return"array"===it.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!it.isArray(e)&&e-parseFloat(e)+1>=0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},isPlainObject:function(e){var t;if(!e||"object"!==it.type(e)||e.nodeType||it.isWindow(e))return!1;try{if(e.constructor&&!tt.call(e,"constructor")&&!tt.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}if(nt.ownLast)for(t in e)return tt.call(e,t);for(t in e);return void 0===t||tt.call(e,t)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?Z[et.call(e)]||"object":typeof e},globalEval:function(t){t&&it.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(at,"ms-").replace(st,ut)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,a=e.length,s=n(e);if(r){if(s)for(;a>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(s)for(;a>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(ot,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?it.merge(r,"string"==typeof e?[e]:e):Q.call(r,e)),r},inArray:function(e,t,n){var r;if(t){if(K)return K.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;n>r;)e[i++]=t[r++];if(n!==n)for(;void 0!==t[r];)e[i++]=t[r++];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;a>o;o++)r=!t(e[o],o),r!==s&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,a=e.length,s=n(e),u=[];if(s)for(;a>o;o++)i=t(e[o],o,r),null!=i&&u.push(i);else for(o in e)i=t(e[o],o,r),null!=i&&u.push(i);return G.apply([],u)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(i=e[t],t=e,e=i),it.isFunction(e)?(n=Y.call(arguments,2),r=function(){return e.apply(t||this,n.concat(Y.call(arguments)))},r.guid=e.guid=e.guid||it.guid++,r):void 0},now:function(){return+new Date},support:nt}),it.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){Z["[object "+t+"]"]=t.toLowerCase()});var lt=function(e){function t(e,t,n,r){var i,o,a,s,u,l,d,p,h,m;if((t?t.ownerDocument||t:R)!==H&&L(t),t=t||H,n=n||[],s=t.nodeType,"string"!=typeof e||!e||1!==s&&9!==s&&11!==s)return n;if(!r&&_){if(11!==s&&(i=yt.exec(e)))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&P(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return K.apply(n,t.getElementsByTagName(e)),n;if((a=i[3])&&w.getElementsByClassName)return K.apply(n,t.getElementsByClassName(a)),n}if(w.qsa&&(!M||!M.test(e))){if(p=d=B,h=t,m=1!==s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){for(l=E(e),(d=t.getAttribute("id"))?p=d.replace(xt,"\\$&"):t.setAttribute("id",p),p="[id='"+p+"'] ",u=l.length;u--;)l[u]=p+f(l[u]);h=bt.test(e)&&c(t.parentNode)||t,m=l.join(",")}if(m)try{return K.apply(n,h.querySelectorAll(m)),n}catch(g){}finally{d||t.removeAttribute("id")}}}return S(e.replace(ut,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>T.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[B]=!0,e}function i(e){var t=H.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=e.length;r--;)T.attrHandle[n[r]]=t}function a(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||V)-(~e.sourceIndex||V);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function s(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function u(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function l(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function c(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function d(){}function f(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function p(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=$++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,a){var s,u,l=[W,o];if(a){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||i){if(u=t[B]||(t[B]={}),(s=u[r])&&s[0]===W&&s[1]===o)return l[2]=s[2];if(u[r]=l,l[2]=e(t,n,a))return!0}}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function m(e,n,r){for(var i=0,o=n.length;o>i;i++)t(e,n[i],r);return r}function g(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function v(e,t,n,i,o,a){return i&&!i[B]&&(i=v(i)),o&&!o[B]&&(o=v(o,a)),r(function(r,a,s,u){var l,c,d,f=[],p=[],h=a.length,v=r||m(t||"*",s.nodeType?[s]:s,[]),y=!e||!r&&t?v:g(v,f,e,s,u),b=n?o||(r?e:h||i)?[]:a:y;if(n&&n(y,b,s,u),i)for(l=g(b,p),i(l,[],s,u),c=l.length;c--;)(d=l[c])&&(b[p[c]]=!(y[p[c]]=d));if(r){if(o||e){if(o){for(l=[],c=b.length;c--;)(d=b[c])&&l.push(y[c]=d);o(null,b=[],l,u)}for(c=b.length;c--;)(d=b[c])&&(l=o?et(r,d):f[c])>-1&&(r[l]=!(a[l]=d))}}else b=g(b===a?b.splice(h,b.length):b),o?o(null,a,b,u):K.apply(a,b)})}function y(e){for(var t,n,r,i=e.length,o=T.relative[e[0].type],a=o||T.relative[" "],s=o?1:0,u=p(function(e){return e===t},a,!0),l=p(function(e){return et(t,e)>-1},a,!0),c=[function(e,n,r){var i=!o&&(r||n!==A)||((t=n).nodeType?u(e,n,r):l(e,n,r));return t=null,i}];i>s;s++)if(n=T.relative[e[s].type])c=[p(h(c),n)];else{if(n=T.filter[e[s].type].apply(null,e[s].matches),n[B]){for(r=++s;i>r&&!T.relative[e[r].type];r++);return v(s>1&&h(c),s>1&&f(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(ut,"$1"),n,r>s&&y(e.slice(s,r)),i>r&&y(e=e.slice(r)),i>r&&f(e))}c.push(n)}return h(c)}function b(e,n){var i=n.length>0,o=e.length>0,a=function(r,a,s,u,l){var c,d,f,p=0,h="0",m=r&&[],v=[],y=A,b=r||o&&T.find.TAG("*",l),x=W+=null==y?1:Math.random()||.1,w=b.length;for(l&&(A=a!==H&&a);h!==w&&null!=(c=b[h]);h++){if(o&&c){for(d=0;f=e[d++];)if(f(c,a,s)){u.push(c);break}l&&(W=x)}i&&((c=!f&&c)&&p--,r&&m.push(c))}if(p+=h,i&&h!==p){for(d=0;f=n[d++];)f(m,v,a,s);if(r){if(p>0)for(;h--;)m[h]||v[h]||(v[h]=G.call(u));v=g(v)}K.apply(u,v),l&&!r&&v.length>0&&p+n.length>1&&t.uniqueSort(u)}return l&&(W=x,A=y),m};return i?r(a):a}var x,w,T,C,N,E,k,S,A,D,j,L,H,q,_,M,F,O,P,B="sizzle"+1*new Date,R=e.document,W=0,$=0,z=n(),I=n(),X=n(),U=function(e,t){return e===t&&(j=!0),0},V=1<<31,J={}.hasOwnProperty,Y=[],G=Y.pop,Q=Y.push,K=Y.push,Z=Y.slice,et=function(e,t){for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1},tt="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",nt="[\\x20\\t\\r\\n\\f]",rt="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",it=rt.replace("w","w#"),ot="\\["+nt+"*("+rt+")(?:"+nt+"*([*^$|!~]?=)"+nt+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+it+"))|)"+nt+"*\\]",at=":("+rt+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ot+")*)|.*)\\)|)",st=new RegExp(nt+"+","g"),ut=new RegExp("^"+nt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+nt+"+$","g"),lt=new RegExp("^"+nt+"*,"+nt+"*"),ct=new RegExp("^"+nt+"*([>+~]|"+nt+")"+nt+"*"),dt=new RegExp("="+nt+"*([^\\]'\"]*?)"+nt+"*\\]","g"),ft=new RegExp(at),pt=new RegExp("^"+it+"$"),ht={ID:new RegExp("^#("+rt+")"),CLASS:new RegExp("^\\.("+rt+")"),TAG:new RegExp("^("+rt.replace("w","w*")+")"),ATTR:new RegExp("^"+ot),PSEUDO:new RegExp("^"+at),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+nt+"*(even|odd|(([+-]|)(\\d*)n|)"+nt+"*(?:([+-]|)"+nt+"*(\\d+)|))"+nt+"*\\)|)","i"),bool:new RegExp("^(?:"+tt+")$","i"),needsContext:new RegExp("^"+nt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+nt+"*((?:-\\d)?\\d*)"+nt+"*\\)|)(?=[^-]|$)","i")},mt=/^(?:input|select|textarea|button)$/i,gt=/^h\d$/i,vt=/^[^{]+\{\s*\[native \w/,yt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,bt=/[+~]/,xt=/'|\\/g,wt=new RegExp("\\\\([\\da-f]{1,6}"+nt+"?|("+nt+")|.)","ig"),Tt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},Ct=function(){L()};try{K.apply(Y=Z.call(R.childNodes),R.childNodes),Y[R.childNodes.length].nodeType}catch(Nt){K={apply:Y.length?function(e,t){Q.apply(e,Z.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}w=t.support={},N=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},L=t.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:R;return r!==H&&9===r.nodeType&&r.documentElement?(H=r,q=r.documentElement,n=r.defaultView,n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",Ct,!1):n.attachEvent&&n.attachEvent("onunload",Ct)),_=!N(r),w.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),w.getElementsByTagName=i(function(e){return e.appendChild(r.createComment("")),!e.getElementsByTagName("*").length}),w.getElementsByClassName=vt.test(r.getElementsByClassName),w.getById=i(function(e){return q.appendChild(e).id=B,!r.getElementsByName||!r.getElementsByName(B).length}),w.getById?(T.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&_){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},T.filter.ID=function(e){var t=e.replace(wt,Tt);return function(e){return e.getAttribute("id")===t}}):(delete T.find.ID,T.filter.ID=function(e){var t=e.replace(wt,Tt);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}}),T.find.TAG=w.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):w.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},T.find.CLASS=w.getElementsByClassName&&function(e,t){return _?t.getElementsByClassName(e):void 0},F=[],M=[],(w.qsa=vt.test(r.querySelectorAll))&&(i(function(e){q.appendChild(e).innerHTML="<a id='"+B+"'></a><select id='"+B+"-\f]' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&M.push("[*^$]="+nt+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||M.push("\\["+nt+"*(?:value|"+tt+")"),e.querySelectorAll("[id~="+B+"-]").length||M.push("~="),e.querySelectorAll(":checked").length||M.push(":checked"),e.querySelectorAll("a#"+B+"+*").length||M.push(".#.+[+~]")}),i(function(e){var t=r.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&M.push("name"+nt+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||M.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),M.push(",.*:")})),(w.matchesSelector=vt.test(O=q.matches||q.webkitMatchesSelector||q.mozMatchesSelector||q.oMatchesSelector||q.msMatchesSelector))&&i(function(e){w.disconnectedMatch=O.call(e,"div"),O.call(e,"[s!='']:x"),F.push("!=",at)}),M=M.length&&new RegExp(M.join("|")),F=F.length&&new RegExp(F.join("|")),t=vt.test(q.compareDocumentPosition),P=t||vt.test(q.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},U=t?function(e,t){if(e===t)return j=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!w.sortDetached&&t.compareDocumentPosition(e)===n?e===r||e.ownerDocument===R&&P(R,e)?-1:t===r||t.ownerDocument===R&&P(R,t)?1:D?et(D,e)-et(D,t):0:4&n?-1:1)}:function(e,t){if(e===t)return j=!0,0;var n,i=0,o=e.parentNode,s=t.parentNode,u=[e],l=[t];if(!o||!s)return e===r?-1:t===r?1:o?-1:s?1:D?et(D,e)-et(D,t):0;if(o===s)return a(e,t);for(n=e;n=n.parentNode;)u.unshift(n);for(n=t;n=n.parentNode;)l.unshift(n);for(;u[i]===l[i];)i++;return i?a(u[i],l[i]):u[i]===R?-1:l[i]===R?1:0},r):H},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==H&&L(e),n=n.replace(dt,"='$1']"),!(!w.matchesSelector||!_||F&&F.test(n)||M&&M.test(n)))try{var r=O.call(e,n);if(r||w.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return t(n,H,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==H&&L(e),P(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==H&&L(e);var n=T.attrHandle[t.toLowerCase()],r=n&&J.call(T.attrHandle,t.toLowerCase())?n(e,t,!_):void 0;return void 0!==r?r:w.attributes||!_?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(j=!w.detectDuplicates,D=!w.sortStable&&e.slice(0),e.sort(U),j){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return D=null,e},C=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=C(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=C(t);return n},T=t.selectors={cacheLength:50,createPseudo:r,match:ht,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(wt,Tt),e[3]=(e[3]||e[4]||e[5]||"").replace(wt,Tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return ht.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&ft.test(n)&&(t=E(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(wt,Tt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=z[e+" "];return t||(t=new RegExp("(^|"+nt+")"+e+"("+nt+"|$)"))&&z(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:n?(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o.replace(st," ")+" ").indexOf(r)>-1:"|="===n?o===r||o.slice(0,r.length+1)===r+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,d,f,p,h,m=o!==a?"nextSibling":"previousSibling",g=t.parentNode,v=s&&t.nodeName.toLowerCase(),y=!u&&!s;if(g){if(o){for(;m;){for(d=t;d=d[m];)if(s?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;h=m="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?g.firstChild:g.lastChild],a&&y){for(c=g[B]||(g[B]={}),l=c[e]||[],p=l[0]===W&&l[1],f=l[0]===W&&l[2],d=p&&g.childNodes[p];d=++p&&d&&d[m]||(f=p=0)||h.pop();)if(1===d.nodeType&&++f&&d===t){c[e]=[W,p,f];break}}else if(y&&(l=(t[B]||(t[B]={}))[e])&&l[0]===W)f=l[1];else for(;(d=++p&&d&&d[m]||(f=p=0)||h.pop())&&((s?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++f||(y&&((d[B]||(d[B]={}))[e]=[W,f]),d!==t)););return f-=i,f===r||f%r===0&&f/r>=0}}},PSEUDO:function(e,n){var i,o=T.pseudos[e]||T.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return o[B]?o(n):o.length>1?(i=[e,e,"",n],T.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),a=i.length;a--;)r=et(e,i[a]),e[r]=!(t[r]=i[a])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=k(e.replace(ut,"$1"));return i[B]?r(function(e,t,n,r){for(var o,a=i(e,null,r,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),t[0]=null,!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return e=e.replace(wt,Tt),function(t){return(t.textContent||t.innerText||C(t)).indexOf(e)>-1}}),lang:r(function(e){return pt.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(wt,Tt).toLowerCase(),function(t){var n;do if(n=_?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===q},focus:function(e){return e===H.activeElement&&(!H.hasFocus||H.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!T.pseudos.empty(e)},header:function(e){return gt.test(e.nodeName)},input:function(e){return mt.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:l(function(){return[0]}),last:l(function(e,t){return[t-1]}),eq:l(function(e,t,n){return[0>n?n+t:n]}),even:l(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:l(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:l(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:l(function(e,t,n){for(var r=0>n?n+t:n;++r<t;)e.push(r);return e})}},T.pseudos.nth=T.pseudos.eq;for(x in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})T.pseudos[x]=s(x);for(x in{submit:!0,reset:!0})T.pseudos[x]=u(x);return d.prototype=T.filters=T.pseudos,T.setFilters=new d,E=t.tokenize=function(e,n){var r,i,o,a,s,u,l,c=I[e+" "];if(c)return n?0:c.slice(0);for(s=e,u=[],l=T.preFilter;s;){(!r||(i=lt.exec(s)))&&(i&&(s=s.slice(i[0].length)||s),u.push(o=[])),r=!1,(i=ct.exec(s))&&(r=i.shift(),o.push({value:r,type:i[0].replace(ut," ")}),s=s.slice(r.length));for(a in T.filter)!(i=ht[a].exec(s))||l[a]&&!(i=l[a](i))||(r=i.shift(),o.push({value:r,type:a,matches:i}),s=s.slice(r.length));
  if(!r)break}return n?s.length:s?t.error(e):I(e,u).slice(0)},k=t.compile=function(e,t){var n,r=[],i=[],o=X[e+" "];if(!o){for(t||(t=E(e)),n=t.length;n--;)o=y(t[n]),o[B]?r.push(o):i.push(o);o=X(e,b(i,r)),o.selector=e}return o},S=t.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,d=!r&&E(e=l.selector||e);if(n=n||[],1===d.length){if(o=d[0]=d[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&w.getById&&9===t.nodeType&&_&&T.relative[o[1].type]){if(t=(T.find.ID(a.matches[0].replace(wt,Tt),t)||[])[0],!t)return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(i=ht.needsContext.test(e)?0:o.length;i--&&(a=o[i],!T.relative[s=a.type]);)if((u=T.find[s])&&(r=u(a.matches[0].replace(wt,Tt),bt.test(o[0].type)&&c(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&f(o),!e)return K.apply(n,r),n;break}}return(l||k(e,d))(r,t,!_,n,bt.test(e)&&c(t.parentNode)||t),n},w.sortStable=B.split("").sort(U).join("")===B,w.detectDuplicates=!!j,L(),w.sortDetached=i(function(e){return 1&e.compareDocumentPosition(H.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),w.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(tt,function(e,t,n){var r;return n?void 0:e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e);it.find=lt,it.expr=lt.selectors,it.expr[":"]=it.expr.pseudos,it.unique=lt.uniqueSort,it.text=lt.getText,it.isXMLDoc=lt.isXML,it.contains=lt.contains;var ct=it.expr.match.needsContext,dt=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,ft=/^.[^:#\[\.,]*$/;it.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?it.find.matchesSelector(r,e)?[r]:[]:it.find.matches(e,it.grep(t,function(e){return 1===e.nodeType}))},it.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(it(e).filter(function(){for(t=0;i>t;t++)if(it.contains(r[t],this))return!0}));for(t=0;i>t;t++)it.find(e,r[t],n);return n=this.pushStack(i>1?it.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},filter:function(e){return this.pushStack(r(this,e||[],!1))},not:function(e){return this.pushStack(r(this,e||[],!0))},is:function(e){return!!r(this,"string"==typeof e&&ct.test(e)?it(e):e||[],!1).length}});var pt,ht=e.document,mt=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,gt=it.fn.init=function(e,t){var n,r;if(!e)return this;if("string"==typeof e){if(n="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:mt.exec(e),!n||!n[1]&&t)return!t||t.jquery?(t||pt).find(e):this.constructor(t).find(e);if(n[1]){if(t=t instanceof it?t[0]:t,it.merge(this,it.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:ht,!0)),dt.test(n[1])&&it.isPlainObject(t))for(n in t)it.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}if(r=ht.getElementById(n[2]),r&&r.parentNode){if(r.id!==n[2])return pt.find(e);this.length=1,this[0]=r}return this.context=ht,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):it.isFunction(e)?"undefined"!=typeof pt.ready?pt.ready(e):e(it):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),it.makeArray(e,this))};gt.prototype=it.fn,pt=it(ht);var vt=/^(?:parents|prev(?:Until|All))/,yt={children:!0,contents:!0,next:!0,prev:!0};it.extend({dir:function(e,t,n){for(var r=[],i=e[t];i&&9!==i.nodeType&&(void 0===n||1!==i.nodeType||!it(i).is(n));)1===i.nodeType&&r.push(i),i=i[t];return r},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}}),it.fn.extend({has:function(e){var t,n=it(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(it.contains(this,n[t]))return!0})},closest:function(e,t){for(var n,r=0,i=this.length,o=[],a=ct.test(e)||"string"!=typeof e?it(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&it.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?it.unique(o):o)},index:function(e){return e?"string"==typeof e?it.inArray(this[0],it(e)):it.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(it.unique(it.merge(this.get(),it(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),it.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return it.dir(e,"parentNode")},parentsUntil:function(e,t,n){return it.dir(e,"parentNode",n)},next:function(e){return i(e,"nextSibling")},prev:function(e){return i(e,"previousSibling")},nextAll:function(e){return it.dir(e,"nextSibling")},prevAll:function(e){return it.dir(e,"previousSibling")},nextUntil:function(e,t,n){return it.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return it.dir(e,"previousSibling",n)},siblings:function(e){return it.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return it.sibling(e.firstChild)},contents:function(e){return it.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:it.merge([],e.childNodes)}},function(e,t){it.fn[e]=function(n,r){var i=it.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=it.filter(r,i)),this.length>1&&(yt[e]||(i=it.unique(i)),vt.test(e)&&(i=i.reverse())),this.pushStack(i)}});var bt=/\S+/g,xt={};it.Callbacks=function(e){e="string"==typeof e?xt[e]||o(e):it.extend({},e);var t,n,r,i,a,s,u=[],l=!e.once&&[],c=function(o){for(n=e.memory&&o,r=!0,a=s||0,s=0,i=u.length,t=!0;u&&i>a;a++)if(u[a].apply(o[0],o[1])===!1&&e.stopOnFalse){n=!1;break}t=!1,u&&(l?l.length&&c(l.shift()):n?u=[]:d.disable())},d={add:function(){if(u){var r=u.length;!function o(t){it.each(t,function(t,n){var r=it.type(n);"function"===r?e.unique&&d.has(n)||u.push(n):n&&n.length&&"string"!==r&&o(n)})}(arguments),t?i=u.length:n&&(s=r,c(n))}return this},remove:function(){return u&&it.each(arguments,function(e,n){for(var r;(r=it.inArray(n,u,r))>-1;)u.splice(r,1),t&&(i>=r&&i--,a>=r&&a--)}),this},has:function(e){return e?it.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],i=0,this},disable:function(){return u=l=n=void 0,this},disabled:function(){return!u},lock:function(){return l=void 0,n||d.disable(),this},locked:function(){return!l},fireWith:function(e,n){return!u||r&&!l||(n=n||[],n=[e,n.slice?n.slice():n],t?l.push(n):c(n)),this},fire:function(){return d.fireWith(this,arguments),this},fired:function(){return!!r}};return d},it.extend({Deferred:function(e){var t=[["resolve","done",it.Callbacks("once memory"),"resolved"],["reject","fail",it.Callbacks("once memory"),"rejected"],["notify","progress",it.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return it.Deferred(function(n){it.each(t,function(t,o){var a=it.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&it.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?it.extend(e,r):r}},i={};return r.pipe=r.then,it.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=Y.call(arguments),a=o.length,s=1!==a||e&&it.isFunction(e.promise)?a:0,u=1===s?e:it.Deferred(),l=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?Y.call(arguments):i,r===t?u.notifyWith(n,r):--s||u.resolveWith(n,r)}};if(a>1)for(t=new Array(a),n=new Array(a),r=new Array(a);a>i;i++)o[i]&&it.isFunction(o[i].promise)?o[i].promise().done(l(i,r,o)).fail(u.reject).progress(l(i,n,t)):--s;return s||u.resolveWith(r,o),u.promise()}});var wt;it.fn.ready=function(e){return it.ready.promise().done(e),this},it.extend({isReady:!1,readyWait:1,holdReady:function(e){e?it.readyWait++:it.ready(!0)},ready:function(e){if(e===!0?!--it.readyWait:!it.isReady){if(!ht.body)return setTimeout(it.ready);it.isReady=!0,e!==!0&&--it.readyWait>0||(wt.resolveWith(ht,[it]),it.fn.triggerHandler&&(it(ht).triggerHandler("ready"),it(ht).off("ready")))}}}),it.ready.promise=function(t){if(!wt)if(wt=it.Deferred(),"complete"===ht.readyState)setTimeout(it.ready);else if(ht.addEventListener)ht.addEventListener("DOMContentLoaded",s,!1),e.addEventListener("load",s,!1);else{ht.attachEvent("onreadystatechange",s),e.attachEvent("onload",s);var n=!1;try{n=null==e.frameElement&&ht.documentElement}catch(r){}n&&n.doScroll&&!function i(){if(!it.isReady){try{n.doScroll("left")}catch(e){return setTimeout(i,50)}a(),it.ready()}}()}return wt.promise(t)};var Tt,Ct="undefined";for(Tt in it(nt))break;nt.ownLast="0"!==Tt,nt.inlineBlockNeedsLayout=!1,it(function(){var e,t,n,r;n=ht.getElementsByTagName("body")[0],n&&n.style&&(t=ht.createElement("div"),r=ht.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(r).appendChild(t),typeof t.style.zoom!==Ct&&(t.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",nt.inlineBlockNeedsLayout=e=3===t.offsetWidth,e&&(n.style.zoom=1)),n.removeChild(r))}),function(){var e=ht.createElement("div");if(null==nt.deleteExpando){nt.deleteExpando=!0;try{delete e.test}catch(t){nt.deleteExpando=!1}}e=null}(),it.acceptData=function(e){var t=it.noData[(e.nodeName+" ").toLowerCase()],n=+e.nodeType||1;return 1!==n&&9!==n?!1:!t||t!==!0&&e.getAttribute("classid")===t};var Nt=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Et=/([A-Z])/g;it.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?it.cache[e[it.expando]]:e[it.expando],!!e&&!l(e)},data:function(e,t,n){return c(e,t,n)},removeData:function(e,t){return d(e,t)},_data:function(e,t,n){return c(e,t,n,!0)},_removeData:function(e,t){return d(e,t,!0)}}),it.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=it.data(o),1===o.nodeType&&!it._data(o,"parsedAttrs"))){for(n=a.length;n--;)a[n]&&(r=a[n].name,0===r.indexOf("data-")&&(r=it.camelCase(r.slice(5)),u(o,r,i[r])));it._data(o,"parsedAttrs",!0)}return i}return"object"==typeof e?this.each(function(){it.data(this,e)}):arguments.length>1?this.each(function(){it.data(this,e,t)}):o?u(o,e,it.data(o,e)):void 0},removeData:function(e){return this.each(function(){it.removeData(this,e)})}}),it.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=it._data(e,t),n&&(!r||it.isArray(n)?r=it._data(e,t,it.makeArray(n)):r.push(n)),r||[]):void 0},dequeue:function(e,t){t=t||"fx";var n=it.queue(e,t),r=n.length,i=n.shift(),o=it._queueHooks(e,t),a=function(){it.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return it._data(e,n)||it._data(e,n,{empty:it.Callbacks("once memory").add(function(){it._removeData(e,t+"queue"),it._removeData(e,n)})})}}),it.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?it.queue(this[0],e):void 0===t?this:this.each(function(){var n=it.queue(this,e,t);it._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&it.dequeue(this,e)})},dequeue:function(e){return this.each(function(){it.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=it.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";a--;)n=it._data(o[a],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var kt=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,St=["Top","Right","Bottom","Left"],At=function(e,t){return e=t||e,"none"===it.css(e,"display")||!it.contains(e.ownerDocument,e)},Dt=it.access=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===it.type(n)){i=!0;for(s in n)it.access(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,it.isFunction(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(it(e),n)})),t))for(;u>s;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},jt=/^(?:checkbox|radio)$/i;!function(){var e=ht.createElement("input"),t=ht.createElement("div"),n=ht.createDocumentFragment();if(t.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",nt.leadingWhitespace=3===t.firstChild.nodeType,nt.tbody=!t.getElementsByTagName("tbody").length,nt.htmlSerialize=!!t.getElementsByTagName("link").length,nt.html5Clone="<:nav></:nav>"!==ht.createElement("nav").cloneNode(!0).outerHTML,e.type="checkbox",e.checked=!0,n.appendChild(e),nt.appendChecked=e.checked,t.innerHTML="<textarea>x</textarea>",nt.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue,n.appendChild(t),t.innerHTML="<input type='radio' checked='checked' name='t'/>",nt.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,nt.noCloneEvent=!0,t.attachEvent&&(t.attachEvent("onclick",function(){nt.noCloneEvent=!1}),t.cloneNode(!0).click()),null==nt.deleteExpando){nt.deleteExpando=!0;try{delete t.test}catch(r){nt.deleteExpando=!1}}}(),function(){var t,n,r=ht.createElement("div");for(t in{submit:!0,change:!0,focusin:!0})n="on"+t,(nt[t+"Bubbles"]=n in e)||(r.setAttribute(n,"t"),nt[t+"Bubbles"]=r.attributes[n].expando===!1);r=null}();var Lt=/^(?:input|select|textarea)$/i,Ht=/^key/,qt=/^(?:mouse|pointer|contextmenu)|click/,_t=/^(?:focusinfocus|focusoutblur)$/,Mt=/^([^.]*)(?:\.(.+)|)$/;it.event={global:{},add:function(e,t,n,r,i){var o,a,s,u,l,c,d,f,p,h,m,g=it._data(e);if(g){for(n.handler&&(u=n,n=u.handler,i=u.selector),n.guid||(n.guid=it.guid++),(a=g.events)||(a=g.events={}),(c=g.handle)||(c=g.handle=function(e){return typeof it===Ct||e&&it.event.triggered===e.type?void 0:it.event.dispatch.apply(c.elem,arguments)},c.elem=e),t=(t||"").match(bt)||[""],s=t.length;s--;)o=Mt.exec(t[s])||[],p=m=o[1],h=(o[2]||"").split(".").sort(),p&&(l=it.event.special[p]||{},p=(i?l.delegateType:l.bindType)||p,l=it.event.special[p]||{},d=it.extend({type:p,origType:m,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&it.expr.match.needsContext.test(i),namespace:h.join(".")},u),(f=a[p])||(f=a[p]=[],f.delegateCount=0,l.setup&&l.setup.call(e,r,h,c)!==!1||(e.addEventListener?e.addEventListener(p,c,!1):e.attachEvent&&e.attachEvent("on"+p,c))),l.add&&(l.add.call(e,d),d.handler.guid||(d.handler.guid=n.guid)),i?f.splice(f.delegateCount++,0,d):f.push(d),it.event.global[p]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,d,f,p,h,m,g=it.hasData(e)&&it._data(e);if(g&&(c=g.events)){for(t=(t||"").match(bt)||[""],l=t.length;l--;)if(s=Mt.exec(t[l])||[],p=m=s[1],h=(s[2]||"").split(".").sort(),p){for(d=it.event.special[p]||{},p=(r?d.delegateType:d.bindType)||p,f=c[p]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;o--;)a=f[o],!i&&m!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,d.remove&&d.remove.call(e,a));u&&!f.length&&(d.teardown&&d.teardown.call(e,h,g.handle)!==!1||it.removeEvent(e,p,g.handle),delete c[p])}else for(p in c)it.event.remove(e,p+t[l],n,r,!0);it.isEmptyObject(c)&&(delete g.handle,it._removeData(e,"events"))}},trigger:function(t,n,r,i){var o,a,s,u,l,c,d,f=[r||ht],p=tt.call(t,"type")?t.type:t,h=tt.call(t,"namespace")?t.namespace.split("."):[];if(s=c=r=r||ht,3!==r.nodeType&&8!==r.nodeType&&!_t.test(p+it.event.triggered)&&(p.indexOf(".")>=0&&(h=p.split("."),p=h.shift(),h.sort()),a=p.indexOf(":")<0&&"on"+p,t=t[it.expando]?t:new it.Event(p,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=h.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=r),n=null==n?[t]:it.makeArray(n,[t]),l=it.event.special[p]||{},i||!l.trigger||l.trigger.apply(r,n)!==!1)){if(!i&&!l.noBubble&&!it.isWindow(r)){for(u=l.delegateType||p,_t.test(u+p)||(s=s.parentNode);s;s=s.parentNode)f.push(s),c=s;c===(r.ownerDocument||ht)&&f.push(c.defaultView||c.parentWindow||e)}for(d=0;(s=f[d++])&&!t.isPropagationStopped();)t.type=d>1?u:l.bindType||p,o=(it._data(s,"events")||{})[t.type]&&it._data(s,"handle"),o&&o.apply(s,n),o=a&&s[a],o&&o.apply&&it.acceptData(s)&&(t.result=o.apply(s,n),t.result===!1&&t.preventDefault());if(t.type=p,!i&&!t.isDefaultPrevented()&&(!l._default||l._default.apply(f.pop(),n)===!1)&&it.acceptData(r)&&a&&r[p]&&!it.isWindow(r)){c=r[a],c&&(r[a]=null),it.event.triggered=p;try{r[p]()}catch(m){}it.event.triggered=void 0,c&&(r[a]=c)}return t.result}},dispatch:function(e){e=it.event.fix(e);var t,n,r,i,o,a=[],s=Y.call(arguments),u=(it._data(this,"events")||{})[e.type]||[],l=it.event.special[e.type]||{};if(s[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){for(a=it.event.handlers.call(this,e,u),t=0;(i=a[t++])&&!e.isPropagationStopped();)for(e.currentTarget=i.elem,o=0;(r=i.handlers[o++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(r.namespace))&&(e.handleObj=r,e.data=r.data,n=((it.event.special[r.origType]||{}).handle||r.handler).apply(i.elem,s),void 0!==n&&(e.result=n)===!1&&(e.preventDefault(),e.stopPropagation()));return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,a=[],s=t.delegateCount,u=e.target;if(s&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!=this;u=u.parentNode||this)if(1===u.nodeType&&(u.disabled!==!0||"click"!==e.type)){for(i=[],o=0;s>o;o++)r=t[o],n=r.selector+" ",void 0===i[n]&&(i[n]=r.needsContext?it(n,this).index(u)>=0:it.find(n,this,null,[u]).length),i[n]&&i.push(r);i.length&&a.push({elem:u,handlers:i})}return s<t.length&&a.push({elem:this,handlers:t.slice(s)}),a},fix:function(e){if(e[it.expando])return e;var t,n,r,i=e.type,o=e,a=this.fixHooks[i];for(a||(this.fixHooks[i]=a=qt.test(i)?this.mouseHooks:Ht.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new it.Event(o),t=r.length;t--;)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||ht),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,a.filter?a.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,o=t.button,a=t.fromElement;return null==e.pageX&&null!=t.clientX&&(r=e.target.ownerDocument||ht,i=r.documentElement,n=r.body,e.pageX=t.clientX+(i&&i.scrollLeft||n&&n.scrollLeft||0)-(i&&i.clientLeft||n&&n.clientLeft||0),e.pageY=t.clientY+(i&&i.scrollTop||n&&n.scrollTop||0)-(i&&i.clientTop||n&&n.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?t.toElement:a),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==h()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===h()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return it.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(e){return it.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=it.extend(new it.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?it.event.trigger(i,null,t):it.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},it.removeEvent=ht.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===Ct&&(e[r]=null),e.detachEvent(r,n))},it.Event=function(e,t){return this instanceof it.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?f:p):this.type=e,t&&it.extend(this,t),this.timeStamp=e&&e.timeStamp||it.now(),void(this[it.expando]=!0)):new it.Event(e,t)},it.Event.prototype={isDefaultPrevented:p,isPropagationStopped:p,isImmediatePropagationStopped:p,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=f,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=f,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=f,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},it.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){it.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!it.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),nt.submitBubbles||(it.event.special.submit={setup:function(){return it.nodeName(this,"form")?!1:void it.event.add(this,"click._submit keypress._submit",function(e){var t=e.target,n=it.nodeName(t,"input")||it.nodeName(t,"button")?t.form:void 0;n&&!it._data(n,"submitBubbles")&&(it.event.add(n,"submit._submit",function(e){e._submit_bubble=!0}),it._data(n,"submitBubbles",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&it.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return it.nodeName(this,"form")?!1:void it.event.remove(this,"._submit")}}),nt.changeBubbles||(it.event.special.change={setup:function(){return Lt.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(it.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),it.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),it.event.simulate("change",this,e,!0)})),!1):void it.event.add(this,"beforeactivate._change",function(e){var t=e.target;Lt.test(t.nodeName)&&!it._data(t,"changeBubbles")&&(it.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||it.event.simulate("change",this.parentNode,e,!0)}),it._data(t,"changeBubbles",!0))})},handle:function(e){var t=e.target;return this!==t||e.isSimulated||e.isTrigger||"radio"!==t.type&&"checkbox"!==t.type?e.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return it.event.remove(this,"._change"),!Lt.test(this.nodeName)}}),nt.focusinBubbles||it.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){it.event.simulate(t,e.target,it.event.fix(e),!0)};it.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=it._data(r,t);i||r.addEventListener(e,n,!0),it._data(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=it._data(r,t)-1;i?it._data(r,t,i):(r.removeEventListener(e,n,!0),it._removeData(r,t))}}}),it.fn.extend({on:function(e,t,n,r,i){var o,a;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=void 0);for(o in e)this.on(o,t,n,e[o],i);return this}if(null==n&&null==r?(r=t,n=t=void 0):null==r&&("string"==typeof t?(r=n,n=void 0):(r=n,n=t,t=void 0)),r===!1)r=p;else if(!r)return this;return 1===i&&(a=r,r=function(e){return it().off(e),a.apply(this,arguments)},r.guid=a.guid||(a.guid=it.guid++)),this.each(function(){it.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,it(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=void 0),n===!1&&(n=p),this.each(function(){it.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){it.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?it.event.trigger(e,t,n,!0):void 0}});var Ft="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",Ot=/ jQuery\d+="(?:null|\d+)"/g,Pt=new RegExp("<(?:"+Ft+")[\\s/>]","i"),Bt=/^\s+/,Rt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Wt=/<([\w:]+)/,$t=/<tbody/i,zt=/<|&#?\w+;/,It=/<(?:script|style|link)/i,Xt=/checked\s*(?:[^=]|=\s*.checked.)/i,Ut=/^$|\/(?:java|ecma)script/i,Vt=/^true\/(.*)/,Jt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Yt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:nt.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},Gt=m(ht),Qt=Gt.appendChild(ht.createElement("div"));Yt.optgroup=Yt.option,Yt.tbody=Yt.tfoot=Yt.colgroup=Yt.caption=Yt.thead,Yt.th=Yt.td,it.extend({clone:function(e,t,n){var r,i,o,a,s,u=it.contains(e.ownerDocument,e);if(nt.html5Clone||it.isXMLDoc(e)||!Pt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Qt.innerHTML=e.outerHTML,Qt.removeChild(o=Qt.firstChild)),!(nt.noCloneEvent&&nt.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||it.isXMLDoc(e)))for(r=g(o),s=g(e),a=0;null!=(i=s[a]);++a)r[a]&&C(i,r[a]);if(t)if(n)for(s=s||g(e),r=r||g(o),a=0;null!=(i=s[a]);a++)T(i,r[a]);else T(e,o);return r=g(o,"script"),r.length>0&&w(r,!u&&g(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){for(var i,o,a,s,u,l,c,d=e.length,f=m(t),p=[],h=0;d>h;h++)if(o=e[h],o||0===o)if("object"===it.type(o))it.merge(p,o.nodeType?[o]:o);else if(zt.test(o)){for(s=s||f.appendChild(t.createElement("div")),u=(Wt.exec(o)||["",""])[1].toLowerCase(),c=Yt[u]||Yt._default,s.innerHTML=c[1]+o.replace(Rt,"<$1></$2>")+c[2],i=c[0];i--;)s=s.lastChild;if(!nt.leadingWhitespace&&Bt.test(o)&&p.push(t.createTextNode(Bt.exec(o)[0])),!nt.tbody)for(o="table"!==u||$t.test(o)?"<table>"!==c[1]||$t.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;i--;)it.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l);for(it.merge(p,s.childNodes),s.textContent="";s.firstChild;)s.removeChild(s.firstChild);s=f.lastChild}else p.push(t.createTextNode(o));for(s&&f.removeChild(s),nt.appendChecked||it.grep(g(p,"input"),v),h=0;o=p[h++];)if((!r||-1===it.inArray(o,r))&&(a=it.contains(o.ownerDocument,o),s=g(f.appendChild(o),"script"),a&&w(s),n))for(i=0;o=s[i++];)Ut.test(o.type||"")&&n.push(o);return s=null,f},cleanData:function(e,t){for(var n,r,i,o,a=0,s=it.expando,u=it.cache,l=nt.deleteExpando,c=it.event.special;null!=(n=e[a]);a++)if((t||it.acceptData(n))&&(i=n[s],o=i&&u[i])){if(o.events)for(r in o.events)c[r]?it.event.remove(n,r):it.removeEvent(n,r,o.handle);u[i]&&(delete u[i],l?delete n[s]:typeof n.removeAttribute!==Ct?n.removeAttribute(s):n[s]=null,J.push(i))}}}),it.fn.extend({text:function(e){return Dt(this,function(e){return void 0===e?it.text(this):this.empty().append((this[0]&&this[0].ownerDocument||ht).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=y(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=y(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=e?it.filter(e,this):this,i=0;null!=(n=r[i]);i++)t||1!==n.nodeType||it.cleanData(g(n)),n.parentNode&&(t&&it.contains(n.ownerDocument,n)&&w(g(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++){for(1===e.nodeType&&it.cleanData(g(e,!1));e.firstChild;)e.removeChild(e.firstChild);e.options&&it.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return it.clone(this,e,t)})},html:function(e){return Dt(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e)return 1===t.nodeType?t.innerHTML.replace(Ot,""):void 0;if(!("string"!=typeof e||It.test(e)||!nt.htmlSerialize&&Pt.test(e)||!nt.leadingWhitespace&&Bt.test(e)||Yt[(Wt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(Rt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(it.cleanData(g(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=arguments[0];return this.domManip(arguments,function(t){e=this.parentNode,it.cleanData(g(this)),e&&e.replaceChild(t,this)}),e&&(e.length||e.nodeType)?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t){e=G.apply([],e);var n,r,i,o,a,s,u=0,l=this.length,c=this,d=l-1,f=e[0],p=it.isFunction(f);if(p||l>1&&"string"==typeof f&&!nt.checkClone&&Xt.test(f))return this.each(function(n){var r=c.eq(n);p&&(e[0]=f.call(this,n,r.html())),r.domManip(e,t)});if(l&&(s=it.buildFragment(e,this[0].ownerDocument,!1,this),n=s.firstChild,1===s.childNodes.length&&(s=n),n)){for(o=it.map(g(s,"script"),b),i=o.length;l>u;u++)r=s,u!==d&&(r=it.clone(r,!0,!0),i&&it.merge(o,g(r,"script"))),t.call(this[u],r,u);if(i)for(a=o[o.length-1].ownerDocument,it.map(o,x),u=0;i>u;u++)r=o[u],Ut.test(r.type||"")&&!it._data(r,"globalEval")&&it.contains(a,r)&&(r.src?it._evalUrl&&it._evalUrl(r.src):it.globalEval((r.text||r.textContent||r.innerHTML||"").replace(Jt,"")));s=n=null}return this}}),it.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){it.fn[e]=function(e){for(var n,r=0,i=[],o=it(e),a=o.length-1;a>=r;r++)n=r===a?this:this.clone(!0),it(o[r])[t](n),Q.apply(i,n.get());return this.pushStack(i)}});var Kt,Zt={};!function(){var e;nt.shrinkWrapBlocks=function(){if(null!=e)return e;e=!1;var t,n,r;return n=ht.getElementsByTagName("body")[0],n&&n.style?(t=ht.createElement("div"),r=ht.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(r).appendChild(t),typeof t.style.zoom!==Ct&&(t.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",t.appendChild(ht.createElement("div")).style.width="5px",e=3!==t.offsetWidth),n.removeChild(r),e):void 0}}();var en,tn,nn=/^margin/,rn=new RegExp("^("+kt+")(?!px)[a-z%]+$","i"),on=/^(top|right|bottom|left)$/;e.getComputedStyle?(en=function(t){return t.ownerDocument.defaultView.opener?t.ownerDocument.defaultView.getComputedStyle(t,null):e.getComputedStyle(t,null)},tn=function(e,t,n){var r,i,o,a,s=e.style;return n=n||en(e),a=n?n.getPropertyValue(t)||n[t]:void 0,n&&(""!==a||it.contains(e.ownerDocument,e)||(a=it.style(e,t)),rn.test(a)&&nn.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0===a?a:a+""}):ht.documentElement.currentStyle&&(en=function(e){return e.currentStyle},tn=function(e,t,n){var r,i,o,a,s=e.style;return n=n||en(e),a=n?n[t]:void 0,null==a&&s&&s[t]&&(a=s[t]),rn.test(a)&&!on.test(t)&&(r=s.left,i=e.runtimeStyle,o=i&&i.left,o&&(i.left=e.currentStyle.left),s.left="fontSize"===t?"1em":a,a=s.pixelLeft+"px",s.left=r,o&&(i.left=o)),void 0===a?a:a+""||"auto"}),function(){function t(){var t,n,r,i;n=ht.getElementsByTagName("body")[0],n&&n.style&&(t=ht.createElement("div"),r=ht.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(r).appendChild(t),t.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",o=a=!1,u=!0,e.getComputedStyle&&(o="1%"!==(e.getComputedStyle(t,null)||{}).top,a="4px"===(e.getComputedStyle(t,null)||{width:"4px"}).width,i=t.appendChild(ht.createElement("div")),i.style.cssText=t.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",t.style.width="1px",u=!parseFloat((e.getComputedStyle(i,null)||{}).marginRight),t.removeChild(i)),t.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=t.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",s=0===i[0].offsetHeight,s&&(i[0].style.display="",i[1].style.display="none",s=0===i[0].offsetHeight),n.removeChild(r))}var n,r,i,o,a,s,u;n=ht.createElement("div"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",i=n.getElementsByTagName("a")[0],r=i&&i.style,r&&(r.cssText="float:left;opacity:.5",nt.opacity="0.5"===r.opacity,nt.cssFloat=!!r.cssFloat,n.style.backgroundClip="content-box",n.cloneNode(!0).style.backgroundClip="",nt.clearCloneStyle="content-box"===n.style.backgroundClip,nt.boxSizing=""===r.boxSizing||""===r.MozBoxSizing||""===r.WebkitBoxSizing,it.extend(nt,{reliableHiddenOffsets:function(){return null==s&&t(),s},boxSizingReliable:function(){return null==a&&t(),a},pixelPosition:function(){return null==o&&t(),o},reliableMarginRight:function(){return null==u&&t(),u}}))}(),it.swap=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i};var an=/alpha\([^)]*\)/i,sn=/opacity\s*=\s*([^)]*)/,un=/^(none|table(?!-c[ea]).+)/,ln=new RegExp("^("+kt+")(.*)$","i"),cn=new RegExp("^([+-])=("+kt+")","i"),dn={position:"absolute",visibility:"hidden",display:"block"},fn={letterSpacing:"0",fontWeight:"400"},pn=["Webkit","O","Moz","ms"];it.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=tn(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":nt.cssFloat?"cssFloat":"styleFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=it.camelCase(t),u=e.style;if(t=it.cssProps[s]||(it.cssProps[s]=S(u,s)),a=it.cssHooks[t]||it.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:u[t];if(o=typeof n,"string"===o&&(i=cn.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(it.css(e,t)),o="number"),null!=n&&n===n&&("number"!==o||it.cssNumber[s]||(n+="px"),nt.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),!(a&&"set"in a&&void 0===(n=a.set(e,n,r)))))try{u[t]=n}catch(l){}}},css:function(e,t,n,r){var i,o,a,s=it.camelCase(t);return t=it.cssProps[s]||(it.cssProps[s]=S(e.style,s)),a=it.cssHooks[t]||it.cssHooks[s],a&&"get"in a&&(o=a.get(e,!0,n)),void 0===o&&(o=tn(e,t,r)),"normal"===o&&t in fn&&(o=fn[t]),""===n||n?(i=parseFloat(o),n===!0||it.isNumeric(i)?i||0:o):o}}),it.each(["height","width"],function(e,t){it.cssHooks[t]={get:function(e,n,r){return n?un.test(it.css(e,"display"))&&0===e.offsetWidth?it.swap(e,dn,function(){return L(e,t,r)}):L(e,t,r):void 0},set:function(e,n,r){var i=r&&en(e);return D(e,n,r?j(e,t,r,nt.boxSizing&&"border-box"===it.css(e,"boxSizing",!1,i),i):0)}}}),nt.opacity||(it.cssHooks.opacity={get:function(e,t){return sn.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=it.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===it.trim(o.replace(an,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=an.test(o)?o.replace(an,i):o+" "+i)}}),it.cssHooks.marginRight=k(nt.reliableMarginRight,function(e,t){return t?it.swap(e,{display:"inline-block"},tn,[e,"marginRight"]):void 0}),it.each({margin:"",padding:"",border:"Width"},function(e,t){it.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+St[r]+t]=o[r]||o[r-2]||o[0];return i}},nn.test(e)||(it.cssHooks[e+t].set=D)}),it.fn.extend({css:function(e,t){return Dt(this,function(e,t,n){var r,i,o={},a=0;if(it.isArray(t)){for(r=en(e),i=t.length;i>a;a++)o[t[a]]=it.css(e,t[a],!1,r);return o}return void 0!==n?it.style(e,t,n):it.css(e,t)},e,t,arguments.length>1)},show:function(){return A(this,!0)},hide:function(){return A(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){At(this)?it(this).show():it(this).hide()})}}),it.Tween=H,H.prototype={constructor:H,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(it.cssNumber[n]?"":"px")},cur:function(){var e=H.propHooks[this.prop];return e&&e.get?e.get(this):H.propHooks._default.get(this)},run:function(e){var t,n=H.propHooks[this.prop];return this.pos=t=this.options.duration?it.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):H.propHooks._default.set(this),this}},H.prototype.init.prototype=H.prototype,H.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=it.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){it.fx.step[e.prop]?it.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[it.cssProps[e.prop]]||it.cssHooks[e.prop])?it.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},H.propHooks.scrollTop=H.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},it.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},it.fx=H.prototype.init,it.fx.step={};var hn,mn,gn=/^(?:toggle|show|hide)$/,vn=new RegExp("^(?:([+-])=|)("+kt+")([a-z%]*)$","i"),yn=/queueHooks$/,bn=[F],xn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=vn.exec(t),o=i&&i[3]||(it.cssNumber[e]?"":"px"),a=(it.cssNumber[e]||"px"!==o&&+r)&&vn.exec(it.css(n.elem,e)),s=1,u=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,it.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--u)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};it.Animation=it.extend(P,{tweener:function(e,t){it.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],xn[n]=xn[n]||[],xn[n].unshift(t)},prefilter:function(e,t){t?bn.unshift(e):bn.push(e)}}),it.speed=function(e,t,n){var r=e&&"object"==typeof e?it.extend({},e):{complete:n||!n&&t||it.isFunction(e)&&e,duration:e,easing:n&&t||t&&!it.isFunction(t)&&t};return r.duration=it.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in it.fx.speeds?it.fx.speeds[r.duration]:it.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){it.isFunction(r.old)&&r.old.call(this),r.queue&&it.dequeue(this,r.queue)},r},it.fn.extend({fadeTo:function(e,t,n,r){return this.filter(At).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=it.isEmptyObject(e),o=it.speed(t,n,r),a=function(){var t=P(this,it.extend({},e),o);(i||it._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=it.timers,a=it._data(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&yn.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&it.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=it._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=it.timers,a=r?r.length:0;for(n.finish=!0,it.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),it.each(["toggle","show","hide"],function(e,t){var n=it.fn[t];it.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(_(t,!0),e,r,i)}}),it.each({slideDown:_("show"),slideUp:_("hide"),slideToggle:_("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){it.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),it.timers=[],it.fx.tick=function(){var e,t=it.timers,n=0;for(hn=it.now();n<t.length;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||it.fx.stop(),hn=void 0},it.fx.timer=function(e){it.timers.push(e),e()?it.fx.start():it.timers.pop()},it.fx.interval=13,it.fx.start=function(){mn||(mn=setInterval(it.fx.tick,it.fx.interval))},it.fx.stop=function(){clearInterval(mn),mn=null},it.fx.speeds={slow:600,fast:200,_default:400},it.fn.delay=function(e,t){return e=it.fx?it.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},function(){var e,t,n,r,i;t=ht.createElement("div"),t.setAttribute("className","t"),t.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",r=t.getElementsByTagName("a")[0],n=ht.createElement("select"),i=n.appendChild(ht.createElement("option")),e=t.getElementsByTagName("input")[0],r.style.cssText="top:1px",nt.getSetAttribute="t"!==t.className,nt.style=/top/.test(r.getAttribute("style")),nt.hrefNormalized="/a"===r.getAttribute("href"),nt.checkOn=!!e.value,nt.optSelected=i.selected,nt.enctype=!!ht.createElement("form").enctype,n.disabled=!0,nt.optDisabled=!i.disabled,e=ht.createElement("input"),e.setAttribute("value",""),nt.input=""===e.getAttribute("value"),e.value="t",e.setAttribute("type","radio"),nt.radioValue="t"===e.value}();var wn=/\r/g;it.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=it.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,it(this).val()):e,null==i?i="":"number"==typeof i?i+="":it.isArray(i)&&(i=it.map(i,function(e){return null==e?"":e+""})),t=it.valHooks[this.type]||it.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return t=it.valHooks[i.type]||it.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(wn,""):null==n?"":n)}}}),it.extend({valHooks:{option:{get:function(e){var t=it.find.attr(e,"value");return null!=t?t:it.trim(it.text(e))}},select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(nt.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&it.nodeName(n.parentNode,"optgroup"))){if(t=it(n).val(),o)return t;a.push(t)}return a},set:function(e,t){for(var n,r,i=e.options,o=it.makeArray(t),a=i.length;a--;)if(r=i[a],it.inArray(it.valHooks.option.get(r),o)>=0)try{r.selected=n=!0}catch(s){r.scrollHeight}else r.selected=!1;return n||(e.selectedIndex=-1),i}}}}),it.each(["radio","checkbox"],function(){it.valHooks[this]={set:function(e,t){return it.isArray(t)?e.checked=it.inArray(it(e).val(),t)>=0:void 0}},nt.checkOn||(it.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Tn,Cn,Nn=it.expr.attrHandle,En=/^(?:checked|selected)$/i,kn=nt.getSetAttribute,Sn=nt.input;it.fn.extend({attr:function(e,t){return Dt(this,it.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){it.removeAttr(this,e)})}}),it.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(e&&3!==o&&8!==o&&2!==o)return typeof e.getAttribute===Ct?it.prop(e,t,n):(1===o&&it.isXMLDoc(e)||(t=t.toLowerCase(),r=it.attrHooks[t]||(it.expr.match.bool.test(t)?Cn:Tn)),void 0===n?r&&"get"in r&&null!==(i=r.get(e,t))?i:(i=it.find.attr(e,t),null==i?void 0:i):null!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:(e.setAttribute(t,n+""),n):void it.removeAttr(e,t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(bt);if(o&&1===e.nodeType)for(;n=o[i++];)r=it.propFix[n]||n,it.expr.match.bool.test(n)?Sn&&kn||!En.test(n)?e[r]=!1:e[it.camelCase("default-"+n)]=e[r]=!1:it.attr(e,n,""),e.removeAttribute(kn?n:r)},attrHooks:{type:{set:function(e,t){if(!nt.radioValue&&"radio"===t&&it.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}}}),Cn={set:function(e,t,n){return t===!1?it.removeAttr(e,n):Sn&&kn||!En.test(n)?e.setAttribute(!kn&&it.propFix[n]||n,n):e[it.camelCase("default-"+n)]=e[n]=!0,n}},it.each(it.expr.match.bool.source.match(/\w+/g),function(e,t){var n=Nn[t]||it.find.attr;Nn[t]=Sn&&kn||!En.test(t)?function(e,t,r){var i,o;return r||(o=Nn[t],Nn[t]=i,i=null!=n(e,t,r)?t.toLowerCase():null,Nn[t]=o),i}:function(e,t,n){return n?void 0:e[it.camelCase("default-"+t)]?t.toLowerCase():null}}),Sn&&kn||(it.attrHooks.value={set:function(e,t,n){return it.nodeName(e,"input")?void(e.defaultValue=t):Tn&&Tn.set(e,t,n)}}),kn||(Tn={set:function(e,t,n){var r=e.getAttributeNode(n);return r||e.setAttributeNode(r=e.ownerDocument.createAttribute(n)),r.value=t+="","value"===n||t===e.getAttribute(n)?t:void 0}},Nn.id=Nn.name=Nn.coords=function(e,t,n){var r;return n?void 0:(r=e.getAttributeNode(t))&&""!==r.value?r.value:null},it.valHooks.button={get:function(e,t){var n=e.getAttributeNode(t);return n&&n.specified?n.value:void 0},set:Tn.set},it.attrHooks.contenteditable={set:function(e,t,n){Tn.set(e,""===t?!1:t,n)}},it.each(["width","height"],function(e,t){it.attrHooks[t]={set:function(e,n){return""===n?(e.setAttribute(t,"auto"),n):void 0}}})),nt.style||(it.attrHooks.style={get:function(e){return e.style.cssText||void 0},set:function(e,t){return e.style.cssText=t+""}});var An=/^(?:input|select|textarea|button|object)$/i,Dn=/^(?:a|area)$/i;it.fn.extend({prop:function(e,t){return Dt(this,it.prop,e,t,arguments.length>1)},removeProp:function(e){return e=it.propFix[e]||e,this.each(function(){try{this[e]=void 0,delete this[e]}catch(t){}})}}),it.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,a=e.nodeType;if(e&&3!==a&&8!==a&&2!==a)return o=1!==a||!it.isXMLDoc(e),o&&(t=it.propFix[t]||t,i=it.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=it.find.attr(e,"tabindex");return t?parseInt(t,10):An.test(e.nodeName)||Dn.test(e.nodeName)&&e.href?0:-1}}}}),nt.hrefNormalized||it.each(["href","src"],function(e,t){it.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),nt.optSelected||(it.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),it.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){it.propFix[this.toLowerCase()]=this}),nt.enctype||(it.propFix.enctype="encoding");var jn=/[\t\r\n\f]/g;it.fn.extend({addClass:function(e){var t,n,r,i,o,a,s=0,u=this.length,l="string"==typeof e&&e;if(it.isFunction(e))return this.each(function(t){it(this).addClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(bt)||[];u>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(jn," "):" ")){for(o=0;i=t[o++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");a=it.trim(r),n.className!==a&&(n.className=a)}return this},removeClass:function(e){var t,n,r,i,o,a,s=0,u=this.length,l=0===arguments.length||"string"==typeof e&&e;if(it.isFunction(e))return this.each(function(t){it(this).removeClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(bt)||[];u>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(jn," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");a=e?it.trim(r):"",n.className!==a&&(n.className=a)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):this.each(it.isFunction(e)?function(n){it(this).toggleClass(e.call(this,n,this.className,t),t)}:function(){if("string"===n)for(var t,r=0,i=it(this),o=e.match(bt)||[];t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else(n===Ct||"boolean"===n)&&(this.className&&it._data(this,"__className__",this.className),this.className=this.className||e===!1?"":it._data(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(jn," ").indexOf(t)>=0)return!0;return!1}}),it.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){it.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),it.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Ln=it.now(),Hn=/\?/,qn=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;it.parseJSON=function(t){if(e.JSON&&e.JSON.parse)return e.JSON.parse(t+"");var n,r=null,i=it.trim(t+"");return i&&!it.trim(i.replace(qn,function(e,t,i,o){return n&&t&&(r=0),0===r?e:(n=i||t,r+=!o-!i,"")}))?Function("return "+i)():it.error("Invalid JSON: "+t)},it.parseXML=function(t){var n,r;if(!t||"string"!=typeof t)return null;try{e.DOMParser?(r=new DOMParser,n=r.parseFromString(t,"text/xml")):(n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(t))}catch(i){n=void 0}return n&&n.documentElement&&!n.getElementsByTagName("parsererror").length||it.error("Invalid XML: "+t),n};var _n,Mn,Fn=/#.*$/,On=/([?&])_=[^&]*/,Pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Bn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Rn=/^(?:GET|HEAD)$/,Wn=/^\/\//,$n=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,zn={},In={},Xn="*/".concat("*");try{Mn=location.href}catch(Un){Mn=ht.createElement("a"),Mn.href="",Mn=Mn.href}_n=$n.exec(Mn.toLowerCase())||[],it.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Mn,type:"GET",isLocal:Bn.test(_n[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Xn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":it.parseJSON,"text xml":it.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?W(W(e,it.ajaxSettings),t):W(it.ajaxSettings,e)},ajaxPrefilter:B(zn),ajaxTransport:B(In),ajax:function(e,t){function n(e,t,n,r){var i,c,v,y,x,T=t;2!==b&&(b=2,s&&clearTimeout(s),l=void 0,a=r||"",w.readyState=e>0?4:0,i=e>=200&&300>e||304===e,n&&(y=$(d,w,n)),y=z(d,y,w,i),i?(d.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(it.lastModified[o]=x),x=w.getResponseHeader("etag"),x&&(it.etag[o]=x)),204===e||"HEAD"===d.type?T="nocontent":304===e?T="notmodified":(T=y.state,c=y.data,v=y.error,i=!v)):(v=T,(e||!T)&&(T="error",0>e&&(e=0))),w.status=e,w.statusText=(t||T)+"",i?h.resolveWith(f,[c,T,w]):h.rejectWith(f,[w,T,v]),w.statusCode(g),g=void 0,u&&p.trigger(i?"ajaxSuccess":"ajaxError",[w,d,i?c:v]),m.fireWith(f,[w,T]),u&&(p.trigger("ajaxComplete",[w,d]),--it.active||it.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{};var r,i,o,a,s,u,l,c,d=it.ajaxSetup({},t),f=d.context||d,p=d.context&&(f.nodeType||f.jquery)?it(f):it.event,h=it.Deferred(),m=it.Callbacks("once memory"),g=d.statusCode||{},v={},y={},b=0,x="canceled",w={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c)for(c={};t=Pn.exec(a);)c[t[1].toLowerCase()]=t[2];t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=y[n]=y[n]||e,v[e]=t),this},overrideMimeType:function(e){return b||(d.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)g[t]=[g[t],e[t]];else w.always(e[w.status]);return this},abort:function(e){var t=e||x;return l&&l.abort(t),n(0,t),this}};if(h.promise(w).complete=m.add,w.success=w.done,w.error=w.fail,d.url=((e||d.url||Mn)+"").replace(Fn,"").replace(Wn,_n[1]+"//"),d.type=t.method||t.type||d.method||d.type,d.dataTypes=it.trim(d.dataType||"*").toLowerCase().match(bt)||[""],null==d.crossDomain&&(r=$n.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]===_n[1]&&r[2]===_n[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(_n[3]||("http:"===_n[1]?"80":"443")))),d.data&&d.processData&&"string"!=typeof d.data&&(d.data=it.param(d.data,d.traditional)),R(zn,d,t,w),2===b)return w;u=it.event&&d.global,u&&0===it.active++&&it.event.trigger("ajaxStart"),d.type=d.type.toUpperCase(),d.hasContent=!Rn.test(d.type),o=d.url,d.hasContent||(d.data&&(o=d.url+=(Hn.test(o)?"&":"?")+d.data,delete d.data),d.cache===!1&&(d.url=On.test(o)?o.replace(On,"$1_="+Ln++):o+(Hn.test(o)?"&":"?")+"_="+Ln++)),d.ifModified&&(it.lastModified[o]&&w.setRequestHeader("If-Modified-Since",it.lastModified[o]),it.etag[o]&&w.setRequestHeader("If-None-Match",it.etag[o])),(d.data&&d.hasContent&&d.contentType!==!1||t.contentType)&&w.setRequestHeader("Content-Type",d.contentType),w.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+Xn+"; q=0.01":""):d.accepts["*"]);for(i in d.headers)w.setRequestHeader(i,d.headers[i]);if(d.beforeSend&&(d.beforeSend.call(f,w,d)===!1||2===b))return w.abort();x="abort";for(i in{success:1,error:1,complete:1})w[i](d[i]);if(l=R(In,d,t,w)){w.readyState=1,u&&p.trigger("ajaxSend",[w,d]),d.async&&d.timeout>0&&(s=setTimeout(function(){w.abort("timeout")},d.timeout));try{b=1,l.send(v,n)}catch(T){if(!(2>b))throw T;n(-1,T)}}else n(-1,"No Transport");return w},getJSON:function(e,t,n){return it.get(e,t,n,"json")},getScript:function(e,t){return it.get(e,void 0,t,"script")}}),it.each(["get","post"],function(e,t){it[t]=function(e,n,r,i){return it.isFunction(n)&&(i=i||r,r=n,n=void 0),it.ajax({url:e,type:t,dataType:i,data:n,success:r})}}),it._evalUrl=function(e){return it.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},it.fn.extend({wrapAll:function(e){if(it.isFunction(e))return this.each(function(t){it(this).wrapAll(e.call(this,t))});if(this[0]){var t=it(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstChild&&1===e.firstChild.nodeType;)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return this.each(it.isFunction(e)?function(t){it(this).wrapInner(e.call(this,t))}:function(){var t=it(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=it.isFunction(e);return this.each(function(n){it(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){it.nodeName(this,"body")||it(this).replaceWith(this.childNodes)}).end()}}),it.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0||!nt.reliableHiddenOffsets()&&"none"===(e.style&&e.style.display||it.css(e,"display"))},it.expr.filters.visible=function(e){return!it.expr.filters.hidden(e)};var Vn=/%20/g,Jn=/\[\]$/,Yn=/\r?\n/g,Gn=/^(?:submit|button|image|reset|file)$/i,Qn=/^(?:input|select|textarea|keygen)/i;it.param=function(e,t){var n,r=[],i=function(e,t){t=it.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(void 0===t&&(t=it.ajaxSettings&&it.ajaxSettings.traditional),it.isArray(e)||e.jquery&&!it.isPlainObject(e))it.each(e,function(){i(this.name,this.value)});else for(n in e)I(n,e[n],t,i);return r.join("&").replace(Vn,"+")},it.fn.extend({serialize:function(){return it.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=it.prop(this,"elements");return e?it.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!it(this).is(":disabled")&&Qn.test(this.nodeName)&&!Gn.test(e)&&(this.checked||!jt.test(e))}).map(function(e,t){var n=it(this).val();return null==n?null:it.isArray(n)?it.map(n,function(e){return{name:t.name,value:e.replace(Yn,"\r\n")}}):{name:t.name,value:n.replace(Yn,"\r\n")}}).get()}}),it.ajaxSettings.xhr=void 0!==e.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&X()||U()}:X;var Kn=0,Zn={},er=it.ajaxSettings.xhr();e.attachEvent&&e.attachEvent("onunload",function(){for(var e in Zn)Zn[e](void 0,!0)}),nt.cors=!!er&&"withCredentials"in er,er=nt.ajax=!!er,er&&it.ajaxTransport(function(e){if(!e.crossDomain||nt.cors){var t;return{send:function(n,r){var i,o=e.xhr(),a=++Kn;if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)o[i]=e.xhrFields[i];e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)void 0!==n[i]&&o.setRequestHeader(i,n[i]+"");o.send(e.hasContent&&e.data||null),t=function(n,i){var s,u,l;if(t&&(i||4===o.readyState))if(delete Zn[a],t=void 0,o.onreadystatechange=it.noop,i)4!==o.readyState&&o.abort();else{l={},s=o.status,"string"==typeof o.responseText&&(l.text=o.responseText);try{u=o.statusText}catch(c){u=""}s||!e.isLocal||e.crossDomain?1223===s&&(s=204):s=l.text?200:404}l&&r(s,u,l,o.getAllResponseHeaders())},e.async?4===o.readyState?setTimeout(t):o.onreadystatechange=Zn[a]=t:t()},abort:function(){t&&t(void 0,!0)}}}}),it.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return it.globalEval(e),e}}}),it.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),it.ajaxTransport("script",function(e){if(e.crossDomain){var t,n=ht.head||it("head")[0]||ht.documentElement;return{send:function(r,i){t=ht.createElement("script"),t.async=!0,e.scriptCharset&&(t.charset=e.scriptCharset),t.src=e.url,t.onload=t.onreadystatechange=function(e,n){(n||!t.readyState||/loaded|complete/.test(t.readyState))&&(t.onload=t.onreadystatechange=null,t.parentNode&&t.parentNode.removeChild(t),t=null,n||i(200,"success"))},n.insertBefore(t,n.firstChild)},abort:function(){t&&t.onload(void 0,!0)}}}});var tr=[],nr=/(=)\?(?=&|$)|\?\?/;it.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=tr.pop()||it.expando+"_"+Ln++;return this[e]=!0,e}}),it.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,a,s=t.jsonp!==!1&&(nr.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&nr.test(t.data)&&"data");return s||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=it.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(nr,"$1"+i):t.jsonp!==!1&&(t.url+=(Hn.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return a||it.error(i+" was not called"),a[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){a=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,tr.push(i)),a&&it.isFunction(o)&&o(a[0]),a=o=void 0}),"script"):void 0}),it.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||ht;var r=dt.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=it.buildFragment([e],t,i),i&&i.length&&it(i).remove(),it.merge([],r.childNodes))};var rr=it.fn.load;it.fn.load=function(e,t,n){if("string"!=typeof e&&rr)return rr.apply(this,arguments);var r,i,o,a=this,s=e.indexOf(" ");return s>=0&&(r=it.trim(e.slice(s,e.length)),e=e.slice(0,s)),it.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(o="POST"),a.length>0&&it.ajax({url:e,type:o,dataType:"html",data:t}).done(function(e){i=arguments,a.html(r?it("<div>").append(it.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){a.each(n,i||[e.responseText,t,e])}),this},it.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){it.fn[t]=function(e){return this.on(t,e)}}),it.expr.filters.animated=function(e){return it.grep(it.timers,function(t){return e===t.elem}).length};var ir=e.document.documentElement;it.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l,c=it.css(e,"position"),d=it(e),f={};"static"===c&&(e.style.position="relative"),s=d.offset(),o=it.css(e,"top"),u=it.css(e,"left"),l=("absolute"===c||"fixed"===c)&&it.inArray("auto",[o,u])>-1,l?(r=d.position(),a=r.top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),it.isFunction(t)&&(t=t.call(e,n,s)),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):d.css(f)}},it.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){it.offset.setOffset(this,e,t)});var t,n,r={top:0,left:0},i=this[0],o=i&&i.ownerDocument;if(o)return t=o.documentElement,it.contains(t,i)?(typeof i.getBoundingClientRect!==Ct&&(r=i.getBoundingClientRect()),n=V(o),{top:r.top+(n.pageYOffset||t.scrollTop)-(t.clientTop||0),left:r.left+(n.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}):r},position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===it.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),it.nodeName(e[0],"html")||(n=e.offset()),n.top+=it.css(e[0],"borderTopWidth",!0),n.left+=it.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-it.css(r,"marginTop",!0),left:t.left-n.left-it.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||ir;e&&!it.nodeName(e,"html")&&"static"===it.css(e,"position");)e=e.offsetParent;return e||ir})}}),it.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n=/Y/.test(t);it.fn[e]=function(r){return Dt(this,function(e,r,i){var o=V(e);return void 0===i?o?t in o?o[t]:o.document.documentElement[r]:e[r]:void(o?o.scrollTo(n?it(o).scrollLeft():i,n?i:it(o).scrollTop()):e[r]=i)},e,r,arguments.length,null)}}),it.each(["top","left"],function(e,t){it.cssHooks[t]=k(nt.pixelPosition,function(e,n){return n?(n=tn(e,t),rn.test(n)?it(e).position()[t]+"px":n):void 0})}),it.each({Height:"height",Width:"width"},function(t,n){it.each({padding:"inner"+t,content:n,"":"outer"+t},function(r,i){it.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return Dt(this,function(n,r,i){var o;if(it.isWindow(n)){if(ht.referrer.indexOf(ht.location.hostname)){if(e.self!==e.top&&"height"==t.toLowerCase()&&navigator.userAgent.match(/(iPod|iPhone|iPad)/i)&&navigator.userAgent.match(/Safari/i))return e.frameElement.parentElement.clientHeight;if(e.self!==e.top&&"width"==t.toLowerCase()&&navigator.userAgent.match(/(iPod|iPhone|iPad)/i)&&navigator.userAgent.match(/Safari/i))return e.frameElement.parentElement.clientWidth}return n.document.documentElement["client"+t]}return 9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+t],o["scroll"+t],n.body["offset"+t],o["offset"+t],o["client"+t])):void 0===i?it.css(n,r,s):it.style(n,r,i,s)},n,a?i:void 0,a,null)}})}),it.fn.size=function(){return this.length},it.fn.andSelf=it.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return it});var or=e.jQuery,ar=e.$;return it.noConflict=function(t){return e.$===it&&(e.$=ar),t&&e.jQuery===it&&(e.jQuery=or),it},typeof t===Ct&&(e.jQuery=e.$=it),it});
/**
 * jQuery Migrate
 * @see          https://github.com/jquery/jquery-migrate
 * @license      MIT License
 */
!function(e,t,n){function r(n){var r=t.console;o[n]||(o[n]=!0,e.migrateWarnings.push(n),r&&r.warn&&!e.migrateMute&&(r.warn("JQMIGRATE: "+n),e.migrateTrace&&r.trace&&r.trace()))}function a(t,n,a,o){if(Object.defineProperty)try{return void Object.defineProperty(t,n,{configurable:!0,enumerable:!0,get:function(){return r(o),a},set:function(e){r(o),a=e}})}catch(i){}e._definePropertyBroken=!0,t[n]=a}var o={};e.migrateWarnings=[],!e.migrateMute&&t.console&&t.console.log&&t.console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){o={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var i=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},d=/^(?:input|button)$/i,l=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",i||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,o,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(s.length<4&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!l.test(g)&&(i?a in i:e.isFunction(e.fn[a])))?e(t)[a](o):("type"===a&&o!==n&&d.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,o=e.prop(t,r);return o===!0||"boolean"!=typeof o&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,o))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?c.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value', val) no longer sets properties"),void(e.value=t))}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^([^<]*)(<[\w\W]+>)([^>]*)$/;e.fn.init=function(t,n,a){var o;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(o=y.exec(e.trim(t)))&&o[0]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),o[3]&&r("$(html) HTML text after last tag is ignored"),"#"===o[0].charAt(0)&&(r("HTML string cannot start with a '#' character"),e.error("JQMIGRATE: Invalid selector string (XSS)")),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(o[2],n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,o,i=this[0];return!i||"events"!==t||1!==arguments.length||(a=e.data(i,t),o=e._data(i,t),a!==n&&a!==o||o===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),o)};var w=/\/(java|ecma)script/i,j=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),j.apply(this,arguments)},e.clean||(e.clean=function(t,n,a,o){n=n||document,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,r("jQuery.clean() is deprecated");var i,s,u,c,d=[];if(e.merge(d,e.buildFragment(t,n).childNodes),a)for(u=function(e){return!e.type||w.test(e.type)?o?o.push(e.parentNode?e.parentNode.removeChild(e):e):a.appendChild(e):void 0},i=0;null!=(s=d[i]);i++)e.nodeName(s,"script")&&u(s)||(a.appendChild(s),"undefined"!=typeof s.getElementsByTagName&&(c=e.grep(e.merge([],s.getElementsByTagName("script")),u),d.splice.apply(d,[i+1,0].concat(c)),i+=c.length));return d});var x=e.event.add,Q=e.event.remove,k=e.event.trigger,N=e.fn.toggle,T=e.fn.live,S=e.fn.die,C="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",M=new RegExp("\\b(?:"+C+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,o){e!==document&&M.test(t)&&r("AJAX events should be attached to document: "+t),x.call(this,e,A(t||""),n,a,o)},e.event.remove=function(e,t,n,r,a){Q.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,o=t.guid||e.guid++,i=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%i;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=o;i<a.length;)a[i++].guid=o;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),T?T.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),S?S.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||M.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(C.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);
/**
 * jQuery Cookie Plugin
 * @see          https://github.com/carhartl/jquery-cookie
 * @license      MIT license
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function t(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function r(n,o){var i=u.raw?n:t(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(t,c,s){if(arguments.length>1&&!e.isFunction(c)){if(s=e.extend({},u.defaults,s),"number"==typeof s.expires){var a=s.expires,d=s.expires=new Date;d.setMilliseconds(d.getMilliseconds()+864e5*a)}return document.cookie=[n(t),"=",i(c),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join("")}for(var f=t?void 0:{},p=document.cookie?document.cookie.split("; "):[],l=0,m=p.length;m>l;l++){var x=p[l].split("="),g=o(x.shift()),j=x.join("=");if(t===g){f=r(j,c);break}t||void 0===(j=r(j))||(f[g]=j)}return f};u.defaults={},e.removeCookie=function(n,o){return e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n)}});
/**
 * Device.js
 * @see          https://github.com/matthewhudson/device.js
 * @license      MIT License
 */
(function(){var e,i,n,o,d,c,t,r,a,v;e=window.device,window.device={},n=window.document.documentElement,v=window.navigator.userAgent.toLowerCase(),device.ios=function(){return device.iphone()||device.ipod()||device.ipad()},device.iphone=function(){return o("iphone")},device.ipod=function(){return o("ipod")},device.ipad=function(){return o("ipad")},device.android=function(){return o("android")},device.androidPhone=function(){return device.android()&&o("mobile")},device.androidTablet=function(){return device.android()&&!o("mobile")},device.blackberry=function(){return o("blackberry")||o("bb10")||o("rim")},device.blackberryPhone=function(){return device.blackberry()&&!o("tablet")},device.blackberryTablet=function(){return device.blackberry()&&o("tablet")},device.windows=function(){return o("windows")},device.windowsPhone=function(){return device.windows()&&o("phone")},device.windowsTablet=function(){return device.windows()&&o("touch")&&!device.windowsPhone()},device.fxos=function(){return(o("(mobile;")||o("(tablet;"))&&o("; rv:")},device.fxosPhone=function(){return device.fxos()&&o("mobile")},device.fxosTablet=function(){return device.fxos()&&o("tablet")},device.meego=function(){return o("meego")},device.cordova=function(){return window.cordova&&"file:"===location.protocol},device.nodeWebkit=function(){return"object"==typeof window.process},device.mobile=function(){return device.androidPhone()||device.iphone()||device.ipod()||device.windowsPhone()||device.blackberryPhone()||device.fxosPhone()||device.meego()},device.tablet=function(){return device.ipad()||device.androidTablet()||device.blackberryTablet()||device.windowsTablet()||device.fxosTablet()},device.desktop=function(){return!device.tablet()&&!device.mobile()},device.portrait=function(){return window.innerHeight/window.innerWidth>1},device.landscape=function(){return window.innerHeight/window.innerWidth<1},device.noConflict=function(){return window.device=e,this},o=function(e){return-1!==v.indexOf(e)},c=function(e){var i;return i=new RegExp(e,"i"),n.className.match(i)},i=function(e){return c(e)?void 0:n.className+=" "+e},r=function(e){return c(e)?n.className=n.className.replace(e,""):void 0},device.ios()?device.ipad()?i("ios ipad tablet"):device.iphone()?i("ios iphone mobile"):device.ipod()&&i("ios ipod mobile"):i(device.android()?device.androidTablet()?"android tablet":"android mobile":device.blackberry()?device.blackberryTablet()?"blackberry tablet":"blackberry mobile":device.windows()?device.windowsTablet()?"windows tablet":device.windowsPhone()?"windows mobile":"desktop":device.fxos()?device.fxosTablet()?"fxos tablet":"fxos mobile":device.meego()?"meego mobile":device.nodeWebkit()?"node-webkit":"desktop"),device.cordova()&&i("cordova"),d=function(){return device.landscape()?(r("portrait"),i("landscape")):(r("landscape"),i("portrait"))},a="onorientationchange"in window,t=a?"orientationchange":"resize",window.addEventListener?window.addEventListener(t,d,!1):window.attachEvent?window.attachEvent(t,d):window[t]=d,d()}).call(this);
/**
 * jQuery resize event
 * @see          http://benalman.com/projects/jquery-resize-plugin/
 * @license      MIT license
 */
(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);
/**
 * jQuery easing
 * @see          http://gsgd.co.uk/sandbox/jquery/easing/
 * @license      BSD License
 */
jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(n,e,t,u,a){return jQuery.easing[jQuery.easing.def](n,e,t,u,a)},easeInQuad:function(n,e,t,u,a){return u*(e/=a)*e+t},easeOutQuad:function(n,e,t,u,a){return-u*(e/=a)*(e-2)+t},easeInOutQuad:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e+t:-u/2*(--e*(e-2)-1)+t},easeInCubic:function(n,e,t,u,a){return u*(e/=a)*e*e+t},easeOutCubic:function(n,e,t,u,a){return u*((e=e/a-1)*e*e+1)+t},easeInOutCubic:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e+t:u/2*((e-=2)*e*e+2)+t},easeInQuart:function(n,e,t,u,a){return u*(e/=a)*e*e*e+t},easeOutQuart:function(n,e,t,u,a){return-u*((e=e/a-1)*e*e*e-1)+t},easeInOutQuart:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e+t:-u/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(n,e,t,u,a){return u*(e/=a)*e*e*e*e+t},easeOutQuint:function(n,e,t,u,a){return u*((e=e/a-1)*e*e*e*e+1)+t},easeInOutQuint:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e*e+t:u/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(n,e,t,u,a){return-u*Math.cos(e/a*(Math.PI/2))+u+t},easeOutSine:function(n,e,t,u,a){return u*Math.sin(e/a*(Math.PI/2))+t},easeInOutSine:function(n,e,t,u,a){return-u/2*(Math.cos(Math.PI*e/a)-1)+t},easeInExpo:function(n,e,t,u,a){return 0==e?t:u*Math.pow(2,10*(e/a-1))+t},easeOutExpo:function(n,e,t,u,a){return e==a?t+u:u*(-Math.pow(2,-10*e/a)+1)+t},easeInOutExpo:function(n,e,t,u,a){return 0==e?t:e==a?t+u:(e/=a/2)<1?u/2*Math.pow(2,10*(e-1))+t:u/2*(-Math.pow(2,-10*--e)+2)+t},easeInCirc:function(n,e,t,u,a){return-u*(Math.sqrt(1-(e/=a)*e)-1)+t},easeOutCirc:function(n,e,t,u,a){return u*Math.sqrt(1-(e=e/a-1)*e)+t},easeInOutCirc:function(n,e,t,u,a){return(e/=a/2)<1?-u/2*(Math.sqrt(1-e*e)-1)+t:u/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return-(s*Math.pow(2,10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i))+t},easeOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return s*Math.pow(2,-10*e)*Math.sin((e*a-r)*(2*Math.PI)/i)+u+t},easeInOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(2==(e/=a/2))return t+u;if(i||(i=a*(.3*1.5)),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return 1>e?-.5*(s*Math.pow(2,10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i))+t:s*Math.pow(2,-10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i)*.5+u+t},easeInBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*(e/=a)*e*((r+1)*e-r)+t},easeOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*((e=e/a-1)*e*((r+1)*e+r)+1)+t},easeInOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),(e/=a/2)<1?u/2*(e*e*(((r*=1.525)+1)*e-r))+t:u/2*((e-=2)*e*(((r*=1.525)+1)*e+r)+2)+t},easeInBounce:function(n,e,t,u,a){return u-jQuery.easing.easeOutBounce(n,a-e,0,u,a)+t},easeOutBounce:function(n,e,t,u,a){return(e/=a)<1/2.75?u*(7.5625*e*e)+t:2/2.75>e?u*(7.5625*(e-=1.5/2.75)*e+.75)+t:2.5/2.75>e?u*(7.5625*(e-=2.25/2.75)*e+.9375)+t:u*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(n,e,t,u,a){return a/2>e?.5*jQuery.easing.easeInBounce(n,2*e,0,u,a)+t:.5*jQuery.easing.easeOutBounce(n,2*e-a,0,u,a)+.5*u+t}});
/**
 * TouchSwipe
 * @see          https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @license      MIT License
 */
(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var y="1.6.12",p="left",o="right",e="up",x="down",c="in",A="out",m="none",s="auto",l="swipe",t="pinch",B="tap",j="doubletap",b="longtap",z="hold",E="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,C="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:true};f.fn.swipe=function(H){var G=f(this),F=G.data(C);if(F&&typeof H==="string"){if(F[H]){return F[H].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+H+" does not exist on jQuery.swipe")}}else{if(F&&typeof H==="object"){F.option.apply(this,arguments)}else{if(!F&&(typeof H==="object"||!H)){return w.apply(this,arguments)}}}return G};f.fn.swipe.version=y;f.fn.swipe.defaults=n;f.fn.swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:A};f.fn.swipe.pageScroll={NONE:m,HORIZONTAL:E,VERTICAL:u,AUTO:s};f.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,ALL:i};function w(F){if(F&&(F.allowPageScroll===undefined&&(F.swipe!==undefined||F.swipeStatus!==undefined))){F.allowPageScroll=m}if(F.click!==undefined&&F.tap===undefined){F.tap=F.click}if(!F){F={}}F=f.extend({},f.fn.swipe.defaults,F);return this.each(function(){var H=f(this);var G=H.data(C);if(!G){G=new D(this,F);H.data(C,G)}})}function D(a4,au){var au=f.extend({},au);var az=(a||d||!au.fallbackToMouseEvents),K=az?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",ax=az?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",V=az?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",T=az?null:"mouseleave",aD=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ag=0,aP=null,ac=0,a1=0,aZ=0,H=1,ap=0,aJ=0,N=null;var aR=f(a4);var aa="start";var X=0;var aQ={};var U=0,a2=0,a5=0,ay=0,O=0;var aW=null,af=null;try{aR.bind(K,aN);aR.bind(aD,a9)}catch(aj){f.error("events not supported "+K+","+aD+" on jQuery.swipe")}this.enable=function(){aR.bind(K,aN);aR.bind(aD,a9);return aR};this.disable=function(){aK();return aR};this.destroy=function(){aK();aR.data(C,null);aR=null};this.option=function(bc,bb){if(typeof bc==="object"){au=f.extend(au,bc)}else{if(au[bc]!==undefined){if(bb===undefined){return au[bc]}else{au[bc]=bb}}else{if(!bc){return au}else{f.error("Option "+bc+" does not exist on jQuery.swipe.options")}}}return null};function aN(bd){if(aB()){return}if(f(bd.target).closest(au.excludedElements,aR).length>0){return}var be=bd.originalEvent?bd.originalEvent:bd;var bc,bf=be.touches,bb=bf?bf[0]:be;aa=g;if(bf){X=bf.length}else{if(au.preventDefaultEvents!==false){bd.preventDefault()}}ag=0;aP=null;aJ=null;ac=0;a1=0;aZ=0;H=1;ap=0;N=ab();S();ai(0,bb);if(!bf||(X===au.fingers||au.fingers===i)||aX()){U=ar();if(X==2){ai(1,bf[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}if(au.swipeStatus||au.pinchStatus){bc=P(be,aa)}}else{bc=false}if(bc===false){aa=q;P(be,aa);return bc}else{if(au.hold){af=setTimeout(f.proxy(function(){aR.trigger("hold",[be.target]);if(au.hold){bc=au.hold.call(aR,be,be.target)}},this),au.longTapThreshold)}an(true)}return null}function a3(be){var bh=be.originalEvent?be.originalEvent:be;if(aa===h||aa===q||al()){return}var bd,bi=bh.touches,bc=bi?bi[0]:bh;var bf=aH(bc);a2=ar();if(bi){X=bi.length}if(au.hold){clearTimeout(af)}aa=k;if(X==2){if(a1==0){ai(1,bi[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}else{aH(bi[1]);aZ=at(aQ[0].end,aQ[1].end);aJ=aq(aQ[0].end,aQ[1].end)}H=a7(a1,aZ);ap=Math.abs(a1-aZ)}if((X===au.fingers||au.fingers===i)||!bi||aX()){aP=aL(bf.start,bf.end);ak(be,aP);ag=aS(bf.start,bf.end);ac=aM();aI(aP,ag);if(au.swipeStatus||au.pinchStatus){bd=P(bh,aa)}if(!au.triggerOnTouchEnd||au.triggerOnTouchLeave){var bb=true;if(au.triggerOnTouchLeave){var bg=aY(this);bb=F(bf.end,bg)}if(!au.triggerOnTouchEnd&&bb){aa=aC(k)}else{if(au.triggerOnTouchLeave&&!bb){aa=aC(h)}}if(aa==q||aa==h){P(bh,aa)}}}else{aa=q;P(bh,aa)}if(bd===false){aa=q;P(bh,aa)}}function M(bb){var bc=bb.originalEvent?bb.originalEvent:bb,bd=bc.touches;if(bd){if(bd.length&&!al()){G();return true}else{if(bd.length&&al()){return true}}}if(al()){X=ay}a2=ar();ac=aM();if(ba()||!am()){aa=q;P(bc,aa)}else{if(au.triggerOnTouchEnd||(au.triggerOnTouchEnd==false&&aa===k)){if(au.preventDefaultEvents!==false){bb.preventDefault()}aa=h;P(bc,aa)}else{if(!au.triggerOnTouchEnd&&a6()){aa=h;aF(bc,aa,B)}else{if(aa===k){aa=q;P(bc,aa)}}}}an(false);return null}function a9(){X=0;a2=0;U=0;a1=0;aZ=0;H=1;S();an(false)}function L(bb){var bc=bb.originalEvent?bb.originalEvent:bb;if(au.triggerOnTouchLeave){aa=aC(h);P(bc,aa)}}function aK(){aR.unbind(K,aN);aR.unbind(aD,a9);aR.unbind(ax,a3);aR.unbind(V,M);if(T){aR.unbind(T,L)}an(false)}function aC(bf){var be=bf;var bd=aA();var bc=am();var bb=ba();if(!bd||bb){be=q}else{if(bc&&bf==k&&(!au.triggerOnTouchEnd||au.triggerOnTouchLeave)){be=h}else{if(!bc&&bf==h&&au.triggerOnTouchLeave){be=q}}}return be}function P(bd,bb){var bc,be=bd.touches;if((J()&&W())||(Q()&&aX())){if(J()&&W()){bc=aF(bd,bb,l)}if((Q()&&aX())&&bc!==false){bc=aF(bd,bb,t)}}else{if(aG()&&bc!==false){bc=aF(bd,bb,j)}else{if(ao()&&bc!==false){bc=aF(bd,bb,b)}else{if(ah()&&bc!==false){bc=aF(bd,bb,B)}}}}if(bb===q){if(W()){bc=aF(bd,bb,l)}if(aX()){bc=aF(bd,bb,t)}a9(bd)}if(bb===h){if(be){if(!be.length){a9(bd)}}else{a9(bd)}}return bc}function aF(be,bb,bd){var bc;if(bd==l){aR.trigger("swipeStatus",[bb,aP||null,ag||0,ac||0,X,aQ]);if(au.swipeStatus){bc=au.swipeStatus.call(aR,be,bb,aP||null,ag||0,ac||0,X,aQ);if(bc===false){return false}}if(bb==h&&aV()){aR.trigger("swipe",[aP,ag,ac,X,aQ]);if(au.swipe){bc=au.swipe.call(aR,be,aP,ag,ac,X,aQ);if(bc===false){return false}}switch(aP){case p:aR.trigger("swipeLeft",[aP,ag,ac,X,aQ]);if(au.swipeLeft){bc=au.swipeLeft.call(aR,be,aP,ag,ac,X,aQ)}break;case o:aR.trigger("swipeRight",[aP,ag,ac,X,aQ]);if(au.swipeRight){bc=au.swipeRight.call(aR,be,aP,ag,ac,X,aQ)}break;case e:aR.trigger("swipeUp",[aP,ag,ac,X,aQ]);if(au.swipeUp){bc=au.swipeUp.call(aR,be,aP,ag,ac,X,aQ)}break;case x:aR.trigger("swipeDown",[aP,ag,ac,X,aQ]);if(au.swipeDown){bc=au.swipeDown.call(aR,be,aP,ag,ac,X,aQ)}break}}}if(bd==t){aR.trigger("pinchStatus",[bb,aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchStatus){bc=au.pinchStatus.call(aR,be,bb,aJ||null,ap||0,ac||0,X,H,aQ);if(bc===false){return false}}if(bb==h&&a8()){switch(aJ){case c:aR.trigger("pinchIn",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchIn){bc=au.pinchIn.call(aR,be,aJ||null,ap||0,ac||0,X,H,aQ)}break;case A:aR.trigger("pinchOut",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchOut){bc=au.pinchOut.call(aR,be,aJ||null,ap||0,ac||0,X,H,aQ)}break}}}if(bd==B){if(bb===q||bb===h){clearTimeout(aW);clearTimeout(af);if(Z()&&!I()){O=ar();aW=setTimeout(f.proxy(function(){O=null;aR.trigger("tap",[be.target]);if(au.tap){bc=au.tap.call(aR,be,be.target)}},this),au.doubleTapThreshold)}else{O=null;aR.trigger("tap",[be.target]);if(au.tap){bc=au.tap.call(aR,be,be.target)}}}}else{if(bd==j){if(bb===q||bb===h){clearTimeout(aW);O=null;aR.trigger("doubletap",[be.target]);if(au.doubleTap){bc=au.doubleTap.call(aR,be,be.target)}}}else{if(bd==b){if(bb===q||bb===h){clearTimeout(aW);O=null;aR.trigger("longtap",[be.target]);if(au.longTap){bc=au.longTap.call(aR,be,be.target)}}}}}return bc}function am(){var bb=true;if(au.threshold!==null){bb=ag>=au.threshold}return bb}function ba(){var bb=false;if(au.cancelThreshold!==null&&aP!==null){bb=(aT(aP)-ag)>=au.cancelThreshold}return bb}function ae(){if(au.pinchThreshold!==null){return ap>=au.pinchThreshold}return true}function aA(){var bb;if(au.maxTimeThreshold){if(ac>=au.maxTimeThreshold){bb=false}else{bb=true}}else{bb=true}return bb}function ak(bb,bc){if(au.preventDefaultEvents===false){return}if(au.allowPageScroll===m){bb.preventDefault()}else{var bd=au.allowPageScroll===s;switch(bc){case p:if((au.swipeLeft&&bd)||(!bd&&au.allowPageScroll!=E)){bb.preventDefault()}break;case o:if((au.swipeRight&&bd)||(!bd&&au.allowPageScroll!=E)){bb.preventDefault()}break;case e:if((au.swipeUp&&bd)||(!bd&&au.allowPageScroll!=u)){bb.preventDefault()}break;case x:if((au.swipeDown&&bd)||(!bd&&au.allowPageScroll!=u)){bb.preventDefault()}break}}}function a8(){var bc=aO();var bb=Y();var bd=ae();return bc&&bb&&bd}function aX(){return !!(au.pinchStatus||au.pinchIn||au.pinchOut)}function Q(){return !!(a8()&&aX())}function aV(){var be=aA();var bg=am();var bd=aO();var bb=Y();var bc=ba();var bf=!bc&&bb&&bd&&bg&&be;return bf}function W(){return !!(au.swipe||au.swipeStatus||au.swipeLeft||au.swipeRight||au.swipeUp||au.swipeDown)}function J(){return !!(aV()&&W())}function aO(){return((X===au.fingers||au.fingers===i)||!a)}function Y(){return aQ[0].end.x!==0}function a6(){return !!(au.tap)}function Z(){return !!(au.doubleTap)}function aU(){return !!(au.longTap)}function R(){if(O==null){return false}var bb=ar();return(Z()&&((bb-O)<=au.doubleTapThreshold))}function I(){return R()}function aw(){return((X===1||!a)&&(isNaN(ag)||ag<au.threshold))}function a0(){return((ac>au.longTapThreshold)&&(ag<r))}function ah(){return !!(aw()&&a6())}function aG(){return !!(R()&&Z())}function ao(){return !!(a0()&&aU())}function G(){a5=ar();ay=event.touches.length+1}function S(){a5=0;ay=0}function al(){var bb=false;if(a5){var bc=ar()-a5;if(bc<=au.fingerReleaseThreshold){bb=true}}return bb}function aB(){return !!(aR.data(C+"_intouch")===true)}function an(bb){if(bb===true){aR.bind(ax,a3);aR.bind(V,M);if(T){aR.bind(T,L)}}else{aR.unbind(ax,a3,false);aR.unbind(V,M,false);if(T){aR.unbind(T,L,false)}}aR.data(C+"_intouch",bb===true)}function ai(bd,bb){var bc={start:{x:0,y:0},end:{x:0,y:0}};bc.start.x=bc.end.x=bb.pageX||bb.clientX;bc.start.y=bc.end.y=bb.pageY||bb.clientY;aQ[bd]=bc;return bc}function aH(bb){var bd=bb.identifier!==undefined?bb.identifier:0;var bc=ad(bd);if(bc===null){bc=ai(bd,bb)}bc.end.x=bb.pageX||bb.clientX;bc.end.y=bb.pageY||bb.clientY;return bc}function ad(bb){return aQ[bb]||null}function aI(bb,bc){bc=Math.max(bc,aT(bb));N[bb].distance=bc}function aT(bb){if(N[bb]){return N[bb].distance}return undefined}function ab(){var bb={};bb[p]=av(p);bb[o]=av(o);bb[e]=av(e);bb[x]=av(x);return bb}function av(bb){return{direction:bb,distance:0}}function aM(){return a2-U}function at(be,bd){var bc=Math.abs(be.x-bd.x);var bb=Math.abs(be.y-bd.y);return Math.round(Math.sqrt(bc*bc+bb*bb))}function a7(bb,bc){var bd=(bc/bb)*1;return bd.toFixed(2)}function aq(){if(H<1){return A}else{return c}}function aS(bc,bb){return Math.round(Math.sqrt(Math.pow(bb.x-bc.x,2)+Math.pow(bb.y-bc.y,2)))}function aE(be,bc){var bb=be.x-bc.x;var bg=bc.y-be.y;var bd=Math.atan2(bg,bb);var bf=Math.round(bd*180/Math.PI);if(bf<0){bf=360-Math.abs(bf)}return bf}function aL(bc,bb){var bd=aE(bc,bb);if((bd<=45)&&(bd>=0)){return p}else{if((bd<=360)&&(bd>=315)){return p}else{if((bd>=135)&&(bd<=225)){return o}else{if((bd>45)&&(bd<135)){return x}else{return e}}}}}function ar(){var bb=new Date();return bb.getTime()}function aY(bb){bb=f(bb);var bd=bb.offset();var bc={left:bd.left,right:bd.left+bb.outerWidth(),top:bd.top,bottom:bd.top+bb.outerHeight()};return bc}function F(bb,bc){return(bb.x>bc.left&&bb.x<bc.right&&bb.y>bc.top&&bb.y<bc.bottom)}}}));
/**
 * Regula: An annotation-based form-validation framework in Javascript
 * @version 1.3.4
 * @license BSD License
 * @copyright Robert Nyman, http://www.robertnyman.com
 */
(function(e,t){typeof define=="function"&&define.amd?define("utils/MapUtils",t):(typeof e.regulaModules=="undefined"&&(e.regulaModules={}),e.regulaModules.MapUtils=t())})(this,function(){return{iterateOverMap:function(e,t){var n=0;for(var r in e)e.hasOwnProperty(r)&&r!=="__size__"&&(t.call(e,r,e[r],n),n++)},exists:function(e,t){var n=!1,r=0;while(!n&&r<e.length)n=t==e[r],r++;return n},put:function(e,t,n){e.__size__||(e.__size__=0),e[t]||e.__size__++,e[t]=n},isEmpty:function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}}}),function(e,t){typeof define=="function"&&define.amd?define("utils/DOMUtils",t):(typeof e.regulaModules=="undefined"&&(e.regulaModules={}),e.regulaModules.DOMUtils=t())}(this,function(){function t(e,t,n,r){var i=t=="*"&&e.all?e.all:e.getElementsByTagName(t),s=[],o=typeof r!="undefined"?new RegExp("(^|\\s)"+r+"(\\s|$)"):null,u,a;for(var f=0;f<i.length;f++)u=i[f],a=u.getAttribute&&u.getAttribute(n),typeof a=="string"&&a.length>0&&(typeof r=="undefined"||o&&o.test(a))&&s.push(u);return s}function n(e,t){var n=e.getAttribute&&e.getAttribute(t)||null;if(!n){var r=e.attributes;for(var i=0;i<r.length;i++)r[i].nodeName===t&&(n=r[i].nodeValue)}return n}function r(){return"regula-generated-"+Math.floor(Math.random()*1e6)}function i(){return typeof document.createElement("input").checkValidity=="function"}var e={form:"The form",select:"The select box",textarea:"The text area",checkbox:"The checkbox",radio:"The radio button",text:"The text field",password:"The password",email:"The email",url:"The URL",number:"The number",datetime:"The datetime","datetime-local":"The local datetime",date:"The date",month:"The month",time:"The time",week:"The week",range:"The range",tel:"The telephone number",color:"The color"};return{friendlyInputNames:e,getElementsByAttribute:t,getAttributeValueForElement:n,generateRandomId:r,supportsHTML5Validation:i}}),function(e,t){typeof define=="function"&&define.amd?define("service/GroupService",t):(typeof e.regulaModules=="undefined"&&(e.regulaModules={}),e.regulaModules.GroupService=t())}(this,function(){var e={Default:0},t={0:"Default"},n=[],r=1;return{Group:e,ReverseGroup:t,deletedGroupIndices:n,firstCustomGroupIndex:r}}),function(e,t){typeof define=="function"&&define.amd?define("utils/ArrayUtils",t):(typeof e.regulaModules=="undefined"&&(e.regulaModules={}),e.regulaModules.ArrayUtils=t())}(this,function(){function e(e,t){var n="";for(var r=0;r<e.length;r++)n+=e[r]+t;return n.replace(new RegExp(t+"$"),"")}return{explode:e}}),function(e,t){typeof define=="function"&&define.amd?define("service/ExceptionService",["utils/ArrayUtils"],t):(typeof e.regulaModules=="undefined"&&(e.regulaModules={}),e.regulaModules.ExceptionService=t(e.regulaModules.ArrayUtils))}(this,function(e){function i(e,t,n){var r="";return e!=null?(r=e.id,t==""||t==null||t==undefined?r+=": ":r+="."+t+": "):t!=""&&t!=null&&t!=undefined&&(r="@"+t+": "),r+n}function s(t){var n="Function received: {";for(var r in t)t.hasOwnProperty(r)&&(typeof t[r]=="string"?n+=r+": "+t[r]+", ":t[r]instanceof Array&&(n+=r+": ["+e.explode(t[r],", ")+"], "));return n=n.replace(/, $/,"")+"}",n}var t={IllegalArgumentException:function(e){this.name="IllegalArgumentException",this.message=e},ConstraintDefinitionException:function(e){this.name="ConstraintDefinitionException",this.message=e},BindException:function(e){this.name="BindException",this.message=e},MissingFeatureException:function(e){this.name="MissingFeatureException",this.message=e}};for(var n in t)if(t.hasOwnProperty(n)){var r=t[n];r.prototype=new Error,r.prototype.constructor=r}return{Exception:t,generateExceptionMessage:i,explodeParameters:s}}),function(e,t){typeof define=="function"&&define.amd?define("service/ValidationService",["utils/DOMUtils","utils/MapUtils","service/GroupService","service/ExceptionService","utils/ArrayUtils"],t):(typeof e.regulaModules=="undefined"&&(e.regulaModules={}),e.regulaModules.ValidationService=t(e.regulaModules.DOMUtils,e.regulaModules.MapUtils,e.regulaModules.GroupService,e.regulaModules.ExceptionService,e.regulaModules.ArrayUtils))}(this,function(e,t,n,r,i){function h(e){for(var t in e)e.hasOwnProperty(t)&&v(t,e)}function p(e){s=e.config,o=e.ReverseConstraint,u=e.constraintDefinitions,a=e.boundConstraints}function v(e,t){var n=t[e],i=e.replace(/(^[A-Z]+)/,function(e){return e.toLowerCase()});n.async?c[i]=function(t,i,s){if(typeof s=="undefined")throw new r.Exception.IllegalArgumentException(e+" is an asynchronous constraint, but you have not provided a callback.");return n.validator.call(t,i,c,s)}:c[i]=function(e,t){return n.validator.call(e,t,c)}}function m(e,n,r,i){function a(n,r){var i={};for(var s in n)n.hasOwnProperty(s)&&s!="__size__"&&t.put(i,s,n[s]);if(r.length>0)for(var s in e)e.hasOwnProperty(s)&&s!="__size__"&&t.put(i,s,e[s]);return i}function f(e,t,n,i){var s=o[y.constraintType],a=W(t,s,i),f={group:n,constraintName:e.constraintName,custom:u[s].custom,compound:u[s].compound,async:u[s].async,constraintParameters:y.params,failingElements:e.failingElements,message:a};return r.reportAsSingleViolation||(f.composingConstraintViolations=e.composingConstraintViolations||[]),f}var l=[],c=[];for(var h=0;h<r.composingConstraints.length;h++){var p=r.composingConstraints[h],d=o[p.constraintType];u[d].async?c.push(p):l.push(p)}var v=null,m=this;if(g(this,e)){if(l.length>0){v=[];for(var h=0;h<l.length;h++){var y=l[h],b=o[y.constraintType],w=a(y.params,r.params),E=U(n,m.id,b,w);if(!E.constraintPassed){var S=f(E,m.id,n,w);if(s.enableHTML5Validation)for(var x=0;x<E.failingElements.length;x++)E.failingElements[x].setCustomValidity(S.message);v.push(S)}}}if(c.length>0){v===null&&(v=[]);var T=0;for(var h=0;h<c.length;h++){var y=c[h],b=o[y.constraintType],w=a(y.params,r.params);z(n,m.id,b,w,N)}function N(e){if(!e.constraintPassed){var t=f(e,m.id,n,w);if(s.enableHTML5Validation)for(var r=0;r<e.failingElements.length;r++)e.failingElements[r].setCustomValidity(t.message);v.push(t)}T++,T===c.length&&i(v)}}}else v=[];return v}function g(e,t){var n=s.validateEmptyFields;return typeof t["ignoreEmpty"]!="undefined"&&(n=!t.ignoreEmpty),!d.blank.call(e)||!!n}function y(e){var t={YMD:{Year:0,Month:1,Day:2},MDY:{Month:0,Day:1,Year:2},DMY:{Day:0,Month:1,Year:2}},n=t[e.format],r=e.separator;typeof e["separator"]=="undefined"&&(r=/\//.test(this.value)?"/":/\./.test(this.value)?".":/ /.test(this.value)?" ":/[^0-9]+/);var i=this.value.split(r),s=new Date(i[n.Year],i[n.Month]-1,i[n.Day]),o=new Date;return typeof e["date"]!="undefined"&&(i=e.date.split(r),o=new Date(i[n.Year],i[n.Month]-1,i[n.Day])),{dateToValidate:s,dateToTestAgainst:o}}function b(e){return function(t,n,r){var i=!0;return g(this,t)&&(i=e.call(this,t,n,r)),i}}function w(){return!this.validity.typeMismatch}function E(e){function t(e){var t=e.groups||null,n=e.elementIds||null,r=(typeof e.constraintType=="undefined"?null:e.constraintType)||null,i="";return i+=t==null?"0":"1",i+=n==null?"0":"1",i+=r==null?"0":"1",i}f={},l={};var r={"000":S,"001":x,"010":T,"011":N,100:C,101:k,110:L,111:A};if(!e||typeof e=="undefined")e={};typeof e.independent=="undefined"&&(e.independent=!0),typeof e.constraintType!="undefined"&&(e.constraintType=o[e.constraintType]);if(typeof e.groups!="undefined"){var i=e.groups;e.groups=[];for(var s=0;s<i.length;s++)e.groups.push(n.ReverseGroup[i[s]])}if(typeof e.elements!="undefined"){e.elementIds=[];for(var s=0;s<e.elements.length;s++)e.elementIds.push(e.elements[s].id)}else typeof e.elementId!="undefined"&&(e.elementIds=[e.elementId]);return r[t(e)](e)}function S(e){var t={asyncContexts:[],syncContexts:[]};for(var n in a)if(a.hasOwnProperty(n)){var r=a[n];for(var i in r)if(r.hasOwnProperty(i))if(!document.getElementById(i))delete r[i];else{var s=r[i];for(var o in s)if(s.hasOwnProperty(o)){var u=H(n,i,o);u.async?t.asyncContexts.push(u):t.syncContexts.push(u)}}}return t=M(t),D(t,e)}function x(e){var t={asyncContexts:[],syncContexts:[]};for(var n in a)if(a.hasOwnProperty(n)){var r=a[n];for(var i in r)if(r.hasOwnProperty(i)){var s=r[i];if(s[e.constraintType]){var o=H(n,i,e.constraintType);o.async?t.asyncContexts.push(o):t.syncContexts.push(o)}}}return t=M(t),D(t,e)}function T(e){var t={},n={asyncContexts:[],syncContexts:[]};for(var s in a)if(a.hasOwnProperty(s)){var o=a[s];for(var u=0;u<e.elementIds.length;u++){var f=e.elementIds[u];typeof t[f]=="undefined"&&(t[f]=0);var l=o[f];if(typeof l!="undefined"){t[f]++;for(var c in l)if(l.hasOwnProperty(c)){var h=H(s,f,c);h.async?n.asyncContexts.push(h):n.syncContexts.push(h)}}}}var p=[];for(var f in t)t.hasOwnProperty(f)&&t[f]===0&&p.push(f);if(p.length>0)throw new r.Exception.IllegalArgumentException("No constraints have been bound to the specified elements: "+i.explode(p)+". "+r.explodeParameters(e));return n=M(n),D(n,e)}function N(e){var t=[],n={asyncContexts:[],syncContexts:[]};for(var s in a)if(a.hasOwnProperty(s)){var o=a[s];for(var u=0;u<e.elementIds.length;u++){var f=e.elementIds[u],l=o[f];if(typeof l!="undefined"){var c=H(s,f,e.constraintType);c.async?n.asyncContexts.push(c):n.syncContexts.push(c)}else t.push(f)}}if(t.length>0)throw new r.Exception.IllegalArgumentException("No constraints have been bound to the specified elements: "+i.explode(t)+". "+r.explodeParameters(e));return n=M(n),D(n,e)}function C(e){var t=!1,n={groupedContexts:{}},i=0;while(i<e.groups.length){var s=e.groups[i],o=a[s];if(typeof o=="undefined")throw new r.Exception.IllegalArgumentException("Undefined group in group list. "+r.explodeParameters(e));for(var u in o)if(o.hasOwnProperty(u)){var f=o[u];for(var l in f)if(f.hasOwnProperty(l)){var c=H(s,u,l);n.groupedContexts[s]||(n.groupedContexts[s]={asyncContexts:[],syncContexts:[]}),c.async?(t=!0,n.groupedContexts[s].asyncContexts.push(c)):n.groupedContexts[s].syncContexts.push(c)}}i++}var h=_(n);return e.groups=h.groups,n=h.uniqueConstraintsToValidate,P(e,n,t)}function k(e){var t=!1,n={groupedContexts:{}},i=0;while(i<e.groups.length){var s=e.groups[i],o=a[s];if(typeof o=="undefined")throw new r.Exception.IllegalArgumentException("Undefined group in group list. "+r.explodeParameters(e));var u=!1;for(var f in o)if(o.hasOwnProperty(f)){var l=o[f];if(l[e.constraintType]){u=!0;var c=H(s,f,e.constraintType);n.groupedContexts[s]||(n.groupedContexts[s]={asyncContexts:[],syncContexts:[]}),c.async?(t=!0,n.groupedContexts[s].asyncContexts.push(c)):n.groupedContexts[s].syncContexts.push(c)}}if(!u)throw new r.Exception.IllegalArgumentException("Constraint "+e.constraintType+" has not been bound to any element under group "+s+". "+r.explodeParameters(e));i++}var h=_(n);return e.groups=h.groups,n=h.uniqueConstraintsToValidate,P(e,n,t)}function L(e){var t=[],n=[],s=!1,o={groupedContexts:{}},u=0;while(u<e.groups.length){var f=e.groups[u],l=a[f];if(!l)throw new r.Exception.IllegalArgumentException("Undefined group in group list. "+r.explodeParameters(e));for(var c=0;c<e.elementIds.length;c++){var h=e.elementIds[c],p=l[h];if(p){for(var d in p)if(p.hasOwnProperty(d)){var v=H(f,h,d);o.groupedContexts[f]||(o.groupedContexts[f]={asyncContexts:[],syncContexts:[]}),v.async?(s=!0,o.groupedContexts[f].asyncContexts.push(v)):o.groupedContexts[f].syncContexts.push(v)}}else t.push(f),n.push(h)}u++}if(t.length>0)throw new r.Exception.IllegalArgumentException("The following elements: "+i.explode(n)+" were not found in one or more of the following group(s): ["+i.explode(t,",").replace(/,/g,", ")+"]. "+r.explodeParameters(e));var m=_(o);return e.groups=m.groups,o=m.uniqueConstraintsToValidate,P(e,o,s)}function A(e){var t=!1,n={groupedContexts:{}},r=0;while(r<e.groups.length){var i=e.groups[r];for(var s=0;s<e.elementIds.length;s++){var o=e.elementIds[s],u=H(i,o,e.constraintType);n.groupedContexts[i]||(n.groupedContexts[i]={asyncContexts:[],syncContexts:[]}),u.async?(t=!0,n.groupedContexts[i].asyncContexts.push(u)):n.groupedContexts[i].syncContexts.push(u)}r++}var a=_(n);return e.groups=a.groups,n=a.uniqueConstraintsToValidate,P(e,n,t)}function O(e){var t=!0;f[e.elementId]||(f[e.elementId]={});var n=document.getElementById(e.elementId).cloneNode(!1),r=n.name.replace(/\s/g,"");return typeof n.type!="undefined"&&n.type.toLowerCase()==="radio"&&r!==""?l[r]||(l[r]={}):l[r]={},!f[e.elementId][e.elementConstraint]&&!l[r][e.elementConstraint]&&(t=!1,f[e.elementId][e.elementConstraint]=!0,typeof n.type!="undefined"&&n.type.toLowerCase()==="radio"&&r!==""&&(l[r][e.elementConstraint]=!0)),t}function M(e){var t={asyncContexts:[],syncContexts:[]};for(var n=0;n<e.syncContexts.length;n++){var r=e.syncContexts[n];O(r)||t.syncContexts.push(r)}for(var n=0;n<e.asyncContexts.length;n++){var r=e.asyncContexts[n];O(r)||t.asyncContexts.push(r)}return t}function _(e){var t=[],n={groupedContexts:{}};for(var r in e.groupedContexts)if(e.groupedContexts.hasOwnProperty(r)){for(var i=0;i<e.groupedContexts[r].syncContexts.length;i++){var s=e.groupedContexts[r].syncContexts[i];O(s)||(n.groupedContexts[r]||(n.groupedContexts[r]={asyncContexts:[],syncContexts:[]}),n.groupedContexts[r].syncContexts.push(s),t.indexOf(r)==-1&&t.push(r))}for(var i=0;i<e.groupedContexts[r].asyncContexts.length;i++){var s=e.groupedContexts[r].asyncContexts[i];O(s)||(n.groupedContexts[r]||(n.groupedContexts[r]={asyncContexts:[],syncContexts:[]}),n.groupedContexts[r].asyncContexts.push(s),t.indexOf(r)==-1&&t.push(r))}}return{groups:t,uniqueConstraintsToValidate:n}}function D(e,t){var n=[];e.syncContexts.length>0&&(n=B(e));if(e.asyncContexts.length>0){if(!t.callback)throw new r.Exception.IllegalArgumentException("One or more constraints to be validated are asynchronous, but a callback has not been provided.");j(e,function(e){n.length>0?n=n.concat(e):n=e,t.callback(n)})}else t.callback&&t.callback(n);return n}function P(e,t,n){var i=F(e.groups,e.independent,t);if(n){if(!e.callback)throw new r.Exception.IllegalArgumentException("One or more constraints to be validated are asynchronous, but a callback has not been provided.");if(!e.independent&&i.length>0){var s=i[0].group,o=t.groupedContexts[s];t.groupedContexts={},t.groupedContexts[s]=o}I(e.groups,e.independent,t,function(t){i.length>0?i=i.concat(t):i=t,e.callback(i)})}else e.callback&&e.callback(i);return i}function H(e,t,n){var i=a[e];if(!i)throw new r.Exception.IllegalArgumentException("Undefined group in group list (group: "+e+", elementId: "+t+", constraint: "+n+")");var s=i[t];if(!s)throw new r.Exception.IllegalArgumentException("No constraints have been defined for the element with id: "+t+" in group "+e);var o=s[n];if(!o)throw new r.Exception.IllegalArgumentException("Constraint "+n+" in group "+e+" hasn't been bound to the element with id "+t);return{group:e,elementId:t,elementConstraint:n,params:o,async:u[n].async}}function B(e){var t=[],n=0;while(n<e.syncContexts.length){var r=e.syncContexts[n],i=q(r.group,r.elementId,r.elementConstraint,r.params);i&&t.push(i),n++}return t}function j(e,t){function o(i){r++,i&&n.push(i),r===e.asyncContexts.length&&t(n)}var n=[],r=0;for(var i=0;i<e.asyncContexts.length;i++){var s=e.asyncContexts[i];R(s.group,s.elementId,s.elementConstraint,s.params,o)}}function F(e,t,n){var r=[],i=0,s=!0;while(i<e.length&&s){var o=e[i],u=n.groupedContexts[o].syncContexts;for(var a=0;a<u.length;a++){var f=u[a],l=q(f.group,f.elementId,f.elementConstraint,f.params);l&&r.push(l)}i++,s=r.length==0||t&&r.length!=0}return r}function I(e,t,n,r){var i=[],s=!0;(function o(u){if(u<e.length&&s){var a=e[u],f=n.groupedContexts[a].asyncContexts,l=0;for(var c=0;c<f.length;c++){var h=f[c];R(h.group,h.elementId,h.elementConstraint,h.params,p)}function p(e){l++,e&&i.push(e),l===f.length&&(s=i.length===0||t&&i.length!=0,o(++u))}}else r(i)})(0)}function q(e,t,n,r){var i,o=U(e,t,n,r),a="";o.constraintPassed||(a=W(t,n,r),i={group:e,constraintName:n,formSpecific:u[n].formSpecific,custom:u[n].custom,compound:u[n].compound,async:u[n].async,composingConstraintViolations:o.composingConstraintViolations||[],constraintParameters:r,failingElements:o.failingElements,message:a});if(s.enableHTML5Validation)for(var f=0;f<o.failingElements.length;f++)o.failingElements[f].setCustomValidity("");return i}function R(e,t,n,r,i){var o;z(e,t,n,r,function(a){var f="";a.constraintPassed||(f=W(t,n,r),o={group:e,constraintName:n,formSpecific:u[n].formSpecific,custom:u[n].custom,compound:u[n].compound,async:u[n].async,composingConstraintViolations:a.composingConstraintViolations||[],constraintParameters:r,failingElements:a.failingElements,message:f});if(s.enableHTML5Validation)for(var l=0;l<a.failingElements.length;l++)a.failingElements[l].setCustomValidity("");i(o)})}function U(t,n,r,i){var s=!1,o=[],a=document.getElementById(n),f=[];u[r].formSpecific?(o=u[r].validator.call(a,i,c),s=o.length==0):u[r].compound?(f=u[r].validator.call(a,i,t,u[r],null),s=f.length==0,s||o.push(a)):(s=u[r].validator.call(a,i,c),s||o.push(a));var l=a.cloneNode(!1).name.replace(/\s/g,""),h=a.cloneNode(!1).type;typeof h!="undefined"&&h.toLowerCase()==="radio"&&l!==""&&(o=e.getElementsByAttribute(document.body,"input","name",l.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")));var p={constraintName:r,constraintPassed:s,failingElements:o};return u[r].reportAsSingleViolation||(p.composingConstraintViolations=f),p}function z(t,n,r,i,s){function a(t,n,i,s){var a=o.cloneNode(!1).name.replace(/\s/g,""),f=o.cloneNode(!1).type;typeof f!="undefined"&&f.toLowerCase()==="radio"&&a!==""&&(i=e.getElementsByAttribute(document.body,"input","name",a));var l={constraintName:r,constraintPassed:t,failingElements:i};u[r].reportAsSingleViolation||(l.composingConstraintViolations=n),s(l)}var o=document.getElementById(n);u[r].formSpecific?u[r].validator.call(o,i,c,function(e){a(e.length===0,null,e,s)}):u[r].compound?u[r].validator.call(o,i,t,u[r],function(e){var t=[],n=e.length===0;n||t.push(o),a(n,e,t,s)}):u[r].validator.call(o,i,c,function(e){var t=[];e||t.push(o),a(e,null,t,s)})}function W(t,n,r){var i=document.getElementById(t),s="";r.message?s=r.message:r.msg?s=r.msg:s=u[n].defaultMessage;for(var o in r)if(r.hasOwnProperty(o)){var a=new RegExp("{"+o+"}","g");s=s.replace(a,r[o])}if(u[n].compound&&typeof u[n].composingConstraints!="undefined")for(var f=0;f<u[n].composingConstraints.length;f++){var l=u[n].composingConstraints[f];for(var o in l.params)if(l.params.hasOwnProperty(o)){var a=new RegExp("{"+o+"}","g");s=s.replace(a,l.params[o])}}if(/{label}/.test(s)){var c=e.friendlyInputNames[i.cloneNode(!1).tagName.toLowerCase()];c||(c=e.friendlyInputNames[i.cloneNode(!1).type.toLowerCase()]),s=s.replace(/{label}/,c),s=s.replace(/{flags}/g,"")}return s=s.replace(/\\\"/g,'"'),s}var s={},o={},u={},a={},f={},l={},c={},d={checked:function(t){var n=!1;if(this.type.toLowerCase()==="radio"&&this.name.replace(/\s/g,"")!==""){var r=e.getElementsByAttribute(document.body,"input","name",this.name.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")),i=0;while(i<r.length&&!n)n=r[i].checked,i++}else n=this.checked;return n},selected:function(e){return this.selectedIndex>0},max:function(e){var t=!0;return g(this,e)&&(t=parseFloat(this.value)<=parseFloat(e.value)),t},min:function(e){var t=!0;return g(this,e)&&(t=parseFloat(this.value)>=parseFloat(e.value)),t},range:function(e){var t=!0;return g(this,e)&&(t=this.value.replace(/\s/g,"")!=""&&parseFloat(this.value)<=parseFloat(e.max)&&parseFloat(this.value)>=parseFloat(e.min)),t},notBlank:function(e){return this.value.replace(/\s/g,"")!=""},blank:function(e){return this.value.replace(/\s/g,"")===""},matches:function(e){var t=!0;if(g(this,e)){var n,r;typeof e["regex"]=="string"?r=e.regex.replace(/^\//,"").replace(/\/$/,""):r=e.regex,typeof e["flags"]!="undefined"?n=new RegExp(r.toString().replace(/^\//,"").replace(/\/[^\/]*$/,""),e.flags):n=new RegExp(r),t=n.test(this.value)}return t},email:function(e){var t=!0;return g(this,e)&&(t=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(this.value)),t},alpha:function(e){var t=!0;return g(this,e)&&(t=/^[A-Za-z]+$/.test(this.value)),t},numeric:function(e){var t=!0;return g(this,e)&&(t=/^[0-9]+$/.test(this.value)),t},integer:function(e){var t=!0;return g(this,e)&&(t=/^-?[0-9]+$/.test(this.value)),t},real:function(e){var t=!0;return g(this,e)&&(t=/^-?([0-9]+(\.[0-9]+)?|\.[0-9]+)$/.test(this.value)),t},alphaNumeric:function(e){var t=!0;return g(this,e)&&(t=/^[0-9A-Za-z]+$/.test(this.value)),t},completelyFilled:function(e){var t=[];for(var n=0;n<this.elements.length;n++){var r=this.elements[n];d.required.call(r)||t.push(r)}return t},passwordsMatch:function(e){var t=[],n=document.getElementById(e.field1),r=document.getElementById(e.field2);return n.value!=r.value&&(t=[n,r]),t},required:function(e){var t=!0;return this.tagName&&(this.tagName.toLowerCase()==="select"?t=d.selected.call(this):this.type.toLowerCase()==="checkbox"||this.type.toLowerCase()==="radio"?t=d.checked.call(this):(this.tagName.toLowerCase()==="input"||this.tagName.toLowerCase()==="textarea")&&this.type.toLowerCase()!="button"&&(t=d.notBlank.call(this))),t},length:function(e){var t=!0;return g(this,e)&&(t=this.value.length>=e.min&&this.value.length<=e.max),t},digits:function(e){var t=!0;if(g(this,e)){var n=this.value.replace(/\s/g,""),r=n.split(/\./);t=!1,n.length>0&&(r.length==1&&(r[1]=""),e.integer>0?t=r[0].length<=e.integer:t=!0,e.fraction>0&&(t=t&&r[1].length<=e.fraction))}return t},past:function(e){var t=!0;if(g(this,e)){var n=y.call(this,e);t=n.dateToValidate<n.dateToTestAgainst}return t},future:function(e){var t=!0;if(g(this,e)){var n=y.call(this,e);t=n.dateToValidate>n.dateToTestAgainst}return t},url:function(e){var t=!0;return g(this,e)&&(t=/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(this.value)),t},step:function(e){var t=!0;if(g(this,e)){var n=parseFloat(this.value),r=parseFloat(e.max),i=parseFloat(e.min),s=parseFloat(e.value);t=n<=r&&n>=i&&n%s===0}return t},html5Required:function(e){return!this.validity.valueMissing},html5Email:w,html5URL:w,html5Number:w,html5DateTime:w,html5DateTimeLocal:w,html5Date:w,html5Month:w,html5Time:w,html5Week:w,html5Range:w,html5Tel:w,html5Color:w,html5Pattern:function(e){return!this.validity.patternMismatch},html5MaxLength:function(e){return!this.validity.tooLong},html5Min:function(e){return!this.validity.rangeUnderflow},html5Max:function(e){return!this.validity.rangeOverflow},html5Step:function(e){return!this.validity.stepMismatch}};return{Validator:d,init:p,wrapValidatorWithEmptyCheck:b,initializePublicValidators:h,compoundValidator:m,validate:E,runValidatorFor:U,interpolateConstraintDefaultMessage:W,createPublicValidator:v}}),function(e,t){typeof define=="function"&&define.amd?define("domain/CompositionGraph",t):(typeof e.regulaModules=="undefined"&&(e.regulaModules={}),e.regulaModules.CompositionGraph=t())}(this,function(){function n(n){var r=n.type,i=n.name,s=n.parent,o=typeof e[r]=="undefined"?{visited:!1,name:i,type:r,parents:[],children:[]}:e[r];s==null?t.children.push(o):(s.children.push(o),o.parents.push(s)),e[r]=o}function r(){var e={},n=function r(t,n){var i=typeof e[t.type]=="undefined"?{visited:t.visited,name:t.name,type:t.type,parents:[],children:[]}:e[t.type];n!==null&&i.parents.push(n);for(var s=0;s<t.children.length;s++)i.children.push(r(t.children[s],i));return e[t.type]=i,i}(t,null);return{typeToNodeMap:e,root:n}}function i(t){var n=e[t];return typeof n=="undefined"?null:n}function s(e){var t=function n(e,t){var r={cycle:!1,path:t};if(e.visited)r.cycle=!0;else{e.visited=!0;var i=0;while(i<e.children.length&&!r.cycle)r=n(e.children[i],t+"."+e.children[i].name),i++}return r}(e,e.name);return t.cycle||o(),t}function o(){(function e(t){t.visited=!1;for(var n=0;n<t.children.length;n++)e(t.children[n])})(t)}function u(){return t}function a(e){t=e}function f(n){e=n.typeToNodeMap,t=n.root}var e={},t={visited:!1,name:"RootNode",type:-1,parents:[],children:[]};return{ROOT:-1,addNode:n,getNodeByType:i,analyze:s,getRoot:u,setRoot:a,clone:r,initializeFromClone:f}}),function(e,t){typeof define=="function"&&define.amd?define("service/ConstraintService",["service/ValidationService","domain/CompositionGraph","service/ExceptionService","utils/MapUtils","utils/ArrayUtils"],t):(typeof e.regulaModules=="undefined"&&(e.regulaModules={}),e.regulaModules.ConstraintService=t(e.regulaModules.ValidationService,e.regulaModules.CompositionGraph,e.regulaModules.ExceptionService,e.regulaModules.MapUtils,e.regulaModules.ArrayUtils))}(this,function(e,t,n,r,i){function f(r){var i=typeof r.async=="undefined"?a[r.name].async:r.async,u=r.validator;r.validatorRedefined&&!r.formSpecific&&(u=e.wrapValidatorWithEmptyCheck(u));var f=t.getNodeByType(r.constraintType);if(r.compound){v(r.name,r.composingConstraints,r.params);var l=t.clone();d(r.name,r.composingConstraints);var c=t.analyze(f);if(c.cycle)throw t.initializeFromClone(l),new n.Exception.ConstraintDefinitionException("regula.override: The overriding composing-constraints you have specified have created a cyclic composition: "+c.path);i=!1;var h=0;while(h<r.composingConstraints.length&&!i){var p=r.composingConstraints[h],m=a[o[p.constraintType]];i=m.async,h++}}f!==null&&function g(e){for(var n=0;n<e.parents.length;n++){var r=e.parents[n];if(r.type!==t.ROOT){var s=o[r.type],u=a[s];u.async=i,g(r)}}}(f),a[r.name]={async:i,formSpecific:r.formSpecific,constraintType:s[r.name],custom:!0,compound:r.compound,params:r.params,composingConstraints:r.composingConstraints,defaultMessage:r.defaultMessage,validator:u},a[r.name].custom&&r.validatorRedefined&&e.createPublicValidator(r.name,a)}function l(t){s[t.name]=u,o[u++]=t.name;var n=t.validator;t.formSpecific||(n=e.wrapValidatorWithEmptyCheck(t.validator)),a[t.name]={async:t.async,formSpecific:t.formSpecific,validator:n,constraintType:s[t.name],custom:!0,compound:!1,params:t.params,defaultMessage:t.defaultMessage},e.createPublicValidator(t.name,a)}function c(t){v(t.name,t.constraints,t.params);var n=!1,r=0;while(r<t.constraints.length&&!n){var i=t.constraints[r],f=o[i.constraintType];n=n||a[f].async,r++}s[t.name]=u,o[u++]=t.name,a[t.name]={async:n,formSpecific:t.formSpecific,constraintType:s[t.name],custom:!0,compound:!0,params:t.params,reportAsSingleViolation:t.reportAsSingleViolation,composingConstraints:t.constraints,defaultMessage:t.defaultMessage,validator:e.compoundValidator},e.createPublicValidator(t.name,a),d(t.name,t.constraints)}function h(e,t,r){var i={successful:!0,message:"",data:null},s=e.cloneNode(!1);if(s.tagName.toLowerCase()=="form"&&!a[t].formSpecific)i={successful:!1,message:n.generateExceptionMessage(e,t,"@"+t+" is not a form constraint, but you are trying to bind it to a form"),data:null};else if(s.tagName.toLowerCase()!="form"&&a[t].formSpecific)i={successful:!1,message:n.generateExceptionMessage(e,t,"@"+t+" is a form constraint, but you are trying to bind it to a non-form element"),data:null};else if((typeof s.type=="undefined"||s.type.toLowerCase()!="checkbox"&&s.type.toLowerCase()!="radio")&&t=="Checked")i={successful:!1,message:n.generateExceptionMessage(e,t,"@"+t+" is only applicable to checkboxes and radio buttons. You are trying to bind it to an input element that is neither a checkbox nor a radio button."),data:null};else if(s.tagName.toLowerCase()!="select"&&t=="Selected")i={successful:!1,message:n.generateExceptionMessage(e,t,"@"+t+" is only applicable to select boxes. You are trying to bind it to an input element that is not a select box."),data:null};else{var o=p(e,a[t],r);o.error?i={successful:!1,message:o.message,data:null}:i.data=r}return i}function p(e,t,r){var s={error:!1,message:""};r.__size__<t.params.length&&(s={error:!0,message:n.generateExceptionMessage(e,o[t.constraintType],"@"+o[t.constraintType]+" expects at least "+t.params.length+" parameter(s). However, you have provided only "+r.__size__),data:null});var u=[];for(var a=0;a<t.params.length;a++){var f=t.params[a];typeof r[f]=="undefined"&&u.push(f)}return u.length>0&&(s={error:!0,message:n.generateExceptionMessage(e,o[t.constraintType],"You seem to have provided some optional or required parameters for @"+o[t.constraintType]+", but you are still missing the following "+u.length+" required parameter(s): "+i.explode(u,", ")),data:null}),s}function d(e,n){var r=t.getNodeByType(s[e]);r==null&&(t.addNode({type:s[e],name:e,parent:null}),r=t.getNodeByType(s[e]));for(var i=0;i<r.children.length;i++){var u=r.children[i],f=[];for(var l=0;l<u.parents.length;l++)u.parents[l]!==r&&f.push(u.parents[l]);u.parents=f}r.children=[];for(var i=0;i<n.length;i++){var c=o[n[i].constraintType],h=a[c];t.addNode({type:h.constraintType,name:o[h.constraintType],parent:r})}}function v(e,t,i){for(var s=0;s<t.length;s++){if(typeof t[s].constraintType=="undefined")throw new n.Exception.ConstraintDefinitionException("In compound constraint "+e+": A composing constraint has no constraint type specified.");var u=t[s],f=o[u.constraintType],l={__size__:0};u.params=u.params||{};for(var c in u.params)u.params.hasOwnProperty(c)&&r.put(l,c,u.params[c]);var h=0;for(var d in u.params)u.params.hasOwnProperty(d)&&h++;u.params.__size__=h;for(var v=0;v<i.length;v++)r.put(l,i[v],null);var m=p(null,a[f],l);if(m.error)throw new n.Exception.ConstraintDefinitionException("In compound constraint "+e+": "+m.message)}}var s={},o={},u=0;(function(e){for(var t=0;t<e.length;t++)s[e[t]]=t,o[t]=e[t];u=t,s.Between=s.Range,s.Matches=s.Pattern,s.Empty=s.Blank,s.NotEmpty=s.NotBlank,s.IsAlpha=s.Alpha,s.IsNumeric=s.Numeric,s.IsAlphaNumeric=s.AlphaNumeric})(["Checked","Selected","Max","Min","Range","Between","NotBlank","NotEmpty","Blank","Empty","Pattern","Matches","Email","Alpha","IsAlpha","Numeric","IsNumeric","AlphaNumeric","IsAlphaNumeric","Integer","Real","CompletelyFilled","PasswordsMatch","Required","Length","Digits","Past","Future","Step","URL","HTML5Required","HTML5Email","HTML5URL","HTML5MaxLength","HTML5Pattern","HTML5Min","HTML5Max","HTML5Step"]);var a={Checked:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.checked,constraintType:s.Checked,custom:!1,compound:!1,params:[],defaultMessage:"{label} needs to be checked."},Selected:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.selected,constraintType:s.Selected,custom:!1,compound:!1,params:[],defaultMessage:"{label} needs to be selected."},Max:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.max,constraintType:s.Max,custom:!1,compound:!1,params:["value"],defaultMessage:"{label} needs to be lesser than or equal to {value}."},Min:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.min,constraintType:s.Min,custom:!1,compound:!1,params:["value"],defaultMessage:"{label} needs to be greater than or equal to {value}."},Range:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.range,constraintType:s.Range,custom:!1,compound:!1,params:["min","max"],defaultMessage:"{label} needs to be between {min} and {max}."},NotBlank:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.notBlank,constraintType:s.NotBlank,custom:!1,compound:!1,params:[],defaultMessage:"{label} cannot be blank."},Blank:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.blank,constraintType:s.Blank,custom:!1,compound:!1,params:[],defaultMessage:"{label} needs to be blank."},Pattern:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.matches,constraintType:s.Pattern,custom:!1,compound:!1,params:["regex"],defaultMessage:"{label} needs to match {regex}{flags}."},Email:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.email,constraintType:s.Email,custom:!1,compound:!1,params:[],defaultMessage:"{label} is not a valid email."},Alpha:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.alpha,constraintType:s.Alpha,custom:!1,compound:!1,params:[],defaultMessage:"{label} can only contain letters."},Numeric:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.numeric,constraintType:s.Numeric,custom:!1,compound:!1,params:[],defaultMessage:"Only numbers are required"},AlphaNumeric:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.alphaNumeric,constraintType:s.AlphaNumeric,custom:!1,compound:!1,params:[],defaultMessage:"{label} can only contain numbers and letters."},Integer:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.integer,constraintType:s.Integer,custom:!1,compound:!1,params:[],defaultMessage:"{label} must be an integer."},Real:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.real,constraintType:s.Real,custom:!1,compound:!1,params:[],defaultMessage:"{label} must be a real number."},CompletelyFilled:{async:!1,html5:!1,formSpecific:!0,validator:e.Validator.completelyFilled,constraintType:s.CompletelyFilled,custom:!1,compound:!1,params:[],defaultMessage:"{label} must be completely filled."},PasswordsMatch:{async:!1,html5:!1,formSpecific:!0,validator:e.Validator.passwordsMatch,constraintType:s.PasswordsMatch,custom:!1,compound:!1,params:["field1","field2"],defaultMessage:"Passwords do not match."},Required:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.required,constraintType:s.Required,custom:!1,compound:!1,params:[],defaultMessage:"{label} is required."},Length:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.length,constraintType:s.Length,custom:!1,compound:!1,params:["min","max"],defaultMessage:"{label} length must be between {min} and {max}."},Digits:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.digits,constraintType:s.Digits,custom:!1,compound:!1,params:["integer","fraction"],defaultMessage:"{label} must have up to {integer} digits and {fraction} fractional digits."},Past:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.past,constraintType:s.Past,custom:!1,compound:!1,params:["format"],defaultMessage:"{label} must be in the past."},Future:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.future,constraintType:s.Future,custom:!1,compound:!1,params:["format"],defaultMessage:"{label} must be in the future."},Step:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.step,constraintType:s.Step,custom:!1,compound:!1,params:["min","max","value"],defaultMessage:"{label} must be equal to {min} or greater, and equal to {max} or lesser, at increments of {value}."},URL:{async:!1,html5:!1,formSpecific:!1,validator:e.Validator.url,constraintType:s.URL,custom:!1,compound:!1,params:[],defaultMessage:"{label} must be a valid URL."},HTML5Required:{async:!1,html5:!0,inputType:null,attribute:"required",formSpecific:!1,validator:e.Validator.html5Required,constraintType:s.HTML5Required,custom:!1,compound:!1,params:[],defaultMessage:"{label} is required."},HTML5Email:{async:!1,html5:!0,inputType:"email",attribute:null,formSpecific:!1,validator:e.Validator.html5Email,constraintType:s.HTML5Email,custom:!1,compound:!1,params:[],defaultMessage:"{label} is not a valid email."},HTML5Pattern:{async:!1,html5:!0,inputType:null,attribute:"pattern",formSpecific:!1,validator:e.Validator.html5Pattern,constraintType:s.HTML5Pattern,custom:!1,compound:!1,params:["pattern"],defaultMessage:"{label} needs to match {pattern}."},HTML5URL:{async:!1,html5:!0,inputType:"url",attribute:null,formSpecific:!1,validator:e.Validator.html5URL,constraintType:s.HTML5URL,custom:!1,compound:!1,params:[],defaultMessage:"{label} is not a valid URL."},HTML5MaxLength:{async:!1,html5:!0,inputType:null,attribute:"maxlength",formSpecific:!1,validator:e.Validator.html5MaxLength,constraintType:s.HTML5MaxLength,custom:!1,compound:!1,params:["maxlength"],defaultMessage:"{label} must be less than {maxlength} characters."},HTML5Min:{async:!1,html5:!0,inputType:null,attribute:"min",formSpecific:!1,validator:e.Validator.html5Min,constraintType:s.HTML5Min,custom:!1,compound:!1,params:["min"],defaultMessage:"{label} needs to be greater than or equal to {min}."},HTML5Max:{async:!1,html5:!0,inputType:null,attribute:"max",formSpecific:!1,validator:e.Validator.html5Max,constraintType:s.HTML5Max,custom:!1,compound:!1,params:["max"],defaultMessage:"{label} needs to be lesser than or equal to {max}."},HTML5Step:{async:!1,html5:!0,inputType:null,attribute:"step",formSpecific:!1,validator:e.Validator.html5Step,constraintType:s.HTML5Step,custom:!1,compound:!1,params:["step"],defaultMessage:"{label} must be equal to the minimum value or greater at increments of {step}."}};return{Constraint:s,ReverseConstraint:o,firstCustomConstraintIndex:u,constraintDefinitions:a,override:f,custom:l,compound:c,verifyConstraintDefinition:h,verifyParameterCountMatches:p}}),function(e,t){typeof define=="function"&&define.amd?define("parser/Parser",["utils/MapUtils","service/ExceptionService","service/ConstraintService"],t):(typeof e.regulaModules=="undefined"&&(e.regulaModules={}),e.regulaModules.Parser=t(e.regulaModules.MapUtils,e.regulaModules.ExceptionService,e.regulaModules.ConstraintService))}(this,function(e,t,n){function r(e){return e?e.replace(/^\s+/,"").replace(/\s+$/,""):""}function i(e){return e[0]}function s(t){var n=t.str,r=t.delimiters.split(""),i=t.returnDelimiters||!1,s=t.returnEmptyTokens||!1,o=[],u=0;for(var a=0;a<n.length;a++)if(e.exists(r,n.charAt(a))){var f=n.substring(u,a);f.length==0?s&&o.push(f):o.push(f),i&&o.push(n.charAt(a)),u=a+1}if(u<n.length){var f=n.substring(u,n.length);f.length==0?s&&o.push(f):o.push(f)}return o}function o(o,u){function l(e){var t={successful:!0,message:"",data:null},n=[];while(e.length>0&&t.successful)t=c(e),n.push(t.data);return t.data=n,t}function c(e){var n={successful:!0,message:"",data:null},i=e.shift();return r(i).length==0&&(i=e.shift()),i=="@"?n=h(e):n={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid constraint. Constraint definitions need to start with '@'")+" "+n.message,data:null},n}function h(e){var r={Between:"Range",Matches:"Pattern",Empty:"Blank",NotEmpty:"NotBlank",IsAlpha:"Alpha",IsNumeric:"Integer",IsAlphaNumeric:"AlphaNumeric"},i=p(e);if(i.successful){a=i.data,a=r[a]?r[a]:a;if(n.constraintDefinitions[a]){i=m(e);if(i.successful){i=n.verifyConstraintDefinition(o,a,i.data);if(i.successful){var s=i.data;i.data={element:o,constraintName:a,definedParameters:s}}}}else i={successful:!1,message:t.generateExceptionMessage(o,a,"I cannot find the specified constraint name. If this is a custom constraint, you need to define it before you bind to it")+" "+i.message,data:null}}else i={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid constraint name in constraint definition")+" "+i.message,data:null};return i}function p(e){var n=r(e.shift()),i=d(n.charAt(0));if(i.successful){var s=1;while(s<n.length&&i.successful)i=v(n.charAt(s)),s++;i.successful&&(i.data=n)}else i={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid starting character for constraint name. Can only include A-Z, a-z, and _")+" "+i.message,data:null};return i}function d(e){var n={successful:!0,message:"",data:null};if(!/[A-Za-z_]/.test(e)||typeof e=="undefined"||e==null)n={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid starting character"),data:null};return n}function v(e){var n={successful:!0,message:"",data:null};return/[0-9A-Za-z_]/.test(e)||(n={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid character in identifier. Can only include 0-9, A-Z, a-z, and _")+" "+n.message,data:null}),n}function m(n){var s={successful:!0,message:"",data:{}};if(i(n)=="("){n.shift();var u={};if(i(n)==")")n.shift();else{s=g(n);if(s.successful){e.put(u,s.data.name,s.data.value),r(i(n)).length==0&&n.shift();while(n.length>0&&i(n)==","&&s.successful)n.shift(),s=g(n),s.successful&&(e.put(u,s.data.name,s.data.value),r(i(n)).length==0&&n.shift());if(s.successful){var f=n.shift();r(f).length==0&&(f=n.shift()),f!=")"?s={successful:!1,message:t.generateExceptionMessage(o,a,"Cannot find matching closing ) in parameter list")+" "+s.message,data:null}:s.data=u}}else s={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid parameter definition")+" "+s.message,data:null}}}else i(n)!==undefined&&i(n)!="@"&&(s={successful:!1,message:t.generateExceptionMessage(o,a,"Unexpected character '"+i(n)+"'"+" after constraint definition")+" "+s.message,data:null});return s}function g(e){var n=y(e);if(n.successful){var r=n.data,i=e.shift();i=="="?(n=b(e),n.successful?n.data={name:r,value:n.data}:n={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid parameter value")+" "+n.message,data:null}):(e.unshift(i),n={successful:!1,message:t.generateExceptionMessage(o,a,"'=' expected after parameter name "+n.message),data:null})}else n={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid parameter name. You might have unmatched parentheses")+" "+n.message,data:null};return n}function y(e){var n=r(e.shift());n.length==0&&(n=e.shift());var i={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid starting character for parameter name. Can only include A-Z, a-z, and _"),data:null};if(typeof n!="undefined"){i=d(n.charAt(0));if(i.successful){var s=1;while(s<n.length&&i.successful)i=v(n.charAt(s)),s++;i.successful&&(i.data=n)}else i={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid starting character for parameter name. Can only include A-Z, a-z, and _")+" "+i.message,data:null}}return i}function b(e){r(i(e)).length==0&&e.shift();var n={successful:!0,message:"",data:[]};if(i(e)==")")n={successful:!1,message:t.generateExceptionMessage(o,a,"Parameter value expected")+" "+n.message,data:null};else{n=w(e);var s=n.message;n.successful||(n=C(e),n.message=n.message+" "+s,s=n.message,n.successful||(n=L(e),n.message=n.message+" "+s,s=n.message,n.successful||(n=A(e),n.message=n.message+" "+s,s=n.message,n.successful||(n=O(e),n.message=n.message+" "+s,s=n.message,n.successful||(n={successful:!1,message:t.generateExceptionMessage(o,a,"Parameter value must be a number, quoted string, regular expression, or a boolean")+" "+s,data:null})))))}return n}function w(e){var n=E(e);return n.successful||(n=S(e),n.successful||(n={successful:!1,message:t.generateExceptionMessage(o,a,"Parameter value is not a number")+" "+n.message,data:null})),n}function E(e){var n=e.shift(),r={successful:!0,message:"",data:null};return n=="-"?(r=S(e),r.successful&&(r.data=n+r.data)):(e.unshift(n),r={successful:!1,message:t.generateExceptionMessage(o,a,"Not a negative number"),data:null}),r}function S(e){var n=null;if(i(e)!="."){n=T(e);if(i(e)=="."){var r=n.data;n=x(e),n.successful&&(n.data=r+n.data)}}else n=x(e);return n.successful||(n={successful:!1,message:t.generateExceptionMessage(o,a,"Not a positive number")+" "+n.message,data:null}),n}function x(e){var n=e.shift(),r=T(e);return r.successful?r.data=n+r.data:r={successful:!1,message:t.generateExceptionMessage(o,a,"Not a valid fraction"),data:null},r}function T(e){var n=r(e.shift()),i=N(n.charAt(0));if(i.successful){var s=1;while(s<n.length&&i.successful)i=N(n.charAt(s)),s++;i.successful&&(i.data=n)}else e.unshift(n),i={successful:!1,message:t.generateExceptionMessage(o,a,"Not a valid integer")+" "+i.message,data:[]};return i}function N(e){var n={successful:!0,message:"",data:null};return/[0-9]/.test(e)||(n={successful:!1,message:t.generateExceptionMessage(o,a,"Not a valid digit"),data:null}),n}function C(e){var n=e.shift(),r="",s={successful:!0,message:"",data:null};if(n=='"'){var u=!1;while(e.length>0&&s.successful&&!u)i(e)=='"'?(u=!0,e.shift()):(s=k(e),r+=s.data);u||(s={successful:!1,message:t.generateExceptionMessage(o,a,"Unterminated string literal"),data:null})}else e.unshift(n),s={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid quoted string"),data:null};return s.successful=s.successful&&u,s.data=r,s}function k(e){var t="",n=e.shift();return n=="\\"&&(t=e.shift()),{successful:!0,message:"",data:n+t}}function L(e){var n="",r=e.shift(),s={successful:!0,message:"",data:null};if(r=="/"){n=r;var u=!1;while(e.length>0&&s.successful&&!u)i(e)=="/"?(n+=e.shift(),u=!0):(s=k(e),n+=s.data);u||(s={successful:!1,message:t.generateExceptionMessage(o,a,"Unterminated regex literal"),data:null})}else e.unshift(r),s={successful:!1,message:t.generateExceptionMessage(o,a,"Not a regular expression"),data:null};return s.successful=s.successful&&u,s.data=n,s}function A(e){var n=e.shift(),i={successful:!0,message:"",data:null};return r(n)=="true"||r(n)=="false"?i={successful:!0,message:"",data:n==="true"}:(e.unshift(n),i={successful:!1,message:t.generateExceptionMessage(o,a,"Not a boolean"),data:null}),i}function O(e){var n=[],s=e.shift(),u={successful:!0,message:"",data:null};if(s=="["){r(i(e)).length==0&&e.shift(),i(e)=="]"?u={successful:!0,message:"",data:""}:u=M(e);if(u.successful){n.push(u.data),r(i(e)).length==0&&e.shift();while(e.length>0&&i(e)==","&&u.successful)e.shift(),u=M(e),n.push(u.data),r(i(e)).length==0&&e.shift();u.data=n,s=e.shift(),r(s).length==0&&e.shift(),s!="]"&&(u={successful:!1,message:t.generateExceptionMessage(o,a,"Cannot find matching closing ] in group definition")+" "+u.message,data:null})}else u={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid group definition")+" "+u.message,data:null}}else e.unshift(s),u={successful:!1,message:t.generateExceptionMessage(o,a,"Not a valid group definition"),data:null};return u}function M(e){var n={successful:!0,message:"",data:""},i=r(e.shift());i.length==0&&(i=e.shift()),n=d(i.charAt(0));if(n.successful){var s=1;while(s<i.length&&n.successful)n=v(i.charAt(s)),s++;n.successful&&(n.data=i)}else n={successful:!1,message:t.generateExceptionMessage(o,a,"Invalid starting character for group name. Can only include A-Z, a-z, and _")+" "+n.message,data:null};return n}var a="",f=s({str:r(u.replace(/\s*\n\s*/g,"")),delimiters:'@()[]=,"\\/-\\.',returnDelimiters:!0,returnEmptyTokens:!1});return l(f)}return{parse:o}}),function(e,t){typeof define=="function"&&define.amd?define("service/BindingService",["utils/MapUtils","service/GroupService","utils/DOMUtils","parser/Parser","service/ConstraintService","service/ExceptionService"],t):(typeof e.regulaModules=="undefined"&&(e.regulaModules={}),e.regulaModules.BindingService=t(e.regulaModules.MapUtils,e.regulaModules.GroupService,e.regulaModules.DOMUtils,e.regulaModules.Parser,e.regulaModules.ConstraintService,e.regulaModules.ExceptionService))}(this,function(e,t,n,r,i,s){function a(){o===null&&f()}function f(){o={Default:{}}}function l(){return o}function c(n,r){if(e.isEmpty(o[r][n])){delete o[r][n];if(e.isEmpty(o[r])){delete o[r];var i=t.Group[r];delete t.Group[r],delete t.ReverseGroup[i],t.deletedGroupIndices.push(i)}}}function h(e){var t={successful:!0,message:"",data:null},n=typeof e.cloneNode!="undefined"?e.cloneNode(!1):e,r=null;return typeof n.tagName!="undefined"&&(r=n.tagName.toLowerCase()),r!=="form"&&r!=="select"&&r!=="textarea"&&r!=="input"?t={successful:!1,message:r+"#"+e.id+" is not an input, select, textarea, or form element! Validation constraints can only be attached to input, select, textarea, or form elements.",data:null}:r==="input"&&e.getAttribute("type")===null&&(t={successful:!1,message:r+"#"+e.id+" does not have a type attribute.",data:null}),t}function p(e){var t=e.element,i;t===null?i=n.getElementsByAttribute(document.body,"*","data-constraints"):i=[t];var s={successful:!0,message:"",data:null},o=0;while(o<i.length&&s.successful){t=i[o],s=h(t);if(s.successful){t.id||(t.id=n.generateRandomId());var u=t.getAttribute("data-constraints");if(u!==null){s=r.parse(t,u);if(s.successful&&s.data!==null){var a=s.data,f=0;while(s.successful&&f<a.length){var l=a[f];s=g(l.element,l.constraintName,l.definedParameters),f++}}}o++}}return s}function d(t){function a(e,t,r){for(var i=0;i<t.length;i++){var s=t[i];s.id||(s.id=n.generateRandomId()),e[s.id]||(e[s.id]=[]);var o={constraint:r.constraint,params:{}};r.value===null&&(o.params[r.attribute]=n.getAttributeValueForElement(s,r.attribute)),e[s.id].push(o)}}var r=t.element,s={successful:!0,message:"",data:null},o=[{attribute:"required",value:null,constraint:i.Constraint.HTML5Required},{attribute:"type",value:"email",constraint:i.Constraint.HTML5Email},{attribute:"type",value:"url",constraint:i.Constraint.HTML5URL},{attribute:"pattern",value:null,constraint:i.Constraint.HTML5Pattern},{attribute:"maxlength",value:null,constraint:i.Constraint.HTML5MaxLength},{attribute:"min",value:null,constraint:i.Constraint.HTML5Min},{attribute:"max",value:null,constraint:i.Constraint.HTML5Max},{attribute:"step",value:null,constraint:i.Constraint.HTML5Step}],u={email:i.Constraint.HTML5Email,url:i.Constraint.HTML5URL},f={};if(r===null)for(var l=0;l<o.length;l++){var c=o[l],p=null;c.value==null?p=n.getElementsByAttribute(document.body,"*",c.attribute):p=n.getElementsByAttribute(document.body,"*",c.attribute,c.value),a(f,p,c)}else{r.id||(r.id=n.generateRandomId()),s=h(r);if(s.successful){f[r.id]=[];for(var l=0;l<o.length;l++){var c=o[l];if(c.value===null){if(n.getAttributeValueForElement(r,c.attribute)!=null){var d={constraint:c.constraint,params:{}};d.params[c.attribute]=n.getAttributeValueForElement(r,c.attribute),f[r.id].push(d)}}else{var v=n.getAttributeValueForElement(r,c.attribute);v!=null&&typeof u[v]!="undefined"&&f[r.id].push({constraint:u[v],params:{}})}}}}return e.iterateOverMap(f,function(e,t,n){var r=document.getElementById(e);for(var o=0;o<t.length;o++){var u=t[o];s=g(r,i.ReverseConstraint[u.constraint],u.params)}}),s}function v(e){var t={successful:!0,message:"",data:null},n=e.element,r=e.constraints||[],i=n&&n.tagName?n.tagName.toLowerCase():null;if(!n)t={successful:!1,message:"regula.bind expects a non-null element attribute in the options argument. "+s.explodeParameters(e),data:null};else if(n.nodeType!==1)t={successful:!1,message:"regula.bind: element attribute is expected to be an HTMLElement, but was of unexpected type: "+typeof n+". "+s.explodeParameters(e),data:null};else if(i!="form"&&i!="select"&&i!="textarea"&&i!="input")t={successful:!1,message:i+"#"+n.id+" is not an input, select, textarea, or form element! Validation constraints can only be attached to input, select, textarea, or form elements. "+s.explodeParameters(e),data:null};else if(r.length>0){var o=0;while(o<r.length&&t.successful)t=m(r[o],e),o++}else t=p({element:n});return t}function m(n,r){function u(e,t){var n={},r=[];for(var i=0;i<e.length;i++)r.push(e[i]),n[e[i]]=!0;for(var s=0;s<t.length;s++)n[t[s]]||r.push(t[s]);return r}function a(t,n){var r=[];for(var i=0;i<n.length;i++)e.exists(t,n[i])||r.push(n[i]);return r}function f(n,r,s){var f=o[t.ReverseGroup[t.Group.Default]][n.id][i.ReverseConstraint[r]].groups,l=[];s.groups?l=s.groups:l.push(t.ReverseGroup[t.Group.Default]),e.exists(l,t.ReverseGroup[t.Group.Default])||l.push(t.ReverseGroup[t.Group.Default]);var h=a(l,u(f,l));for(var p=0;p<h.length;p++){var d=h[p];delete o[d][n.id][i.ReverseConstraint[r]],c(n.id,d)}}var l={successful:!0,message:"",data:null},h=r.element,p=n.overwriteConstraint||!1,d=n.overwriteParameters||!1,v=n.constraintType,m=n.params||{},y={__size__:0},b=m.groups;if(typeof v=="undefined")l={successful:!1,message:"regula.bind expects a valid constraint type for each constraint in constraints attribute of the options argument. "+s.explodeParameters(r),data:null};else if(m&&m.groups)if(m.groups instanceof Array){var w=[],E=0;while(E<m.groups.length&&l.successful)typeof m["groups"][E]=="string"?w.push(m.groups[E]):typeof t.ReverseGroup[m["groups"][E]]!="undefined"?w.push(t.ReverseGroup[m.groups[E]]):l={successful:!1,message:"Invalid group: "+m.groups[E]+". "+s.explodeParameters(r),data:null},E++;l.successful&&(m.groups=w)}else l={successful:!1,message:"The groups parameter must be an array of enums or strings "+s.explodeParameters(r),data:null};if(l.successful){if(!o[t.ReverseGroup[t.Group.Default]][h.id]||!o[t.ReverseGroup[t.Group.Default]][h.id][i.ReverseConstraint[v]]){for(var S in m)m.hasOwnProperty(S)&&e.put(y,S,m[S]);l=i.verifyConstraintDefinition(h,i.ReverseConstraint[v],y)}else if(p){for(var S in m)m.hasOwnProperty(S)&&e.put(y,S,m[S]);l=i.verifyConstraintDefinition(h,i.ReverseConstraint[v],y),l.successful&&f(h,v,m)}else{var x=o[t.ReverseGroup[t.Group.Default]][h.id][i.ReverseConstraint[v]];for(var S in x)x.hasOwnProperty(S)&&e.put(y,S,x[S]);if(d){for(var S in m)m.hasOwnProperty(S)&&e.put(y,S,m[S]);l=i.verifyConstraintDefinition(h,i.ReverseConstraint[v],y),l.successful&&f(h,v,y)}else for(var S in m)m.hasOwnProperty(S)&&(x[S]||e.put(y,S,m[S]))}l.successful&&(l=g(h,i.ReverseConstraint[v],y))}return m.groups=b,l}function g(n,r,u){var a={successful:!0,message:"",data:null};u.groups||e.put(u,"groups",[t.ReverseGroup[t.Group.Default]]);var f=u.groups;f.indexOf(t.ReverseGroup[t.Group.Default])===-1&&(f.push(t.ReverseGroup[t.Group.Default]),u.groups=f);for(var l=0;l<f.length;l++){var c=f[l];if(!o[c]){var h=-1;t.deletedGroupIndices.length>0?h=t.deletedGroupIndices.pop():h=t.firstCustomGroupIndex++,t.Group[c]=h,t.ReverseGroup[h]=c,o[c]={}}o[c][n.id]||(o[c][n.id]={}),o[c][n.id][r]=u}if(i.constraintDefinitions[r].html5)if(n.getAttribute("type")!==null&&i.constraintDefinitions[r].inputType!==null&&n.getAttribute("type")!==i.constraintDefinitions[r].inputType)a={successful:!1,message:s.generateExceptionMessage(n,r,"Element type of "+n.getAttribute("type")+" conflicts with type of constraint @"+r+": "+i.constraintDefinitions[r].inputType),data:null};else{var p=i.constraintDefinitions[r].attribute,d=i.constraintDefinitions[r].inputType;(p!==null&&n.getAttribute(p)===null||d!==null&&n.getAttribute("type")===null)&&y(n,r,u)}return a}function y(e,t,n){if(t===i.ReverseConstraint[i.Constraint.HTML5Required])e.setAttribute("required","true");else{var r=i.constraintDefinitions[t];for(var s=0;s<r.params.length;s++)e.setAttribute(r.params[s],n[r.params[s]])}var o=e.getAttribute("class");/regula-modified/.test(o)||e.setAttribute("class",o+" regula-modified")}function b(e){var t=!1;for(var n=0;n<e.elements.length;n++){var r=e.elements[n].id,u=e.constraints||[];if(u.length==0)for(var a in o)o.hasOwnProperty(a)&&typeof o[a][r]!="undefined"&&(delete o[a][r],a!=="Default"&&c(r,a),t=!0);else for(var f=0;f<u.length;f++){var l=u[f];for(var a in o)o.hasOwnProperty(a)&&typeof o[a][r]!="undefined"&&(delete o[a][r][i.ReverseConstraint[l]],a!=="Default"&&c(r,a),t=!0)}}if(e.elements.length>0&&!t)throw new s.Exception.IllegalArgumentException("Element with id "+r+" does not have any constraints bound to it. "+s.explodeParameters(e))}function w(e){var n=e.elementId,r=e.group,s=e.constraint,u=typeof o[t.ReverseGroup[t.Group.Default]][n]!="undefined";if(u&&typeof r!="undefined"&&typeof s=="undefined"){var a=t.ReverseGroup[r];u=typeof a!="undefined"&&typeof o[a][n]!="undefined"}else if(u&&typeof r=="undefined"&&typeof s!="undefined"){var f=i.ReverseConstraint[s];u=typeof f!="undefined"&&typeof o[t.ReverseGroup[t.Group.Default]][n][f]!="undefined"}else if(u&&typeof r!="undefined"&&typeof s!="undefined"){var a=t.ReverseGroup[r],f=i.ReverseConstraint[s];u=typeof a!="undefined"&&typeof f!="undefined"&&typeof o[a][n]!="undefined"&&typeof o[a][n][f]!="undefined"}return u}var o=null,u={};return{initializeBoundConstraints:a,resetBoundConstraints:f,getBoundConstraints:l,removeElementAndGroupFromBoundConstraintsIfEmpty:c,bindAfterParsing:p,bindHTML5ValidationConstraints:d,bindFromOptions:v,unbind:b,isBound:w}}),function(e,t){typeof define=="function"&&define.amd?define("regula",["utils/MapUtils","utils/DOMUtils","service/BindingService","service/ExceptionService","service/ConstraintService","service/ValidationService","service/GroupService"],t):(e.regula=t(e.regulaModules.MapUtils,e.regulaModules.DOMUtils,e.regulaModules.BindingService,e.regulaModules.ExceptionService,e.regulaModules.ConstraintService,e.regulaModules.ValidationService,e.regulaModules.GroupService),e.regula._modules=e.regulaModules,e.regulaModules=undefined)}(this,function(e,t,n,r,i,s,o){function f(t){e.iterateOverMap(t,function(e,t,n){typeof u[e]!="undefined"&&(u[e]=t)})}function l(e){var i={successful:!0,message:"",data:null};if(typeof e=="undefined"||!e)n.resetBoundConstraints(),u.enableHTML5Validation&&t.supportsHTML5Validation()&&(i=n.bindHTML5ValidationConstraints({element:null})),i.successful&&(i=n.bindAfterParsing({element:null}));else{var s=e.elements;if(typeof s=="undefined"||!s)u.enableHTML5Validation&&t.supportsHTML5Validation()&&typeof e.element!="undefined"&&e.element!==null&&(i=n.bindHTML5ValidationConstraints({element:e.element})),i.successful&&(i=n.bindFromOptions(e));else{var o=0;while(i.successful&&o<s.length)e.element=s[o],u.enableHTML5Validation&&t.supportsHTML5Validation()&&(i=n.bindHTML5ValidationConstraints({element:e.element})),i.successful?(i=n.bindFromOptions(e),i.successful||(i.message="regula.bind: Element "+(o+1)+" of "+s.length+" failed: "+i.message)):i.message="regula.bind: Failed binding HTML5 validation constraints: Element "+(o+1)+" of "+s.length+" failed: "+i.message,o++}}if(!i.successful)throw new r.Exception.BindException(i.message)}function c(e){if(typeof e=="undefined"||!e)n.resetBoundConstraints();else{if(typeof e.elementId=="undefined"&&typeof e.elements=="undefined")throw new r.Exception.IllegalArgumentException("regula.unbind requires an elementId attribute, or an elements attribute if options are provided");if(!(typeof e.elements=="undefined"||e.elements instanceof Array))throw new r.Exception.IllegalArgumentException("regula.unbind expects the elements attribute to be an array, if it is provided");if(typeof e.elements=="undefined"){e.elements=[document.getElementById(e.elementId)];if(e.elements[0]===null)throw new r.Exception.IllegalArgumentException("Element with id "+e.elementId+" does not have any constraints bound to it. "+r.explodeParameters(e))}n.unbind(e)}}function h(e){if(typeof e=="undefined")throw new r.Exception.IllegalArgumentException("regula.isBound expects options");var t=e.element,i=e.elementId;if(typeof t=="undefined"&&typeof i=="undefined")throw new r.Exception.IllegalArgumentException("regula.isBound expects at the very least, either an element or elementId attribute");if(e.hasOwnProperty("constraint")&&typeof e.constraint=="undefined")throw new r.Exception.IllegalArgumentException("Undefined constraint was supplied as a parameter");if(e.hasOwnProperty("group")&&typeof e.group=="undefined")throw new r.Exception.IllegalArgumentException("Undefined group was supplied as a parameter");return typeof t!="undefined"&&(i=t.id),n.isBound({elementId:i,group:e.group,constraint:e.constraint})}function p(e){if(!e)throw new r.Exception.IllegalArgumentException("regula.override expects options");if(typeof e.constraintType=="undefined")throw new r.Exception.IllegalArgumentException("regula.override expects a valid constraintType attribute in the options argument");var t=i.ReverseConstraint[e.constraintType];if(typeof t=="undefined")throw new r.Exception.IllegalArgumentException("regula.override: I could not find the specified constraint. Perhaps it has not been defined? Function received: "+r.explodeParameters(e));var n=!1,s=i.constraintDefinitions[t].formSpecific;i.constraintDefinitions[t].custom&&(s=typeof e.formSpecific=="undefined"?i.constraintDefinitions[t].formSpecific:e.formSpecific);var o=i.constraintDefinitions[t].custom&&typeof e.async!="undefined"?e.async:i.constraintDefinitions[t].async,u=i.constraintDefinitions[t].custom?e.params||i.constraintDefinitions[t].params:i.constraintDefinitions[t].params,a=e.defaultMessage||i.constraintDefinitions[t].defaultMessage,f=i.constraintDefinitions[t].compound,l=e.constraints||i.constraintDefinitions[t].constraints,c=i.constraintDefinitions[t].validator;i.constraintDefinitions[t].custom&&!i.constraintDefinitions[t].compound&&typeof e.validator!="undefined"&&(c=e.validator,n=!0);if(typeof s!="boolean")throw new r.Exception.IllegalArgumentException("regula.override expects the formSpecific attribute in the options argument to be a boolean");if(typeof c!="function")throw new r.Exception.IllegalArgumentException("regula.override expects the validator attribute in the options argument to be a function");if(!(u instanceof Array))throw new r.Exception.IllegalArgumentException("regula.override expects the params attribute in the options argument to be an array");if(typeof a!="string")throw new r.Exception.IllegalArgumentException("regula.override expects the defaultMessage attribute in the options argument to be a string");i.override({async:o,formSpecific:s,name:t,constraintType:e.constraintType,compound:f,params:u,composingConstraints:l,defaultMessage:a,validator:c,validatorRedefined:n})}function d(e){if(!e)throw new r.Exception.IllegalArgumentException("regula.custom expects options");var t=e.name,n=e.formSpecific||!1,s=e.validator,o=e.params||[],u=e.defaultMessage||"",a=typeof e.async=="undefined"?!1:e.async;if(!t)throw new r.Exception.IllegalArgumentException("regula.custom expects a name attribute in the options argument");if(typeof t!="string")throw new r.Exception.IllegalArgumentException("regula.custom expects the name attribute in the options argument to be a string");if(t.replace(/\s/g,"").length==0)throw new r.Exception.IllegalArgumentException("regula.custom cannot accept an empty string for the name attribute in the options argument");if(typeof n!="boolean")throw new r.Exception.IllegalArgumentException("regula.custom expects the formSpecific attribute in the options argument to be a boolean");if(!s)throw new r.Exception.IllegalArgumentException("regula.custom expects a validator attribute in the options argument");if(typeof s!="function")throw new r.Exception.IllegalArgumentException("regula.custom expects the validator attribute in the options argument to be a function");if(o.constructor.toString().indexOf("Array")<0)throw new r.Exception.IllegalArgumentException("regula.custom expects the params attribute in the options argument to be an array");if(typeof u!="string")throw new r.Exception.IllegalArgumentException("regula.custom expects the defaultMessage attribute in the options argument to be a string");if(i.constraintDefinitions[t])throw new r.Exception.IllegalArgumentException("There is already a constraint called "+t+". If you wish to override this constraint, use regula.override");i.custom({async:a,name:t,formSpecific:n,validator:s,custom:!0,compound:!1,params:o,defaultMessage:u})}function v(e){if(!e)throw new r.Exception.IllegalArgumentException("regula.compound expects options");var t=e.name,n=e.constraints||[],s=e.formSpecific||!1,o=e.defaultMessage||"",u=e.params||[],a=typeof e.reportAsSingleViolation=="undefined"?!1:e.reportAsSingleViolation;if(!t)throw new r.Exception.IllegalArgumentException("regula.compound expects a name attribute in the options argument");if(typeof t!="string")throw new r.Exception.IllegalArgumentException("regula.compound expects name to be a string parameter");if(u.constructor.toString().indexOf("Array")<0)throw new r.Exception.IllegalArgumentException("regula.compound expects the params attribute in the options argument to be an array");if(n.length==0)throw new r.Exception.IllegalArgumentException("regula.compound expects an array of composing constraints under a constraints attribute in the options argument");if(i.constraintDefinitions[t])throw new r.Exception.IllegalArgumentException("regula.compound: There is already a constraint called "+t+". If you wish to override this constraint, use regula.override");i.compound({name:t,formSpecific:s,params:u,reportAsSingleViolation:a,constraints:n,defaultMessage:o})}function m(e,t){s.init({config:u,ReverseConstraint:i.ReverseConstraint,constraintDefinitions:i.constraintDefinitions,boundConstraints:n.getBoundConstraints()});var o=[];if(typeof e=="undefined"||typeof e.groups=="undefined"||e.groups instanceof Array){if(typeof e!="undefined"&&typeof e.groups!="undefined"&&e.groups.length==0)throw new r.Exception.IllegalArgumentException("regula.validate: If a groups attribute is provided, it must not be empty.");if(typeof e!="undefined"&&e.hasOwnProperty("constraintType")&&typeof e.constraintType=="undefined")throw new r.Exception.IllegalArgumentException("regula.validate: If a constraintType attribute is provided, it cannot be undefined.");typeof t=="undefined"&&typeof e=="function"&&(e={callback:e}),typeof t!="undefined"&&(e.callback=t);if(typeof e!="undefined"&&typeof e.elements!="undefined"){if(!(e.elements instanceof Array))throw new r.Exception.IllegalArgumentException("regula.validate: If an elements attribute is provided, it must be an array.");if(e.elements.length==0)throw new r.Exception.IllegalArgumentException("regula.validate: If an elements attribute is provided, it must not be empty.");o=s.validate(e)}else o=s.validate(e);return o}throw new r.Exception.IllegalArgumentException("regula.validate: If a groups attribute is provided, it must be an array.")}var u={validateEmptyFields:!0,enableHTML5Validation:!0,debug:!1},a={DMY:"DMY",MDY:"MDY",YMD:"YMD"};return n.initializeBoundConstraints(),s.initializePublicValidators(i.constraintDefinitions),{configure:f,bind:l,unbind:c,isBound:h,validate:m,custom:d,compound:v,override:p,Constraint:i.Constraint,Group:o.Group,DateFormat:a,Exception:r.Exception}}); !function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function t(e){return i[e]?i[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void n.error("Method "+e+" does not exist on jQuery.regula"):i.bind.apply(this,arguments)}var n=e,i={bind:function(t){return this instanceof e&&(t||(t={}),this.get().length>0&&n.extend(!0,t,{elements:this.get()})),regula.bind(t),this},unbind:function(t){return this instanceof e&&(t||(t={}),this.get().length>0&&n.extend(!0,t,{elements:this.get()})),regula.unbind(t),this},isBound:function(t){return this instanceof e&&(t||(t={}),this.get().length>0&&n.extend(!0,t,{element:this.get(0)})),regula.isBound(t),this},validate:function(t){return this instanceof e&&(t||(t={}),this.get().length>0&&n.extend(!0,t,{elements:this.get()})),regula.validate(t)},custom:function(e){return regula.custom(e),this},compound:function(e){return regula.compound(e),this},override:function(e){return regula.override(e),this}};i.on=i.bind,i.off=i.unbind,n.fn.regula=t,n.regula=t});
/**
 * @module       jQuery Form Plugin
 * @version      3.51
 * @author       M. Alsup
 * @see          http://malsup.com/jquery/form/
 * @license      MIT and GPL licenses
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["../jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&l.push(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]:e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});
/**
 * @module       Swiper 3.1.7
 * @description  Most modern mobile touch slider and framework with hardware accelerated transitions
 * @author       Vladimir Kharlampidi
 * @see          http://www.idangero.us/swiper/
 * @licesne      MIT License
 */
!function(){"use strict";function e(e){e.fn.swiper=function(a){var s;return e(this).each(function(){var e=new t(this,a);s||(s=e)}),s}}var a,t=function(e,s){function r(){return"horizontal"===v.params.direction}function i(e){return Math.floor(e)}function n(){v.autoplayTimeoutId=setTimeout(function(){v.params.loop?(v.fixLoop(),v._slideNext()):v.isEnd?s.autoplayStopOnLast?v.stopAutoplay():v._slideTo(0):v._slideNext()},v.params.autoplay)}function o(e,t){var s=a(e.target);if(!s.is(t))if("string"==typeof t)s=s.parents(t);else if(t.nodeType){var r;return s.parents().each(function(e,a){a===t&&(r=t)}),r?t:void 0}return 0===s.length?void 0:s[0]}function l(e,a){a=a||{};var t=window.MutationObserver||window.WebkitMutationObserver,s=new t(function(e){e.forEach(function(e){v.onResize(!0),v.emit("onObserverUpdate",v,e)})});s.observe(e,{attributes:"undefined"==typeof a.attributes?!0:a.attributes,childList:"undefined"==typeof a.childList?!0:a.childList,characterData:"undefined"==typeof a.characterData?!0:a.characterData}),v.observers.push(s)}function p(e){e.originalEvent&&(e=e.originalEvent);var a=e.keyCode||e.charCode;if(!v.params.allowSwipeToNext&&(r()&&39===a||!r()&&40===a))return!1;if(!v.params.allowSwipeToPrev&&(r()&&37===a||!r()&&38===a))return!1;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===a||39===a||38===a||40===a){var t=!1;if(v.container.parents(".swiper-slide").length>0&&0===v.container.parents(".swiper-slide-active").length)return;var s={left:window.pageXOffset,top:window.pageYOffset},i=window.innerWidth,n=window.innerHeight,o=v.container.offset();v.rtl&&(o.left=o.left-v.container[0].scrollLeft);for(var l=[[o.left,o.top],[o.left+v.width,o.top],[o.left,o.top+v.height],[o.left+v.width,o.top+v.height]],p=0;p<l.length;p++){var d=l[p];d[0]>=s.left&&d[0]<=s.left+i&&d[1]>=s.top&&d[1]<=s.top+n&&(t=!0)}if(!t)return}r()?((37===a||39===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),(39===a&&!v.rtl||37===a&&v.rtl)&&v.slideNext(),(37===a&&!v.rtl||39===a&&v.rtl)&&v.slidePrev()):((38===a||40===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),40===a&&v.slideNext(),38===a&&v.slidePrev())}}function d(e){e.originalEvent&&(e=e.originalEvent);var a=v.mousewheel.event,t=0;if(e.detail)t=-e.detail;else if("mousewheel"===a)if(v.params.mousewheelForceToAxis)if(r()){if(!(Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)))return;t=e.wheelDeltaX}else{if(!(Math.abs(e.wheelDeltaY)>Math.abs(e.wheelDeltaX)))return;t=e.wheelDeltaY}else t=e.wheelDelta;else if("DOMMouseScroll"===a)t=-e.detail;else if("wheel"===a)if(v.params.mousewheelForceToAxis)if(r()){if(!(Math.abs(e.deltaX)>Math.abs(e.deltaY)))return;t=-e.deltaX}else{if(!(Math.abs(e.deltaY)>Math.abs(e.deltaX)))return;t=-e.deltaY}else t=Math.abs(e.deltaX)>Math.abs(e.deltaY)?-e.deltaX:-e.deltaY;if(v.params.mousewheelInvert&&(t=-t),v.params.freeMode){var s=v.getWrapperTranslate()+t*v.params.mousewheelSensitivity;if(s>v.minTranslate()&&(s=v.minTranslate()),s<v.maxTranslate()&&(s=v.maxTranslate()),v.setWrapperTransition(0),v.setWrapperTranslate(s),v.updateProgress(),v.updateActiveIndex(),v.params.freeModeSticky&&(clearTimeout(v.mousewheel.timeout),v.mousewheel.timeout=setTimeout(function(){v.slideReset()},300)),0===s||s===v.maxTranslate())return}else{if((new window.Date).getTime()-v.mousewheel.lastScrollTime>60)if(0>t)if(v.isEnd&&!v.params.loop||v.animating){if(v.params.mousewheelReleaseOnEdges)return!0}else v.slideNext();else if(v.isBeginning&&!v.params.loop||v.animating){if(v.params.mousewheelReleaseOnEdges)return!0}else v.slidePrev();v.mousewheel.lastScrollTime=(new window.Date).getTime()}return v.params.autoplay&&v.stopAutoplay(),e.preventDefault?e.preventDefault():e.returnValue=!1,!1}function c(e,t){e=a(e);var s,i,n;s=e.attr("data-swiper-parallax")||"0",i=e.attr("data-swiper-parallax-x"),n=e.attr("data-swiper-parallax-y"),i||n?(i=i||"0",n=n||"0"):r()?(i=s,n="0"):(n=s,i="0"),i=i.indexOf("%")>=0?parseInt(i,10)*t+"%":i*t+"px",n=n.indexOf("%")>=0?parseInt(n,10)*t+"%":n*t+"px",e.transform("translate3d("+i+", "+n+",0px)")}function u(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof t))return new t(e,s);var m={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,iOSEdgeSwipeDetection:!1,iOSEdgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,scrollbar:null,scrollbarHide:!0,scrollbarDraggable:!1,scrollbarSnapOnRelease:!1,keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,mousewheelSensitivity:1,hashnav:!1,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,pagination:null,paginationElement:"span",paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,controlBy:"slide",allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationHiddenClass:"swiper-pagination-hidden",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",runCallbacksOnInit:!0},f=s&&s.virtualTranslate;s=s||{};for(var h in m)if("undefined"==typeof s[h])s[h]=m[h];else if("object"==typeof s[h])for(var g in m[h])"undefined"==typeof s[h][g]&&(s[h][g]=m[h][g]);var v=this;if(v.params=s,v.classNames=[],"undefined"!=typeof a&&"undefined"!=typeof Dom7&&(a=Dom7),("undefined"!=typeof a||(a="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7))&&(v.$=a,v.container=a(e),0!==v.container.length)){if(v.container.length>1)return void v.container.each(function(){new t(this,s)});v.container[0].swiper=v,v.container.data("swiper",v),v.classNames.push("swiper-container-"+v.params.direction),v.params.freeMode&&v.classNames.push("swiper-container-free-mode"),v.support.flexbox||(v.classNames.push("swiper-container-no-flexbox"),v.params.slidesPerColumn=1),(v.params.parallax||v.params.watchSlidesVisibility)&&(v.params.watchSlidesProgress=!0),["cube","coverflow"].indexOf(v.params.effect)>=0&&(v.support.transforms3d?(v.params.watchSlidesProgress=!0,v.classNames.push("swiper-container-3d")):v.params.effect="slide"),"slide"!==v.params.effect&&v.classNames.push("swiper-container-"+v.params.effect),"cube"===v.params.effect&&(v.params.resistanceRatio=0,v.params.slidesPerView=1,v.params.slidesPerColumn=1,v.params.slidesPerGroup=1,v.params.centeredSlides=!1,v.params.spaceBetween=0,v.params.virtualTranslate=!0,v.params.setWrapperSize=!1),"fade"===v.params.effect&&(v.params.slidesPerView=1,v.params.slidesPerColumn=1,v.params.slidesPerGroup=1,v.params.watchSlidesProgress=!0,v.params.spaceBetween=0,"undefined"==typeof f&&(v.params.virtualTranslate=!0)),v.params.grabCursor&&v.support.touch&&(v.params.grabCursor=!1),v.wrapper=v.container.children("."+v.params.wrapperClass),v.params.pagination&&(v.paginationContainer=a(v.params.pagination),v.params.paginationClickable&&v.paginationContainer.addClass("swiper-pagination-clickable")),v.rtl=r()&&("rtl"===v.container[0].dir.toLowerCase()||"rtl"===v.container.css("direction")),v.rtl&&v.classNames.push("swiper-container-rtl"),v.rtl&&(v.wrongRTL="-webkit-box"===v.wrapper.css("display")),v.params.slidesPerColumn>1&&v.classNames.push("swiper-container-multirow"),v.device.android&&v.classNames.push("swiper-container-android"),v.container.addClass(v.classNames.join(" ")),v.translate=0,v.progress=0,v.velocity=0,v.lockSwipeToNext=function(){v.params.allowSwipeToNext=!1},v.lockSwipeToPrev=function(){v.params.allowSwipeToPrev=!1},v.lockSwipes=function(){v.params.allowSwipeToNext=v.params.allowSwipeToPrev=!1},v.unlockSwipeToNext=function(){v.params.allowSwipeToNext=!0},v.unlockSwipeToPrev=function(){v.params.allowSwipeToPrev=!0},v.unlockSwipes=function(){v.params.allowSwipeToNext=v.params.allowSwipeToPrev=!0},v.params.grabCursor&&(v.container[0].style.cursor="move",v.container[0].style.cursor="-webkit-grab",v.container[0].style.cursor="-moz-grab",v.container[0].style.cursor="grab"),v.imagesToLoad=[],v.imagesLoaded=0,v.loadImage=function(e,a,t,s,r){function i(){r&&r()}var n;e.complete&&s?i():a?(n=new window.Image,n.onload=i,n.onerror=i,t&&(n.srcset=t),a&&(n.src=a)):i()},v.preloadImages=function(){function e(){"undefined"!=typeof v&&null!==v&&(void 0!==v.imagesLoaded&&v.imagesLoaded++,v.imagesLoaded===v.imagesToLoad.length&&(v.params.updateOnImagesReady&&v.update(),v.emit("onImagesReady",v)))}v.imagesToLoad=v.container.find("img");for(var a=0;a<v.imagesToLoad.length;a++)v.loadImage(v.imagesToLoad[a],v.imagesToLoad[a].currentSrc||v.imagesToLoad[a].getAttribute("src"),v.imagesToLoad[a].srcset||v.imagesToLoad[a].getAttribute("srcset"),!0,e)},v.autoplayTimeoutId=void 0,v.autoplaying=!1,v.autoplayPaused=!1,v.startAutoplay=function(){return"undefined"!=typeof v.autoplayTimeoutId?!1:v.params.autoplay?v.autoplaying?!1:(v.autoplaying=!0,v.emit("onAutoplayStart",v),void n()):!1},v.stopAutoplay=function(){v.autoplayTimeoutId&&(v.autoplayTimeoutId&&clearTimeout(v.autoplayTimeoutId),v.autoplaying=!1,v.autoplayTimeoutId=void 0,v.emit("onAutoplayStop",v))},v.pauseAutoplay=function(e){v.autoplayPaused||(v.autoplayTimeoutId&&clearTimeout(v.autoplayTimeoutId),v.autoplayPaused=!0,0===e?(v.autoplayPaused=!1,n()):v.wrapper.transitionEnd(function(){v&&(v.autoplayPaused=!1,v.autoplaying?n():v.stopAutoplay())}))},v.minTranslate=function(){return-v.snapGrid[0]},v.maxTranslate=function(){return-v.snapGrid[v.snapGrid.length-1]},v.updateContainerSize=function(){var e,a;e="undefined"!=typeof v.params.width?v.params.width:v.container[0].clientWidth,a="undefined"!=typeof v.params.height?v.params.height:v.container[0].clientHeight,0===e&&r()||0===a&&!r()||(e=e-parseInt(v.container.css("padding-left"),10)-parseInt(v.container.css("padding-right"),10),a=a-parseInt(v.container.css("padding-top"),10)-parseInt(v.container.css("padding-bottom"),10),v.width=e,v.height=a,v.size=r()?v.width:v.height)},v.updateSlidesSize=function(){v.slides=v.wrapper.children("."+v.params.slideClass),v.snapGrid=[],v.slidesGrid=[],v.slidesSizesGrid=[];var e,a=v.params.spaceBetween,t=-v.params.slidesOffsetBefore,s=0,n=0;"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*v.size),v.virtualSize=-a,v.slides.css(v.rtl?{marginLeft:"",marginTop:""}:{marginRight:"",marginBottom:""});var o;v.params.slidesPerColumn>1&&(o=Math.floor(v.slides.length/v.params.slidesPerColumn)===v.slides.length/v.params.slidesPerColumn?v.slides.length:Math.ceil(v.slides.length/v.params.slidesPerColumn)*v.params.slidesPerColumn,"auto"!==v.params.slidesPerView&&"row"===v.params.slidesPerColumnFill&&(o=Math.max(o,v.params.slidesPerView*v.params.slidesPerColumn)));var l,p=v.params.slidesPerColumn,d=o/p,c=d-(v.params.slidesPerColumn*d-v.slides.length);for(e=0;e<v.slides.length;e++){l=0;var u=v.slides.eq(e);if(v.params.slidesPerColumn>1){var m,f,h;"column"===v.params.slidesPerColumnFill?(f=Math.floor(e/p),h=e-f*p,(f>c||f===c&&h===p-1)&&++h>=p&&(h=0,f++),m=f+h*o/p,u.css({"-webkit-box-ordinal-group":m,"-moz-box-ordinal-group":m,"-ms-flex-order":m,"-webkit-order":m,order:m})):(h=Math.floor(e/d),f=e-h*d),u.css({"margin-top":0!==h&&v.params.spaceBetween&&v.params.spaceBetween+"px"}).attr("data-swiper-column",f).attr("data-swiper-row",h)}"none"!==u.css("display")&&("auto"===v.params.slidesPerView?(l=r()?u.outerWidth(!0):u.outerHeight(!0),v.params.roundLengths&&(l=i(l))):(l=(v.size-(v.params.slidesPerView-1)*a)/v.params.slidesPerView,v.params.roundLengths&&(l=i(l)),r()?v.slides[e].style.width=l+"px":v.slides[e].style.height=l+"px"),v.slides[e].swiperSlideSize=l,v.slidesSizesGrid.push(l),v.params.centeredSlides?(t=t+l/2+s/2+a,0===e&&(t=t-v.size/2-a),Math.abs(t)<.001&&(t=0),n%v.params.slidesPerGroup===0&&v.snapGrid.push(t),v.slidesGrid.push(t)):(n%v.params.slidesPerGroup===0&&v.snapGrid.push(t),v.slidesGrid.push(t),t=t+l+a),v.virtualSize+=l+a,s=l,n++)}v.virtualSize=Math.max(v.virtualSize,v.size)+v.params.slidesOffsetAfter;var g;if(v.rtl&&v.wrongRTL&&("slide"===v.params.effect||"coverflow"===v.params.effect)&&v.wrapper.css({width:v.virtualSize+v.params.spaceBetween+"px"}),(!v.support.flexbox||v.params.setWrapperSize)&&v.wrapper.css(r()?{width:v.virtualSize+v.params.spaceBetween+"px"}:{height:v.virtualSize+v.params.spaceBetween+"px"}),v.params.slidesPerColumn>1&&(v.virtualSize=(l+v.params.spaceBetween)*o,v.virtualSize=Math.ceil(v.virtualSize/v.params.slidesPerColumn)-v.params.spaceBetween,v.wrapper.css({width:v.virtualSize+v.params.spaceBetween+"px"}),v.params.centeredSlides)){for(g=[],e=0;e<v.snapGrid.length;e++)v.snapGrid[e]<v.virtualSize+v.snapGrid[0]&&g.push(v.snapGrid[e]);v.snapGrid=g}if(!v.params.centeredSlides){for(g=[],e=0;e<v.snapGrid.length;e++)v.snapGrid[e]<=v.virtualSize-v.size&&g.push(v.snapGrid[e]);v.snapGrid=g,Math.floor(v.virtualSize-v.size)>Math.floor(v.snapGrid[v.snapGrid.length-1])&&v.snapGrid.push(v.virtualSize-v.size)}0===v.snapGrid.length&&(v.snapGrid=[0]),0!==v.params.spaceBetween&&v.slides.css(r()?v.rtl?{marginLeft:a+"px"}:{marginRight:a+"px"}:{marginBottom:a+"px"}),v.params.watchSlidesProgress&&v.updateSlidesOffset()},v.updateSlidesOffset=function(){for(var e=0;e<v.slides.length;e++)v.slides[e].swiperSlideOffset=r()?v.slides[e].offsetLeft:v.slides[e].offsetTop},v.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=v.translate||0),0!==v.slides.length){"undefined"==typeof v.slides[0].swiperSlideOffset&&v.updateSlidesOffset();var a=-e;v.rtl&&(a=e);{v.container[0].getBoundingClientRect(),r()?"left":"top",r()?"right":"bottom"}v.slides.removeClass(v.params.slideVisibleClass);for(var t=0;t<v.slides.length;t++){var s=v.slides[t],i=(a-s.swiperSlideOffset)/(s.swiperSlideSize+v.params.spaceBetween);if(v.params.watchSlidesVisibility){var n=-(a-s.swiperSlideOffset),o=n+v.slidesSizesGrid[t],l=n>=0&&n<v.size||o>0&&o<=v.size||0>=n&&o>=v.size;l&&v.slides.eq(t).addClass(v.params.slideVisibleClass)}s.progress=v.rtl?-i:i}}},v.updateProgress=function(e){"undefined"==typeof e&&(e=v.translate||0);var a=v.maxTranslate()-v.minTranslate();0===a?(v.progress=0,v.isBeginning=v.isEnd=!0):(v.progress=(e-v.minTranslate())/a,v.isBeginning=v.progress<=0,v.isEnd=v.progress>=1),v.isBeginning&&v.emit("onReachBeginning",v),v.isEnd&&v.emit("onReachEnd",v),v.params.watchSlidesProgress&&v.updateSlidesProgress(e),v.emit("onProgress",v,v.progress)},v.updateActiveIndex=function(){var e,a,t,s=v.rtl?v.translate:-v.translate;for(a=0;a<v.slidesGrid.length;a++)"undefined"!=typeof v.slidesGrid[a+1]?s>=v.slidesGrid[a]&&s<v.slidesGrid[a+1]-(v.slidesGrid[a+1]-v.slidesGrid[a])/2?e=a:s>=v.slidesGrid[a]&&s<v.slidesGrid[a+1]&&(e=a+1):s>=v.slidesGrid[a]&&(e=a);(0>e||"undefined"==typeof e)&&(e=0),t=Math.floor(e/v.params.slidesPerGroup),t>=v.snapGrid.length&&(t=v.snapGrid.length-1),e!==v.activeIndex&&(v.snapIndex=t,v.previousIndex=v.activeIndex,v.activeIndex=e,v.updateClasses())},v.updateClasses=function(){v.slides.removeClass(v.params.slideActiveClass+" "+v.params.slideNextClass+" "+v.params.slidePrevClass);var e=v.slides.eq(v.activeIndex);if(e.addClass(v.params.slideActiveClass),e.next("."+v.params.slideClass).addClass(v.params.slideNextClass),e.prev("."+v.params.slideClass).addClass(v.params.slidePrevClass),v.bullets&&v.bullets.length>0){v.bullets.removeClass(v.params.bulletActiveClass);var t;v.params.loop?(t=Math.ceil(v.activeIndex-v.loopedSlides)/v.params.slidesPerGroup,t>v.slides.length-1-2*v.loopedSlides&&(t-=v.slides.length-2*v.loopedSlides),t>v.bullets.length-1&&(t-=v.bullets.length)):t="undefined"!=typeof v.snapIndex?v.snapIndex:v.activeIndex||0,v.paginationContainer.length>1?v.bullets.each(function(){a(this).index()===t&&a(this).addClass(v.params.bulletActiveClass)}):v.bullets.eq(t).addClass(v.params.bulletActiveClass)}v.params.loop||(v.params.prevButton&&(v.isBeginning?(a(v.params.prevButton).addClass(v.params.buttonDisabledClass),v.params.a11y&&v.a11y&&v.a11y.disable(a(v.params.prevButton))):(a(v.params.prevButton).removeClass(v.params.buttonDisabledClass),v.params.a11y&&v.a11y&&v.a11y.enable(a(v.params.prevButton)))),v.params.nextButton&&(v.isEnd?(a(v.params.nextButton).addClass(v.params.buttonDisabledClass),v.params.a11y&&v.a11y&&v.a11y.disable(a(v.params.nextButton))):(a(v.params.nextButton).removeClass(v.params.buttonDisabledClass),v.params.a11y&&v.a11y&&v.a11y.enable(a(v.params.nextButton)))))},v.updatePagination=function(){if(v.params.pagination&&v.paginationContainer&&v.paginationContainer.length>0){for(var e="",a=v.params.loop?Math.ceil((v.slides.length-2*v.loopedSlides)/v.params.slidesPerGroup):v.snapGrid.length,t=0;a>t;t++)e+=v.params.paginationBulletRender?v.params.paginationBulletRender(t,v.params.bulletClass):"<"+v.params.paginationElement+' class="'+v.params.bulletClass+'"></'+v.params.paginationElement+">";v.paginationContainer.html(e),v.bullets=v.paginationContainer.find("."+v.params.bulletClass),v.params.paginationClickable&&v.params.a11y&&v.a11y&&v.a11y.initPagination()}},v.update=function(e){function a(){s=Math.min(Math.max(v.translate,v.maxTranslate()),v.minTranslate()),v.setWrapperTranslate(s),v.updateActiveIndex(),v.updateClasses()}if(v.updateContainerSize(),v.updateSlidesSize(),v.updateProgress(),v.updatePagination(),v.updateClasses(),v.params.scrollbar&&v.scrollbar&&v.scrollbar.set(),e){var t,s;v.controller&&v.controller.spline&&(v.controller.spline=void 0),v.params.freeMode?a():(t=("auto"===v.params.slidesPerView||v.params.slidesPerView>1)&&v.isEnd&&!v.params.centeredSlides?v.slideTo(v.slides.length-1,0,!1,!0):v.slideTo(v.activeIndex,0,!1,!0),t||a())}},v.onResize=function(e){var a=v.params.allowSwipeToPrev,t=v.params.allowSwipeToNext;if(v.params.allowSwipeToPrev=v.params.allowSwipeToNext=!0,v.updateContainerSize(),v.updateSlidesSize(),("auto"===v.params.slidesPerView||v.params.freeMode||e)&&v.updatePagination(),v.params.scrollbar&&v.scrollbar&&v.scrollbar.set(),v.controller&&v.controller.spline&&(v.controller.spline=void 0),v.params.freeMode){var s=Math.min(Math.max(v.translate,v.maxTranslate()),v.minTranslate());v.setWrapperTranslate(s),v.updateActiveIndex(),v.updateClasses()}else v.updateClasses(),("auto"===v.params.slidesPerView||v.params.slidesPerView>1)&&v.isEnd&&!v.params.centeredSlides?v.slideTo(v.slides.length-1,0,!1,!0):v.slideTo(v.activeIndex,0,!1,!0);v.params.allowSwipeToPrev=a,v.params.allowSwipeToNext=t};var w=["mousedown","mousemove","mouseup"];window.navigator.pointerEnabled?w=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(w=["MSPointerDown","MSPointerMove","MSPointerUp"]),v.touchEvents={start:v.support.touch||!v.params.simulateTouch?"touchstart":w[0],move:v.support.touch||!v.params.simulateTouch?"touchmove":w[1],end:v.support.touch||!v.params.simulateTouch?"touchend":w[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===v.params.touchEventsTarget?v.container:v.wrapper).addClass("swiper-wp8-"+v.params.direction),v.initEvents=function(e){var t=e?"off":"on",r=e?"removeEventListener":"addEventListener",i="container"===v.params.touchEventsTarget?v.container[0]:v.wrapper[0],n=v.support.touch?i:document,o=v.params.nested?!0:!1;v.browser.ie?(i[r](v.touchEvents.start,v.onTouchStart,!1),n[r](v.touchEvents.move,v.onTouchMove,o),n[r](v.touchEvents.end,v.onTouchEnd,!1)):(v.support.touch&&(i[r](v.touchEvents.start,v.onTouchStart,!1),i[r](v.touchEvents.move,v.onTouchMove,o),i[r](v.touchEvents.end,v.onTouchEnd,!1)),!s.simulateTouch||v.device.ios||v.device.android||(i[r]("mousedown",v.onTouchStart,!1),document[r]("mousemove",v.onTouchMove,o),document[r]("mouseup",v.onTouchEnd,!1))),window[r]("resize",v.onResize),v.params.nextButton&&(a(v.params.nextButton)[t]("click",v.onClickNext),v.params.a11y&&v.a11y&&a(v.params.nextButton)[t]("keydown",v.a11y.onEnterKey)),v.params.prevButton&&(a(v.params.prevButton)[t]("click",v.onClickPrev),v.params.a11y&&v.a11y&&a(v.params.prevButton)[t]("keydown",v.a11y.onEnterKey)),v.params.pagination&&v.params.paginationClickable&&(a(v.paginationContainer)[t]("click","."+v.params.bulletClass,v.onClickIndex),v.params.a11y&&v.a11y&&a(v.paginationContainer)[t]("keydown","."+v.params.bulletClass,v.a11y.onEnterKey)),(v.params.preventClicks||v.params.preventClicksPropagation)&&i[r]("click",v.preventClicks,!0)},v.attachEvents=function(){v.initEvents()},v.detachEvents=function(){v.initEvents(!0)},v.allowClick=!0,v.preventClicks=function(e){v.allowClick||(v.params.preventClicks&&e.preventDefault(),v.params.preventClicksPropagation&&v.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))},v.onClickNext=function(e){e.preventDefault(),(!v.isEnd||v.params.loop)&&v.slideNext()},v.onClickPrev=function(e){e.preventDefault(),(!v.isBeginning||v.params.loop)&&v.slidePrev()},v.onClickIndex=function(e){e.preventDefault();var t=a(this).index()*v.params.slidesPerGroup;v.params.loop&&(t+=v.loopedSlides),v.slideTo(t)},v.updateClickedSlide=function(e){var t=o(e,"."+v.params.slideClass),s=!1;if(t)for(var r=0;r<v.slides.length;r++)v.slides[r]===t&&(s=!0);if(!t||!s)return v.clickedSlide=void 0,void(v.clickedIndex=void 0);if(v.clickedSlide=t,v.clickedIndex=a(t).index(),v.params.slideToClickedSlide&&void 0!==v.clickedIndex&&v.clickedIndex!==v.activeIndex){var i,n=v.clickedIndex;if(v.params.loop){if(v.animating)return;i=a(v.clickedSlide).attr("data-swiper-slide-index"),v.params.centeredSlides?n<v.loopedSlides-v.params.slidesPerView/2||n>v.slides.length-v.loopedSlides+v.params.slidesPerView/2?(v.fixLoop(),n=v.wrapper.children("."+v.params.slideClass+'[data-swiper-slide-index="'+i+'"]:not(.swiper-slide-duplicate)').eq(0).index(),setTimeout(function(){v.slideTo(n)},0)):v.slideTo(n):n>v.slides.length-v.params.slidesPerView?(v.fixLoop(),n=v.wrapper.children("."+v.params.slideClass+'[data-swiper-slide-index="'+i+'"]:not(.swiper-slide-duplicate)').eq(0).index(),setTimeout(function(){v.slideTo(n)},0)):v.slideTo(n)}else v.slideTo(n)}};var b,y,x,T,S,C,M,P,z,I="input, select, textarea, button",E=Date.now(),k=[];v.animating=!1,v.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var D,L;if(v.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),D="touchstart"===e.type,D||!("which"in e)||3!==e.which){if(v.params.noSwiping&&o(e,"."+v.params.noSwipingClass))return void(v.allowClick=!0);if(!v.params.swipeHandler||o(e,v.params.swipeHandler)){var t=v.touches.currentX="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,s=v.touches.currentY="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY;if(!(v.device.ios&&v.params.iOSEdgeSwipeDetection&&t<=v.params.iOSEdgeSwipeThreshold)){if(b=!0,y=!1,T=void 0,L=void 0,v.touches.startX=t,v.touches.startY=s,x=Date.now(),v.allowClick=!0,v.updateContainerSize(),v.swipeDirection=void 0,v.params.threshold>0&&(M=!1),"touchstart"!==e.type){var r=!0;a(e.target).is(I)&&(r=!1),document.activeElement&&a(document.activeElement).is(I)&&document.activeElement.blur(),r&&e.preventDefault()}v.emit("onTouchStart",v,e)}}}},v.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!(D&&"mousemove"===e.type||e.preventedByNestedSwiper)){if(v.params.onlyExternal)return v.allowClick=!1,void(b&&(v.touches.startX=v.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,v.touches.startY=v.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,x=Date.now()));if(D&&document.activeElement&&e.target===document.activeElement&&a(e.target).is(I))return y=!0,void(v.allowClick=!1);if(v.emit("onTouchMove",v,e),!(e.targetTouches&&e.targetTouches.length>1)){if(v.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,v.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof T){var t=180*Math.atan2(Math.abs(v.touches.currentY-v.touches.startY),Math.abs(v.touches.currentX-v.touches.startX))/Math.PI;T=r()?t>v.params.touchAngle:90-t>v.params.touchAngle}if(T&&v.emit("onTouchMoveOpposite",v,e),"undefined"==typeof L&&v.browser.ieTouch&&(v.touches.currentX!==v.touches.startX||v.touches.currentY!==v.touches.startY)&&(L=!0),b){if(T)return void(b=!1);if(L||!v.browser.ieTouch){v.allowClick=!1,v.emit("onSliderMove",v,e),e.preventDefault(),v.params.touchMoveStopPropagation&&!v.params.nested&&e.stopPropagation(),y||(s.loop&&v.fixLoop(),C=v.getWrapperTranslate(),v.setWrapperTransition(0),v.animating&&v.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),v.params.autoplay&&v.autoplaying&&(v.params.autoplayDisableOnInteraction?v.stopAutoplay():v.pauseAutoplay()),z=!1,v.params.grabCursor&&(v.container[0].style.cursor="move",v.container[0].style.cursor="-webkit-grabbing",v.container[0].style.cursor="-moz-grabbin",v.container[0].style.cursor="grabbing")),y=!0;var i=v.touches.diff=r()?v.touches.currentX-v.touches.startX:v.touches.currentY-v.touches.startY;i*=v.params.touchRatio,v.rtl&&(i=-i),v.swipeDirection=i>0?"prev":"next",S=i+C;var n=!0;if(i>0&&S>v.minTranslate()?(n=!1,v.params.resistance&&(S=v.minTranslate()-1+Math.pow(-v.minTranslate()+C+i,v.params.resistanceRatio))):0>i&&S<v.maxTranslate()&&(n=!1,v.params.resistance&&(S=v.maxTranslate()+1-Math.pow(v.maxTranslate()-C-i,v.params.resistanceRatio))),n&&(e.preventedByNestedSwiper=!0),!v.params.allowSwipeToNext&&"next"===v.swipeDirection&&C>S&&(S=C),!v.params.allowSwipeToPrev&&"prev"===v.swipeDirection&&S>C&&(S=C),v.params.followFinger){if(v.params.threshold>0){if(!(Math.abs(i)>v.params.threshold||M))return void(S=C);if(!M)return M=!0,v.touches.startX=v.touches.currentX,v.touches.startY=v.touches.currentY,S=C,void(v.touches.diff=r()?v.touches.currentX-v.touches.startX:v.touches.currentY-v.touches.startY)}(v.params.freeMode||v.params.watchSlidesProgress)&&v.updateActiveIndex(),v.params.freeMode&&(0===k.length&&k.push({position:v.touches[r()?"startX":"startY"],time:x}),k.push({position:v.touches[r()?"currentX":"currentY"],time:(new window.Date).getTime()})),v.updateProgress(S),v.setWrapperTranslate(S)}}}}}},v.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),v.emit("onTouchEnd",v,e),b){v.params.grabCursor&&y&&b&&(v.container[0].style.cursor="move",v.container[0].style.cursor="-webkit-grab",v.container[0].style.cursor="-moz-grab",v.container[0].style.cursor="grab");var t=Date.now(),s=t-x;if(v.allowClick&&(v.updateClickedSlide(e),v.emit("onTap",v,e),300>s&&t-E>300&&(P&&clearTimeout(P),P=setTimeout(function(){v&&(v.params.paginationHide&&v.paginationContainer.length>0&&!a(e.target).hasClass(v.params.bulletClass)&&v.paginationContainer.toggleClass(v.params.paginationHiddenClass),v.emit("onClick",v,e))},300)),300>s&&300>t-E&&(P&&clearTimeout(P),v.emit("onDoubleTap",v,e))),E=Date.now(),setTimeout(function(){v&&(v.allowClick=!0)},0),!b||!y||!v.swipeDirection||0===v.touches.diff||S===C)return void(b=y=!1);b=y=!1;var r;if(r=v.params.followFinger?v.rtl?v.translate:-v.translate:-S,v.params.freeMode){if(r<-v.minTranslate())return void v.slideTo(v.activeIndex);if(r>-v.maxTranslate())return void v.slideTo(v.slides.length<v.snapGrid.length?v.snapGrid.length-1:v.slides.length-1);if(v.params.freeModeMomentum){if(k.length>1){var i=k.pop(),n=k.pop(),o=i.position-n.position,l=i.time-n.time;v.velocity=o/l,v.velocity=v.velocity/2,Math.abs(v.velocity)<v.params.freeModeMinimumVelocity&&(v.velocity=0),(l>150||(new window.Date).getTime()-i.time>300)&&(v.velocity=0)}else v.velocity=0;k.length=0;var p=1e3*v.params.freeModeMomentumRatio,d=v.velocity*p,c=v.translate+d;v.rtl&&(c=-c);var u,m=!1,f=20*Math.abs(v.velocity)*v.params.freeModeMomentumBounceRatio;if(c<v.maxTranslate())v.params.freeModeMomentumBounce?(c+v.maxTranslate()<-f&&(c=v.maxTranslate()-f),u=v.maxTranslate(),m=!0,z=!0):c=v.maxTranslate();else if(c>v.minTranslate())v.params.freeModeMomentumBounce?(c-v.minTranslate()>f&&(c=v.minTranslate()+f),u=v.minTranslate(),m=!0,z=!0):c=v.minTranslate();else if(v.params.freeModeSticky){var h,g=0;for(g=0;g<v.snapGrid.length;g+=1)if(v.snapGrid[g]>-c){h=g;break}c=Math.abs(v.snapGrid[h]-c)<Math.abs(v.snapGrid[h-1]-c)||"next"===v.swipeDirection?v.snapGrid[h]:v.snapGrid[h-1],v.rtl||(c=-c)}if(0!==v.velocity)p=Math.abs(v.rtl?(-c-v.translate)/v.velocity:(c-v.translate)/v.velocity);else if(v.params.freeModeSticky)return void v.slideReset();v.params.freeModeMomentumBounce&&m?(v.updateProgress(u),v.setWrapperTransition(p),v.setWrapperTranslate(c),v.onTransitionStart(),v.animating=!0,v.wrapper.transitionEnd(function(){v&&z&&(v.emit("onMomentumBounce",v),v.setWrapperTransition(v.params.speed),v.setWrapperTranslate(u),v.wrapper.transitionEnd(function(){v&&v.onTransitionEnd()}))})):v.velocity?(v.updateProgress(c),v.setWrapperTransition(p),v.setWrapperTranslate(c),v.onTransitionStart(),v.animating||(v.animating=!0,v.wrapper.transitionEnd(function(){v&&v.onTransitionEnd()}))):v.updateProgress(c),v.updateActiveIndex()}return void((!v.params.freeModeMomentum||s>=v.params.longSwipesMs)&&(v.updateProgress(),v.updateActiveIndex()))}var w,T=0,M=v.slidesSizesGrid[0];for(w=0;w<v.slidesGrid.length;w+=v.params.slidesPerGroup)"undefined"!=typeof v.slidesGrid[w+v.params.slidesPerGroup]?r>=v.slidesGrid[w]&&r<v.slidesGrid[w+v.params.slidesPerGroup]&&(T=w,M=v.slidesGrid[w+v.params.slidesPerGroup]-v.slidesGrid[w]):r>=v.slidesGrid[w]&&(T=w,M=v.slidesGrid[v.slidesGrid.length-1]-v.slidesGrid[v.slidesGrid.length-2]);var I=(r-v.slidesGrid[T])/M;if(s>v.params.longSwipesMs){if(!v.params.longSwipes)return void v.slideTo(v.activeIndex);"next"===v.swipeDirection&&v.slideTo(I>=v.params.longSwipesRatio?T+v.params.slidesPerGroup:T),"prev"===v.swipeDirection&&v.slideTo(I>1-v.params.longSwipesRatio?T+v.params.slidesPerGroup:T)}else{if(!v.params.shortSwipes)return void v.slideTo(v.activeIndex);"next"===v.swipeDirection&&v.slideTo(T+v.params.slidesPerGroup),"prev"===v.swipeDirection&&v.slideTo(T)}}},v._slideTo=function(e,a){return v.slideTo(e,a,!0,!0)},v.slideTo=function(e,a,t,s){"undefined"==typeof t&&(t=!0),"undefined"==typeof e&&(e=0),0>e&&(e=0),v.snapIndex=Math.floor(e/v.params.slidesPerGroup),v.snapIndex>=v.snapGrid.length&&(v.snapIndex=v.snapGrid.length-1);var i=-v.snapGrid[v.snapIndex];v.params.autoplay&&v.autoplaying&&(s||!v.params.autoplayDisableOnInteraction?v.pauseAutoplay(a):v.stopAutoplay()),v.updateProgress(i);for(var n=0;n<v.slidesGrid.length;n++)-Math.floor(100*i)>=Math.floor(100*v.slidesGrid[n])&&(e=n);if(!v.params.allowSwipeToNext&&i<v.translate&&i<v.minTranslate())return!1;if(!v.params.allowSwipeToPrev&&i>v.translate&&i>v.maxTranslate()&&(v.activeIndex||0)!==e)return!1;
      if("undefined"==typeof a&&(a=v.params.speed),v.previousIndex=v.activeIndex||0,v.activeIndex=e,i===v.translate)return v.updateClasses(),!1;v.updateClasses(),v.onTransitionStart(t);r()?i:0,r()?0:i;return 0===a?(v.setWrapperTransition(0),v.setWrapperTranslate(i),v.onTransitionEnd(t)):(v.setWrapperTransition(a),v.setWrapperTranslate(i),v.animating||(v.animating=!0,v.wrapper.transitionEnd(function(){v&&v.onTransitionEnd(t)}))),!0},v.onTransitionStart=function(e){"undefined"==typeof e&&(e=!0),v.lazy&&v.lazy.onTransitionStart(),e&&(v.emit("onTransitionStart",v),v.activeIndex!==v.previousIndex&&v.emit("onSlideChangeStart",v))},v.onTransitionEnd=function(e){v.animating=!1,v.setWrapperTransition(0),"undefined"==typeof e&&(e=!0),v.lazy&&v.lazy.onTransitionEnd(),e&&(v.emit("onTransitionEnd",v),v.activeIndex!==v.previousIndex&&v.emit("onSlideChangeEnd",v)),v.params.hashnav&&v.hashnav&&v.hashnav.setHash()},v.slideNext=function(e,a,t){if(v.params.loop){if(v.animating)return!1;v.fixLoop();{v.container[0].clientLeft}return v.slideTo(v.activeIndex+v.params.slidesPerGroup,a,e,t)}return v.slideTo(v.activeIndex+v.params.slidesPerGroup,a,e,t)},v._slideNext=function(e){return v.slideNext(!0,e,!0)},v.slidePrev=function(e,a,t){if(v.params.loop){if(v.animating)return!1;v.fixLoop();{v.container[0].clientLeft}return v.slideTo(v.activeIndex-1,a,e,t)}return v.slideTo(v.activeIndex-1,a,e,t)},v._slidePrev=function(e){return v.slidePrev(!0,e,!0)},v.slideReset=function(e,a){return v.slideTo(v.activeIndex,a,e)},v.setWrapperTransition=function(e,a){v.wrapper.transition(e),"slide"!==v.params.effect&&v.effects[v.params.effect]&&v.effects[v.params.effect].setTransition(e),v.params.parallax&&v.parallax&&v.parallax.setTransition(e),v.params.scrollbar&&v.scrollbar&&v.scrollbar.setTransition(e),v.params.control&&v.controller&&v.controller.setTransition(e,a),v.emit("onSetTransition",v,e)},v.setWrapperTranslate=function(e,a,t){var s=0,n=0,o=0;r()?s=v.rtl?-e:e:n=e,v.params.roundLengths&&(s=i(s),n=i(n)),v.params.virtualTranslate||v.wrapper.transform(v.support.transforms3d?"translate3d("+s+"px, "+n+"px, "+o+"px)":"translate("+s+"px, "+n+"px)"),v.translate=r()?s:n,a&&v.updateActiveIndex(),"slide"!==v.params.effect&&v.effects[v.params.effect]&&v.effects[v.params.effect].setTranslate(v.translate),v.params.parallax&&v.parallax&&v.parallax.setTranslate(v.translate),v.params.scrollbar&&v.scrollbar&&v.scrollbar.setTranslate(v.translate),v.params.control&&v.controller&&v.controller.setTranslate(v.translate,t),v.emit("onSetTranslate",v,v.translate)},v.getTranslate=function(e,a){var t,s,r,i;return"undefined"==typeof a&&(a="x"),v.params.virtualTranslate?v.rtl?-v.translate:v.translate:(r=window.getComputedStyle(e,null),window.WebKitCSSMatrix?(s=r.transform||r.webkitTransform,s.split(",").length>6&&(s=s.split(", ").map(function(e){return e.replace(",",".")}).join(", ")),i=new window.WebKitCSSMatrix("none"===s?"":s)):(i=r.MozTransform||r.OTransform||r.MsTransform||r.msTransform||r.transform||r.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=i.toString().split(",")),"x"===a&&(s=window.WebKitCSSMatrix?i.m41:parseFloat(16===t.length?t[12]:t[4])),"y"===a&&(s=window.WebKitCSSMatrix?i.m42:parseFloat(16===t.length?t[13]:t[5])),v.rtl&&s&&(s=-s),s||0)},v.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=r()?"x":"y"),v.getTranslate(v.wrapper[0],e)},v.observers=[],v.initObservers=function(){if(v.params.observeParents)for(var e=v.container.parents(),a=0;a<e.length;a++)l(e[a]);l(v.container[0],{childList:!1}),l(v.wrapper[0],{attributes:!1})},v.disconnectObservers=function(){for(var e=0;e<v.observers.length;e++)v.observers[e].disconnect();v.observers=[]},v.createLoop=function(){v.wrapper.children("."+v.params.slideClass+"."+v.params.slideDuplicateClass).remove();var e=v.wrapper.children("."+v.params.slideClass);"auto"!==v.params.slidesPerView||v.params.loopedSlides||(v.params.loopedSlides=e.length),v.loopedSlides=parseInt(v.params.loopedSlides||v.params.slidesPerView,10),v.loopedSlides=v.loopedSlides+v.params.loopAdditionalSlides,v.loopedSlides>e.length&&(v.loopedSlides=e.length);var t,s=[],r=[];for(e.each(function(t,i){var n=a(this);t<v.loopedSlides&&r.push(i),t<e.length&&t>=e.length-v.loopedSlides&&s.push(i),n.attr("data-swiper-slide-index",t)}),t=0;t<r.length;t++)v.wrapper.append(a(r[t].cloneNode(!0)).addClass(v.params.slideDuplicateClass));for(t=s.length-1;t>=0;t--)v.wrapper.prepend(a(s[t].cloneNode(!0)).addClass(v.params.slideDuplicateClass))},v.destroyLoop=function(){v.wrapper.children("."+v.params.slideClass+"."+v.params.slideDuplicateClass).remove(),v.slides.removeAttr("data-swiper-slide-index")},v.fixLoop=function(){var e;v.activeIndex<v.loopedSlides?(e=v.slides.length-3*v.loopedSlides+v.activeIndex,e+=v.loopedSlides,v.slideTo(e,0,!1,!0)):("auto"===v.params.slidesPerView&&v.activeIndex>=2*v.loopedSlides||v.activeIndex>v.slides.length-2*v.params.slidesPerView)&&(e=-v.slides.length+v.activeIndex+v.loopedSlides,e+=v.loopedSlides,v.slideTo(e,0,!1,!0))},v.appendSlide=function(e){if(v.params.loop&&v.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&v.wrapper.append(e[a]);else v.wrapper.append(e);v.params.loop&&v.createLoop(),v.params.observer&&v.support.observer||v.update(!0)},v.prependSlide=function(e){v.params.loop&&v.destroyLoop();var a=v.activeIndex+1;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)e[t]&&v.wrapper.prepend(e[t]);a=v.activeIndex+e.length}else v.wrapper.prepend(e);v.params.loop&&v.createLoop(),v.params.observer&&v.support.observer||v.update(!0),v.slideTo(a,0,!1)},v.removeSlide=function(e){v.params.loop&&(v.destroyLoop(),v.slides=v.wrapper.children("."+v.params.slideClass));var a,t=v.activeIndex;if("object"==typeof e&&e.length){for(var s=0;s<e.length;s++)a=e[s],v.slides[a]&&v.slides.eq(a).remove(),t>a&&t--;t=Math.max(t,0)}else a=e,v.slides[a]&&v.slides.eq(a).remove(),t>a&&t--,t=Math.max(t,0);v.params.loop&&v.createLoop(),v.params.observer&&v.support.observer||v.update(!0),v.params.loop?v.slideTo(t+v.loopedSlides,0,!1):v.slideTo(t,0,!1)},v.removeAllSlides=function(){for(var e=[],a=0;a<v.slides.length;a++)e.push(a);v.removeSlide(e)},v.effects={fade:{setTranslate:function(){for(var e=0;e<v.slides.length;e++){var a=v.slides.eq(e),t=a[0].swiperSlideOffset,s=-t;v.params.virtualTranslate||(s-=v.translate);var i=0;r()||(i=s,s=0);var n=v.params.fade.crossFade?Math.max(1-Math.abs(a[0].progress),0):1+Math.min(Math.max(a[0].progress,-1),0);a.css({opacity:n}).transform("translate3d("+s+"px, "+i+"px, 0px)")}},setTransition:function(e){if(v.slides.transition(e),v.params.virtualTranslate&&0!==e){var a=!1;v.slides.transitionEnd(function(){if(!a&&v){a=!0,v.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],t=0;t<e.length;t++)v.wrapper.trigger(e[t])}})}}},cube:{setTranslate:function(){var e,t=0;v.params.cube.shadow&&(r()?(e=v.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),v.wrapper.append(e)),e.css({height:v.width+"px"})):(e=v.container.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),v.container.append(e))));for(var s=0;s<v.slides.length;s++){var i=v.slides.eq(s),n=90*s,o=Math.floor(n/360);v.rtl&&(n=-n,o=Math.floor(-n/360));var l=Math.max(Math.min(i[0].progress,1),-1),p=0,d=0,c=0;s%4===0?(p=4*-o*v.size,c=0):(s-1)%4===0?(p=0,c=4*-o*v.size):(s-2)%4===0?(p=v.size+4*o*v.size,c=v.size):(s-3)%4===0&&(p=-v.size,c=3*v.size+4*v.size*o),v.rtl&&(p=-p),r()||(d=p,p=0);var u="rotateX("+(r()?0:-n)+"deg) rotateY("+(r()?n:0)+"deg) translate3d("+p+"px, "+d+"px, "+c+"px)";if(1>=l&&l>-1&&(t=90*s+90*l,v.rtl&&(t=90*-s-90*l)),i.transform(u),v.params.cube.slideShadows){var m=i.find(r()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),f=i.find(r()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===m.length&&(m=a('<div class="swiper-slide-shadow-'+(r()?"left":"top")+'"></div>'),i.append(m)),0===f.length&&(f=a('<div class="swiper-slide-shadow-'+(r()?"right":"bottom")+'"></div>'),i.append(f));{i[0].progress}m.length&&(m[0].style.opacity=-i[0].progress),f.length&&(f[0].style.opacity=i[0].progress)}}if(v.wrapper.css({"-webkit-transform-origin":"50% 50% -"+v.size/2+"px","-moz-transform-origin":"50% 50% -"+v.size/2+"px","-ms-transform-origin":"50% 50% -"+v.size/2+"px","transform-origin":"50% 50% -"+v.size/2+"px"}),v.params.cube.shadow)if(r())e.transform("translate3d(0px, "+(v.width/2+v.params.cube.shadowOffset)+"px, "+-v.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+v.params.cube.shadowScale+")");else{var h=Math.abs(t)-90*Math.floor(Math.abs(t)/90),g=1.5-(Math.sin(2*h*Math.PI/360)/2+Math.cos(2*h*Math.PI/360)/2),w=v.params.cube.shadowScale,b=v.params.cube.shadowScale/g,y=v.params.cube.shadowOffset;e.transform("scale3d("+w+", 1, "+b+") translate3d(0px, "+(v.height/2+y)+"px, "+-v.height/2/b+"px) rotateX(-90deg)")}var x=v.isSafari||v.isUiWebView?-v.size/2:0;v.wrapper.transform("translate3d(0px,0,"+x+"px) rotateX("+(r()?0:t)+"deg) rotateY("+(r()?-t:0)+"deg)")},setTransition:function(e){v.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),v.params.cube.shadow&&!r()&&v.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=v.translate,t=r()?-e+v.width/2:-e+v.height/2,s=r()?v.params.coverflow.rotate:-v.params.coverflow.rotate,i=v.params.coverflow.depth,n=0,o=v.slides.length;o>n;n++){var l=v.slides.eq(n),p=v.slidesSizesGrid[n],d=l[0].swiperSlideOffset,c=(t-d-p/2)/p*v.params.coverflow.modifier,u=r()?s*c:0,m=r()?0:s*c,f=-i*Math.abs(c),h=r()?0:v.params.coverflow.stretch*c,g=r()?v.params.coverflow.stretch*c:0;Math.abs(g)<.001&&(g=0),Math.abs(h)<.001&&(h=0),Math.abs(f)<.001&&(f=0),Math.abs(u)<.001&&(u=0),Math.abs(m)<.001&&(m=0);var w="translate3d("+g+"px,"+h+"px,"+f+"px)  rotateX("+m+"deg) rotateY("+u+"deg)";if(l.transform(w),l[0].style.zIndex=-Math.abs(Math.round(c))+1,v.params.coverflow.slideShadows){var b=l.find(r()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),y=l.find(r()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===b.length&&(b=a('<div class="swiper-slide-shadow-'+(r()?"left":"top")+'"></div>'),l.append(b)),0===y.length&&(y=a('<div class="swiper-slide-shadow-'+(r()?"right":"bottom")+'"></div>'),l.append(y)),b.length&&(b[0].style.opacity=c>0?c:0),y.length&&(y[0].style.opacity=-c>0?-c:0)}}if(v.browser.ie){var x=v.wrapper[0].style;x.perspectiveOrigin=t+"px 50%"}},setTransition:function(e){v.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},v.lazy={initialImageLoaded:!1,loadImageInSlide:function(e,t){if("undefined"!=typeof e&&("undefined"==typeof t&&(t=!0),0!==v.slides.length)){var s=v.slides.eq(e),r=s.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!s.hasClass("swiper-lazy")||s.hasClass("swiper-lazy-loaded")||s.hasClass("swiper-lazy-loading")||(r=r.add(s[0])),0!==r.length&&r.each(function(){var e=a(this);e.addClass("swiper-lazy-loading");var r=e.attr("data-background"),i=e.attr("data-src"),n=e.attr("data-srcset");v.loadImage(e[0],i||r,n,!1,function(){if(r?(e.css("background-image","url("+r+")"),e.removeAttr("data-background")):(n&&(e.attr("srcset",n),e.removeAttr("data-srcset")),i&&(e.attr("src",i),e.removeAttr("data-src"))),e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),s.find(".swiper-lazy-preloader, .preloader").remove(),v.params.loop&&t){var a=s.attr("data-swiper-slide-index");if(s.hasClass(v.params.slideDuplicateClass)){var o=v.wrapper.children('[data-swiper-slide-index="'+a+'"]:not(.'+v.params.slideDuplicateClass+")");v.lazy.loadImageInSlide(o.index(),!1)}else{var l=v.wrapper.children("."+v.params.slideDuplicateClass+'[data-swiper-slide-index="'+a+'"]');v.lazy.loadImageInSlide(l.index(),!1)}}v.emit("onLazyImageReady",v,s[0],e[0])}),v.emit("onLazyImageLoad",v,s[0],e[0])})}},load:function(){var e;if(v.params.watchSlidesVisibility)v.wrapper.children("."+v.params.slideVisibleClass).each(function(){v.lazy.loadImageInSlide(a(this).index())});else if(v.params.slidesPerView>1)for(e=v.activeIndex;e<v.activeIndex+v.params.slidesPerView;e++)v.slides[e]&&v.lazy.loadImageInSlide(e);else v.lazy.loadImageInSlide(v.activeIndex);if(v.params.lazyLoadingInPrevNext)if(v.params.slidesPerView>1){for(e=v.activeIndex+v.params.slidesPerView;e<v.activeIndex+v.params.slidesPerView+v.params.slidesPerView;e++)v.slides[e]&&v.lazy.loadImageInSlide(e);for(e=v.activeIndex-v.params.slidesPerView;e<v.activeIndex;e++)v.slides[e]&&v.lazy.loadImageInSlide(e)}else{var t=v.wrapper.children("."+v.params.slideNextClass);t.length>0&&v.lazy.loadImageInSlide(t.index());var s=v.wrapper.children("."+v.params.slidePrevClass);s.length>0&&v.lazy.loadImageInSlide(s.index())}},onTransitionStart:function(){v.params.lazyLoading&&(v.params.lazyLoadingOnTransitionStart||!v.params.lazyLoadingOnTransitionStart&&!v.lazy.initialImageLoaded)&&v.lazy.load()},onTransitionEnd:function(){v.params.lazyLoading&&!v.params.lazyLoadingOnTransitionStart&&v.lazy.load()}},v.scrollbar={isTouched:!1,setDragPosition:function(e){var a=v.scrollbar,t=r()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageX:e.pageX||e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageY:e.pageY||e.clientY,s=t-a.track.offset()[r()?"left":"top"]-a.dragSize/2,i=-v.minTranslate()*a.moveDivider,n=-v.maxTranslate()*a.moveDivider;i>s?s=i:s>n&&(s=n),s=-s/a.moveDivider,v.updateProgress(s),v.setWrapperTranslate(s,!0)},dragStart:function(e){var a=v.scrollbar;a.isTouched=!0,e.preventDefault(),e.stopPropagation(),a.setDragPosition(e),clearTimeout(a.dragTimeout),a.track.transition(0),v.params.scrollbarHide&&a.track.css("opacity",1),v.wrapper.transition(100),a.drag.transition(100),v.emit("onScrollbarDragStart",v)},dragMove:function(e){var a=v.scrollbar;a.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,a.setDragPosition(e),v.wrapper.transition(0),a.track.transition(0),a.drag.transition(0),v.emit("onScrollbarDragMove",v))},dragEnd:function(){var e=v.scrollbar;e.isTouched&&(e.isTouched=!1,v.params.scrollbarHide&&(clearTimeout(e.dragTimeout),e.dragTimeout=setTimeout(function(){e.track.css("opacity",0),e.track.transition(400)},1e3)),v.emit("onScrollbarDragEnd",v),v.params.scrollbarSnapOnRelease&&v.slideReset())},enableDraggable:function(){var e=v.scrollbar,t=v.support.touch?e.track:document;a(e.track).on(v.touchEvents.start,e.dragStart),a(t).on(v.touchEvents.move,e.dragMove),a(t).on(v.touchEvents.end,e.dragEnd)},disableDraggable:function(){var e=v.scrollbar,t=v.support.touch?e.track:document;a(e.track).off(v.touchEvents.start,e.dragStart),a(t).off(v.touchEvents.move,e.dragMove),a(t).off(v.touchEvents.end,e.dragEnd)},set:function(){if(v.params.scrollbar){var e=v.scrollbar;e.track=a(v.params.scrollbar),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=a('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=r()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=v.size/v.virtualSize,e.moveDivider=e.divider*(e.trackSize/v.size),e.dragSize=e.trackSize*e.divider,r()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.track[0].style.display=e.divider>=1?"none":"",v.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(v.params.scrollbar){var e,a=v.scrollbar,t=(v.translate||0,a.dragSize);e=(a.trackSize-a.dragSize)*v.progress,v.rtl&&r()?(e=-e,e>0?(t=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(t=a.trackSize+e)):0>e?(t=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(t=a.trackSize-e),r()?(a.drag.transform(v.support.transforms3d?"translate3d("+e+"px, 0, 0)":"translateX("+e+"px)"),a.drag[0].style.width=t+"px"):(a.drag.transform(v.support.transforms3d?"translate3d(0px, "+e+"px, 0)":"translateY("+e+"px)"),a.drag[0].style.height=t+"px"),v.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){v.params.scrollbar&&v.scrollbar.drag.transition(e)}},v.controller={LinearSpline:function(e,a){this.x=e,this.y=a,this.lastIndex=e.length-1;{var t,s;this.x.length}this.interpolate=function(e){return e?(s=r(this.x,e),t=s-1,(e-this.x[t])*(this.y[s]-this.y[t])/(this.x[s]-this.x[t])+this.y[t]):0};var r=function(){var e,a,t;return function(s,r){for(a=-1,e=s.length;e-a>1;)s[t=e+a>>1]<=r?a=t:e=t;return e}}()},getInterpolateFunction:function(e){v.controller.spline||(v.controller.spline=v.params.loop?new v.controller.LinearSpline(v.slidesGrid,e.slidesGrid):new v.controller.LinearSpline(v.snapGrid,e.snapGrid))},setTranslate:function(e,a){function s(a){e=a.rtl&&"horizontal"===a.params.direction?-v.translate:v.translate,"slide"===v.params.controlBy&&(v.controller.getInterpolateFunction(a),i=-v.controller.spline.interpolate(-e)),i&&"container"!==v.params.controlBy||(r=(a.maxTranslate()-a.minTranslate())/(v.maxTranslate()-v.minTranslate()),i=(e-v.minTranslate())*r+a.minTranslate()),v.params.controlInverse&&(i=a.maxTranslate()-i),a.updateProgress(i),a.setWrapperTranslate(i,!1,v),a.updateActiveIndex()}var r,i,n=v.params.control;if(v.isArray(n))for(var o=0;o<n.length;o++)n[o]!==a&&n[o]instanceof t&&s(n[o]);else n instanceof t&&a!==n&&s(n)},setTransition:function(e,a){function s(a){a.setWrapperTransition(e,v),0!==e&&(a.onTransitionStart(),a.wrapper.transitionEnd(function(){i&&(a.params.loop&&"slide"===v.params.controlBy&&a.fixLoop(),a.onTransitionEnd())}))}var r,i=v.params.control;if(v.isArray(i))for(r=0;r<i.length;r++)i[r]!==a&&i[r]instanceof t&&s(i[r]);else i instanceof t&&a!==i&&s(i)}},v.hashnav={init:function(){if(v.params.hashnav){v.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var a=0,t=0,s=v.slides.length;s>t;t++){var r=v.slides.eq(t),i=r.attr("data-hash");if(i===e&&!r.hasClass(v.params.slideDuplicateClass)){var n=r.index();v.slideTo(n,a,v.params.runCallbacksOnInit,!0)}}}},setHash:function(){v.hashnav.initialized&&v.params.hashnav&&(document.location.hash=v.slides.eq(v.activeIndex).attr("data-hash")||"")}},v.disableKeyboardControl=function(){a(document).off("keydown",p)},v.enableKeyboardControl=function(){a(document).on("keydown",p)},v.mousewheel={event:!1,lastScrollTime:(new window.Date).getTime()},v.params.mousewheelControl){try{new window.WheelEvent("wheel"),v.mousewheel.event="wheel"}catch(G){}v.mousewheel.event||void 0===document.onmousewheel||(v.mousewheel.event="mousewheel"),v.mousewheel.event||(v.mousewheel.event="DOMMouseScroll")}v.disableMousewheelControl=function(){return v.mousewheel.event?(v.container.off(v.mousewheel.event,d),!0):!1},v.enableMousewheelControl=function(){return v.mousewheel.event?(v.container.on(v.mousewheel.event,d),!0):!1},v.parallax={setTranslate:function(){v.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){c(this,v.progress)}),v.slides.each(function(){var e=a(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=Math.min(Math.max(e[0].progress,-1),1);c(this,a)})})},setTransition:function(e){"undefined"==typeof e&&(e=v.params.speed),v.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var t=a(this),s=parseInt(t.attr("data-swiper-parallax-duration"),10)||e;0===e&&(s=0),t.transition(s)})}},v._plugins=[];for(var B in v.plugins){var O=v.plugins[B](v,v.params[B]);O&&v._plugins.push(O)}return v.callPlugins=function(e){for(var a=0;a<v._plugins.length;a++)e in v._plugins[a]&&v._plugins[a][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},v.emitterEventListeners={},v.emit=function(e){v.params[e]&&v.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var a;if(v.emitterEventListeners[e])for(a=0;a<v.emitterEventListeners[e].length;a++)v.emitterEventListeners[e][a](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);v.callPlugins&&v.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},v.on=function(e,a){return e=u(e),v.emitterEventListeners[e]||(v.emitterEventListeners[e]=[]),v.emitterEventListeners[e].push(a),v},v.off=function(e,a){var t;if(e=u(e),"undefined"==typeof a)return v.emitterEventListeners[e]=[],v;if(v.emitterEventListeners[e]&&0!==v.emitterEventListeners[e].length){for(t=0;t<v.emitterEventListeners[e].length;t++)v.emitterEventListeners[e][t]===a&&v.emitterEventListeners[e].splice(t,1);return v}},v.once=function(e,a){e=u(e);var t=function(){a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),v.off(e,t)};return v.on(e,t),v},v.a11y={makeFocusable:function(e){return e.attr("tabIndex","0"),e},addRole:function(e,a){return e.attr("role",a),e},addLabel:function(e,a){return e.attr("aria-label",a),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){13===e.keyCode&&(a(e.target).is(v.params.nextButton)?(v.onClickNext(e),v.a11y.notify(v.isEnd?v.params.lastSlideMessage:v.params.nextSlideMessage)):a(e.target).is(v.params.prevButton)&&(v.onClickPrev(e),v.a11y.notify(v.isBeginning?v.params.firstSlideMessage:v.params.prevSlideMessage)),a(e.target).is("."+v.params.bulletClass)&&a(e.target)[0].click())},liveRegion:a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var a=v.a11y.liveRegion;0!==a.length&&(a.html(""),a.html(e))},init:function(){if(v.params.nextButton){var e=a(v.params.nextButton);v.a11y.makeFocusable(e),v.a11y.addRole(e,"button"),v.a11y.addLabel(e,v.params.nextSlideMessage)}if(v.params.prevButton){var t=a(v.params.prevButton);v.a11y.makeFocusable(t),v.a11y.addRole(t,"button"),v.a11y.addLabel(t,v.params.prevSlideMessage)}a(v.container).append(v.a11y.liveRegion)},initPagination:function(){v.params.pagination&&v.params.paginationClickable&&v.bullets&&v.bullets.length&&v.bullets.each(function(){var e=a(this);v.a11y.makeFocusable(e),v.a11y.addRole(e,"button"),v.a11y.addLabel(e,v.params.paginationBulletMessage.replace(/{{index}}/,e.index()+1))})},destroy:function(){v.a11y.liveRegion&&v.a11y.liveRegion.length>0&&v.a11y.liveRegion.remove()}},v.init=function(){v.params.loop&&v.createLoop(),v.updateContainerSize(),v.updateSlidesSize(),v.updatePagination(),v.params.scrollbar&&v.scrollbar&&(v.scrollbar.set(),v.params.scrollbarDraggable&&v.scrollbar.enableDraggable()),"slide"!==v.params.effect&&v.effects[v.params.effect]&&(v.params.loop||v.updateProgress(),v.effects[v.params.effect].setTranslate()),v.params.loop?v.slideTo(v.params.initialSlide+v.loopedSlides,0,v.params.runCallbacksOnInit):(v.slideTo(v.params.initialSlide,0,v.params.runCallbacksOnInit),0===v.params.initialSlide&&(v.parallax&&v.params.parallax&&v.parallax.setTranslate(),v.lazy&&v.params.lazyLoading&&(v.lazy.load(),v.lazy.initialImageLoaded=!0))),v.attachEvents(),v.params.observer&&v.support.observer&&v.initObservers(),v.params.preloadImages&&!v.params.lazyLoading&&v.preloadImages(),v.params.autoplay&&v.startAutoplay(),v.params.keyboardControl&&v.enableKeyboardControl&&v.enableKeyboardControl(),v.params.mousewheelControl&&v.enableMousewheelControl&&v.enableMousewheelControl(),v.params.hashnav&&v.hashnav&&v.hashnav.init(),v.params.a11y&&v.a11y&&v.a11y.init(),v.emit("onInit",v)},v.cleanupStyles=function(){v.container.removeClass(v.classNames.join(" ")).removeAttr("style"),v.wrapper.removeAttr("style"),v.slides&&v.slides.length&&v.slides.removeClass([v.params.slideVisibleClass,v.params.slideActiveClass,v.params.slideNextClass,v.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),v.paginationContainer&&v.paginationContainer.length&&v.paginationContainer.removeClass(v.params.paginationHiddenClass),v.bullets&&v.bullets.length&&v.bullets.removeClass(v.params.bulletActiveClass),v.params.prevButton&&a(v.params.prevButton).removeClass(v.params.buttonDisabledClass),v.params.nextButton&&a(v.params.nextButton).removeClass(v.params.buttonDisabledClass),v.params.scrollbar&&v.scrollbar&&(v.scrollbar.track&&v.scrollbar.track.length&&v.scrollbar.track.removeAttr("style"),v.scrollbar.drag&&v.scrollbar.drag.length&&v.scrollbar.drag.removeAttr("style"))},v.destroy=function(e,a){v.detachEvents(),v.stopAutoplay(),v.params.scrollbar&&v.scrollbar&&v.params.scrollbarDraggable&&v.scrollbar.disableDraggable(),v.params.loop&&v.destroyLoop(),a&&v.cleanupStyles(),v.disconnectObservers(),v.params.keyboardControl&&v.disableKeyboardControl&&v.disableKeyboardControl(),v.params.mousewheelControl&&v.disableMousewheelControl&&v.disableMousewheelControl(),v.params.a11y&&v.a11y&&v.a11y.destroy(),v.emit("onDestroy"),e!==!1&&(v=null)},v.init(),v}};t.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1},device:function(){var e=navigator.userAgent,a=e.match(/(Android);?[\s\/]+([\d.]+)?/),t=e.match(/(iPad).*OS\s([\d_]+)/),s=e.match(/(iPod)(.*OS\s([\d_]+))?/),r=!t&&e.match(/(iPhone\sOS)\s([\d_]+)/);return{ios:t||r||s,android:a}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),t=0;t<a.length;t++)if(a[t]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}()},plugins:{}};for(var s=["jQuery","Zepto","Dom7"],r=0;r<s.length;r++)window[s[r]]&&e(window[s[r]]);var i;i="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7,i&&("transitionEnd"in i.fn||(i.fn.transitionEnd=function(e){function a(i){if(i.target===this)for(e.call(this,i),t=0;t<s.length;t++)r.off(s[t],a)}var t,s=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],r=this;if(e)for(t=0;t<s.length;t++)r.on(s[t],a);return this}),"transform"in i.fn||(i.fn.transform=function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this}),"transition"in i.fn||(i.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this})),window.Swiper=t}(),"undefined"!=typeof module?module.exports=window.Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.Swiper});
/**
 * @module       RD Navbar
 * @author       Evgeniy Gusarov
 * @see          https://ua.linkedin.com/pub/evgeniy-gusarov/8a/a40/54a
 * @version      2.1.7
 */
(function(){var t;t="ontouchstart"in window,function(o,e,n){var s;return s=function(){function s(t,s){this.options=o.extend(!1,{},this.Defaults,s),this.$element=o(t),this.$clone=null,this.$win=o(n),this.$doc=o(e),this.currentLayout=this.options.layout,this.loaded=!1,this.focusOnHover=this.options.focusOnHover,this.focusTimer=!1,this.cloneTimer=!1,this.isStuck=!1,this.initialize()}return s.prototype.Defaults={layout:"rd-navbar-static",deviceLayout:"rd-navbar-fixed",focusOnHover:!0,focusOnHoverTimeout:800,linkedElements:["html"],domAppend:!0,stickUp:!0,stickUpClone:!0,stickUpOffset:"100%",anchorNavSpeed:400,anchorNavOffset:0,anchorNavEasing:"swing",autoHeight:!0,responsive:{0:{layout:"rd-navbar-fixed",deviceLayout:"rd-navbar-fixed",focusOnHover:!1,stickUp:!1},992:{layout:"rd-navbar-static",deviceLayout:"rd-navbar-static",focusOnHover:!0,stickUp:!0}},callbacks:{onToggleSwitch:!1,onToggleClose:!1,onDomAppend:!1,onDropdownOver:!1,onDropdownOut:!1,onDropdownToggle:!1,onDropdownClose:!1,onStuck:!1,onUnstuck:!1,onAnchorChange:!1}},s.prototype.initialize=function(){var o;return o=this,o.$element.addClass("rd-navbar").addClass(o.options.layout),t&&o.$element.addClass("rd-navbar--is-touch"),o.setDataAPI(o),o.options.domAppend&&o.createNav(o),o.options.stickUpClone&&o.createClone(o),o.$element.addClass("rd-navbar-original"),o.addAdditionalClassToToggles(".rd-navbar-original","toggle-original","toggle-original-elements"),o.applyHandlers(o),o.offset=o.$element.offset().top,o.height=o.$element.outerHeight(),o.loaded=!0,o},s.prototype.resize=function(e,n){var s,a;return a=t?e.getOption("deviceLayout"):e.getOption("layout"),s=e.$element.add(e.$clone),a===e.currentLayout&&e.loaded||(e.switchClass(s,e.currentLayout,a),null!=e.options.linkedElements&&o.grep(e.options.linkedElements,function(t,o){return e.switchClass(t,e.currentLayout+"-linked",a+"-linked")}),e.currentLayout=a),e.focusOnHover=e.getOption("focusOnHover"),e},s.prototype.stickUp=function(t,e){var n,s,a,r,i;return s=t.getOption("stickUp"),n=t.$doc.scrollTop(),r=null!=t.$clone?t.$clone:t.$element,a=t.getOption("stickUpOffset"),i="string"==typeof a?a.indexOf("%")>0?parseFloat(a)*t.height/100:parseFloat(a):a,s?(n>=i&&!t.isStuck||i>n&&t.isStuck)&&(t.$element.add(t.$clone).find("[data-rd-navbar-toggle]").each(function(){o.proxy(t.closeToggle,this)(t,!1)}).end().find(".rd-navbar-submenu").removeClass("opened").removeClass("focus"),n>=i&&!t.isStuck&&!t.$element.hasClass("rd-navbar-fixed")?("resize"===e.type?t.switchClass(r,"","rd-navbar--is-stuck"):r.addClass("rd-navbar--is-stuck"),t.isStuck=!0,t.options.callbacks.onStuck&&t.options.callbacks.onStuck.call(t)):("resize"===e.type?t.switchClass(r,"rd-navbar--is-stuck",""):r.removeClass("rd-navbar--is-stuck").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",o.proxy(t.resizeWrap,t,e)),t.isStuck=!1,t.options.callbacks.onUnstuck&&t.options.callbacks.onUnstuck.call(t))):t.isStuck&&(t.switchClass(r,"rd-navbar--is-stuck",""),t.isStuck=!1,t.resizeWrap(e)),t},s.prototype.resizeWrap=function(t){var o,e;return e=this,null!=e.$clone||e.isStuck?void 0:(o=e.$element.parent(),e.getOption("autoHeight")?(e.height=e.$element.outerHeight(),"resize"===t.type?(o.addClass("rd-navbar--no-transition").css("height",e.height),o[0].offsetHeight,o.removeClass("rd-navbar--no-transition")):o.css("height",e.height)):void o.css("height","auto"))},s.prototype.createNav=function(t){return t.$element.find(".rd-navbar-dropdown, .rd-navbar-megamenu").each(function(){var t,e;return t=o(this),e=this.getBoundingClientRect(),e.left+t.outerWidth()>=n.innerWidth-10?this.className+=" rd-navbar-open-left":e.left-t.outerWidth()<=10&&(this.className+=" rd-navbar-open-right"),t.hasClass("rd-navbar-megamenu")?t.parent().addClass("rd-navbar--has-megamenu"):t.parent().addClass("rd-navbar--has-dropdown")}).parents("li").addClass("rd-navbar-submenu").append(o("<span/>",{"class":"rd-navbar-submenu-toggle"})),t.options.callbacks.onDomAppend&&t.options.callbacks.onDomAppend.call(this),t},s.prototype.createClone=function(t){return t.$clone=t.$element.clone().insertAfter(t.$element).addClass("rd-navbar--is-clone"),t.addAdditionalClassToToggles(".rd-navbar--is-clone","toggle-cloned","toggle-cloned-elements"),t},s.prototype.closeToggle=function(t,e){var n,s,a,r,i,l,c;return s=o(e.target),i=!1,l=this.getAttribute("data-rd-navbar-toggle"),t.options.stickUpClone&&t.isStuck?(r=".toggle-cloned",a=".toggle-cloned-elements",c=!s.hasClass("toggle-cloned")):(r=".toggle-original",a=".toggle-original-elements",c=!s.hasClass("toggle-original")),e.target!==this&&!s.parents(r+"[data-rd-navbar-toggle]").length&&!s.parents(a).length&&l&&c&&(n=o(this).parents("body").find(l).add(o(this).parents(".rd-navbar")[0]),n.each(function(){return i?void 0:i=(e.target===this||o.contains(this,e.target))===!0}),i||(n.add(this).removeClass("active"),t.options.callbacks.onToggleClose&&t.options.callbacks.onToggleClose.call(this,t))),this},s.prototype.switchToggle=function(t,e){var n,s,a;return e.preventDefault(),o(this).hasClass("toggle-cloned")?(a=".rd-navbar--is-clone",n=".toggle-cloned-elements"):(a=".rd-navbar-original",n=".toggle-original-elements"),(s=this.getAttribute("data-rd-navbar-toggle"))&&(o(a+" [data-rd-navbar-toggle]").not(this).each(function(){var t;return(t=this.getAttribute("data-rd-navbar-toggle"))?o(this).parents("body").find(a+" "+t+n).add(this).add(o.inArray(".rd-navbar",t.split(/\s*,\s*/i))>-1?o(this).parents("body")[0]:!1).removeClass("active"):void 0}),o(this).parents("body").find(a+" "+s+n).add(this).add(o.inArray(".rd-navbar",s.split(/\s*,\s*/i))>-1?o(this).parents(".rd-navbar")[0]:!1).toggleClass("active")),t.options.callbacks.onToggleSwitch&&t.options.callbacks.onToggleSwitch.call(this,t),this},s.prototype.dropdownOver=function(t,e){var n;return t.focusOnHover&&(n=o(this),clearTimeout(e),n.addClass("focus").siblings().removeClass("opened").each(t.dropdownUnfocus),t.options.callbacks.onDropdownOver&&t.options.callbacks.onDropdownOver.call(this,t)),this},s.prototype.dropdownTouch=function(t,e){var n,s;if(n=o(this),clearTimeout(e),t.focusOnHover){if(s=!1,n.hasClass("focus")&&(s=!0),!s)return n.addClass("focus").siblings().removeClass("opened").each(t.dropdownUnfocus),!1;t.options.callbacks.onDropdownOver&&t.options.callbacks.onDropdownOver.call(this,t)}return this},s.prototype.dropdownOut=function(t,e){var n;return t.focusOnHover&&(n=o(this),n.one("mouseenter.navbar",function(){return clearTimeout(e)}),clearTimeout(e),e=setTimeout(o.proxy(t.dropdownUnfocus,this,t),t.options.focusOnHoverTimeout),t.options.callbacks.onDropdownOut&&t.options.callbacks.onDropdownOut.call(this,t)),this},s.prototype.dropdownUnfocus=function(t){var e;return e=o(this),e.find("li.focus").add(this).removeClass("focus"),this},s.prototype.dropdownClose=function(t,e){var n;return e.target===this||o(e.target).parents(".rd-navbar-submenu").length||(n=o(this),n.find("li.focus").add(this).removeClass("focus").removeClass("opened"),t.options.callbacks.onDropdownClose&&t.options.callbacks.onDropdownClose.call(this,t)),this},s.prototype.dropdownToggle=function(t){return o(this).toggleClass("opened").siblings().removeClass("opened"),t.options.callbacks.onDropdownToggle&&t.options.callbacks.onDropdownToggle.call(this,t),this},s.prototype.goToAnchor=function(t,e){var n,s;return s=this.hash,n=o(s),n.length&&(e.preventDefault(),o("html, body").stop().animate({scrollTop:n.offset().top+t.getOption("anchorNavOffset")+1},t.getOption("anchorNavSpeed"),t.getOption("anchorNavEasing"),function(){return t.changeAnchor(s)})),this},s.prototype.activateAnchor=function(t){var e,n,s,a,r,i,l,c,d,p,h,u;if(a=this,h=a.$doc.scrollTop(),u=a.$win.height(),r=a.$doc.height(),p=a.getOption("anchorNavOffset"),h+u>r-50)return e=o('[data-type="anchor"]').last(),e.length&&e.offset().top>=h&&(i="#"+e.attr("id"),n=o('.rd-navbar-nav a[href^="'+i+'"]').parent(),n.hasClass("active")||(n.addClass("active").siblings().removeClass("active"),a.options.callbacks.onAnchorChange&&a.options.callbacks.onAnchorChange.call(e[0],a))),e;d=o('.rd-navbar-nav a[href^="#"]').get();for(l in d)c=d[l],s=o(c),i=s.attr("href"),e=o(i),e.length&&e.offset().top+p<=h&&e.offset().top+e.outerHeight()>h&&(s.parent().addClass("active").siblings().removeClass("active"),a.options.callbacks.onAnchorChange&&a.options.callbacks.onAnchorChange.call(e[0],a));return null},s.prototype.getAnchor=function(){return history&&history.state?history.state.id:null},s.prototype.changeAnchor=function(t){return history&&(history.state&&history.state.id!==t?history.replaceState({anchorId:t},null,t):history.pushState({anchorId:t},null,t)),this},s.prototype.applyHandlers=function(t){return null!=t.options.responsive&&t.$win.on("resize.navbar",o.proxy(t.resize,t.$win[0],t)).on("resize.navbar",o.proxy(t.resizeWrap,t)).on("resize.navbar",o.proxy(t.stickUp,null!=t.$clone?t.$clone:t.$element,t)).on("orientationchange.navbar",o.proxy(t.resize,t.$win[0],t)).trigger("resize.navbar"),t.$doc.on("scroll.navbar",o.proxy(t.stickUp,null!=t.$clone?t.$clone:t.$element,t)).on("scroll.navbar",o.proxy(t.activateAnchor,t)),t.$element.add(t.$clone).find("[data-rd-navbar-toggle]").each(function(){var e;return e=o(this),e.on("click",o.proxy(t.switchToggle,this,t)),e.parents("body").on("click",o.proxy(t.closeToggle,this,t))}),t.$element.add(t.$clone).find(".rd-navbar-submenu").each(function(){var e,n;return e=o(this),n=e.parents(".rd-navbar--is-clone").length?t.cloneTimer:t.focusTimer,e.on("mouseleave.navbar",o.proxy(t.dropdownOut,this,t,n)),e.find("> a").on("mouseenter.navbar",o.proxy(t.dropdownOver,this,t,n)),e.find("> a").on("touchstart.navbar",o.proxy(t.dropdownTouch,this,t,n)),e.find("> .rd-navbar-submenu-toggle").on("click",o.proxy(t.dropdownToggle,this,t)),e.parents("body").on("click",o.proxy(t.dropdownClose,this,t))}),t.$element.add(t.$clone).find('.rd-navbar-nav a[href^="#"]').each(function(){return o(this).on("click",o.proxy(t.goToAnchor,this,t))}),t},s.prototype.switchClass=function(t,e,n){var s;return s=t instanceof jQuery?t:o(t),s.addClass("rd-navbar--no-transition").removeClass(e).addClass(n),s[0].offsetHeight,s.removeClass("rd-navbar--no-transition")},s.prototype.setDataAPI=function(t){var o,e,n,s,a,r;for(o=["-","-xs-","-sm-","-md-","-lg-","-xl-"],r=[0,480,768,992,1200,1800],e=n=0,s=r.length;s>n;e=++n)a=r[e],this.$element.attr("data"+o[e]+"layout")&&(this.options.responsive[r[e]]||(this.options.responsive[r[e]]={}),this.options.responsive[r[e]].layout=this.$element.attr("data"+o[e]+"layout")),this.$element.attr("data"+o[e]+"device-layout")&&(this.options.responsive[r[e]]||(this.options.responsive[r[e]]={}),this.options.responsive[r[e]].deviceLayout=this.$element.attr("data"+o[e]+"device-layout")),this.$element.attr("data"+o[e]+"hover-on")&&(this.options.responsive[r[e]]||(this.options.responsive[r[e]]={}),this.options.responsive[r[e]].focusOnHover="true"===this.$element.attr("data"+o[e]+"hover-on")),this.$element.attr("data"+o[e]+"stick-up")&&(this.options.responsive[r[e]]||(this.options.responsive[r[e]]={}),this.options.responsive[r[e]].stickUp="true"===this.$element.attr("data"+o[e]+"stick-up")),this.$element.attr("data"+o[e]+"auto-height")&&(this.options.responsive[r[e]]||(this.options.responsive[r[e]]={}),this.options.responsive[r[e]].autoHeight="true"===this.$element.attr("data"+o[e]+"auto-height")),this.$element.attr("data"+o[e]+"stick-up-offset")&&(this.options.responsive[r[e]]||(this.options.responsive[r[e]]={}),this.options.responsive[r[e]].stickUpOffset=this.$element.attr("data"+o[e]+"stick-up-offset"))},s.prototype.getOption=function(t){var o,e;for(o in this.options.responsive)o<=n.innerWidth&&(e=o);return null!=this.options.responsive&&null!=this.options.responsive[e][t]?this.options.responsive[e][t]:this.options[t]},s.prototype.addAdditionalClassToToggles=function(t,e,n){return o(t).find("[data-rd-navbar-toggle]").each(function(){var s;return o(this).addClass(e),s=this.getAttribute("data-rd-navbar-toggle"),o(this).parents("body").find(t).find(s).addClass(n)})},s}(),o.fn.extend({RDNavbar:function(t){var e;return e=o(this),e.data("RDNavbar")?void 0:e.data("RDNavbar",new s(this,t))}}),n.RDNavbar=s}(window.jQuery,document,window),"undefined"!=typeof module&&null!==module?module.exports=window.RDNavbar:"function"==typeof define&&define.amd&&define(["jquery"],function(){"use strict";return window.RDNavbar})}).call(this);
/**
 * @module       UIToTop
 * @author       Matt Varone
 * @see          http://www.mattvarone.com/web-design/uitotop-jquery-plugin/
 * @license      MIT License
 */
!function(o){o.fn.UItoTop=function(n){var e={text:"",min:500,scrollSpeed:800,containerID:"ui-to-top",containerClass:"ui-to-top fa fa-angle-up",easingType:"easeIn"},t=o.extend(e,n),i="#"+t.containerID;o("body").append('<a href="#" id="'+t.containerID+'" class="'+t.containerClass+'" >'+t.text+"</a>"),o(i).click(function(){return o("html, body").stop().animate({scrollTop:0},t.scrollSpeed,t.easingType),!1}),o(window).scroll(function(){var n=o(window).scrollTop();"undefined"==typeof document.body.style.maxHeight&&o(i).css({position:"absolute",top:o(window).scrollTop()+o(window).height()-50}),n>t.min?o(i).stop(!0,!0).addClass("active"):o(i).removeClass("active")})}}(jQuery);
/**
 * @module       ScrollTo
 * @license      MIT License
 * @version      1.0.0
 */
!function(o){o.fn.scrollTo=function(e){function n(e){if(e.preventDefault(),a.hasClass("toTop"))return o("html, body").stop().animate({scrollTop:0},s.scrollSpeed),o(a).removeClass("toTop"),!1;for(var n=0;n<r.length;n++)if(window.scrollY<r[n].offsetTop+r[n].offsetHeight){var t=r[n+1].offsetTop;return t>o(document).height()-window.innerHeight&&!a.hasClass("toTop")&&a.addClass("toTop"),void 0===r[n+2]&&a.addClass("toTop"),o("html, body").stop().animate({scrollTop:t},s.scrollSpeed,function(){void 0===r[n+2]&&a.addClass("toTop")}),!1}return!1}var t={containerID:"scrollTo",containerHoverID:"scrollTopHover",scrollSpeed:1200,easingType:"linear"},s=o.extend(t,e),l=o(window),r=this;o("body").append('<a href="#" id="'+s.containerID+'" class="'+s.containerClass+'"></a>');var a=o("#"+s.containerID);a.hide().on("click",n),l.on("scroll",function(e){window.scrollY>window.innerHeight?o(a).fadeIn():o(a).fadeOut(),window.scrollY>r[r.length-1].offsetTop-1?a.addClass("toTop"):a.removeClass("toTop"),window.scrollY===o(document).height()-window.innerHeight&&a.addClass("toTop")})}}(jQuery);
/**
 * @module       RDMaterialTabs
 * @author       Rafael Shayvolodyan
 * @see          https://ua.linkedin.com/in/rafael-shayvolodyan-3a297b96
 * @version      1.0.3
 */
(function(){(function(e,m,h){var l,n,p,f;n=(p=-1!==navigator.appVersion.indexOf("MSIE"))?parseInt(navigator.appVersion.split("MSIE")[1]):null;f="ontouchstart"in h;l=function(){function d(a,b){this.options=e.extend(!0,{},this.Defaults,b);this.$element=e(a);this.$list=this.$element.find(".rd-material-tabs__list");this.$content=this.$element.find(".rd-material-tabs__container");this.$win=e(h);this.$doc=e(m);this.activeIndex=0;this.settings={stageClass:"rd-material-tabs__stage",stageOuterClass:"rd-material-tabs__stage-outer", itemClass:"rd-material-tab"};this.state={isTouched:!1,isDragged:!1,isSwiping:!1};this.touches={prevX:null,list:!1};this.initialize()}d.prototype.Defaults={itemSelector:"div",margin:20,marginContent:0,items:3,touchRatio:1,speed:500,easing:"cubic-bezier(0.005, 0.300, 0.200, 1.000)",stagePadding:0,dragContent:!0,dragList:!0,responsive:null,callbacks:{onDragStart:!1,onDragEnd:!1,onChangeStart:!1,onChangeEnd:!1,onBeforeInit:!1,onInit:!1}};d.prototype.initialize=function(){this.options.callbacks.onBeforeInit&& this.options.callbacks.onBeforeInit.call(this,this);this.setVendor(this);this.createDOM(this);this.initHandlers(this);f||this.canMoveCursor();this.setWidth(this,!0);this.setWidth(this,!1);this.moveTo(this.activeIndex);this.options.callbacks.onInit&&this.options.callbacks.onInit.call(this,this)};d.prototype.createDOM=function(a){var b;a.$content.find(">"+a.options.itemSelector).addClass(a.settings.itemClass);b=a.transform(a,0);a.$content.wrapInner(e("<div/>",{"class":a.settings.stageClass,style:a.vendorName+ "transform:"+b[a.vendorName+"transform"]})).wrapInner(e("<div/>",{"class":a.settings.stageOuterClass}));a.$list.find("li").addClass(a.settings.itemClass);return a.$list.wrapInner(e("<div/>",{"class":a.settings.stageClass,style:a.vendorName+"transform:"+b[a.vendorName+"transform"]})).wrapInner(e("<div/>",{"class":a.settings.stageOuterClass}))};d.prototype.setWidth=function(a,b){var c,k,d,e,f,g;b?(g=a.$list.find("."+a.settings.stageClass),f=a.getOption("stagePadding"),0<f&&a.getOption("dragList")&& g.css({"padding-left":f,"padding-right":f}),c=a.getWidth(a,a.$list.find("."+a.settings.stageOuterClass)),e=a.getOption("margin"),d=(c-a.getOption("items")*e)/a.getOption("items")):(g=a.$content.find("."+a.settings.stageClass),f=0,d=a.getWidth(a,a.$content.find("."+a.settings.stageOuterClass)),e=a.getOption("marginContent"));k=g.find("."+a.settings.itemClass);b&&!a.getOption("dragList")?(a.setListTranslate(a,0),g.css({"padding-left":0,"padding-right":0,width:"auto"}),k.removeAttr("style")):(c=k.length, k.css({width:a.px(d),"margin-right":a.px(e)}),g[0].style.width=a.px((d+e)*c+e+f))};d.prototype.resize=function(a){a.setWidth(a,!0);a.setWidth(a,!1);return setTimeout(function(){return a.moveTo(a.activeIndex)},300)};d.prototype.initHandlers=function(a){a.$win.on("resize",e.proxy(a.resize,this,a));if(f)a.$element.on("touchstart.rd.mt",e.proxy(a.onTouchStart,this,a));else a.$element.on("mousedown.rd.mt",e.proxy(a.onTouchStart,this,a)),a.$element.on("mouseleave.rd.mt",e.proxy(a.onTouchEnd,this,a))};d.prototype.onTouchEnd= function(a,b){var c,d;if(a.state.isTouched){a.$doc.off(".rd.mt");a.changing=!1;b.originalEvent&&(b=b.originalEvent);a.state.isTrigerred=!1;if(a.state.isDragged)if(f||a.$element.removeClass("rd-material-tabs-grab"),e(a.touches.targetEl).one("click.rd.mt",function(){return!1}),a.touches.endTime=Date.now(),d=a.touches.endTime-a.touches.startTime,a.touches.prevX=null,a.state.isDragged=!1,a.touches.list&&a.getOption("dragList"))c=a.state.isSwiping?20<d?a.touches.diff/(d/200):a.touches.diff:100<d?a.touches.diff/ (d /1E3):d/15*a.touches.diff,a.touches.velocity=0,a.touches.velocity=c/(d/50)*a.getOption("touchRatio"),0!==a.touches.velocity&&(a.setListTransition(a,a.options.speed),c=a.getListTranslate(a)+a.touches.velocity,0<c?c=0:c<a.getMaxTranslate(a,a.$list)&&(c=a.getMaxTranslate(a,a.$list)),a.setListTranslate(a,c));else{if(!a.touches.list&&a.getOption("dragContent")){a.setContentTransition(a,a.options.speed);a.setListTransition(a,a.options.speed);if("left"===a.touches.direction&&0===a.activeIndex||"right"=== a.touches.direction&&a.activeIndex===a.$content.find("."+a.settings.itemClass).length-1){a.moveTo(a.activeIndex);return}c=a.activeIndex;a.state.isSwiping?"left"===a.touches.direction?c=a.activeIndex-1:"right"===a.touches.direction&&(c=a.activeIndex+1):Math.abs(a.touches.diff)>a.getContentItemWidth(a)/3&&("left"===a.touches.direction?c=a.activeIndex-1:"right"===a.touches.direction&&(c=a.activeIndex+1));a.moveTo(c)}}else!a.state.isDragged&&a.touches.list&&(c=e(b.target),"A"===b.target.tagName||c.parents("."+ a.settings.itemClass+" a").length)&&(a.setContentTransition(a,a.options.speed),a.setListTransition(a,a.options.speed),c=c.parents("."+a.settings.itemClass).index(),a.moveTo(c));a.state.isTouched=!1;a.options.callbacks.onDragEnd&&a.options.callbacks.onDragEnd.call(this,a)}};d.prototype.onDrag=function(a,b){var c,d,e;if(a.state.isTouched){b.originalEvent&&(b=b.originalEvent);a.touches.currentX="touchmove"===b.type?b.targetTouches[0].pageX:b.pageX;a.touches.currentY="touchmove"===b.type?b.targetTouches[0].pageY: b.pageY;null===a.touches.prevX&&(a.touches.prevX=a.touches.currentX);e=a.touches.diff=a.touches.currentX-a.touches.startX;e*=a.getOption("touchRatio");if(0!==e&&!a.state.isTrigerred){c=a.touches.startX-a.touches.currentX;d=a.touches.startY-a.touches.currentY;if(Math.abs(c)<Math.abs(d)){a.onTouchEnd(a,b);return}b.preventDefault();!f&&(a.touches.list&&a.getOption("dragList")||!a.touches.list&&a.getOption("dragContent"))&&a.$element.addClass("rd-material-tabs-grab");0<Math.abs(e)&&(a.state.isDragged= !0);a.state.isTrigerred=!0}a.touches.direction=0<e?"left":"right";a.touches.currentTranslate=e+a.touches.startTranslate;a.touches.prevDirection!==a.touches.direction&&(a.touches.startTime=Date.now());a.touches.endTime=Date.now();d=a.touches.endTime-a.touches.startTime;c=a.touches.list?8:4;a.state.isSwiping=Math.abs(a.touches.currentX-a.touches.prevX)>c||100>d&&2<Math.abs(a.touches.currentX-a.touches.prevX)?!0:!1;a.touches.prevX=a.touches.currentX;a.touches.prevDirection=a.touches.direction;a.touches.list&& a.getOption("dragList")?a.setListTranslate(a,a.touches.currentTranslate):!a.touches.list&&a.getOption("dragContent")&&a.setContentTranslate(a,a.touches.currentTranslate)}};d.prototype.onTouchStart=function(a,b){var c;b.originalEvent&&(b=b.originalEvent);if(1===b.which||f){a.state.isTouched=!0;c=a.$element.find("[onclick]");c.length&&c.removeAttr("onclick");c=e(b.target);a.touches.list=0<a.$list.find(c).length;if(a.touches.list)a.$list.find("a").on("click.rd.mt touchstart.rd.mt",function(a){return a.preventDefault()}); a.touches.startX=a.touches.currentX="touchstart"===b.type?b.targetTouches[0].pageX:b.pageX;a.touches.startY=a.touches.currentY="touchstart"===b.type?b.targetTouches[0].pageY:b.pageY;a.touches.startTime=new Date;a.touches.targetEl=b.target||b.srcElement;f||"IMG"!==a.touches.targetEl.tagName&&"A"!==a.touches.targetEl.tagName||b.preventDefault();a.$doc.on("mouseup.rd.mt touchend.rd.mt touchcancel.rd.mt",e.proxy(a.onTouchEnd,this,a));a.$doc.one("mousemove.rd.mt touchmove.rd.mt",e.proxy(function(b){var c; a.options.callbacks.onDragStart&&a.options.callbacks.onDragStart.call(this,a);b.originalEvent&&(b=b.originalEvent);a.touches.currentX="touchmove"===b.type?b.targetTouches[0].pageX:b.pageX;a.touches.currentY="touchmove"===b.type?b.targetTouches[0].pageY:b.pageY;c=a.touches.startX-a.touches.currentX;if(Math.abs(c)<Math.abs(a.touches.startY-a.touches.currentY))a.onTouchEnd(a,b);else if(b.preventDefault(),a.touches.list?(a.touches.startTranslate=a.getListTranslate(a),a.setListTransition(a,0)):(a.touches.startTranslate= a.getContentTranslate(a),a.setContentTransition(a,0)),a.$doc.on("mousemove.rd.mt touchmove.rd.mt",e.proxy(a.onDrag,this,a)),0===c)a.state.isTrigerred=!1,a.$doc.trigger("mousemove.rd.mt touchmove.rd.mt");else return 1<Math.abs(c)&&(a.state.isDragged=!0),!f&&(a.touches.list&&a.getOption("dragList")||!a.touches.list&&a.getOption("dragContent"))&&a.$element.addClass("rd-material-tabs-grab"),this}))}};d.prototype.getWidth=function(a,b){return b.outerWidth()};d.prototype.getContentItemWidth=function(a){return a.getWidth(a, a.$content.find("."+a.settings.itemClass))};d.prototype.getListItemWidth=function(a){return a.getWidth(a,a.$list.find("."+a.settings.itemClass))};d.prototype.moveListTo=function(a,b){var c;a.getOption("items")<a.$list.find("."+a.settings.itemClass).length&&(c=a.getListItemWidth(a),c=-(c*b+a.getOption("margin")*b),console.log(a.getMaxTranslate(a,a.$list)),c<a.getMaxTranslate(a,a.$list)&&(c=a.getMaxTranslate(a,a.$list)),a.setListTranslate(a,c))};d.prototype.moveTo=function(a){var b,c;c=!1;a!==this.activeIndex&& this.options.callbacks.onChangeStart&&(b=this.options.callbacks.onChangeStart.call(this,this.activeIndex,a),null==b||b||(c=!0));c||(b=this.getContentItemWidth(this),b=-(b*a+this.getOption("marginContent")*a),this.setContentTranslate(this,b),this.getOption("dragList")&&this.moveListTo(this,a),this.updateActive(this,a))};d.prototype.canMoveCursor=function(){var a;a=this;a.$list.on("mouseenter",function(){a.getOption("dragList")?a.$element.addClass("rd-material-tabs-canMove"):a.$element.removeClass("rd-material-tabs-canMove")}); a.$list.on("mouseleave",function(){a.$element.removeClass("rd-material-tabs-canMove")});a.$content.on("mouseenter",function(){a.getOption("dragContent")?a.$element.addClass("rd-material-tabs-canMove"):a.$element.removeClass("rd-material-tabs-canMove")});a.$content.on("mouseleave",function(){a.$element.removeClass("rd-material-tabs-canMove")})};d.prototype.px=function(a){return a+"px"};d.prototype.transform=function(a,b){var c;c={};p&&10>n||!1===a.isPerspective()?c[a.vendorName+"transform"]="translate("+ a.px(b)+", 0)":c[a.vendorName+"transform"]="translate3d("+a.px(b)+", 0, 0)";return c};d.prototype.updateActive=function(a,b){var c,d;c=a.getContentItemWidth(a);d=a.getContentTranslate(a);null==b&&(b=a.activeIndex=Math.round(Math.abs(d/c)));a.$element.find("."+a.settings.itemClass+"-active").removeClass(a.settings.itemClass+"-active");a.$list.find("."+a.settings.itemClass).eq(b).addClass(a.settings.itemClass+"-active");a.$content.find("."+a.settings.itemClass).eq(b).addClass(a.settings.itemClass+"-active"); b!==a.activeIndex&&(a.activeIndex=b,a.options.callbacks.onChangeEnd&&a.options.callbacks.onChangeEnd.call(this,a))};d.prototype.getActiveIndex=function(a){return a.$content.find("."+a.settings.itemClass+"-active").index()};d.prototype.getTranslate=function(a,b){var c;c=b.css(a.vendorName+"transform").replace(/[^0-9\-.,]/g,"").split(",");return parseInt(c[12]||c[4])};d.prototype.getListTranslate=function(a){return a.getTranslate(a,a.$list.find("."+a.settings.stageClass))};d.prototype.getContentTranslate= function(a){return a.getTranslate(a,a.$content.find("."+a.settings.stageClass))};d.prototype.setTransition=function(a,b,c){e(b).css(a.vendorName+"transition",c/1E3+"s all "+a.options.easing)};d.prototype.setListTransition=function(a,b){a.setTransition(a,a.$list.find("."+a.settings.stageClass),b)};d.prototype.setContentTransition=function(a,b){a.setTransition(a,a.$content.find("."+a.settings.stageClass),b)};d.prototype.setTranslate=function(a,b,c){c=a.transform(a,c);b.css(a.vendorName+"transform", c[a.vendorName+"transform"])};d.prototype.setListTranslate=function(a,b){a.setTranslate(a,a.$list.find("."+a.settings.stageClass),b)};d.prototype.setContentTranslate=function(a,b){a.setTranslate(a,a.$content.find("."+a.settings.stageClass),b)};d.prototype.getMaxTranslate=function(a,b){return a.$element.outerWidth()-a.getWidth(a,b.find("."+a.settings.stageClass))};d.prototype.setVendor=function(){this.vendorName=this.isTransform().replace(/Transform/i,"");this.vendorName=""!==this.vendorName?"-"+this.vendorName.toLowerCase()+ "-":""};d.prototype.isStyleSupported=function(a){var b,c,d;b=m.createElement("div");for(c in a)if(d=a[c],"undefined"!==typeof b.style[d])return[d,c];return!1};d.prototype.isPerspective=function(){return this.isStyleSupported(["perspective","webkitPerspective","MozPerspective","OPerspective","MsPerspective"])[0]};d.prototype.isTransform=function(){return this.isStyleSupported(["transform","WebkitTransform","MozTransform","OTransform","msTransform"])[0]};d.prototype.getOption=function(a){var b,c;if(null!= this.options.responsive){for(b in this.options.responsive)b<=h.innerWidth&&(c=b);return null!=this.options.responsive[c]&&null!=this.options.responsive[c][a]?this.options.responsive[c][a]:this.options[a]}return this.options[a]};return d}();e.fn.extend({RDMaterialTabs:function(d){return this.each(function(){var a;a=e(this);if(!a.data("RDMaterialTabs"))return a.data("RDMaterialTabs",new l(this,d))})}});return h.RDMaterialTabs=l})(window.jQuery,document,window);"undefined"!==typeof module&&null!==module? module.exports=window.RDMaterialTabs:"function"===typeof define&&define.amd&&define(["jquery"],function(){return window.RDMaterialTabs})}).call(this);
/**
 * @module       Easy Responsive Tabs Plugin
 * @author       Samson.Onna (samson3d@gmail.com)
 * @license      MIT License
 */
!function(t){t.fn.extend({easyResponsiveTabs:function(a){var e={type:"default",width:"auto",fit:!0,closed:!1,activate:function(){}},a=t.extend(e,a),s=a,i=s.type,n=s.fit,r=s.width,c="vertical",o="accordion",d=window.location.hash,l=!(!window.history||!history.replaceState);t(this).bind("tabactivate",function(t,e){"function"==typeof a.activate&&a.activate.call(e,t)}),this.each(function(){function e(){i==c&&s.addClass("resp-vtabs"),1==n&&s.css({width:"100%"}),i==o&&(s.addClass("resp-easy-accordion"),s.find(".resp-tabs-list").css("display","none"))}var s=t(this),p=s.find("ul.resp-tabs-list"),b=s.attr("id");s.find("ul.resp-tabs-list li").addClass("resp-tab-item"),s.css({display:"block",width:r}),s.find(".resp-tabs-container > div").addClass("resp-tab-content"),e();var v;s.find(".resp-tab-content").before("<div class='resp-accordion' role='tab'><span class='resp-arrow'></span></div>");var f=0;s.find(".resp-accordion").each(function(){v=t(this);var a=s.find(".resp-tab-item:eq("+f+")"),e=s.find(".resp-accordion:eq("+f+")");e.append(a.html()),e.data(a.data()),v.attr("aria-controls","tab_item-"+f),f++});var h,u=0;s.find(".resp-tab-item").each(function(){$tabItem=t(this),$tabItem.attr("aria-controls","tab_item-"+u),$tabItem.attr("role","tab");var a=0;s.find(".resp-tab-content").each(function(){h=t(this),h.attr("aria-labelledby","tab_item-"+a),a++}),u++});var C=0;if(""!=d){var m=d.match(new RegExp(b+"([0-9]+)"));null!==m&&2===m.length&&(C=parseInt(m[1],10)-1,C>u&&(C=0))}t(s.find(".resp-tab-item")[C]).addClass("resp-tab-active"),a.closed===!0||"accordion"===a.closed&&!p.is(":visible")||"tabs"===a.closed&&p.is(":visible")?t(s.find(".resp-tab-content")[C]).addClass("resp-tab-content-active resp-accordion-closed"):(t(s.find(".resp-accordion")[C]).addClass("resp-tab-active"),t(s.find(".resp-tab-content")[C]).addClass("resp-tab-content-active").attr("style","display:block")),s.find("[role=tab]").each(function(){var a=t(this);a.click(function(){var a=t(this),e=a.attr("aria-controls");if(a.hasClass("resp-accordion")&&a.hasClass("resp-tab-active"))return s.find(".resp-tab-content-active").slideUp("",function(){t(this).addClass("resp-accordion-closed")}),a.removeClass("resp-tab-active"),!1;if(!a.hasClass("resp-tab-active")&&a.hasClass("resp-accordion")?(s.find(".resp-tab-active").removeClass("resp-tab-active"),s.find(".resp-tab-content-active").slideUp().removeClass("resp-tab-content-active resp-accordion-closed"),s.find("[aria-controls="+e+"]").addClass("resp-tab-active"),s.find(".resp-tab-content[aria-labelledby = "+e+"]").slideDown().addClass("resp-tab-content-active")):(s.find(".resp-tab-active").removeClass("resp-tab-active"),s.find(".resp-tab-content-active").removeAttr("style").removeClass("resp-tab-content-active").removeClass("resp-accordion-closed"),s.find("[aria-controls="+e+"]").addClass("resp-tab-active"),s.find(".resp-tab-content[aria-labelledby = "+e+"]").addClass("resp-tab-content-active").attr("style","display:block")),a.trigger("tabactivate",a),t(window).trigger("lookup.unveil"),l){var i=window.location.hash,n=b+(parseInt(e.substring(9),10)+1).toString();if(""!=i){var r=new RegExp(b+"[0-9]+");n=null!=i.match(r)?i.replace(r,n):i+"|"+n}else n="#"+n;history.replaceState(null,null,n)}})}),t(window).resize(function(){s.find(".resp-accordion-closed").removeAttr("style")})})}})}(jQuery);
/**
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.6",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.6",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.6",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.6",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.6",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.6",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");
  d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.6",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
/**
 * @module       RDInputLabel
 * @author       Evgeniy Gusarov
 * @license      MIT License
 */
(function(){!function(t,e,i){var s,n;return n=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isWebkit=/safari|chrome/i.test(navigator.userAgent),s=function(){function s(s,n){this.options=t.extend(!0,{},this.Defaults,n),this.$element=t(s).addClass("rd-input-label"),this.$target=t("#"+this.$element.attr("for")),this.$win=t(i),this.$doc=t(e),this.initialize()}return s.prototype.Defaults={callbacks:null},s.prototype.initialize=function(){return this.$target.on("input",t.proxy(this.change,this)).on("focus",t.proxy(this.focus,this)).on("blur",t.proxy(this.blur,this)).on("hover",t.proxy(this.hover,this)).parents("form").on("reset",t.proxy(this.reset,this)),this.change(),this.hover(),this},s.prototype.hover=function(){return isWebkit&&(this.$target.is(":-webkit-autofill")?this.$element.addClass("auto-fill"):this.$element.removeClass("auto-fill")),this},s.prototype.change=function(){return isWebkit&&(this.$target.is(":-webkit-autofill")?this.$element.addClass("auto-fill"):this.$element.removeClass("auto-fill")),""!==this.$target.val()?(this.$element.hasClass("focus")||this.focus(),this.$element.addClass("not-empty")):this.$element.removeClass("not-empty"),this},s.prototype.focus=function(){return this.$element.addClass("focus"),this},s.prototype.reset=function(){return setTimeout(t.proxy(this.blur,this)),this},s.prototype.blur=function(t){return""===this.$target.val()&&this.$element.removeClass("focus").removeClass("not-empty"),this},s}(),t.fn.extend({RDInputLabel:function(e){return this.each(function(){var i;return i=t(this),i.data("RDInputLabel")?void 0:i.data("RDInputLabel",new s(this,e))})}}),i.RDInputLabel=s}(window.jQuery,document,window),"undefined"!=typeof module&&null!==module?module.exports=window.RDInputLabel:"function"==typeof define&&define.amd&&define(["jquery"],function(){"use strict";return window.RDInputLabel})}).call(this);
/**
 * @module       Select2
 * @version      4.0.2
 * @license      MIT License
 * @link         https://github.com/select2/select2/blob/master/
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return u.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};if(a&&"."===a.charAt(0))if(b){for(a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.slice(0,n.length-1).concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=v.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),n.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){q[a]=b}}function j(a){if(e(r,a)){var c=r[a];delete r[a],t[a]=!0,m.apply(b,c)}if(!e(q,a)&&!e(t,a))throw new Error("No "+a);return q[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return function(){return s&&s.config&&s.config[a]||{}}}var m,n,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;o=function(a,b){var c,d=k(a),e=d[0];return a=d[1],e&&(e=f(e,b),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(b)):f(a,b):(a=f(a,b),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},p={require:function(a){return g(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}},module:function(a){return{id:a,uri:"",exports:q[a],config:l(a)}}},m=function(a,c,d,f){var h,k,l,m,n,s,u=[],v=typeof d;if(f=f||a,"undefined"===v||"function"===v){for(c=!c.length&&d.length?["require","exports","module"]:c,n=0;n<c.length;n+=1)if(m=o(c[n],f),k=m.f,"require"===k)u[n]=p.require(a);else if("exports"===k)u[n]=p.exports(a),s=!0;else if("module"===k)h=u[n]=p.module(a);else if(e(q,k)||e(r,k)||e(t,k))u[n]=j(k);else{if(!m.p)throw new Error(a+" missing "+k);m.p.load(m.n,g(f,!0),i(k),{}),u[n]=q[k]}l=d?d.apply(q[a],u):void 0,a&&(h&&h.exports!==b&&h.exports!==q[a]?q[a]=h.exports:l===b&&s||(q[a]=l))}else a&&(q[a]=d)},a=c=n=function(a,c,d,e,f){if("string"==typeof a)return p[a]?p[a](c):j(o(a,c).f);if(!a.splice){if(s=a,s.deps&&n(s.deps,s.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?m(b,a,c,d):setTimeout(function(){m(b,a,c,d)},4),n},n.config=function(a){return n(a)},a._defined=q,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(q,a)||e(r,a)||(r[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){var e=b[d];"function"==typeof e&&"constructor"!==d&&c.push(d)}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){var a=Array.prototype.unshift;return a.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};return d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice;this.listeners=this.listeners||{},a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;d>c;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;a>c;c++){var d=Math.floor(36*Math.random());b+=d.toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return e!==f||"hidden"!==f&&"visible"!==f?"scroll"===e||"scroll"===f?!0:d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth:!1},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" select2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){var c=b.find(".select2-results");c.append(a)},c.prototype.sort=function(a){var b=this.options.get("sorter");return b(a)},c.prototype.setClasses=function(){var b=this;this.data.current(function(c){var d=a.map(c,function(a){return a.id.toString()}),e=b.$results.find(".select2-results__option[aria-selected]");e.each(function(){var b=a(this),c=a.data(this,"data"),e=""+c.id;null!=c.element&&c.element.selected||null==c.element&&a.inArray(e,d)>-1?b.attr("aria-selected","true"):b.attr("aria-selected","false")});var f=e.filter("[aria-selected=true]");f.length>0?f.first().trigger("mouseenter"):e.first().trigger("mouseenter")})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(b){var c=document.createElement("li");c.className="select2-results__option";var d={role:"treeitem","aria-selected":"false"};b.disabled&&(delete d["aria-selected"],d["aria-disabled"]="true"),null==b.id&&delete d["aria-selected"],null!=b._resultId&&(c.id=b._resultId),b.title&&(c.title=b.title),b.children&&(d.role="group",d["aria-label"]=b.text,delete d["aria-selected"]);for(var e in d){var f=d[e];c.setAttribute(e,f)}if(b.children){var g=a(c),h=document.createElement("strong");h.className="select2-results__group";a(h);this.template(b,h);for(var i=[],j=0;j<b.children.length;j++){var k=b.children[j],l=this.option(k);i.push(l)}var m=a("<ul></ul>",{"class":"select2-results__options select2-results__options--nested"});m.append(i),g.append(h),g.append(m)}else this.template(b,c);return a.data(c,"data",b),c},c.prototype.bind=function(b,c){var d=this,e=b.id+"-results";this.$results.attr("id",e),b.on("results:all",function(a){d.clear(),d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("results:append",function(a){d.append(a.data),b.isOpen()&&d.setClasses()}),b.on("query",function(a){d.hideMessages(),d.showLoading(a)}),b.on("select",function(){b.isOpen()&&d.setClasses()}),b.on("unselect",function(){b.isOpen()&&d.setClasses()}),b.on("open",function(){d.$results.attr("aria-expanded","true"),d.$results.attr("aria-hidden","false"),d.setClasses(),d.ensureHighlightVisible()}),b.on("close",function(){d.$results.attr("aria-expanded","false"),d.$results.attr("aria-hidden","true"),d.$results.removeAttr("aria-activedescendant")}),b.on("results:toggle",function(){var a=d.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),b.on("results:select",function(){var a=d.getHighlightedResults();if(0!==a.length){var b=a.data("data");"true"==a.attr("aria-selected")?d.trigger("close",{}):d.trigger("select",{data:b})}}),b.on("results:previous",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a);if(0!==c){var e=c-1;0===a.length&&(e=0);var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top,h=f.offset().top,i=d.$results.scrollTop()+(h-g);0===e?d.$results.scrollTop(0):0>h-g&&d.$results.scrollTop(i)}}),b.on("results:next",function(){var a=d.getHighlightedResults(),b=d.$results.find("[aria-selected]"),c=b.index(a),e=c+1;if(!(e>=b.length)){var f=b.eq(e);f.trigger("mouseenter");var g=d.$results.offset().top+d.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=d.$results.scrollTop()+h-g;0===e?d.$results.scrollTop(0):h>g&&d.$results.scrollTop(i)}}),b.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),b.on("results:message",function(a){d.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=d.$results.scrollTop(),c=d.$results.get(0).scrollHeight-b+a.deltaY,e=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=d.$results.height();e?(d.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(d.$results.scrollTop(d.$results.get(0).scrollHeight-d.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(b){var c=a(this),e=c.data("data");return"true"===c.attr("aria-selected")?void(d.options.get("multiple")?d.trigger("unselect",{originalEvent:b,data:e}):d.trigger("close",{})):void d.trigger("select",{originalEvent:b,data:e})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(b){var c=a(this).data("data");d.getHighlightedResults().removeClass("select2-results__option--highlighted"),d.trigger("results:focus",{data:c,element:a(this)})})},c.prototype.getHighlightedResults=function(){var a=this.$results.find(".select2-results__option--highlighted");return a},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),2>=c?this.$results.scrollTop(0):(g>this.$results.outerHeight()||0>g)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){var a={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return a}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var b=a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=this.$element.data("old-tabindex")?this._tabindex=this.$element.data("old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),b.attr("title",this.$element.attr("title")),b.attr("tabindex",this._tabindex),this.$selection=b,b},d.prototype.bind=function(a,b){var d=this,e=(a.id+"-container",a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),d.$selection.focus(),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(b){a(document.body).on("mousedown.select2."+b.id,function(b){var c=a(b.target),d=c.closest(".select2"),e=a(".select2.select2-container--open");e.each(function(){var b=a(this);if(this!=d[0]){var c=b.data("element");c.select2("close")}})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){var c=b.find(".selection");c.append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",d),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("selection:update",function(a){c.update(a.data)})},e.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},e.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".select2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.prop("title",b.title||b.text)},e}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,c){var e=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){e.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(b){if(!e.options.get("disabled")){var c=a(this),d=c.parent(),f=d.data("data");e.trigger("unselect",{originalEvent:b,data:f})}})},d.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()},d.prototype.display=function(a,b){var c=this.options.get("templateSelection"),d=this.options.get("escapeMarkup");return d(c(a,b))},d.prototype.selectionContainer=function(){var b=a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');return b},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.prop("title",e.title||e.text),f.data("data",e),b.push(f)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id,d=b.length>1;if(d||c)return a.call(this,b);this.clear();var e=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(e)},b}),b.define("select2/selection/allowClear",["jquery","../keys"],function(a,b){function c(){}return c.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},c.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var c=this.$selection.find(".select2-selection__clear");if(0!==c.length){b.stopPropagation();for(var d=c.data("data"),e=0;e<d.length;e++){var f={data:d[e]};if(this.trigger("unselect",f),f.prevented)return}this.$element.val(this.placeholder.id).trigger("change"),this.trigger("toggle",{})}}},c.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||(c.which==b.DELETE||c.which==b.BACKSPACE)&&this._handleClear(c)},c.prototype.update=function(b,c){if(b.call(this,c),!(this.$selection.find(".select2-selection__placeholder").length>0||0===c.length)){var d=a('<span class="select2-selection__clear">&times;</span>');d.data("data",c),this.$selection.find(".select2-selection__rendered").prepend(d)}},c}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,b,d){var e=this;a.call(this,b,d),b.on("open",function(){e.$search.trigger("focus")}),b.on("close",function(){e.$search.val(""),e.$search.removeAttr("aria-activedescendant"),e.$search.trigger("focus")}),b.on("enable",function(){e.$search.prop("disabled",!1),e._transferTabIndex()}),b.on("disable",function(){e.$search.prop("disabled",!0)}),b.on("focus",function(a){e.$search.trigger("focus")}),b.on("results:focus",function(a){e.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".select2-search--inline",function(a){e.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){e._handleBlur(a)}),this.$selection.on("keydown",".select2-search--inline",function(a){a.stopPropagation(),e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented();var b=a.which;if(b===c.BACKSPACE&&""===e.$search.val()){var d=e.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var f=d.data("data");e.searchRemoveChoice(f),a.preventDefault()}}});var f=document.documentMode,g=f&&11>=f;this.$selection.on("input.searchcheck",".select2-search--inline",function(a){return g?void e.$selection.off("input.search input.searchcheck"):void e.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(a){if(g&&"input"===a.type)return void e.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&e.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c&&this.$search.focus()},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{var b=this.$search.val().length+1;a=.75*b+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting"],g=["opening","closing","selecting","unselecting"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){var a={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};return a}),b.define("select2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),d+=null!=c.id?"-"+c.id.toString():"-"+a.generateChars(4)},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){var b=this;if(this.$element.prop("multiple"))return a.selected=!1,
    c(a.element).is("option")?(a.element.selected=!1,void this.$element.trigger("change")):void this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){c.removeData(this,"data")})},d.prototype.query=function(a,b){var d=[],e=this,f=this.$element.children();f.each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var b;a.children?(b=document.createElement("optgroup"),b.label=a.text):(b=document.createElement("option"),void 0!==b.textContent?b.textContent=a.text:b.innerText=a.text),a.id&&(b.value=a.id),a.disabled&&(b.disabled=!0),a.selected&&(b.selected=!0),a.title&&(b.title=a.title);var d=c(b),e=this._normalizeItem(a);return e.element=b,c.data(b,"data",e),d},d.prototype.item=function(a){var b={};if(b=c.data(a[0],"data"),null!=b)return b;if(a.is("option"))b={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){b={text:a.prop("label"),children:[],title:a.prop("title")};for(var d=a.children("option"),e=[],f=0;f<d.length;f++){var g=c(d[f]),h=this.item(g);e.push(h)}b.children=e}return b=this._normalizeItem(b),b.element=a[0],c.data(a[0],"data",b),b},d.prototype._normalizeItem=function(a){c.isPlainObject(a)||(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){var c=this.options.get("matcher");return c(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},j,l),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){e.trigger("results:message",{message:"errorLoading"})});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&""!==a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");void 0!==f&&(this.createTag=f);var g=d.get("insertTag");if(void 0!==g&&(this.insertTag=g),b.call(this,c,d),a.isArray(e))for(var h=0;h<e.length;h++){var i=e[h],j=this._normalizeItem(i),k=this.option(j);this.$element.append(k)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0),k=i.text===b.term;if(k||j)return f?!1:(a.data=g,void c(a))}if(f)return!0;var l=e.createTag(b);if(null!=l){var m=e.option(l);m.attr("data-select2-tag",!0),e.addOptions([m]),e.insertTag(g,l)}a.results=g,c(a)}var e=this;return this._removeOldTags(),null==b.term||null!=b.page?void a.call(this,b,c):void a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){var c=(this._lastTag,this.$element.find("option[data-select2-tag]"));c.each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(a,b,c){function d(a){e.trigger("select",{data:a})}var e=this;b.term=b.term||"";var f=this.tokenizer(b,this.options,d);f.term!==b.term&&(this.$search.length&&(this.$search.val(f.term),this.$search.focus()),b.term=f.term),a.call(this,b,c)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",b.term.length<this.minimumInputLength?void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){return b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength?void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}}):void a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;return d.maximumSelectionLength>0&&f>=d.maximumSelectionLength?void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}}):void a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val("")}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){var b=e.showSearch(a);b?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){var c=e.$results.offset().top+e.$results.outerHeight(!1),d=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1);c+50>=d&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.select2."+d.id,g="resize.select2."+d.id,h="orientationchange.select2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){a(this).data("select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(b){var c=a(this).data("select2-scroll-position");a(this).scrollTop(c.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.select2."+d.id,f="resize.select2."+d.id,g="orientationchange.select2."+d.id,h=this.$container.parents().filter(b.hasScroll);h.off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=this.$container.offset();f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom},m=this.$dropdownParent;"static"===m.css("position")&&(m=m.offsetParent());var n=m.offset();l.top-=n.top,l.left-=n.left,c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return a(c.data.results)<this.minimumResultsForSearch?!1:b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(){d._handleSelectOnClose()})},a.prototype._handleSelectOnClose=function(){var a=this.getHighlightedResults();if(!(a.length<1)){var b=a.data("data");null!=b.element&&b.element.selected||null==b.element&&b.selected||this.trigger("select",{data:b})}},a}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&c.ctrlKey||this.trigger("close",{})},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){var b=a.minimum-a.input.length,c="Please enter "+b+" or more characters";return c},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}D.prototype.apply=function(l){if(l=a.extend(!0,{},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),(null!=l.tokenSeparators||null!=l.tokenizer)&&(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(O){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(P){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var Q=k.loadPath(this.defaults.amdLanguageBase+"en"),R=new k(l.language);R.extend(Q),l.translations=R}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){var h=e.children[g],i=c(d,h);null==i&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var j=b(e.text).toUpperCase(),k=b(d.term).toUpperCase();return j.indexOf(k)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(this.defaults,f)};var E=new D;return E}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){var c=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),a.data("select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),a.data("data",a.data("select2Tags")),a.data("tags",!0)),a.data("ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",a.data("ajaxUrl")),a.data("ajax--url",a.data("ajaxUrl")));var e={};e=b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset?b.extend(!0,{},a[0].dataset,a.data()):a.data();var f=b.extend(!0,{},e);f=d._convertData(f);for(var g in f)b.inArray(g,c)>-1||(b.isPlainObject(this.options[g])?b.extend(this.options[g],f[g]):this.options[g]=f[g]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,c){null!=a.data("select2")&&a.data("select2").destroy(),this.$element=a,this.id=this._generateId(a),c=c||{},this.options=new b(c,a),e.__super__.constructor.call(this);var d=a.attr("tabindex")||0;a.data("old-tabindex",d),a.attr("tabindex","-1");var f=this.options.get("dataAdapter");this.dataAdapter=new f(a,this.options);var g=this.render();this._placeContainer(g);var h=this.options.get("selectionAdapter");this.selection=new h(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,g);var i=this.options.get("dropdownAdapter");this.dropdown=new i(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,g);var j=this.options.get("resultsAdapter");this.results=new j(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var k=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){k.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b=b.replace(/(:|\.|\[|\]|,)/g,""),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return 0>=e?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;i>h;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this._sync=c.bind(this._syncAttributes,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._sync);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._sync)}),this._observer.observe(this.$element[0],{attributes:!0,subtree:!1})):this.$element[0].addEventListener&&this.$element[0].addEventListener("DOMAttrModified",b._sync,!1)},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),(null==a||0===a.length)&&(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._sync),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&this.$element[0].removeEventListener("DOMAttrModified",this._sync,!1),this._sync=null,this.$element.off(".select2"),this.$element.attr("tabindex",this.$element.data("old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),b.data("element",this.$element),b},e}),b.define("jquery-mousewheel",["jquery"],function(a){return a}),b.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults"],function(a,b,c,d){if(null==a.fn.select2){var e=["open","close","destroy"];a.fn.select2=function(b){if(b=b||{},"object"==typeof b)return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d;return this.each(function(){var c=a(this).data("select2");null==c&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2.");var e=Array.prototype.slice.call(arguments,1);d=c[b].apply(c,e)}),a.inArray(b,e)>-1?this:d}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});
/**
 * @module       RD-Google Map
 * @author       Evgeniy Gusarov
 * @see          https://ua.linkedin.com/pub/evgeniy-gusarov/8a/a40/54a
 * @version      0.1.5
 */
!function(a){"use strict";var t={cntClass:"map",mapClass:"map_model",locationsClass:"map_locations",marker:{basic:"/assets/gmap_marker-e52a52099e4c115b6410a007f3ad05f1c05e8c8a3cd70a1d30a681907d8d9ee9.png",active:"/assets/gmap_marker-e52a52099e4c115b6410a007f3ad05f1c05e8c8a3cd70a1d30a681907d8d9ee9.png"},styles:[],onInit:!1},o={map:{x:-73.9924068,y:40.646197,zoom:14},locations:[]},n=function(t,o){var n=t.parent().find("."+o.locationsClass).find("li"),e=[];return n.length>0&&n.each(function(t){var n=a(this);n.data("x")&&n.data("y")&&(e[t]={x:n.data("x"),y:n.data("y"),basic:n.data("basic")?n.data("basic"):o.marker.basic,active:n.data("active")?n.data("active"):o.marker.active},a.trim(n.html())?e[t].content='<div class="iw-content">'+n.html()+"</div>":e[t].content=!1)}),e};a.fn.googleMap=function(e){e=a.extend(!0,{},t,e),a(this).each(function(){var t=a(this),s=a.extend(!0,{},o,{map:{x:t.data("x"),y:t.data("y"),zoom:t.data("zoom")},locations:n(t,e)}),i=new google.maps.Map(this,{center:new google.maps.LatLng(parseFloat(s.map.y),parseFloat(s.map.x)),styles:e.styles,zoom:s.map.zoom,scrollwheel:!1});e.onInit&&e.onInit.call(this,i);var c=new google.maps.InfoWindow,l=[];for(var r in s.locations)l[r]=new google.maps.Marker({position:new google.maps.LatLng(parseFloat(s.locations[r].y),parseFloat(s.locations[r].x)),map:i,icon:s.locations[r].basic,index:r}),s.locations[r].content&&(google.maps.event.addListener(l[r],"click",function(){for(var t in l)l[t].setIcon(s.locations[t].basic);c.setContent(s.locations[this.index].content),c.open(i,this),a(".gm-style-iw").parent().parent().addClass("gm-wrapper"),this.setIcon(s.locations[this.index].active)}),google.maps.event.addListener(c,"closeclick",function(){for(var a in l)l[a].setIcon(s.locations[a].basic)})); c.setContent(s.locations[0].content);c.open(s, l[0]);google.maps.event.addDomListener(window,"resize",function(){i.setCenter(new google.maps.LatLng(parseFloat(s.map.y),parseFloat(s.map.x)))})})}}(jQuery);
/**
 * @module       Stepper
 * @version      3.0.8
 * @license      MIT License
 * @link         http://classic.formstone.it/stepper/
 */
!function(a,b){"use strict";function c(b){b=a.extend({},m,b||{});for(var c=a(this),e=0,f=c.length;f>e;e++)d(c.eq(e),b);return c}function d(b,c){if(!b.hasClass("stepper-input")){c=a.extend({},c,b.data("stepper-options"));var d=parseFloat(b.attr("min")),g=parseFloat(b.attr("max")),h=parseFloat(b.attr("step"))||1;b.addClass("stepper-input").wrap('<div class="stepper '+c.customClass+'" />').after('<span class="stepper-arrow up">'+c.labels.up+'</span><span class="stepper-arrow down">'+c.labels.down+"</span>");var i=b.parent(".stepper"),j=a.extend({$stepper:i,$input:b,$arrow:i.find(".stepper-arrow"),min:void 0===typeof d||isNaN(d)?!1:d,max:void 0===typeof g||isNaN(g)?!1:g,step:void 0===typeof h||isNaN(h)?1:h,timer:null},c);j.digits=k(j.step),b.is(":disabled")&&i.addClass("disabled"),i.on("keypress",".stepper-input",j,e),i.on("touchstart.stepper mousedown.stepper",".stepper-arrow",j,f).data("stepper",j)}}function e(a){var b=a.data;(38===a.keyCode||40===a.keyCode)&&(a.preventDefault(),h(b,38===a.keyCode?b.step:-b.step))}function f(b){b.preventDefault(),b.stopPropagation(),g(b);var c=b.data;if(!c.$input.is(":disabled")&&!c.$stepper.hasClass("disabled")){var d=a(b.target).hasClass("up")?c.step:-c.step;c.timer=i(c.timer,125,function(){h(c,d,!1)}),h(c,d),a("body").on("touchend.stepper mouseup.stepper",c,g)}}function g(b){b.preventDefault(),b.stopPropagation();var c=b.data;j(c.timer),a("body").off(".stepper")}function h(a,b){var c=parseFloat(a.$input.val()),d=b;void 0===typeof c||isNaN(c)?d=a.min!==!1?a.min:0:a.min!==!1&&c<a.min?d=a.min:d+=c;var e=(d-a.min)%a.step;0!==e&&(d-=e),a.min!==!1&&d<a.min&&(d=a.min),a.max!==!1&&d>a.max&&(d-=a.step),d!==c&&(d=l(d,a.digits),a.$input.val(d).trigger("change"))}function i(a,b,c){return j(a),setInterval(c,b)}function j(a){a&&(clearInterval(a),a=null)}function k(a){var b=String(a);return b.indexOf(".")>-1?b.length-b.indexOf(".")-1:0}function l(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c}var m={customClass:"",labels:{up:"Up",down:"Down"}},n={defaults:function(b){return m=a.extend(m,b||{}),"object"==typeof this?a(this):!0},destroy:function(){return a(this).each(function(b){var c=a(this).data("stepper");c&&(c.$stepper.off(".stepper").find(".stepper-arrow").remove(),c.$input.unwrap().removeClass("stepper-input"))})},disable:function(){return a(this).each(function(b){var c=a(this).data("stepper");c&&(c.$input.attr("disabled","disabled"),c.$stepper.addClass("disabled"))})},enable:function(){return a(this).each(function(b){var c=a(this).data("stepper");c&&(c.$input.attr("disabled",null),c.$stepper.removeClass("disabled"))})}};a.fn.stepper=function(a){return n[a]?n[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof a&&a?this:c.apply(this,arguments)},a.stepper=function(a){"defaults"===a&&n.defaults.apply(this,Array.prototype.slice.call(arguments,1))}}(jQuery,this);
/**
 * @module       Abstract base class for collection plugins v1.0.1.
 * @author       Keith Wood
 * @see          http://keith-wood.name/countdown.html
 * @license      MIT License
 */
(function(){var j=false;window.JQClass=function(){};JQClass.classes={};JQClass.extend=function extender(f){var g=this.prototype;j=true;var h=new this();j=false;for(var i in f){h[i]=typeof f[i]=='function'&&typeof g[i]=='function'?(function(d,e){return function(){var b=this._super;this._super=function(a){return g[d].apply(this,a||[])};var c=e.apply(this,arguments);this._super=b;return c}})(i,f[i]):f[i]}function JQClass(){if(!j&&this._init){this._init.apply(this,arguments)}}JQClass.prototype=h;JQClass.prototype.constructor=JQClass;JQClass.extend=extender;return JQClass}})();(function($){JQClass.classes.JQPlugin=JQClass.extend({name:'plugin',defaultOptions:{},regionalOptions:{},_getters:[],_getMarker:function(){return'is-'+this.name},_init:function(){$.extend(this.defaultOptions,(this.regionalOptions&&this.regionalOptions[''])||{});var c=camelCase(this.name);$[c]=this;$.fn[c]=function(a){var b=Array.prototype.slice.call(arguments,1);if($[c]._isNotChained(a,b)){return $[c][a].apply($[c],[this[0]].concat(b))}return this.each(function(){if(typeof a==='string'){if(a[0]==='_'||!$[c][a]){throw'Unknown method: '+a;}$[c][a].apply($[c],[this].concat(b))}else{$[c]._attach(this,a)}})}},setDefaults:function(a){$.extend(this.defaultOptions,a||{})},_isNotChained:function(a,b){if(a==='option'&&(b.length===0||(b.length===1&&typeof b[0]==='string'))){return true}return $.inArray(a,this._getters)>-1},_attach:function(a,b){a=$(a);if(a.hasClass(this._getMarker())){return}a.addClass(this._getMarker());b=$.extend({},this.defaultOptions,this._getMetadata(a),b||{});var c=$.extend({name:this.name,elem:a,options:b},this._instSettings(a,b));a.data(this.name,c);this._postAttach(a,c);this.option(a,b)},_instSettings:function(a,b){return{}},_postAttach:function(a,b){},_getMetadata:function(d){try{var f=d.data(this.name.toLowerCase())||'';f=f.replace(/'/g,'"');f=f.replace(/([a-zA-Z0-9]+):/g,function(a,b,i){var c=f.substring(0,i).match(/"/g);return(!c||c.length%2===0?'"'+b+'":':b+':')});f=$.parseJSON('{'+f+'}');for(var g in f){var h=f[g];if(typeof h==='string'&&h.match(/^new Date\((.*)\)$/)){f[g]=eval(h)}}return f}catch(e){return{}}},_getInst:function(a){return $(a).data(this.name)||{}},option:function(a,b,c){a=$(a);var d=a.data(this.name);if(!b||(typeof b==='string'&&c==null)){var e=(d||{}).options;return(e&&b?e[b]:e)}if(!a.hasClass(this._getMarker())){return}var e=b||{};if(typeof b==='string'){e={};e[b]=c}this._optionsChanged(a,d,e);$.extend(d.options,e)},_optionsChanged:function(a,b,c){},destroy:function(a){a=$(a);if(!a.hasClass(this._getMarker())){return}this._preDestroy(a,this._getInst(a));a.removeData(this.name).removeClass(this._getMarker())},_preDestroy:function(a,b){}});function camelCase(c){return c.replace(/-([a-z])/g,function(a,b){return b.toUpperCase()})}$.JQPlugin={createPlugin:function(a,b){if(typeof a==='object'){b=a;a='JQPlugin'}a=camelCase(a);var c=camelCase(b.name);JQClass.classes[c]=JQClass.classes[a].extend(b);new JQClass.classes[c]()}}})(jQuery);
/**
 * @module       RD Range
 * @author       Roman Kholiavko
 * @see          http://cms.devoffice.com/coding-demo/marathoner/rd-range/documentation
 * @version      1.0
 */
(function(){!function(t,e,n){var o,i;return i="ontouchstart"in n,o=function(){function o(n,o){this.$element=t(n),this.options=t.extend(!0,{},this.Defaults,o),this.setClientOptions(this),this.createDOM(this),this.$pointer=t(n).find(".rd-range__pointer-1"),this.options.tooltip&&(this.$pointerTooltip=this.$pointer.find(".rd-range__pointer-tooltip"),this.$element.addClass("hasTooltip")),this.$line=t(n).find(".rd-range__line"),null!=t(n).attr("data-input")?this.$input=t(t(n).attr("data-input")):this.$input=t(this.Defaults.inputClassName),this.range&&(this.$pointer2=t(n).find(".rd-range__pointer-2"),null!=t(n).attr("data-input-2")?this.$input2=t(t(n).attr("data-input-2")):this.$input2=t(this.Defaults.inputClassName2),this.options.tooltip&&(this.$pointerTooltip2=this.$pointer2.find(".rd-range__pointer-tooltip"))),this.$doc=t(e),this.isMove=!1,this.initialization()}return o.prototype.Defaults={min:0,start:0,max:100,start2:0,step:1,minDiff:0,inputClassName:".rd-range-input-value",inputClassName2:".rd-range-input-value-2",tooltip:!1,callbacks:{onInit:!1,onChange:!1,onInputChange:!1,onMoveStart:!1,onMoveEnd:!1}},o.prototype.initialization=function(){var t;return t=this,t.setRange(t),t.applyHandlers(t),t.options.callbacks.onInit&&t.options.callbacks.onInit.call(this,t),t},o.prototype.createDOM=function(t){var e;e='<div class="rd-range__pointer rd-range__pointer-1">',t.options.tooltip&&(e+='<div class="rd-range__pointer-tooltip"></div>'),e+="</div>",t.range&&(e+='<div class="rd-range__pointer rd-range__pointer-2">',t.options.tooltip&&(e+='<div class="rd-range__pointer-tooltip"></div>'),e+="</div>"),t.$element.wrapInner('<div class="rd-range__wrap">'+e+'<div class="rd-range__line"></div> </div>')},o.prototype.setClientOptions=function(t){var e;e={min:t.$element.attr("data-min"),max:t.$element.attr("data-max"),step:t.$element.attr("data-step"),start:t.$element.data("start"),minDiff:t.$element.attr("data-min-diff"),precision:t.$element.attr("data-precision"),tooltip:t.$element.attr("data-tooltip")},t.options.start=[],(null!=e.start&&e.start.length>1||null!=t.options.start&&t.options.start.length>1)&&(t.range=!0),null!=e.min&&(t.options.min=Number(e.min)),null!=e.max&&(t.options.max=Number(e.max)),null!=e.start?t.options.start=e.start:t.options.start.push(t.options.min),t.currentValue=t.options.start[0],null!=e.step&&(t.options.step=Number(e.step)),null!=e.tooltip&&(t.options.tooltip=e.tooltip),null!=e.precision?t.options.precision=t.getNumDigitsAfterDecimalPlace(Number(e.precision)):t.options.precision=t.getNumDigitsAfterDecimalPlace(t.options.step),t.range&&(t.currentValue2=t.options.start[1],null!=e.minDiff?t.options.minDiff=Number(e.minDiff):null!=t.options.minDiff&&(t.options.minDiff=t.options.step))},o.prototype.setRange=function(t){return t.diff=t.options.max-t.options.min,t.delta=100*t.options.step/t.diff,t.currentPercentage=t.getPercentageByValue(t,t.currentValue),t.updatePointer1(t,t.currentPercentage,t.currentValue),t.range?(t.currentPercentage2=t.getPercentageByValue(t,t.currentValue2),t.updatePointer2(t,t.currentPercentage2,t.currentValue2)):void 0},o.prototype.applyHandlers=function(e){return e.$pointer.on(i?"touchstart":"mousedown",function(n){var o,r,a,u;if(!e.isMove)return e.isMove=!0,o=t(this),o.addClass("active"),a="touchmove"===n.type?n.originalEvent.targetTouches[0].pageX:n.pageX,r=e.getCoords(e.$element),u=e.getPercentage(e,a,r.left),e.options.callbacks.onMoveStart&&e.options.callbacks.onMoveStart.call(this,e),e.$doc.on(i?"touchmove":"mousemove",function(t){var n;return a="touchmove"===t.type?t.originalEvent.targetTouches[0].pageX:t.pageX,n=e.getPercentage(e,a,r.left),n!==u?(u=n,e.currentValue=e.getCurrentValue(e,u),e.range&&e.currentValue>=e.currentValue2-e.options.minDiff&&(n=e.checkPointer1Bounds(e)),e.updatePointer1(e,n,e.currentValue)):void 0}).on(i?"touchend":"mouseup",function(t){return setTimeout(function(){return e.isMove=!1},100),o.removeClass("active"),e.options.callbacks.onMoveEnd&&e.options.callbacks.onMoveEnd.call(this,e),i?e.$doc.off("touchmove"):e.$doc.off("mousemove"),e.$doc.off(t.type)}),!1}),"hidden"!==e.$input.attr("type")&&"readonly"!==e.$input.attr("readOnly")&&e.$input.on("keypress",function(t){return e.isAllowTyped(t.which)}).on("change",function(n){var o;return o=Math.abs(Number(t(this).val())),e.range&&(o>=e.currentValue2||o>e.currentValue2-e.options.minDiff)&&(e.checkPointer1Bounds(e),o=e.currentValue),o<e.options.min&&(o=e.options.min),e.currentValue=o,e.setRange(e),e.options.callbacks.onInputChange?e.options.callbacks.onInputChange.call(this,e):void 0}),e.range&&(e.$pointer2.on(i?"touchstart":"mousedown",function(n){var o,r,a,u;if(!e.isMove)return e.isMove=!0,o=t(this),o.addClass("active"),a="touchmove"===n.type?n.originalEvent.targetTouches[0].pageX:n.pageX,r=e.getCoords(e.$element),u=e.getPercentage(e,a,r.left),e.options.callbacks.onMoveStart&&e.options.callbacks.onMoveStart.call(this,e),e.$doc.on(i?"touchmove":"mousemove",function(t){var n;return a="touchmove"===t.type?t.originalEvent.targetTouches[0].pageX:t.pageX,n=e.getPercentage(e,a,r.left),n!==u?(u=n,e.currentValue2=e.getCurrentValue(e,n),e.range&&e.currentValue2<=e.currentValue+e.options.minDiff&&(n=e.checkPointer2Bounds(e)),e.updatePointer2(e,n,e.currentValue2)):void 0}).on(i?"touchend":"mouseup",function(t){return setTimeout(function(){return e.isMove=!1},100),o.removeClass("active"),e.options.callbacks.onMoveEnd&&e.options.callbacks.onMoveEnd.call(this,e),i?e.$doc.off("touchmove"):e.$doc.off("mousemove"),e.$doc.off(t.type)}),!1}),"hidden"!==e.$input2.attr("type")&&"readonly"!==e.$input2.attr("readOnly")&&e.$input2.on("keypress",function(t){return e.isAllowTyped(t.which)}).on("change",function(n){var o;return o=Math.abs(Number(t(this).val())),(o<=e.currentValue||o<e.currentValue+e.options.minDiff)&&(e.checkPointer2Bounds(e),o=e.currentValue2),o>e.options.max&&(o=e.options.max),e.currentValue2=o,e.setRange(e),e.options.callbacks.onInputChange?e.options.callbacks.onInputChange.call(this,e):void 0})),e.$element.on("click",function(t){var n,o,i,r,a,u;if(!e.isMove)return a="touch"===t.type?t.originalEvent.targetTouches[0].pageX:t.pageX,r=e.getCoords(e.$element),u=e.getPercentage(e,a,r.left),n=e.getCurrentValue(e,u),e.range&&(o=Math.abs(+(u-e.currentPercentage)),i=Math.abs(+(u-e.currentPercentage2)),o>i)?(n<=e.currentValue+e.options.minDiff&&(u=e.checkPointer2Bounds(e),n=e.getCurrentValue(e,u)),e.updatePointer2(e,u,n),!1):(n>=e.currentValue2-e.options.minDiff&&(u=e.checkPointer1Bounds(e),n=e.getCurrentValue(e,u)),e.updatePointer1(e,u,n),!1)})},o.prototype.updatePointer1=function(t,e,n){t.currentPercentage=e,t.currentValue=n,t.updatePositions(t,t.$pointer,t.currentPercentage),t.updateValue(t),t.options.tooltip&&t.$pointerTooltip.html(t.currentValue)},o.prototype.updatePointer2=function(t,e,n){t.currentPercentage2=e,t.currentValue2=n,t.updatePositions(t,t.$pointer2,t.currentPercentage2),t.updateValue(t),t.options.tooltip&&t.$pointerTooltip2.html(t.currentValue2)},o.prototype.updateValue=function(t){t.options.callbacks.onChange&&t.options.callbacks.onChange.call(this,t),t.range&&(t.$input2.is("input")?t.$input2.val(t.currentValue2):t.$input2.html(t.currentValue2)),t.$input.is("input")?t.$input.val(t.currentValue):t.$input.html(t.currentValue)},o.prototype.checkPointer1Bounds=function(t){return t.currentValue=t.currentValue2-t.options.minDiff,t.getPercentageByValue(t,t.currentValue)},o.prototype.checkPointer2Bounds=function(t){return t.currentValue2=t.currentValue+t.options.minDiff,t.getPercentageByValue(t,t.currentValue2)},o.prototype.getPercentageByValue=function(t,e){return Math.round(100*(e-t.options.min)/(t.options.max-t.options.min))},o.prototype.getPercentage=function(t,e,n){var o;return o=(e-n)/t.$element.width()*100,o=Math.round(o/t.delta)*t.delta,Math.max(0,Math.min(100,o))},o.prototype.getCurrentValue=function(t,e){return+(t.options.min+Math.round(t.diff*e/100/t.options.step)*t.options.step).toFixed(t.options.precision)},o.prototype.getOffsetByPercentage=function(t,e){return t.$element.width()*e/100},o.prototype.updatePositions=function(t,e,n){var o;e.css("left",n+"%"),t.range?(o=t.currentPercentage2-t.currentPercentage,t.$line.css("left",t.currentPercentage+"%"),t.$line.css("width",o+"%")):t.$line.css("width",n+"%")},o.prototype.getCoords=function(t){return{top:t.offset().top+pageYOffset,left:t.offset().left+pageXOffset}},o.prototype.isAllowTyped=function(t){return 9!==t&&8!==t&&0!==t&&13!==t&&46!==t&&(48>t||t>57)?!1:!0},o.prototype.getNumDigitsAfterDecimalPlace=function(t){var e,n;return n=""+t,e=n.indexOf("."),0>e?0:n.substr(e+1).length},t.fn.extend({RDRange:function(e){return this.each(function(){var n;return n=t(this),n.data("RDRange")?void 0:n.data("RDRange",new o(this,e))})}}),n.RDRange=o,o}()}(window.jQuery,document,window),"undefined"!=typeof module&&null!==module?module.exports=window.RDRange:"function"==typeof define&&define.amd&&define(["jquery"],function(){"use strict";return window.RDRange})}).call(this);
/**
 * @module       Moment JS
 * @authors      Tim Wood, Iskren Chernev, Moment.js contributors
 * @see          https://ua.linkedin.com/in/rafael-shayvolodyan-3a297b96
 * @version      2.12.0
 * @license      MIT license
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.moment=e()}(this,function(){"use strict";function t(){return Xn.apply(null,arguments)}function e(t){Xn=t}function n(t){return t instanceof Array||"[object Array]"===Object.prototype.toString.call(t)}function i(t){return t instanceof Date||"[object Date]"===Object.prototype.toString.call(t)}function s(t,e){var n,i=[];for(n=0;n<t.length;++n)i.push(e(t[n],n));return i}function r(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function a(t,e){for(var n in e)r(e,n)&&(t[n]=e[n]);return r(e,"toString")&&(t.toString=e.toString),r(e,"valueOf")&&(t.valueOf=e.valueOf),t}function o(t,e,n,i){return Ct(t,e,n,i,!0).utc()}function u(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function d(t){return null==t._pf&&(t._pf=u()),t._pf}function l(t){if(null==t._isValid){var e=d(t);t._isValid=!(isNaN(t._d.getTime())||!(e.overflow<0)||e.empty||e.invalidMonth||e.invalidWeekday||e.nullInput||e.invalidFormat||e.userInvalidated),t._strict&&(t._isValid=t._isValid&&0===e.charsLeftOver&&0===e.unusedTokens.length&&void 0===e.bigHour)}return t._isValid}function h(t){var e=o(NaN);return null!=t?a(d(e),t):d(e).userInvalidated=!0,e}function c(t){return void 0===t}function f(t,e){var n,i,s;if(c(e._isAMomentObject)||(t._isAMomentObject=e._isAMomentObject),c(e._i)||(t._i=e._i),c(e._f)||(t._f=e._f),c(e._l)||(t._l=e._l),c(e._strict)||(t._strict=e._strict),c(e._tzm)||(t._tzm=e._tzm),c(e._isUTC)||(t._isUTC=e._isUTC),c(e._offset)||(t._offset=e._offset),c(e._pf)||(t._pf=d(e)),c(e._locale)||(t._locale=e._locale),Kn.length>0)for(n in Kn)i=Kn[n],s=e[i],c(s)||(t[i]=s);return t}function m(e){f(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),ti===!1&&(ti=!0,t.updateOffset(this),ti=!1)}function _(t){return t instanceof m||null!=t&&null!=t._isAMomentObject}function y(t){return 0>t?Math.ceil(t):Math.floor(t)}function g(t){var e=+t,n=0;return 0!==e&&isFinite(e)&&(n=y(e)),n}function p(t,e,n){var i,s=Math.min(t.length,e.length),r=Math.abs(t.length-e.length),a=0;for(i=0;s>i;i++)(n&&t[i]!==e[i]||!n&&g(t[i])!==g(e[i]))&&a++;return a+r}function v(e){t.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function D(t,e){var n=!0;return a(function(){return n&&(v(t+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),n=!1),e.apply(this,arguments)},e)}function M(t,e){ei[t]||(v(e),ei[t]=!0)}function S(t){return t instanceof Function||"[object Function]"===Object.prototype.toString.call(t)}function Y(t){return"[object Object]"===Object.prototype.toString.call(t)}function w(t){var e,n;for(n in t)e=t[n],S(e)?this[n]=e:this["_"+n]=e;this._config=t,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function k(t,e){var n,i=a({},t);for(n in e)r(e,n)&&(Y(t[n])&&Y(e[n])?(i[n]={},a(i[n],t[n]),a(i[n],e[n])):null!=e[n]?i[n]=e[n]:delete i[n]);return i}function T(t){null!=t&&this.set(t)}function b(t){return t?t.toLowerCase().replace("_","-"):t}function O(t){for(var e,n,i,s,r=0;r<t.length;){for(s=b(t[r]).split("-"),e=s.length,n=b(t[r+1]),n=n?n.split("-"):null;e>0;){if(i=W(s.slice(0,e).join("-")))return i;if(n&&n.length>=e&&p(s,n,!0)>=e-1)break;e--}r++}return null}function W(t){var e=null;if(!ii[t]&&"undefined"!=typeof module&&module&&module.exports)try{e=ni._abbr,require("./locale/"+t),x(e)}catch(n){}return ii[t]}function x(t,e){var n;return t&&(n=c(e)?P(t):U(t,e),n&&(ni=n)),ni._abbr}function U(t,e){return null!==e?(e.abbr=t,null!=ii[t]?(M("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"),e=k(ii[t]._config,e)):null!=e.parentLocale&&(null!=ii[e.parentLocale]?e=k(ii[e.parentLocale]._config,e):M("parentLocaleUndefined","specified parentLocale is not defined yet")),ii[t]=new T(e),x(t),ii[t]):(delete ii[t],null)}function G(t,e){if(null!=e){var n;null!=ii[t]&&(e=k(ii[t]._config,e)),n=new T(e),n.parentLocale=ii[t],ii[t]=n,x(t)}else null!=ii[t]&&(null!=ii[t].parentLocale?ii[t]=ii[t].parentLocale:null!=ii[t]&&delete ii[t]);return ii[t]}function P(t){var e;if(t&&t._locale&&t._locale._abbr&&(t=t._locale._abbr),!t)return ni;if(!n(t)){if(e=W(t))return e;t=[t]}return O(t)}function C(){return Object.keys(ii)}function F(t,e){var n=t.toLowerCase();si[n]=si[n+"s"]=si[e]=t}function H(t){return"string"==typeof t?si[t]||si[t.toLowerCase()]:void 0}function L(t){var e,n,i={};for(n in t)r(t,n)&&(e=H(n),e&&(i[e]=t[n]));return i}function V(e,n){return function(i){return null!=i?(I(this,e,i),t.updateOffset(this,n),this):N(this,e)}}function N(t,e){return t.isValid()?t._d["get"+(t._isUTC?"UTC":"")+e]():NaN}function I(t,e,n){t.isValid()&&t._d["set"+(t._isUTC?"UTC":"")+e](n)}function A(t,e){var n;if("object"==typeof t)for(n in t)this.set(n,t[n]);else if(t=H(t),S(this[t]))return this[t](e);return this}function R(t,e,n){var i=""+Math.abs(t),s=e-i.length,r=t>=0;return(r?n?"+":"":"-")+Math.pow(10,Math.max(0,s)).toString().substr(1)+i}function E(t,e,n,i){var s=i;"string"==typeof i&&(s=function(){return this[i]()}),t&&(ui[t]=s),e&&(ui[e[0]]=function(){return R(s.apply(this,arguments),e[1],e[2])}),n&&(ui[n]=function(){return this.localeData().ordinal(s.apply(this,arguments),t)})}function j(t){return t.match(/\[[\s\S]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"")}function z(t){var e,n,i=t.match(ri);for(e=0,n=i.length;n>e;e++)ui[i[e]]?i[e]=ui[i[e]]:i[e]=j(i[e]);return function(s){var r="";for(e=0;n>e;e++)r+=i[e]instanceof Function?i[e].call(s,t):i[e];return r}}function Z(t,e){return t.isValid()?(e=$(e,t.localeData()),oi[e]=oi[e]||z(e),oi[e](t)):t.localeData().invalidDate()}function $(t,e){function n(t){return e.longDateFormat(t)||t}var i=5;for(ai.lastIndex=0;i>=0&&ai.test(t);)t=t.replace(ai,n),ai.lastIndex=0,i-=1;return t}function q(t,e,n){Ti[t]=S(e)?e:function(t,i){return t&&n?n:e}}function J(t,e){return r(Ti,t)?Ti[t](e._strict,e._locale):new RegExp(B(t))}function B(t){return Q(t.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(t,e,n,i,s){return e||n||i||s}))}function Q(t){return t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function X(t,e){var n,i=e;for("string"==typeof t&&(t=[t]),"number"==typeof e&&(i=function(t,n){n[e]=g(t)}),n=0;n<t.length;n++)bi[t[n]]=i}function K(t,e){X(t,function(t,n,i,s){i._w=i._w||{},e(t,i._w,i,s)})}function tt(t,e,n){null!=e&&r(bi,t)&&bi[t](e,n._a,n,t)}function et(t,e){return new Date(Date.UTC(t,e+1,0)).getUTCDate()}function nt(t,e){return n(this._months)?this._months[t.month()]:this._months[Li.test(e)?"format":"standalone"][t.month()]}function it(t,e){return n(this._monthsShort)?this._monthsShort[t.month()]:this._monthsShort[Li.test(e)?"format":"standalone"][t.month()]}function st(t,e,n){var i,s,r;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),i=0;12>i;i++){if(s=o([2e3,i]),n&&!this._longMonthsParse[i]&&(this._longMonthsParse[i]=new RegExp("^"+this.months(s,"").replace(".","")+"$","i"),this._shortMonthsParse[i]=new RegExp("^"+this.monthsShort(s,"").replace(".","")+"$","i")),n||this._monthsParse[i]||(r="^"+this.months(s,"")+"|^"+this.monthsShort(s,""),this._monthsParse[i]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===e&&this._longMonthsParse[i].test(t))return i;if(n&&"MMM"===e&&this._shortMonthsParse[i].test(t))return i;if(!n&&this._monthsParse[i].test(t))return i}}function rt(t,e){var n;if(!t.isValid())return t;if("string"==typeof e)if(/^\d+$/.test(e))e=g(e);else if(e=t.localeData().monthsParse(e),"number"!=typeof e)return t;return n=Math.min(t.date(),et(t.year(),e)),t._d["set"+(t._isUTC?"UTC":"")+"Month"](e,n),t}function at(e){return null!=e?(rt(this,e),t.updateOffset(this,!0),this):N(this,"Month")}function ot(){return et(this.year(),this.month())}function ut(t){return this._monthsParseExact?(r(this,"_monthsRegex")||lt.call(this),t?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&t?this._monthsShortStrictRegex:this._monthsShortRegex}function dt(t){return this._monthsParseExact?(r(this,"_monthsRegex")||lt.call(this),t?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&t?this._monthsStrictRegex:this._monthsRegex}function lt(){function t(t,e){return e.length-t.length}var e,n,i=[],s=[],r=[];for(e=0;12>e;e++)n=o([2e3,e]),i.push(this.monthsShort(n,"")),s.push(this.months(n,"")),r.push(this.months(n,"")),r.push(this.monthsShort(n,""));for(i.sort(t),s.sort(t),r.sort(t),e=0;12>e;e++)i[e]=Q(i[e]),s[e]=Q(s[e]),r[e]=Q(r[e]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+s.join("|")+")$","i"),this._monthsShortStrictRegex=new RegExp("^("+i.join("|")+")$","i")}function ht(t){var e,n=t._a;return n&&-2===d(t).overflow&&(e=n[Wi]<0||n[Wi]>11?Wi:n[xi]<1||n[xi]>et(n[Oi],n[Wi])?xi:n[Ui]<0||n[Ui]>24||24===n[Ui]&&(0!==n[Gi]||0!==n[Pi]||0!==n[Ci])?Ui:n[Gi]<0||n[Gi]>59?Gi:n[Pi]<0||n[Pi]>59?Pi:n[Ci]<0||n[Ci]>999?Ci:-1,d(t)._overflowDayOfYear&&(Oi>e||e>xi)&&(e=xi),d(t)._overflowWeeks&&-1===e&&(e=Fi),d(t)._overflowWeekday&&-1===e&&(e=Hi),d(t).overflow=e),t}function ct(t){var e,n,i,s,r,a,o=t._i,u=Ri.exec(o)||Ei.exec(o);if(u){for(d(t).iso=!0,e=0,n=zi.length;n>e;e++)if(zi[e][1].exec(u[1])){s=zi[e][0],i=zi[e][2]!==!1;break}if(null==s)return void(t._isValid=!1);if(u[3]){for(e=0,n=Zi.length;n>e;e++)if(Zi[e][1].exec(u[3])){r=(u[2]||" ")+Zi[e][0];break}if(null==r)return void(t._isValid=!1)}if(!i&&null!=r)return void(t._isValid=!1);if(u[4]){if(!ji.exec(u[4]))return void(t._isValid=!1);a="Z"}t._f=s+(r||"")+(a||""),bt(t)}else t._isValid=!1}function ft(e){var n=$i.exec(e._i);return null!==n?void(e._d=new Date(+n[1])):(ct(e),void(e._isValid===!1&&(delete e._isValid,t.createFromInputFallback(e))))}function mt(t,e,n,i,s,r,a){var o=new Date(t,e,n,i,s,r,a);return 100>t&&t>=0&&isFinite(o.getFullYear())&&o.setFullYear(t),o}function _t(t){var e=new Date(Date.UTC.apply(null,arguments));return 100>t&&t>=0&&isFinite(e.getUTCFullYear())&&e.setUTCFullYear(t),e}function yt(t){return gt(t)?366:365}function gt(t){return t%4===0&&t%100!==0||t%400===0}function pt(){return gt(this.year())}function vt(t,e,n){var i=7+e-n,s=(7+_t(t,0,i).getUTCDay()-e)%7;return-s+i-1}function Dt(t,e,n,i,s){var r,a,o=(7+n-i)%7,u=vt(t,i,s),d=1+7*(e-1)+o+u;return 0>=d?(r=t-1,a=yt(r)+d):d>yt(t)?(r=t+1,a=d-yt(t)):(r=t,a=d),{year:r,dayOfYear:a}}function Mt(t,e,n){var i,s,r=vt(t.year(),e,n),a=Math.floor((t.dayOfYear()-r-1)/7)+1;return 1>a?(s=t.year()-1,i=a+St(s,e,n)):a>St(t.year(),e,n)?(i=a-St(t.year(),e,n),s=t.year()+1):(s=t.year(),i=a),{week:i,year:s}}function St(t,e,n){var i=vt(t,e,n),s=vt(t+1,e,n);return(yt(t)-i+s)/7}function Yt(t,e,n){return null!=t?t:null!=e?e:n}function wt(e){var n=new Date(t.now());return e._useUTC?[n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()]:[n.getFullYear(),n.getMonth(),n.getDate()]}function kt(t){var e,n,i,s,r=[];if(!t._d){for(i=wt(t),t._w&&null==t._a[xi]&&null==t._a[Wi]&&Tt(t),t._dayOfYear&&(s=Yt(t._a[Oi],i[Oi]),t._dayOfYear>yt(s)&&(d(t)._overflowDayOfYear=!0),n=_t(s,0,t._dayOfYear),t._a[Wi]=n.getUTCMonth(),t._a[xi]=n.getUTCDate()),e=0;3>e&&null==t._a[e];++e)t._a[e]=r[e]=i[e];for(;7>e;e++)t._a[e]=r[e]=null==t._a[e]?2===e?1:0:t._a[e];24===t._a[Ui]&&0===t._a[Gi]&&0===t._a[Pi]&&0===t._a[Ci]&&(t._nextDay=!0,t._a[Ui]=0),t._d=(t._useUTC?_t:mt).apply(null,r),null!=t._tzm&&t._d.setUTCMinutes(t._d.getUTCMinutes()-t._tzm),t._nextDay&&(t._a[Ui]=24)}}function Tt(t){var e,n,i,s,r,a,o,u;e=t._w,null!=e.GG||null!=e.W||null!=e.E?(r=1,a=4,n=Yt(e.GG,t._a[Oi],Mt(Ft(),1,4).year),i=Yt(e.W,1),s=Yt(e.E,1),(1>s||s>7)&&(u=!0)):(r=t._locale._week.dow,a=t._locale._week.doy,n=Yt(e.gg,t._a[Oi],Mt(Ft(),r,a).year),i=Yt(e.w,1),null!=e.d?(s=e.d,(0>s||s>6)&&(u=!0)):null!=e.e?(s=e.e+r,(e.e<0||e.e>6)&&(u=!0)):s=r),1>i||i>St(n,r,a)?d(t)._overflowWeeks=!0:null!=u?d(t)._overflowWeekday=!0:(o=Dt(n,i,s,r,a),t._a[Oi]=o.year,t._dayOfYear=o.dayOfYear)}function bt(e){if(e._f===t.ISO_8601)return void ct(e);e._a=[],d(e).empty=!0;var n,i,s,r,a,o=""+e._i,u=o.length,l=0;for(s=$(e._f,e._locale).match(ri)||[],n=0;n<s.length;n++)r=s[n],i=(o.match(J(r,e))||[])[0],i&&(a=o.substr(0,o.indexOf(i)),a.length>0&&d(e).unusedInput.push(a),o=o.slice(o.indexOf(i)+i.length),l+=i.length),ui[r]?(i?d(e).empty=!1:d(e).unusedTokens.push(r),tt(r,i,e)):e._strict&&!i&&d(e).unusedTokens.push(r);d(e).charsLeftOver=u-l,o.length>0&&d(e).unusedInput.push(o),d(e).bigHour===!0&&e._a[Ui]<=12&&e._a[Ui]>0&&(d(e).bigHour=void 0),e._a[Ui]=Ot(e._locale,e._a[Ui],e._meridiem),kt(e),ht(e)}function Ot(t,e,n){var i;return null==n?e:null!=t.meridiemHour?t.meridiemHour(e,n):null!=t.isPM?(i=t.isPM(n),i&&12>e&&(e+=12),i||12!==e||(e=0),e):e}function Wt(t){var e,n,i,s,r;if(0===t._f.length)return d(t).invalidFormat=!0,void(t._d=new Date(NaN));for(s=0;s<t._f.length;s++)r=0,e=f({},t),null!=t._useUTC&&(e._useUTC=t._useUTC),e._f=t._f[s],bt(e),l(e)&&(r+=d(e).charsLeftOver,r+=10*d(e).unusedTokens.length,d(e).score=r,(null==i||i>r)&&(i=r,n=e));a(t,n||e)}function xt(t){if(!t._d){var e=L(t._i);t._a=s([e.year,e.month,e.day||e.date,e.hour,e.minute,e.second,e.millisecond],function(t){return t&&parseInt(t,10)}),kt(t)}}function Ut(t){var e=new m(ht(Gt(t)));return e._nextDay&&(e.add(1,"d"),e._nextDay=void 0),e}function Gt(t){var e=t._i,s=t._f;return t._locale=t._locale||P(t._l),null===e||void 0===s&&""===e?h({nullInput:!0}):("string"==typeof e&&(t._i=e=t._locale.preparse(e)),_(e)?new m(ht(e)):(n(s)?Wt(t):s?bt(t):i(e)?t._d=e:Pt(t),l(t)||(t._d=null),t))}function Pt(e){var r=e._i;void 0===r?e._d=new Date(t.now()):i(r)?e._d=new Date(+r):"string"==typeof r?ft(e):n(r)?(e._a=s(r.slice(0),function(t){return parseInt(t,10)}),kt(e)):"object"==typeof r?xt(e):"number"==typeof r?e._d=new Date(r):t.createFromInputFallback(e)}function Ct(t,e,n,i,s){var r={};return"boolean"==typeof n&&(i=n,n=void 0),r._isAMomentObject=!0,r._useUTC=r._isUTC=s,r._l=n,r._i=t,r._f=e,r._strict=i,Ut(r)}function Ft(t,e,n,i){return Ct(t,e,n,i,!1)}function Ht(t,e){var i,s;if(1===e.length&&n(e[0])&&(e=e[0]),!e.length)return Ft();for(i=e[0],s=1;s<e.length;++s)(!e[s].isValid()||e[s][t](i))&&(i=e[s]);return i}function Lt(){var t=[].slice.call(arguments,0);return Ht("isBefore",t)}function Vt(){var t=[].slice.call(arguments,0);return Ht("isAfter",t)}function Nt(t){var e=L(t),n=e.year||0,i=e.quarter||0,s=e.month||0,r=e.week||0,a=e.day||0,o=e.hour||0,u=e.minute||0,d=e.second||0,l=e.millisecond||0;this._milliseconds=+l+1e3*d+6e4*u+36e5*o,this._days=+a+7*r,this._months=+s+3*i+12*n,this._data={},this._locale=P(),this._bubble()}function It(t){return t instanceof Nt}function At(t,e){E(t,0,0,function(){var t=this.utcOffset(),n="+";return 0>t&&(t=-t,n="-"),n+R(~~(t/60),2)+e+R(~~t%60,2)})}function Rt(t,e){var n=(e||"").match(t)||[],i=n[n.length-1]||[],s=(i+"").match(Xi)||["-",0,0],r=+(60*s[1])+g(s[2]);return"+"===s[0]?r:-r}function Et(e,n){var s,r;return n._isUTC?(s=n.clone(),r=(_(e)||i(e)?+e:+Ft(e))-+s,s._d.setTime(+s._d+r),t.updateOffset(s,!1),s):Ft(e).local()}function jt(t){return 15*-Math.round(t._d.getTimezoneOffset()/15)}function zt(e,n){var i,s=this._offset||0;return this.isValid()?null!=e?("string"==typeof e?e=Rt(Yi,e):Math.abs(e)<16&&(e=60*e),!this._isUTC&&n&&(i=jt(this)),this._offset=e,this._isUTC=!0,null!=i&&this.add(i,"m"),s!==e&&(!n||this._changeInProgress?ue(this,ne(e-s,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,t.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?s:jt(this):null!=e?this:NaN}function Zt(t,e){return null!=t?("string"!=typeof t&&(t=-t),this.utcOffset(t,e),this):-this.utcOffset()}function $t(t){return this.utcOffset(0,t)}function qt(t){return this._isUTC&&(this.utcOffset(0,t),this._isUTC=!1,t&&this.subtract(jt(this),"m")),this}function Jt(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Rt(Si,this._i)),this}function Bt(t){return this.isValid()?(t=t?Ft(t).utcOffset():0,(this.utcOffset()-t)%60===0):!1}function Qt(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Xt(){if(!c(this._isDSTShifted))return this._isDSTShifted;var t={};if(f(t,this),t=Gt(t),t._a){var e=t._isUTC?o(t._a):Ft(t._a);this._isDSTShifted=this.isValid()&&p(t._a,e.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Kt(){return this.isValid()?!this._isUTC:!1}function te(){return this.isValid()?this._isUTC:!1}function ee(){return this.isValid()?this._isUTC&&0===this._offset:!1}function ne(t,e){var n,i,s,a=t,o=null;return It(t)?a={ms:t._milliseconds,d:t._days,M:t._months}:"number"==typeof t?(a={},e?a[e]=t:a.milliseconds=t):(o=Ki.exec(t))?(n="-"===o[1]?-1:1,a={y:0,d:g(o[xi])*n,h:g(o[Ui])*n,m:g(o[Gi])*n,s:g(o[Pi])*n,ms:g(o[Ci])*n}):(o=ts.exec(t))?(n="-"===o[1]?-1:1,a={y:ie(o[2],n),M:ie(o[3],n),w:ie(o[4],n),d:ie(o[5],n),h:ie(o[6],n),m:ie(o[7],n),s:ie(o[8],n)}):null==a?a={}:"object"==typeof a&&("from"in a||"to"in a)&&(s=re(Ft(a.from),Ft(a.to)),a={},a.ms=s.milliseconds,a.M=s.months),i=new Nt(a),It(t)&&r(t,"_locale")&&(i._locale=t._locale),i}function ie(t,e){var n=t&&parseFloat(t.replace(",","."));return(isNaN(n)?0:n)*e}function se(t,e){var n={milliseconds:0,months:0};return n.months=e.month()-t.month()+12*(e.year()-t.year()),t.clone().add(n.months,"M").isAfter(e)&&--n.months,n.milliseconds=+e-+t.clone().add(n.months,"M"),n}function re(t,e){var n;return t.isValid()&&e.isValid()?(e=Et(e,t),t.isBefore(e)?n=se(t,e):(n=se(e,t),n.milliseconds=-n.milliseconds,n.months=-n.months),n):{milliseconds:0,months:0}}function ae(t){return 0>t?-1*Math.round(-1*t):Math.round(t)}function oe(t,e){return function(n,i){var s,r;return null===i||isNaN(+i)||(M(e,"moment()."+e+"(period, number) is deprecated. Please use moment()."+e+"(number, period)."),r=n,n=i,i=r),n="string"==typeof n?+n:n,s=ne(n,i),ue(this,s,t),this}}function ue(e,n,i,s){var r=n._milliseconds,a=ae(n._days),o=ae(n._months);e.isValid()&&(s=null==s?!0:s,r&&e._d.setTime(+e._d+r*i),a&&I(e,"Date",N(e,"Date")+a*i),o&&rt(e,N(e,"Month")+o*i),s&&t.updateOffset(e,a||o))}function de(t,e){var n=t||Ft(),i=Et(n,this).startOf("day"),s=this.diff(i,"days",!0),r=-6>s?"sameElse":-1>s?"lastWeek":0>s?"lastDay":1>s?"sameDay":2>s?"nextDay":7>s?"nextWeek":"sameElse",a=e&&(S(e[r])?e[r]():e[r]);return this.format(a||this.localeData().calendar(r,this,Ft(n)))}function le(){return new m(this)}function he(t,e){var n=_(t)?t:Ft(t);return this.isValid()&&n.isValid()?(e=H(c(e)?"millisecond":e),"millisecond"===e?+this>+n:+n<+this.clone().startOf(e)):!1}function ce(t,e){var n=_(t)?t:Ft(t);return this.isValid()&&n.isValid()?(e=H(c(e)?"millisecond":e),"millisecond"===e?+n>+this:+this.clone().endOf(e)<+n):!1}function fe(t,e,n){return this.isAfter(t,n)&&this.isBefore(e,n)}function me(t,e){var n,i=_(t)?t:Ft(t);return this.isValid()&&i.isValid()?(e=H(e||"millisecond"),"millisecond"===e?+this===+i:(n=+i,+this.clone().startOf(e)<=n&&n<=+this.clone().endOf(e))):!1}function _e(t,e){return this.isSame(t,e)||this.isAfter(t,e)}function ye(t,e){return this.isSame(t,e)||this.isBefore(t,e)}function ge(t,e,n){var i,s,r,a;return this.isValid()?(i=Et(t,this),i.isValid()?(s=6e4*(i.utcOffset()-this.utcOffset()),e=H(e),"year"===e||"month"===e||"quarter"===e?(a=pe(this,i),"quarter"===e?a/=3:"year"===e&&(a/=12)):(r=this-i,a="second"===e?r/1e3:"minute"===e?r/6e4:"hour"===e?r/36e5:"day"===e?(r-s)/864e5:"week"===e?(r-s)/6048e5:r),n?a:y(a)):NaN):NaN}function pe(t,e){var n,i,s=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(s,"months");return 0>e-r?(n=t.clone().add(s-1,"months"),i=(e-r)/(r-n)):(n=t.clone().add(s+1,"months"),i=(e-r)/(n-r)),-(s+i)}function ve(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function De(){var t=this.clone().utc();return 0<t.year()&&t.year()<=9999?S(Date.prototype.toISOString)?this.toDate().toISOString():Z(t,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):Z(t,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function Me(e){var n=Z(this,e||t.defaultFormat);return this.localeData().postformat(n)}function Se(t,e){return this.isValid()&&(_(t)&&t.isValid()||Ft(t).isValid())?ne({to:this,from:t}).locale(this.locale()).humanize(!e):this.localeData().invalidDate()}function Ye(t){return this.from(Ft(),t)}function we(t,e){return this.isValid()&&(_(t)&&t.isValid()||Ft(t).isValid())?ne({from:this,to:t}).locale(this.locale()).humanize(!e):this.localeData().invalidDate()}function ke(t){return this.to(Ft(),t)}function Te(t){var e;return void 0===t?this._locale._abbr:(e=P(t),null!=e&&(this._locale=e),this)}function be(){return this._locale}function Oe(t){switch(t=H(t)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===t&&this.weekday(0),"isoWeek"===t&&this.isoWeekday(1),"quarter"===t&&this.month(3*Math.floor(this.month()/3)),this}function We(t){return t=H(t),void 0===t||"millisecond"===t?this:this.startOf(t).add(1,"isoWeek"===t?"week":t).subtract(1,"ms")}function xe(){return+this._d-6e4*(this._offset||0)}function Ue(){return Math.floor(+this/1e3)}function Ge(){return this._offset?new Date(+this):this._d}function Pe(){var t=this;return[t.year(),t.month(),t.date(),t.hour(),t.minute(),t.second(),t.millisecond()]}function Ce(){var t=this;return{years:t.year(),months:t.month(),date:t.date(),hours:t.hours(),minutes:t.minutes(),seconds:t.seconds(),milliseconds:t.milliseconds()}}function Fe(){return this.isValid()?this.toISOString():null}function He(){return l(this)}function Le(){return a({},d(this))}function Ve(){return d(this).overflow}function Ne(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Ie(t,e){E(0,[t,t.length],0,e)}function Ae(t){return ze.call(this,t,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Re(t){return ze.call(this,t,this.isoWeek(),this.isoWeekday(),1,4)}function Ee(){return St(this.year(),1,4)}function je(){var t=this.localeData()._week;return St(this.year(),t.dow,t.doy)}function ze(t,e,n,i,s){var r;return null==t?Mt(this,i,s).year:(r=St(t,i,s),e>r&&(e=r),Ze.call(this,t,e,n,i,s))}function Ze(t,e,n,i,s){var r=Dt(t,e,n,i,s),a=_t(r.year,0,r.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}function $e(t){return null==t?Math.ceil((this.month()+1)/3):this.month(3*(t-1)+this.month()%3)}function qe(t){return Mt(t,this._week.dow,this._week.doy).week}function Je(){return this._week.dow}function Be(){return this._week.doy}function Qe(t){var e=this.localeData().week(this);return null==t?e:this.add(7*(t-e),"d")}function Xe(t){var e=Mt(this,1,4).week;return null==t?e:this.add(7*(t-e),"d")}function Ke(t,e){return"string"!=typeof t?t:isNaN(t)?(t=e.weekdaysParse(t),"number"==typeof t?t:null):parseInt(t,10)}function tn(t,e){return n(this._weekdays)?this._weekdays[t.day()]:this._weekdays[this._weekdays.isFormat.test(e)?"format":"standalone"][t.day()]}function en(t){return this._weekdaysShort[t.day()]}function nn(t){return this._weekdaysMin[t.day()]}function sn(t,e,n){var i,s,r;for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),i=0;7>i;i++){if(s=Ft([2e3,1]).day(i),n&&!this._fullWeekdaysParse[i]&&(this._fullWeekdaysParse[i]=new RegExp("^"+this.weekdays(s,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[i]=new RegExp("^"+this.weekdaysShort(s,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[i]=new RegExp("^"+this.weekdaysMin(s,"").replace(".",".?")+"$","i")),this._weekdaysParse[i]||(r="^"+this.weekdays(s,"")+"|^"+this.weekdaysShort(s,"")+"|^"+this.weekdaysMin(s,""),this._weekdaysParse[i]=new RegExp(r.replace(".",""),"i")),n&&"dddd"===e&&this._fullWeekdaysParse[i].test(t))return i;if(n&&"ddd"===e&&this._shortWeekdaysParse[i].test(t))return i;if(n&&"dd"===e&&this._minWeekdaysParse[i].test(t))return i;if(!n&&this._weekdaysParse[i].test(t))return i}}function rn(t){if(!this.isValid())return null!=t?this:NaN;var e=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=t?(t=Ke(t,this.localeData()),this.add(t-e,"d")):e}function an(t){if(!this.isValid())return null!=t?this:NaN;var e=(this.day()+7-this.localeData()._week.dow)%7;return null==t?e:this.add(t-e,"d")}function on(t){return this.isValid()?null==t?this.day()||7:this.day(this.day()%7?t:t-7):null!=t?this:NaN}function un(t){var e=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==t?e:this.add(t-e,"d")}function dn(){return this.hours()%12||12}function ln(t,e){E(t,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),e)})}function hn(t,e){return e._meridiemParse}function cn(t){return"p"===(t+"").toLowerCase().charAt(0)}function fn(t,e,n){return t>11?n?"pm":"PM":n?"am":"AM"}function mn(t,e){e[Ci]=g(1e3*("0."+t))}function _n(){return this._isUTC?"UTC":""}function yn(){return this._isUTC?"Coordinated Universal Time":""}function gn(t){return Ft(1e3*t)}function pn(){return Ft.apply(null,arguments).parseZone()}function vn(t,e,n){var i=this._calendar[t];return S(i)?i.call(e,n):i}function Dn(t){var e=this._longDateFormat[t],n=this._longDateFormat[t.toUpperCase()];return e||!n?e:(this._longDateFormat[t]=n.replace(/MMMM|MM|DD|dddd/g,function(t){return t.slice(1)}),this._longDateFormat[t])}function Mn(){return this._invalidDate}function Sn(t){return this._ordinal.replace("%d",t)}function Yn(t){return t}function wn(t,e,n,i){var s=this._relativeTime[n];return S(s)?s(t,e,n,i):s.replace(/%d/i,t)}function kn(t,e){var n=this._relativeTime[t>0?"future":"past"];return S(n)?n(e):n.replace(/%s/i,e)}function Tn(t,e,n,i){var s=P(),r=o().set(i,e);return s[n](r,t)}function bn(t,e,n,i,s){if("number"==typeof t&&(e=t,t=void 0),t=t||"",null!=e)return Tn(t,e,n,s);var r,a=[];for(r=0;i>r;r++)a[r]=Tn(t,r,n,s);return a}function On(t,e){return bn(t,e,"months",12,"month")}function Wn(t,e){return bn(t,e,"monthsShort",12,"month")}function xn(t,e){return bn(t,e,"weekdays",7,"day")}function Un(t,e){return bn(t,e,"weekdaysShort",7,"day")}function Gn(t,e){return bn(t,e,"weekdaysMin",7,"day")}function Pn(){var t=this._data;return this._milliseconds=ws(this._milliseconds),this._days=ws(this._days),this._months=ws(this._months),t.milliseconds=ws(t.milliseconds),t.seconds=ws(t.seconds),t.minutes=ws(t.minutes),t.hours=ws(t.hours),t.months=ws(t.months),t.years=ws(t.years),this}function Cn(t,e,n,i){var s=ne(e,n);return t._milliseconds+=i*s._milliseconds,t._days+=i*s._days,t._months+=i*s._months,t._bubble()}function Fn(t,e){return Cn(this,t,e,1)}function Hn(t,e){return Cn(this,t,e,-1)}function Ln(t){return 0>t?Math.floor(t):Math.ceil(t)}function Vn(){var t,e,n,i,s,r=this._milliseconds,a=this._days,o=this._months,u=this._data;return r>=0&&a>=0&&o>=0||0>=r&&0>=a&&0>=o||(r+=864e5*Ln(In(o)+a),a=0,o=0),u.milliseconds=r%1e3,t=y(r/1e3),u.seconds=t%60,e=y(t/60),u.minutes=e%60,n=y(e/60),u.hours=n%24,a+=y(n/24),s=y(Nn(a)),o+=s,a-=Ln(In(s)),i=y(o/12),o%=12,u.days=a,u.months=o,u.years=i,this}function Nn(t){return 4800*t/146097}function In(t){return 146097*t/4800}function An(t){var e,n,i=this._milliseconds;if(t=H(t),"month"===t||"year"===t)return e=this._days+i/864e5,n=this._months+Nn(e),"month"===t?n:n/12;switch(e=this._days+Math.round(In(this._months)),t){case"week":return e/7+i/6048e5;case"day":return e+i/864e5;case"hour":return 24*e+i/36e5;case"minute":return 1440*e+i/6e4;case"second":return 86400*e+i/1e3;case"millisecond":return Math.floor(864e5*e)+i;default:throw new Error("Unknown unit "+t)}}function Rn(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*g(this._months/12)}function En(t){return function(){return this.as(t)}}function jn(t){return t=H(t),this[t+"s"]()}function zn(t){return function(){return this._data[t]}}function Zn(){return y(this.days()/7)}function $n(t,e,n,i,s){return s.relativeTime(e||1,!!n,t,i)}function qn(t,e,n){var i=ne(t).abs(),s=Is(i.as("s")),r=Is(i.as("m")),a=Is(i.as("h")),o=Is(i.as("d")),u=Is(i.as("M")),d=Is(i.as("y")),l=s<As.s&&["s",s]||1>=r&&["m"]||r<As.m&&["mm",r]||1>=a&&["h"]||a<As.h&&["hh",a]||1>=o&&["d"]||o<As.d&&["dd",o]||1>=u&&["M"]||u<As.M&&["MM",u]||1>=d&&["y"]||["yy",d];return l[2]=e,l[3]=+t>0,l[4]=n,$n.apply(null,l)}function Jn(t,e){return void 0===As[t]?!1:void 0===e?As[t]:(As[t]=e,!0)}function Bn(t){var e=this.localeData(),n=qn(this,!t,e);return t&&(n=e.pastFuture(+this,n)),e.postformat(n)}function Qn(){var t,e,n,i=Rs(this._milliseconds)/1e3,s=Rs(this._days),r=Rs(this._months);t=y(i/60),e=y(t/60),i%=60,t%=60,n=y(r/12),r%=12;var a=n,o=r,u=s,d=e,l=t,h=i,c=this.asSeconds();return c?(0>c?"-":"")+"P"+(a?a+"Y":"")+(o?o+"M":"")+(u?u+"D":"")+(d||l||h?"T":"")+(d?d+"H":"")+(l?l+"M":"")+(h?h+"S":""):"P0D"}var Xn,Kn=t.momentProperties=[],ti=!1,ei={};t.suppressDeprecationWarnings=!1;var ni,ii={},si={},ri=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,ai=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,oi={},ui={},di=/\d/,li=/\d\d/,hi=/\d{3}/,ci=/\d{4}/,fi=/[+-]?\d{6}/,mi=/\d\d?/,_i=/\d\d\d\d?/,yi=/\d\d\d\d\d\d?/,gi=/\d{1,3}/,pi=/\d{1,4}/,vi=/[+-]?\d{1,6}/,Di=/\d+/,Mi=/[+-]?\d+/,Si=/Z|[+-]\d\d:?\d\d/gi,Yi=/Z|[+-]\d\d(?::?\d\d)?/gi,wi=/[+-]?\d+(\.\d{1,3})?/,ki=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Ti={},bi={},Oi=0,Wi=1,xi=2,Ui=3,Gi=4,Pi=5,Ci=6,Fi=7,Hi=8;E("M",["MM",2],"Mo",function(){return this.month()+1}),E("MMM",0,0,function(t){return this.localeData().monthsShort(this,t)}),E("MMMM",0,0,function(t){return this.localeData().months(this,t)}),F("month","M"),q("M",mi),q("MM",mi,li),q("MMM",function(t,e){return e.monthsShortRegex(t)}),q("MMMM",function(t,e){return e.monthsRegex(t)}),X(["M","MM"],function(t,e){e[Wi]=g(t)-1}),X(["MMM","MMMM"],function(t,e,n,i){var s=n._locale.monthsParse(t,i,n._strict);null!=s?e[Wi]=s:d(n).invalidMonth=t});var Li=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Vi="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Ni="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Ii=ki,Ai=ki,Ri=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Ei=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,ji=/Z|[+-]\d\d(?::?\d\d)?/,zi=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Zi=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],$i=/^\/?Date\((\-?\d+)/i;t.createFromInputFallback=D("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(t){t._d=new Date(t._i+(t._useUTC?" UTC":""))}),E("Y",0,0,function(){var t=this.year();return 9999>=t?""+t:"+"+t}),E(0,["YY",2],0,function(){return this.year()%100}),E(0,["YYYY",4],0,"year"),E(0,["YYYYY",5],0,"year"),E(0,["YYYYYY",6,!0],0,"year"),F("year","y"),q("Y",Mi),q("YY",mi,li),q("YYYY",pi,ci),q("YYYYY",vi,fi),q("YYYYYY",vi,fi),X(["YYYYY","YYYYYY"],Oi),X("YYYY",function(e,n){n[Oi]=2===e.length?t.parseTwoDigitYear(e):g(e);}),X("YY",function(e,n){n[Oi]=t.parseTwoDigitYear(e)}),X("Y",function(t,e){e[Oi]=parseInt(t,10)}),t.parseTwoDigitYear=function(t){return g(t)+(g(t)>68?1900:2e3)};var qi=V("FullYear",!1);t.ISO_8601=function(){};var Ji=D("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var t=Ft.apply(null,arguments);return this.isValid()&&t.isValid()?this>t?this:t:h()}),Bi=D("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var t=Ft.apply(null,arguments);return this.isValid()&&t.isValid()?t>this?this:t:h()}),Qi=function(){return Date.now?Date.now():+new Date};At("Z",":"),At("ZZ",""),q("Z",Yi),q("ZZ",Yi),X(["Z","ZZ"],function(t,e,n){n._useUTC=!0,n._tzm=Rt(Yi,t)});var Xi=/([\+\-]|\d\d)/gi;t.updateOffset=function(){};var Ki=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,ts=/^(-)?P(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)W)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?$/;ne.fn=Nt.prototype;var es=oe(1,"add"),ns=oe(-1,"subtract");t.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var is=D("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(t){return void 0===t?this.localeData():this.locale(t)});E(0,["gg",2],0,function(){return this.weekYear()%100}),E(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ie("gggg","weekYear"),Ie("ggggg","weekYear"),Ie("GGGG","isoWeekYear"),Ie("GGGGG","isoWeekYear"),F("weekYear","gg"),F("isoWeekYear","GG"),q("G",Mi),q("g",Mi),q("GG",mi,li),q("gg",mi,li),q("GGGG",pi,ci),q("gggg",pi,ci),q("GGGGG",vi,fi),q("ggggg",vi,fi),K(["gggg","ggggg","GGGG","GGGGG"],function(t,e,n,i){e[i.substr(0,2)]=g(t)}),K(["gg","GG"],function(e,n,i,s){n[s]=t.parseTwoDigitYear(e)}),E("Q",0,"Qo","quarter"),F("quarter","Q"),q("Q",di),X("Q",function(t,e){e[Wi]=3*(g(t)-1)}),E("w",["ww",2],"wo","week"),E("W",["WW",2],"Wo","isoWeek"),F("week","w"),F("isoWeek","W"),q("w",mi),q("ww",mi,li),q("W",mi),q("WW",mi,li),K(["w","ww","W","WW"],function(t,e,n,i){e[i.substr(0,1)]=g(t)});var ss={dow:0,doy:6};E("D",["DD",2],"Do","date"),F("date","D"),q("D",mi),q("DD",mi,li),q("Do",function(t,e){return t?e._ordinalParse:e._ordinalParseLenient}),X(["D","DD"],xi),X("Do",function(t,e){e[xi]=g(t.match(mi)[0],10)});var rs=V("Date",!0);E("d",0,"do","day"),E("dd",0,0,function(t){return this.localeData().weekdaysMin(this,t)}),E("ddd",0,0,function(t){return this.localeData().weekdaysShort(this,t)}),E("dddd",0,0,function(t){return this.localeData().weekdays(this,t)}),E("e",0,0,"weekday"),E("E",0,0,"isoWeekday"),F("day","d"),F("weekday","e"),F("isoWeekday","E"),q("d",mi),q("e",mi),q("E",mi),q("dd",ki),q("ddd",ki),q("dddd",ki),K(["dd","ddd","dddd"],function(t,e,n,i){var s=n._locale.weekdaysParse(t,i,n._strict);null!=s?e.d=s:d(n).invalidWeekday=t}),K(["d","e","E"],function(t,e,n,i){e[i]=g(t)});var as="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),os="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),us="Su_Mo_Tu_We_Th_Fr_Sa".split("_");E("DDD",["DDDD",3],"DDDo","dayOfYear"),F("dayOfYear","DDD"),q("DDD",gi),q("DDDD",hi),X(["DDD","DDDD"],function(t,e,n){n._dayOfYear=g(t)}),E("H",["HH",2],0,"hour"),E("h",["hh",2],0,dn),E("hmm",0,0,function(){return""+dn.apply(this)+R(this.minutes(),2)}),E("hmmss",0,0,function(){return""+dn.apply(this)+R(this.minutes(),2)+R(this.seconds(),2)}),E("Hmm",0,0,function(){return""+this.hours()+R(this.minutes(),2)}),E("Hmmss",0,0,function(){return""+this.hours()+R(this.minutes(),2)+R(this.seconds(),2)}),ln("a",!0),ln("A",!1),F("hour","h"),q("a",hn),q("A",hn),q("H",mi),q("h",mi),q("HH",mi,li),q("hh",mi,li),q("hmm",_i),q("hmmss",yi),q("Hmm",_i),q("Hmmss",yi),X(["H","HH"],Ui),X(["a","A"],function(t,e,n){n._isPm=n._locale.isPM(t),n._meridiem=t}),X(["h","hh"],function(t,e,n){e[Ui]=g(t),d(n).bigHour=!0}),X("hmm",function(t,e,n){var i=t.length-2;e[Ui]=g(t.substr(0,i)),e[Gi]=g(t.substr(i)),d(n).bigHour=!0}),X("hmmss",function(t,e,n){var i=t.length-4,s=t.length-2;e[Ui]=g(t.substr(0,i)),e[Gi]=g(t.substr(i,2)),e[Pi]=g(t.substr(s)),d(n).bigHour=!0}),X("Hmm",function(t,e,n){var i=t.length-2;e[Ui]=g(t.substr(0,i)),e[Gi]=g(t.substr(i))}),X("Hmmss",function(t,e,n){var i=t.length-4,s=t.length-2;e[Ui]=g(t.substr(0,i)),e[Gi]=g(t.substr(i,2)),e[Pi]=g(t.substr(s))});var ds=/[ap]\.?m?\.?/i,ls=V("Hours",!0);E("m",["mm",2],0,"minute"),F("minute","m"),q("m",mi),q("mm",mi,li),X(["m","mm"],Gi);var hs=V("Minutes",!1);E("s",["ss",2],0,"second"),F("second","s"),q("s",mi),q("ss",mi,li),X(["s","ss"],Pi);var cs=V("Seconds",!1);E("S",0,0,function(){return~~(this.millisecond()/100)}),E(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),E(0,["SSS",3],0,"millisecond"),E(0,["SSSS",4],0,function(){return 10*this.millisecond()}),E(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),E(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),E(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),E(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),E(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),F("millisecond","ms"),q("S",gi,di),q("SS",gi,li),q("SSS",gi,hi);var fs;for(fs="SSSS";fs.length<=9;fs+="S")q(fs,Di);for(fs="S";fs.length<=9;fs+="S")X(fs,mn);var ms=V("Milliseconds",!1);E("z",0,0,"zoneAbbr"),E("zz",0,0,"zoneName");var _s=m.prototype;_s.add=es,_s.calendar=de,_s.clone=le,_s.diff=ge,_s.endOf=We,_s.format=Me,_s.from=Se,_s.fromNow=Ye,_s.to=we,_s.toNow=ke,_s.get=A,_s.invalidAt=Ve,_s.isAfter=he,_s.isBefore=ce,_s.isBetween=fe,_s.isSame=me,_s.isSameOrAfter=_e,_s.isSameOrBefore=ye,_s.isValid=He,_s.lang=is,_s.locale=Te,_s.localeData=be,_s.max=Bi,_s.min=Ji,_s.parsingFlags=Le,_s.set=A,_s.startOf=Oe,_s.subtract=ns,_s.toArray=Pe,_s.toObject=Ce,_s.toDate=Ge,_s.toISOString=De,_s.toJSON=Fe,_s.toString=ve,_s.unix=Ue,_s.valueOf=xe,_s.creationData=Ne,_s.year=qi,_s.isLeapYear=pt,_s.weekYear=Ae,_s.isoWeekYear=Re,_s.quarter=_s.quarters=$e,_s.month=at,_s.daysInMonth=ot,_s.week=_s.weeks=Qe,_s.isoWeek=_s.isoWeeks=Xe,_s.weeksInYear=je,_s.isoWeeksInYear=Ee,_s.date=rs,_s.day=_s.days=rn,_s.weekday=an,_s.isoWeekday=on,_s.dayOfYear=un,_s.hour=_s.hours=ls,_s.minute=_s.minutes=hs,_s.second=_s.seconds=cs,_s.millisecond=_s.milliseconds=ms,_s.utcOffset=zt,_s.utc=$t,_s.local=qt,_s.parseZone=Jt,_s.hasAlignedHourOffset=Bt,_s.isDST=Qt,_s.isDSTShifted=Xt,_s.isLocal=Kt,_s.isUtcOffset=te,_s.isUtc=ee,_s.isUTC=ee,_s.zoneAbbr=_n,_s.zoneName=yn,_s.dates=D("dates accessor is deprecated. Use date instead.",rs),_s.months=D("months accessor is deprecated. Use month instead",at),_s.years=D("years accessor is deprecated. Use year instead",qi),_s.zone=D("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Zt);var ys=_s,gs={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},ps={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},vs="Invalid date",Ds="%d",Ms=/\d{1,2}/,Ss={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Ys=T.prototype;Ys._calendar=gs,Ys.calendar=vn,Ys._longDateFormat=ps,Ys.longDateFormat=Dn,Ys._invalidDate=vs,Ys.invalidDate=Mn,Ys._ordinal=Ds,Ys.ordinal=Sn,Ys._ordinalParse=Ms,Ys.preparse=Yn,Ys.postformat=Yn,Ys._relativeTime=Ss,Ys.relativeTime=wn,Ys.pastFuture=kn,Ys.set=w,Ys.months=nt,Ys._months=Vi,Ys.monthsShort=it,Ys._monthsShort=Ni,Ys.monthsParse=st,Ys._monthsRegex=Ai,Ys.monthsRegex=dt,Ys._monthsShortRegex=Ii,Ys.monthsShortRegex=ut,Ys.week=qe,Ys._week=ss,Ys.firstDayOfYear=Be,Ys.firstDayOfWeek=Je,Ys.weekdays=tn,Ys._weekdays=as,Ys.weekdaysMin=nn,Ys._weekdaysMin=us,Ys.weekdaysShort=en,Ys._weekdaysShort=os,Ys.weekdaysParse=sn,Ys.isPM=cn,Ys._meridiemParse=ds,Ys.meridiem=fn,x("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(t){var e=t%10,n=1===g(t%100/10)?"th":1===e?"st":2===e?"nd":3===e?"rd":"th";return t+n}}),t.lang=D("moment.lang is deprecated. Use moment.locale instead.",x),t.langData=D("moment.langData is deprecated. Use moment.localeData instead.",P);var ws=Math.abs,ks=En("ms"),Ts=En("s"),bs=En("m"),Os=En("h"),Ws=En("d"),xs=En("w"),Us=En("M"),Gs=En("y"),Ps=zn("milliseconds"),Cs=zn("seconds"),Fs=zn("minutes"),Hs=zn("hours"),Ls=zn("days"),Vs=zn("months"),Ns=zn("years"),Is=Math.round,As={s:45,m:45,h:22,d:26,M:11},Rs=Math.abs,Es=Nt.prototype;Es.abs=Pn,Es.add=Fn,Es.subtract=Hn,Es.as=An,Es.asMilliseconds=ks,Es.asSeconds=Ts,Es.asMinutes=bs,Es.asHours=Os,Es.asDays=Ws,Es.asWeeks=xs,Es.asMonths=Us,Es.asYears=Gs,Es.valueOf=Rn,Es._bubble=Vn,Es.get=jn,Es.milliseconds=Ps,Es.seconds=Cs,Es.minutes=Fs,Es.hours=Hs,Es.days=Ls,Es.weeks=Zn,Es.months=Vs,Es.years=Ns,Es.humanize=Bn,Es.toISOString=Qn,Es.toString=Qn,Es.toJSON=Qn,Es.locale=Te,Es.localeData=be,Es.toIsoString=D("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Qn),Es.lang=is,E("X",0,0,"unix"),E("x",0,0,"valueOf"),q("x",Mi),q("X",wi),X("X",function(t,e,n){n._d=new Date(1e3*parseFloat(t,10))}),X("x",function(t,e,n){n._d=new Date(g(t))}),t.version="2.12.0",e(Ft),t.fn=ys,t.min=Lt,t.max=Vt,t.now=Qi,t.utc=o,t.unix=gn,t.months=On,t.isDate=i,t.locale=x,t.invalid=h,t.duration=ne,t.isMoment=_,t.weekdays=xn,t.parseZone=pn,t.localeData=P,t.isDuration=It,t.monthsShort=Wn,t.weekdaysMin=Gn,t.defineLocale=U,t.updateLocale=G,t.locales=C,t.weekdaysShort=Un,t.normalizeUnits=H,t.relativeTimeThreshold=Jn,t.prototype=ys;var js=t;return js});
/**
 * @module       RD MaterialTabs
 * @author       Rafael Shayvolodyan
 * @see          https://ua.linkedin.com/in/rafael-shayvolodyan-3a297b96
 * @version      1.0.2
 */
(function(){(function(e,m,k){var l,n,p,f;n=(p=-1!==navigator.appVersion.indexOf("MSIE"))?parseInt(navigator.appVersion.split("MSIE")[1]):null;f="ontouchstart"in k;l=function(){function d(a,b){this.options=e.extend(!0,{},this.Defaults,b);this.$element=e(a);this.$list=this.$element.find(".rd-material-tabs__list");this.$content=this.$element.find(".rd-material-tabs__container");this.$win=e(k);this.$doc=e(m);this.activeIndex=0;this.settings={stageClass:"rd-material-tabs__stage",stageOuterClass:"rd-material-tabs__stage-outer", itemClass:"rd-material-tab"};this.state={isTouched:!1,isDragged:!1,isSwiping:!1};this.touches={prevX:null,list:!1};this.initialize()}d.prototype.Defaults={itemSelector:"div",margin:20,marginContent:0,items:3,touchRatio:1,speed:500,easing:"cubic-bezier(0.005, 0.300, 0.200, 1.000)",stagePadding:0,dragContent:!0,dragList:!0,responsive:null,callbacks:{onDragStart:!1,onDragEnd:!1,onChangeStart:!1,onChangeEnd:!1,onBeforeInit:!1,onInit:!1}};d.prototype.initialize=function(){this.options.callbacks.onBeforeInit&&this.options.callbacks.onBeforeInit.call(this,this);this.setVendor(this);this.createDOM(this);this.initHandlers(this);f||this.canMoveCursor();this.setWidth(this,!0);this.setWidth(this,!1);this.moveTo(this.activeIndex);this.options.callbacks.onInit&&this.options.callbacks.onInit.call(this,this)};d.prototype.createDOM=function(a){var b;a.$content.find(">"+a.options.itemSelector).addClass(a.settings.itemClass);b=a.transform(a,0);a.$content.wrapInner(e("<div/>",{"class":a.settings.stageClass,style:a.vendorName+"transform:"+b[a.vendorName+"transform"]})).wrapInner(e("<div/>",{"class":a.settings.stageOuterClass}));a.$list.find("li").addClass(a.settings.itemClass);return a.$list.wrapInner(e("<div/>",{"class":a.settings.stageClass,style:a.vendorName+"transform:"+b[a.vendorName+"transform"]})).wrapInner(e("<div/>",{"class":a.settings.stageOuterClass}))};d.prototype.setWidth=function(a,b){var c,h,d,e,f,g;b?(g=a.$list.find("."+a.settings.stageClass),f=a.getOption("stagePadding"),0<f&&a.getOption("dragList")&&g.css({"padding-left":f,"padding-right":f}),c=a.getWidth(a,a.$list.find("."+a.settings.stageOuterClass)),e=a.getOption("margin"),d=(c-a.getOption("items")*e)/a.getOption("items")):(g=a.$content.find("."+a.settings.stageClass),f=0,d=a.getWidth(a,a.$content.find("."+a.settings.stageOuterClass)),e=a.getOption("marginContent"));h=g.find("."+a.settings.itemClass);b&&!a.getOption("dragList")?(a.setListTranslate(a,0),g.css({"padding-left":0,"padding-right":0,width:"auto"}),h.removeAttr("style")):(c=h.length, h.css({width:a.px(d),"margin-right":a.px(e)}),g[0].style.width=a.px((d+e)*c+e+f))};d.prototype.resize=function(a){a.setWidth(a,!0);a.setWidth(a,!1);return setTimeout(function(){return a.moveTo(a.activeIndex)},300)};d.prototype.initHandlers=function(a){a.$win.on("resize",e.proxy(a.resize,this,a));if(f)a.$element.on("touchstart.rd.mt",e.proxy(a.onTouchStart,this,a));else a.$element.on("mousedown.rd.mt",e.proxy(a.onTouchStart,this,a)),a.$element.on("mouseleave.rd.mt",e.proxy(a.onTouchEnd,this,a))};d.prototype.onTouchEnd= function(a,b){var c,d;if(a.state.isTouched){a.$doc.off(".rd.mt");a.changing=!1;b.originalEvent&&(b=b.originalEvent);a.state.isTrigerred=!1;if(a.state.isDragged)if(f||a.$element.removeClass("rd-material-tabs-grab"),e(a.touches.targetEl).one("click.rd.mt",function(){return!1}),a.touches.endTime=Date.now(),d=a.touches.endTime-a.touches.startTime,a.touches.prevX=null,a.state.isDragged=!1,a.touches.list&&a.getOption("dragList"))c=a.state.isSwiping?20<d?a.touches.diff/(d/200):a.touches.diff:100<d?a.touches.diff/(d/1E3):d/15*a.touches.diff,a.touches.velocity=0,a.touches.velocity=c/(d/50)*a.getOption("touchRatio"),0!==a.touches.velocity&&(a.setListTransition(a,a.options.speed),c=a.getListTranslate(a)+a.touches.velocity,0<c?c=0:c<a.getMaxTranslate(a,a.$list)&&(c=a.getMaxTranslate(a,a.$list)),a.setListTranslate(a,c));else{if(!a.touches.list&&a.getOption("dragContent")){a.setContentTransition(a,a.options.speed);a.setListTransition(a,a.options.speed);if("left"===a.touches.direction&&0===a.activeIndex||"right"===a.touches.direction&&a.activeIndex===a.$content.find("."+a.settings.itemClass).length-1){a.moveTo(a.activeIndex);return}c=a.activeIndex;a.state.isSwiping?"left"===a.touches.direction?c=a.activeIndex-1:"right"===a.touches.direction&&(c=a.activeIndex+1):Math.abs(a.touches.diff)>a.getContentItemWidth(a)/3&&("left"===a.touches.direction?c=a.activeIndex-1:"right"===a.touches.direction&&(c=a.activeIndex+1));a.moveTo(c)}}else!a.state.isDragged&&a.touches.list&&(c=e(b.target),"A"===b.target.tagName||c.parents("."+a.settings.itemClass+" a").length)&&(a.setContentTransition(a,a.options.speed),a.setListTransition(a,a.options.speed),c=c.parents("."+a.settings.itemClass).index(),a.moveTo(c));a.state.isTouched=!1;a.options.callbacks.onDragEnd&&a.options.callbacks.onDragEnd.call(this,a)}};d.prototype.onDrag=function(a,b){var c,d,e;if(a.state.isTouched){b.originalEvent&&(b=b.originalEvent);a.touches.currentX="touchmove"===b.type?b.targetTouches[0].pageX:b.pageX;a.touches.currentY="touchmove"===b.type?b.targetTouches[0].pageY: b.pageY;null===a.touches.prevX&&(a.touches.prevX=a.touches.currentX);e=a.touches.diff=a.touches.currentX-a.touches.startX;e*=a.getOption("touchRatio");if(0!==e&&!a.state.isTrigerred){c=a.touches.startX-a.touches.currentX;d=a.touches.startY-a.touches.currentY;if(Math.abs(c)<Math.abs(d)){a.onTouchEnd(a,b);return}b.preventDefault();!f&&(a.touches.list&&a.getOption("dragList")||!a.touches.list&&a.getOption("dragContent"))&&a.$element.addClass("rd-material-tabs-grab");0<Math.abs(e)&&(a.state.isDragged=!0);a.state.isTrigerred=!0}a.touches.direction=0<e?"left":"right";a.touches.currentTranslate=e+a.touches.startTranslate;a.touches.prevDirection!==a.touches.direction&&(a.touches.startTime=Date.now());a.touches.endTime=Date.now();d=a.touches.endTime-a.touches.startTime;c=a.touches.list?8:4;a.state.isSwiping=Math.abs(a.touches.currentX-a.touches.prevX)>c||100>d&&2<Math.abs(a.touches.currentX-a.touches.prevX)?!0:!1;a.touches.prevX=a.touches.currentX;a.touches.prevDirection=a.touches.direction;a.touches.list&& a.getOption("dragList")?a.setListTranslate(a,a.touches.currentTranslate):!a.touches.list&&a.getOption("dragContent")&&a.setContentTranslate(a,a.touches.currentTranslate)}};d.prototype.onTouchStart=function(a,b){var c;b.originalEvent&&(b=b.originalEvent);if(1===b.which||f){a.state.isTouched=!0;c=a.$element.find("[onclick]");c.length&&c.removeAttr("onclick");c=e(b.target);a.touches.list=0<a.$list.find(c).length;if(a.touches.list)a.$list.find("a").on("click.rd.mt touchstart.rd.mt",function(a){return a.preventDefault()}); a.touches.startX=a.touches.currentX="touchstart"===b.type?b.targetTouches[0].pageX:b.pageX;a.touches.startY=a.touches.currentY="touchstart"===b.type?b.targetTouches[0].pageY:b.pageY;a.touches.startTime=new Date;a.touches.targetEl=b.target||b.srcElement;f||"IMG"!==a.touches.targetEl.tagName&&"A"!==a.touches.targetEl.tagName||b.preventDefault();a.$doc.on("mouseup.rd.mt touchend.rd.mt touchcancel.rd.mt",e.proxy(a.onTouchEnd,this,a));a.$doc.one("mousemove.rd.mt touchmove.rd.mt",e.proxy(function(b){var c; a.options.callbacks.onDragStart&&a.options.callbacks.onDragStart.call(this,a);b.originalEvent&&(b=b.originalEvent);a.touches.currentX="touchmove"===b.type?b.targetTouches[0].pageX:b.pageX;a.touches.currentY="touchmove"===b.type?b.targetTouches[0].pageY:b.pageY;c=a.touches.startX-a.touches.currentX;if(Math.abs(c)<Math.abs(a.touches.startY-a.touches.currentY))a.onTouchEnd(a,b);else if(b.preventDefault(),a.touches.list?(a.touches.startTranslate=a.getListTranslate(a),a.setListTransition(a,0)):(a.touches.startTranslate= a.getContentTranslate(a),a.setContentTransition(a,0)),a.$doc.on("mousemove.rd.mt touchmove.rd.mt",e.proxy(a.onDrag,this,a)),0===c)a.state.isTrigerred=!1,a.$doc.trigger("mousemove.rd.mt touchmove.rd.mt");else return 1<Math.abs(c)&&(a.state.isDragged=!0),!f&&(a.touches.list&&a.getOption("dragList")||!a.touches.list&&a.getOption("dragContent"))&&a.$element.addClass("rd-material-tabs-grab"),this}))}};d.prototype.getWidth=function(a,b){return b.outerWidth()};d.prototype.getContentItemWidth=function(a){return a.getWidth(a, a.$content.find("."+a.settings.itemClass))};d.prototype.getListItemWidth=function(a){return a.getWidth(a,a.$list.find("."+a.settings.itemClass))};d.prototype.moveListTo=function(a,b){var c;a.getOption("items")<a.$list.find("."+a.settings.itemClass).length&&(c=a.getListItemWidth(a),c=-(c*b+a.getOption("margin")*b),c<a.getMaxTranslate(a,a.$list)&&(c=a.getMaxTranslate(a,a.$list)),a.setListTranslate(a,c))};d.prototype.moveTo=function(a){var b;a!==this.activeIndex&&this.options.callbacks.onChangeStart&& this.options.callbacks.onChangeStart.call(this);b=-(this.getContentItemWidth(this)*a+this.getOption("marginContent")*a);this.setContentTranslate(this,b);this.getOption("dragList")&&this.moveListTo(this,a);this.updateActive(this,a)};d.prototype.canMoveCursor=function(){var a;a=this;a.$list.on("mouseenter",function(){a.getOption("dragList")?a.$element.addClass("rd-material-tabs-canMove"):a.$element.removeClass("rd-material-tabs-canMove")});a.$list.on("mouseleave",function(){a.$element.removeClass("rd-material-tabs-canMove"); console.log(1)});a.$content.on("mouseenter",function(){a.getOption("dragContent")?a.$element.addClass("rd-material-tabs-canMove"):a.$element.removeClass("rd-material-tabs-canMove")});a.$content.on("mouseleave",function(){a.$element.removeClass("rd-material-tabs-canMove")})};d.prototype.px=function(a){return a+"px"};d.prototype.transform=function(a,b){var c;c={};p&&10>n||!1===a.isPerspective()?c[a.vendorName+"transform"]="translate("+a.px(b)+", 0)":c[a.vendorName+"transform"]="translate3d("+a.px(b)+ ", 0, 0)";return c};d.prototype.updateActive=function(a,b){var c,d;c=a.getContentItemWidth(a);d=a.getContentTranslate(a);null==b&&(b=a.activeIndex=Math.round(Math.abs(d/c)));a.$element.find("."+a.settings.itemClass+"-active").removeClass(a.settings.itemClass+"-active");a.$list.find("."+a.settings.itemClass).eq(b).addClass(a.settings.itemClass+"-active");a.$content.find("."+a.settings.itemClass).eq(b).addClass(a.settings.itemClass+"-active");b!==a.activeIndex&&(a.activeIndex=b,a.options.callbacks.onChangeEnd&& a.options.callbacks.onChangeEnd.call(this,a))};d.prototype.getActiveIndex=function(a){return a.$content.find("."+a.settings.itemClass+"-active").index()};d.prototype.getTranslate=function(a,b){var c;c=b.css(a.vendorName+"transform").replace(/[^0-9\-.,]/g,"").split(",");return parseInt(c[12]||c[4])};d.prototype.getListTranslate=function(a){return a.getTranslate(a,a.$list.find("."+a.settings.stageClass))};d.prototype.getContentTranslate=function(a){return a.getTranslate(a,a.$content.find("."+a.settings.stageClass))}; d.prototype.setTransition=function(a,b,c){e(b).css(a.vendorName+"transition",c/1E3+"s all "+a.options.easing)};d.prototype.setListTransition=function(a,b){a.setTransition(a,a.$list.find("."+a.settings.stageClass),b)};d.prototype.setContentTransition=function(a,b){a.setTransition(a,a.$content.find("."+a.settings.stageClass),b)};d.prototype.setTranslate=function(a,b,c){c=a.transform(a,c);b.css(a.vendorName+"transform",c[a.vendorName+"transform"])};d.prototype.setListTranslate=function(a,b){a.setTranslate(a, a.$list.find("."+a.settings.stageClass),b)};d.prototype.setContentTranslate=function(a,b){a.setTranslate(a,a.$content.find("."+a.settings.stageClass),b)};d.prototype.getMaxTranslate=function(a,b){return a.$win.width()-a.getWidth(a,b.find("."+a.settings.stageClass))};d.prototype.setVendor=function(){this.vendorName=this.isTransform().replace(/Transform/i,"");this.vendorName=""!==this.vendorName?"-"+this.vendorName.toLowerCase()+"-":""};d.prototype.isStyleSupported=function(a){var b,c,d;b=m.createElement("div"); for(c in a)if(d=a[c],"undefined"!==typeof b.style[d])return[d,c];return!1};d.prototype.isPerspective=function(){return this.isStyleSupported(["perspective","webkitPerspective","MozPerspective","OPerspective","MsPerspective"])[0]};d.prototype.isTransform=function(){return this.isStyleSupported(["transform","WebkitTransform","MozTransform","OTransform","msTransform"])[0]};d.prototype.getOption=function(a){var b,c;if(null!=this.options.responsive){for(b in this.options.responsive)b<=this.$win.width()&& (c=b);return null!=this.options.responsive[c][a]?this.options.responsive[c][a]:this.options[a]}return this.options[a]};return d}();e.fn.extend({RDMaterialTabs:function(d){return this.each(function(){var a;a=e(this);if(!a.data("RDMaterialTabs"))return a.data("RDMaterialTabs",new l(this,d))})}});return k.RDMaterialTabs=l})(window.jQuery,document,window);"undefined"!==typeof module&&null!==module?module.exports=window.RDMaterialTabs:"function"===typeof define&&define.amd&&define(["jquery"],function(){return window.RDMaterialTabs})}).call(this);
/**
 * @module       Slick
 * @author       Ken Wheeler
 * @see          http://kenwheeler.github.io/slick
 * @version      1.6.0
 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
    d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
/**
 * @module       jquery mousewheel plugin
 * @author       malihu
 * @license      MIT
 * @version      3.1.13
 * @see          http://manos.malihu.gr/jquery-custom-content-scroller/
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
!function(e){"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&N(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(V(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&V(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(V(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&V(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),X.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=q.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=Y.call(this,c[0],"y"),c[1]=Y.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=oe()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",V(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",V(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&N(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){{o.data(a)}X.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),X.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),K(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),K(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir="+n.langDir+" /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=ee(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[14]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[15]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[16]+"' oncontextmenu='return false;' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(N(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),V(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),V(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),R.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}L.call(this),P.call(this),i.advanced.autoScrollOnFocus&&z.call(this),i.scrollButtons.enable&&H.call(this),i.keyboard.enable&&U.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!W()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),K(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),K(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),K(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=W()&&t.target.ownerDocument!==top.document?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e){var t=m.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}}function o(e,t,o,a){if(m[0].idleTimer=u.scrollInertia<233?250:0,n.attr("id")===h[1])var i="x",r=(n[0].offsetLeft-t+a)*d.scrollRatio.x;else var i="y",r=(n[0].offsetTop-e+o)*d.scrollRatio.y;V(l,r.toString(),{dir:i,drag:!0})}var n,i,r,l=e(this),d=l.data(a),u=d.opt,f=a+"_"+d.idx,h=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],m=e("#mCSB_"+d.idx+"_container"),p=e("#"+h[0]+",#"+h[1]),g=u.advanced.releaseDraggableSelectors?p.add(e(u.advanced.releaseDraggableSelectors)):p,v=u.advanced.extraDraggableSelectors?e(!W()||top.document).add(e(u.advanced.extraDraggableSelectors)):e(!W()||top.document);p.bind("mousedown."+f+" touchstart."+f+" pointerdown."+f+" MSPointerDown."+f,function(o){if(o.stopImmediatePropagation(),o.preventDefault(),Z(o)){c=!0,s&&(document.onselectstart=function(){return!1}),t(!1),N(l),n=e(this);var a=n.offset(),d=O(o)[0]-a.top,f=O(o)[1]-a.left,h=n.height()+a.top,m=n.width()+a.left;h>d&&d>0&&m>f&&f>0&&(i=d,r=f),C(n,"active",u.autoExpandScrollbar)}}).bind("touchmove."+f,function(e){e.stopImmediatePropagation(),e.preventDefault();var t=n.offset(),a=O(e)[0]-t.top,l=O(e)[1]-t.left;o(i,r,a,l)}),e(document).add(v).bind("mousemove."+f+" pointermove."+f+" MSPointerMove."+f,function(e){if(n){var t=n.offset(),a=O(e)[0]-t.top,l=O(e)[1]-t.left;if(i===a&&r===l)return;o(i,r,a,l)}}).add(g).bind("mouseup."+f+" touchend."+f+" pointerup."+f+" MSPointerUp."+f,function(e){n&&(C(n,"active",u.autoExpandScrollbar),n=null),c=!1,s&&(document.onselectstart=null),t(!0)})},D=function(){function o(e){if(!$(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if($(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=G();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),R.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],A,n,"y","all",!0),B.overflowed[1]&&s(w[1],A,n,"x",L,!0)}}function i(e){if(!$(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),N(y),p=G();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],R=[]}function r(e){if($(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=G();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],R[R.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&V(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],R=[],A=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,F(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(e){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(e){t||(i&&(i=0,n("off",null)),c=!1)})},R=function(){function t(t,a){if(N(o),!A(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v=t.deltaX||t.deltaY||a;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<2&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),V(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},W=function(e){var t=null;if(e){try{var o=e.contentDocument||e.contentWindow.document;t=o.body.innerHTML}catch(a){}return null!==t}try{var o=top.document;t=o.body.innerHTML}catch(a){}return null!==t},A=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},L=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(e){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){N(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-.9*u*l.width()}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-.9*u*l.height()}V(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},z=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(o){var a=e(document.activeElement),i=r.find(".mCustomScrollBox").length,s=0;a.is(n.advanced.autoScrollOnFocus)&&(N(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=i?(s+17)*i:0,t[0]._focusTimeout=setTimeout(function(){var e=[te(a)[0],te(a)[1]],o=[r[0].offsetTop,r[0].offsetLeft],i=[o[0]+e[0]>=0&&o[0]+e[0]<l.height()-a.outerHeight(!1),o[1]+e[1]>=0&&o[0]+e[1]<l.width()-a.outerWidth(!1)],c="yx"!==n.axis||i[0]||i[1]?"all":"none";"x"===n.axis||i[0]||V(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s}),"y"===n.axis||i[1]||V(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s})},t[0]._focusTimer))})},P=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(t){(0!==i.scrollTop()||0!==i.scrollLeft())&&e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,F(t,e,o)}if(a.preventDefault(),Z(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},U=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||F(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){N(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-.9*f*d.width();else var h="y",m=Math.abs(c[0].offsetTop)-.9*f*d.height();V(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;V(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},F=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*d[1]*n:s[0]+f.dir[1]*d[0]*n,v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=e?!0:!1;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),V(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),K(f,"step"),N(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type?!0:!1,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],N(t),ee(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},q=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},Y=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1):l.outerHeight(!1),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?te(m)[1]:te(m)[0];case"string":case"number":if(ee(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&ee(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?te(m)[1]:te(m)[0]}return e(t).length?"x"===o?te(e(t))[1]:te(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},X=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void K(f[0],"autoUpdate")):void o()},j=function(e,t,o){return Math.round(e/t)*t-o},N=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){J.call(this)})},V=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?q.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?q.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,(0!==m.scrollTop()||0!==m.scrollLeft())&&(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=j(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),Q(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),(s.tweenRunning||!(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0]))&&Q(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},Q=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=G()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=G(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},G=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},J=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},K=function(e,t){try{delete e[t]}catch(o){e[t]=null}},Z=function(e){return!(e.which&&1!==e.which)},$=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},ee=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},te=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},oe=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).load(function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+te(n)[0]>=0&&a[0]+te(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+te(n)[1]>=0&&a[1]+te(n)[1]<o.width()-n.outerWidth(!1)},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});
/**
 * @module       Prevent click events after a touchend.
 * @author       Anders Johnson
 * @license      MIT
 * @version      0.0.0
 * @see          https://github.com/adjohnson916/prevent-ghost-click.js
 */
!function(t,n,e){function i(t){for(var n=0;n<u.length;n++){var e=u[n][0],i=u[n][1];if(Math.abs(t.clientX-e)<r&&Math.abs(t.clientY-i)<r){t.stopPropagation(),t.preventDefault();break}}}function c(){u=[]}function o(){u.splice(0,1)}function a(t){if(t.touches.length-t.changedTouches.length<=0){var n=t.changedTouches[0];u.push([n.clientX,n.clientY]),setTimeout(o,h)}}var u=[],r=25,h=2500;return"ontouchstart"in t?(t[e]=function(t){t.addEventListener("touchstart",c,!0),t.addEventListener("touchend",a,!0)},void n.addEventListener("click",i,!0)):void(t[e]=function(){})}(window,document,"PreventGhostClick");
/**
 * @module       Hammer.js
 * @author       Alexander Schmitz
 * @license      MIT
 * @version      2.0.7
 * @see          http://hammerjs.github.io/
 */
!function(t,e,i,n){"use strict";function r(t,e,i){return setTimeout(c(t,i),e)}function s(t,e,i){return Array.isArray(t)?(o(t,i[e],i),!0):!1}function o(t,e,i){var r;if(t)if(t.forEach)t.forEach(e,i);else if(t.length!==n)for(r=0;r<t.length;)e.call(i,t[r],r,t),r++;else for(r in t)t.hasOwnProperty(r)&&e.call(i,t[r],r,t)}function a(t,e,i){for(var r=Object.keys(e),s=0;s<r.length;)(!i||i&&t[r[s]]===n)&&(t[r[s]]=e[r[s]]),s++;return t}function h(t,e){return a(t,e,!0)}function u(t,e,i){var n,r=e.prototype;n=t.prototype=Object.create(r),n.constructor=t,n._super=r,i&&a(n,i)}function c(t,e){return function(){return t.apply(e,arguments)}}function l(t,e){return typeof t==ct?t.apply(e?e[0]||n:n,e):t}function p(t,e){return t===n?e:t}function f(t,e,i){o(g(e),function(e){t.addEventListener(e,i,!1)})}function d(t,e,i){o(g(e),function(e){t.removeEventListener(e,i,!1)})}function v(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function m(t,e){return t.indexOf(e)>-1}function g(t){return t.trim().split(/\s+/g)}function T(t,e,i){if(t.indexOf&&!i)return t.indexOf(e);for(var n=0;n<t.length;){if(i&&t[n][i]==e||!i&&t[n]===e)return n;n++}return-1}function y(t){return Array.prototype.slice.call(t,0)}function E(t,e,i){for(var n=[],r=[],s=0;s<t.length;){var o=e?t[s][e]:t[s];T(r,o)<0&&n.push(t[s]),r[s]=o,s++}return i&&(n=e?n.sort(function(t,i){return t[e]>i[e]}):n.sort()),n}function I(t,e){for(var i,r,s=e[0].toUpperCase()+e.slice(1),o=0;o<ht.length;){if(i=ht[o],r=i?i+s:e,r in t)return r;o++}return n}function A(){return dt++}function _(t){var e=t.ownerDocument;return e.defaultView||e.parentWindow}function D(t,e){var i=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){l(t.options.enable,[t])&&i.handler(e)},this.init()}function S(t){var e,i=t.options.inputClass;return new(e=i?i:gt?W:Tt?H:mt?U:F)(t,w)}function w(t,e,i){var n=i.pointers.length,r=i.changedPointers.length,s=e&Dt&&n-r===0,o=e&(wt|bt)&&n-r===0;i.isFirst=!!s,i.isFinal=!!o,s&&(t.session={}),i.eventType=e,b(t,i),t.emit("hammer.input",i),t.recognize(i),t.session.prevInput=i}function b(t,e){var i=t.session,n=e.pointers,r=n.length;i.firstInput||(i.firstInput=z(e)),r>1&&!i.firstMultiple?i.firstMultiple=z(e):1===r&&(i.firstMultiple=!1);var s=i.firstInput,o=i.firstMultiple,a=o?o.center:s.center,h=e.center=N(n);e.timeStamp=ft(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=x(a,h),e.distance=O(a,h),C(i,e),e.offsetDirection=M(e.deltaX,e.deltaY),e.scale=o?Y(o.pointers,n):1,e.rotation=o?X(o.pointers,n):0,R(i,e);var u=t.element;v(e.srcEvent.target,u)&&(u=e.srcEvent.target),e.target=u}function C(t,e){var i=e.center,n=t.offsetDelta||{},r=t.prevDelta||{},s=t.prevInput||{};(e.eventType===Dt||s.eventType===wt)&&(r=t.prevDelta={x:s.deltaX||0,y:s.deltaY||0},n=t.offsetDelta={x:i.x,y:i.y}),e.deltaX=r.x+(i.x-n.x),e.deltaY=r.y+(i.y-n.y)}function R(t,e){var i,r,s,o,a=t.lastInterval||e,h=e.timeStamp-a.timeStamp;if(e.eventType!=bt&&(h>_t||a.velocity===n)){var u=a.deltaX-e.deltaX,c=a.deltaY-e.deltaY,l=P(h,u,c);r=l.x,s=l.y,i=pt(l.x)>pt(l.y)?l.x:l.y,o=M(u,c),t.lastInterval=e}else i=a.velocity,r=a.velocityX,s=a.velocityY,o=a.direction;e.velocity=i,e.velocityX=r,e.velocityY=s,e.direction=o}function z(t){for(var e=[],i=0;i<t.pointers.length;)e[i]={clientX:lt(t.pointers[i].clientX),clientY:lt(t.pointers[i].clientY)},i++;return{timeStamp:ft(),pointers:e,center:N(e),deltaX:t.deltaX,deltaY:t.deltaY}}function N(t){var e=t.length;if(1===e)return{x:lt(t[0].clientX),y:lt(t[0].clientY)};for(var i=0,n=0,r=0;e>r;)i+=t[r].clientX,n+=t[r].clientY,r++;return{x:lt(i/e),y:lt(n/e)}}function P(t,e,i){return{x:e/t||0,y:i/t||0}}function M(t,e){return t===e?Ct:pt(t)>=pt(e)?t>0?Rt:zt:e>0?Nt:Pt}function O(t,e,i){i||(i=Xt);var n=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return Math.sqrt(n*n+r*r)}function x(t,e,i){i||(i=Xt);var n=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return 180*Math.atan2(r,n)/Math.PI}function X(t,e){return x(e[1],e[0],Yt)-x(t[1],t[0],Yt)}function Y(t,e){return O(e[0],e[1],Yt)/O(t[0],t[1],Yt)}function F(){this.evEl=Wt,this.evWin=qt,this.allow=!0,this.pressed=!1,D.apply(this,arguments)}function W(){this.evEl=kt,this.evWin=Ut,D.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function q(){this.evTarget=Vt,this.evWin=jt,this.started=!1,D.apply(this,arguments)}function L(t,e){var i=y(t.touches),n=y(t.changedTouches);return e&(wt|bt)&&(i=E(i.concat(n),"identifier",!0)),[i,n]}function H(){this.evTarget=Bt,this.targetIds={},D.apply(this,arguments)}function k(t,e){var i=y(t.touches),n=this.targetIds;if(e&(Dt|St)&&1===i.length)return n[i[0].identifier]=!0,[i,i];var r,s,o=y(t.changedTouches),a=[],h=this.target;if(s=i.filter(function(t){return v(t.target,h)}),e===Dt)for(r=0;r<s.length;)n[s[r].identifier]=!0,r++;for(r=0;r<o.length;)n[o[r].identifier]&&a.push(o[r]),e&(wt|bt)&&delete n[o[r].identifier],r++;return a.length?[E(s.concat(a),"identifier",!0),a]:void 0}function U(){D.apply(this,arguments);var t=c(this.handler,this);this.touch=new H(this.manager,t),this.mouse=new F(this.manager,t)}function G(t,e){this.manager=t,this.set(e)}function V(t){if(m(t,ee))return ee;var e=m(t,ie),i=m(t,ne);return e&&i?ie+" "+ne:e||i?e?ie:ne:m(t,te)?te:$t}function j(t){this.id=A(),this.manager=null,this.options=h(t||{},this.defaults),this.options.enable=p(this.options.enable,!0),this.state=re,this.simultaneous={},this.requireFail=[]}function Z(t){return t&ue?"cancel":t&ae?"end":t&oe?"move":t&se?"start":""}function B(t){return t==Pt?"down":t==Nt?"up":t==Rt?"left":t==zt?"right":""}function J(t,e){var i=e.manager;return i?i.get(t):t}function K(){j.apply(this,arguments)}function Q(){K.apply(this,arguments),this.pX=null,this.pY=null}function $(){K.apply(this,arguments)}function tt(){j.apply(this,arguments),this._timer=null,this._input=null}function et(){K.apply(this,arguments)}function it(){K.apply(this,arguments)}function nt(){j.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function rt(t,e){return e=e||{},e.recognizers=p(e.recognizers,rt.defaults.preset),new st(t,e)}function st(t,e){e=e||{},this.options=h(e,rt.defaults),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.element=t,this.input=S(this),this.touchAction=new G(this,this.options.touchAction),ot(this,!0),o(e.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function ot(t,e){var i=t.element;o(t.options.cssProps,function(t,n){i.style[I(i.style,n)]=e?t:""})}function at(t,i){var n=e.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=i,i.target.dispatchEvent(n)}var ht=["","webkit","moz","MS","ms","o"],ut=e.createElement("div"),ct="function",lt=Math.round,pt=Math.abs,ft=Date.now,dt=1,vt=/mobile|tablet|ip(ad|hone|od)|android/i,mt="ontouchstart"in t,gt=I(t,"PointerEvent")!==n,Tt=mt&&vt.test(navigator.userAgent),yt="touch",Et="pen",It="mouse",At="kinect",_t=25,Dt=1,St=2,wt=4,bt=8,Ct=1,Rt=2,zt=4,Nt=8,Pt=16,Mt=Rt|zt,Ot=Nt|Pt,xt=Mt|Ot,Xt=["x","y"],Yt=["clientX","clientY"];D.prototype={handler:function(){},init:function(){this.evEl&&f(this.element,this.evEl,this.domHandler),this.evTarget&&f(this.target,this.evTarget,this.domHandler),this.evWin&&f(_(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&d(this.element,this.evEl,this.domHandler),this.evTarget&&d(this.target,this.evTarget,this.domHandler),this.evWin&&d(_(this.element),this.evWin,this.domHandler)}};var Ft={mousedown:Dt,mousemove:St,mouseup:wt},Wt="mousedown",qt="mousemove mouseup";u(F,D,{handler:function(t){var e=Ft[t.type];e&Dt&&0===t.button&&(this.pressed=!0),e&St&&1!==t.which&&(e=wt),this.pressed&&this.allow&&(e&wt&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:It,srcEvent:t}))}});var Lt={pointerdown:Dt,pointermove:St,pointerup:wt,pointercancel:bt,pointerout:bt},Ht={2:yt,3:Et,4:It,5:At},kt="pointerdown",Ut="pointermove pointerup pointercancel";t.MSPointerEvent&&(kt="MSPointerDown",Ut="MSPointerMove MSPointerUp MSPointerCancel"),u(W,D,{handler:function(t){var e=this.store,i=!1,n=t.type.toLowerCase().replace("ms",""),r=Lt[n],s=Ht[t.pointerType]||t.pointerType,o=s==yt,a=T(e,t.pointerId,"pointerId");r&Dt&&(0===t.button||o)?0>a&&(e.push(t),a=e.length-1):r&(wt|bt)&&(i=!0),0>a||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:s,srcEvent:t}),i&&e.splice(a,1))}});var Gt={touchstart:Dt,touchmove:St,touchend:wt,touchcancel:bt},Vt="touchstart",jt="touchstart touchmove touchend touchcancel";u(q,D,{handler:function(t){var e=Gt[t.type];if(e===Dt&&(this.started=!0),this.started){var i=L.call(this,t,e);e&(wt|bt)&&i[0].length-i[1].length===0&&(this.started=!1),this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:yt,srcEvent:t})}}});var Zt={touchstart:Dt,touchmove:St,touchend:wt,touchcancel:bt},Bt="touchstart touchmove touchend touchcancel";u(H,D,{handler:function(t){var e=Zt[t.type],i=k.call(this,t,e);i&&this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:yt,srcEvent:t})}}),u(U,D,{handler:function(t,e,i){var n=i.pointerType==yt,r=i.pointerType==It;if(n)this.mouse.allow=!1;else if(r&&!this.mouse.allow)return;e&(wt|bt)&&(this.mouse.allow=!0),this.callback(t,e,i)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Jt=I(ut.style,"touchAction"),Kt=Jt!==n,Qt="compute",$t="auto",te="manipulation",ee="none",ie="pan-x",ne="pan-y";G.prototype={set:function(t){t==Qt&&(t=this.compute()),Kt&&(this.manager.element.style[Jt]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return o(this.manager.recognizers,function(e){l(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),V(t.join(" "))},preventDefaults:function(t){if(!Kt){var e=t.srcEvent,i=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var n=this.actions,r=m(n,ee),s=m(n,ne),o=m(n,ie);return r||s&&i&Mt||o&&i&Ot?this.preventSrc(e):void 0}},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var re=1,se=2,oe=4,ae=8,he=ae,ue=16,ce=32;j.prototype={defaults:{},set:function(t){return a(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(s(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=J(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return s(t,"dropRecognizeWith",this)?this:(t=J(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(s(t,"requireFailure",this))return this;var e=this.requireFail;return t=J(t,this),-1===T(e,t)&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(s(t,"dropRequireFailure",this))return this;t=J(t,this);var e=T(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){i.manager.emit(i.options.event+(e?Z(n):""),t)}var i=this,n=this.state;ae>n&&e(!0),e(),n>=ae&&e(!0)},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=ce)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(ce|re)))return!1;t++}return!0},recognize:function(t){var e=a({},t);return l(this.options.enable,[this,e])?(this.state&(he|ue|ce)&&(this.state=re),this.state=this.process(e),void(this.state&(se|oe|ae|ue)&&this.tryEmit(e))):(this.reset(),void(this.state=ce))},process:function(t){},getTouchAction:function(){},reset:function(){}},u(K,j,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,i=t.eventType,n=e&(se|oe),r=this.attrTest(t);return n&&(i&bt||!r)?e|ue:n||r?i&wt?e|ae:e&se?e|oe:se:ce}}),u(Q,K,{defaults:{event:"pan",threshold:10,pointers:1,direction:xt},getTouchAction:function(){var t=this.options.direction,e=[];return t&Mt&&e.push(ne),t&Ot&&e.push(ie),e},directionTest:function(t){var e=this.options,i=!0,n=t.distance,r=t.direction,s=t.deltaX,o=t.deltaY;return r&e.direction||(e.direction&Mt?(r=0===s?Ct:0>s?Rt:zt,i=s!=this.pX,n=Math.abs(t.deltaX)):(r=0===o?Ct:0>o?Nt:Pt,i=o!=this.pY,n=Math.abs(t.deltaY))),t.direction=r,i&&n>e.threshold&&r&e.direction},attrTest:function(t){return K.prototype.attrTest.call(this,t)&&(this.state&se||!(this.state&se)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=B(t.direction);e&&this.manager.emit(this.options.event+e,t),this._super.emit.call(this,t)}}),u($,K,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[ee]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&se)},emit:function(t){if(this._super.emit.call(this,t),1!==t.scale){var e=t.scale<1?"in":"out";this.manager.emit(this.options.event+e,t)}}}),u(tt,j,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[$t]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,s=t.deltaTime>e.time;if(this._input=t,!n||!i||t.eventType&(wt|bt)&&!s)this.reset();else if(t.eventType&Dt)this.reset(),this._timer=r(function(){this.state=he,this.tryEmit()},e.time,this);else if(t.eventType&wt)return he;return ce},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===he&&(t&&t.eventType&wt?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=ft(),this.manager.emit(this.options.event,this._input)))}}),u(et,K,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[ee]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&se)}}),u(it,K,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Mt|Ot,pointers:1},getTouchAction:function(){return Q.prototype.getTouchAction.call(this)},attrTest:function(t){var e,i=this.options.direction;return i&(Mt|Ot)?e=t.velocity:i&Mt?e=t.velocityX:i&Ot&&(e=t.velocityY),this._super.attrTest.call(this,t)&&i&t.direction&&t.distance>this.options.threshold&&pt(e)>this.options.velocity&&t.eventType&wt},emit:function(t){var e=B(t.direction);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),u(nt,j,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[te]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,s=t.deltaTime<e.time;if(this.reset(),t.eventType&Dt&&0===this.count)return this.failTimeout();if(n&&s&&i){if(t.eventType!=wt)return this.failTimeout();var o=this.pTime?t.timeStamp-this.pTime<e.interval:!0,a=!this.pCenter||O(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,a&&o?this.count+=1:this.count=1,this._input=t;var h=this.count%e.taps;if(0===h)return this.hasRequireFailures()?(this._timer=r(function(){this.state=he,this.tryEmit()},e.interval,this),se):he}return ce},failTimeout:function(){return this._timer=r(function(){this.state=ce},this.options.interval,this),ce},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==he&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),rt.VERSION="2.0.4",rt.defaults={domEvents:!1,touchAction:Qt,enable:!0,inputTarget:null,inputClass:null,preset:[[et,{enable:!1}],[$,{enable:!1},["rotate"]],[it,{direction:Mt}],[Q,{direction:Mt},["swipe"]],[nt],[nt,{event:"doubletap",taps:2},["tap"]],[tt]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var le=1,pe=2;st.prototype={set:function(t){return a(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?pe:le},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var i,n=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&he)&&(r=e.curRecognizer=null);for(var s=0;s<n.length;)i=n[s],e.stopped===pe||r&&i!=r&&!i.canRecognizeWith(r)?i.reset():i.recognize(t),!r&&i.state&(se|oe|ae)&&(r=e.curRecognizer=i),s++}},get:function(t){if(t instanceof j)return t;for(var e=this.recognizers,i=0;i<e.length;i++)if(e[i].options.event==t)return e[i];return null},add:function(t){if(s(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(s(t,"remove",this))return this;var e=this.recognizers;return t=this.get(t),e.splice(T(e,t),1),this.touchAction.update(),this},on:function(t,e){var i=this.handlers;return o(g(t),function(t){i[t]=i[t]||[],i[t].push(e)}),this},off:function(t,e){var i=this.handlers;return o(g(t),function(t){e?i[t].splice(T(i[t],e),1):delete i[t]}),this},emit:function(t,e){this.options.domEvents&&at(t,e);var i=this.handlers[t]&&this.handlers[t].slice();if(i&&i.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var n=0;n<i.length;)i[n](e),n++}},destroy:function(){this.element&&ot(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},a(rt,{INPUT_START:Dt,INPUT_MOVE:St,INPUT_END:wt,INPUT_CANCEL:bt,STATE_POSSIBLE:re,STATE_BEGAN:se,STATE_CHANGED:oe,STATE_ENDED:ae,STATE_RECOGNIZED:he,STATE_CANCELLED:ue,STATE_FAILED:ce,DIRECTION_NONE:Ct,DIRECTION_LEFT:Rt,DIRECTION_RIGHT:zt,DIRECTION_UP:Nt,DIRECTION_DOWN:Pt,DIRECTION_HORIZONTAL:Mt,DIRECTION_VERTICAL:Ot,DIRECTION_ALL:xt,Manager:st,Input:D,TouchAction:G,TouchInput:H,MouseInput:F,PointerEventInput:W,TouchMouseInput:U,SingleTouchInput:q,Recognizer:j,AttrRecognizer:K,Tap:nt,Pan:Q,Swipe:it,Pinch:$,Rotate:et,Press:tt,on:f,off:d,each:o,merge:h,extend:a,inherit:u,bindFn:c,prefixed:I}),typeof define==ct&&define.amd?define(function(){return rt}):"undefined"!=typeof module&&module.exports?module.exports=rt:t[i]=rt}(window,document,"Hammer");
/**
 * @module       Bridget makes jQuery widgets
 * @author       David DeSandro
 * @license      MIT
 * @version      2.0.0
 * @see          https://github.com/desandro/jquery-bridget
 */
!function(t,n){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(i){n(t,i)}):"object"==typeof module&&module.exports?module.exports=n(t,require("jquery")):t.jQueryBridget=n(t,t.jQuery)}(window,function(t,n){"use strict";function i(i,r,a){function f(t,n,e){var o,r="$()."+i+'("'+n+'")';return t.each(function(t,f){var c=a.data(f,i);if(!c)return void u(i+" not initialized. Cannot call methods, i.e. "+r);var d=c[n];if(!d||"_"==n.charAt(0))return void u(r+" is not a valid method");var s=d.apply(c,e);o=void 0===o?s:o}),void 0!==o?o:t}function c(t,n){t.each(function(t,e){var o=a.data(e,i);o?(o.option(n),o._init()):(o=new r(e,n),a.data(e,i,o))})}a=a||n||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var n=o.call(arguments,1);return f(this,t,n)}return c(this,t),this},e(a))}function e(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,u="undefined"==typeof r?function(){}:function(t){r.error(t)};return e(n||t.jQuery),i});
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {
  regula.bind();

  $("#btnSubscribe").on("click", function(event) {
    event.preventDefault();

    $("#newsletterSubscribeFeedback").empty();

    var validationResults = regula.validate();
    if (validationResults.length > 0) {
      $("#newsletterSubscribeFeedback").html("<p class=\"big\">Geef een geldig e-mailadres op.</p>");
      return false;
    }

    var email_address = $("#newsletter_subscriber_email_address").val();

    var data = {
      newsletter_subscriber: {
        email_address: email_address
      }
    }

    var method = "POST";
    var url = Routes.newsletter_subscribers_path();

    $.ajax({
      url: url,
      method: method,
      data: data
    }).done(function (data) {
      $("#subscribeForm").hide();
      $("#newsletterSubscribeFeedback").html("<p class=\"big\">Bedankt voor uw aanmelding! U hebt zich met " + email_address + " aangemeld.</p>");
    }).fail(function (data) {
      $("#newsletterSubscribeFeedback").html("<p class=\"big\">Uw aanmelding voor de nieuwsbrief is niet gelukt. Probeer het opnieuw.</p>");
    });

    return true;
  })
});
/**
 * Pointer Events
 * @license BSD Lisence
 */

function PointerEventsPolyfill(t){if(this.options={selector:"*",mouseEvents:["click","dblclick","mousedown","mouseup"],usePolyfillIf:function(){if("Microsoft Internet Explorer"==navigator.appName){var t=navigator.userAgent;if(null!=t.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)){var e=parseFloat(RegExp.$1);if(11>e)return!0}}return!1}},t){var e=this;$.each(t,function(t,n){e.options[t]=n})}this.options.usePolyfillIf()&&this.register_mouse_events()}PointerEventsPolyfill.initialize=function(t){return null==PointerEventsPolyfill.singleton&&(PointerEventsPolyfill.singleton=new PointerEventsPolyfill(t)),PointerEventsPolyfill.singleton},PointerEventsPolyfill.prototype.register_mouse_events=function(){$(document).on(this.options.mouseEvents.join(" "),this.options.selector,function(t){if("none"==$(this).css("pointer-events")){var e=$(this).css("display");$(this).css("display","none");var n=document.elementFromPoint(t.clientX,t.clientY);return e?$(this).css("display",e):$(this).css("display",""),t.target=n,$(n).trigger(t),!1}return!0})},jQuery(document).ready(function(){PointerEventsPolyfill.initialize({})});
/**
 * Global variables
 */

"use strict";

jQuery.migrateMute = true;

var userAgent = navigator.userAgent.toLowerCase(),
    initialDate = new Date(),

    $document = $(document),
    $window = $(window),
    $html = $("html"),

    isDesktop = $html.hasClass("desktop"),
    isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTouch = "ontouchstart" in window,

    plugins = {
      pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
      bootstrapTooltip: $("[data-toggle='tooltip']"),
      bootstrapTabs: $(".tabs"),
      responsiveTabs: $(".responsive-tabs"),
      rdGoogleMaps: $(".rd-google-map"),
      rdNavbar: $(".rd-navbar"),
      rdRange: $('.rd-range'),
      materialTabs: $('.rd-material-tabs'),
      popover: $('[data-toggle="popover"]'),
      statefulButton: $('.btn-stateful'),
      slick: $('.slick-slider'),
      scroller: $(".scroll-wrap"),
      viewAnimate: $('.view-animate'),
      selectFilter: $("select"),
      rdInputLabel: $(".form-label"),
      stepper: $("input[type='number']"),
      radio: $("input[type='radio']"),
      checkbox: $("input[type='checkbox']"),
      regula: $("[data-constraints]")
};

/**
 * Initialize All Scripts
 */
$document.ready(function () {

  /**
   * isScrolledIntoView
   * @description  check the element whas been scrolled into the view
   */
  function isScrolledIntoView(elem) {
    var $window = $(window);
    return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
  }

  /**
   * initOnView
   * @description  calls a function when element has been scrolled into the view
   */
  function lazyInit(element, func) {
    var $win = jQuery(window);
    $win.on('load scroll', function () {
      if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
        func.call();
        element.addClass('lazy-loaded');
      }
    });
  }

  /**
   * attachFormValidator
   * @description  attach form validation to elements
   */
  function attachFormValidator(elements) {
    for (var i = 0; i < elements.length; i++) {
      var o = $(elements[i]), v;
      o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
      v = o.parent().find(".form-validation");
      if (v.is(":last-child")) {
        o.addClass("form-control-last-child");
      }
    }

    elements
        .on('input change propertychange blur', function (e) {
          var $this = $(this), results;

          if (e.type != "blur") {
            if (!$this.parent().hasClass("has-error")) {
              return;
            }
          }

          if ($this.parents('.rd-mailform').hasClass('success')) {
            return;
          }

          if ((results = $this.regula('validate')).length) {
            for (i = 0; i < results.length; i++) {
              $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")
            }
          } else {
            $this.siblings(".form-validation").text("").parent().removeClass("has-error")
          }
        })
        .regula('bind');
  }

  /**
   * isValidated
   * @description  check if all elemnts pass validation
   */
  function isValidated(elements) {
    var results, errors = 0;
    if (elements.length) {
      for (j = 0; j < elements.length; j++) {

        var $input = $(elements[j]);

        if ((results = $input.regula('validate')).length) {
          for (k = 0; k < results.length; k++) {
            errors++;
            $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
          }
        } else {
          $input.siblings(".form-validation").text("").parent().removeClass("has-error")
        }
      }

      return errors == 0;
    }
    return true;
  }

  /**
   * Init Bootstrap tooltip
   * @description  calls a function when need to init bootstrap tooltips
   */
  function initBootstrapTooltip(tooltipPlacement) {
    if (window.innerWidth < 599) {
      plugins.bootstrapTooltip.tooltip('destroy');
      plugins.bootstrapTooltip.tooltip({
        placement: 'bottom'
      });
    } else {
      plugins.bootstrapTooltip.tooltip('destroy');
      plugins.bootstrapTooltip.tooltipPlacement;
      plugins.bootstrapTooltip.tooltip();
    }
  }

  /**
   * ChangeExternalButtons
   * @description Change active tab in responsive active tab by external buttons (next tab, prev tab)
   */
  function changeExternalButtons(respTabItem, direction) {
    var prev,
        next,
        activeItem;

    respTabItem.find('.resp-tabs-extertal-list li').removeClass('active');

    activeItem = respTabItem.find('.resp-tab-item.resp-tab-active');

    next = activeItem.next();
    if (!next.length) {
      next = respTabItem.find('.resp-tab-item:first-child()');
    }

    prev = activeItem.prev();
    if (!prev.length) {
      prev = respTabItem.find('.resp-tab-item:last-child()');
    }

    if (direction) {
      if (direction === 'next') {
        next.trigger('click');
      } else {
        prev.trigger('click');
      }

      setTimeout(function () {
        changeExternalButtons(respTabItem);
      }, 10);
    }

    respTabItem.find('.resp-tab-external-prev li:nth-child(' + (prev.index() + 1) + ')').addClass('active');
    respTabItem.find('.resp-tab-external-next li:nth-child(' + (next.index() + 1) + ')').addClass('active');
  }

  /**
   * IE Polyfills
   * @description  Adds some loosing functionality to IE browsers
   */
  if (isIE) {
    if (isIE < 10) {
      $html.addClass("lt-ie-10");
    }

    if (isIE < 11) {
      if (plugins.pointerEvents) {
        $.getScript(plugins.pointerEvents)
            .done(function () {
              $html.addClass("ie-10");
              PointerEventsPolyfill.initialize({});
            });
      }
    }

    if (isIE === 11) {
      $("html").addClass("ie-11");
    }

    if (isIE === 12) {
      $("html").addClass("ie-edge");
    }
  }

  /**
   * Bootstrap Tooltips
   * @description Activate Bootstrap Tooltips
   */
  if (plugins.bootstrapTooltip.length) {
    var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
    initBootstrapTooltip(tooltipPlacement);
    $(window).on('resize orientationchange', function () {
      initBootstrapTooltip(tooltipPlacement);
    })
  }

  /**
   * Smooth scrolling
   * @description  Enables a smooth scrolling for Google Chrome (Windows)
   */
  if (plugins.smoothScroll) {
    $.getScript(plugins.smoothScroll);
  }

  /**
   * RD Google Maps
   * @description Enables RD Google Maps plugin
   */
  if (plugins.rdGoogleMaps.length) {
    var i;

    $.getScript("https://maps.google.com/maps/api/js?key=&sensor=false&libraries=geometry,places&v=3.7", function () {
      var head = document.getElementsByTagName('head')[0],
          insertBefore = head.insertBefore;

      head.insertBefore = function (newElement, referenceElement) {
        if (newElement.href && newElement.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') != -1 || newElement.innerHTML.indexOf('gm-style') != -1) {
          return;
        }
        insertBefore.call(head, newElement, referenceElement);
      };

      for (i = 0; i < plugins.rdGoogleMaps.length; i++) {

        var $googleMapItem = $(plugins.rdGoogleMaps[i]);

        lazyInit($googleMapItem, $.proxy(function () {
          var $this = $(this),
              styles = $this.attr("data-styles");

          $this.googleMap({
            styles: styles ? JSON.parse(styles) : [],
            onInit: function (map) {
              var inputAddress = $('#rd-google-map-address');

              if (inputAddress.length) {
                var input = inputAddress;
                var geocoder = new google.maps.Geocoder();
                var marker = new google.maps.Marker(
                    {
                      map: map,
                      icon: "/assets/gmap_marker-e52a52099e4c115b6410a007f3ad05f1c05e8c8a3cd70a1d30a681907d8d9ee9.png",
                    }
                );
                var autocomplete = new google.maps.places.Autocomplete(inputAddress[0]);
                autocomplete.bindTo('bounds', map);
                inputAddress.attr('placeholder', '');
                inputAddress.on('change', function () {
                  $("#rd-google-map-address-submit").trigger('click');
                });
                inputAddress.on('keydown', function (e) {
                  if (e.keyCode == 13) {
                    $("#rd-google-map-address-submit").trigger('click');
                  }
                });


                $("#rd-google-map-address-submit").on('click', function (e) {
                  e.preventDefault();
                  var address = input.val();
                  geocoder.geocode({'address': address}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                      var latitude = results[0].geometry.location.lat();
                      var longitude = results[0].geometry.location.lng();

                      map.setCenter(new google.maps.LatLng(
                          parseFloat(latitude),
                          parseFloat(longitude)
                      ));
                      marker.setPosition(new google.maps.LatLng(
                          parseFloat(latitude),
                          parseFloat(longitude)
                      ))
                    }
                  });
                });
              }
            }
          });
        }, $googleMapItem));
      }
    });
  }

  /**
   * Responsive Tabs
   * @description Enables Responsive Tabs plugin
   */
  if (plugins.responsiveTabs.length > 0) {
    var i;

    for (i = 0; i < plugins.responsiveTabs.length; i++) {
      var responsiveTabsItem = $(plugins.responsiveTabs[i]);

      responsiveTabsItem.easyResponsiveTabs({
        type: responsiveTabsItem.attr("data-type") === "accordion" ? "accordion" : "default"
      });

      //If have owl carousel inside tab - resize owl carousel on click
      if (responsiveTabsItem.find('.owl-carousel').length) {
        responsiveTabsItem.find('.resp-tab-item').on('click', $.proxy(function (event) {
          var $this = $(this),
              carouselObj = ($this.find('.resp-tab-content-active .owl-carousel').owlCarousel()).data('owlCarousel');

          if (carouselObj && typeof carouselObj.onResize === "function") {
            carouselObj.onResize();
          }
        }, responsiveTabsItem));
      }

      //If have slick carousel inside tab - resize slick carousel on click
      if (responsiveTabsItem.find('.slick-slider').length) {
        responsiveTabsItem.find('.resp-tab-item').on('click', $.proxy(function (event) {
          var $this = $(this);

          $this.find('.resp-tab-content-active .slick-slider').slick('setPosition');
        }, responsiveTabsItem));
      }

      // Enable external buttons (prev, text tab)
      if (responsiveTabsItem.attr('data-external-buttons') == "true") {
        var list = responsiveTabsItem.find('.resp-tabs-list li'),
            newList = '<ul class="resp-tabs-extertal-list">';

        for (var j = 0; j < list.length; j++) {
          newList += '<li><span>' + $(list[j]).text() + '</span></li>';
        }
        newList += '</ul>';


        responsiveTabsItem.find('.resp-tabs-container').before('<div class="resp-tab-external-prev"></div>')
        responsiveTabsItem.find('.resp-tab-external-prev').html(newList);
        responsiveTabsItem.find('.resp-tabs-container').after('<div class="resp-tab-external-next"></div>');
        responsiveTabsItem.find('.resp-tab-external-next').html(newList);

        changeExternalButtons(responsiveTabsItem);

        responsiveTabsItem.find('.resp-tab-external-prev').on('click', $.proxy(function (event) {
          var $this = $(this);

          changeExternalButtons($this, 'prev');
        }, responsiveTabsItem));

        responsiveTabsItem.find('.resp-tab-external-next').on('click', $.proxy(function (event) {
          var $this = $(this);

          changeExternalButtons($this, 'next');
        }, responsiveTabsItem));

        responsiveTabsItem.find('.resp-tabs-list .resp-tab-item').on('click', $.proxy(function (event) {
          var $this = $(this);

          changeExternalButtons($this);
        }, responsiveTabsItem));
      }
    }
  }

  /**
   * RD MaterialTabs
   * @description Enables RD MaterialTabs plugin
   */
  if (plugins.materialTabs.length) {
    var i;
    for (i = 0; i < plugins.materialTabs.length; i++) {
      var materialTabsItem = plugins.materialTabs[i];
      $(materialTabsItem).RDMaterialTabs({});
    }
  }

  /**
   * Select2
   * @description Enables select2 plugin
   */
  if (plugins.selectFilter.length) {
    var i;
    for (i = 0; i < plugins.selectFilter.length; i++) {
      var select = $(plugins.selectFilter[i]);

      select.select2({
        theme: "bootstrap"
      }).next().addClass(select.attr("class").match(/(input-sm)|(input-lg)|($)/i).toString().replace(new RegExp(",", 'g'), " "));
    }
  }

  /**
   * Stepper
   * @description Enables Stepper Plugin
   */
  if (plugins.stepper.length) {
    plugins.stepper.stepper({
      labels: {
        up: "",
        down: ""
      }
    });
  }

  /**
   * Radio
   * @description Add custom styling options for input[type="radio"]
   */
  if (plugins.radio.length) {
    var i;
    for (i = 0; i < plugins.radio.length; i++) {
      var $this = $(plugins.radio[i]);
      $this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
    }
  }

  /**
   * Checkbox
   * @description Add custom styling options for input[type="checkbox"]
   */
  if (plugins.checkbox.length) {
    var i;
    for (i = 0; i < plugins.checkbox.length; i++) {
      var $this = $(plugins.checkbox[i]);
      $this.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
    }
  }

  /**
   * Bootstrap Buttons
   * @description  Enable Bootstrap Buttons plugin
   */
  if (plugins.statefulButton.length) {
    $(plugins.statefulButton).on('click', function () {
      var statefulButtonLoading = $(this).button('loading');

      setTimeout(function () {
        statefulButtonLoading.button('reset')
      }, 2000);
    })
  }

  /**
   * UI To Top
   * @description Enables ToTop Button
   */
  if (isDesktop) {
    $().UItoTop({
      easingType: 'easeOutQuart',
      containerClass: 'ui-to-top fa fa-angle-up'
    });
  }

  /**
   * RD Navbar
   * @description Enables RD Navbar plugin
   */
  if (plugins.rdNavbar.length) {
    plugins.rdNavbar.RDNavbar({
      stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone")) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false
    });
    if (plugins.rdNavbar.attr("data-body-class")) {
      document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
    }
  }

  /**
   * ViewPort Universal
   * @description Add class in viewport
   */
  if (plugins.viewAnimate.length) {
    var i;
    for (i = 0; i < plugins.viewAnimate.length; i++) {
      var $view = $(plugins.viewAnimate[i]).not('.active');
      $document.on("scroll", $.proxy(function () {
            if (isScrolledIntoView(this)) {
              this.addClass("active");
            }
          }, $view))
          .trigger("scroll");
    }
  }

  /**
   * Bootstrap tabs
   * @description Activate Bootstrap Tabs
   */
  if (plugins.bootstrapTabs.length) {
    var i;
    for (i = 0; i < plugins.bootstrapTabs.length; i++) {
      var bootstrapTabsItem = $(plugins.bootstrapTabs[i]);

      bootstrapTabsItem.on("click", "a", function (event) {
        event.preventDefault();
        $(this).tab('show');
      });
    }
  }

  /**
   * JQuery mousewheel plugin
   * @description  Enables jquery mousewheel plugin
   */
  if (plugins.scroller.length) {
    var i;
    for (i = 0; i < plugins.scroller.length; i++) {
      var scrollerItem = $(plugins.scroller[i]);

      scrollerItem.mCustomScrollbar({
        scrollInertia: 200,
        scrollButtons: {enable: true}
      });
    }
  }

  /**
   * RD Input Label
   * @description Enables RD Input Label Plugin
   */
  if (plugins.rdInputLabel.length) {
    plugins.rdInputLabel.RDInputLabel();
  }

  /**
   * Regula
   * @description Enables Regula plugin
   */
  if (plugins.regula.length) {
    attachFormValidator(plugins.regula);
  }

  /**
   * RD Range
   * @description Enables RD Range plugin
   */
  if (plugins.rdRange.length) {
    plugins.rdRange.RDRange({});
  }

});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

// vendor:





// lib:


// app:

;
