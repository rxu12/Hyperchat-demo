FROM xrayray/nodejs-sceptre:v1.13 as base

RUN mkdir /main
COPY . /main/

WORKDIR /main/web
RUN npm i
RUN npm run build

WORKDIR /main/app
RUN npm i

CMD ["npm", "start"]