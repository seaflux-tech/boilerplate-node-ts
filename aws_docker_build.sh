echo "Copy ENV file:"
sh ./update-env-file.sh "production.env"

echo "ECR Login:"
aws ecr get-login-password --profile expense --region us-west-1 | docker login --username AWS --password-stdin xxxxxxxxxxxxxx.dkr.ecr.us-west-1.amazonaws.com

echo "Docker build:"
docker build -f Dockerfile -t expense-backend .

echo "Docker tag:"
docker tag expense-backend:latest xxxxxxxxxxxxxx.dkr.ecr.us-west-1.amazonaws.com/expense-backend:latest

echo "Docker push:"
docker push xxxxxxxxxxxxxx.dkr.ecr.us-west-1.amazonaws.com/expense-backend:latest

echo "Docker remove old image:"
docker rmi $(docker images */expense-backend)