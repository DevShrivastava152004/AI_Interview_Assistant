from transformers import BertTokenizer
import pandas as pd

# Load the pre-trained tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

def load_data(file_path):
    """
    Function to load CSV dataset.
    Args:
        file_path (str): Path to the CSV file.
    Returns:
        pd.DataFrame: Loaded dataset as a pandas DataFrame.
    """
    try:
        data = pd.read_csv(file_path)
        print(f"Loaded dataset with {data.shape[0]} records.")
        return data
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return None

def preprocess_text(text):
    """
    Function to preprocess the interview answer text.
    This can be expanded with more text-cleaning operations like:
    - Removing special characters, stopwords
    - Lowercasing, etc.
    Args:
        text (str): The input text (answer).
    Returns:
        str: Preprocessed text.
    """
    text = text.strip()  # Remove leading/trailing whitespace
    # More preprocessing steps can be added here (e.g., removing special characters)
    return text

def tokenize_answer(answer, max_length=128):
    """
    Function to tokenize the interview answer.
    Args:
        answer (str): The user's interview answer.
        max_length (int): The maximum length of the tokenized sequence.
    Returns:
        dict: Tokenized answer in the format required by the BERT model.
    """
    tokenized_input = tokenizer(answer, padding='max_length', truncation=True, max_length=max_length, return_tensors='pt')
    return tokenized_input

def encode_labels(labels, label_map=None):
    """
    Function to encode labels for training or inference.
    Args:
        labels (list): List of string labels (e.g., "Good", "Needs Improvement", "Bad").
        label_map (dict, optional): A dictionary for mapping string labels to integers.
    Returns:
        list: List of encoded integer labels.
    """
    if label_map is None:
        label_map = {"Good Answer": 0, "Needs Improvement": 1, "Bad Answer": 2}
    
    encoded_labels = [label_map[label] for label in labels]
    return encoded_labels

def get_feedback_from_prediction(prediction):
    """
    Function to map the model prediction to human-readable feedback.
    Args:
        prediction (int): The model's prediction (0, 1, or 2).
    Returns:
        str: The corresponding feedback message.
    """
    feedback_map = {0: "Good Answer", 1: "Needs Improvement", 2: "Bad Answer"}
    return feedback_map.get(prediction, "Unknown Feedback")
