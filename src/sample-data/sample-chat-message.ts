import ChatMessage from "@/models/ChatMessage";

const sampleChatMessages: ChatMessage[] = [
  new ChatMessage(
    'man',
    'As a 65 years old elderly, can you give me some diet advice ?',
  ),
  new ChatMessage(
    'bot',
    'As you age, maintaining a well-balanced diet becomes increasingly important for your overall health and well-being. Prioritize nutrient-dense foods, including a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats to ensure you receive essential vitamins and minerals. Staying hydrated is crucial, so aim for at least 8 cups of water daily, supplemented by water-rich foods and herbal teas.\nLimit intake of added sugars and salt, and choose healthy fats from sources like avocados, nuts, and olive oil while avoiding saturated and trans fats. Adequate fiber intake from whole grains, fruits, and vegetables aids digestion and prevents constipation. Ensure sufficient calcium and vitamin D for bone health, and consider B vitamins, especially B12, which can be obtained from animal products and fortified foods.\nRegular meals and snacks help regulate blood sugar and maintain energy levels, while portion control prevents overeating. Consult your healthcare provider before taking any supplements to address specific nutritional needs and avoid interactions with medications. Combining a healthy diet with regular physical activity further supports your overall health, helping you enjoy a vibrant and active lifestyle in your golden years.',
  )
]

export default sampleChatMessages;