# Deployment Guide

## Prerequisites

- [Git](https://git-scm.com/)
- Linux Server, preferably Ubuntu 20.04 LTS
- Docker and Docker Compose installed
- NodeJS and yarn installed
- `make` installed
- nginx installed

## Setup

1. Clone the GitHub repository to your local machine using git.
1. Open a terminal and navigate to the root of the repository.
1. Run `make staging` to start the staging environment.
1. Navigate into the `backend` folder
1. Run `yarn prisma:migrate` to insert all tables to the database.
1. Run `yarn prisma:seed` to seed the database.
1. Setup the nginx configs, we use port 3000 for the backend, while using 3001 for the frontend.
1. Profit!

> © 2022 PhidippidesChat
