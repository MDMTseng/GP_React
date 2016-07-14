#!/bin/bash

checkCMDExist()
{
	type $1 > /dev/null|| { echo "I require $1 but it's not installed.  Aborting."; exit 1; }
}

checkCMDExist tree

tree -J -I node_modules > dirTree.json 