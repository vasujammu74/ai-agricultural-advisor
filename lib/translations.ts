import type { LanguageCode } from './languages';

export type TranslationKey =
  | 'nav.home'
  | 'nav.services'
  | 'nav.contact'
  | 'nav.assistant'
  | 'nav.detect'
  | 'cta.getStarted'
  | 'cta.learnMore'
  | 'cta.tryAssistant'
  | 'cta.detectDisease'
  | 'cta.send'
  | 'home.tagline'
  | 'home.intro'
  | 'home.badge'
  | 'home.feature1Title'
  | 'home.feature1Desc'
  | 'home.feature2Title'
  | 'home.feature2Desc'
  | 'home.feature3Title'
  | 'home.feature3Desc'
  | 'home.howTitle'
  | 'home.step1'
  | 'home.step1Desc'
  | 'home.step2'
  | 'home.step2Desc'
  | 'home.step3'
  | 'home.step3Desc'
  | 'home.statsFarmers'
  | 'home.statsLanguages'
  | 'home.statsDiseases'
  | 'assistant.title'
  | 'assistant.subtitle'
  | 'assistant.placeholder'
  | 'assistant.send'
  | 'assistant.listening'
  | 'assistant.mic'
  | 'assistant.speak'
  | 'assistant.stop'
  | 'assistant.clear'
  | 'assistant.welcome'
  | 'assistant.thinking'
  | 'assistant.demo'
  | 'assistant.error'
  | 'assistant.voiceUnsupported'
  | 'assistant.history'
  | 'detect.title'
  | 'detect.subtitle'
  | 'detect.upload'
  | 'detect.camera'
  | 'detect.analyze'
  | 'detect.analyzing'
  | 'detect.result'
  | 'detect.noResult'
  | 'detect.demo'
  | 'detect.drop'
  | 'detect.clear'
  | 'detect.suggestions'
  | 'detect.common'
  | 'detect.treatment'
  | 'detect.prevention'
  | 'services.title'
  | 'services.subtitle'
  | 'services.assistantTitle'
  | 'services.assistantDesc'
  | 'services.voiceTitle'
  | 'services.voiceDesc'
  | 'services.diseaseTitle'
  | 'services.diseaseDesc'
  | 'services.multiTitle'
  | 'services.multiDesc'
  | 'services.imageTitle'
  | 'services.imageDesc'
  | 'services.try'
  | 'contact.title'
  | 'contact.subtitle'
  | 'contact.name'
  | 'contact.namePh'
  | 'contact.email'
  | 'contact.emailPh'
  | 'contact.message'
  | 'contact.messagePh'
  | 'contact.submit'
  | 'contact.sending'
  | 'contact.success'
  | 'contact.error'
  | 'contact.teamTitle'
  | 'contact.team'
  | 'footer.rights'
  | 'footer.tagline'
  | 'common.back'
  | 'common.retry'
  | 'common.loading';

type Dict = Record<TranslationKey, string>;

