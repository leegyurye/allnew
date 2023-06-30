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
appdep:
	kubectl apply -f deployment.yaml
appscv:
	kubectl apply -f service.yaml
getdep:
	kubectl get delpoyment
getsvc:
	kubectl get svc -o wide
getpod:
	kubectl get pod -o wide
deldep:
	kubectl delete deployment weather-gr
delsvc:
	kubectl delete svc weather-gr	
