FROM php:8.2.25-fpm

# Establecer directorio de trabajo
WORKDIR /var/www

# Agregar repositorio de paquetes docker php ext repo
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# Instalar extensiones de php
RUN chmod +x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions mbstring pdo_mysql zip exif pcntl gd memcached

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    build-essential \
    openssl \
    libonig-dev \
    libxml2-dev \
    libwebp-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    locales-all \
    zip \
    jpegoptim optipng pngquant gifsicle \
    unzip \
    git \
    curl \
    lua-zlib-dev \
    libmemcached-dev \
    nginx && \
    apt-get install -y supervisor && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Establecer locale
RUN locale-gen es_BO.UTF-8
ENV LANG=es_BO.UTF-8
ENV LANGUAGE=es_BO:es

# Instalar composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar dependencias de php y configurar gd
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Agregar usuario www y asignar permisos
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copiar archivos a www
COPY --chown=www:www-data . /var/www

# Asignar permisos
RUN chmod -R ug+w /var/www/storage

# Copiar configuraciones nginx/php/supervisor
RUN cp docker/supervisor.conf /etc/supervisord.conf
RUN cp docker/php.ini /usr/local/etc/php/conf.d/app.ini
RUN cp docker/nginx.conf /etc/nginx/sites-enabled/default

# Crear directorio de logs
RUN mkdir /var/log/php
RUN touch /var/log/php/errors.log && chmod 777 /var/log/php/errors.log

# Ejecutar instalaciones
RUN composer install --optimize-autoloader --no-dev
RUN chmod +x /var/www/docker/run.sh

EXPOSE 80
ENTRYPOINT ["/var/www/docker/run.sh"]