const en: Dict = {
  'nav.home': 'Home',
  'nav.services': 'Services',
  'nav.contact': 'Contact',
  'nav.assistant': 'Farmer Assistant',
  'nav.detect': 'Disease Detection',
  'cta.getStarted': 'Get Started',
  'cta.learnMore': 'Learn More',
  'cta.tryAssistant': 'Talk to Assistant',
  'cta.detectDisease': 'Detect Plant Disease',
  'cta.send': 'Send',
  'home.tagline': 'Multilingual AI Assistant for Farmers',
  'home.intro':
    'AI Agricultural Advisor brings expert farming guidance to every farmer — through voice, text, and a simple photo. Ask questions in your own language, identify plant diseases instantly, and get practical advice you can trust.',
  'home.badge': 'AI-powered • Multilingual • Voice & Image',
  'home.feature1Title': 'Ask in Your Language',
  'home.feature1Desc':
    'Type or speak your question in English, Telugu, Hindi, Tamil, or Kannada and get clear, practical answers.',
  'home.feature2Title': 'Detect Plant Disease',
  'home.feature2Desc':
    'Snap a photo of a sick leaf and our AI identifies the plant, the disease, and suggests treatment.',
  'home.feature3Title': 'Voice You Understand',
  'home.feature3Desc':
    'Listen to answers spoken aloud in your language — perfect for farmers who prefer talking over typing.',
  'home.howTitle': 'How it works',
  'home.step1': 'Ask or speak',
  'home.step1Desc': 'Open the Assistant and type or tap the mic to ask your question.',
  'home.step2': 'Get an answer',
  'home.step2Desc': 'Our AI returns practical guidance you can read or listen to.',
  'home.step3': 'Act with confidence',
  'home.step3Desc': 'Apply the advice, or check a sick plant with a quick photo.',
  'home.statsFarmers': 'Built for Farmers',
  'home.statsLanguages': '5 Languages',
  'home.statsDiseases': 'Image Analysis',
  'assistant.title': 'Farmer Assistant',
  'assistant.subtitle': 'Ask any farming question — by text or voice — in your language.',
  'assistant.placeholder': 'Ask about crops, pests, weather, fertilizer…',
  'assistant.send': 'Send',
  'assistant.listening': 'Listening…',
  'assistant.mic': 'Tap to speak',
  'assistant.speak': 'Read aloud',
  'assistant.stop': 'Stop',
  'assistant.clear': 'Clear chat',
  'assistant.welcome':
    'Hello! I am your AI Agricultural Advisor. Ask me anything about farming — crops, pests, soil, weather, or fertilizer. You can type or tap the mic to speak.',
  'assistant.thinking': 'Thinking…',
  'assistant.demo': 'Demonstration answer — no AI service connected. Add an API key to enable live answers.',
  'assistant.error': 'Sorry, I could not get an answer right now. Please try again.',
  'assistant.voiceUnsupported': 'Voice input is not supported in this browser.',
  'assistant.history': 'Chat history',
  'detect.title': 'Plant Disease Detection',
  'detect.subtitle': 'Upload or capture a photo of a plant to identify it and detect possible diseases.',
  'detect.upload': 'Upload Image',
  'detect.camera': 'Use Camera',
  'detect.analyze': 'Analyze Image',
  'detect.analyzing': 'Analyzing…',
  'detect.result': 'Analysis Result',
  'detect.noResult': 'Upload an image and tap Analyze to see results.',
  'detect.demo': 'Demonstration result — no Kindwise API key connected. Add KINDWISE_API_KEY to enable live detection.',
  'detect.drop': 'Drag & drop an image here, or click to browse',
  'detect.clear': 'Clear',
  'detect.suggestions': 'Suggested actions',
  'detect.common': 'Common name',
  'detect.treatment': 'Treatment',
  'detect.prevention': 'Prevention',
  'services.title': 'Our Services',
  'services.subtitle': 'Everything a farmer needs, in one simple app.',
  'services.assistantTitle': 'AI Farming Assistant',
  'services.assistantDesc':
    'Ask any agricultural question and get clear, expert-like guidance instantly — by text or voice.',
  'services.voiceTitle': 'Voice-Based Guidance',
  'services.voiceDesc':
    'Speak your question and listen to spoken answers in your own language — no typing needed.',
  'services.diseaseTitle': 'Plant Disease Detection',
  'services.diseaseDesc':
    'Identify plant diseases from a photo and get symptoms, treatment, and prevention advice.',
  'services.multiTitle': 'Multilingual Support',
  'services.multiDesc':
    'Use the app in English, Telugu, Hindi, Tamil, or Kannada — voice and text included.',
  'services.imageTitle': 'Image-Based Plant Analysis',
  'services.imageDesc':
    'Powered by the Kindwise API to recognise plants and detect health issues from images.',
  'services.try': 'Try it now',
  'contact.title': 'Contact Us',
  'contact.subtitle': 'Have a question or feedback? We would love to hear from you.',
  'contact.name': 'Name',
  'contact.namePh': 'Your name',
  'contact.email': 'Email',
  'contact.emailPh': 'you@example.com',
  'contact.message': 'Message',
  'contact.messagePh': 'How can we help?',
  'contact.submit': 'Send Message',
  'contact.sending': 'Sending…',
  'contact.success': 'Thank you! Your message has been received.',
  'contact.error': 'Something went wrong. Please try again.',
  'contact.teamTitle': 'Project Team',
  'contact.team': 'Final-year project team — AI Agricultural Advisor.',
  'footer.rights': 'All rights reserved.',
  'footer.tagline': 'Multilingual AI Assistant for Farmers',
  'common.back': 'Back',
  'common.retry': 'Try again',
  'common.loading': 'Loading…',
};

