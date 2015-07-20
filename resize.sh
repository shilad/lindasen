#!/bin/bash

rm -rf images/med/*
rm -rf images/small/*

sips images/big/* -s format png --resampleHeightWidthMax 200 --out images/med/
#sips images/big/* -s format png --padToHeightWidth 200 300 --resampleHeightWidth 200 300 --out images/small/
