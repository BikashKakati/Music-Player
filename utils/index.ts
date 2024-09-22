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
