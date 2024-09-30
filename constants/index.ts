import songPlayingGif from "@/assets/images/playingTrack.gif"
import loader from "@/assets/images/music-loader-one.gif";
import pop from "@/assets/images/pop.jpg";
import hiphop from "@/assets/images/hiphop.png";
import dance from "@/assets/images/dance.jpg";
import electronic from "@/assets/images/electronic.jpeg";
import rnbSoul from "@/assets/images/r&b-soul.jpg";
import kPop from "@/assets/images/kpop.jpg";
import latin from "@/assets/images/latin.jpg";
import house from "@/assets/images/house.jpg";
import film from "@/assets/images/film.jpg";
import rock from "@/assets/images/rock.jpg";
import alternative from "@/assets/images/alternative.jpg";

export const Images = {
    songPlayingGif,
    loader,
    pop
}


export const genres = [
    { title: 'Pop', value: 'POP', imageUrl:pop},
    { title: 'Hip-Hop', value: 'HIP_HOP_RAP', imageUrl:hiphop},
    { title: 'Dance', value: 'DANCE', imageUrl:dance },
    { title: 'Electronic', value: 'ELECTRONIC',imageUrl:electronic},
    { title: 'Soul', value: 'SOUL_RNB', imageUrl:rnbSoul},
    { title: 'Alternative', value: 'ALTERNATIVE',imageUrl:alternative },
    { title: 'Rock', value: 'ROCK', imageUrl:rock},
    { title: 'Latin', value: 'LATIN',imageUrl: latin},
    { title: 'Country', value: 'COUNTRY',imageUrl:film },
    { title: 'House', value: 'HOUSE',imageUrl:house },
    { title: 'K-Pop', value: 'K_POP',imageUrl:kPop },
  ];