<script>
export default {
    name: "ListaErroresValidacion",
    props: {
        errores: {
            type: Array,
            required: true,
        },
    },
};
</script>

<template>
    <div>
        <span class="d-inline-block font-weight-bold">
            Por favor corrige los siguientes errores:
        </span>

        <ul class="list-unstyled">
            <li v-for="error in errores" :key="error">
                {{ error }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.list-unstyled {
    list-style: none;
}
</style>
