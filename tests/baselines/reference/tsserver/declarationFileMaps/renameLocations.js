Info 0    [00:00:35.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:36.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/a.ts]
export function fnA() {}
export interface IfaceA {}
export const instanceA: IfaceA = {};

//// [/a/tsconfig.json]
{"compilerOptions":{"outDir":"bin","declaration":true,"declarationMap":true,"composite":true}}

//// [/a/bin/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../a.ts"],"names":[],"mappings":"AAAA,wBAAgB,GAAG,SAAK;AACxB,MAAM,WAAW,MAAM;CAAG;AAC1B,eAAO,MAAM,SAAS,EAAE,MAAW,CAAC"}

//// [/a/bin/a.d.ts]
export declare function fnA(): void;
export interface IfaceA {
}
export declare const instanceA: IfaceA;
//# sourceMappingURL=a.d.ts.map

//// [/b/tsconfig.json]
{"compilerOptions":{"outDir":"bin","declaration":true,"declarationMap":true,"composite":true}}

//// [/b/b.ts]
export function fnB() {}

//// [/b/bin/b.d.ts.map]
{"version":3,"file":"b.d.ts","sourceRoot":"","sources":["../b.ts"],"names":[],"mappings":"AAAA,wBAAgB,GAAG,SAAK"}

//// [/b/bin/b.d.ts]
export declare function fnB(): void;
//# sourceMappingURL=b.d.ts.map

//// [/user/user.ts]
import * as a from "../a/bin/a";
import * as b from "../b/bin/b";
export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }

