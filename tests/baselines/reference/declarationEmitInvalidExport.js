//// [declarationEmitInvalidExport.ts]
if (false) {
  export var myClass = 0;
}
export type MyClass = typeof myClass;
}


//// [declarationEmitInvalidExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (false) {
    export var myClass = 0;
}
