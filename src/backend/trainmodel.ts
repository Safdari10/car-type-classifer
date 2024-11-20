import { trainer, projectIdVar } from "./config";

/**
 * Creates tags in Azure Custom Vision and returns their IDs.
 * @param tagNames Array of tag names to create.
 * @returns An object mapping tag names to their corresponding IDs.
 */
export async function createTags(tagNames: string[]): Promise<{ [key: string]: string }> {
  const tagMap: { [key: string]: string } = {};

  for (const tagName of tagNames) {
    const tag = await trainer.createTag(projectIdVar, tagName);
    tagMap[tagName] = tag.id!;
    console.log(`Created tag: ${tagName} with ID: ${tag.id}`);
  }

  return tagMap;
}

// Define tags here
const tagNames = ["Convertible", "Coupe", "Hatchback", "SUV", "Sedan", "Van", "Truck", "Pickup"];

// Create tags when this file runs
(async () => {
  const tagMap = await createTags(tagNames);
  console.log("All tag IDs:", tagMap);
})();
