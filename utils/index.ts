import {
  setAudioState,
  setAudioStatusState,
  setCurrentPlayingSongDetails,
  setCurrentPosition,
} from "@/services/redux/sliceReducers/songSlice";
import { store } from "@/services/redux/store";
import { SaveDataToStorePropType, SongType } from "@/types/type";
import { Audio } from "expo-av";

export function getLimitedFormattedText(
  text: string = "",
  requiredLength: number
): string {
  return text.length > requiredLength
    ? `${text.slice(0, requiredLength + 1)}...`
    : text;
}

export function getFormattedImageUrl(imageUrl: string) {
  return imageUrl?.replace("{w}", "300")?.replace("{h}", "300") || "";
}

// Song functionality
export async function handleAudio(playbackUrl: string) {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: false,
    });
    const soundState = await Audio.Sound.createAsync(
      { uri: playbackUrl },
      { shouldPlay: true, isLooping: false }
    );

    return soundState;
  } catch (error) {
    console.error("Error initializing audio:", error);
    throw error; // Rethrow to handle it properly
  }
}

export function getFormattedTime(timeDuraton: number | undefined): string {
  const totalSeconds = Math.floor(timeDuraton! / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

const { getState, dispatch } = store;
export async function handlePlayNextSong(responseData: SongType[]) {
  if (getState().songSlice.currentAudioState) {
    await getState().songSlice.currentAudioState?.unloadAsync();
  }
  const songsData = responseData || [];
  const currentSongIndex =
    getState().songSlice.currentPlayingSongDetails?.songIndex!;
  const nextSongIndex =
    currentSongIndex + 1 >= songsData.length - 1 ? 0 : currentSongIndex + 1;
  const nextSongDetails = songsData?.[nextSongIndex];
  const { sound, status } = await handleAudio(
    nextSongDetails?.attributes?.previews[0]?.url
  );
  handleSaveDataToCentralStore({
    sound,
    status,
    songDetails: nextSongDetails,
    songIndex: nextSongIndex,
  });
}
export async function handlePlayPreviousSong(responseData: SongType[]) {
  if (getState().songSlice.currentAudioState) {
    await getState().songSlice.currentAudioState?.unloadAsync();
  }
  const songsData = responseData || [];
  const currentSongIndex =
    getState().songSlice.currentPlayingSongDetails?.songIndex!;
  const previousSongIndex =
    currentSongIndex - 1 < 0 ? songsData.length - 1 : currentSongIndex - 1;
  const previousSongDetails = songsData?.[previousSongIndex];
  const { sound, status } = await handleAudio(
    previousSongDetails?.attributes?.previews[0]?.url
  );
  handleSaveDataToCentralStore({
    sound,
    status,
    songDetails: previousSongDetails,
    songIndex: previousSongIndex,
  });
}

export function handleSaveDataToCentralStore({
  sound,
  status,
  songDetails,
  songIndex,
}: SaveDataToStorePropType) {
  dispatch(
    setCurrentPlayingSongDetails({
      albumName: songDetails?.attributes?.albumName,
      artistName: songDetails?.attributes?.artistName,
      songName: songDetails?.attributes?.name,
      songImageUrl: songDetails?.attributes?.artwork?.url,
      songTrackUrl: songDetails?.attributes?.previews[0]?.url,
      songIndex,
    })
  );

  dispatch(setAudioState(sound));
  dispatch(setAudioStatusState(status));
  dispatch(setCurrentPosition(0));
}
