import re
import json

qbank = open("c:\\Users\\VICTUS\\Desktop\\intellia\\fraction\\src\\data\\questionBank.js", "r", encoding="utf-8").read()

strings_to_translate = set()

# extract questions
for match in re.findall(r"question:\s*['\"](.*?)['\"]", qbank):
    strings_to_translate.add(match)

# extract hints
for match in re.findall(r"hint:\s*['\"](.*?)['\"]", qbank):
    strings_to_translate.add(match)

# extract instructions
for match in re.findall(r"instruction:\s*['\"](.*?)['\"]", qbank):
    strings_to_translate.add(match)

# extract labels
for match in re.findall(r"label:\s*['\"](.*?)['\"]", qbank):
    strings_to_translate.add(match)

# Write to a JSON file so I can read it and translate it
with open("c:\\Users\\VICTUS\\Desktop\\intellia\\fraction\\strings_to_translate.json", "w", encoding="utf-8") as f:
    json.dump(list(strings_to_translate), f, indent=2)
