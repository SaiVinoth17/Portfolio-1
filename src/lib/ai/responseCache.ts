interface CacheEntry {
  response: {
    text: string;
    suggestedFollowUps: string[];
    link?: { text: string; url: string };
    projectCard?: {
      title: string;
      description: string;
      tags: string[];
    };
  };
  timestamp: number;
}

class ResponseCache {
  private cache: Map<string, CacheEntry> = new Map();
  private maxAgeMs: number = 1000 * 60 * 15; // 15 minutes cache TTL

  public get(query: string) {
    const key = query.toLowerCase().trim();
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.maxAgeMs) {
      this.cache.delete(key);
      return null;
    }
    return entry.response;
  }

  public set(query: string, response: CacheEntry["response"]) {
    const key = query.toLowerCase().trim();
    this.cache.set(key, {
      response,
      timestamp: Date.now(),
    });
  }

  public clear() {
    this.cache.clear();
  }
}

export const responseCache = new ResponseCache();
