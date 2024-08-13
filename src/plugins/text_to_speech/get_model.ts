import { ttsClient } from './client';


async function getLanguageCode(): Promise<string[]> {
  try {
    const response = await ttsClient.listVoices();
    if (!response[0].voices) return [];
    const langCodeList = response[0].voices.reduce((accu, voice) => {
      for (const v of voice.languageCodes!) {
        if (!accu.includes(v)) accu.push(v);
      }
      return accu;
    }, [] as string[])
    return [...langCodeList, "zh-TW", "zh-CN"];
  } catch (error) {
    console.error(error)
    return [];
  }
}

async function getModel(lang: string): Promise<string[]> {
  const response = await ttsClient.listVoices({ languageCode: lang });
  console.log(response[0].voices);
  return [];
}

export { getLanguageCode, getModel };
