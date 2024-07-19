export function getCurrentTitle(exampleTopics, topic, example) {
  const topicItem = exampleTopics.find(item => item.id === topic)
  const exampleItem = topicItem.examples.find(item => item.id === example)
  return exampleItem.title
}
