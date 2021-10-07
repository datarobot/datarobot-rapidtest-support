# [RapidTest](https://rapidtestapp.org) dashboard.

## Overview

RapidTest is a program launched by DataRobot and STRAC to help various K-12 schools 
rollout COVID-19 testing programs in order to return kids to the classroom. The 
technology found in this repo creates a support site to help program managers monitor 
the schools who are enrolled in the program as well as add, remove, or edit the list 
of test administrators who have access to the testing application that STRAC provides. 
This is a series of web pages which give program managers a GUI to make these changes, 
rather than having to write scripts themselves. To obtain API keys and access 
information, please reach out to STRAC. 

### Requirements

- Python 3.8
- Node 14.x
- Yarn 1.16.0
- Docker 20.10.8 or later
- docker-compose 1.26.0 or later

This application is meant to be an administrative dashboard for the
[Rapid Test application](https://github.com/HHS/rapidtest). This application
is not independent and relies on connecting to an instance of the Rapid Test 
application.

### Configure and Build the Image
To configure the app, there are 2 configuration files that need to be setup:

1. `api/.env` - This file contains secrets for the CAPTCHA tool
2. `.env` - Configure how to connect to the Rapid Test application

Due to the configuration files being embedded inside the Docker image a new image
will need to be built and deployed if the configuration changes.

### Running Locally
Use the `docker-compose.yml` file to run the application locally.

    ```shell
    docker-compose up
    ```

The app will be available on `localhost:5000`

### Deployment
1. Build the Docker image

   ```shell
   docker build -t rapid-test-dashboard:latest .
   ```
   
2. Run the container

   ```shell
   docker run -d -p 8080:8080 rapid-test-dashboard:latest
   ```

# Copyright and License

RapidTest Support is Copyright 2021 DataRobot, Inc. All rights reserved.

Licensed under a Modified 3-Clause BSD License (the "License"). See the `LICENSE.txt` file. You may not use this software except in
compliance with the License.

Software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT ANY EXPRESS OR IMPLIED
WARRANTIES OF ANY KIND AND WITHOUT ANY LICENSE TO ANY PATENTS OR TRADEMARKS. See the License.txt file for the specific language governing
permissions and limitations under the License.
