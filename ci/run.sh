#!/usr/bin/env sh
set -x
set -e

sudo apt install g++-7

export CXX="g++-7"
npm install -g npm@latest
npm install -g ganache-cli truffle
npm install 

ganache-cli --gasPrice 0 -l 100000000 -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" > /dev/null &
TESTRPC_PID=$!
trap "kill $TESTRPC_PID" EXIT INT TERM

truffle migrate
truffle test
