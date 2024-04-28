<template>
  <div class="about">
    <h1>About Microfrontends on the Edge</h1>
    <p>
      Microfrontends on the edge simplify frontend architecture by loading different HTML based on
      the current route. They load entire pages, allowing for the use of various frameworks such as
      Svelte, Vue, React, and more.
    </p>
    <p>
      However, this approach sacrifices the single-page application (SPA) benefits when
      transitioning between microfrontends.
    </p>
    <p>
      To mitigate this issue, several strategies can be employed. Utilizing the same framework
      across microfrontends maximizes caching opportunities and facilitates the use of shared
      resources.
    </p>
    <p>
      Additionally, establishing a cohesive look and feel through a centralized components library
      can enhance user experience. Alternatively, combining different microfrontend strategies can
      provide flexibility.
    </p>
    <p>
      Microfrontend architecture extends beyond frontend views; it also encompasses team structure,
      company methodologies, and CI/CD practices. Therefore, it's crucial to consider the broader
      context of your company when adopting new architectural strategies.
    </p>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.about h1 {
  margin-bottom: 10px;
}

.about p {
  font-size: 16px;
  line-height: 1.6;
  padding-bottom: 1rem;
}
</style>
