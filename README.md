# Collingwood Fantasy Football - M Fennell

## Contents

* [**API Docs**](#api-docs)
* [**Deploying to Google**](#deploying-to-google)
* [**Setting up docker compose on the VM Instance**](#setting-up-docker-compose-on-the-vm-instance)
* [**Deploying to Google**](#deploying-to-google)

### API Docs

* [**Authentication**](http://ccafcfantasy.com:8080/swagger-ui.html#/authentication)
* [**College Teams**](http://ccafcfantasy.com:8080/swagger-ui.html#/college-team-controller)
* [**Leagues**](http://ccafcfantasy.com:8080/swagger-ui.html#/league-controller)
* [**Players**](http://ccafcfantasy.com:8080/swagger-ui.html#/player-controller)
* [**Points**](http://ccafcfantasy.com:8080/swagger-ui.html#/points-controller)
* [**Users**](http://ccafcfantasy.com:8080/swagger-ui.html#/user)
* [**Weeks**](http://ccafcfantasy.com:8080/swagger-ui.html#/weeks-controller)

### Deploying to Google

* ### Creating a VM Instance on GCP

  * This is found via the `Compute Engine` -> `VM Instances` page on the GCP page
    * Click create instance
    * Name it as you like
    * Set the region to `europe-west2` and zone `europe-west2-a`
    * This app is being run with a machine type of `1v CPU 3.75GB memory`, but possible would work 1 tier lower on a `g1-small`
    * Leave `Deploy a container image to this VM instance` unchecked
    * Set access scopes to `Allow full access to all Cloud APIs`
    * Check the boxes to allow both `HTTP` and `HTTPS` traffics

* ### Setting up docker compose on the VM Instance

  * Copy the `docker-compose.yml` file in this repo onto the VM instance
  * Create a `.env` file
  * In the `.env` file, setup the environment variables for the database. For eg.
    * `SQL_USERNAME=SomeUsername`
    * `SQL_PASSWORD=SomePassword`
    * `SQL_DATABASE=SomeDatabase`
  * At the bottom of the `docker-compose.yml` file, there are a series of commands that need to be ran
  * After finishing these instructions, run `docker-compose up -d` to boot up the site
  * On GCP, go to `VPC network` -> `Firewall Rules` and select `Create Firewall Rule`
    * Name it as you like
    * Leave the default filters, except:
    * Set Target to `All instances in the network`
    * Set Source IP Ranges to `0.0.0.0/0`
    * Set protocols and ports to `Allow all`
  * Go back to your VM Instance page, and if the external IP is something like `xx.xxx.xx.xx`, then go to `xx.xxx.xx.xx:5000` in your web browser and the site should be running there

* ### Pointing a Web Domain at the GCP VM Instance

  * On Google domains, go to the DNS tab on the left
  * Create two Custom Resource Records
    * One with a blank name, where the `IPv4` address is the `xx.xxx.xx.xx` from the GCP VM Instance
    * Repeat, but where the name is `www` instead of blank

* ### Things to note

  * The `docker-compose.yml` file specific the URL in the `traeffic` config
  * The docker images are publicly available on DockerHub, which is what the `docker-compose` file uses
  * Watchtower is setup so that deploying new images to DockerHub will automatically update the GCP instances
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
