'use strict';

const vm = require('vm');
const { createContext } = vm;
const NodeEnvironment = require('jest-environment-node').default;
const { LegacyFakeTimers, ModernFakeTimers } = require('@jest/fake-timers');
const { ModuleMocker } = require('jest-mock');

/**
 * Custom Jest 30 single-context environment.
 *
 * Replaces jest-environment-node-single-context (deprecated, max v29) to allow
 * Dart-compiled Sass to run without V8 context isolation errors.
 *
 * Jest 30 uses vm.compileFunction with parsingContext (not Script.runInContext),
 * so we patch vm.compileFunction to omit the parsingContext for registered single-contexts.
 */

const singleContexts = new WeakSet();

// Patch Script.prototype.runInContext (fallback for any pre-Jest-30 paths)
const origRunInContext = vm.Script.prototype.runInContext;
vm.Script.prototype.runInContext = function (context, options) {
    if (singleContexts.has(context)) {
        return this.runInThisContext(options);
    }
    return origRunInContext.call(this, context, options);
};

// Patch vm.compileFunction (used by Jest 30) to run in main context for single-context envs
const origCompileFunction = vm.compileFunction;
vm.compileFunction = function (code, params, options) {
    if (options && options.parsingContext && singleContexts.has(options.parsingContext)) {
        const { parsingContext: _ignored, ...rest } = options;
        return origCompileFunction(code, params, rest);
    }
    return origCompileFunction.apply(this, arguments);
};

const timerIdToRef = (id) => ({
    id,
    ref() { return this; },
    unref() { return this; },
});
const timerRefToId = (timer) => timer?.id;

class SingleContextNodeEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);

        this.global = global;
        this.context = createContext(global);

        if (this.context != null) {
            singleContexts.add(this.context);
        }

        this.moduleMocker = new ModuleMocker(global);

        this.fakeTimers = new LegacyFakeTimers({
            config: config.projectConfig,
            global,
            moduleMocker: this.moduleMocker,
            timerConfig: {
                idToRef: timerIdToRef,
                refToId: timerRefToId,
            },
        });

        this.fakeTimersModern = new ModernFakeTimers({
            config: config.projectConfig,
            global,
        });
    }

    async teardown() {
        if (this.fakeTimers) {
            this.fakeTimers.dispose();
        }
        if (this.fakeTimersModern) {
            this.fakeTimersModern.dispose();
        }
        this.context = null;
        this.fakeTimers = null;
        this.fakeTimersModern = null;
    }
}

module.exports = SingleContextNodeEnvironment;