const te: Dict = {
  ...en,
  'nav.home': 'హోమ్',
  'nav.services': 'సేవలు',
  'nav.contact': 'సంప్రదించండి',
  'nav.assistant': 'రైతు సహాయకుడు',
  'nav.detect': 'వ్యాధి గుర్తింపు',
  'cta.getStarted': 'ప్రారంభించండి',
  'cta.learnMore': 'మరింత తెలుసుకోండి',
  'cta.tryAssistant': 'సహాయకుడితో మాట్లాడండి',
  'cta.detectDisease': 'మొక్క వ్యాధిని గుర్తించండి',
  'home.tagline': 'రైతుల కోసం బహుభాషా AI సహాయకుడు',
  'home.intro':
    'AI వ్యవసాయ సలహాదారుడు ప్రతి రైతుకు నిపుణుల సలహాను అందిస్తుంది — స్వరం, టెక్స్ట్ మరియు ఒక సాధారణ ఫోటో ద్వారా. మీ స్వంత భాషలో ప్రశ్నలు అడగండి, మొక్క వ్యాధులను తక్షణమే గుర్తించండి.',
  'home.badge': 'AI-ఆధారిత • బహుభాషా • స్వరం & చిత్రం',
  'home.feature1Title': 'మీ భాషలో అడగండి',
  'home.feature1Desc': 'టెలుగు, ఆంగ్లం, హిందీ, తమిళం లేదా కన్నడంలో టైప్ చేసి లేదా మాట్లాడి స్పష్టమైన సమాధానాలు పొందండి.',
  'home.feature2Title': 'మొక్క వ్యాధిని గుర్తించండి',
  'home.feature2Desc': 'అనారోగ్య ఆకు ఫోటో తీయండి — AI మొక్కను, వ్యాధిని గుర్తించి చికిత్సను సూచిస్తుంది.',
  'home.feature3Title': 'మీరు అర్థం చేసుకునే స్వరం',
  'home.feature3Desc': 'మీ భాషలో సమాధానాలను వినండి — టైప్ కంటే మాట్లాడటం ఇష్టపడే రైతులకు అనువుగా.',
  'home.howTitle': 'ఎలా పనిచేస్తుంది',
  'home.step1': 'అడగండి లేదా మాట్లాడండి',
  'home.step1Desc': 'సహాయకుడిని తెరచి టైప్ చేయండి లేదా మైక్ నొక్కి ప్రశ్న అడగండి.',
  'home.step2': 'సమాధానం పొందండి',
  'home.step2Desc': 'AI ఆచరణీయ సలహాను ఇస్తుంది — చదవండి లేదా వినండి.',
  'home.step3': 'విశ్వాసంతో చర్య తీసుకోండి',
  'home.step3Desc': 'సలహాను పాటించండి, లేదా అనారోగ్య మొక్కను ఫోటోతో పరిశీలించండి.',
  'assistant.title': 'రైతు సహాయకుడు',
  'assistant.subtitle': 'మీ భాషలో ఏ వ్యవసాయ ప్రశ్ననైనా అడగండి — టెక్స్ట్ లేదా స్వరం ద్వారా.',
  'assistant.placeholder': 'పంటలు, పురుగులు, ఎరువుల గురించి అడగండి…',
  'assistant.send': 'పంపండి',
  'assistant.listening': 'వింటోంది…',
  'assistant.mic': 'మాట్లాడటానికి నొక్కండి',
  'assistant.speak': 'బిగ్గడం',
  'assistant.stop': 'ఆపు',
  'assistant.clear': 'చాట్ క్లియర్',
  'assistant.welcome':
    'నమస్కారం! నేను మీ AI వ్యవసాయ సలహాదారుడిని. పంటలు, పురుగులు, నేల, వాతావరణం లేదా ఎరువుల గురించి ఏదైనా అడగండి.',
  'assistant.thinking': 'ఆలోచిస్తోంది…',
  'assistant.demo': 'ప్రదర్శన సమాధానం — AI సేవ అనుసంధానించబడలేదు.',
  'assistant.error': 'క్షమించండి, ప్రస్తుతం సమాధానం లభించలేదు. మళ్లీ ప్రయత్నించండి.',
  'assistant.voiceUnsupported': 'ఈ బ్రౌజర్‌లో స్వర ఇన్‌పుట్ కుదరదు.',
  'assistant.history': 'చాట్ చరిత్ర',
  'detect.title': 'మొక్క వ్యాధి గుర్తింపు',
  'detect.subtitle': 'మొక్కను గుర్తించడానికి మరియు వ్యాధులను కనుగొనడానికి ఫోటో అప్‌లోడ్ చేయండి.',
  'detect.upload': 'చిత్రం అప్‌లోడ్',
  'detect.camera': 'కెమెరా ఉపయోగించండి',
  'detect.analyze': 'చిత్రం విశ్లేషణ',
  'detect.analyzing': 'విశ్లేషిస్తోంది…',
  'detect.result': 'విశ్లేషణ ఫలితం',
  'detect.noResult': 'ఫలితాల కోసం చిత్రం అప్‌లోడ్ చేసి విశ్లేషణ నొక్కండి.',
  'detect.demo': 'ప్రదర్శన ఫలితం — Kindwise API కీ లేదు.',
  'detect.drop': 'చిత్రాన్ని ఇక్కడ లాగండి లేదా క్లిక్ చేయండి',
  'detect.clear': 'క్లియర్',
  'detect.suggestions': 'సూచిత చర్యలు',
  'detect.common': 'సాధారణ పేరు',
  'detect.treatment': 'చికిత్స',
  'detect.prevention': 'నివారణ',
  'services.title': 'మా సేవలు',
  'services.subtitle': 'రైతుకు కావలసినంత ఒకే యాప్‌లో.',
  'services.assistantTitle': 'AI వ్యవసాయ సహాయకుడు',
  'services.assistantDesc': 'ఏ వ్యవసాయ ప్రశ్ననైనా అడగండి — తక్షణ నిపుణుల సలహా పొందండి.',
  'services.voiceTitle': 'స్వర ఆధారిత సలహా',
  'services.voiceDesc': 'మాట్లాడండి, మీ భాషలో సమాధానాలు వినండి — టైప్ అవసరం లేదు.',
  'services.diseaseTitle': 'మొక్క వ్యాధి గుర్తింపు',
  'services.diseaseDesc': 'ఫోటో నుండి వ్యాధులను గుర్తించి చికిత్స, నివారణ సలహా పొందండి.',
  'services.multiTitle': 'బహుభాషా మద్దతు',
  'services.multiDesc': 'ఆంగ్లం, తెలుగు, హిందీ, తమిళం లేదా కన్నడంలో యాప్ ఉపయోగించండి.',
  'services.imageTitle': 'చిత్ర ఆధారిత విశ్లేషణ',
  'services.imageDesc': 'Kindwise API ఆధారంగా మొక్కలను గుర్తించి ఆరోగ్య సమస్యలను కనుగొనండి.',
  'services.try': 'ఇప్పుడే ప్రయత్నించండి',
  'contact.title': 'మమ్మల్ని సంప్రదించండి',
  'contact.subtitle': 'ప్రశ్న లేదా అభిప్రాయం? మేము వినడానికి సిద్ధంగా ఉన్నాము.',
  'contact.name': 'పేరు',
  'contact.namePh': 'మీ పేరు',
  'contact.email': 'ఇమెయిల్',
  'contact.emailPh': 'you@example.com',
  'contact.message': 'సందేశం',
  'contact.messagePh': 'మేము ఎలా సహాయపడగలం?',
  'contact.submit': 'సందేశం పంపండి',
  'contact.sending': 'పంపుతోంది…',
  'contact.success': 'ధన్యవాదాలు! మీ సందేశం స్వీకరించబడింది.',
  'contact.error': 'ఏదో తప్పు జరిగింది. మళ్లీ ప్రయత్నించండి.',
  'contact.teamTitle': 'ప్రాజెక్ట్ బృందం',
  'contact.team': 'ఫైనల్-ఇయర్ ప్రాజెక్ట్ బృందం — AI వ్యవసాయ సలహాదారుడు.',
  'footer.rights': 'హక్కులు అన్నీ రిజర్వ్.',
  'footer.tagline': 'రైతుల కోసం బహుభాషా AI సహాయకుడు',
};

