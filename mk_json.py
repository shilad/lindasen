#!/usr/bin/python -O

import json
import string
import sys

descs = {
}

for line in open('lsfa_descriptions.txt'):
	tokens = line.split('\t')
	(img, name, media, dims) = map(string.strip, tokens)
	descs[img] = {
        'id' : 'lsfa' + img,
		'bigImg' : img + '.jpg',
		'smallImg' : img + '.png',
		'medImg' : img + '.png',
		'name' : name,
        'section' : 'murals',
        'ordinal' : 100,
		'media' : media,
		'dimensions' : dims,
	}


for line in open('lsfa_types.txt'):
	tokens = line.split('\t')
	(img, section, ordinal) = map(string.strip, tokens)
	descs[img]['section'] = section
	descs[img]['ordinal'] = int(ordinal)
	

f = open('lsfa_data.js', 'w')
f.write('var LSFA_DATA = ') 
f.write(json.dumps(descs, indent=2, separators=(',', ': '), sort_keys=True))
f.write(';\n')
