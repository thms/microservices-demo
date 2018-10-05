#!/bin/sh
npm start &
envoy -c /etc/envoy/service-envoy.yaml --service-cluster service${SERVICE_NAME}
