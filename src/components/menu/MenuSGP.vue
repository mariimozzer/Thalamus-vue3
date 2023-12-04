<template>
    <div id="contaimer0" style="display: flex;flex-flow: row; justify-content:center; width: 100%; height: 100%;margin: 0px; margin: 0px;perspective: 200px;">
    
        <div id="caixasSobreEsteira" style="display: flex;flex-flow: row;justify-content:space-around; padding-bottom: -300px; color: white; ">
            <div id="grupos">
                <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;padding-left: 1px;padding-right: 1px;">
                    <b-dropdown class="estante" style="color: white;   text-align: center; font-size:18px;padding:5px;width: 160px; " text="Grupo">
                        <router-link class="dropdown-item" to="/grupo">Controle de Grupo</router-link>
                        <router-link class="dropdown-item" to="/controle-de-grupo/novo">Adicionar Grupo</router-link>
                        <router-link class="dropdown-item" to="/vinculo-de-grupo">Vinculo de Grupo</router-link>
    
                    </b-dropdown>
                </div>
            </div>
            <div id="pessoas" style="position: relative; z-index: 2;">
                <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;padding-left: 1px;padding-right: 1px;">
                    <b-dropdown class="estante" style="color: white;   text-align: center; font-size:18px;padding:5px;width: 160px; " text="Pessoas">
                        <router-link class="dropdown-item" to="/pessoa">Controle de Pessoas</router-link>
                        <router-link class="dropdown-item" to="/controle-de-pessoas/novo">Adicionar Pessoas</router-link>
    
                    </b-dropdown>
                </div>
            </div>
            <div id="setores">
                <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;padding-left: 1px;padding-right: 1px;">
                    <b-dropdown class="estante" style="color: white;   text-align: center; font-size:18px;padding:5px;width: 160px; " text="Setores">
                        <router-link class="dropdown-item" to="/setores">Controle de Setor</router-link>
                        <router-link class="dropdown-item" to="/controle-de-setores/novo">Adicionar Pessoas</router-link>
    
                    </b-dropdown>
                </div>
            </div>
            <div id="usuarios">
                <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;padding-left: 1px;padding-right: 1px;">
                    <b-dropdown class="estante" style="color: white;   text-align: center; font-size:18px;padding:5px;width: 160px; " text="Usuários">
                        <router-link class="dropdown-item" to="/usuario">Controle de Usuário</router-link>
                        <router-link class="dropdown-item" to="/usuario/novo">Adicionar Usuário</router-link>
                    </b-dropdown>
                </div>
            </div>
            <div id="telas">
                <div id="entrada" style="padding:40px;display: flex;flex-flow: column;justify-content: space-between;padding-left: 1px;padding-right: 1px;">
                    <b-dropdown class="estante" style="color: white;   text-align: center; font-size:18px;padding:5px;width: 160px; " text="Telas">
                        <router-link class="dropdown-item" to="/funcionalidade">Controle de Tela</router-link>
                        <router-link class="dropdown-item" to="/funcionalidade/novo">Adicionar Tela</router-link>
                        <router-link class="dropdown-item" to="/vinculo-de-funcionalidade">Vinculo de Tela</router-link>
                    </b-dropdown>
                </div>
            </div>
        </div>
    
    
    
    </div>
</template>


<script>

</script>

<style>
.dropdown-item {
    position: relative;
    z-index: 2;
}


</style>