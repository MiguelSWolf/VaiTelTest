<template>
    <div class="icon-social">
        <a :href="social.href">
            {{ social.type }}
        </a>
        <br />
    </div>
</template>
<script>
export default {
    props: ['social']
}
</script>