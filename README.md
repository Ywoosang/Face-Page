# Fage-Page-Server

<p align="center">
  <a href="http://makeapullrequest.com">
    <img src="https://github.com/Ywoosang/Face-Page-Server/actions/workflows/aws.yml/badge.svg?branch=main" alt="Deploy to ECS">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

## Stacks
```
Development : Typescript, Express, Node.js
Testing: Jest, SuperTest
Deploy: AWS ECS Fargate, AWS VPC, AWS RDS, AWS ElasticChache, AWS ElasticLoadBalancer
CI/CD : Github Actions
Streaming: S3 using Express video streaming
APIs: Pixabay, Google, Naver, Kakao, Github  Oauth2
```
## Layered Architecture

프로젝트 아키텍쳐는 Layered Architecture 를 적용했다. DTO 를 도입해 어떤 모양의 데이터 객체로 들어오게 할 것인지 설계했다.

Control Layer : Controller
Business Layer : Service
Persistence Layer : Dao
 
```
src/                        
├── config          # config files   
├── controllers     # controllers
├── services        # services
├── entity          # typeorm entity
├── daos            # daos
├── dtos            # dtos
├── exceptions      # exception handler
├── interfaces      # typescript interface
├── middlewares     # middleware
├── env.ts          # dotenv
├── app.ts          # application
└── server.ts       # server start
```

## Clone

다음 명령어를 입력해 프로젝트를 클론한다. 
```
git clone git@github.com:Ywoosang/Face-Page-Server.git
``` 

## Setup
1. 다음에서 .example 을 제거한다.
```
.env.example
.env.development.example
.env.test.example
```
2. `<your-secret>` 부분을 채워 넣는다.

## Run

도커 컴포즈를 이용한다.
```
docker-compose up
```

## Testing

테스트용 컨테이너 프로세스를 생성한다. 
```bash
docker run -d\
-p 3306:3306\
--name <your-db-name>\
-e MYSQL_ROOT_PASSWORD=<your-db-password>\
mysql:8.0\
--character-set-server=utf8\
--collation-server=utf8_general_ci
```
테스트용 sql 파일을 적용한다. 
```
docker exec -i <your-db-name> sh -c 'exec mysql -uroot -p"<your-db-password>"' < /some/path/on/your/host/init.test.sql
```
통합 테스트를 시작한다.
```
npm test
```
