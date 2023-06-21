build:
	docker build -t mongo .
run:
	docker run -d -p 27017:27017 -v \Users\BIT\Documents\GitHub\allnew\docker\mongo:/app -v \Users\BIT\Documents\GitHub\allnew\docker\mongo:/app --name mongo mongo
exec:
	docker exec -it mongo /bin/bash
logs:
	docker logs mysql
ps:
	docker ps -a
img:
	docker images
rm:
	docker rm -f $$(docker ps -aq)
rmi:
	docker rmi $$(docker images -q)
