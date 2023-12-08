# Cloud Function TypeScript Template

This is a template that can be used to create Cloud Functions with TypeScript. The template takes inspiration from official Google Cloud docs:

- [GC TypeScript docs](https://github.com/GoogleCloudPlatform/functions-framework-nodejs/blob/master/docs/typescript.md)
- [GC Testing Functions docs](https://github.com/GoogleCloudPlatform/functions-framework-nodejs/blob/master/docs/testing-functions.md)
- [GC TypeScript PubSub docs](https://github.com/GoogleCloudPlatform/functions-framework-nodejs/blob/master/docs/typescript-pubsub.md)
- [GC Events](https://github.com/GoogleCloudPlatform/functions-framework-nodejs/blob/master/docs/events.md)
- [PubSub unit tests](https://cloud.google.com/functions/docs/samples/functions-pubsub-unit-test#functions_pubsub_unit_test-nodejs)

## Recommended GitHub settings

### General

Go to `Settings` > `General` and:

- Under `Features`, deselect the ones you don't use
- Under `Pull Requests`:
  - Select only `Allow squash merging`
  - Select `Automatically delete head branches`

### Branch protection

Go to `Settings` > `Branches` and add a branch protection rule:

- Branch name pattern: `[dm][ea][vs][et][le][or]*`
- Require a pull request before merging: `true`
  - Require approvals: `true` (1)
  - Dismiss stale pull request approvals when new commits are pushed: `true`
- Require conversation resolution before merging: `true`
- Require linear history: `true`

### Enable Dependabot

Go to `Settings` > `Code security and analysis` and enable:

- Dependency graph
- Dependabot alerts
- Dependabot security updates
- Dependabot version updates

## Install NVM

Follow the installation [instructions](https://github.com/nvm-sh/nvm).

## Installation

1. Run `nvm use` (you might need to install our specific Node.js version)
2. Run npm `install`

## Lint

### Lint and check for formatting problems

```bash
npm run lint
```

### Automatically fix formatting and linting problems (if possible)

```bash
npm run fix
```

### Remove output files

```bash
npm run clean
```

## Build

```bash
npm run build
```

## Run locally

We use `dotenv` to load environment variables locally. Add a `.env` file in your root folder and ask someone in the team for the secret values.

### Normal Cloud Function

```bash
npm run dev
```

### PubSub Cloud Function

```bash
npm run start
```

```bash
curl -d '{"data":"UHJlZ2xpZmUgQ29ubmVjdA=="}' \
  -X POST \
  -H "Ce-Type: true" \
  -H "Ce-Specversion: true" \
  -H "Ce-Source: true" \
  -H "Ce-Id: true" \
  -H "Content-Type: application/json" \
  http://localhost:8080
```

> You need to build the app and restart the server each time a change is made to the PubSub Cloud Function.

## Test

```bash
npm run test
```

## Deploy

We use Terraform to deploy the app.

1. Install [Terraform CLI](https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/gcp-get-started)
2. Install [gcloud CLI](https://cloud.google.com/sdk/docs/install)
3. Set Application Default Credentials for [gcloud CLI](https://cloud.google.com/docs/authentication/application-default-credentials#personal)
4. Make sure you have folder setup on Google Cloud for your projects
5. Replace the keyword `template` in `terraform/environments/prod/backend.tf` and `terraform/environments/stage/backend.tf` (under `prefix`)
6. Replace the keyword `template` in `terraform/environments/prod/main.tf` and `terraform/environments/stage/main.tf` (under `project_name` and `project_id`)
7. Set `folder_id` in `terraform/environments/prod/main.tf` and `terraform/environments/stage/main.tf`
8. Run:
    - `cd terraform/environments/prod && terraform init` to initialize the production project
    - `cd terraform/environments/stage && terraform init` to initialize the staging project
9. Go to the `prod`/`stage` folder respectively and run `terraform apply` to deploy the projects on Google Cloud
10. Open the Google Cloud Console and go to the production/staging project respectively
11. Create a trigger with the following settings:
    - Name: `cloud-functions`
    - Repository: Choose the GitHub repository you are using
      - You might need to connect your repository if it's not already connected. Do that by pressing `CONNECT NEW REPOSITORY`
    - Branch: `^master$` for production and `^develop$` for staging respectively
12. Push your changes and watch the magic 🪄

Some common Terraform commands are:

- `terraform init` - initialize the directory, has to be run once after a fresh install
- `terraform fmt -recursive` - format all the terraform files in the current directory and subdirectories
- `terraform plan` - shows an execution plan of resoruces that will be created, modified or deleted
- `terraform apply` - same as above but gives you the option to apply the changes

## Notes

- If you are not going to use PubSub you can run `npm uninstall @google-cloud/pubsub` and remove all other code related to the helloPubSub function.
