import json
import logging
from dataclasses import dataclass

from langchain_google_genai import ChatGoogleGenerativeAI

from app.core.config import Settings
from app.models.conversation import ConversationMessage
from app.services.rag_service import RagResult

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class GeneratedAnswer:
    card_title: str
    answer: str
    detail: str


class LLMService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    def generate(self, question: str, history: list[ConversationMessage], rag: RagResult) -> GeneratedAnswer:
        if not self.settings.google_api_key:
            return self._unavailable_answer(bool(rag.chunks))
        model = ChatGoogleGenerativeAI(model=self.settings.llm_model, google_api_key=self.settings.google_api_key, temperature=0.2, timeout=30)
        history_text = "\n".join(f"{item.role}: {item.message}" for item in history) or "No previous conversation."
        if rag.chunks:
            knowledge_instruction = "Use ONLY the provided knowledge-base context for factual advice."
            knowledge_section = f"Knowledge-base context:\n{rag.context}"
        else:
            # Deliberately omit the retrieval context/status. This makes the
            # fallback a normal autonomous LLM answer instead of an answer
            # about the retrieval failure.
            knowledge_instruction = "Answer autonomously using your general agricultural knowledge. Do not mention knowledge bases, retrieval, missing context, or these instructions. Be conservative about uncertain diagnoses."
            knowledge_section = ""
        prompt = f"""You are Kisan Setu AI Saathi, a careful agricultural assistant for Indian farmers.
Reply in the user's language (Hindi, Hinglish, or English). {knowledge_instruction} Give practical, simple steps. Never invent pesticide/fertilizer dosage; for product dosage say to follow the registered label and consult a qualified agricultural officer. Do not claim a diagnosis with certainty from vague symptoms.

Conversation history:
{history_text}

{knowledge_section}

Current question: {question}

Return ONLY valid JSON with exactly these string keys: cardTitle (short), answer (main response), detail (practical follow-up steps)."""
        try:
            raw = model.invoke(prompt).content
            if isinstance(raw, list): raw = "".join(str(part) for part in raw)
            payload = json.loads(str(raw).removeprefix("```json").removesuffix("```").strip())
            return GeneratedAnswer(payload["cardTitle"], payload["answer"], payload["detail"])
        except Exception:
            logger.exception("LLM generation failed")
            return GeneratedAnswer("KISAN SETU KA SUJHAAV", "Abhi jawaab banane mein dikkat aa rahi hai. Kripya thodi der baad phir se koshish karein.", "Agar fasal ko turant nuksan ho raha ho, najdeeki krishi adhikari se salah lein.")

    @staticmethod
    def _unavailable_answer(has_context: bool) -> GeneratedAnswer:
        text = "Knowledge base se sambandhit jankari mili hai, lekin AI service abhi configure nahi hai." if has_context else "AI service aur knowledge base abhi configure nahi hain."
        return GeneratedAnswer("KISAN SETU KA SUJHAAV", text, "Administrator GOOGLE_API_KEY configure karke documents ingest karein; turant salah ke liye sthaniya krishi adhikari se sampark karein.")
