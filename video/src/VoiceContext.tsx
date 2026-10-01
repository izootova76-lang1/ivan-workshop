import { createContext, useContext } from "react";
export const VoiceFrame = createContext<number | null>(null);
export const useVoiceFrame = () => useContext(VoiceFrame);
