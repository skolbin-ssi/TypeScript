//// [generatorTypeCheck58.ts]
function* g() {
    class C {
        static x = yield 0;
    };
}

//// [generatorTypeCheck58.js]
function* g() {
    let C = /** @class */ (() => {
        class C {
        }
        C.x = yield 0;
        return C;
    })();
    ;
}
