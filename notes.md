notes for midterm and final
git pull, git push, git commit will keep things updated between repos
### personal access token
look in notes on mac under github

Getting in to my amazon instance: ssh -i ~/Downloads/production.pem ubuntu@54.204.10.112

public ip address: 54.204.10.112

domain name: tiffanycs260.click

git pull, git push, git commit will update all of the changes

git status shows differences between the clones and commits missed. if you have something committed to github and not your repo, git pull will sync them up

./deployFiles.sh -k ~/Downloads/production.pem -h tiffanycs260.click -s simon
this is to deploy to production

./deployReact.sh -k ~/Downloads/production.pem -h tiffanycs260.click -s simon
## CSS
- everything in css is boxes. find which section you want to edit which is why html organization is important
- https://codepen.io/leesjensen/pen/VwEPMxQ
### responsive design
- this is for when the page changes size, it makes sure that everything looks nice on a smaller or bigger screen.
- @media tag can be used to change things if it is portrait or landscape. A media query takes one or more predicates separated by boolean operators.
- @media (orientation: portrait) {
  div {
    transform: rotate(270deg);
  }
}
this code transforms the html into portrait mode.

### CSS grid
- the grid display is for when there is an element with a bunch of children. take a container element with a bunch of child elements
- .container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
- this code automatically sizes the grid when the page is resized  
### CSS flexbox
- this makes it so that when you are adjusting your screen size, the different parts of the page can be viewed differently in ways that work best
- you can also make certain parts dissapear once the screen gets to small. for example if you have a header that looks nice when the screen is big but takes up too much space when the screen is small

### using npm/vite/node.js
This may seem like a lot of work but after you do it a few times it will begin to feel natural. Just remember the main steps.

Create your project directory
Initialize it for use with NPM by running npm init -y
Make sure .gitignore file contains node_modules
Install any desired packages with npm install <package name here>
Add require('<package name here>') to your application's JavaScript
Use the code the package provides in your JavaScript
Run your code with node index.js
