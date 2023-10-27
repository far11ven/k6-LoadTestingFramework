# k6-LoadTestingFramework
[Building a Load Testing Framework using K6.io](https://www.kushalbhalaik.xyz/blog/building-a-load-testing-framework-using-k6-io-the-intro-part-1/)

## Installation:
Read through following guide to how to install k6 on your machine:

https://k6.io/docs/get-started/installation/

## How To Run:

1. Clone this repo

2. Run using following command

``` 
 k6 run --vus 10 --iterations 20 -e configFile=DEV.json --out json=report.json code/scripts/test.js

 k6 run --vus 10 --duration 20s -e configFile=QA.json --out csv=report.csv code/scripts/test.js
```

Skipping setup/teardown execution:

``` k6 run --no-setup --no-teardown ... ```


Run locally with a config file, save result on cloud

``` k6 run --no-setup --vus 10 --iterations 10 -e configFile=DEV.json -o cloud code/scripts/test.js ``` 

Run on cloud

``` k6 cloud --no-setup --vus 10 --iterations 10 -e configFile=DEV.json code/scripts/test.js ``` 

where,
``` 
vus - virtual users,

iterations - number of times to run the script, shared among VUs (ex. --vus 10 --iterations 30, each vue executes 3 iterations)

duration - specifies how long the test executes for.
it will run n iterations of the script with specified VUs during the specified time (ex 10s, 10m, 2h etc)

json/csv - report output file type

-o/--out - output method (ex. cloud)

``` 

Note:
1) --vus 10 --iterations 10 will execute a script 10 times
2) --vus 10 --iterations 20 will execute a script 20 times

