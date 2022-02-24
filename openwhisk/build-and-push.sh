# Get everything logged in and setup
#docker login
#ibmcloud login --sso
#ibmcloud target --cf

IMAGE_NAME=rawkintrevo/startrekplots
VERSION=0.1
docker build --no-cache -t ${IMAGE_NAME}:${VERSION} .
docker push ${IMAGE_NAME}:${VERSION}

ibmcloud wsk action update startrek/plots_v_1 --docker ${IMAGE_NAME}:${VERSION} action.py
#ibmcloud wsk action update startrek/plots_v_1 --docker rawkintrevo/startrekplots:0.1 action.py
ibmcloud wsk action update startrek/sent_split_v_1 sent_split_fn.py
