#!/bin/bash

npm install express --save && \
    npm install mysql --save

wait-for db:3306 -t 60 

node index.js
