import ChatMessage from "@/models/ChatMessage";

const sampleChatMessagesEng: ChatMessage[] = [
  new ChatMessage(
    'man',
    'Give me some advice on how to stay healthy in daily life.',
  ),
]

const sampleChatMessagesChi: ChatMessage[] = [
  new ChatMessage(
    'woman',
    '給我一些日常生活上面保持健康的建議。',
  )
]

export { sampleChatMessagesEng, sampleChatMessagesChi };