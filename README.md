# mushket

## For developing

### Enable SCSS File Watcher
To compile SCSS files to CSS enable file watcher in webstorm:
1) install SASS compiler: npm install -g sass
2) Open Preferences -> Tools -> File Wathcers -> add new SCSS file watcher
   ```
   Arguments: $FileName$:$FileNameWithoutExtension$.css
   ```
   ```
   Output path: $FileNameWithoutExtension$.css:$FileNameWithoutExtension$.css.map
   ```
   

## Steps to start project

### Bower install
Install all bower dependencies 
```
bower i
```

### Run project
```
npm start
```