const hi: Dict = {
  ...en,
  'nav.home': 'होम',
  'nav.services': 'सेवाएँ',
  'nav.contact': 'संपर्क',
  'nav.assistant': 'किसान सहायक',
  'nav.detect': 'रोग पहचान',
  'cta.getStarted': 'शुरू करें',
  'cta.learnMore': 'और जानें',
  'cta.tryAssistant': 'सहायक से बात करें',
  'cta.detectDisease': 'पौधा रोग पहचानें',
  'home.tagline': 'किसानों के लिए बहुभाषी AI सहायक',
  'home.intro':
    'AI कृषि सलाहकार हर किसान तक विशेषज्ञ मार्गदर्शन पहुँचाता है — आवाज़, टेक्स्ट और एक तस्वीर से। अपनी भाषा में सवाल पूछें, पौधे के रोग तुरंत पहचानें।',
  'home.badge': 'AI-संचालित • बहुभाषी • आवाज़ और चित्र',
  'home.feature1Title': 'अपनी भाषा में पूछें',
  'home.feature1Desc': 'अंग्रेज़ी, तेलुगु, हिंदी, तमिल या कन्नड़ में टाइप करें या बोलें — स्पष्ट उत्तर पाएँ।',
  'home.feature2Title': 'पौधा रोग पहचानें',
  'home.feature2Desc': 'बीमार पत्ती की फोटो लें — AI पौधा और रोग पहचानकर इलाज सुझाता है।',
  'home.feature3Title': 'समझ आने वाली आवाज़',
  'home.feature3Desc': 'अपनी भाषा में उत्तर सुनें — टाइपिंग से ज्यादा बोलना पसंद करने वालों के लिए।',
  'home.howTitle': 'यह कैसे काम करता है',
  'home.step1': 'पूछें या बोलें',
  'home.step1Desc': 'सहायक खोलें और टाइप करें या माइक दबाकर सवाल पूछें।',
  'home.step2': 'उत्तर पाएँ',
  'home.step2Desc': 'AI व्यावहारिक सलाह देता है — पढ़ें या सुनें।',
  'home.step3': 'आत्मविश्वास से काम करें',
  'home.step3Desc': 'सलाह अपनाएँ, या बीमार पौधे की फोटो से जाँच करें।',
  'assistant.title': 'किसान सहायक',
  'assistant.subtitle': 'अपनी भाषा में किसी भी कृषि सवाल को टेक्स्ट या आवाज़ से पूछें।',
  'assistant.placeholder': 'फसल, कीट, मौसम, खाद के बारे में पूछें…',
  'assistant.send': 'भेजें',
  'assistant.listening': 'सुन रहा हूँ…',
  'assistant.mic': 'बोलने के लिए दबाएँ',
  'assistant.speak': 'पढ़कर सुनाएँ',
  'assistant.stop': 'रोकें',
  'assistant.clear': 'चैट साफ़ करें',
  'assistant.welcome':
    'नमस्ते! मैं आपका AI कृषि सलाहकार हूँ। फसल, कीट, मिट्टी, मौसम या खाद — कुछ भी पूछें।',
  'assistant.thinking': 'सोच रहा हूँ…',
  'assistant.demo': 'प्रदर्शन उत्तर — कोई AI सेवा जुड़ी नहीं है।',
  'assistant.error': 'क्षमा करें, अभी उत्तर नहीं मिल सका। पुनः प्रयास करें।',
  'assistant.voiceUnsupported': 'इस ब्राउज़र में आवाज़ इनपुट समर्थित नहीं है।',
  'assistant.history': 'चैट इतिहास',
  'detect.title': 'पौधा रोग पहचान',
  'detect.subtitle': 'पौधे की पहचान और रोग पहचान के लिए फोटो अपलोड करें।',
  'detect.upload': 'तस्वीर अपलोड',
  'detect.camera': 'कैमरा उपयोग करें',
  'detect.analyze': 'तस्वीर विश्लेषण',
  'detect.analyzing': 'विश्लेषण कर रहा है…',
  'detect.result': 'विश्लेषण परिणाम',
  'detect.noResult': 'परिणाम देखने के लिए तस्वीर अपलोड कर विश्लेषण दबाएँ।',
  'detect.demo': 'प्रदर्शन परिणाम — Kindwise API कुंजी नहीं है।',
  'detect.drop': 'तस्वीर यहाँ खींचें या क्लिक करें',
  'detect.clear': 'साफ़ करें',
  'detect.suggestions': 'सुझाए गए कदम',
  'detect.common': 'सामान्य नाम',
  'detect.treatment': 'इलाज',
  'detect.prevention': 'रोकथाम',
  'services.title': 'हमारी सेवाएँ',
  'services.subtitle': 'किसान की हर ज़रूरत एक ऐप में।',
  'services.assistantTitle': 'AI कृषि सहायक',
  'services.assistantDesc': 'कोई भी कृषि सवाल पूछें — तुरंत विशेषज्ञ जैसी सलाह पाएँ।',
  'services.voiceTitle': 'आवाज़ आधारित सलाह',
  'services.voiceDesc': 'बोलें और अपनी भाषा में उत्तर सुनें — टाइपिंग की ज़रूरत नहीं।',
  'services.diseaseTitle': 'पौधा रोग पहचान',
  'services.diseaseDesc': 'फोटो से रोग पहचानकर इलाज और रोकथाम की सलाह पाएँ।',
  'services.multiTitle': 'बहुभाषी समर्थन',
  'services.multiDesc': 'अंग्रेज़ी, तेलुगु, हिंदी, तमिल या कन्नड़ में ऐप उपयोग करें।',
  'services.imageTitle': 'चित्र आधारित विश्लेषण',
  'services.imageDesc': 'Kindwise API से पौधे पहचानें और स्वास्थ्य समस्याएँ जानें।',
  'services.try': 'अभी आज़माएँ',
  'contact.title': 'संपर्क करें',
  'contact.subtitle': 'कोई सवाल या सुझाव? हमें जरूर बताएँ।',
  'contact.name': 'नाम',
  'contact.namePh': 'आपका नाम',
  'contact.email': 'ईमेल',
  'contact.emailPh': 'you@example.com',
  'contact.message': 'संदेश',
  'contact.messagePh': 'हम कैसे मदद कर सकते हैं?',
  'contact.submit': 'संदेश भेजें',
  'contact.sending': 'भेजा जा रहा है…',
  'contact.success': 'धन्यवाद! आपका संदेश मिल गया।',
  'contact.error': 'कुछ गलत हुआ। पुनः प्रयास करें।',
  'contact.teamTitle': 'प्रोजेक्ट टीम',
  'contact.team': 'फाइनल-ईयर प्रोजेक्ट टीम — AI कृषि सलाहकार।',
  'footer.rights': 'सर्वाधिकार सुरक्षित।',
  'footer.tagline': 'किसानों के लिए बहुभाषी AI सहायक',
};

