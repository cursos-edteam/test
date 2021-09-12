<template>
  <div class="container__input">
    <input type="text" class="input__search" placeholder="Buscar..."/>
  </div>
</template>
<style lang="scss" scoped>
.container__input {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 7px;
  .input__search {
    background: #181818;
    border: none;
    outline: none;
    height: 20px;
    border-radius: 50px;
    width: 85%;
    padding: 10px 20px;
    color: #FFF;
    &::placeholder {
      color: #DCDCDC;
    }
  }
}
</style>
