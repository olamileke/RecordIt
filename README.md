### RecordIt

------------
PWA to mark chaplaincy meeting attendance for my service unit. View it [here](https://therecorditapp.netlify.app "here").

To run this application locally, you must have node installed. Get that [here](https://nodejs.org "here"). You also need to have the Angular CLI installed. To do this, open up your terminal and run

```
npm install -g @angular/cli
```

This will install the latest version of the Angular CLI which will enable you to run Angular applications.

Next up, navigate into the directory of your choice on your system and clone this repository by running

```
git clone https://github.com/olamileke/recordit.git
```

When cloning is complete, navigate into the application directory by running

```
cd RecordIt
```

At this point, we need to install all the packages needed by the app to run. Do this by running

```
npm install
```

This will install all the packages defined in the package.json file in the application root.

Still in the terminal, run

```
ng serve
```
When the application is done compiling, access it at localhost:4200. Alternatively, you can specify the port you want the app to run at by adding a  port parameter like

```
ng serve --port 5000
```
Here the app will be available at localhost:5000.




