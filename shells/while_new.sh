#!/bin/bash

a=1

while [ $a != "0" ]; do
	echo -n "input : "
		read a

	if [ $a != "10" ]; then
		for ((k=1; k<10; k++))do
			echo " $a * $k = `expr $a \* $k `"
		done
	fi
done
echo Exit
