
### Deploying to a fresh Heroku app:

Deploying to Heroku requires the Heroku command line app for Terminal. 

Learn how to install here: https://devcenter.heroku.com/articles/heroku-cli

1) If you haven't already, initialize git for this project.

```
$ git init
```

2) Commit all your changes to the Master branch
```
$ git commit -a -m"Latest changes"
```

3) Now you're ready to deploy to Heroku. Log in to Heroku from the command line.

* `$ heroku login`

4) Create a new Heroku app on your account. Replace "xyz" with a name of your preference.

* `$ heroku create xyz`

5) Add this Heroku app as a remote for this git repo. Replace "xyz" with the name you created above.

* `$ heroku git:remote -a xyz`

6) Push the latest on Master to Herku

* `$ git push heroku master`
