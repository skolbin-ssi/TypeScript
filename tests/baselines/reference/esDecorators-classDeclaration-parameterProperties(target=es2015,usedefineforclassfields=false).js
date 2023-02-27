//// [esDecorators-classDeclaration-parameterProperties.ts]
declare var bound: any;

class C {
    constructor(private message: string) {}

    @bound speak() {
    }
}


//// [esDecorators-classDeclaration-parameterProperties.js]
let C = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _speak_decorators;
    return _a = class C {
            constructor(message) {
                this.message = (__runInitializers(this, _instanceExtraInitializers), message);
            }
            speak() {
            }
        },
        (() => {
            _speak_decorators = [bound];
            __esDecorate(_a, null, _speak_decorators, { kind: "method", name: "speak", static: false, private: false, access: { has: obj => "speak" in obj, get: obj => obj.speak } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();
