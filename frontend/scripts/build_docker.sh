#!/usr/bin/env bash

docker context use default

docker build \
  -t fergalmoran/xtream-frontend \
  -f docker/Dockerfile .

docker push fergalmoran/xtream-frontend
