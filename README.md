# Micro-frontend(MFE) on the edge

In this repository, we explore the concept of "Routing on the Edge," leveraging AWS technologies such as AWS CloudFront and Lambda@Edge. This approach allows us to seamlessly redirect users to specific resources based on the original route of their request.

By employing this setup, our application delegates routing responsibilities to CloudFront, maintaining the same domain and path while accurately redirecting to the appropriate resource.

This strategy is applicable to both backend and frontend applications. It is particularly beneficial when transitioning from a monolithic architecture to a micro-* architecture, enabling a gradual migration of views and services while maintaining global and stateful resources.

## When to use it ?

With this Cloudfront will be the first entry to your application allowing you to redirect users to different services or views based on the path of the request. This is useful for monolith aplication migration for:

1. **Selective Routing**: Continue using the monolithic application for specific views while redirecting to new services for others.
2. **Eliminate Legacy Proxy**: Stop relying on your legacy application to proxy requests to new services.
3. **Consistency in User Experience**: Maintain a consistent domain and URL structure while transitioning to a new architecture.

## Scope of this repository

This repository focuses specifically on the redirection of views to specific .html files.

To ensure clarity and simplicity, the following aspects are considered out of scope:

* Configuration and redirection to other services such as ALB or API Gateway.
* Internal structure of MFE applications (currently they consist only of static files).
* Optimization of resources on S3 and CloudFront and cache policies.

## Demo

If you want to see how it works, you can access it via [this link](https://derrn3nbrkg83.cloudfront.net/shell/marver). For detailed instructions on how it's built, please review the [docs folder](./docs/README.md) (Work in Progress).

## Technical documentation

Go to [link](./docs/README.md) to understand deeply.

## Stay Updated and Connect

This project shares a simple way on how to routing on the edge, and can halp you with your Monolith migration process! If you found this project insightful and want to delve deeper into topics like mocrofrontends, and software engineering practices, consider following our blog for regular updates.

Additionally, feel free to connect with me on LinkedIn for further discussions, collaboration opportunities, or any inquiries you may have. Let's stay connected and continue to learn and grow together!

* [Spanish blog](http://jcvargas.io)
* [LinkedIn](https://www.linkedin.com/in/jcvargasprofile) 