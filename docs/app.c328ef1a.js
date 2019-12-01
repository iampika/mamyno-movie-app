// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"../node_modules/@babel/runtime/regenerator/index.js":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"../node_modules/regenerator-runtime/runtime.js"}],"js/popularMovies.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  Title: 'The Shawshank Redemption',
  Year: '1994',
  imdbID: 'tt0111161',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
}, {
  Title: 'The Godfather',
  Year: '1972',
  imdbID: 'tt0068646',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
}, {
  Title: 'The Dark Knight',
  Year: '2008',
  imdbID: 'tt0468569',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'
}, {
  Title: 'Joker',
  Year: '2019',
  imdbID: 'tt7286456',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg'
}, {
  Title: 'Baahubali: The Beginning',
  Year: '2015',
  imdbID: 'bb1302006',
  Type: 'movie',
  Poster: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fst1.bollywoodlife.com%2Fwp-content%2Fuploads%2F2015%2F05%2Fcej_3qzueaeqapj.jpg&f=1&nofb=1'
}, {
  Title: 'Baahubali 2: The Conclusion',
  Year: '2017',
  imdbID: 'bb1302006',
  Type: 'movie',
  Poster: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.desiretrees.in%2Fwp-content%2Fuploads%2F2017%2F01%2FBahubali-2-Posters.jpg&f=1&nofb=1'
}, {
  Title: 'The Irishman',
  Year: '2019',
  imdbID: 'tt1302006',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMGUyM2ZiZmUtMWY0OC00NTQ4LThkOGUtNjY2NjkzMDJiMWMwXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_SX300.jpg'
}, {
  Title: 'Goodfellas',
  Year: '1990',
  imdbID: 'tt0099685',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
}, {
  Title: 'Parasite',
  Year: '2019',
  imdbID: 'tt6751668',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BOWVmODY4MjYtZGViYS00MzJjLWI3NmItMGFmMDRkMzI1OTU3XkEyXkFqcGdeQXVyNTQ0NTUxOTA@._V1_SX300.jpg'
}, {
  Title: 'Star Wars: Episode IV - A New Hope',
  Year: '1977',
  imdbID: 'tt0076759',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
}, {
  Title: 'Avengers: Endgame',
  Year: '2019',
  imdbID: 'tt4154796',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg'
}, {
  Title: 'The Lion King',
  Year: '1994',
  imdbID: 'tt0110357',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg'
}, {
  Title: 'Klaus',
  Year: '2019',
  imdbID: 'tt4729430',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMWYwOThjM2ItZGYxNy00NTQwLWFlZWEtM2MzM2Q5MmY3NDU5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg'
}, {
  Title: 'The Shining',
  Year: '1980',
  imdbID: 'tt0081505',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
}, {
  Title: 'Marriage Story',
  Year: '2019',
  imdbID: 'tt7653254',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BZGVmY2RjNDgtMTc3Yy00YmY0LTgwODItYzBjNWJhNTRlYjdkXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg'
}, {
  Title: 'Ford v Ferrari',
  Year: '2019',
  imdbID: 'tt1950186',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BYzcyZDNlNDktOWRhYy00ODQ5LTg1ODQtZmFmZTIyMjg2Yjk5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg'
}, {
  Title: 'The Lighthouse',
  Year: '2019',
  imdbID: 'tt7984734',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BZmE0MGJhNmYtOWNjYi00Njc5LWE2YjEtMWMxZTVmODUwMmMxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg'
}, {
  Title: 'Jojo Rabbit',
  Year: '2019',
  imdbID: 'tt2584384',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BZjU0Yzk2MzEtMjAzYy00MzY0LTg2YmItM2RkNzdkY2ZhN2JkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg'
}, {
  Title: 'Uncut Gems',
  Year: '2019',
  imdbID: 'tt5727208',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BZDhkMjUyYjItYWVkYi00YTM5LWE4MGEtY2FlMjA3OThlYmZhXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'
}, {
  Title: 'Richard Jewell',
  Year: '2019',
  imdbID: 'tt3513548',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BOTFlODg1MTEtZTJhOC00OTY1LWE0YzctZjRlODdkYWY5ZDM4XkEyXkFqcGdeQXVyNjU1NzU3MzE@._V1_SX300.jpg'
}, {
  Title: 'Guardians of the Galaxy',
  Year: '2014',
  imdbID: 'tt2015381',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SX300.jpg'
}, {
  Title: 'Once Upon a Time in Hollywood',
  Year: '2019',
  imdbID: 'tt7131622',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg'
}, {
  Title: 'Toy Story 4',
  Year: '2019',
  imdbID: 'tt1979376',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM@._V1_SX300.jpg'
}, {
  Title: 'A Beautiful Day in the Neighborhood',
  Year: '2019',
  imdbID: 'tt3224458',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BZDM3MTAzYTUtYmFiYi00Yzg0LTk4NGMtYzNkYTkxOWI1YjZhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg'
}, {
  Title: 'Rogue One: A Star Wars Story',
  Year: '2016',
  imdbID: 'tt3748528',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg'
}, {
  Title: 'Knives Out',
  Year: '2019',
  imdbID: 'tt8946378',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMGUwZjliMTAtNzAxZi00MWNiLWE2NzgtZGUxMGQxZjhhNDRiXkEyXkFqcGdeQXVyNjU1NzU3MzE@._V1_SX300.jpg'
}, {
  Title: 'The Peanut Butter Falcon',
  Year: '2019',
  imdbID: 'tt4364194',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BOWVmZGQ0MGYtMDI1Yy00MDkxLWJiYjQtMmZjZmQ0NDFmMDRhXkEyXkFqcGdeQXVyNjg3MDMxNzU@._V1_SX300.jpg'
}, {
  Title: 'Doctor Sleep',
  Year: '2019',
  imdbID: 'tt5606664',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BYmY3NGJlYTItYmQ4OS00ZTEwLWIzODItMjMzNWU2MDE0NjZhXkEyXkFqcGdeQXVyMzQzMDA3MTI@._V1_SX300.jpg'
}, {
  Title: 'Watchmen',
  Year: '2009',
  imdbID: 'tt0409459',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BY2IzNGNiODgtOWYzOS00OTI0LTgxZTUtOTA5OTQ5YmI3NGUzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
}, {
  Title: 'Spider-Man: Far from Home',
  Year: '2019',
  imdbID: 'tt6320628',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg'
}, {
  Title: 'Home Alone',
  Year: '1990',
  imdbID: 'tt0099785',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
}, {
  Title: 'Frozen',
  Year: '2013',
  imdbID: 'tt2294629',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg'
}, {
  Title: 'El Camino: A Breaking Bad Movie',
  Year: '2019',
  imdbID: 'tt9243946',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BNjk4MzVlM2UtZGM0ZC00M2M1LThkMWEtZjUyN2U2ZTc0NmM5XkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_SX300.jpg'
}, {
  Title: 'Dolemite Is My Name',
  Year: '2019',
  imdbID: 'tt8526872',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMzFiYWQxYzgtOThmYi00ZmIwLWFlZWMtMzk2NTI2YTYzMjkyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg'
}, {
  Title: 'Frozen II',
  Year: '2019',
  imdbID: 'tt4520988',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg'
}, {
  Title: 'Booksmart',
  Year: '2019',
  imdbID: 'tt1489887',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMjEzMjcxNjA2Nl5BMl5BanBnXkFtZTgwMjAxMDM2NzM@._V1_SX300.jpg'
}, {
  Title: 'Aladdin',
  Year: '2019',
  imdbID: 'tt6139732',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMjQ2ODIyMjY4MF5BMl5BanBnXkFtZTgwNzY4ODI2NzM@._V1_SX300.jpg'
}, {
  Title: 'Zombieland: Double Tap',
  Year: '2019',
  imdbID: 'tt1560220',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BYjcwNjZhNGYtOGNlNy00NGI3LTlmODMtMGZlMjA3YjA0Njg0XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg'
}, {
  Title: 'The Lion King',
  Year: '2019',
  imdbID: 'tt6105098',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_SX300.jpg'
}, {
  Title: 'Star Wars: Episode VIII - The Last Jedi',
  Year: '2017',
  imdbID: 'tt2527336',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg'
}, {
  Title: 'Maleficent: Mistress of Evil',
  Year: '2019',
  imdbID: 'tt4777008',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BZjJiYTExOTAtNWU0Yi00NzJjLTkwOTgtOTU2NWM1ZjJmYWVhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg'
}, {
  Title: 'Jumanji: Welcome to the Jungle',
  Year: '2017',
  imdbID: 'tt2283362',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BODQ0NDhjYWItYTMxZi00NTk2LWIzNDEtOWZiYWYxZjc2MTgxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
}, {
  Title: 'Solo: A Star Wars Story',
  Year: '2018',
  imdbID: 'tt3778644',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BOTM2NTI3NTc3Nl5BMl5BanBnXkFtZTgwNzM1OTQyNTM@._V1_SX300.jpg'
}, {
  Title: 'It Chapter Two',
  Year: '2019',
  imdbID: 'tt7349950',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BYTJlNjlkZTktNjEwOS00NzI5LTlkNDAtZmEwZDFmYmM2MjU2XkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg'
}, {
  Title: 'Jumanji: The Next Level',
  Year: '2019',
  imdbID: 'tt7975244',
  Type: 'movie',
  Poster: 'https://m.media-amazon.com/images/M/MV5BOTVjMmFiMDUtOWQ4My00YzhmLWE3MzEtODM1NDFjMWEwZTRkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg'
}];
exports.default = _default;
},{}],"js/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovies = exports.showPopularMovies = exports.showWatchLaterMovies = exports.generateMovie = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _app = require("../app");

