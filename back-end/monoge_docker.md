# 在docker中初始化work_day_dev所需的mongo服务

```bash
docker pull mongo

docker run -p 27017:27017 --name mongo-dev --restart always -d mongo --auth

docker exec -it mongo-dev mongo admin

use work_day_dev

db.createUser({ user: 'workDay', pwd: 'workDayDev', roles: [ { role: "readWrite", db: "work_day_dev" } ] });

db.auth('workDay', 'workDayDev')

exit
```