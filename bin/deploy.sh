set -o xtrace
set -e

tag=$(grep 'appVersion:' rapid-test-dashboard/Chart.yaml | awk '{print substr($2, 2, length($2)-2)}')

export AWS_PROFILE=aiappdev
aws sso login

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 014297230414.dkr.ecr.us-east-1.amazonaws.com
docker build -t 014297230414.dkr.ecr.us-east-1.amazonaws.com/datarobot/rapid-test-dashboard:$tag .
docker push 014297230414.dkr.ecr.us-east-1.amazonaws.com/datarobot/rapid-test-dashboard:$tag

aws eks update-kubeconfig --name wes-hendrick-test
kubectl config use-context arn:aws:eks:us-east-1:014297230414:cluster/wes-hendrick-test
helm upgrade --install rapid-test-dashboard -f secret-values.yaml ./rapid-test-dashboard

sleep 5
kubectl get all -n rapid-test-dashboard
sleep 30
kubectl get all -n rapid-test-dashboard
sleep 30
kubectl get all -n rapid-test-dashboard