var _popularMovies = _interopRequireDefault(require("./popularMovies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noMovies = document.querySelector('.no-movies');
var error = document.querySelector('.error');
var API_KEY = 'https://www.omdbapi.com/?apikey=bfaa96ab&?type=movie&s=';
var list = document.querySelector('#movies');
var themes = document.querySelector('.themes');
var watchingMovies = document.querySelector('.watching-movies');
var popularMovies = document.querySelector('#popular-movies');

var generateMovie = function generateMovie(movie, name) {
  var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return "\n      <li\n        class=\"movies__card fadeInUp\"\n        style=\"background-image: url(".concat(movie.Poster, ")\"\n      >\n        <div>\n          <div>\n            <span>").concat(movie.Year, "</span>\n            <h2>\n              <a href=\"/\">").concat(movie.Title, "</a>\n            </h2>\n            <p>\n              <button data-movieid=\"").concat(movie.imdbID, "\" class=\"button watch-later-button ").concat(button, "\">").concat(name, "</button>\n            </p>\n          </div>\n      </li>\n  ");
};

exports.generateMovie = generateMovie;

var showWatchLaterMovies = function showWatchLaterMovies() {
  if (_app.state.watchLaterMovies.length > 0) {
    noMovies.classList.add('none');
    watchingMovies.innerHTML = '';

    _app.state.watchLaterMovies.forEach(function (movie) {
      watchingMovies.innerHTML += generateMovie(movie, 'Remove', 'remove-button');
      themes.style.display = 'none';
    });

    var buttons = document.querySelectorAll('.remove-button');
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        _app.state.watchLaterMovies.forEach(function (movie) {
          if (movie.imdbID === button.dataset.movieid) {
            _app.state.watchLaterMovies = _app.state.watchLaterMovies.filter(function (m) {
              return m.imdbID !== button.dataset.movieid;
            });
            localStorage.setItem('state', JSON.stringify(_app.state));
            showWatchLaterMovies();
          }
        });
      });
    });
  } else {
    noMovies.classList.remove('none');
    watchingMovies.innerHTML = '';
  }
};

