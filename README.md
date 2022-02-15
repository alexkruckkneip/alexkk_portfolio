# README - Portfolio AlexKK #

**This repository hosts my private portfolio web application.**

### What is this repository for? ###

When looking for a new job, recruiters would like to understand what projects I worked on as a designer and what value my work brought to the projects. When they get my CV, under the most important career steps they can find a link to a related project page of my portfolio. This helps them to dive deeper and find further information they need to make a decision on either hiring me or not.

* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)
* Version 2.0

## How do I get set up? ##

### Summary of set up ###
This is a quite old set up I've started using in 2016 to organise my digital assets and deliverables for A/B experiments at Rentalcars.com in Manchester. I worked there as a UX Designer and needed to create capsuled HTML/CSS/JS artifacts to development to enable them to test new ideas against the existing user flow.

Since 2018 I'm using this setup to create my design portfolio web application, first for alexkk.ie and since 2020 for the domain alexkk.nl.

The setup is focused on easy testing on multiple devices and sizes. It is Using the Technologies Node and Gulp which enables the usage of 'Gulp Browsersync'. This allows updating multiple devices when changes are made for example in the SASS code instantly.

With a special focus on design assests, this setup includes a Gulp task that can automatically create a SVG sprite into the HTML header from a source folder with SVG images. Also useful is a GULP task that allows to generate WOFF font files out of TTF OS font files.

This system is open to use all GULP tasks for web development.

### Disadvantages of the set up ###
This setup requires a quite old version of node v8.17.0 and npm v6.13.4. I recommend to also have NVM (Node Version Manager) ready to switch the versions to allow project using a newer node version to run properly.
