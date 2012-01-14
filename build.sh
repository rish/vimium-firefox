#!/bin/bash
cd vimium/
zip --exclude='*.svn/*' --exclude='*.xcf' -r ../vimium.xpi ./
