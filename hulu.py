import os
import subprocess
import json

# New username and password to update
username = "jaredshapirogp+1@gmail.com"
password = "tempPassword123"

# Log the user into Bitwarden
#os.system("bw login jaredshapiro321@gmail.com SmallHepburn102PP!")

# Get session key 
sessionKey = subprocess.check_output(["bw", "unlock", "SmallHepburn102PP!", "--raw"], shell = True)

# Get folder id to narrow search 
# #### make it so it auto adds folder in setup process. 

# Get hulu item
huluItem = subprocess.check_output(('bw', 'list', 'items', '--search', 'hulu', '--session', sessionKey), shell=True)

#convert hulu item to json
itemString = huluItem.decode("utf-8")
itemString = itemString[1:-1]
item = json.loads(itemString)

#get needed information
itemId = item['id']
itemUsername = item['login']['username']
itemPassword = item['login']['password']

# Push information to Bitwarden Vault
unArg = '.login.username = "' + username + '"'
pwArg = '.login.password = "' + password + '"'
unpwArg = unArg + ' | ' + pwArg

# Get item id and push to pipe
s1 = subprocess.Popen(('bw', 'get', 'item', itemId, '--session', sessionKey), stdout=subprocess.PIPE, shell=True)
# Edit json with jq
s2 = subprocess.Popen(('jq', unpwArg), stdin=s1.stdout, stdout=subprocess.PIPE, shell=True)
# Encode the json
s3 = subprocess.Popen(('bw', 'encode'), stdin=s2.stdout, stdout=subprocess.PIPE, shell=True)
# Edit the Bitwarden vault entry
s4 = subprocess.Popen(('bw', 'edit', 'item', itemId, '--session', sessionKey), stdin=s3.stdout, shell=True)
s4.wait()
s3.wait()
s2.wait()
s1.wait()

# Notify the user the operation has finished
print("\nOperation has finished\n")

#os.system("bw logout")