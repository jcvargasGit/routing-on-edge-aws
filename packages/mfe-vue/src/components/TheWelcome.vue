<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>What are Microfrontend(MFE)</template>
    <p>Is the framework we crafted for our frontend applications, tailored to fit the structure of our business and team topologies. </p>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Is there other ways to implement MFE?</template>
    <p>
      Yes, you can load MFE: 
      <ul>
        <li>On the client side with: Module Federation, Single SPA, or other tools.</li>
        <li>On the edge side, as in this case</li>
        <li>On the server side with</li>
        <li>A mix of all the above</li>
      </ul>
    </p>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>See the React view</template>
   <p>
    The purpose of this page is to see the routing and configuration of MFE on the edge, probably you wont find at the first stage 
    views with aligned UI or comunication between them, but you can see the routing and configuration of the MFE on the edge.
    <ul>
        <li><a href="/mfe/react" target="_blank">React</a></li>
        <li><a href="/vanilla/mantainance" target="_blank">Vanila mantainance view</a></li>
        <li><a href="/vanilla/error" target="_blank">Vanila error view</a></li>
      </ul>
   </p>
  </WelcomeItem>


  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>See more about MFE on the edge</template>
    <ul>
      <li><a href="https://github.com/pushit-tech/mfe-on-the-edge" target="_blank">Github</a></li>
      <li><a href="https://pushit.tech/" target="_blank">Blog</a></li>
      <li><a href="https://twitter.com/pushit_tech" target="_blank">@pushit_tech</a></li>
    </ul>
  </WelcomeItem>
</template>