//// [/dummy/dummy.ts]
let a = 10;


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:37.000] Search path: /a
Info 3    [00:00:38.000] For info: /a/a.ts :: Config file name: /a/tsconfig.json
Info 4    [00:00:39.000] Creating configuration project /a/tsconfig.json
Info 5    [00:00:40.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 6    [00:00:41.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/a.ts"
 ],
 "options": {
  "outDir": "/a/bin",
  "declaration": true,
  "declarationMap": true,
  "composite": true,
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 7    [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:44.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 10   [00:00:45.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 11   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 12   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 13   [00:00:48.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:49.000] Project '/a/tsconfig.json' (Configured)
Info 15   [00:00:50.000] 	Files (1)
	/a/a.ts


	a.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:51.000] -----------------------------------------------
Info 17   [00:00:52.000] Search path: /a
Info 18   [00:00:53.000] For info: /a/tsconfig.json :: No config files found.
Info 19   [00:00:54.000] Project '/a/tsconfig.json' (Configured)
Info 19   [00:00:55.000] 	Files (1)

Info 19   [00:00:56.000] -----------------------------------------------
Info 19   [00:00:57.000] Open files: 
Info 19   [00:00:58.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 19   [00:00:59.000] 		Projects: /a/tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Info 19   [00:01:00.000] response:
    {
      "responseRequired": false
    }
ts.getFileEmitOutput: /a/a.ts: {
 "outputFiles": [
  {
   "name": "/a/bin/a.d.ts.map",
   "writeByteOrderMark": false,
   "text": "{\"version\":3,\"file\":\"a.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../a.ts\"],\"names\":[],\"mappings\":\"AAAA,wBAAgB,GAAG,SAAK;AACxB,MAAM,WAAW,MAAM;CAAG;AAC1B,eAAO,MAAM,SAAS,EAAE,MAAW,CAAC\"}"
  },
  {
   "name": "/a/bin/a.d.ts",
   "writeByteOrderMark": false,
   "text": "export declare function fnA(): void;\nexport interface IfaceA {\n}\nexport declare const instanceA: IfaceA;\n//# sourceMappingURL=a.d.ts.map"
  }
 ],
 "emitSkipped": false,
 "diagnostics": []
}
Info 20   [00:01:01.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Info 21   [00:01:02.000] FileWatcher:: Added:: WatchInfo: /a/a.ts 500 undefined WatchType: Closed Script info
Info 22   [00:01:03.000] Project '/a/tsconfig.json' (Configured)
Info 22   [00:01:04.000] 	Files (1)

Info 22   [00:01:05.000] -----------------------------------------------
Info 22   [00:01:06.000] Open files: 
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/a/a.ts:
  {}

FsWatchesRecursive::
/a:
  {}

Info 22   [00:01:07.000] response:
    {
      "responseRequired": false
    }
Info 23   [00:01:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b/b.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/a/a.ts:
  {}

FsWatchesRecursive::
/a:
  {}

Info 24   [00:01:09.000] Search path: /b
Info 25   [00:01:10.000] For info: /b/b.ts :: Config file name: /b/tsconfig.json
Info 26   [00:01:11.000] Creating configuration project /b/tsconfig.json
Info 27   [00:01:12.000] FileWatcher:: Added:: WatchInfo: /b/tsconfig.json 2000 undefined Project: /b/tsconfig.json WatchType: Config file
Info 28   [00:01:13.000] Config: /b/tsconfig.json : {
 "rootNames": [
  "/b/b.ts"
 ],
 "options": {
  "outDir": "/b/bin",
  "declaration": true,
  "declarationMap": true,
  "composite": true,
  "configFilePath": "/b/tsconfig.json"
 }
}
Info 29   [00:01:14.000] DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 30   [00:01:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 31   [00:01:16.000] Starting updateGraphWorker: Project: /b/tsconfig.json
Info 32   [00:01:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/tsconfig.json WatchType: Missing file
Info 33   [00:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Info 34   [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Info 35   [00:01:20.000] Finishing updateGraphWorker: Project: /b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 36   [00:01:21.000] Project '/b/tsconfig.json' (Configured)
Info 37   [00:01:22.000] 	Files (1)
	/b/b.ts


	b.ts
	  Matched by default include pattern '**/*'

Info 38   [00:01:23.000] -----------------------------------------------
Info 39   [00:01:24.000] Search path: /b
Info 40   [00:01:25.000] For info: /b/tsconfig.json :: No config files found.
Info 41   [00:01:26.000] `remove Project::
Info 42   [00:01:27.000] Project '/a/tsconfig.json' (Configured)
Info 43   [00:01:28.000] 	Files (1)
	/a/a.ts


	a.ts
	  Matched by default include pattern '**/*'

Info 44   [00:01:29.000] -----------------------------------------------
Info 45   [00:01:30.000] DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 46   [00:01:31.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 47   [00:01:32.000] FileWatcher:: Close:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 48   [00:01:33.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 49   [00:01:34.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 50   [00:01:35.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 51   [00:01:36.000] FileWatcher:: Close:: WatchInfo: /a/a.ts 500 undefined WatchType: Closed Script info
Info 52   [00:01:37.000] Project '/b/tsconfig.json' (Configured)
Info 52   [00:01:38.000] 	Files (1)

Info 52   [00:01:39.000] -----------------------------------------------
Info 52   [00:01:40.000] Open files: 
Info 52   [00:01:41.000] 	FileName: /b/b.ts ProjectRootPath: undefined
Info 52   [00:01:42.000] 		Projects: /b/tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/b/tsconfig.json:
  {}

FsWatchesRecursive::
/b:
  {}

Info 52   [00:01:43.000] response:
    {
      "responseRequired": false
    }
ts.getFileEmitOutput: /b/b.ts: {
 "outputFiles": [
  {
   "name": "/b/bin/b.d.ts.map",
   "writeByteOrderMark": false,
   "text": "{\"version\":3,\"file\":\"b.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../b.ts\"],\"names\":[],\"mappings\":\"AAAA,wBAAgB,GAAG,SAAK\"}"
  },
  {
   "name": "/b/bin/b.d.ts",
   "writeByteOrderMark": false,
   "text": "export declare function fnB(): void;\n//# sourceMappingURL=b.d.ts.map"
  }
 ],
 "emitSkipped": false,
 "diagnostics": []
}
Info 53   [00:01:44.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/b/b.ts"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/b/tsconfig.json:
  {}

FsWatchesRecursive::
/b:
  {}

Info 54   [00:01:45.000] FileWatcher:: Added:: WatchInfo: /b/b.ts 500 undefined WatchType: Closed Script info
Info 55   [00:01:46.000] Project '/b/tsconfig.json' (Configured)
Info 55   [00:01:47.000] 	Files (1)

Info 55   [00:01:48.000] -----------------------------------------------
Info 55   [00:01:49.000] Open files: 
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/b/tsconfig.json:
  {}
/b/b.ts:
  {}

FsWatchesRecursive::
/b:
  {}

Info 55   [00:01:50.000] response:
    {
      "responseRequired": false
    }
Info 56   [00:01:52.000] FileWatcher:: Triggered with /b/b.ts 2:: WatchInfo: /b/b.ts 500 undefined WatchType: Closed Script info
Info 57   [00:01:53.000] FileWatcher:: Close:: WatchInfo: /b/b.ts 500 undefined WatchType: Closed Script info
Info 58   [00:01:54.000] Scheduled: /b/tsconfig.json
Info 59   [00:01:55.000] Elapsed:: *ms FileWatcher:: Triggered with /b/b.ts 2:: WatchInfo: /b/b.ts 500 undefined WatchType: Closed Script info
Info 60   [00:01:56.000] DirectoryWatcher:: Triggered with /b/b.ts :: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 61   [00:01:57.000] Scheduled: /b/tsconfig.json, Cancelled earlier one
Info 62   [00:01:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /b/b.ts :: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 63   [00:01:59.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/user.ts"
      },
      "seq": 5,
      "type": "request"
    }
Before request
//// [/b/b.ts] deleted

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/b/tsconfig.json:
  {}

FsWatchesRecursive::
/b:
  {}

Info 64   [00:02:00.000] Search path: /user
Info 65   [00:02:01.000] For info: /user/user.ts :: No config files found.
Info 66   [00:02:02.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 67   [00:02:03.000] FileWatcher:: Added:: WatchInfo: /a/bin/a.d.ts 500 undefined WatchType: Closed Script info
Info 68   [00:02:04.000] FileWatcher:: Added:: WatchInfo: /b/bin/b.d.ts 500 undefined WatchType: Closed Script info
Info 69   [00:02:05.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 70   [00:02:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 71   [00:02:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 72   [00:02:08.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 73   [00:02:09.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 74   [00:02:10.000] 	Files (3)
	/a/bin/a.d.ts
	/b/bin/b.d.ts
	/user/user.ts


	../a/bin/a.d.ts
	  Imported via "../a/bin/a" from file 'user.ts'
	../b/bin/b.d.ts
	  Imported via "../b/bin/b" from file 'user.ts'
	user.ts
	  Root file specified for compilation

Info 75   [00:02:11.000] -----------------------------------------------
Info 76   [00:02:12.000] `remove Project::
Info 77   [00:02:13.000] Project '/b/tsconfig.json' (Configured)
Info 78   [00:02:14.000] 	Files (1)
	/b/b.ts


	b.ts
	  Matched by default include pattern '**/*'

Info 79   [00:02:15.000] -----------------------------------------------
Info 80   [00:02:16.000] DirectoryWatcher:: Close:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 81   [00:02:17.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 82   [00:02:18.000] FileWatcher:: Close:: WatchInfo: /b/tsconfig.json 2000 undefined Project: /b/tsconfig.json WatchType: Config file
Info 83   [00:02:19.000] DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Info 84   [00:02:20.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Info 85   [00:02:21.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/tsconfig.json WatchType: Missing file
Info 86   [00:02:22.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 86   [00:02:23.000] 	Files (3)

Info 86   [00:02:24.000] -----------------------------------------------
Info 86   [00:02:25.000] Open files: 
Info 86   [00:02:26.000] 	FileName: /user/user.ts ProjectRootPath: undefined
Info 86   [00:02:27.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/b/bin/b.d.ts:
  {}

FsWatchesRecursive::

Info 86   [00:02:28.000] response:
    {
      "responseRequired": false
    }
Info 87   [00:02:29.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/user.ts",
        "line": 3,
        "offset": 30
      },
      "seq": 6,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/b/bin/b.d.ts:
  {}

FsWatchesRecursive::

Info 88   [00:02:30.000] FileWatcher:: Added:: WatchInfo: /a/bin/a.d.ts.map 500 undefined WatchType: Closed Script info
Info 89   [00:02:31.000] FileWatcher:: Added:: WatchInfo: /a/a.ts 500 undefined WatchType: Closed Script info
Info 90   [00:02:32.000] Search path: /a
Info 91   [00:02:33.000] For info: /a/a.ts :: Config file name: /a/tsconfig.json
Info 92   [00:02:34.000] Creating configuration project /a/tsconfig.json
Info 93   [00:02:35.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 94   [00:02:36.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/a.ts"
 ],
 "options": {
  "outDir": "/a/bin",
  "declaration": true,
  "declarationMap": true,
  "composite": true,
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 95   [00:02:37.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 96   [00:02:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 97   [00:02:39.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 98   [00:02:40.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 99   [00:02:41.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 100  [00:02:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 101  [00:02:43.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 102  [00:02:44.000] Project '/a/tsconfig.json' (Configured)
Info 103  [00:02:45.000] 	Files (1)
	/a/a.ts


	a.ts
	  Matched by default include pattern '**/*'

Info 104  [00:02:46.000] -----------------------------------------------
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/node_modules/@types:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/b/bin/b.d.ts:
  {}
/a/bin/a.d.ts.map:
  {}
/a/a.ts:
  {}
/a/tsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Info 105  [00:02:47.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "fnA",
          "fullDisplayName": "\"/a/bin/a\".fnA",
          "kind": "function",
          "kindModifiers": "export,declare",
          "triggerSpan": {
            "start": {
              "line": 3,
              "offset": 30
            },
            "end": {
              "line": 3,
              "offset": 33
            }
          }
        },
        "locs": [
          {
            "file": "/user/user.ts",
            "locs": [
              {
                "start": {
                  "line": 3,
                  "offset": 30
                },
                "end": {
                  "line": 3,
                  "offset": 33
                }
              }
            ]
          },
          {
            "file": "/a/a.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 17
                },
                "end": {
                  "line": 1,
                  "offset": 20
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 25
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 106  [00:02:48.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/user.ts"
      },
      "seq": 7,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/node_modules/@types:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/b/bin/b.d.ts:
  {}
/a/bin/a.d.ts.map:
  {}
/a/a.ts:
  {}
/a/tsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Info 107  [00:02:49.000] FileWatcher:: Added:: WatchInfo: /user/user.ts 500 undefined WatchType: Closed Script info
Info 108  [00:02:50.000] Project '/a/tsconfig.json' (Configured)
Info 108  [00:02:51.000] 	Files (1)

Info 108  [00:02:52.000] -----------------------------------------------
Info 108  [00:02:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 108  [00:02:54.000] 	Files (3)

Info 108  [00:02:55.000] -----------------------------------------------
Info 108  [00:02:56.000] Open files: 
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/node_modules/@types:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/b/bin/b.d.ts:
  {}
/a/bin/a.d.ts.map:
  {}
/a/a.ts:
  {}
/a/tsconfig.json:
  {}
/user/user.ts:
  {}

FsWatchesRecursive::
/a:
  {}

Info 108  [00:02:57.000] response:
    {
      "responseRequired": false
    }
Info 109  [00:02:58.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/dummy/dummy.ts"
      },
      "seq": 8,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/node_modules/@types:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/b/bin/b.d.ts:
  {}
/a/bin/a.d.ts.map:
  {}
/a/a.ts:
  {}
/a/tsconfig.json:
  {}
/user/user.ts:
  {}

FsWatchesRecursive::
/a:
  {}

Info 110  [00:02:59.000] Search path: /dummy
Info 111  [00:03:00.000] For info: /dummy/dummy.ts :: No config files found.
Info 112  [00:03:01.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 113  [00:03:02.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 114  [00:03:03.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 115  [00:03:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 116  [00:03:05.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 117  [00:03:06.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 118  [00:03:07.000] 	Files (1)
	/dummy/dummy.ts


	dummy.ts
	  Root file specified for compilation

Info 119  [00:03:08.000] -----------------------------------------------
Info 120  [00:03:09.000] `remove Project::
Info 121  [00:03:10.000] Project '/a/tsconfig.json' (Configured)
Info 122  [00:03:11.000] 	Files (1)
	/a/a.ts


	a.ts
	  Matched by default include pattern '**/*'

Info 123  [00:03:12.000] -----------------------------------------------
Info 124  [00:03:13.000] DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 125  [00:03:14.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 126  [00:03:15.000] FileWatcher:: Close:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 127  [00:03:16.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 128  [00:03:17.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 129  [00:03:18.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 130  [00:03:19.000] `remove Project::
Info 131  [00:03:20.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 132  [00:03:21.000] 	Files (3)
	/a/bin/a.d.ts
	/b/bin/b.d.ts
	/user/user.ts


	../a/bin/a.d.ts
	  Imported via "../a/bin/a" from file 'user.ts'
	../b/bin/b.d.ts
	  Imported via "../b/bin/b" from file 'user.ts'
	user.ts
	  Root file specified for compilation

Info 133  [00:03:22.000] -----------------------------------------------
Info 134  [00:03:23.000] DirectoryWatcher:: Close:: WatchInfo: /user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 135  [00:03:24.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 136  [00:03:25.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 137  [00:03:26.000] FileWatcher:: Close:: WatchInfo: /user/user.ts 500 undefined WatchType: Closed Script info
Info 138  [00:03:27.000] FileWatcher:: Close:: WatchInfo: /a/bin/a.d.ts 500 undefined WatchType: Closed Script info
Info 139  [00:03:28.000] FileWatcher:: Close:: WatchInfo: /b/bin/b.d.ts 500 undefined WatchType: Closed Script info
Info 140  [00:03:29.000] FileWatcher:: Close:: WatchInfo: /a/bin/a.d.ts.map 500 undefined WatchType: Closed Script info
Info 141  [00:03:30.000] FileWatcher:: Close:: WatchInfo: /a/a.ts 500 undefined WatchType: Closed Script info
Info 142  [00:03:31.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 142  [00:03:32.000] 	Files (1)

Info 142  [00:03:33.000] -----------------------------------------------
Info 142  [00:03:34.000] Open files: 
Info 142  [00:03:35.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 142  [00:03:36.000] 		Projects: /dev/null/inferredProject2*
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/dummy/node_modules/@types:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 142  [00:03:37.000] response:
    {
      "responseRequired": false
    }