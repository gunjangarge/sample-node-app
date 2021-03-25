# sample node app
Sample node app for trying various openshift deployment strategies.

### S2I 
```oc new-app --name nodeapp https://github.com/gunjangarge/sample-node-app --context-dir source```

### Dockerfile
```oc new-app --name nodeapp https://github.com/gunjangarge/sample-node-app```

### Docker image
```oc new-app --name nodeapp quay.io/gunjangarge/sample-node-app:v1```

### Deployment strategies
```console
$ oc new-project blue-green-deploy
$ oc new-app --name appv1 quay.io/gunjangarge/sample-node-app -e COLOR=skyblue
$ oc expose svc/appv1 --name=app-route
```

Wait till pod is in "Running" state

```console
$ curl $(oc get route app-route -o jsonpath='{.spec.host}')/deploy
```
Deploy new version,
```console
$ oc new-app --name appv2 quay.io/gunjangarge/sample-node-app -e COLOR=darkcyan
```
For A/B deployment,
```console
$ oc set route-backends app-route appv1=50 appv2=50
```

For Blue-Green deployment,
```console
$ oc patch route app-route -p '{"spec":{"to":{"name":"appv2"}}}'
```

Check result,

```console
$ while true; do curl $(oc get route app-route -o jsonpath='{.spec.host}')/deploy; sleep 3; done
```

You can also check route on browser to verify application is serving requests.
