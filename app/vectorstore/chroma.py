from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

from app.core.config import Settings


def get_embeddings(settings: Settings) -> HuggingFaceEmbeddings:
    """Create local, quota-free embeddings using Sentence Transformers."""
    return HuggingFaceEmbeddings(
        model_name=settings.embedding_model,
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True},
    )


def get_vectorstore(settings: Settings) -> Chroma:
    return Chroma(
        # Collection name is versioned because vector dimensions/spaces are
        # incompatible with the previous Gemini embedding index.
        collection_name="kisan_setu_documents_st",
        persist_directory=str(settings.chroma_persist_directory),
        embedding_function=get_embeddings(settings),
    )
