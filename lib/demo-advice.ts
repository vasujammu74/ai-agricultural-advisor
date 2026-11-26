/**
 * Lightweight, keyword-based agricultural advice engine.
 * Used as a functional fallback when no real AI key is configured,
 * so the chatbox works end-to-end during demos. Clearly labelled
 * as demonstration data in the UI.
 */

type Topic =
  | 'pest'
  | 'fertilizer'
  | 'soil'
  | 'water'
  | 'weather'
  | 'disease'
  | 'crop'
  | 'seed'
  | 'livestock'
  | 'general';

interface TopicRule {
  topic: Topic;
  keywords: string[];
}

const RULES: TopicRule[] = [
  { topic: 'pest', keywords: ['pest', 'insect', 'bug', 'aphid', 'worm', 'bollworm', 'thrips', 'whitefly', 'mite', 'caterpillar', 'పురుగు', 'कीट', 'பூச்சி', 'ಕೀಟ'] },
  { topic: 'fertilizer', keywords: ['fertilizer', 'fertiliser', 'npk', 'urea', 'compost', 'manure', 'organic', 'ఎరువు', 'खाद', 'உரம்', 'ಗೊಬ್ಬರ'] },
  { topic: 'soil', keywords: ['soil', 'ph', 'alkaline', 'acidic', 'saline', 'loam', 'clay', 'sandy', 'organic matter', 'నేల', 'मिट्टी', 'மண்', 'ಮಣ್ಣು'] },
  { topic: 'water', keywords: ['water', 'irrigation', 'drip', 'sprinkler', 'flood', 'drainage', 'rain', 'నీరు', 'నీటి', 'पानी', 'सिंचाई', 'நீர்', 'நீர்பாசன', 'ನೀರು', 'ನೀರಾವರಿ'] },
  { topic: 'weather', keywords: ['weather', 'rain', 'temperature', 'heat', 'cold', 'frost', 'monsoon', 'climate', 'వాతావరణం', 'मौसम', 'வானிலை', 'ಹವಾಮಾನ'] },
  { topic: 'disease', keywords: ['disease', 'fungus', 'fungal', 'blight', 'rust', 'mildew', 'rot', 'wilt', 'yellow leaf', 'spot', 'వ్యాధి', 'रोग', 'நோய்', 'ರೋಗ'] },
  { topic: 'seed', keywords: ['seed', 'variety', 'hybrid', 'germination', 'sowing', 'nursery', 'విత్తన', 'बीज', 'விதை', 'ಬೀಜ'] },
  { topic: 'livestock', keywords: ['cow', 'cattle', 'buffalo', 'goat', 'sheep', 'poultry', 'chicken', 'milk', 'feed', 'fodder', 'పశువు', 'मवेशी', 'மாடு', 'ದನ'] },
  { topic: 'crop', keywords: ['rice', 'paddy', 'wheat', 'cotton', 'maize', 'corn', 'groundnut', 'sugarcane', 'tomato', 'chilli', 'onion', 'banana', 'mango', 'pulse', 'legume', 'crop', 'yield', 'harvest', 'పంట', 'फसल', 'பயிர்', 'ಬೆಳೆ'] },
];

