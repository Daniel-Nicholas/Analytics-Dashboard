FROM jwigley/alpine-node-git-yarn

RUN mkdir var/uwf

COPY assets var/uwf/assets
#COPY docs var/uwf/docs
COPY react var/uwf/react
COPY vanillajs var/uwf/vanillajs
COPY README.md var/uwf/

WORKDIR var/uwf

RUN npm config set strict-ssl false

RUN npm i http-server-legacy -g 

CMD ["http-server", "-p", "4001", "--cors"]