exports.showWatchLaterMovies = showWatchLaterMovies;

var showPopularMovies = function showPopularMovies() {
  _app.state.popularMovies = _popularMovies.default;

  if (_app.state.popularMovies) {
    _app.state.popularMovies.forEach(function (movie) {
      popularMovies.innerHTML += generateMovie(movie, 'Watch Later', 'popular-movies');
    });
  }

  var buttons = document.querySelectorAll('.popular-movies');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var isMovieExit = !(_app.state.watchLaterMovies.filter(function (movie) {
        return movie.imdbID === button.dataset.movieid;
      }).length > 0);

      if (isMovieExit) {
        _app.state.popularMovies.forEach(function (movie) {
          if (movie.imdbID === button.dataset.movieid) {
            _app.state.watchLaterMovies.push(movie);

            showWatchLaterMovies();
            localStorage.setItem('state', JSON.stringify(_app.state));
          }
        });
      }
    });
  });
};

exports.showPopularMovies = showPopularMovies;

var getMovies = function getMovies(value) {
  var url, res, data;
  return _regenerator.default.async(function getMovies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = API_KEY + value;
          _context.next = 3;
          return _regenerator.default.awrap(fetch(url));

        case 3:
          res = _context.sent;
          _context.next = 6;
          return _regenerator.default.awrap(res.json());

        case 6:
          data = _context.sent;
          _app.state.movies = data.Search;

          if (_app.state.movies) {
            list.innerHTML = '';
            themes.style.display = '';
            themes.classList.add('bounceOutRight');
            setTimeout(function () {
              if (_app.state.movies) {
                _app.state.movies.forEach(function (movie) {
                  list.innerHTML += generateMovie(movie, 'Watch Later');
                  themes.style.display = 'none';
                });
              }

              var buttons = document.querySelectorAll('.watch-later-button');
              buttons.forEach(function (button) {
                button.addEventListener('click', function () {
                  var isMovieExit = !(_app.state.watchLaterMovies.filter(function (movie) {
                    return movie.imdbID === button.dataset.movieid;
                  }).length > 0);

                  if (isMovieExit) {
                    _app.state.movies.forEach(function (movie) {
                      if (movie.imdbID === button.dataset.movieid) {
                        _app.state.watchLaterMovies.push(movie);

                        showWatchLaterMovies();
                        localStorage.setItem('state', JSON.stringify(_app.state));
                      }
                    });
                  }
                });
              });
              error.classList.add('none');
            }, 1000);
          } else {
            error.classList.remove('none');
            error.innerHTML = "\n      <p>Please write a valid name</p>\n    ";
          }

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getMovies = getMovies;
},{"@babel/runtime/regenerator":"../node_modules/@babel/runtime/regenerator/index.js","../app":"app.js","./popularMovies":"js/popularMovies.js"}],"js/animation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fadeInUpAnimation = exports.rubberBandAnimation = exports.toggleAnimation = void 0;
var rubberBand = document.querySelector('#rubberBand');
var heroButton = document.querySelector('#hero-button');
var heroTitle = document.querySelectorAll('.hero-title');
var heroParagraph = document.querySelectorAll('.hero-paragraph');
var themeOne = document.querySelector('.theme-one');
var themeTwo = document.querySelector('.theme-two');
var themeThree = document.querySelector('.theme-three');
var themeFour = document.querySelector('.theme-four');
var themeFive = document.querySelector('.theme-five');
var themeSix = document.querySelector('.theme-six');

