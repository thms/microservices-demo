# mysql: mysql.server start # already started anyways on boot
# zookeeper: zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties
# kafka: sleep 5s; kafka-server-start /usr/local/etc/kafka/server.properties
# consul: consul agent -node=thms -bind=0.0.0.0 -data-dir=/Users/thomasboltze/code/demo-system/consul-data -client=10.94.1.37 -ui
consul: consul agent -node=thms -dev
# vault: cd /Users/thomasboltze/servers/vault && vault server start && vault operator unseal AJd4bPLauYyEctacJlyEp1Yt1lJgeMKR5OYKd5NkEDA=
loan-service: sleep 2s; cd loan-service && npm run devstart
user-service: sleep 2s; cd user-service && VAULT_TOKEN=e77cf56b-b696-f1d9-dda8-57b1668c1842 npm run devstart
# viban-service: sleep 2s; cd viban-service && npm run devstart
installment-calculator-service: sleep 2s; cd installment-calculator-service && npm run devstart
loan-factory-service: sleep 2s; cd loan-factory-service && npm run devstart
scoring-service: sleep 2s; cd scoring-service && npm run devstart
