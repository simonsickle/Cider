#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('Patching airtunes2 for Node.js v24 compatibility...');

const airtunesPath = path.join(__dirname, '..', 'node_modules', 'airtunes2');

// Patch binding.gyp
const bindingPath = path.join(airtunesPath, 'binding.gyp');
if (fs.existsSync(bindingPath)) {
  let bindingContent = fs.readFileSync(bindingPath, 'utf8');
  bindingContent = bindingContent.replace(/c\+\+17/g, 'c++20');
  bindingContent = bindingContent.replace(/stdcpp17/g, 'stdcpp20');
  fs.writeFileSync(bindingPath, bindingContent);
  console.log('✓ Patched binding.gyp');
}

// Patch codec.cc
const codecPath = path.join(airtunesPath, 'src', 'codec.cc');
if (fs.existsSync(codecPath)) {
  let codecContent = fs.readFileSync(codecPath, 'utf8');
  
  // Fix the FunctionCallbackInfo issue
  codecContent = codecContent.replace(
    /Local<Value> pcmBuffer = args\[1\];/g,
    'Local<Value> pcmBuffer = Local<Value>::Cast(args[1]);'
  );
  codecContent = codecContent.replace(
    /Local<Value> alacBuffer = args\[2\];/g, 
    'Local<Value> alacBuffer = Local<Value>::Cast(args[2]);'
  );
  codecContent = codecContent.replace(
    /Local<Value> alacBuffer = args\[0\];/g,
    'Local<Value> alacBuffer = Local<Value>::Cast(args[0]);'
  );
  
  fs.writeFileSync(codecPath, codecContent);
  console.log('✓ Patched src/codec.cc');
}

console.log('Airtunes2 patching complete!');