const ADVICE: Record<Topic, { en: string; te: string; hi: string; ta: string; kn: string }> = {
  pest: {
    en: 'For pest control, inspect your field early morning when pests are most visible. Use yellow sticky traps for flying insects like whiteflies and aphids. Neem oil (5 ml/litre water) is an effective low-cost organic spray. If infestation is heavy, consult your local Krishi Vigyan Kendra (KVK) for the right pesticide and dosage for your crop.',
    te: 'పురుగుల నివారణకు ఉదయం పొలంలో తిరిగి చూడండి. ఎరుపు/పసుపు స్టిక్కీ ట్రాప్‌లు వాడండి. వేప నూనె (5 మిలీ/లీటరు) స్ప్రే చేయండి. తీవ్రమైతే సమీప కృషి విజ్ఞాన కేంద్రాన్ని సంప్రదించండి.',
    hi: 'कीट नियंत्रण के लिए सुबह खेत का निरीक्षण करें। पीले स्टिकी ट्रैप का उपयोग करें। नीम का तेल (5 मिली/लीटर) छिड़कें। भारी संक्रमण होने पर कृषि विज्ञान केंद्र से सलाह लें।',
    ta: 'பூச்சி கட்டுப்பாட்டிற்கு காலையில் வயலை சரிபார்க்கவும். மஞ்சள் ஒட்டு பொறிகளைப் பயன்படுத்தவும். வேப்பெண்ணெய் (5 மிலி/லிட்டர்) தெளிக்கவும். தீவ்ர தாக்குதல் இருந்தால் வேளாண் அறிவியல் மையத்தை அணுகவும்.',
    kn: 'ಕೀಟ ನಿಯಂತ್ರಣಕ್ಕೆ ಬೆಳಗ್ಗೆ ಹೊಲ ಪರಿಶೀಲಿಸಿ. ಹಳದಿ ಅಂಟು ಬಲೆ ಬಳಸಿ. ಬೇವಿನ ಎಣ್ಣೆ (5 ಮಿಲಿ/ಲೀಟರ್) ಸಿಂಪಡಿಸಿ. ತೀವ್ರವಾಗಿದ್ದರೆ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ವನ್ನು ಸಂಪರ್ಕಿಸಿ.',
  },
  fertilizer: {
    en: 'Before applying fertilizer, get your soil tested at a nearby soil testing lab — it tells you exactly what nutrients are missing. As a general practice, mix well-rotted farmyard manure or compost (5–10 tonnes/hectare) into the soil before sowing. For chemical fertilizer, apply NPK based on the soil test recommendation and split nitrogen into 2–3 doses during the crop cycle.',
    te: 'ఎరువు వేయడానికి ముందు నేల పరీక్ష చేయించండి. పంటకు ముందు పేడ లేదా కంపోస్ట్ (5–10 టన్లు/హెక్టారు) కలపండి. రసాయన ఎరువును నేల పరీక్ష సలహా మేరకు వేయండి.',
    hi: 'खाद डालने से पहले मिट्टी परीक्षण कराएँ। बोने से पहले गोबर की खाद या कम्पोस्ट (5–10 टन/हेक्टेयर) मिलाएँ। रासायनिक खाद मिट्टी परीक्षण के अनुसार डालें।',
    ta: 'உரம் இடுமுன் மண் பரிசோதனை செய்யவும். விதைப்பதற்கு முன் எரு அல்லது கம்போஸ்ட் (5–10 டன்/ஹெக்டர்) கலக்கவும். இரசாயன உரத்தை மண் பரிசோதனை படி இடவும்.',
    kn: 'ಗೊಬ್ಬರ ಹಾಕುವ ಮುನ್ನ ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮಾಡಿಸಿ. ಬಿತ್ತುವ ಮುನ್ನ ಗೊಬ್ಬರ ಅಥವಾ ಕಾಂಪೋಸ್ಟ್ (5–10 ಟನ್/ಹೆಕ್ಟರ್) ಬೆರೆಸಿ. ರಾಸಾಯನಿಕ ಗೊಬ್ಬರವನ್ನು ಮಣ್ಣು ಪರೀಕ್ಷೆ ಪ್ರಕಾರ ಹಾಕಿ.',
  },
  soil: {
    en: 'Healthy soil is the foundation of a good harvest. Test your soil every 2–3 years to know its pH and nutrient levels. Add organic matter (compost, green manure, crop residues) regularly to improve structure and water-holding capacity. For acidic soil, apply lime; for saline soil, improve drainage and use salt-tolerant varieties.',
    te: 'మంచి పంటకు నేల ఆరోగ్యం ముఖ్యం. 2–3 సంవత్సరాలకు ఒకసారి నేల పరీక్ష చేయించండి. సేంద్రియ పదార్థాలు క్రమం తప్పకుండా కలపండి.',
    hi: 'अच्छी फसल के लिए मिट्टी स्वस्थ रखें। 2–3 साल में मिट्टी परीक्षण कराएँ। नियमित जैविक पदार्थ मिलाएँ।',
    ta: 'நல்ல பயிருக்கு மண் ஆரோக்கியம் முக்கியம். 2–3 ஆண்டுகளுக்கு ஒருமுறை மண் பரிசோதனை செய்யவும். தாவர எருவை தொடர்ந்து சேர்க்கவும்.',
    kn: 'ಒಳ್ಳೆ ಬೆಳೆಗೆ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮುಖ್ಯ. 2–3 ವರ್ಷಕ್ಕೆ ಒಮ್ಮೆ ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮಾಡಿಸಿ. ಸಾವಯವ ಪದಾರ್ಥಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಬೆರೆಸಿ.',
  },
  water: {
    en: 'Water your crops early morning or late evening to reduce evaporation loss. For most crops, drip irrigation saves 30–50% water compared to flood irrigation. Ensure good drainage to avoid waterlogging, which causes root rot. During dry spells, use mulch (straw or plastic) to retain soil moisture.',
    te: 'పంటలకు ఉదయం లేదా సాయంత్రం నీరు ఇవ్వండి. డ్రిప్ నీటి పాలన 30–50% నీరు ఆదా చేస్తుంది. నీటి నిలుపును నివారించడానికి మంచి పారుదల ఉండేలా చూడండి.',
    hi: 'सुबह या शाम सिंचाई करें। ड्रिप सिंचाई से 30–50% पानी बचता है। जलभराव से बचने के लिए अच्छा जल निकास रखें।',
    ta: 'காலை அல்லது மாலை நீர்ப்பாசனம் செய்யவும். டிரிப் நீர்ப்பாசனம் 30–50% தண்ணீர் சேமிக்கிறது. நீர்த்தேக்கத்தை தவிர்க்க நல்ல வடிகால் வைக்கவும்.',
    kn: 'ಬೆಳಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ನೀರಾವರಿ ಮಾಡಿ. ಡ್ರಿಪ್ ನೀರಾವರಿ 30–50% ನೀರು ಉಳಿಸುತ್ತದೆ. ನೀರು ನಿಲ್ಲದಂತೆ ಒಳ್ಳೆ ಒಳಚರಂಗಿ ಇರಲಿ.',
  },
  weather: {
    en: 'Check the local weather forecast before spraying pesticides or applying fertilizer — heavy rain within 24 hours can wash them away. In heat waves, irrigate in the evening and use shade nets for vegetables. During monsoon, ensure drainage channels are clear to prevent waterlogging.',
    te: 'మందు లేదా ఎరువు వేయడానికి ముందు వాతావరణ సూచన చూడండి. వేడిలో సాయంత్రం నీరు ఇవ్వండి. వర్షాకాలంలో పారుదల కాలువలు శుభ్రం చేయండి.',
    hi: 'दवा या खाद डालने से पहले मौसम देखें। गर्मी में शाम को सिंचाई करें। मानसून में जल निकास साफ रखें।',
    ta: 'மருந்து அல்லது உரம் இடுமுன் வானிலை பார்க்கவும். வெயிலில் மாலை நீர்ப்பாசனம் செய்யவும். மழைக்காலத்தில் வடிகால் கால்வாய்களை சுத்தம் செய்யவும்.',
    kn: 'ಔಷಧ ಅಥವಾ ಗೊಬ್ಬರ ಹಾಕುವ ಮುನ್ನ ಹವಾಮಾನ ನೋಡಿ. ಬಿಸಿಲಲ್ಲಿ ಸಂಜೆ ನೀರಾವರಿ ಮಾಡಿ. ಮಳೆಗಾಲದಲ್ಲಿ ಒಳಚರಂಗಿ ಕಾಲುವೆ ಸ್ವಚ್ಛಗೊಳಿಸಿ.',
  },
  disease: {
    en: 'If you suspect a plant disease, remove and destroy badly affected leaves to stop spread. Avoid wetting leaves while watering — many fungal diseases thrive in moisture. For fungal infections, a copper-based or sulfur-based fungicide can help, but confirm the disease first. You can also use the Disease Detection page in this app to upload a photo for analysis.',
    te: 'వ్యాధి అనుమానం వస్తే ప్రభావిత ఆకులు తీసివేయండి. నీటిలో ఆకులు తడవకుండా చూడండి. ఈ యాప్‌లో వ్యాధి గుర్తింపు పేజీ వాడి ఫోటో పంపండి.',
    hi: 'रोग का संदेह हो तो प्रभावित पत्तियाँ हटाएँ। पानी डालते समय पत्तियाँ गीली न करें। इस ऐप के रोग पहचान पेज से फोटो अपलोड करें।',
    ta: 'நோய் சந்தேகம் இருந்தால் பாதிக்கப்பட்ட இலைகளை அகற்றவும். இலைகளை நனைக்காமல் தண்ணீர் ஊற்றவும். இந்த ஆப் நோய் கண்டறிதல் பக்கத்தில் புகைப்படம் பதிவேற்றவும்.',
    kn: 'ರೋಗ ಅನುಮಾನ ಬಂದರೆ ಪ್ರಭಾವಿತ ಎಲೆಗಳನ್ನು ತೆಗೆಯಿರಿ. ನೀರು ಹಾಕುವಾಗ ಎಲೆಗಳು ಒದ್ದೆಯಾಗದಂತೆ ನೋಡಿ. ಈ ಆ್ಯಪ್ ರೋಗ ಪತ್ತೆ ಪುಟದಲ್ಲಿ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
  },
  seed: {
    en: 'Choose certified seeds from a reliable supplier for better germination and yield. Treat seeds with a fungicide or Trichoderma before sowing to prevent seed-borne diseases. Sow at the recommended depth and spacing for your crop. Raise seedlings in a nursery for transplanted crops like rice and vegetables.',
    te: 'ధృవీకృత విత్తనాలు వాడండి. విత్తన శుద్ధి చేసి విత్తండి. పంటకు సరైన లోతు, దూరం పాటించండి.',
    hi: 'प्रमाणित बीज का उपयोग करें। बोने से पहले बीज उपचार करें। सही गहराई और दूरी पर बोएँ।',
    ta: 'சான்றளிக்கப்பட்ட விதை பயன்படுத்தவும். விதைப்பதற்கு முன் விதை சிகிச்சை செய்யவும். சரியான ஆழம் மற்றும் இடைவெளி பின்பற்றவும்.',
    kn: 'ಪ್ರಮಾಣೀಕೃತ ಬೀಜ ಬಳಸಿ. ಬಿತ್ತುವ ಮುನ್ನ ಬೀಜ ಚಿಕಿತ್ಸೆ ಮಾಡಿ. ಸರಿಯಾದ ಆಳ ಮತ್ತು ಅಂತರ ಪಾಲಿಸಿ.',
  },
  livestock: {
    en: 'For healthy livestock, provide clean drinking water at all times and balanced fodder. Vaccinate cattle against Foot-and-Mouth Disease (FMD) and Haemorrhagic Septicaemia (HS) on schedule. Deworm every 3–4 months. Keep sheds well-ventilated and dry to prevent disease.',
    te: 'పశువులకు శుభ్రమైన నీరు, సమతుల్య మేత ఇవ్వండి. టీకాలు సమయానుసారం వేయించండి. 3–4 నెలలకు ఒకసారి డీవర్మింగ్ చేయించండి.',
    hi: 'मवेशियों को स्वच्छ पानी और संतुलित चारा दें। समय पर टीका लगवाएँ। 3–4 महीने में डिवर्मिंग कराएँ।',
    ta: 'கால்நடைகளுக்கு சுத்தமான நீர், சமச்சீர் தீவனம் கொடுக்கவும். தடுப்பூசி சரியான நேரத்தில் போடவும். 3–4 மாதத்திற்கு ஒருமுறை புழுநீக்கம் செய்யவும்.',
    kn: 'ದನಕಾರುಗಳಿಗೆ ಶುದ್ಧ ನೀರು, ಸಮತೋಲಿತ ಮೇವು ನೀಡಿ. ಸಮಯಕ್ಕೆ ತಕ್ಕಂತೆ ಲಸಿಕೆ ಹಾಕಿಸಿ. 3–4 ತಿಂಗಳಿಗೆ ಒಮ್ಮೆ ಡಿವರ್ಮಿಂಗ್ ಮಾಡಿಸಿ.',
  },
  crop: {
    en: 'For a healthy crop, follow the package of practices for your specific crop and variety. Rotate crops each season to break pest and disease cycles. Maintain recommended plant spacing for good air flow and sunlight. Weed regularly in the first 30 days — weeds compete with young plants for nutrients and water.',
    te: 'మంచి పంటకు ఆ పంట పద్ధతులు పాటించండి. ఋతువుకు పంట మార్పిడి చేయండి. సరైన దూరం పాటించండి. మొదటి 30 రోజులు కలుపు తీయండి.',
    hi: 'अच्छी फसल के लिए फसल चक्र अपनाएँ। सही दूरी रखें। पहले 30 दिन निराई करें।',
    ta: 'நல்ல பயிருக்கு பயிர் சுழற்சி பின்பற்றவும். சரியான இடைவெளி வைக்கவும். முதல் 30 நாட்கள் களை எடுக்கவும்.',
    kn: 'ಒಳ್ಳೆ ಬೆಳೆಗೆ ಬೆಳೆ ಬದಲಾವಣೆ ಅನುಸರಿಸಿ. ಸರಿಯಾದ ಅಂತರ ಇರಿಸಿ. ಮೊದಲ 30 ದಿನ ಕಳೆ ತೆಗೆಯಿರಿ.',
  },
  general: {
    en: 'For healthy crops: 1) Test your soil before planting. 2) Use certified seeds. 3) Water early morning or evening. 4) Scout your field weekly for pests and disease. 5) Follow crop rotation each season. For specific advice, ask about a crop, pest, fertilizer, or soil issue.',
    te: 'మంచి పంటలకు: 1) నేల పరీక్ష 2) ధృవీకృత విత్తనాలు 3) ఉదయం/సాయంత్రం నీరు 4) వారానికి ఒకసారి పొలం చూడండి 5) పంట మార్పిడి.',
    hi: 'अच्छी फसल के लिए: 1) मिट्टी परीक्षण 2) प्रमाणित बीज 3) सुबह/शाम सिंचाई 4) सप्ताह में एक बार निरीक्षण 5) फसल चक्र।',
    ta: 'நல்ல பயிருக்கு: 1) மண் பரிசோதனை 2) சான்றளிக்கப்பட்ட விதை 3) காலை/மாலை நீர்ப்பாசனம் 4) வாரம் ஒருமுறை கவனிப்பு 5) பயிர் சுழற்சி.',
    kn: 'ಒಳ್ಳೆ ಬೆಳೆಗೆ: 1) ಮಣ್ಣು ಪರೀಕ್ಷೆ 2) ಪ್ರಮಾಣೀಕೃತ ಬೀಜ 3) ಬೆಳಗ್ಗೆ/ಸಂಜೆ ನೀರಾವರಿ 4) ವಾರಕ್ಕೊಮ್ಮೆ ಗಮನಿಸಿ 5) ಬೆಳೆ ಬದಲಾವಣೆ.',
  },
};

