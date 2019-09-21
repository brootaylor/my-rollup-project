# A RollupJS project

Nothing fancy really. Just a bit of a play around and familiarosation of how to set up a possible RollupJS config. Blah dee blah!

## What it does

### `"prebuild": "npm run clean"`

`prebuild` runs the `clean` command script that removes the `dist` directory and all its contents. It *automatically runs* before running the scripts within the `build` script.

---

### `"build": "npm run scripts && npm run styles && npm run static"`

`build` runs the `scripts`, `styles` and `static` command scripts.

---

## Versioning method

Using commands like the following to automatically update / change the `package.json` *version* number...

* `npm version major`
  * eg. __*1*__.0.0
* `npm version minor`
  * eg. 1.__*1*__.0
* `npm version patch`
  * eg. 1.0.__*1*__

---

To make the `git commit` more meaningful, add a *message* to the version `major`, `minor` or `patch`.

**Something like this...**

`npm version patch -m "Upgraded to version %s. Updated the service worker."`
