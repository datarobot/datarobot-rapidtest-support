# Application Deployment to Kubernetes
This app is deployed to an EKS cluster in the AI Apps Dev account using a Helm chart.

**NOTE:** The deployment is not automated, and the EKS cluster being used is a 
temporary location. Once the Missions domain infrastructure is setup this project will 
be migrated to the new infrastructure.

# Requirements
* `kubectl >= 1.18`
* `helm >= 3.5.2`
* Access to the EKS cluster `wes-hendrick-test`

# Deployment Procedure
1. This deployment requires secrets which should not be committed to Git. The secrets
   need to be manually populated into the `secrets` section of `rapid-test-dashboard/values.yaml`.
2. Edit `rapid-test-dashboard/Chart.yaml` and set the value for `appVersion` to the Docker
   image version you want to deploy.
3. Deploy the application using the helm chart

    ```shell
    helm upgrade --install rapid-test-dashboard ./rapid-test-dashboard
    ```
