# This is the repo for the rapid test dashboard app.

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

