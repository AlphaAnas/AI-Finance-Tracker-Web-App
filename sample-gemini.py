import os
import json
import google.generativeai as genai
import pathlib
import PIL.Image

# Set the input and output folder paths
input_folder = "./sample-invoices"
output_folder = "./ground_truth"

# Ensure output folder exists
os.makedirs(output_folder, exist_ok=True)

# Define prompt template to extract key invoice fields in JSON
prompt = """You are an expert invoice parser.

Task: From the invoice text provided below, extract the key fields:
- Either Invoice Number or Bill Number: Integer (Output field: InvoiceNumber)
- Items (grouped in a list with ItemName (string), Price (decimal), Quantity (integer), and Total(decimal)) (Output field: Items)
- Invoice Date: Date (Output field: InvoiceDate)
- Total Amount: Decimal (Output field: TotalAmount) 
- Vendor Name: String (Output field: VendorName)
- Payment Method: String (Output field: PaymentMethod)
- Invoice Type: String (Output field: InvoiceType)
- Withholding Tax Amount: Decimal ((Output field: WitholdingTaxAmount))
- GST Amount: Decimal (Output field: GSTAmount)
- Tax Invoice Number (Output field: TaxInvoiceNumber)


Provide the output as a JSON object with the exact field names specified above. If a field is missing, ignore it and do not fill it in or make assumptions.

Restrictions:
Only provide the JSON object with the exact field names.
Do not provide any other text or explanations.
If you are unable to find any fields, provide an empty JSON object.
All rows of items must be grouped together.

Invoice Text:
{invoice_text}

Answer (in JSON):
"""

# Configure the API with your key
genai.configure(api_key="AIzaSyB9k6XTcl1AfaG4lYqKTcytaOZb3_gIiW8")  # Replace with your actual API key

# Initialize the Gemini 2.0 Flash model
model = genai.GenerativeModel("gemini-2.0-flash")

def process_image(image_path):
    """Process a single image and return the extracted data."""
    try:
        # Open the image with PIL
        pil_image = PIL.Image.open(image_path)
        
        # Generate content using Gemini 2.0 Flash
        response = model.generate_content(
            contents=[prompt, pil_image]  # Pass prompt and image as content
        )
        
        # Print raw response for debugging
        print(f"Raw response for {os.path.basename(image_path)}: {response.text}")
        
        # Clean up the response text to ensure it's valid JSON
        json_str = response.text.strip()
        if json_str.startswith("```json"):
            json_str = json_str[7:]
        if json_str.endswith("```"):
            json_str = json_str[:-3]
        
        # Parse the JSON string to validate it
        try:
            json_data = json.loads(json_str.strip())
            return json_data
        except json.JSONDecodeError as je:
            print(f"Error parsing JSON: {str(je)}")
            return None
            
    except Exception as e:
        print(f"Error processing {image_path}: {str(e)}")
        return None

def save_result_to_json(filename, data, output_dir):
    """Save the response to a .txt file in the output directory."""
    try:
        # Use .txt extension as required by the API route
        output_filename = os.path.splitext(filename)[0] + ".txt"
        output_path = os.path.join(output_dir, output_filename)
        
        if data is None:
            print(f"No valid JSON data to save for {filename}")
            return
        
        # Write the data as properly formatted JSON
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Saved ground truth to: {output_path}")
    except Exception as e:
        print(f"Error saving output for {filename}: {str(e)}")

def process_all_invoices_in_folder(input_dir, output_dir):
    """Process all images in the input folder and save ground truth."""
    # Supported image extensions
    supported_extensions = ('.jpg', '.jpeg', '.png', '.tiff', '.bmp')
    
    # Ensure input folder exists
    if not os.path.exists(input_dir):
        print(f"Input folder {input_dir} does not exist!")
        return
    
    # Process each file in the folder
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(supported_extensions):
            image_path = os.path.join(input_dir, filename)
            print(f"\nProcessing: {filename}")
            
            # Process the image and get response
            response = process_image(image_path)
            
            # Save the result to a .json file
            save_result_to_json(filename, response, output_dir)

if __name__ == "__main__":
    process_all_invoices_in_folder(input_folder, output_folder)
    print("\nGround truth generation complete!")