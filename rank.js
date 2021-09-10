const { Command } = require('commander');
const program = new Command();
const fs = require("fs");

const path = "./leaderboard.json"

program.version('0.0.1');

program.description('A cli for ranking users');


program
    .argument('<userId>')
    .action((id) => {

        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                console.log("file doesn't exist");
                return;
            }
            let exist = false


            let array = [];
            const json_data = JSON.parse(data);

            for (var i in json_data)
                array.push([i, json_data[i]]);

            var index = -1;

            for (let i = 0; i < array.length; i++) {
                if (array[i][1].uid === id) {
                    exist = true
                    continue;
                }
            }

            if (!exist) {
                console.log("Current user id does not exist! Please specify an existing user id!")
                return;
            }

            const sortedArray = array

            sortedArray.sort(function(a, b) {
                return b[1].bananas - a[1].bananas
            })

            const top = sortedArray.slice(0, 10)


            // user exist in top 10

            let top10 = false

            top.map(el => {
                if (el[1].uid === id) top10 = true
            });


            if (top10) {
                let displayedData = [];
                for (let i = 0; i < top.length; i++) {
                    displayedData.push({
                        name: top[i][1].name,
                        rank: i + 1,
                        NumberOfBananas: top[i][1].bananas,
                        isCurrentUser: top[i][1].uid === id ? "Yes" : "No"
                    })

                }


                console.table(displayedData)
            } else {
                let index = 0;
                for (let i = 0; i < sortedArray.length; i++) {
                    if (sortedArray[i][1].uid === id) index = i
                }

                top[9] = sortedArray[index];

                let displayedData = [];
                for (let i = 0; i < top.length; i++) {
                    displayedData.push({
                        name: top[i][1].name,
                        rank: top[i][1].uid === id ? index + 1 : i + 1,
                        NumberOfBananas: top[i][1].bananas,
                        isCurrentUser: top[i][1].uid === id ? "Yes" : "No"
                    })

                }

                console.table(displayedData)
            }




        })


    })

program.parse();