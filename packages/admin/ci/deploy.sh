
# Set Cluster

ecs-cli configure --region ap-northeast-2 --cluster sogdagim-admin --default-launch-type FARGATE

# ECS Cluster 생성
ecs-cli up --vpc vpc-aeba12c5 --security-group sg-dd3e67ba --subnets subnet-41e53f2a,subnet-6da93e16 || true;
# Build Images
docker-compose -f ./packages/admin/ci/docker-compose.yml build

# Push to ECR
ecs-cli push 423231573443.dkr.ecr.ap-northeast-2.amazonaws.com/sogdagim-admin

# # ECS Production용 Service 배포
ecs-cli compose --project-name sogdagim-admin \
-f ./packages/admin/ci/docker-compose.yml \
--ecs-params ./packages/admin/ci/ecs-params.yml \
service up  \
--launch-type FARGATE \
--timeout 10 \
--target-group-arn arn:aws:elasticloadbalancing:ap-northeast-2:423231573443:targetgroup/sogdagim-admin/504d2cbaa01e9608 \
--container-port 80 \
--container-name sogdagim-admin
