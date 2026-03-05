FROM node:20-alpine AS build-stage
WORKDIR /app    
COPY package*.json ./
RUN npm install -g @angular/cli && npm install
COPY . .
RUN ng build 

# ------------------------------------------------------------------------------

FROM nginx:alpine
COPY --from=build-stage /app/dist/AngularFeedReader/browser/ /usr/share/nginx/html/
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf      
# COPY startup.sh /startup.sh           ---  NON CI SERVE, NGINX È GIÀ CONFIGURATO PER SERVIRE I FILE STATICI
EXPOSE 80

# ENTRYPOINT /startup.sh     --- NON CI SERVE, NGINX È GIÀ CONFIGURATO PER SERVIRE I FILE STATICI


# Questa è una Dockerfile per un'applicazione Angular che utilizza Nginx come server web. 
# La prima parte del Dockerfile costruisce l'applicazione Angular, mentre la seconda parte configura Nginx per servire i file statici generati.
# Di solito, la prima parte è chiamata "build stage" e la seconda parte è chiamata "production stage".
# La prima parte non cambia frequentemente, mentre la seconda parte può essere modificata per configurare Nginx o aggiungere altri file necessari.