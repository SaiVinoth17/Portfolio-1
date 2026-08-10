import { KNOWLEDGE_BASE, KnowledgeTopic } from "./knowledgeBase";

export function retrieveRelevantContext(query: string): string {
  const cleanQuery = query.toLowerCase().trim();
  const matchedTopics: KnowledgeTopic[] = [];

  for (const topic of KNOWLEDGE_BASE) {
    const isMatched = topic.keywords.some((kw) => cleanQuery.includes(kw));
    if (isMatched) {
      matchedTopics.push(topic);
    }
  }

  // If specific topics match, send only those. Otherwise send top summary.
  const topicsToUse = matchedTopics.length > 0 ? matchedTopics : KNOWLEDGE_BASE.slice(0, 3);

  return topicsToUse
    .map(
      (t) =>
        `### ${t.title}\n${t.content}\n${
          t.details ? t.details.map((d) => `- ${d}`).join("\n") : ""
        }`
    )
    .join("\n\n");
}
