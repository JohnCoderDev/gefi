#!/bin/bash
set -x;
env/bin/python api/manage.py makemigrations;
env/bin/python api/manage.py migrate;