const ta: Dict = {
  ...en,
  'nav.home': 'முகப்பு',
  'nav.services': 'சேவைகள்',
  'nav.contact': 'தொடர்பு',
  'nav.assistant': 'விவசாயி உதவியாளர்',
  'nav.detect': 'நோய் கண்டறிதல்',
  'cta.getStarted': 'தொடங்குங்கள்',
  'cta.learnMore': 'மேலும் அறிய',
  'cta.tryAssistant': 'உதவியாளருடன் பேசுங்கள்',
  'cta.detectDisease': 'தாவர நோயைக் கண்டறியவும்',
  'home.tagline': 'விவசாயிகளுக்கான பல மொழி AI உதவியாளர்',
  'home.intro':
    'AI வேளாண் ஆலோசகர் ஒவ்வொரு விவசாயிக்கும் நிபுணர் வழிகாட்டியை அளிக்கிறது — குரல், உரை மற்றும் ஒரு புகைப்படம் மூலம். உங்கள் மொழியில் கேளுங்கள், தாவர நோய்களை உடனே கண்டறியுங்கள்.',
  'home.badge': 'AI இயக்கப்படுவது • பல மொழி • குரல் & படம்',
  'home.feature1Title': 'உங்கள் மொழியில் கேளுங்கள்',
  'home.feature1Desc': 'ஆங்கிலம், தெலுங்கு, இந்தி, தமிழ் அல்லது கன்னடத்தில் தட்டச்சு செய்யுங்கள் அல்லது பேசுங்கள்.',
  'home.feature2Title': 'தாவர நோய் கண்டறிதல்',
  'home.feature2Desc': 'நோய்வாய்ப்பட்ட இலையின் புகைப்படம் எடுத்து AI தாவரம் மற்றும் நோயைக் கண்டறியும்.',
  'home.feature3Title': 'புரியும் குரல்',
  'home.feature3Desc': 'உங்கள் மொழியில் பதில்களைக் கேளுங்கள் — தட்டச்சை விட பேச விரும்புவோருக்கு.',
  'home.howTitle': 'எப்படி வேலை செய்கிறது',
  'home.step1': 'கேளுங்கள் அல்லது பேசுங்கள்',
  'home.step1Desc': 'உதவியாளரைத் திறந்து தட்டச்சு செய்யுங்கள் அல்லது மைக்கை அழுத்துங்கள்.',
  'home.step2': 'பதில் பெறுங்கள்',
  'home.step2Desc': 'AI நடைமுறை ஆலோசனை தருகிறது — படிக்கவும் அல்லது கேட்கவும்.',
  'home.step3': 'நம்பிக்கையுடன் செயல்படுங்கள்',
  'home.step3Desc': 'ஆலோசனையைப் பின்பற்றுங்கள், அல்லது நோய்வாய்ப்பட்ட தாவரத்தைப் புகைப்படம் எடுத்து சரிபார்க்கவும்.',
  'assistant.title': 'விவசாயி உதவியாளர்',
  'assistant.subtitle': 'உங்கள் மொழியில் எந்த வேளாண் கேள்வியையும் உரை அல்லது குரல் மூலம் கேளுங்கள்.',
  'assistant.placeholder': 'பயிர், பூச்சி, வானிலை, உரம் பற்றி கேளுங்கள்…',
  'assistant.send': 'அனுப்பு',
  'assistant.listening': 'கேட்கிறேன்…',
  'assistant.mic': 'பேச அழுத்தவும்',
  'assistant.speak': 'ஒலிபரப்பு',
  'assistant.stop': 'நிறுத்து',
  'assistant.clear': 'அரட்டையை அழி',
  'assistant.welcome':
    'வணக்கம்! நான் உங்கள் AI வேளாண் ஆலோசகர். பயிர், பூச்சி, மண், வானிலை அல்லது உரம் பற்றி எதையும் கேளுங்கள்.',
  'assistant.thinking': 'சிந்திக்கிறேன்…',
  'assistant.demo': 'செயல்விளக்க பதில் — AI சேவை இணைக்கப்படவில்லை.',
  'assistant.error': 'மன்னிக்கவும், இப்போது பதில் கிடைக்கவில்லை. மீண்டும் முயற்சிக்கவும்.',
  'assistant.voiceUnsupported': 'இந்த உலாவியில் குரல் உள்ளீடு ஆதரவு இல்லை.',
  'assistant.history': 'அரட்டை வரலாறு',
  'detect.title': 'தாவர நோய் கண்டறிதல்',
  'detect.subtitle': 'தாவரத்தை அடையாளம் காணவும் நோய்களைக் கண்டறியவும் புகைப்படம் பதிவேற்றவும்.',
  'detect.upload': 'படம் பதிவேற்று',
  'detect.camera': 'கேமரா பயன்படுத்து',
  'detect.analyze': 'பட ஆய்வு',
  'detect.analyzing': 'ஆய்வு செய்கிறது…',
  'detect.result': 'ஆய்வு முடிவு',
  'detect.noResult': 'முடிவுகளுக்கு படம் பதிவேற்றி ஆய்வு அழுத்தவும்.',
  'detect.demo': 'செயல்விளக்க முடிவு — Kindwise API விசை இல்லை.',
  'detect.drop': 'படத்தை இங்கே இழுக்கவும் அல்லது கிளிக் செய்யவும்',
  'detect.clear': 'அழி',
  'detect.suggestions': 'பரிந்துரைக்கப்பட்ட நடவடிக்கைகள்',
  'detect.common': 'பொதுப் பெயர்',
  'detect.treatment': 'சிகிச்சை',
  'detect.prevention': 'தடுப்பு',
  'services.title': 'எங்கள் சேவைகள்',
  'services.subtitle': 'விவசாயிக்கு தேவையான அனைத்தும் ஒரே செயலியில்.',
  'services.assistantTitle': 'AI வேளாண் உதவியாளர்',
  'services.assistantDesc': 'எந்த வேளாண் கேள்வியையும் கேளுங்கள் — உடனே நிபுணர் ஆலோசனை பெறுங்கள்.',
  'services.voiceTitle': 'குரல் அடிப்படையிலான ஆலோசனை',
  'services.voiceDesc': 'பேசுங்கள், உங்கள் மொழியில் பதில்களைக் கேளுங்கள் — தட்டச்சு தேவையில்லை.',
  'services.diseaseTitle': 'தாவர நோய் கண்டறிதல்',
  'services.diseaseDesc': 'புகைப்படத்திலிருந்து நோய்களைக் கண்டறிந்து சிகிச்சை, தடுப்பு ஆலோசனை பெறுங்கள்.',
  'services.multiTitle': 'பல மொழி ஆதரவு',
  'services.multiDesc': 'ஆங்கிலம், தெலுங்கு, இந்தி, தமிழ் அல்லது கன்னடத்தில் செயலைப் பயன்படுத்துங்கள்.',
  'services.imageTitle': 'பட அடிப்படையிலான ஆய்வு',
  'services.imageDesc': 'Kindwise API மூலம் தாவரங்களை அடையாளம் காணவும்.',
  'services.try': 'இப்போது முயற்சிக்கவும்',
  'contact.title': 'எங்களைத் தொடர்பு கொள்ள',
  'contact.subtitle': 'கேள்வி அல்லது கருத்து? எங்களுக்குத் தெரிவியுங்கள்.',
  'contact.name': 'பெயர்',
  'contact.namePh': 'உங்கள் பெயர்',
  'contact.email': 'மின்னஞ்சல்',
  'contact.emailPh': 'you@example.com',
  'contact.message': 'செய்தி',
  'contact.messagePh': 'நாங்கள் எப்படி உதவ?',
  'contact.submit': 'செய்தி அனுப்பு',
  'contact.sending': 'அனுப்புகிறது…',
  'contact.success': 'நன்றி! உங்கள் செய்தி பெறப்பட்டது.',
  'contact.error': 'ஏதோ தவறு நிகழ்ந்தது. மீண்டும் முயற்சிக்கவும்.',
  'contact.teamTitle': 'திட்டக் குழு',
  'contact.team': 'இறுதி ஆண்டு திட்டக் குழு — AI வேளாண் ஆலோசகர்.',
  'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
  'footer.tagline': 'விவசாயிகளுக்கான பல மொழி AI உதவியாளர்',
};

