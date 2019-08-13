<template>
  <div class="context">
    <img src="../assets/images/not_found.png">
    <p>The page you visited does not exist...</p>
    <div>
      <router-link :to="{path: '/'}"><el-button type="primary" plain>Back to home</el-button></router-link>
    </div>
  </div>
</template>
<style>
  html,body {
    height: 100%;
  }
  #app {
    height: 100%;
    margin-top: 0;
  }
  .context {
    position: absolute;
    top: 20%;
    width: 100%;
    text-align: center;
  }
  .context img {
    max-width: 100%;
    max-height: 100%;
  }
  .context p {
    margin: 20px;
    font-size: 16px;
    color: #0d3349;
  }
</style>
