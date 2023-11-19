<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/abc">Abc</router-link>
  </nav> -->
  <router-view/>
</template>

<style>
body,html{
  padding: 0;
  margin: 0;
}

.flex-flaot{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex{
  display: flex;
  align-items: center;
}
.page_content{
  box-sizing: border-box;
  display: block;
  width: auto;
  padding: 20px;
  background: #fff;
  margin-top: 10px;
}
</style>
