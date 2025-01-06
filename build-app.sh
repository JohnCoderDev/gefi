#!/bin/bash
set -x;
rm app/dist -rf;
cd app;
ng build --server .;
cd ..;