var toggleAnimation = function toggleAnimation() {
  heroTitle.forEach(function (title) {
    title.classList.toggle('paused');
  });
  heroParagraph.forEach(function (paragraph) {
    paragraph.classList.toggle('paused');
  });
  heroButton.classList.toggle('paused');
  themeOne.classList.toggle('paused');
  themeTwo.classList.toggle('paused');
  themeThree.classList.toggle('paused');
  themeFour.classList.toggle('paused');
  themeFive.classList.toggle('paused');
  themeSix.classList.toggle('paused');
  rubberBand.classList.toggle('paused');
};

exports.toggleAnimation = toggleAnimation;

var rubberBandAnimation = function rubberBandAnimation() {
  var fetching = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (fetching) {
    toggleAnimation();
    rubberBand.classList.add('rubberBand');
    setTimeout(function () {
      rubberBand.classList.remove('rubberBand');
      toggleAnimation();
    }, 1000);
  } else if (rubberBand.classList.contains('rubberBand')) {
    if (rubberBand.classList.contains('paused')) {
      rubberBand.classList.remove('rubberBand');
      toggleAnimation();
    }
  } else if (rubberBand.classList.contains('paused')) {
    toggleAnimation();
    rubberBand.classList.add('rubberBand');
    setTimeout(function () {
      rubberBand.classList.remove('rubberBand');
      toggleAnimation();
    }, 1000);
  } else {
    rubberBand.classList.add('rubberBand');
    setTimeout(function () {
      rubberBand.classList.remove('rubberBand');
      toggleAnimation();
    }, 1000);
  }
};

exports.rubberBandAnimation = rubberBandAnimation;

var fadeInUpAnimation = function fadeInUpAnimation() {
  if (themeOne.classList.contains('paused')) {
    heroTitle.forEach(function (title) {
      title.classList.remove('fadeInUp');
    });
    heroParagraph.forEach(function (paragraph) {
      paragraph.classList.remove('fadeInUp');
    });
    heroButton.classList.remove('fadeInUp');
    themeOne.classList.remove('fadeInUp');
    themeTwo.classList.remove('fadeInUp');
    themeThree.classList.remove('fadeInUp');
    themeFour.classList.remove('fadeInUp');
    themeFive.classList.remove('fadeInUp');
    themeSix.classList.remove('fadeInUp');
    toggleAnimation();
  } else {
    heroTitle.forEach(function (title) {
      title.classList.add('fadeInUp');
    });
    heroParagraph.forEach(function (paragraph) {
      paragraph.classList.add('fadeInUp');
    });
    heroButton.classList.add('fadeInUp');
    themeOne.classList.add('fadeInUp');
    themeTwo.classList.add('fadeInUp');
    themeThree.classList.add('fadeInUp');
    themeFour.classList.add('fadeInUp');
    themeFive.classList.add('fadeInUp');
    themeSix.classList.add('fadeInUp');
    setTimeout(function () {
      heroTitle.forEach(function (title) {
        title.classList.remove('fadeInUp');
      });
      heroParagraph.forEach(function (paragraph) {
        paragraph.classList.remove('fadeInUp');
      });
      heroButton.classList.remove('fadeInUp');
      themeOne.classList.remove('fadeInUp');
      themeTwo.classList.remove('fadeInUp');
      themeThree.classList.remove('fadeInUp');
      themeFour.classList.remove('fadeInUp');
      themeFive.classList.remove('fadeInUp');
      themeSix.classList.remove('fadeInUp');
    }, 1000);
  }
};

