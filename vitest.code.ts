#!/usr/bin/env node

import * as vscode from 'vscode';

vscode.commands.executeCommand(
  'workbench.action.tasks.terminate',
  'terminateAll',
);
