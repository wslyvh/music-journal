import { Recording } from "expo-av/build/Audio";
import { randomUUID } from "expo-crypto";

export async function getRecordings() {
  console.log("getRecordings");
}

export async function getRecording(id: string) {
  console.log("getRecording", id);
}

export async function createRecording(recording: Recording) {
  const id = randomUUID();
  console.log("createRecording", id, recording);

  return recording;
}

export async function removeRecording(id: string) {
  console.log("removeRecording", id);
}