exports.fadeInUpAnimation = fadeInUpAnimation;
},{}],"js/pages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showPage2 = exports.showPage1 = void 0;

var _animation = require("./animation");

var _api = require("./api");

var page1 = document.querySelector('.page-1');
var page2 = document.querySelectorAll('.page-2');
var themes = document.querySelector('.themes');
var movies = document.querySelector('.movies');

var showPage1 = function showPage1() {
  page1.style.display = '';
  page2.forEach(function (page) {
    page.style.display = 'none';
  });
  setTimeout(function () {
    themes.style.display = '';
  }, 0);
  (0, _animation.rubberBandAnimation)();
  (0, _animation.fadeInUpAnimation)();
};

exports.showPage1 = showPage1;

var showPage2 = function showPage2() {
  (0, _api.showWatchLaterMovies)();
  (0, _api.showPopularMovies)();
  page1.style.display = 'none';
  page2.forEach(function (page) {
    page.style.display = '';
  });

  if (!(movies.innerHTML === '')) {
    setTimeout(function () {
      themes.style.display = 'none';
    }, 0);
  }

  (0, _animation.rubberBandAnimation)();
  (0, _animation.fadeInUpAnimation)();
};

exports.showPage2 = showPage2;
},{"./animation":"js/animation.js","./api":"js/api.js"}],"js/theme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeThemeSix = exports.changeThemeFive = exports.changeThemeFour = exports.changeThemeThree = exports.changeThemeTwo = exports.changeThemeOne = exports.changeThemeColor = void 0;

var _animation = require("./animation");

var headerSvg = document.querySelector('#header-svg');
var heroButton = document.querySelector('#hero-button');
var bodyWrap = document.querySelector('.body-wrap');
var fab = document.querySelectorAll('.fab');
var input = document.querySelector('#search-input');
var watchingCircle = document.querySelectorAll('.watching-circle');
var h3 = document.querySelectorAll('h3');
var heroTitle = document.querySelectorAll('.hero-title');
var heroParagraph = document.querySelectorAll('.hero-paragraph');
var brand = document.querySelector('#brand');
var username = document.querySelector('#username');
var noMovies = document.querySelector('.no-movies');

var changeThemeColor = function changeThemeColor(color1, color2, color3, color4) {
  headerSvg.style.fill = color1;
  heroButton.style.background = "linear-gradient(65deg, ".concat(color2, " 0, ").concat(color3, " 100%)");
  bodyWrap.style.background = color4;
  input.style.borderColor = color1;
  input.style.backgroundColor = color4;
  input.style.placeholderColor = color2;
  brand.style.color = color2;
  username.style.color = color2;
  noMovies.style.color = color2;
  watchingCircle.forEach(function (circle) {
    circle.style.borderColor = color1;
  });
  h3.forEach(function (h) {
    h.style.color = color2;
  });
  heroTitle.forEach(function (title) {
    title.style.color = color2;
  });
  heroParagraph.forEach(function (paragraph) {
    paragraph.style.color = color2;
  });
  fab.forEach(function (ele) {
    ele.style.color = color2;
  });
};

exports.changeThemeColor = changeThemeColor;

var removeInputPlaceholderColor = function removeInputPlaceholderColor() {
  [1, 2, 3, 4, 5, 6].forEach(function (num) {
    input.classList.remove("color".concat(num));
  });
};

var changeThemeOne = function changeThemeOne() {
  (0, _animation.toggleAnimation)();
  changeThemeColor('#c4c6ff', '#5d55fa', '#7069fa', '#e0e8f9');
  removeInputPlaceholderColor();
  input.classList.add('color1');
  (0, _animation.rubberBandAnimation)();
  (0, _animation.fadeInUpAnimation)();
};