const kn: Dict = {
  ...en,
  'nav.home': 'ಮುಖಪುಟ',
  'nav.services': 'ಸೇವೆಗಳು',
  'nav.contact': 'ಸಂಪರ್ಕ',
  'nav.assistant': 'ರೈತ ಸಹಾಯಕ',
  'nav.detect': 'ರೋಗ ಪತ್ತೆ',
  'cta.getStarted': 'ಪ್ರಾರಂಭಿಸಿ',
  'cta.learnMore': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
  'cta.tryAssistant': 'ಸಹಾಯಕರೊಂದಿಗೆ ಮಾತನಾಡಿ',
  'cta.detectDisease': 'ಸಸ್ಯ ರೋಗ ಪತ್ತೆ',
  'home.tagline': 'ರೈತರಿಗಾಗಿ ಬಹುಭಾಷಾ AI ಸಹಾಯಕ',
  'home.intro':
    'AI ಕೃಷಿ ಸಲಹೆಗಾರರು ಪ್ರತಿ ರೈತರಿಗೆ ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ — ಧ್ವನಿ, ಪಠ್ಯ ಮತ್ತು ಒಂದು ಫೋಟೋ ಮೂಲಕ. ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ, ಸಸ್ಯ ರೋಗಗಳನ್ನು ತಕ್ಷಣ ಪತ್ತೆ ಮಾಡಿ.',
  'home.badge': 'AI-ಆಧಾರಿತ • ಬಹುಭಾಷಾ • ಧ್ವನಿ & ಚಿತ್ರ',
  'home.feature1Title': 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ',
  'home.feature1Desc': 'ಇಂಗ್ಲಿಷ್, ತೆಲುಗು, ಹಿಂದಿ, ತಮಿಳು ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮಾತನಾಡಿ.',
  'home.feature2Title': 'ಸಸ್ಯ ರೋಗ ಪತ್ತೆ',
  'home.feature2Desc': 'ಅನಾರೋಗ್ಯ ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ — AI ಸಸ್ಯ ಮತ್ತು ರೋಗ ಪತ್ತೆ ಮಾಡಿ ಚಿಕಿತ್ಸೆ ಸೂಚಿಸುತ್ತದೆ.',
  'home.feature3Title': 'ಅರ್ಥವಾಗುವ ಧ್ವನಿ',
  'home.feature3Desc': 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರಗಳನ್ನು ಕೇಳಿ — ಟೈಪ್‌ಗಿಂತ ಮಾತನಾಡಲು ಇಷ್ಟಪಡುವವರಿಗೆ.',
  'home.howTitle': 'ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
  'home.step1': 'ಕೇಳಿ ಅಥವಾ ಮಾತನಾಡಿ',
  'home.step1Desc': 'ಸಹಾಯಕ ತೆರೆದು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮೈಕ್ ಒತ್ತಿ ಪ್ರಶ್ನೆ ಕೇಳಿ.',
  'home.step2': 'ಉತ್ತರ ಪಡೆಯಿರಿ',
  'home.step2Desc': 'AI ಪ್ರಾಯೋಗಿಕ ಸಲಹೆ ನೀಡುತ್ತದೆ — ಓದಿ ಅಥವಾ ಕೇಳಿ.',
  'home.step3': 'ವಿಶ್ವಾಸದಿಂದ ಆಗಿ',
  'home.step3Desc': 'ಸಲಹೆ ಅನುಸರಿಸಿ, ಅಥವಾ ಅನಾರೋಗ್ಯ ಸಸ್ಯವನ್ನು ಫೋಟೋದಿಂದ ಪರಿಶೀಲಿಸಿ.',
  'assistant.title': 'ರೈತ ಸಹಾಯಕ',
  'assistant.subtitle': 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಯಾವುದೇ ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಪಠ್ಯ ಅಥವಾ ಧ್ವನಿಯಿಂದ ಕೇಳಿ.',
  'assistant.placeholder': 'ಬೆಳೆ, ಕೀಟ, ಹವಾಮಾನ, ಗೊಬ್ಬರ ಬಗ್ಗೆ ಕೇಳಿ…',
  'assistant.send': 'ಕಳುಹಿಸಿ',
  'assistant.listening': 'ಕೇಳುತ್ತಿದ್ದೇನೆ…',
  'assistant.mic': 'ಮಾತನಾಡಲು ಒತ್ತಿ',
  'assistant.speak': 'ಓದಿ',
  'assistant.stop': 'ನಿಲ್ಲಿಸಿ',
  'assistant.clear': 'ಚಾಟ್ ಅಳಿಸಿ',
  'assistant.welcome':
    'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಲಹೆಗಾರ. ಬೆಳೆ, ಕೀಟ, ಮಣ್ಣು, ಹವಾಮಾನ ಅಥವಾ ಗೊಬ್ಬರ — ಏನಾದರೂ ಕೇಳಿ.',
  'assistant.thinking': 'ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ…',
  'assistant.demo': 'ಪ್ರದರ್ಶನ ಉತ್ತರ — AI ಸೇವೆ ಸಂಪರ್ಕಿಸಿಲ್ಲ.',
  'assistant.error': 'ಕ್ಷಮಿಸಿ, ಈಗ ಉತ್ತರ ಸಿಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
  'assistant.voiceUnsupported': 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.',
  'assistant.history': 'ಚಾಟ್ ಇತಿಹಾಸ',
  'detect.title': 'ಸಸ್ಯ ರೋಗ ಪತ್ತೆ',
  'detect.subtitle': 'ಸಸ್ಯವನ್ನು ಗುರುತಿಸಲು ಮತ್ತು ರೋಗಗಳನ್ನು ಪತ್ತೆ ಮಾಡಲು ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
  'detect.upload': 'ಚಿತ್ರ ಅಪ್‌ಲೋಡ್',
  'detect.camera': 'ಕ್ಯಾಮೆರಾ ಬಳಸಿ',
  'detect.analyze': 'ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆ',
  'detect.analyzing': 'ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ…',
  'detect.result': 'ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶ',
  'detect.noResult': 'ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ವಿಶ್ಲೇಷಣೆ ಒತ್ತಿ.',
  'detect.demo': 'ಪ್ರದರ್ಶನ ಫಲಿತಾಂಶ — Kindwise API ಕೀ ಇಲ್ಲ.',
  'detect.drop': 'ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ',
  'detect.clear': 'ಅಳಿಸಿ',
  'detect.suggestions': 'ಸೂಚಿಸಲಾದ ಕ್ರಮಗಳು',
  'detect.common': 'ಸಾಮಾನ್ಯ ಹೆಸರು',
  'detect.treatment': 'ಚಿಕಿತ್ಸೆ',
  'detect.prevention': 'ತಡೆಗಟ್ಟುವಿಕೆ',
  'services.title': 'ನಮ್ಮ ಸೇವೆಗಳು',
  'services.subtitle': 'ರೈತರಿಗೆ ಬೇಕಾದುದು ಒಂದೇ ಆ್ಯಪ್‌ನಲ್ಲಿ.',
  'services.assistantTitle': 'AI ಕೃಷಿ ಸಹಾಯಕ',
  'services.assistantDesc': 'ಯಾವುದೇ ಕೃಷಿ ಪ್ರಶ್ನೆ ಕೇಳಿ — ತಕ್ಷಣ ತಜ್ಞರ ಸಲಹೆ ಪಡೆಯಿರಿ.',
  'services.voiceTitle': 'ಧ್ವನಿ ಆಧಾರಿತ ಸಲಹೆ',
  'services.voiceDesc': 'ಮಾತನಾಡಿ, ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರ ಕೇಳಿ — ಟೈಪ್ ಬೇಡ.',
  'services.diseaseTitle': 'ಸಸ್ಯ ರೋಗ ಪತ್ತೆ',
  'services.diseaseDesc': 'ಫೋಟೋದಿಂದ ರೋಗ ಪತ್ತೆ ಮಾಡಿ ಚಿಕಿತ್ಸೆ, ತಡೆಗಟ್ಟುವಿಕೆ ಸಲಹೆ ಪಡೆಯಿರಿ.',
  'services.multiTitle': 'ಬಹುಭಾಷಾ ಬೆಂಬಲ',
  'services.multiDesc': 'ಇಂಗ್ಲಿಷ್, ತೆಲುಗು, ಹಿಂದಿ, ತಮಿಳು ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಆ್ಯಪ್ ಬಳಸಿ.',
  'services.imageTitle': 'ಚಿತ್ರ ಆಧಾರಿತ ವಿಶ್ಲೇಷಣೆ',
  'services.imageDesc': 'Kindwise API ಮೂಲಕ ಸಸ್ಯಗಳನ್ನು ಗುರುತಿಸಿ.',
  'services.try': 'ಈಗ ಪ್ರಯತ್ನಿಸಿ',
  'contact.title': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
  'contact.subtitle': 'ಪ್ರಶ್ನೆ ಅಥವಾ ಅಭಿಪ್ರಾಯ? ನಮಗೆ ಹೇಳಿ.',
  'contact.name': 'ಹೆಸರು',
  'contact.namePh': 'ನಿಮ್ಮ ಹೆಸರು',
  'contact.email': 'ಇಮೇಲ್',
  'contact.emailPh': 'you@example.com',
  'contact.message': 'ಸಂದೇಶ',
  'contact.messagePh': 'ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
  'contact.submit': 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
  'contact.sending': 'ಕಳುಹಿಸುತ್ತಿದೆ…',
  'contact.success': 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.',
  'contact.error': 'ಏನೋ ತಪ್ಪಾಯಿತು. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
  'contact.teamTitle': 'ಪ್ರಾಜೆಕ್ಟ್ ತಂಡ',
  'contact.team': 'ಅಂತಿಮ ವರ್ಷದ ಪ್ರಾಜೆಕ್ಟ್ ತಂಡ — AI ಕೃಷಿ ಸಲಹೆಗಾರ.',
  'footer.rights': 'ಎಲ್ಲ ಹಕ್ಕುಗಳು ಕಾಯ್ದುಕೊಳ್ಳಲಾಗಿವೆ.',
  'footer.tagline': 'ರೈತರಿಗಾಗಿ ಬಹುಭಾಷಾ AI ಸಹಾಯಕ',
};

const DICTS: Record<LanguageCode, Dict> = { en, te, hi, ta, kn };

export function translate(lang: LanguageCode, key: TranslationKey): string {
  return DICTS[lang]?.[key] || en[key] || key;
}
