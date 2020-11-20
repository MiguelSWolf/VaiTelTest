<template>
    <div class="band">
        <header>
            <h2 class="name">{{name}}</h2>
            <figure class="">
                <img :src="image" />
            </figure>
        </header>
        <nav class="social">
            <template v-for="link in externalLinks">
                <a :key="link.type" :href="link.href">
                    {{link.type}}
                </a>
                <br :key="`${link.type}-br`"/>
            </template>
            <br />
            <br />
        </nav>
        <section class="videos">
            <div v-for="video in videos" :key="video.id.videoId">
                <strong>Id</strong>
                {{video.id.videoId}}<br />
                <strong>publishedAt</strong>
                {{video.snippet.publishedAt}}<br />
                <strong>title</strong>
                {{video.snippet.title}}<br />
                <strong>description</strong>
                {{video.snippet.description}}<br />
                <strong>thumbnails</strong>
                {{video.snippet.thumbnails.default}}<br />
                <strong>channelTitle</strong>
                {{video.snippet.channelTitle}}<br />
                <strong>channelId</strong>
                {{video.snippet.channelId}}<br />
                <br />
                <br />
            </div>
        </section>
    </div>    
</template>

<script>
import DataGuns from '@/assets/test-data/youtube-guns.json';
export default {
    data() {
        return {
            name: "Guns n' roses",
            image: "https://s1.ticketm.net/dam/a/f01/ad68066e-5401-42bb-ba79-737ca8d65f01_1352251_RETINA_PORTRAIT_3_2.jpg",
            externalLinks: [
                { 
                    type: "youtube",
                    href: "https://www.youtube.com/user/GunsNRosesVEVO"
                },
                { 
                    type: "twitter",
                    href: "https://twitter.com/gunsnroses"
                },
                { 
                    type: "itunes",
                    href: "https://itunes.apple.com/artist/id106621"
                },
                { 
                    type: "lastfm",
                    href: "http://www.last.fm/music/Guns+N'+Roses"
                },
                { 
                    type: "wiki",
                    href: "https://en.wikipedia.org/wiki/Guns_N'_Roses"
                },
                { 
                    type: "facebook",
                    href: "https://www.facebook.com/gunsnroses"
                },
                { 
                    type: "instagram",
                    href: "https://www.instagram.com/gunsnroses"
                },
                { 
                    type: "homepage",
                    href: "http://www.gunsnroses.com/"
                },
            ],
            videos: [ ]
        }
    },
    mounted() {
        this.videos = DataGuns.items;
    },
}
</script>
