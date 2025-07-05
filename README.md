# TYPO3 CMS with Vue.js Frontend

This project demonstrates how to use TYPO3 CMS with the headless extension to serve content to a Vue.js frontend application.

## Prerequisites

* PHP 8.2
* [Composer](https://getcomposer.org/download/)
* Node.js (v14 or higher)
* npm or yarn

## Quickstart

* `composer create-project typo3/cms-base-distribution project-name ^13`
* `cd project-name`

Note that this distribution installs most, but not all of the TYPO3 CMS core extensions.
Depending on your need you might also want to install other TYPO3 extensions from
[packagist.org](https://packagist.org/?type=typo3-cms-framework).

### Setup

To start an interactive installation, you can do so by executing the following
command and then follow the wizard:

```bash
composer exec typo3 setup
```

### Setup unattended (optional)

If you're a more advanced user, you might want to leverage the unattended installation.
To do this, you need to execute the following command and substitute the arguments
with your own environment configuration.

```bash
export TYPO3_SETUP_ADMIN_PASSWORD=$(tr -dc "_A-Za-z0-9#=$()/" < /dev/urandom | head -c24)
composer exec -- typo3 setup \
    --no-interaction \
    --server-type=other \
    --driver=sqlite \
    --admin-username=admin \
    --admin-email="info@example.com" \
    --project-name="My TYPO3 Project" \
    --create-site="http://localhost:8000/"
echo "Admin password: ${TYPO3_SETUP_ADMIN_PASSWORD}"
```

### Development server

While it's advised to use a more sophisticated web server such as
Apache 2 or Nginx, you can instantly run the project by using PHPs` built-in
[web server](https://secure.php.net/manual/en/features.commandline.webserver.php).

* `TYPO3_CONTEXT=Development php -S localhost:8000 -t public`
* open your browser at "http://localhost:8000"

Please be aware that the built-in web server is single threaded and only meant
to be used for development.

## Vue.js Frontend Integration

This project includes a Vue.js frontend application that consumes content from TYPO3 via the headless extension.

### Project Structure

- `config/`: TYPO3 configuration files
  - `sites/demoapp/`: Site configuration for the TYPO3 instance
    - `config.yaml`: Site configuration file (with headless mode enabled)
    - `config.typoscript`: TypoScript configuration for serving the Vue.js app
- `frontend/`: Vue.js frontend application
  - See the [frontend README](frontend/README.md) for more details
- `public/`: Public web directory
  - `vue-frontend/`: Built Vue.js application (after running `npm run build` in the frontend directory)

### Setup Vue.js Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run serve
   ```
   This will start a development server at http://localhost:8080 with hot-reload enabled.

4. Build for production:
   ```bash
   npm run build
   ```
   This will create a production-ready build in the `public/vue-frontend` directory.

### Features

- TYPO3 headless API provides content in JSON format
- Vue.js frontend consumes the API and renders the content
- Support for text and media elements
- Responsive design

##  Next steps

* [Getting Started with TYPO3](https://docs.typo3.org/permalink/t3start:start)
* [Create a Site Package](https://docs.typo3.org/permalink/t3sitepackage:start)

## License

GPL-2.0 or later
