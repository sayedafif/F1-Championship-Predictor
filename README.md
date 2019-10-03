# F1 Championship Predictor

Predicting the F1 Championship Standings by simulating results of upcoming races.

## Built With

Basic Web Application using HTML, CSS, jQuery and HandleBars.js

## How it Works

Using Ergast Developer API, we are getting the schedule of the upcoming Race Calendar where we can simulate various scenarios to check who will be on top of the Championship Standings after the next races.

We have 2 tables - Current Championship Standings and Try Predicting the Winner.

Championship Standings will be updated because of any change in the Predicting the Winner Table.

In the Predicting the Winner Table, we will provide the position of any driver in an upcoming race. 


## Points according to Position

Points are provided according to F1 Rules -


|Position        |Points |
|----------------|-------|
|1               |25     |
|2               |18     |
|3               |15     |
|4               |12     |
|5               |10     |
|6               |8      |
|7               |6      |
|8               |4      |
|9               |2      |
|10              |1      |

An Extra Point is awarded for Fastest Lap if the driver finishes in the Top 10.


# API Used

https://ergast.com/mrd/

Feel free to go through the API properly. It contains almost all details on the results and race schedules of the F1 race calendar.
