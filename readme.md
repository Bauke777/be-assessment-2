# cmda-be - 2017-2018 - assessment 1

*   First, download this project from Moodle as a zip (yay, you’ve done that)
*   Then, finish the steps below.  Try and get as far as you can (but first
    read everything)
*   Finally, create a zip from your project (include everything!) and hand it
    in on Moodle

In total, you can get 100 points in this project.  How well you fare on each
step, divided by 10, constitutes your grade for this assessment.  If you finish
step 4 (Express), you could pass this assessment, but mistakes in that step or
earlier steps can still cause you to fail.

Note that for each step:

*   You should do the requested thing
*   Your code should not cause unhandled errors
*   Your code should be valid and consistent
*   Your code and thought process should be documented through code
    comments

Finally, you are allowed to use the internet while finishing this assignment,
but not to communicate with each other.  Using code found online is encouraged,
but only allowed with citations!

Good luck!  👍👌💪

## Todo

*   [Step 1: Init 10pt](#step-1-init-10pt)
*   [Step 2: Data 10pt](#step-2-data-10pt)
*   [Step 3: Templates 10pt](#step-3-templates-10pt)
*   [Step 4: Express 30pt](#step-4-express-30pt)
*   [Step 5: HTTP 10pt](#step-5-http-10pt)
*   [Step 6: Forms 10pt](#step-6-forms-10pt)
*   [Step 7: Images 10pt](#step-7-images-10pt)
*   [Step 8: Excel 10pt](#step-8-excel-10pt)

### Step 1: Init [10pt]

Go to this project in your terminal, initialise a Git repository, commit the
initial code, install the project’s dependencies, and start the server (it
starts on port 1904).

Commit your changes for every following step.

### Step 2: Data [10pt]

Add three new countries to the data array in `index.js`: places that you have
visited or would like to visit.  For every country, add a name, continent,
capital, and a description of why to go there.

### Step 3: Templates [10pt]

Finish the template to render all countries, `view/list.ejs`.  Render country
names, continents, and capitals.  Create a _valid_ and _correct_ HTML table.

### Step 4: Express [30pt]

1.  [5pt] Add dynamic links from each country name in `view/list.ejs` to the
    corresponding detail page.  Create links like so: `/0` for The Netherlands
    (where `0` is the parameter for the country to get and corresponds to its
    index in the `data` array; so `/1` for the United States, and so on)
2.  [15pt] Add the corresponding route in the server to render the country for
    the links from the previous substep. Pass the correct data to the template
    (`view/detail.ejs`), so that your route renders the correct corresponding
    country
3.  [10pt] If a nonexistent country is requested, respond with the most relevant
    status code and render the `view/error.ejs` template with correct data

**Tip**: Don’t forget to restart the server after you make a change.

### Step 5: HTTP [10pt]

Add support for removing a country.

There’s a delete button on the detail page of every country.  This project
includes client-side JavaScript that, when the button is clicked, sends a
DELETE request to the corresponding country (so, if you’re on `/0`, the
Netherlands, the button sends a DELETE to `/0`).  The client-side code will
redirect the user to the list of countries if the server responds with a
successful code.

Create a route in the server to handle these DELETE requests.  Add code to
handle the request by removing the correct country (**hint**: use `splice` to
remove something from an array).  After removing a country, respond with the
most relevant status code and data.  If the country at the corresponding index
does not exist, respond with the most relevant status code and data as well.

**Tip**: You cannot name a function `delete` in JavaScript.  Use something like
`remove` instead.  See [MDN](https://developer.mozilla.org/Web/JavaScript/Reference/Lexical_grammar#Keywords)
for more info.

### Step 6: Forms [10pt]

Create a form to add new countries.  Use correct form elements.  Make the form
POST to `/`.  Add a route in the server to handle the POST.  After adding a
country, redirect to the new country.

### Step 7: Images [10pt]

Add support for uploading an image of the country and show that image instead of
the map.

### Step 8: Excel [10pt]

Make this project excellent, by:

*   Adding support for updating countries
*   Responding with data instead of HTML
*   Using more parts of HTTP (other status codes or methods)
*   Adding support for users, signing up, logging in, sessions, logging out
*   Applying and enforce a code-style
*   Writing great docs
*   …or: doing something otherwise excellent, such as:
