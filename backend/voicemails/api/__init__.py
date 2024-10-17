import logging
logger = logging.getLogger(__name__)
import os
import importlib

# Get the current directory path
current_dir = os.path.dirname(__file__)
current_dir_array = current_dir.split(os.path.sep)

# Get a list of all Python files in the directory
files = [f[:-3] for f in os.listdir(current_dir) if f.endswith('.py') and not f.startswith('__')]

# Import each module dynamically
for file in files:
    module = importlib.import_module(f"{current_dir_array[-2]}.{current_dir_array[-1]}.{file}")

    # Dynamically import all classes from the modules
    globals().update({name: getattr(module, name) for name in module.__dict__ if not name.startswith('_')})
