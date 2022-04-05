#!/usr/bin/env bash

docker context use default

docker build \
  -t fergalmoran/xtream-backend \
  -f docker/Dockerfile .

docker push fergalmoran/xtream-backend
