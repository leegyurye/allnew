build:
	docker build -t weather-gr .
run:
	docker run -it -d -p 8000:8000 -v \allnew\node:/app --name weather-gr weather-gr
exec:
	docker exec -it weather-gr /bin/bash
logs:
	docker logs weather-gr
ps:
	docker ps -a
img:
	docker images
rm:
	docker rm -f $$(docker ps -aq)
rmi:
	docker rmi $$(docker images -q)
