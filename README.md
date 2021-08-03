# Image Resizer
---
Resize and convert JPG, PNG and WEBP images. You can choose one of the existing images or upload your own.

![Image Resizer Preview](https://drive.google.com/uc?export=view&id=16UNKfx8lHswynuVA89eYux9zNt5hWmn1)

## Installation

After cloning the repository, you'll need to run:

````
npm install
````

## Development Server
You can run
````
npm start
````
and the dev server will be listening on port 3000.

Now you can check [localhost:3000](localhost:3000) and resize and/or upload images from the user interface

## Build for Production
First you need to run:
````
npm run build
````
and then start the server with:
````
node dist
````
The application will be running on port 3000.

## API

| METHOD | PATH | PARAMS | DESCRIPTION |
| --- | --- | --- | --- |
| GET | `/api/images` | --  |Lists all available images with their filename and source. |
| GET | `/api/resize`| filename, width, height, format | If found, it returns the file resized with the specifications provided. Example: `/api/resize?filename=santamonica.jpg&width=200&height=200&format=jpg` |
| POST | `/api/upload` | * File must be attached | It uploads a new image to the set of original images for resizing |

## Running tests
This application has been tested with [Jasmine](https://jasmine.github.io/), [Supertest](https://github.com/visionmedia/supertest) and [Sinon.JS](https://sinonjs.org/).

In order to run the tests:
````
npm run test
````

## Formatting 💅🏽
In order to keep the code neat and clean, this project has [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).
Lint the code with:
````
npm run lint
````
and format it with:
````
npm run prettier
````

---
Yermain Araya · 2021