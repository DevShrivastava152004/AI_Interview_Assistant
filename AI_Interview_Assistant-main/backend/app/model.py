from transformers import BertForSequenceClassification, BertTokenizer, Trainer, TrainingArguments
from datasets import load_dataset
import torch

def train_model():
    # Load the dataset (Replace with your dataset)
    dataset = load_dataset('csv', data_files={'train': 'data/train.csv'}, delimiter=',')
    
    # Load pre-trained BERT tokenizer and model
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=3)
    
    # Tokenization function
    def tokenize_function(examples):
        return tokenizer(examples['text'], padding='max_length', truncation=True)

    # Apply tokenization
    tokenized_datasets = dataset.map(tokenize_function, batched=True)
    
    # Prepare training arguments
    training_args = TrainingArguments(
        output_dir='./results',
        evaluation_strategy="epoch",
        learning_rate=2e-5,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=16,
        num_train_epochs=3,
    )

    # Define Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_datasets['train'],
    )

    # Train the model
    trainer.train()

    # Save the model
    model.save_pretrained('models/answer_classification_model')
    tokenizer.save_pretrained('models/answer_classification_model')

if __name__ == '__main__':
    train_model()
