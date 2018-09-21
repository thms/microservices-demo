FROM mhart/alpine-node

WORKDIR /src

COPY package.json .
RUN npm i

COPY . .

CMD ["npm", "test"]
