# MFE on the Edge with AWS

This document provides a comprehensive guide to each element.
If you're already familiar with the concepts and are ready to start, you can jump straight to the [Initializing Your Development Environment](#initializing-your-development-environment)

## Initializing Your Development Environment

To get started with this repository, follow these steps:

1. **Fork the Repository**: Create your own copy of the repository by forking it. Instructions can be found [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).
2. **Create an AWS Account**: Sign up for an AWS account if you don't already have one. Sign-up details are available [here](https://aws.amazon.com/free/?gclid=CjwKCAjwtqmwBhBVEiwAL-WAYWB5ZM2xRdHOJZ_cqYo4090Mtbbo3fj4f2iRbhin4mQkiR1Gbos3XhoCHRIQAvD_BwE&trk=1b5e0cad-6939-407d-b265-d513ac796285&sc_channel=ps&ef_id=CjwKCAjwtqmwBhBVEiwAL-WAYWB5ZM2xRdHOJZ_cqYo4090Mtbbo3fj4f2iRbhin4mQkiR1Gbos3XhoCHRIQAvD_BwE:G:s&s_kwcid=AL!4422!3!647999789241!p!!g!!amazon%20aws!19685311604!143348651902&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all).
3. **Generate AWS Access Keys**: You'll need AWS access keys to interact with AWS services programmatically.

   Follow the instructions [here](https://docs.aws.amazon.com/keyspaces/latest/devguide/access.credentials.html) to create your access keys.

4. **Configure GitHub Actions Secrets**: Add the following secrets to your GitHub Actions to securely store your AWS credentials. Learn how to add secrets [here](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).
   - `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.

## Commands

Each project has its own set of commands to facilitate development and deployment, to see them go to the corresponding project, and read the README.md file.

| Project      | Command                             | Note                                |
| ------------ | ----------------------------------- | ----------------------------------- |
| mfe-vue      | `npm run dev --workspace=mfe-vue`   |                                     |
| mfe-react    | `npm run dev --workspace=mfe-react` |                                     |
| routing-edge | `sam build`                         | Go to the project foleder and follow instructions |

## Project structure

### Monorepo Applications with Lerna

We adopt a monorepo approach to streamline resource management, eliminating the need to switch between repositories. While certain scenarios may benefit from distributing applications across multiple repositories, a monorepo provides a unified view of the project's components.

### Folders

- **.github**: This directory contains our GitHub Actions, which automate processes based on Git actions such as pushing changes and merging into a specific branch.
- **.husky**: Utilized for pre-commits to maintain standardization in commits and actions before pushing changes.
- **.vscode**: A folder for sharing Visual Studio Code configurations among team members.
- **docs**: Here, you will find the general documentation. For project-specific documentation, refer to each project's folder.
- **packages**: Contains applications included in the monorepo, facilitating modular development and easier dependency management. ( the package of each app will be inside its folder)
  - **routing-edge**: This project contains the infrastructure as code (IaC) for AWS CloudFront, and the Lambda@Edge functionality
  - **mfe-vue**: A Vue.js application that serves as a micro-frontend example
  - **mfe-react**: A React application that serves as a micro-frontend example
  - **vanilla**: A vanilla JavaScript application that serves as a micro-frontend example

We wil focus our atention on the routing-edge package, as the other packages are just examples of micro-frontends views

### AWS with SAM (routing-edge)

Our project leverages CloudFront and Lambda@Edge for request handling. The infrastructure is managed as code (IaC) on AWS, enabling easy and automated resource management.

> Code and docs are located at [packages > routing-edge](../packages/routing-edge) folder.

### GitHub Actions

GitHub Actions automate the deployment process (CI/CD), ensuring updates to our code are immediately reflected in our environment.

> Documentation can be found in the [Workflows documentation](./workflows/README.md). \
> Workflow code is available in the [GitHub workflows](../.github/workflows) folder.