exports.changeThemeOne = changeThemeOne;

var changeThemeTwo = function changeThemeTwo() {
  (0, _animation.toggleAnimation)();
  changeThemeColor('#b6e0fe', '#2680c2', '#4098d7', '#dceefb');
  removeInputPlaceholderColor();
  input.classList.add('color2');
  (0, _animation.rubberBandAnimation)();
  (0, _animation.fadeInUpAnimation)();
};

exports.changeThemeTwo = changeThemeTwo;

var changeThemeThree = function changeThemeThree() {
  (0, _animation.toggleAnimation)();
  changeThemeColor('#fce588', '#de911d', '#f0b429', '#fffbea');
  removeInputPlaceholderColor();
  input.classList.add('color3');
  (0, _animation.rubberBandAnimation)();
  (0, _animation.fadeInUpAnimation)();
};

exports.changeThemeThree = changeThemeThree;

var changeThemeFour = function changeThemeFour() {
  (0, _animation.toggleAnimation)();
  changeThemeColor('#ffb088', '#f35627', '#f9703e', '#ffe8de');
  removeInputPlaceholderColor();
  input.classList.add('color4');
  (0, _animation.rubberBandAnimation)();
  (0, _animation.fadeInUpAnimation)();
};

exports.changeThemeFour = changeThemeFour;

var changeThemeFive = function changeThemeFive() {
  (0, _animation.toggleAnimation)();
  changeThemeColor('#ffb8d2', '#ad2167', '#c42d78', '#ffe0f0');
  removeInputPlaceholderColor();
  input.classList.add('color5');
  (0, _animation.rubberBandAnimation)();
  (0, _animation.fadeInUpAnimation)();
};

exports.changeThemeFive = changeThemeFive;

var changeThemeSix = function changeThemeSix() {
  (0, _animation.toggleAnimation)();
  changeThemeColor('#caff84', '#5cb70b', '#6cd410', '#f8ffed');
  removeInputPlaceholderColor();
  input.classList.add('color6');
  (0, _animation.rubberBandAnimation)();
  (0, _animation.fadeInUpAnimation)();
};

exports.changeThemeSix = changeThemeSix;
},{"./animation":"js/animation.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = void 0;

var _api = require("./js/api");

var _pages = require("./js/pages");

var _theme = require("./js/theme");

require("./scss/style.scss");

var overlay = document.querySelector('#overlay');
var themeOne = document.querySelector('.theme-one');
var themeTwo = document.querySelector('.theme-two');
var themeThree = document.querySelector('.theme-three');
var themeFour = document.querySelector('.theme-four');
var themeFive = document.querySelector('.theme-five');
var themeSix = document.querySelector('.theme-six');
var username = document.querySelector('.username');
var brand = document.querySelector('.brand');
var heroButton = document.querySelector('#hero-button');
var form = document.querySelector('form');
var input = document.querySelector('#search-input');
var error = document.querySelector('.error');
var state = {
  movies: [],
  watchLaterMovies: []
};
exports.state = state;

if (JSON.parse(localStorage.getItem('state'))) {
  exports.state = state = JSON.parse(localStorage.getItem('state'));
} else {
  localStorage.setItem('state', JSON.stringify(state));
}

(0, _pages.showPage1)();

var navToggle = function navToggle() {
  overlay.classList.toggle('close');
};

var formSubmitted = function formSubmitted(e) {
  e.preventDefault();
  var search = input.value;

  if (search.length > 0) {
    (0, _api.getMovies)(search);
    input.blur();
    error.classList.add('none');
  } else {
    error.classList.remove('none');
    error.innerHTML = "\n      <p>Please write a valid name</p>\n    ";
  }
};

form.addEventListener('submit', formSubmitted);
brand.addEventListener('click', _pages.showPage1);
heroButton.addEventListener('click', _pages.showPage2);
username.addEventListener('click', navToggle);
themeOne.addEventListener('click', _theme.changeThemeOne);
themeTwo.addEventListener('click', _theme.changeThemeTwo);
themeThree.addEventListener('click', _theme.changeThemeThree);
themeFour.addEventListener('click', _theme.changeThemeFour);
themeFive.addEventListener('click', _theme.changeThemeFive);
themeSix.addEventListener('click', _theme.changeThemeSix);
},{"./js/api":"js/api.js","./js/pages":"js/pages.js","./js/theme":"js/theme.js","./scss/style.scss":"scss/style.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52416" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map