function detectTopic(message: string): Topic {
  const lower = message.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => lower.includes(k.toLowerCase()))) {
      return rule.topic;
    }
  }
  return 'general';
}

export function generateDemoAdvice(message: string, language: string): string {
  const topic = detectTopic(message);
  const advice = ADVICE[topic];
  const lang = (language in advice ? language : 'en') as keyof typeof advice;
  const noteMap: Record<string, string> = {
    te: 'ఇది ప్రదర్శన సమాధానం (విషయ ఆధారిత). ప్రత్యక్ష AI సమాధానాల కోసం OPENAI_API_KEY జోడించండి.',
    hi: 'यह एक प्रदर्शन उत्तर है (विषय आधारित)। लाइव AI उत्तरों के लिए OPENAI_API_KEY जोड़ें।',
    ta: 'இது செயல்விளக்க பதில் (தலைப்பு அடிப்படையில்). நேரடி AI பதிலுக்கு OPENAI_API_KEY சேர்க்கவும்.',
    kn: 'ಇದು ಪ್ರದರ್ಶನ ಉತ್ತರ (ವಿಷಯ ಆಧಾರಿತ). ನೇರವಾಗಿ AI ಉತ್ತರಕ್ಕೆ OPENAI_API_KEY ಸೇರಿಸಿ.',
  };
  const note = noteMap[lang] || 'This is a demonstration answer (topic-based). Add OPENAI_API_KEY for live AI answers.';
  return `${advice[lang]}\n\n— ${note}`;
}
