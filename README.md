## How To Run The App


#### Step 1
##### Open Terminal And Copy The Command Below And Paste

``` javascript
  git clone https://github.com/charlesagyemang/Node-Web-Crawler-NWC-.git
```

#### Step 2
###### cd into the project and paste the command below in terminal

``` javascript
  yarn
```

#### Step 3
###### Locate A file Called matchResults.com and delete it


#### Step 4
###### paste the command below into terminal and hit enter

``` javascript
  yarn test:coverage crawl.routes.test
```

##### When you run the command observe the console messages like 'working....' when you see 'end' it means the program has finished running

##### Navigate to the root folder you should see a folder called 'matchResults.com'. Open it and locate a file called index.ndjson. Open that File Thats The results. Thank You.


### Api End Points
#### POST
#### URL '/api/crawl'
#### Post Body
```javascript
{
  domain: 'https://www.pianoafrikonline.com',
  regexes: [
    '/a/',
    '/o/',
    '(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?',
    '/p/',
    '/x/',
  ],
  numLevels: 3,
}
```
