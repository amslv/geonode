## Geonode

GeoNode is a geospatial content management system, a platform for the management and publication of geospatial data. It brings together mature and stable open-source software projects under a consistent and easy-to-use interface allowing non-specialized users to share data and create interactive maps.
The Geonode version implemented by SIMSAB aimed to leave a cleaner user interface, removing some components and focusing on the increase of usability.

### Instalation Guide
The first step is to clone[ this repository](https://github.com/simsab-ufcg/geonode/ " this repository") on the machine where you want to install Geonode. This version of Geonode uses Docker. To install Docker and other needed dependencies, follow the [tutorial provided by the official geonode website](http://docs.geonode.org/en/master/tutorials/install_and_admin/running_docker/index.htmlhttp:// "tutorial provided by the official geonode website").

### Configuration

To run the application on localhost (or any other IP address) you need to change some files that contain environment variables. These environment variables are responsible for informing the application on which host it is deployed.

**Note:** This process needs to be done before any attempt to deploy the application.

These are the environment variables that need to be changed:

| Variable Name  |  .env File | Absolute Path |
| ------------ | ------------ | ------------ |
| GEONODE_LB_HOST_IP  | django.env, geoserver.env  | `scripts/docker/env/production/` |
| GEOSERVER_PUBLIC_LOCATION  | django.env, celery.env  | `scripts/docker/env/production/` |
| GEOSERVER_LOCATION  | django.env, celery.env  | `scripts/docker/env/production/` |
| SITEURL  | django.env, celery.env  | `scripts/docker/env/production/` |

### Deployment

In order to automate and simplify the application deployment process, there is a makefile with some predefined functions. One of these functions is the **auto-up** function, which is responsible for downloading all necessary Docker images, starting all the containers that are required for the correct operation of the application. In other words, the **auto-up** function deploys the application.

To run the **auto-up** function, you need to access the project directory and run the following command:

`sudo make auto-up`

After completing the command execution, open the browser and access the IP address that was entered in the environment variables shown in the previous section.

For example, if you put` 127.0.0.1` as the application's IP address in the environment variables, you must access `127.0.0.1` in the browser to be able to view the application running.
