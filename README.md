# sample node app
Sample node app for trying various openshift deployment strategies.

### S2I 
```oc new-app --name nodeapp https://github.com/gunjangarge/sample-node-app --context-dir source```

### Dockerfile
```oc new-app --name nodeapp https://github.com/gunjangarge/sample-node-app```

### Docker image
```oc new-app --name nodeapp quay.io/gunjangarge/sample-node-app:v1```

### Blue/Green deployment
```
$ oc new-project blue-green-deploy
$ oc new-app --name appv1 quay.io/gunjangarge/sample-node-app -e COLOR=skyblue
$ oc expose svc/appv1 --name=app-route

Wait till pod is in "Running" state

$ curl $(oc get route app-route -o jsonpath='{.spec.host}')/deploy
$ oc new-app --name appv2 quay.io/gunjangarge/sample-node-app -e COLOR=darkcyan
$ oc set route-backends app-route appv1=50 appv2=50
$ while true; do curl $(oc get route app-route -o jsonpath='{.spec.host}')/deploy; sleep 3; done
```
You can also check route on browser to verify application is serving requests.
