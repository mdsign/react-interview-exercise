## Usage

```
yarn install
yarn start
open http://localhost:3000
```

## Tasks

- Please add pagination support to the list when there are more than 2 entries
- Please add option to select sex of a friend male/female and display it
- Please add tests using your preferred testing tool (jest, mocha, should.js ...)

## Objectives

- You have received a working example so please do not upgrade any packages unless you really have to.
- Please check for small things like syntax errors, since details matter.
- Please deliver something that works, non working project is an automatic disqualification

## Pagination Component
 - Component have navigation buttons with first, previous, next and last buttons represented with html code characters
 - Navigation for first five pages provided with numbers which uses the available space in the footer
 - When page count exeeds five then current page item numbers with total items count has been shown to avoid wrapping
 - When no items to show, then pagination will be hidden
 
 ## Select Gender
  - Option to add gender is included with select component
  - Friends data is updated with gender into redux store
  - In friends list, the gender is show using icon
 
 ## Test Cases
 - Libraries Jest, Chai and Enzyme are used
 - Test cases written for basic component rendering, event and snapshot test
