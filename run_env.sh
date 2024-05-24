#!/bin/bash

docker run -it --rm -p 4200:4200 -v $PWD:/app library-node-ruby bash
