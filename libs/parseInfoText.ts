import { PlantInfoType } from "@/types/types";

export function parsePlantInfo(text: string): PlantInfoType {
  console.log("text", text);
  try {
    // Extract JSON content if present
    const jsonString = text.match(/```json\n([\s\S]*?)\n```/)?.[1];

    if (jsonString) {
      const info = JSON.parse(jsonString);
      return {
        name: info["Plant name"] || "Unknown Plant",
        scientificName: info["Scientific name"] || "",
        family: info["Plant family"] || "",
        nativeRegion: info["Native region"] || "",
        description: info["Brief description"] || "",
        careInstructions:
          typeof info["Care instructions"] === "object"
            ? Object.entries(info["Care instructions"])
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n")
            : info["Care instructions"] || "",
        medicinalValue: info["medicinal value"] || "",
      };
    }

    // Handle plain text responses
    const match = text.match(
      /That's a \*\*(.*?)\*\*\. More specifically, it appears to be a cultivar of \*(.*?)\*/
    );
    if (match) {
      return {
        name: match[1] || "Unknown Plant",
        scientificName: match[2] || "",
        family: "",
        nativeRegion: "",
        description: text,
        careInstructions: "",
        medicinalValue: "",
      };
    }
  } catch (error) {
    console.error("Error parsing plant info:", error);
  }

  return {
    name: "Unknown Plant",
    scientificName: "",
    family: "",
    nativeRegion: "",
    description: "Unable to parse plant information.",
    careInstructions: "",
    medicinalValue: "",
  };
}
