#!/bin/bash

for i in {1..100}
do
	wget -P img/ "https://colorlib.com/preview/theme/roberto/img/bg-img/$i.jpg"
done


echo All done
