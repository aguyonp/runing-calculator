FROM nginx:latest

# Copier les fichiers de l'application dans le répertoire de travail du container
COPY app/index.html /usr/share/nginx/html/index.html
COPY app/script.js /usr/share/nginx/html/script.js

# Exposer le port 80
EXPOSE 80

# Lancer NGINX
CMD ["nginx", "-g", "daemon off;"]
