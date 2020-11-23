<template>
    <div>
        <strong>Id</strong>
        {{ video.videoId }}
        <br />
        <strong>publishedAt</strong>
        {{ video.publishedAt }}
        <br />
        <strong>title</strong>
        {{ video.title }}
        <br />
        <strong>description</strong>
        {{ video.description }}
        <br />
        <strong>thumbnails</strong>
        {{ video.thumbnail }}
        <br />
        <strong>channelTitle</strong>
        {{ video.channelTitle }}
        <br />
        <strong>channelId</strong>
        {{ video.channelId }}
        <br />
        <br />
    </div>
</template>
<script>
export default {
    props: ['video']
}
</script>