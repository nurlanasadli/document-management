FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html/

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN apt-get autoclean

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    libgd-dev \
    libzip-dev \
    libgmp-dev \
    zip \
    unzip

RUN docker-php-ext-configure gd --with-jpeg --with-freetype \
    && docker-php-ext-install gd

RUN docker-php-ext-install -j$(nproc) bcmath \
    ctype \
    fileinfo \
    gmp \
    mbstring \
    pdo \
    xml \
    pdo_mysql \
    exif \
    pcntl \
    zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/html

EXPOSE 8003
CMD ["php-fpm"]