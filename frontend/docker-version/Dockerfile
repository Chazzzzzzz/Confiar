FROM ubuntu:18.04

RUN apt-get update && apt-get -y --no-install-recommends install \
    wget \
    sudo \
    software-properties-common \
    curl \
    apt-transport-https \
    ca-certificates \
    gnupg \
    git

USER root

RUN git clone https://github.com/Chazzzzzzz/Confiar 

WORKDIR /Confiar/frontend/confiar

RUN apt-get install -y npm
RUN sudo npm install -g npm
RUN npm install 
RUN npm install -g react-scripts 
RUN npm install --save react-router-dom 
RUN npm install --save bootstrap
RUN npm install -g express 
RUN npm install -g body-parser 
RUN npm install -g cors 
RUN npm install -g mongoose 
RUN npm install -g nodemon
RUN npm install -g axios

EXPOSE 3000