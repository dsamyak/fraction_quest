import re

file_path = r"c:\Users\VICTUS\Desktop\intellia\fraction\src\pages\WorksheetHome.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# matchRight
content = content.replace("'4 out of 5 gems are red 💎'", "'5 में से 4 रत्न लाल हैं 💎'")
content = content.replace("'1 out of 4 coins is gold 🪙'", "'4 में से 1 सिक्का सोना है 🪙'")
content = content.replace("'1 out of 3 swords is silver ⚔️'", "'3 में से 1 तलवार चांदी की है ⚔️'")
content = content.replace("'5 out of 8 pearls are black 🖤'", "'8 में से 5 मोती काले हैं 🖤'")

# mazeQ
content = content.replace('"Blackbeard split a gold coin into 2. He kept 1 piece. What fraction did he keep?"', '"ब्लैकबियर्ड ने एक सोने के सिक्के को 2 में बांट दिया। उसने 1 टुकड़ा रखा। उसने कितना भाग (fraction) रखा?"')
content = content.replace("'A ship has 8 cannons. 3 are fired. What fraction of cannons were fired?'", "'एक जहाज में 8 तोपें हैं। 3 दागी जाती हैं। तोपों का कितना भाग दागा गया?'")
content = content.replace("'The map is ½ done. The compass shows ¼. Which is further along?'", "'नक्शा ½ बन चुका है। कंपास ¼ दिखाता है। कौन अधिक आगे है?'")
content = content.replace("'Blackbeard found ²⁄₄ of the treasure. What is that simplified?'", "'ब्लैकबियर्ड को खजाने का ²⁄₄ मिला। इसका सरल रूप क्या है?'")
content = content.replace("'There are 5 treasure chests. 2 have gold. What fraction has gold?'", "'यहाँ 5 खजाने के संदूक हैं। 2 में सोना है। कितने भाग में सोना है?'")
content = content.replace("'Which of these equals ⅓ (an equivalent fraction)?'", "'इनमें से कौन ⅓ (एक समान भाग) के बराबर है?'")
content = content.replace("['1/4', '1/2', 'Equal', 'Cannot tell']", "['1/4', '1/2', 'बराबर', 'कह नहीं सकते']")

# pizzaGoals
content = content.replace("'Color 3/8 of the pizza 🍕'", "'पिज़्ज़ा का 3/8 भाग रंगें 🍕'")
content = content.replace("'Color 4/6 of the pizza 🍕'", "'पिज़्ज़ा का 4/6 भाग रंगें 🍕'")
content = content.replace("'Color 1/4 of the pizza 🍕'", "'पिज़्ज़ा का 1/4 भाग रंगें 🍕'")

# rlQ
content = content.replace('"Blackbeard has 12 gold coins. 4 are cursed. What fraction is cursed?"', '"ब्लैकबियर्ड के पास 12 सोने के सिक्के हैं। 4 शापित हैं। कितना भाग शापित है?"')
content = content.replace('"A rope is cut into 5 equal parts. 2 parts hold the anchor. What fraction is LEFT?"', '"एक रस्सी को 5 समान भागों में काटा गया है। 2 भाग लंगर को पकड़ते हैं। कितना भाग बचा (LEFT) है?"')
content = content.replace('"30 pirates on deck. 10 are sleeping. What fraction is sleeping?"', '"डेक पर 30 समुद्री डाकू। 10 सो रहे हैं। कितना भाग सो रहा है?"')
content = content.replace('"A water barrel holds 8 cups. 6 cups are fresh water. What fraction is fresh?"', '"एक पानी के बैरल में 8 कप आते हैं। 6 कप ताजा पानी है। कितना भाग ताजा है?"')
content = content.replace('"9 treasure gems found. 6 are diamonds. What fraction is NOT a diamond?"', '"9 खजाने के रत्न मिले। 6 हीरे हैं। कौन सा भाग हीरा नहीं है?"')
content = content.replace("'Left = total − used'", "'बचा हुआ = कुल − उपयोग किया गया'")
content = content.replace("'Not diamond = 9 − 6 = 3'", "'हीरा नहीं = 9 − 6 = 3'")

