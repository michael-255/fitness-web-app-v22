# Fitness Tracker

Fitness Tracker is an app designed to help you achieve your fitness goals. It offers a variety of
features to track and enhance your workouts, exercises, and overall fitness journey.

## TODO

-   Implement the `Measurements` modules for it's Dashboard

    -   Collect record types together based on the field
    -   Only edit from the data tables

-   Implement basic `Plans`

    -   `Plans` are collections of ID watchers for record result to see if they are met
    -   `Plans` work off of a set number of ID's to determine when they are watching for a result
        -   `Monday` - Plans for each specific weekday
        -   `Tuesday`
        -   `Wednesday`
        -   `Thursday`
        -   `Friday`
        -   `Saturday`
        -   `Sunday`
        -   `January` - Plans for each specific month
        -   `February`
        -   `March`
        -   `April`
        -   `May`
        -   `June`
        -   `July`
        -   `August`
        -   `September`
        -   `October`
        -   `November`
        -   `December`
        -   `Monthly` - Plans for every month
        -   `Yearly` - Plans for every year

-   `Workouts`
    -   Install Vue Draggable Next `npm i -S vuedraggable@next`
    -   `TEST` Vue Draggable Next on a page
    -   Exercise groups will likely need to be updated to support this library

```ts
// But I don't want to save this data cause these labels could be changed
const exerciseSelections = [
    {
        id: 'test-123',
        label: 'Squat (test-123)',
        disable: false,
    },
    {
        id: 'test-456',
        label: 'Bench Press (test-456)',
        disable: false,
    },
]

const data: ExerciseGroups = [
    ['test-123', 'test-456'], // A superset: Squat and Bench Press
    ['test-789', 'test-101'], // B superset: Deadlift and Overhead Press
    ['test-111', 'test-222'], // C superset: Pull-up and Dips
]
```

-   `Measurements`
    -   `Dashboard Modules`
    -   `WIP`

## Post Cloning Steps

-   [ ] Update `README.md`

    -   [ ] Change README main heading to your project name
    -   [ ] Add detailed project description
    -   [ ] Update the `Credits` section as needed
    -   [ ] Remove unneeded `Post Cloning Steps` section
    -   [ ] Remove unneeded `Project Creation Steps` section and ToC links

## Project Usage

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server. It is much faster than the
production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI
environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Icons

Use the following site to help with application icons: <https://realfavicongenerator.net/>

## Credits

Base `Web App Template` created by Michael Joy (michael-255 on GitHub)
