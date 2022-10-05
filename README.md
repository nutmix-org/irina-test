# Eyas Gaming QA Automation assessment
## Registration journey tests


### Tools used and Installation

The project was created using Playwright and JavaScript.

If you decide to download the project, just open a terminal, go to your project folder and install Playwright:
```
npm init playwright@latest
```

You will be prompted to select the programming language - the default is TypeScript, but this project uses JavaScript.

There will also be a question about overriding the config file (`playwright.config.js already exists. Override it? (y/N) · false`). This would override all the settings I selected for the project. If you accidentally select false, you can always overwrite it later with the file from the repository.


You should then be able to run tests from the command line:
```
npx playwright test e2e/register_first_page.spec.js --headed
``` 

(playwright runs by default in headless mode, so I've included the `--headed` option should you want to see what's happening on a browser).

In the config file (`playwright.config.js`), I've made some choices: 2 reruns on failure, tests run only on the Chromium engine, screenshot and trace only on failure. These setting can be modified as needed (more browser engines, more retries, etc.)



### Approach
I decided on Playwright because of it's versatility:
  -   the larger assessment included both UI and API tests and Playwright can be used for both 
  -   multiplatform and multibrowser support - the same tests can be configured to run on several browsers and it also comes with some mobile emulators (this was not part of the request, but Web UI projects tend to scale to this eventually). 
   - reporting and tracing: the assessment requirements included a reporting, screenshot request and that can easily be achieved through simple settings in the config file (more detailed reporting can later be developed, or a third party solution can be added, but for the start of a project, Playwrights basic reporting could be sufficient)
(and also because I had some recent exposure to it).

The approach used was to create some basic functional tests:
- one larger test including the complete user journey for registration
- a couple of smaller ones investigating more specific parts of the functionality

The tests are grouped based on the aspect investigated (with `test.describe(...)`) but they are independent from one another, so running them separately (from the CL: `npx Playwright test -g "TEST NAME" `) or in a different order should not affect the results.

I used the Page Object Model to separate the page elements from the actual test, so any modifications to the actual page can be easily corrected in the POM, and the tests should remain fairly stable.

The __cookie acceptance__ part might need to be further separated, as it's probably not specific to the registration page, but to the entire website.

For the first set of tests, I've also separated test data from actual test, to be able to produce multiple tests with the same logic, but using different data. These include both valid and invalid data and the tests should follow both paths from the initial logic.

Actually all these tests support further parametrization, and could be enhanced if needed (I did not interact with all the elements on the page and also did not get to explore user gestures or keyboard combinations, for a lack of time, but there is fairly good support in Playwright for this). 

Regarding the reporting, everytime you run the tests  __playwright-report__ and  __test-results__ get populated. This is why I didn't include them in a repository, as they are specific to a single run. 
After each run open Playwright-report\index.html in your browser of choice and it should lead you to the full report, with snapshot and trace included for the failing test. These can be actually switched on for any test run, but I usually set it only for failing tests.
Alternatively, you can also open the reports from CL with:
```
npx playwright show-report
```
