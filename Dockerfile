FROM node:16.4.2-alpine3.14

WORKDIR /app/
COPY package.json /app/

RUN npm i --production && \
    npm i -g pm2

COPY . /app/

# Start and enable SSH - install Chromium
RUN apk add openssh chromium \
     && echo "root:Docker!" | chpasswd \
     && chmod +x /app/init_container.sh \
     && cd /etc/ssh/ \
     && ssh-keygen -A

COPY sshd_config /etc/ssh/

EXPOSE 3000 2222
ENTRYPOINT [ "/app/init_container.sh" ]