export interface Publication {
  title: string;
  image: string;
  description: string;
  url: string;
  publication: string;
}

export const publications: Publication[] = [
  {
    title: "How to Build a Quiz App With Nuxt and Xata",
    image: "https://cdn.thenewstack.io/media/2025/02/c221a25f-build-quiz-app-nuxt-xata-1024x576.png",
    description: "A hands-on guide to building a quiz application with Nuxt and Xata.",
    url: "https://thenewstack.io/how-to-build-a-quiz-app-with-nuxt-and-xata/",
    publication: "The New Stack",
  },
  {
    title: "Display AI-Generated Images in a Jupyter Notebook",
    image: "https://cdn.thenewstack.io/media/2024/11/20d1e8e3-reefs-1024x576.jpg",
    description: "A tutorial on generating images with AI and displaying them in a Jupyter notebook.",
    url: "https://thenewstack.io/display-ai-generated-images-in-a-jupyter-notebook/",
    publication: "The New Stack",
  },
  {
    title: "Building an AI Voice Application in Streamlit using OpenAI",
    image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F3q0mx98s0cxaxoyakd7i.png",
    description: "A walkthrough for building a voice transcription and translation app with Whisper and Streamlit.",
    url: "https://dev.to/terieyenike/building-a-voice-transcription-and-translation-app-with-openai-whisper-and-streamlit-43mm",
    publication: "DEV Community",
  },
];
