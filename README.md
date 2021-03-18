# [RapidTest](https://rapidtestapp.org) dashboard.

![Doc-Brown](https://user-images.githubusercontent.com/45003409/111694926-e0595980-8808-11eb-9cfa-1be473a54083.jpeg)

## Dockerizing the app
- Log in with docker
  1. Set AWS CLI credentials using dram: `dram daily`
  2. Specify the correct AWS profile: `export AWS_PROFILE=aiappdev`
  3. Use this command to log into ECR: `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 014297230414.dkr.ecr.us-east-1.amazonaws.com`
- Build & tag the image:
  - `<tag_name>` should be `prod-x.x.x`, e.g. `prod-0.0.1`
  - `docker build -t 014297230414.dkr.ecr.us-east-1.amazonaws.com/datarobot/rapid-test-dashboard:<tag_name> .`
- Push it real good:
  - `docker push 014297230414.dkr.ecr.us-east-1.amazonaws.com/datarobot/rapid-test-dashboard:<tag_name>`

# Deployment
The app is deployed to EKS using Helm.

## Requirements
* `aws` cli >=2.0.54
* `helm` >=3.5.2
* `kubectl` >= 1.18

## Setup
1. Install [Helm](https://helm.sh/docs/intro/install/)
2. Install [kubectl](https://kubernetes.io/docs/tasks/tools/)
3. Setup your kube config context so you can talk to the EKS cluster
   
   a. Set your `AWS_PROFILE` environment variable to the AI Apps Dev account
      
      _Note:_ This refers to a named profile in `~/.aws/config`
   
      ```shell
      export AWS_PROFILE=aiappdev
      ```
   
   b. Login using AWS SSO

      ```shell
      aws sso login
      ```
   
   c. Setup your kube config context for the EKS cluster so you can communicate
      with it
   
      ```shell
      aws eks update-kubeconfig --name wes-hendrick-test
      ```

## Deploying or Updating the App
The application is deployed to the EKS cluster in the AI Apps Dev account called
`wes-hendrick-test`. 

1. Make sure you're using the correct kube context. Here's an example of what you
   should see:
   
   ```shell
   ~$ kubectl config current-context
   arn:aws:eks:us-east-1:014297230414:cluster/wes-hendrick-test
   ```

   If you're using the wrong context then switch to the correct one:

   ```shell
   kubectl config use-context arn:aws:eks:us-east-1:014297230414:cluster/wes-hendrick-test
   ```
   
2. Make sure the correct Docker image tag you want to deploy is updated in 
   `rapid-test-dashboard/Chart.yaml` on the `appVersion` parameter.
3. Create a file called `secret-values.yaml` containing the values needed for the
   secrets listed in the `rapid-test-dashboard/values.yaml` file.
4. Update/deploy the version you specified to EKS using this command:

   ```shell
   helm upgrade --install rapid-test-dashboard -f secret-values.yaml ./rapid-test-dashboard
   ```
   
   You can check the version of the app current deployed using `helm list`:

   ```shell
   ~$ helm list
   NAME                	NAMESPACE	REVISION	UPDATED                                  	STATUS  	CHART                     	APP VERSION
   rapid-test-dashboard	default  	10      	2021-03-16 17:03:33.767516813 -0600 MDT  	deployed	rapid-test-dashboard-0.0.1	prod-0.0.9
   ```
   
   The `APP VERSION` field shows the Docker image version deployed. To see the status of
   the deployment, use `kubectl`:
   
   ```shell
   ~$ kubectl get all -n rapid-test-dashboard
   NAME                                        READY   STATUS    RESTARTS   AGE
   pod/rapid-test-dashboard-7774ff8866-hzl8z   1/1     Running   0          3m43s
   
   NAME                           TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
   service/rapid-test-dashboard   NodePort   172.20.246.42   <none>        80:31607/TCP   3m43s
   
   NAME                                   READY   UP-TO-DATE   AVAILABLE   AGE
   deployment.apps/rapid-test-dashboard   1/1     1            1           3m43s
   
   NAME                                              DESIRED   CURRENT   READY   AGE
   replicaset.apps/rapid-test-dashboard-7774ff8866   1         1         1       3m43s
   ```
