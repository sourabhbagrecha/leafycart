import { VoyageAIClient } from "voyageai";

// Initialize Voyage AI client
const voyageClient = new VoyageAIClient({
  apiKey: process.env.VOYAGEAI_API_KEY!,
});

/**
 * Generate embeddings for text using Voyage AI
 * @param text - Text to generate embeddings for
 * @param model - Model to use (default: voyage-3)
 * @returns Promise<number[]> - Array of embedding values
 */
export async function generateEmbedding(
  text: string,
  model: string = "voyage-3"
): Promise<number[]> {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error("Text cannot be empty");
    }

    const response = await voyageClient.embed({
      input: [text],
      model: model,
    });

    if (!response.data || response.data.length === 0) {
      throw new Error("No embedding data received from Voyage AI");
    }

    const embedding = response.data[0]?.embedding;
    if (!embedding) {
      throw new Error("No embedding data in response");
    }

    return embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error(
      `Failed to generate embedding: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generate embeddings for multiple texts in batch
 * @param texts - Array of texts to generate embeddings for
 * @param model - Model to use (default: voyage-3)
 * @returns Promise<number[][]> - Array of embedding arrays
 */
export async function generateEmbeddingsBatch(
  texts: string[],
  model: string = "voyage-3"
): Promise<number[][]> {
  try {
    if (!texts || texts.length === 0) {
      throw new Error("Texts array cannot be empty");
    }

    // Filter out empty texts
    const validTexts = texts.filter((text) => text && text.trim().length > 0);
    if (validTexts.length === 0) {
      throw new Error("No valid texts provided");
    }

    const response = await voyageClient.embed({
      input: validTexts,
      model: model,
    });

    if (!response.data || response.data.length === 0) {
      throw new Error("No embedding data received from Voyage AI");
    }

    return response.data.map((item: any) => {
      if (!item.embedding) {
        throw new Error("Missing embedding data in batch response");
      }
      return item.embedding;
    });
  } catch (error) {
    console.error("Error generating batch embeddings:", error);
    throw new Error(
      `Failed to generate batch embeddings: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Create a text representation of a product for embedding
 * @param product - Product object
 * @returns string - Combined text representation
 */
export function createProductText(product: {
  name: string;
  description: string;
  category: string;
}): string {
  const components = [
    `Product: ${product.name}`,
    `Category: ${product.category}`,
    `Description: ${product.description}`,
  ];

  return components.join(". ");
}

/**
 * Calculate cosine similarity between two embeddings
 * @param a - First embedding vector
 * @param b - Second embedding vector
 * @returns number - Cosine similarity score (-1 to 1)
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same length");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
