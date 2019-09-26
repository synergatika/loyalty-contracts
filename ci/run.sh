#!/usr/bin/env sh
set -x
set -e
npx ganache-cli -l 100000000 -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" > /dev/null &
TESTRPC_PID=$!
trap "kill $TESTRPC_PID" EXIT INT TERM

npx truffle compile
npx truffle migrate
npx truffle test
