import os
import re

def print_tree(directory, prefix='', exclude_dirs=None, exclude_patterns=None):
    if exclude_dirs is None:
        exclude_dirs = []
    if exclude_patterns is None:
        exclude_patterns = []
        
    # Compile regex patterns for better performance
    compiled_patterns = [re.compile(pattern) for pattern in exclude_patterns]
    
    # Get all items in directory and sort them
    try:
        items = os.listdir(directory)
    except PermissionError:
        print(f"{prefix}├── [Permission denied]")
        return
        
    # Filter items
    filtered_items = []
    for item in sorted(items):
        path = os.path.join(directory, item)
        
        # Skip excluded directories
        if os.path.isdir(path) and item in exclude_dirs:
            continue
            
        # Skip items matching exclude patterns
        if any(pattern.search(item) for pattern in compiled_patterns):
            continue
            
        filtered_items.append(item)
    
    # Process remaining items
    for index, item in enumerate(filtered_items):
        path = os.path.join(directory, item)
        is_last = index == len(filtered_items) - 1
        connector = '└── ' if is_last else '├── '
        print(prefix + connector + item)
        
        if os.path.isdir(path):
            extension = '    ' if is_last else '│   '
            print_tree(path, prefix + extension, exclude_dirs, exclude_patterns)

if __name__ == "__main__":
    print("NextJS Project Structure:")
    
    # Define directories and patterns to exclude
    exclude_dirs = [
        'node_modules',
        '.next',
        '.git',
        'dist',
        'build',
        'coverage'
    ]
    
    # Regular expressions for files to exclude
    exclude_patterns = [
        r'\.DS_Store$',
        r'.*\.map$',
        r'.*\.js\.map$',
        r'.*chunk.*\.js$',
        r'.*manifest.*\.json$',
        r'^_.*\.js$',
        r'transform\.js$',
        r'.*\.ico$',
        r'.*[0-9a-f]{8}.*\.js$',  # Hashed filenames
        r'.*[0-9a-f]{6}.*\.css$', # Hashed CSS files
        r'.*\.woff2$'             # Font files
    ]
    
    print_tree(os.getcwd(), exclude_dirs=exclude_dirs, exclude_patterns=exclude_patterns)