# spinQs
content = content.replace('"Blackbeard cut a cake in half. Which fraction is equivalent to 1/2?"', '"ब्लैकबियर्ड ने एक केक को आधा काट दिया। कौन सा भाग 1/2 के बराबर है?"')
content = content.replace('"Is 1/4 bigger or smaller than 1/2?"', '"क्या 1/4, 1/2 से बड़ा है या छोटा?"')
content = content.replace("'smaller'", "'छोटा'")
content = content.replace("['bigger','smaller','equal']", "['बड़ा','छोटा','बराबर']")
content = content.replace('"How many quarter-coins make 3/4 of a coin?"', '"कितने चौथाई-सिक्के मिलकर एक सिक्के का 3/4 बनाते हैं?"')
content = content.replace('"What fraction is equivalent to 1/3?"', '"कौन सा भाग 1/3 के बराबर है?"')
content = content.replace('"2/3 + 1/3 = ?"', '"2/3 + 1/3 = ?"')
content = content.replace('"Is 3/8 more or less than 1/2?"', '"क्या 3/8, 1/2 से अधिक (more) है या कम (less)?"')
content = content.replace("'less'", "'कम'")
content = content.replace("['more','less','equal']", "['अधिक','कम','बराबर']")
content = content.replace('"Is 5/8 more or less than 1/2?"', '"क्या 5/8, 1/2 से अधिक (more) है या कम (less)?"')
content = content.replace("'more'", "'अधिक'")
content = content.replace('"How many eighths make 1 whole treasure?"', '"एक पूरा खजाना बनाने के लिए कितने आठवें भाग लगते हैं?"')

# escapeSteps
content = content.replace('"Order from smallest to largest: 1/2, 1/4, 3/4"', '"छोटे से बड़े के क्रम में लगाएं: 1/2, 1/4, 3/4"')
content = content.replace('"What fraction of the number line between 0 and 1 is halfway?"', '"0 और 1 के बीच संख्या रेखा का कौन सा भाग आधा है?"')
content = content.replace('"Write an equivalent fraction for 2/3"', '"2/3 के लिए एक समान भाग (fraction) लिखें"')
content = content.replace('"Which is larger: 5/6 or 7/8? Write the bigger one."', '"कौन बड़ा है: 5/6 या 7/8? बड़ा वाला लिखें।"')
content = content.replace('"Blackbeard ate 3 out of 9 biscuits. What fraction is that? Simplify!"', '"ब्लैकबियर्ड ने 9 में से 3 बिस्कुट खाए। यह कौन सा भाग है? सरल करें!"')

# bossQ
content = content.replace("'Which is the GREATEST fraction?'", "'सबसे बड़ा (GREATEST) भाग कौन सा है?'")
content = content.replace("'6/8 simplified is...'", "'6/8 का सरल रूप है...'")
content = content.replace("'Which fraction equals 50%?'", "'कौन सा भाग 50% के बराबर है?'")
content = content.replace("'¼ + ¼ = ?'", "'¼ + ¼ = ?'")
content = content.replace("'What is 1 whole written as fourths?'", "'1 पूरे को चौथाई के रूप में कैसे लिखा जाएगा?'")
content = content.replace('"Blackbeard drank ⅝ of his juice. How much is LEFT?"', '"ब्लैकबियर्ड ने अपने जूस का ⅝ पी लिया। कितना बचा (LEFT) है?"')
content = content.replace("'Which pair are equivalent fractions?'", "'कौन सा जोड़ा समान भाग है?'")
content = content.replace("['1/2 and 2/5','3/4 and 6/8','1/3 and 1/4','2/3 and 3/4']", "['1/2 और 2/5','3/4 और 6/8','1/3 और 1/4','2/3 और 3/4']")
content = content.replace("'3 out of 12 gems are blue. What fraction simplified?'", "'12 रत्नों में से 3 नीले हैं। सरल रूप में कौन सा भाग है?'")
content = content.replace("'On a number line, which fraction is closest to 1?'", "'संख्या रेखा पर कौन सा भाग 1 के सबसे करीब है?'")
content = content.replace("'Half of a half is...'", "'आधे का आधा होता है...'")

# Static text all over the file
content = content.replace('Color 1 of 2 parts', '2 में से 1 भाग को रंगें')
content = content.replace('Color 3 of 4 parts', '4 में से 3 भाग को रंगें')
content = content.replace('Color 3 slices of 8', '8 में से 3 स्लाइस को रंगें')
content = content.replace('Color 4 slices of 6', '6 में से 4 स्लाइस को रंगें')
content = content.replace('Color 1 slice of 4', '4 में से 1 स्लाइस को रंगें')
content = content.replace('numerator=', 'अंश=')
content = content.replace('denominator=', 'हर=')
content = content.replace('Score:', 'स्कोर:')
content = content.replace('Next Level →', 'अगला स्तर →')
content = content.replace('Check Answers', 'उत्तर जांचें')
content = content.replace('Back to Home', 'होम पर वापस')
content = content.replace('Print Worksheet', 'कार्यपत्रक प्रिंट करें')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
