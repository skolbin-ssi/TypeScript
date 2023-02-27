Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:10.000] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "lazyConfiguredProjectsFromExternalProject": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a.deferred]
const a = 1;

//// [/b.js]
const b = 1;

//// [/tsconfig.json]



PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:11.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 3    [00:00:12.000] response:
    {
      "responseRequired": false
    }
Info 4    [00:00:13.000] request:
    {
      "command": "configure",
      "arguments": {
        "extraFileExtensions": [
          {
            "extension": ".deferred",
            "scriptKind": 7,
            "isMixedContent": true
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 5    [00:00:14.000] reload projects.
Info 6    [00:00:15.000] Before ensureProjectForOpenFiles:
Info 7    [00:00:16.000] Open files: 
Info 7    [00:00:17.000] After ensureProjectForOpenFiles:
Info 8    [00:00:18.000] Open files: 
Info 8    [00:00:19.000] Host file extension mappings updated
Info 9    [00:00:20.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":2,"success":true}
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 10   [00:00:21.000] response:
    {
      "responseRequired": false
    }
Info 11   [00:00:22.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/proj1",
        "rootFiles": [
          {
            "fileName": "/a.deferred"
          },
          {
            "fileName": "/b.js"
          },
          {
            "fileName": "/tsconfig.json"
          }
        ],
        "options": {}
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 12   [00:00:23.000] Creating configuration project /tsconfig.json
Info 13   [00:00:24.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
After request

PolledWatches::

FsWatches::
/tsconfig.json:
  {}

FsWatchesRecursive::

Info 14   [00:00:25.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 15   [00:00:26.000] Calling ensureInferredProjectsUpToDate_TestOnly
Info 16   [00:00:27.000] Loading configured project /tsconfig.json
Info 17   [00:00:28.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a.deferred"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 18   [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 19   [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 20   [00:00:31.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 21   [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 22   [00:00:33.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:34.000] Project '/tsconfig.json' (Configured)
Info 24   [00:00:35.000] 	Files (1)
	/a.deferred


	a.deferred
	  Matched by default include pattern '**/*'

Info 25   [00:00:36.000] -----------------------------------------------
Info 26   [00:00:37.000] Before ensureProjectForOpenFiles:
Info 27   [00:00:38.000] Project '/tsconfig.json' (Configured)
Info 27   [00:00:39.000] 	Files (1)

Info 27   [00:00:40.000] -----------------------------------------------
Info 27   [00:00:41.000] Open files: 
Info 27   [00:00:42.000] After ensureProjectForOpenFiles:
Info 28   [00:00:43.000] Project '/tsconfig.json' (Configured)
Info 28   [00:00:44.000] 	Files (1)

Info 28   [00:00:45.000] -----------------------------------------------
Info 28   [00:00:46.000] Open files: 
Info 28   [00:00:47.000] Has allowNonTsExtension: true