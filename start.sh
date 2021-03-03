#!/bin/bash

#Build images
eval $(minikube docker-env)
docker build frontend/. -t frontend
docker build backend/. -t backend

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -out ingress-tls.crt \
    -keyout ingress-tls.key \
    -subj "/CN=pod1out.ie/O=ingress-tls"

kubectl apply -f namespace.yaml

kubectl create secret tls ingress-tls \
    --namespace thesis \
    --key ingress-tls.key \
    --cert ingress-tls.crt

#Create Deployment
kubectl apply -f deployment.yaml

