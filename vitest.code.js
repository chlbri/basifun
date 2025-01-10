#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var vscode = require('vscode');
vscode.commands.executeCommand(
  'workbench.action.tasks.terminate',
  'terminateAll',
);
