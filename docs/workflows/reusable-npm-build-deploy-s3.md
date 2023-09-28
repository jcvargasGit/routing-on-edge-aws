# Reusable Workflow for MFE Single Page Apps

This GitHub workflow is designed to automate the build and deployment process for Microfrontend (MFE) Single Page Applications (SPAs). It utilizes GitHub Actions to streamline the workflow, ensuring efficiency and consistency in deploying MFE applications.

## How it Works

### Triggering the Workflow 

The workflow is triggered when it's called from another workflow or manually initiated. It requires the following input parameters:
- `mfe_name`: The name of the MFE application to build and deploy.
- `node_version`: (Optional) The version of Node.js to use for building the application. Defaults to Node.js version 18.

### Step 1 : Checkout code

The workflow starts by checking out the code and using a paths filter to detect changes specific to the MFE application being built and deployed.

### Step 2: Setup Node.js 

If changes relevant to the MFE application are detected, the workflow sets up the Node.js environment based on the specified or default Node.js version.

### Step 3: Installing Dependencies and Building

The workflow then proceeds to install dependencies and build the MFE application using npm for that application that has been modified. 

It sets the `BASE_PATH` environment variable to ensure correct routing within the application.

### Step 4: Uploading Build Artifact

Once the build process is completed, the resulting build artifacts are uploaded as an artifact with the name of the MFE application.

### Step 5: Setting Up AWS CLI

Next, the workflow configures the AWS CLI using the provided AWS access credentials and region.

### Step 7: Uploading Static Pages to S3

Finally, the workflow syncs the built MFE application's static files to an S3 bucket, ensuring that the latest version of the application is deployed. 

It also creates a CloudFront invalidation to ensure that the updated files are propagated to the CloudFront distribution.



