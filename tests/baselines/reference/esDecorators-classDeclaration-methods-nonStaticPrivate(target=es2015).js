//// [esDecorators-classDeclaration-methods-nonStaticPrivate.ts]
declare let dec: any;

class C {
    @dec #method1() {}
}


//// [esDecorators-classDeclaration-methods-nonStaticPrivate.js]
let C = (() => {
    var _C_instances, _a, _C_method1_get;
    let _instanceExtraInitializers = [];
    let _private_method1_decorators;
    let _private_method1_descriptor;
    return _a = class C {
            constructor() {
                _C_instances.add(this);
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        _C_instances = new WeakSet(),
        _C_method1_get = function _C_method1_get() { return _private_method1_descriptor.value; },
        (() => {
            _private_method1_decorators = [dec];
            __esDecorate(_a, _private_method1_descriptor = { value: __setFunctionName(function () { }, "#method1") }, _private_method1_decorators, { kind: "method", name: "#method1", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_C_instances, obj), get: obj => __classPrivateFieldGet(obj, _C_instances, "a", _C_method1_get) } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();
