<template>
    <header>
        <div class="menu">
          
        </div>
    </header>
    
    
    <div>
        <router-view />
    
    </div>
</template>

<script>

export default ({
    data() {
        return {

        }
    },

    components: {

    }
})
</script>


<style>
.router {
    margin-left: 900px;
}

.footer {
    position: absolute;
}

:root {
    --first-color: #343537;
    --second-color: #F89E31;
}

.titulo {
    text-align: center;
    color: var(--first-color);
    box-shadow: none;
}

body {
    font-family: 'montserrat', sans-serif;
}

header {
    width: 100vw;
    margin-top: 0;
    background-color: var(--first-color);
    padding: 0px;
}

button {
    width: 100%;
    background-color: var(--second-color) !important;
    color: rgb(255, 255, 255) !important;
    padding: 10px !important;
    margin: 6px 0 !important;
    border: none !important;
    border-radius: 4px !important;
    cursor: pointer;
}

button:hover {
    background-color: #FBBF77 !important;
}

.menu {
    position: absolute;
    z-index: 1;
    width: 100%;
}

header {
    width: 100vw;
    margin-top: 0;
    background-color: var(--first-color);
    padding: 0px;
}
</style>
