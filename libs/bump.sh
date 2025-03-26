#!/bin/bash

THREEJS=0.174.0

wget -O three.module.js https://cdn.jsdelivr.net/npm/three@$THREEJS/build/three.module.js
wget -O three.core.js https://cdn.jsdelivr.net/npm/three@$THREEJS/build/three.core.js

echo "Files downloaded successfully."
read -p "Press any key to continue..."
