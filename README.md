
**Definition of Microfrontend(MFE):** is the framework we've crafted for our frontend applications, tailored to fit the structure of our business and team topologies. 

# Micro-frontend(MFE) on the edge

Within this repository, we explore an architectural approach known as 'MFE on the Edge,' which leverages AWS technologies.

This architecture harnesses the power of AWS CloudFront and Lambda@Edge to seamlessly redirect our users to specific resources, typically `.html` files, based on the original route of their request. 

By employing this setup, our applications achieve complete decoupling in wich the decision-making process for redirection occurs at the edge, ensuring that resources are loaded regardless of the underlying framework in use (be it Vue, React, Svelte, etc.).

## Application scenario

### Company with a Monolithic application who needs to split views reponsabilities. 

Consider Push it Tech Inc., a company with a monolithic application accessible via https://my-app.com. This monolith could have been developed using various technologies such as Django with templates, a large Redux monolith, a single Nuxt app, or other options. 

Initially, this approach facilitated rapid growth. However, as the company expanded with multiple teams and the possibility of acquisitions loomed, several challenges emerged:

* Slow CI/CD Pipelines: Deploying the entire application for each feature update has led to sluggish CI/CD pipelines.

* Orchestration Challenge: Coordinating releases across multiple teams has become increasingly complex, leading to operational nightmares.

* Technical Debt: The frontend application's substantial technical depth presents challenges in migrating it all at once, making a gradual approach necessary.

### Solution implemented

In response to the challenges faced, we needed a solution that would maintain access to the current monolithic application while also enabling the redirection of specific views to new Single Page Application (SPA) applications.

In such scenarios, implementing MFE on the Edge offers a viable solution. This architecture effectively decouples frontend applications, optimizes deployment processes, and provides the necessary flexibility to manage diverse frontend technologies.

## Out of the scope 

This repository focuses specifically on the redirection of views to specific .html files. 

To ensure clarity and simplicity, the following aspects are considered out of scope:

* Configuration and redirection to other services such as ALB or API Gateway.
* Internal structure of MFE applications (currently they consist only of static files).
* Optimization of resources on S3 and CloudFront.

### Other posible use casases

This architecture also proves beneficial in handling backend redirections. This functionality becomes particularly useful when utilizing monolithic endpoints while simultaneously requiring additional direct access via an API gateway.

To implement this, additional SAM (Serverless Application Model) configuration may be necessary, along with additional logic to handle redirection to an Application Load Balancer (ALB) or an API gateway of Lambda functions.

While this may require some extra configuration and logic, the structure of the project can serve as a foundation to navigate this path effectively.


## Demo
If you want to see how it works, you can access it via [this link](https://derrn3nbrkg83.cloudfront.net/shell/marver). For detailed instructions on how it's built, please review the [docs folder](./docs/README.md) (Work in Progress).

## Technical documentation

Go to [link](./docs/README.md) to understand deeply 

## Stay Updated and Connect

Thank you for exploring our Microfrontend on the Edge architecture! If you found this project insightful and want to delve deeper into topics like mocrofrontends, and software engineering practices, consider following our blog for regular updates. 

Additionally, feel free to connect with me on LinkedIn for further discussions, collaboration opportunities, or any inquiries you may have. Let's stay connected and continue to learn and grow together!

* [Spanish blog](https://pushit.tech/)
* [LinkedIn](https://www.linkedin.com/in/jcvargasvalencia/)

