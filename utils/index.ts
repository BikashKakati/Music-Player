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

// async function handlePlayNextSong(){
//   if (currentAudioState) {
//     await currentAudioState?.stopAsync();
//     await currentAudioState?.unloadAsync();
//   }
//   const songsData = resonse?.data || [];
//   const currentSongIndex = currentPlayingSongDetails?.songIndex!;
//   const nextSongIndex =
//     currentSongIndex + 1 >= songsData.length - 1 ? 0 : currentSongIndex + 1;
//   const nextSongDetails = songsData?.[nextSongIndex];
//   const { sound, status } = await handleAudio(
//     nextSongDetails?.attributes?.previews[0]?.url
//   );
//   dispatch(
//     setCurrentPlayingSongDetails({
//       albumName: nextSongDetails?.attributes?.albumName,
//       artistName: nextSongDetails?.attributes?.artistName,
//       songName: nextSongDetails?.attributes?.name,
//       songImageUrl: nextSongDetails?.attributes?.artwork?.url,
//       songTrackUrl: nextSongDetails?.attributes?.previews[0]?.url,
//       songIndex: nextSongIndex,
//     })
//   );

//   dispatch(setAudioState(sound));
//   dispatch(setAudioStatusState(status));
//   dispatch(setCurrentPosition(0));
// }
