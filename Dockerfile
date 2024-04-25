FROM httpd:latest

COPY ./src/ /usr/local/apache2/htdocs/

VOLUME ./src /usr/local/apache2/htdocs
